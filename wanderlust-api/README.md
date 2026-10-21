# wanderlust-api

Spring Boot 3 REST API starter for WanderLust, using Maven, Java 17, Spring Web, Spring Data JPA, MySQL, Validation, Spring Security, BCrypt, and JWT (JJWT).

## Authentication

Generate a Base64 signing secret locally; don't commit the value:

```bash
openssl rand -base64 32
```

Export it as `JWT_SECRET` before launching the application. Optionally set `JWT_EXPIRATION_MS` (default 3,600,000 ms / 1 hour).

### Register

```http
POST /api/auth/register
Content-Type: application/json
```

```json
{
  "name": "Alex Host",
  "email": "alex@example.com",
  "password": "a-long-demo-password",
  "role": "HOST"
}
```

Supported roles are `USER` and `HOST`; if role is omitted, it defaults to `USER`. The response contains a signed access token and basic account details. Host registration is open in this learning starter; a deployed marketplace should gate HOST role assignment behind an approval/onboarding workflow.

### Login

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "email": "alex@example.com",
  "password": "a-long-demo-password"
}
```

Use the returned token on protected routes:

```http
Authorization: Bearer <accessToken>
```

Passwords are encoded with BCrypt before persistence. Raw passwords are never stored. Tokens are stateless, signed and expire; the user/role data is reloaded from the database when a token is used.

## Spring Security filter chain — interview walkthrough

1. **Request enters the servlet filter chain.** Spring Security applies the configured `SecurityFilterChain` to the request.
2. **JWT filter runs before username/password authentication.** `JwtAuthenticationFilter` reads the `Authorization: Bearer ...` header. If there's no bearer token, it continues anonymously.
3. **Token is verified, not merely decoded.** `JwtService` checks the signature using the server-side secret and checks expiry; a modified or expired token is not accepted.
4. **User details and authorities are loaded.** The token subject is the account email. `CustomUserDetailsService` loads the current account and builds `ROLE_USER` or `ROLE_HOST` authorities from the database.
5. **SecurityContext is populated.** On success, the filter creates an authenticated `UsernamePasswordAuthenticationToken` and stores it in `SecurityContextHolder` for this request.
6. **Authorization rules run.** Public GET listing routes and auth routes are permitted. Listing write routes require `ROLE_HOST`; booking routes require `ROLE_USER` or `ROLE_HOST`.
7. **Service-level ownership is checked.** A HOST role is not enough to alter any listing. `ListingService` fetches the authenticated account and compares its id with `listing.host.id` for update/delete.
8. **Success or consistent error response.** Controllers return appropriate status codes; `ApiExceptionHandler` formats application errors, while the configured security entry point and access-denied handler return JSON for 401/403 from the security layer.

**Interview distinction:** authentication answers “who are you?”; authorization answers “what may you do?” Role checks permit the host category, and the service's owner check restricts a host to their own listing.

## Listing API

| Method | Path | Status | Purpose |
|---|---|---:|---|
| GET | `/api/listings` | 200 | Search/filter/paginate/sort; public |
| GET | `/api/listings/{id}` | 200 | Retrieve one listing; public |
| POST | `/api/listings` | 201 | Create as authenticated HOST; server assigns the host |
| PUT | `/api/listings/{id}` | 200 | Update your own listing as HOST |
| DELETE | `/api/listings/{id}` | 204 | Delete your own listing if database constraints allow |

Search example:

```http
GET /api/listings?page=0&size=20&sortBy=nightlyPrice&direction=asc&location=Delhi&minPrice=1000&maxPrice=5000
```

Allowed sort fields: `id`, `title`, `city`, `country`, `nightlyPrice`, `createdAt`, `updatedAt`.

## Booking API

| Method | Path | Status | Purpose |
|---|---|---:|---|
| GET | `/api/bookings` | 200 | Paginated bookings for the signed-in guest |
| GET | `/api/bookings/{id}` | 200 | Retrieve your booking |
| POST | `/api/bookings` | 201 | Create a pending booking; sends `listingId`, `checkIn`, `checkOut`, `guests` |
| PUT | `/api/bookings/{id}` | 200 | Update your pending booking |
| PATCH | `/api/bookings/{id}/cancel` | 200 | Cancel your booking |
| DELETE | `/api/bookings/{id}` | 204 | Delete your pending/cancelled booking |

The guest id is derived from the JWT; a caller cannot impersonate another guest by passing a different id. Booking overlap checks cover existing PENDING/CONFIRMED bookings; high-concurrency production booking should also use locking or a dedicated reservation strategy.

## Consistent error JSON

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

Typical error statuses: 400 invalid input; 401 missing/invalid authentication; 403 insufficient role or resource ownership; 404 resource missing; 409 overlapping booking or database constraint conflict; 405 unsupported HTTP method; 500 unexpected server error.

## MySQL setup

```sql
CREATE DATABASE wanderlust_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Run the schema:

```bash
mysql -u root -p wanderlust_db < src/main/resources/db/schema-mysql.sql
```

Ensure `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` and `JWT_SECRET` are set. Use `DDL_AUTO=validate` for production after applying schema migrations; `update` is a local development convenience.

## Run

```bash
mvn test
mvn spring-boot:run
```


## Swagger / OpenAPI

This project uses `springdoc-openapi-starter-webmvc-ui` 2.9.1 for Spring Boot 3.x. The interactive API docs are available at:

- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`
- OpenAPI YAML: `http://localhost:8080/v3/api-docs.yaml`

The `OpenApiConfig` class documents the API and registers the HTTP Bearer JWT scheme. In Swagger UI, click **Authorize** and paste the token returned by login, without adding the literal word `Bearer`. Spring Security explicitly permits the documentation endpoints.

## Run with Docker Compose

Prerequisites: Docker Engine and the Docker Compose plugin.

1. Copy `.env.example` to `.env` from this directory.
2. Replace each example password. Set `JWT_SECRET` to the output of `openssl rand -base64 32`. Do not commit `.env`.
3. Build and start the app and database:

```bash
docker compose up --build
```

Compose waits for MySQL's health check before starting the API. The API is exposed at `http://localhost:8080`, Swagger UI at `http://localhost:8080/swagger-ui.html`, and MySQL at `localhost:3307` for local development. Data persists in the named `mysql_data` volume.

Stop containers with `docker compose down`. To remove the database volume as well (this deletes local database data), use `docker compose down -v`. Rebuild after code changes with `docker compose up --build`.

The Dockerfile builds with Maven/JDK 17 and runs the packaged JAR from a smaller JRE image as a non-root user. The container Compose network makes the database available to the application as host `mysql`; don't use `localhost` inside the app container.

## Security production checklist

- Put host-role assignment behind host verification, rather than open registration.
- Keep the JWT secret out of source control and use a secret manager.
- Configure TLS, rate limiting on auth routes, password reset, token revocation/rotation, and audit logs as needed.
- For browser sessions/cookies, revisit CSRF strategy instead of blindly disabling CSRF.
- Consider rate limits and a locking strategy for booking overlap under concurrent requests.
