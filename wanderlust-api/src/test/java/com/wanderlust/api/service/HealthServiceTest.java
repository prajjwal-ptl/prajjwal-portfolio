package com.wanderlust.api.service;

import com.wanderlust.api.dto.HealthResponse;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class HealthServiceTest {
    @Test
    void reportsApiAsUp() {
        HealthResponse response = new HealthService().getHealth();
        assertEquals("UP", response.status());
        assertEquals("wanderlust-api", response.application());
    }
}
