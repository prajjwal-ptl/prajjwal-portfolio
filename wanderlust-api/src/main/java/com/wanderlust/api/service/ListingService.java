package com.wanderlust.api.service;

import com.wanderlust.api.dto.ListingCreateRequest;
import com.wanderlust.api.dto.ListingResponse;
import com.wanderlust.api.dto.ListingUpdateRequest;
import com.wanderlust.api.dto.PageResponse;
import com.wanderlust.api.entity.Listing;
import com.wanderlust.api.entity.Role;
import com.wanderlust.api.entity.User;
import com.wanderlust.api.exception.ResourceNotFoundException;
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
import java.util.List;
import java.util.Map;

@Service
public class ListingService {
    private static final int MAX_PAGE_SIZE = 100;
    private static final Map<String, String> SORT_FIELDS = Map.of(
            "id", "id", "title", "title", "city", "city", "country", "country",
            "nightlyprice", "nightlyPrice", "createdat", "createdAt", "updatedat", "updatedAt"
    );

    private final ListingRepository listingRepository;
    private final UserRepository userRepository;

    public ListingService(ListingRepository listingRepository, UserRepository userRepository) {
        this.listingRepository = listingRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public PageResponse<ListingResponse> searchListings(
            int page, int size, String sortBy, String direction, String location,
            BigDecimal minPrice, BigDecimal maxPrice
    ) {
        if (page < 0) throw new IllegalArgumentException("page must be zero or greater");
        if (size < 1 || size > MAX_PAGE_SIZE) throw new IllegalArgumentException("size must be between 1 and " + MAX_PAGE_SIZE);
        validatePriceRange(minPrice, maxPrice);
        String sortField = resolveSortField(sortBy);
        Sort.Direction sortDirection = resolveDirection(direction);
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortField));
        String normalizedLocation = location == null || location.isBlank() ? null : location.trim();
        Page<Listing> results = listingRepository.search(normalizedLocation, minPrice, maxPrice, pageable);
        List<ListingResponse> content = results.getContent().stream().map(this::toResponse).toList();
        return new PageResponse<>(content, results.getNumber(), results.getSize(),
                results.getTotalElements(), results.getTotalPages(), results.isFirst(), results.isLast(),
                sortField, sortDirection.name().toLowerCase());
    }

    @Transactional(readOnly = true)
    public ListingResponse getListing(Long id) {
        return toResponse(findListing(id));
    }

    @Transactional
    public ListingResponse createListing(ListingCreateRequest request) {
        User host = requireCurrentHost();
        Listing listing = new Listing();
        applyFields(listing, request);
        listing.setHost(host);
        return toResponse(listingRepository.save(listing));
    }

    @Transactional
    public ListingResponse updateListing(Long id, ListingUpdateRequest request) {
        Listing listing = findListing(id);
        assertOwner(listing);
        applyFields(listing, request);
        return toResponse(listingRepository.save(listing));
    }

    @Transactional
    public void deleteListing(Long id) {
        Listing listing = findListing(id);
        assertOwner(listing);
        listingRepository.delete(listing);
        listingRepository.flush();
    }

    private User requireCurrentHost() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getName())) {
            throw new AccessDeniedException("A signed-in host account is required");
        }
        User host = userRepository.findByEmailIgnoreCase(auth.getName())
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated account was not found"));
        if (host.getRoles() == null || !host.getRoles().contains(Role.HOST)) {
            throw new AccessDeniedException("A HOST role is required to manage listings");
        }
        return host;
    }

    private void assertOwner(Listing listing) {
        User currentHost = requireCurrentHost();
        if (listing.getHost() == null || !listing.getHost().getId().equals(currentHost.getId())) {
            throw new AccessDeniedException("You can edit or delete only listings that you own");
        }
    }

    private Listing findListing(Long id) {
        if (id == null || id < 1) throw new IllegalArgumentException("listing id must be a positive integer");
        return listingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Listing with id " + id + " was not found"));
    }

    private void validatePriceRange(BigDecimal minPrice, BigDecimal maxPrice) {
        if (minPrice != null && minPrice.signum() < 0) throw new IllegalArgumentException("minPrice must be zero or greater");
        if (maxPrice != null && maxPrice.signum() < 0) throw new IllegalArgumentException("maxPrice must be zero or greater");
        if (minPrice != null && maxPrice != null && minPrice.compareTo(maxPrice) > 0) {
            throw new IllegalArgumentException("minPrice cannot be greater than maxPrice");
        }
    }

    private String resolveSortField(String sortBy) {
        String requested = sortBy == null || sortBy.isBlank() ? "createdAt" : sortBy.trim();
        String field = SORT_FIELDS.get(requested.toLowerCase());
        if (field == null) throw new IllegalArgumentException(
                "Unsupported sortBy field. Allowed values: id, title, city, country, nightlyPrice, createdAt, updatedAt");
        return field;
    }

    private Sort.Direction resolveDirection(String direction) {
        try {
            return Sort.Direction.fromString(direction == null || direction.isBlank() ? "desc" : direction.trim());
        } catch (IllegalArgumentException exception) {
            throw new IllegalArgumentException("direction must be either 'asc' or 'desc'");
        }
    }

    private void applyFields(Listing listing, ListingCreateRequest request) {
        listing.setTitle(request.title().trim());
        listing.setDescription(request.description().trim());
        listing.setCity(request.city().trim());
        listing.setCountry(request.country().trim());
        listing.setNightlyPrice(request.nightlyPrice());
        listing.setMaxGuests(request.maxGuests());
        listing.setBedrooms(request.bedrooms());
        listing.setBathrooms(request.bathrooms());
    }

    private void applyFields(Listing listing, ListingUpdateRequest request) {
        listing.setTitle(request.title().trim());
        listing.setDescription(request.description().trim());
        listing.setCity(request.city().trim());
        listing.setCountry(request.country().trim());
        listing.setNightlyPrice(request.nightlyPrice());
        listing.setMaxGuests(request.maxGuests());
        listing.setBedrooms(request.bedrooms());
        listing.setBathrooms(request.bathrooms());
    }

    private ListingResponse toResponse(Listing listing) {
        return new ListingResponse(listing.getId(), listing.getTitle(), listing.getDescription(),
                listing.getCity(), listing.getCountry(), listing.getNightlyPrice(), listing.getMaxGuests(),
                listing.getBedrooms(), listing.getBathrooms(), listing.getHost().getId(), listing.getHost().getName(),
                listing.getCreatedAt(), listing.getUpdatedAt());
    }
}
