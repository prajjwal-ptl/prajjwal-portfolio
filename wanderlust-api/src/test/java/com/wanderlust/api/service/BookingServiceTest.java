package com.wanderlust.api.service;

import com.wanderlust.api.repository.BookingRepository;
import com.wanderlust.api.repository.ListingRepository;
import com.wanderlust.api.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertThrows;

@ExtendWith(MockitoExtension.class)
class BookingServiceTest {
    @Mock private BookingRepository bookingRepository;
    @Mock private UserRepository userRepository;
    @Mock private ListingRepository listingRepository;

    @InjectMocks
    private BookingService bookingService;

    @Test
    void rejectsNegativePageBeforeDatabaseAccess() {
        assertThrows(IllegalArgumentException.class,
                () -> bookingService.searchBookings(-1, 20, "createdAt", "desc", null, null, null));
    }

    @Test
    void rejectsUnsupportedSortFieldsBeforeAuthenticationLookup() {
        assertThrows(IllegalArgumentException.class,
                () -> bookingService.searchBookings(0, 20, "guest.passwordHash", "asc", null, null, null));
    }
}
