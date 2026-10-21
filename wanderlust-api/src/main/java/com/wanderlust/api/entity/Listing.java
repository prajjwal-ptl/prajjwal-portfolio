package com.wanderlust.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(
        name = "listings",
        indexes = {
                @Index(name = "idx_listings_host", columnList = "host_id"),
                @Index(name = "idx_listings_location", columnList = "country, city")
        }
)
public class Listing extends AuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 120)
    @Column(nullable = false, length = 120)
    private String title;

    @NotBlank
    @Size(max = 5000)
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @NotBlank
    @Size(max = 100)
    @Column(nullable = false, length = 100)
    private String city;

    @NotBlank
    @Size(max = 100)
    @Column(nullable = false, length = 100)
    private String country;

    @NotNull
    @DecimalMin(value = "0.01")
    @Digits(integer = 8, fraction = 2)
    @Column(name = "nightly_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal nightlyPrice;

    @Min(1)
    @Max(100)
    @Column(name = "max_guests", nullable = false)
    private int maxGuests = 1;

    @Min(0)
    @Max(100)
    @Column(nullable = false)
    private int bedrooms;

    @NotNull
    @DecimalMin(value = "0.5")
    @Digits(integer = 2, fraction = 1)
    @Column(nullable = false, precision = 3, scale = 1)
    private BigDecimal bathrooms;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "host_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_listings_host"))
    private User host;

    @OneToMany(mappedBy = "listing", fetch = FetchType.LAZY)
    private List<Booking> bookings = new ArrayList<>();

    @OneToMany(mappedBy = "listing", fetch = FetchType.LAZY)
    private List<Review> reviews = new ArrayList<>();
}
