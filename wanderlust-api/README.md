# wanderlust-api

Spring Boot 3 REST API starter for the WanderLust travel application. Uses Maven, Java 17, Spring Web, Spring Data JPA, MySQL Connector/J, Validation, Spring Security, and Lombok.

## Listing CRUD API

The listing feature uses a thin controller, DTOs for request/response payloads, repository-based persistence/search, and a service layer for validation and business rules.

### Endpoints

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/listings` | Paginated and sorted listing search |
| GET | `/api/listings/{id}` | Retrieve one listing |
| POST | `/api/listings` | Create a listing |
| PUT | `/api/listings/{id}` | Replace editable listing fields |
| DELETE | `/api/listings/{id}` | Delete a listing when no restrictive related rows prevent it |

### Search, pagination, and sorting

Example:

```http
GET /api/listings?page=0&size=20&sortBy=nightlyPrice&direction=asc&location=Delhi&minPrice=1000&maxPrice=5000
```

- `page` is zero-based; default `0`.
- `size` defaults to `20` and is limited to `1..100`.
- `location` matches city or country, case-insensitively.
- `minPrice` and `maxPrice` are optional and inclusive.
- `sortBy` accepts `id`, `title`, `city`, `country`, `nightlyPrice`, `createdAt`, or `updatedAt`.
- `direction` is `asc` or `desc` (default `desc`).

The service layer checks page and size bounds, validates the price range and allowlists sort properties. Search filtering is expressed in a repository JPQL query and applied together with a Spring Data `Pageable`.

### Create listing example

```http
POST /api/listings
Content-Type: application/json
```

```json
{
  "title": "Quiet apartment near the metro",
  "description": "A bright apartment with a separate workspace.",
  "city": "Delhi",
  "country": "India",
  "nightlyPrice": 3200.00,
  "maxGuests": 3,
  "bedrooms": 2,
  "bathrooms": 1.5,
  "hostId": 1
}
```

Update accepts the same property fields except `hostId`, which is not mutable through this endpoint. DTOs are validated with Jakarta Bean Validation; errors have a consistent JSON shape. The API returns a stable page DTO rather than exposing Spring Data's internal page JSON representation.

**Security note:** the starter's HTTP Basic login is not yet linked to the application `User` entity. Before production, derive the acting host from the authenticated principal and enforce host/administrator authorization instead of trusting a caller-supplied `hostId` for listing creation.

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

```sql
CREATE DATABASE wanderlust_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Then run the schema file against `wanderlust_db`, for example:

```bash
mysql -u root -p wanderlust_db < src/main/resources/db/schema-mysql.sql
```

Set DB_USERNAME and DB_PASSWORD to your local MySQL credentials. Set API_USER and API_PASSWORD to non-default values too. Never store a raw password in the users table; passwordHash is intended for a secure hash.

## Run

Requires JDK 17, Maven, and MySQL.

```bash
mvn test
mvn spring-boot:run
```

The public starter health endpoint is GET /api/health. All listing endpoints require HTTP Basic authentication under the starter security configuration.

## Notes

- `spring.jpa.hibernate.ddl-auto=update` is a development convenience. If you create the schema manually, use `DDL_AUTO=validate` to let Hibernate validate it.
- Check-in/check-out business rules, availability overlap detection, permission checks, and price calculations should also be enforced in the service layer.
- Use DTOs for REST input/output rather than exposing JPA entities directly.
