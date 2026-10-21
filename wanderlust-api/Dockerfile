# Multi-stage build: compile with Maven/JDK, run on a smaller JRE image.
FROM maven:3.9.9-eclipse-temurin-17-alpine AS build
WORKDIR /workspace

COPY pom.xml .
RUN mvn -B -ntp dependency:go-offline

COPY src ./src
RUN mvn -B -ntp clean package

FROM eclipse-temurin:17-jre-alpine AS runtime
WORKDIR /app
RUN addgroup -S app && adduser -S app -G app
COPY --from=build /workspace/target/wanderlust-api-0.0.1-SNAPSHOT.jar /app/app.jar
RUN chown -R app:app /app
USER app

EXPOSE 8080
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75.0", "-jar", "/app/app.jar"]
