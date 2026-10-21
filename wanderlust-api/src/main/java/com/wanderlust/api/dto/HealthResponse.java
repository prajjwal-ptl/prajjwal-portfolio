package com.wanderlust.api.dto;

/** Small response DTO for checking that the API is running. */
public record HealthResponse(String status, String application) {
}
