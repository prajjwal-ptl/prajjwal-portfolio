package com.wanderlust.api.dto;

import java.util.List;

public record AuthResponse(
        String accessToken,
        String tokenType,
        long expiresInSeconds,
        Long userId,
        String name,
        String email,
        List<String> roles
) {
}
