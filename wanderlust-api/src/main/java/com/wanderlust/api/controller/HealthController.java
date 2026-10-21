package com.wanderlust.api.controller;

import com.wanderlust.api.dto.HealthResponse;
import com.wanderlust.api.service.HealthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class HealthController {
    private final HealthService healthService;

    @GetMapping("/health")
    public HealthResponse health() {
        return healthService.getHealth();
    }
}
