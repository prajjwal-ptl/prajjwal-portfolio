# wanderlust-api

Spring Boot 3 REST API starter for the WanderLust travel application. Uses Maven, Java 17, Spring Web, Spring Data JPA, MySQL Connector/J, Validation, Spring Security, and Lombok.

## Listing API

| Method | Path | Success status | Purpose |
|---|---|---:|---|
| GET | `/api/listings` | 200 | Search with pagination, sorting, location and price filters |
| GET | `/api/listings/{id}` | 200 | Get one listing |
| POST | `/api/listings` | 201 | Create a listing; includes a Location header |
| PUT | `/api/listings/{id}` | 200 | Replace editable listing fields |
| DELETE | `/api/listings/{id}` | 204 | Delete when database constraints permit |

Search example:

```http
GET /api/listings?page=0&size=20&sortBy=nightlyPrice&direction=asc&location=Delhi&minPrice=1000&maxPrice=5000
```

Allowed Listing sort fields: `id`, `title`, `city`, `country`, `nightlyPrice`, `createdAt`, `updatedAt`.

## Booking API

| Method | Path | Success status | Purpose |
|---|---|---:|---|
| GET | `/api/bookings` | 200 | Paginated list, optionally filtered by guest, listing or status |
| GET | `/api/bookings/{id}` | 200 | Get one booking |
| POST | `/api/bookings` | 201 | Create a pending booking; includes a Location header |
| PUT | `/api/bookings/{id}` | 200 | Change dates/guest count while booking is pending |
| PATCH | `/api/bookings/{id}/cancel` | 200 | Cancel a pending or confirmed booking |
| DELETE | `/api/bookings/{id}` | 204 | Permanently remove a pending or cancelled booking |

Booking search example:

```http
GET /api/bookings?page=0&size=20&sortBy=checkIn&direction=asc&guestId=4&status=CONFIRMED
```

Allowed Booking sort fields: `id`, `checkIn`, `checkOut`, `guests`, `status`, `totalPrice`, `createdAt`, `updatedAt`.

Creating a booking takes `guestId`, `listingId`, `checkIn`, `checkOut`, and `guests`. The service looks up the guest and listing, checks the guest limit, checks date overlap against pending/confirmed reservations, and calculates the total using the listing's nightly price. Only pending bookings can be edited; confirmed/completed bookings retain their history.

## Consistent errors

The global `@RestControllerAdvice` returns a JSON error body in this shape:

```json
{
  "timestamp": "2026-10-21T10:00:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Request validation failed",
  "fieldErrors": {
    "checkOut": "checkOut must be after checkIn"
  }
}
```

The handler maps validation and malformed input to 400, missing resources to 404, conflicting state/database constraints to 409, and unsupported HTTP methods to 405.

## Architecture

Controllers handle HTTP bindings and response status codes only. DTOs validate input and shape output. Services own business rules, transactional boundaries, mapping and search validation. Repositories persist and query entities.

**Authorization follow-up:** the starter currently uses HTTP Basic authentication, but that authentication is not yet linked to the application's `User` entity. Before production, derive guest/host identity from the authenticated principal and enforce ownership checks instead of trusting caller-supplied user IDs.

## Domain model

- `User`: a member who may host listings, book stays as a guest, and write reviews.
- `Listing`: a property belonging to one host; it can have many bookings and reviews.
- `Booking`: one guest's reservation for one listing, with dates, party size, status, and total price.
- `Review`: a rating and optional comment authored by a user for a listing. A unique constraint currently allows one review per author per listing.
- `AuditableEntity`: shared `createdAt` and `updatedAt` timestamps inherited by all four entities.
- `BookingStatus`: enum persisted as text values: PENDING, CONFIRMED, CANCELLED, COMPLETED.

## MySQL schema

The matching schema is `src/main/resources/db/schema-mysql.sql`. Create the database first:

```sql
CREATE DATABASE wanderlust_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Then run the schema file against `wanderlust_db`:

```bash
mysql -u root -p wanderlust_db < src/main/resources/db/schema-mysql.sql
```

Set `DB_USERNAME` and `DB_PASSWORD` to your local MySQL credentials. Set `API_USER` and `API_PASSWORD` to non-default values too. Never store a raw password in the users table; `passwordHash` is intended for a secure hash.

## Run

Requires JDK 17, Maven, and MySQL.

```bash
mvn test
mvn spring-boot:run
```

The public starter health endpoint is GET `/api/health`; listing and booking endpoints require HTTP Basic authentication.

## Notes

- `spring.jpa.hibernate.ddl-auto=update` is a development convenience. If you create the schema manually, use `DDL_AUTO=validate` to let Hibernate validate it.
- Confirmed bookings cannot be deleted directly; cancel them first. A completed booking cannot be cancelled.
- The current overlap check prevents conflicts across concurrent existing PENDING/CONFIRMED bookings but relies on the database/service transaction strategy; high-concurrency booking systems should also use a locking or equivalent reservation strategy.
