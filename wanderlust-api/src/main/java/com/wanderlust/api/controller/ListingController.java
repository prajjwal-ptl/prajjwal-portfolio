package com.wanderlust.api.controller;

import com.wanderlust.api.dto.ListingCreateRequest;
import com.wanderlust.api.dto.ListingResponse;
import com.wanderlust.api.dto.ListingUpdateRequest;
import com.wanderlust.api.dto.PageResponse;
import com.wanderlust.api.service.ListingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import java.math.BigDecimal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(name = "Listings", description = "Search and manage travel listings.")
@RequestMapping("/api/listings")
public class ListingController {
    private final ListingService listingService;
    public ListingController(ListingService listingService) { this.listingService = listingService; }

    @Operation(summary = "Search listings", description = "Filter by location and price; paginate and sort.")
    @GetMapping
    public ResponseEntity<PageResponse<ListingResponse>> searchListings(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice) {
        return ResponseEntity.ok(listingService.searchListings(page, size, sortBy, direction, location, minPrice, maxPrice));
    }

    @Operation(summary = "Get a listing")
    @GetMapping("/{id}")
    public ResponseEntity<ListingResponse> getListing(@PathVariable Long id) {
        return ResponseEntity.ok(listingService.getListing(id));
    }

    @Operation(summary = "Create a listing", security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping
    public ResponseEntity<ListingResponse> createListing(@Valid @RequestBody ListingCreateRequest request,
                                                         UriComponentsBuilder uriBuilder) {
        ListingResponse created = listingService.createListing(request);
        return ResponseEntity.created(uriBuilder.path("/api/listings/{id}").buildAndExpand(created.id()).toUri()).body(created);
    }

    @Operation(summary = "Update a listing you own", security = @SecurityRequirement(name = "bearerAuth"))
    @PutMapping("/{id}")
    public ResponseEntity<ListingResponse> updateListing(@PathVariable Long id,
                                                         @Valid @RequestBody ListingUpdateRequest request) {
        return ResponseEntity.ok(listingService.updateListing(id, request));
    }

    @Operation(summary = "Delete a listing you own", security = @SecurityRequirement(name = "bearerAuth"))
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteListing(@PathVariable Long id) {
        listingService.deleteListing(id);
        return ResponseEntity.noContent().build();
    }
}