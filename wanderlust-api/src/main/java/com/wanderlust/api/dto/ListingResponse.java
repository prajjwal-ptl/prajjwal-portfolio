package com.wanderlust.api.dto;

import java.math.BigDecimal;
import java.time.Instant;

public record ListingResponse(
        Long id,
        String title,
        String description,
        String city,
        String country,
        BigDecimal nightlyPrice,
        int maxGuests,
        int bedrooms,
        BigDecimal bathrooms,
        Long hostId,
        String hostName,
        Instant createdAt,
        Instant updatedAt
) {
}
