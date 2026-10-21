package com.wanderlust.api.service;

import com.wanderlust.api.dto.BookingCreateRequest;
import com.wanderlust.api.dto.BookingResponse;
import com.wanderlust.api.dto.BookingUpdateRequest;
import com.wanderlust.api.dto.PageResponse;
import com.wanderlust.api.entity.Booking;
import com.wanderlust.api.entity.BookingStatus;
import com.wanderlust.api.entity.Listing;
import com.wanderlust.api.entity.User;
import com.wanderlust.api.exception.ResourceConflictException;
import com.wanderlust.api.exception.ResourceNotFoundException;
import com.wanderlust.api.repository.BookingRepository;
import com.wanderlust.api.repository.ListingRepository;
import com.wanderlust.api.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;

@Service
public class BookingService {
    private static final int MAX_PAGE_SIZE = 100;
    private static final List<BookingStatus> BLOCKING_STATUSES =
            List.of(BookingStatus.PENDING, BookingStatus.CONFIRMED);
    private static final Map<String, String> SORT_FIELDS = Map.of(
            "id", "id", "checkin", "checkIn", "checkout", "checkOut", "guests", "guests",
            "status", "status", "totalprice", "totalPrice", "createdat", "createdAt", "updatedat", "updatedAt"
    );

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final ListingRepository listingRepository;

    public BookingService(BookingRepository bookingRepository, UserRepository userRepository,
                          ListingRepository listingRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.listingRepository = listingRepository;
    }

