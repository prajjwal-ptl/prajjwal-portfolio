package com.wanderlust.api.dto;

import java.util.List;

/** Stable API page shape, independent of Spring Data's internal Page JSON representation. */
public record PageResponse<T>(
        List<T> content,
        int page,
        int size,
        long totalElements,
        int totalPages,
        boolean first,
        boolean last,
        String sortBy,
        String direction
) {
}
