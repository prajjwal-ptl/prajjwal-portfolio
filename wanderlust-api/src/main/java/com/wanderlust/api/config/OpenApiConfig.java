package com.wanderlust.api.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(info = @Info(
        title = "WanderLust API",
        version = "v1",
        description = "REST API for listings, bookings, and account authentication."
))
@SecurityScheme(name = "bearerAuth", type = SecuritySchemeType.HTTP, scheme = "bearer",
        bearerFormat = "JWT", in = SecuritySchemeIn.HEADER,
        description = "Paste the token returned by POST /api/auth/login without the literal word Bearer.")
public class OpenApiConfig {
}