package com.wanderlust.api.dto;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;

/** Guest identity is always taken from the signed-in principal, never from the JSON body. */
public record BookingCreateRequest(
        @NotNull @Positive Long listingId,
        @NotNull LocalDate checkIn,
        @NotNull LocalDate checkOut,
        @Min(1) int guests
) {
    @AssertTrue(message = "checkOut must be after checkIn")
    public boolean isDateRangeValid() {
        return checkIn == null || checkOut == null || checkOut.isAfter(checkIn);
    }
}
