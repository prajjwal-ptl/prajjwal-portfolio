package com.wanderlust.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(
        name = "bookings",
        indexes = {
                @Index(name = "idx_bookings_guest", columnList = "guest_id"),
                @Index(name = "idx_bookings_listing_dates", columnList = "listing_id, check_in, check_out")
        }
)
public class Booking extends AuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "guest_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_bookings_guest"))
    private User guest;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "listing_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_bookings_listing"))
    private Listing listing;

    @NotNull
    @Column(name = "check_in", nullable = false)
    private LocalDate checkIn;

    @NotNull
    @Column(name = "check_out", nullable = false)
    private LocalDate checkOut;

    @Min(1)
    @Column(nullable = false)
    private int guests = 1;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private BookingStatus status = BookingStatus.PENDING;

    @NotNull
    @DecimalMin(value = "0.00")
    @Digits(integer = 8, fraction = 2)
    @Column(name = "total_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalPrice = BigDecimal.ZERO;

    @AssertTrue(message = "checkOut must be after checkIn")
    public boolean isDateRangeValid() {
        return checkIn == null || checkOut == null || checkOut.isAfter(checkIn);
    }
}
