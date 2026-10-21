package com.wanderlust.api.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

/** Host identity is taken from the signed-in principal rather than trusted from the payload. */
public record ListingCreateRequest(
        @NotBlank @Size(max = 120) String title,
        @NotBlank @Size(max = 5000) String description,
        @NotBlank @Size(max = 100) String city,
        @NotBlank @Size(max = 100) String country,
        @NotNull @DecimalMin("0.01") @Digits(integer = 8, fraction = 2) BigDecimal nightlyPrice,
        @Min(1) @Max(100) int maxGuests,
        @Min(0) @Max(100) int bedrooms,
        @NotNull @DecimalMin("0.5") @Digits(integer = 2, fraction = 1) BigDecimal bathrooms
) {
}
