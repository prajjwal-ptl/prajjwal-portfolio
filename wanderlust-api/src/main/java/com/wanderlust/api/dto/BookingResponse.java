package com.wanderlust.api.dto;

import com.wanderlust.api.entity.BookingStatus;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

public record BookingResponse(
        Long id,
        Long guestId,
        String guestName,
        Long listingId,
        String listingTitle,
        LocalDate checkIn,
        LocalDate checkOut,
        int guests,
        BookingStatus status,
        BigDecimal totalPrice,
        Instant createdAt,
        Instant updatedAt
) {
}
