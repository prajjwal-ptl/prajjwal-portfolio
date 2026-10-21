package com.wanderlust.api.service;

import com.wanderlust.api.dto.AuthResponse;
import com.wanderlust.api.dto.LoginRequest;
import com.wanderlust.api.dto.RegisterRequest;
import com.wanderlust.api.entity.Role;
import com.wanderlust.api.entity.User;
import com.wanderlust.api.exception.ResourceConflictException;
import com.wanderlust.api.exception.ResourceNotFoundException;
import com.wanderlust.api.repository.UserRepository;
import com.wanderlust.api.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.EnumSet;
import java.util.Locale;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String email = normalizeEmail(request.email());
        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new ResourceConflictException("An account with this email already exists");
        }
        Role role = request.role() == null ? Role.USER : request.role();
        User user = new User();
        user.setName(request.name().trim());
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setRoles(EnumSet.of(role));
        User saved = userRepository.save(user);
        return toResponse(saved, buildUserDetails(saved));
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        String email = normalizeEmail(request.email());
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, request.password())
        );
        User user = userRepository.findByEmailIgnoreCase(authentication.getName())
                .orElseThrow(() -> new ResourceNotFoundException("Account not found"));
        return toResponse(user, (UserDetails) authentication.getPrincipal());
    }

    private UserDetails buildUserDetails(User user) {
        String[] authorities = user.getRoles().stream()
                .map(role -> "ROLE_" + role.name())
                .toArray(String[]::new);
        return org.springframework.security.core.userdetails.User.withUsername(user.getEmail())
                .password(user.getPasswordHash()).authorities(authorities).build();
    }

    private AuthResponse toResponse(User user, UserDetails principal) {
        return new AuthResponse(jwtService.generateToken(principal), "Bearer", jwtService.getExpirationSeconds(),
                user.getId(), user.getName(), user.getEmail(),
                user.getRoles().stream().map(Enum::name).sorted().toList());
    }

    private String normalizeEmail(String email) {
        return email.trim().toLowerCase(Locale.ROOT);
    }
}
