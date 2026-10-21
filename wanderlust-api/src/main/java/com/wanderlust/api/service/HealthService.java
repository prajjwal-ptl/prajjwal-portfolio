package com.wanderlust.api.service;

import com.wanderlust.api.dto.HealthResponse;
import org.springframework.stereotype.Service;

@Service
public class HealthService {
    public HealthResponse getHealth() {
        return new HealthResponse("UP", "wanderlust-api");
    }
}
