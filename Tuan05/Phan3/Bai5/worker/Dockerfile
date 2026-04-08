# Build stage — Maven + JDK 17
FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage — runtime Java 17
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/target/worker-1.0-SNAPSHOT.jar worker.jar
ENTRYPOINT ["java", "-jar", "worker.jar"]