    @Transactional(readOnly = true)
    public PageResponse<BookingResponse> searchBookings(
            int page, int size, String sortBy, String direction, Long guestId, Long listingId, BookingStatus status
    ) {
        validatePagination(page, size);
        validateOptionalId(guestId, "guestId");
        validateOptionalId(listingId, "listingId");
        String sortField = resolveSortField(sortBy);
        Sort.Direction sortDirection = resolveDirection(direction);
        User currentUser = currentUser();
        if (guestId != null && !guestId.equals(currentUser.getId())) {
            throw new AccessDeniedException("You can view only your own bookings");
        }
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortField));
        Page<Booking> results = bookingRepository.search(currentUser.getId(), listingId, status, pageable);
        return new PageResponse<>(results.getContent().stream().map(this::toResponse).toList(),
                results.getNumber(), results.getSize(), results.getTotalElements(), results.getTotalPages(),
                results.isFirst(), results.isLast(), sortField, sortDirection.name().toLowerCase());
    }

    @Transactional(readOnly = true)
    public BookingResponse getBooking(Long id) {
        Booking booking = findBooking(id);
        assertGuestOwner(booking);
        return toResponse(booking);
    }

    @Transactional
    public BookingResponse createBooking(BookingCreateRequest request) {
        validateDateRange(request.checkIn(), request.checkOut());
        User guest = currentUser();
        Listing listing = listingRepository.findById(request.listingId())
                .orElseThrow(() -> new ResourceNotFoundException("Listing with id " + request.listingId() + " was not found"));
        validateGuestCount(request.guests(), listing);
        ensureAvailable(listing.getId(), request.checkIn(), request.checkOut(), null);

        Booking booking = new Booking();
        booking.setGuest(guest);
        booking.setListing(listing);
        booking.setCheckIn(request.checkIn());
        booking.setCheckOut(request.checkOut());
        booking.setGuests(request.guests());
        booking.setStatus(BookingStatus.PENDING);
        booking.setTotalPrice(calculateTotalPrice(listing, request.checkIn(), request.checkOut()));
        return toResponse(bookingRepository.save(booking));
    }

    @Transactional
    public BookingResponse updateBooking(Long id, BookingUpdateRequest request) {
        Booking booking = findBooking(id);
        assertGuestOwner(booking);
        if (booking.getStatus() != BookingStatus.PENDING) {
            throw new ResourceConflictException("Only pending bookings can be edited");
        }
        validateDateRange(request.checkIn(), request.checkOut());
        validateGuestCount(request.guests(), booking.getListing());
        ensureAvailable(booking.getListing().getId(), request.checkIn(), request.checkOut(), booking.getId());
        booking.setCheckIn(request.checkIn());
        booking.setCheckOut(request.checkOut());
        booking.setGuests(request.guests());
        booking.setTotalPrice(calculateTotalPrice(booking.getListing(), request.checkIn(), request.checkOut()));
        return toResponse(bookingRepository.save(booking));
    }

    @Transactional
    public BookingResponse cancelBooking(Long id) {
        Booking booking = findBooking(id);
        assertGuestOwner(booking);
        if (booking.getStatus() == BookingStatus.COMPLETED) {
            throw new ResourceConflictException("A completed booking cannot be cancelled");
        }
        if (booking.getStatus() != BookingStatus.CANCELLED) {
            booking.setStatus(BookingStatus.CANCELLED);
            bookingRepository.save(booking);
        }
        return toResponse(booking);
    }

    @Transactional
    public void deleteBooking(Long id) {
        Booking booking = findBooking(id);
        assertGuestOwner(booking);
        if (booking.getStatus() != BookingStatus.PENDING && booking.getStatus() != BookingStatus.CANCELLED) {
            throw new ResourceConflictException("Only pending or cancelled bookings can be deleted");
        }
        bookingRepository.delete(booking);
        bookingRepository.flush();
    }

    private User currentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getName())) {
            throw new AccessDeniedException("A signed-in account is required");
        }
        return userRepository.findByEmailIgnoreCase(auth.getName())
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated account was not found"));
    }

    private void assertGuestOwner(Booking booking) {
        User user = currentUser();
        if (!booking.getGuest().getId().equals(user.getId())) {
            throw new AccessDeniedException("You can view or manage only your own bookings");
        }
    }

    private Booking findBooking(Long id) {
        if (id == null || id < 1) throw new IllegalArgumentException("booking id must be a positive integer");
        return bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking with id " + id + " was not found"));
    }

    private void validatePagination(int page, int size) {
        if (page < 0) throw new IllegalArgumentException("page must be zero or greater");
        if (size < 1 || size > MAX_PAGE_SIZE) throw new IllegalArgumentException("size must be between 1 and " + MAX_PAGE_SIZE);
    }

    private void validateOptionalId(Long id, String name) {
        if (id != null && id < 1) throw new IllegalArgumentException(name + " must be a positive integer");
    }

    private String resolveSortField(String sortBy) {
        String requested = sortBy == null || sortBy.isBlank() ? "createdAt" : sortBy.trim();
        String field = SORT_FIELDS.get(requested.toLowerCase());
        if (field == null) throw new IllegalArgumentException(
                "Unsupported sortBy field. Allowed values: id, checkIn, checkOut, guests, status, totalPrice, createdAt, updatedAt");
        return field;
    }

    private Sort.Direction resolveDirection(String direction) {
        try {
            return Sort.Direction.fromString(direction == null || direction.isBlank() ? "desc" : direction.trim());
        } catch (IllegalArgumentException exception) {
            throw new IllegalArgumentException("direction must be either 'asc' or 'desc'");
        }
    }

    private void validateDateRange(LocalDate checkIn, LocalDate checkOut) {
        if (checkIn == null || checkOut == null || !checkOut.isAfter(checkIn)) {
            throw new IllegalArgumentException("checkOut must be after checkIn");
        }
    }

    private void validateGuestCount(int guests, Listing listing) {
        if (guests < 1) throw new IllegalArgumentException("guests must be at least 1");
        if (guests > listing.getMaxGuests()) {
            throw new IllegalArgumentException("guests cannot exceed this listing's maximum of " + listing.getMaxGuests());
        }
    }

    private void ensureAvailable(Long listingId, LocalDate checkIn, LocalDate checkOut, Long excludeBookingId) {
        if (bookingRepository.existsOverlappingBooking(listingId, checkIn, checkOut, BLOCKING_STATUSES, excludeBookingId)) {
            throw new ResourceConflictException("The listing is already booked for one or more selected nights");
        }
    }

    private BigDecimal calculateTotalPrice(Listing listing, LocalDate checkIn, LocalDate checkOut) {
        long nights = ChronoUnit.DAYS.between(checkIn, checkOut);
        return listing.getNightlyPrice().multiply(BigDecimal.valueOf(nights)).setScale(2, RoundingMode.HALF_UP);
    }

    private BookingResponse toResponse(Booking booking) {
        return new BookingResponse(booking.getId(), booking.getGuest().getId(), booking.getGuest().getName(),
                booking.getListing().getId(), booking.getListing().getTitle(), booking.getCheckIn(),
                booking.getCheckOut(), booking.getGuests(), booking.getStatus(), booking.getTotalPrice(),
                booking.getCreatedAt(), booking.getUpdatedAt());
    }
}
