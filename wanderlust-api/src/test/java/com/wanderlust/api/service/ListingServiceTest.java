package com.wanderlust.api.service;

import com.wanderlust.api.repository.ListingRepository;
import com.wanderlust.api.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertThrows;

@ExtendWith(MockitoExtension.class)
class ListingServiceTest {

    @Mock
    private ListingRepository listingRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ListingService listingService;

    @Test
    void rejectsNegativePage() {
        assertThrows(IllegalArgumentException.class,
                () -> listingService.searchListings(-1, 20, "createdAt", "desc", null, null, null));
    }

    @Test
    void rejectsPageSizeAboveLimit() {
        assertThrows(IllegalArgumentException.class,
                () -> listingService.searchListings(0, 101, "createdAt", "desc", null, null, null));
    }

    @Test
    void rejectsInvertedPriceRange() {
        assertThrows(IllegalArgumentException.class,
                () -> listingService.searchListings(
                        0, 20, "createdAt", "desc", null,
                        new BigDecimal("200.00"), new BigDecimal("100.00")));
    }

    @Test
    void rejectsUnsupportedSortFields() {
        assertThrows(IllegalArgumentException.class,
                () -> listingService.searchListings(0, 20, "passwordHash", "asc", null, null, null));
    }
}
