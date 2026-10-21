package com.wanderlust.api.repository;

import com.wanderlust.api.entity.Booking;
import com.wanderlust.api.entity.BookingStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Query("""
            SELECT b
            FROM Booking b
            WHERE (:guestId IS NULL OR b.guest.id = :guestId)
              AND (:listingId IS NULL OR b.listing.id = :listingId)
              AND (:status IS NULL OR b.status = :status)
            """)
    Page<Booking> search(
            @Param("guestId") Long guestId,
            @Param("listingId") Long listingId,
            @Param("status") BookingStatus status,
            Pageable pageable
    );

    @Query("""
            SELECT CASE WHEN COUNT(b) > 0 THEN true ELSE false END
            FROM Booking b
            WHERE b.listing.id = :listingId
              AND b.status IN :blockingStatuses
              AND b.checkIn < :checkOut
              AND b.checkOut > :checkIn
              AND (:excludeBookingId IS NULL OR b.id <> :excludeBookingId)
            """)
    boolean existsOverlappingBooking(
            @Param("listingId") Long listingId,
            @Param("checkIn") LocalDate checkIn,
            @Param("checkOut") LocalDate checkOut,
            @Param("blockingStatuses") List<BookingStatus> blockingStatuses,
            @Param("excludeBookingId") Long excludeBookingId
    );
}
