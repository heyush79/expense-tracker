FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY mvnw .
COPY mvnw.cmd .
COPY .mvn ./.mvn
COPY pom.xml .
COPY src ./src

RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "target/expensetracker-0.0.1-SNAPSHOT.jar"]
