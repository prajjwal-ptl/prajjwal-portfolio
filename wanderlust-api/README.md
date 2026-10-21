# wanderlust-api

Spring Boot 3 REST API starter for the WanderLust travel application. Uses Maven, Java 17, Spring Web, Spring Data JPA, MySQL Connector/J, Validation, Spring Security, and Lombok.

## Domain model

- `User`: a member who may host listings, book stays as a guest, and write reviews.
- `Listing`: a property belonging to one host; it can have many bookings and reviews.
- `Booking`: one guest's reservation for one listing, with dates, party size, status, and total price.
- `Review`: a rating and optional comment authored by a user for a listing. A unique constraint currently allows one review per author per listing.
- `AuditableEntity`: shared `createdAt` and `updatedAt` timestamps inherited by all four entities.
- `BookingStatus`: enum persisted as text values: PENDING, CONFIRMED, CANCELLED, COMPLETED.

All associations are lazy-loaded. The `ManyToOne` associations own the foreign keys; `OneToMany(mappedBy = ...)` collections are the inverse side. Cascading deletes are intentionally not enabled.

## MySQL schema

The matching schema is `src/main/resources/db/schema-mysql.sql`. Create the database first:

    CREATE DATABASE wanderlust_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

Then run the schema file against `wanderlust_db`, for example:

    mysql -u root -p wanderlust_db < src/main/resources/db/schema-mysql.sql

Set DB_USERNAME and DB_PASSWORD to your local MySQL credentials. Set API_USER and API_PASSWORD to non-default values too. Never store a raw password in the users table; passwordHash is intended for a secure hash.

## Run

Requires JDK 17, Maven, and MySQL.

    mvn test
    mvn spring-boot:run

The public starter health endpoint is GET /api/health. Other endpoints require HTTP Basic authentication until explicit access rules are added.

## Notes

- `spring.jpa.hibernate.ddl-auto=update` is a development convenience. If you create the schema manually, use `DDL_AUTO=validate` to let Hibernate validate it.
- Check-in/check-out business rules, availability overlap detection, permission checks, and price calculations should also be enforced in the service layer.
- Use DTOs for REST input/output rather than exposing JPA entities directly.
