# wanderlust-api

Spring Boot 3 REST API starter for WanderLust. Uses Maven, Java 17, Spring Web, Spring Data JPA, MySQL Connector/J, Validation, Spring Security, and Lombok.

## Folder guide

```text
wanderlust-api/
├── pom.xml
├── README.md
├── .gitignore
└── src/
    ├── main/
    │   ├── java/com/wanderlust/api/
    │   │   ├── WanderlustApiApplication.java
    │   │   ├── config/       # Security and framework configuration
    │   │   ├── controller/   # HTTP/REST endpoints
    │   │   ├── service/      # Business rules and application logic
    │   │   ├── repository/   # Spring Data database interfaces
    │   │   ├── entity/       # JPA classes mapped to MySQL tables
    │   │   ├── dto/          # Request/response objects
    │   │   └── exception/    # Custom exceptions and global error handlers
    │   └── resources/
    │       └── application.properties
    └── test/java/com/wanderlust/api/service/
        └── HealthServiceTest.java
```

## Prerequisites
- JDK 17
- Maven 3.6.3 or later
- MySQL 8.x or compatible

Create the database once:

```sql
CREATE DATABASE wanderlust_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Set DB_USERNAME and DB_PASSWORD in your IDE run configuration or shell to match your local MySQL account. The properties contain local-only fallback values; replace them and do not commit real credentials. Set API_USER and API_PASSWORD as well—the fallback Basic Auth password is only a placeholder.

## Run

```bash
mvn test
mvn spring-boot:run
```

The service listens on http://localhost:8080. Check it with:

```bash
curl http://localhost:8080/api/health
```

Expected response:

```json
{"status":"UP","application":"wanderlust-api"}
```

The health route is public. Other routes require HTTP Basic authentication until specific authorization rules are implemented.

## Notes
- spring.jpa.hibernate.ddl-auto=update is for development. For production, use validate plus a migration tool.
- spring.jpa.open-in-view=false avoids keeping persistence sessions open across request processing.
- This is a scaffold with a health endpoint; travel-domain entities and CRUD endpoints are not implemented yet.
