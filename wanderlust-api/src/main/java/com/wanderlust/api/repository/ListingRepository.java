package com.wanderlust.api.repository;

import com.wanderlust.api.entity.Listing;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;

public interface ListingRepository extends JpaRepository<Listing, Long> {

    @Query("""
            SELECT l
            FROM Listing l
            WHERE (:location IS NULL
                   OR LOWER(l.city) LIKE LOWER(CONCAT('%', :location, '%'))
                   OR LOWER(l.country) LIKE LOWER(CONCAT('%', :location, '%')))
              AND (:minPrice IS NULL OR l.nightlyPrice >= :minPrice)
              AND (:maxPrice IS NULL OR l.nightlyPrice <= :maxPrice)
            """)
    Page<Listing> search(
            @Param("location") String location,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            Pageable pageable
    );
}
