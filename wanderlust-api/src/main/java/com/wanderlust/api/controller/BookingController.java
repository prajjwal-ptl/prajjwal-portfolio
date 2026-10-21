package com.wanderlust.api.controller;

import com.wanderlust.api.dto.BookingCreateRequest;
import com.wanderlust.api.dto.BookingResponse;
import com.wanderlust.api.dto.BookingUpdateRequest;
import com.wanderlust.api.dto.PageResponse;
import com.wanderlust.api.entity.BookingStatus;
import com.wanderlust.api.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(name = "Bookings", description = "Create and manage guest reservations.")
@SecurityRequirement(name = "bearerAuth")
@RequestMapping("/api/bookings")
public class BookingController {
    private final BookingService bookingService;
    public BookingController(BookingService bookingService) { this.bookingService = bookingService; }

    @Operation(summary = "Search your bookings")
    @GetMapping
    public PageResponse<BookingResponse> searchBookings(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(required = false) Long guestId,
            @RequestParam(required = false) Long listingId,
            @RequestParam(required = false) BookingStatus status) {
        return bookingService.searchBookings(page, size, sortBy, direction, guestId, listingId, status);
    }

    @Operation(summary = "Get one of your bookings")
    @GetMapping("/{id}")
    public ResponseEntity<BookingResponse> getBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.getBooking(id));
    }

    @Operation(summary = "Create a booking")
    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(@Valid @RequestBody BookingCreateRequest request,
                                                         UriComponentsBuilder uriBuilder) {
        BookingResponse created = bookingService.createBooking(request);
        return ResponseEntity.created(uriBuilder.path("/api/bookings/{id}").buildAndExpand(created.id()).toUri()).body(created);
    }

    @Operation(summary = "Update one of your pending bookings")
    @PutMapping("/{id}")
    public ResponseEntity<BookingResponse> updateBooking(@PathVariable Long id, @Valid @RequestBody BookingUpdateRequest request) {
        return ResponseEntity.ok(bookingService.updateBooking(id, request));
    }

    @Operation(summary = "Cancel one of your bookings")
    @PatchMapping("/{id}/cancel")
    public ResponseEntity<BookingResponse> cancelBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.cancelBooking(id));
    }

    @Operation(summary = "Delete a pending or cancelled booking")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }
}