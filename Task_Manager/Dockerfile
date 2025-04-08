# Step 1: Build Stage
# Use Maven image to build the application
FROM maven:3.8.4-openjdk-17-slim AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and download the dependencies
COPY pom.xml /app/
RUN mvn dependency:go-offline

# Copy the source code and build the jar
COPY src /app/src
RUN mvn clean package -DskipTests

# Step 2: Run Stage
# Use a smaller image to run the application (no need to install maven here)
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /usr/app

# Copy the jar file from the build stage to the final image
COPY --from=build /app/target/Task_Manager-1.0-SNAPSHOT.jar /usr/app/Task_Manager-1.0-SNAPSHOT.jar

# Expose port 8080 (default Spring Boot port)
EXPOSE 8080

# Command to run the Spring Boot application
CMD ["java", "-jar", "/usr/app/Task_Manager-1.0-SNAPSHOT.jar"]
