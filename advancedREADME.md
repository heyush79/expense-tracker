# Expense Tracker

> **Single‑User Expense Tracker with Full CI/CD Pipeline**

This repository contains a production‑grade backend application demonstrating **Spring Boot architecture**, **REST APIs**, **PostgreSQL**, **Docker**, and a **complete CI/CD pipeline using GitHub Actions with a self‑hosted runner**.

---

## 📌 README.md (Professional Version)

### 🚀 Features

* Add and list expense categories
* Add and list expenses
* Category–Expense relationship (Many‑to‑One)
* RESTful API design
* Dockerized backend & database
* CI/CD with GitHub Actions
* Self‑hosted runner–based deployment

### 🛠 Tech Stack

* **Backend:** Java 17, Spring Boot, Spring Data JPA
* **Database:** PostgreSQL
* **Frontend:** HTML, CSS, Vanilla JavaScript
* **DevOps:** Docker, Docker Compose, GitHub Actions, Docker Hub

### ▶️ Run Locally

```bash
docker compose up --build
```

Access application at:

```
http://localhost:8080
```

---

## 1. Project Overview

**Project Name:** Expense Tracker (Single User)

**Purpose:** A single-user expense tracking application to record expenses under categories, view expense history, and understand backend + CI/CD fundamentals.

**Key Learning Goals:**

* Spring Boot layered architecture
* JPA entity relationships
* RESTful API design
* Docker & Docker Compose
* GitHub Actions CI/CD
* Self-hosted runner deployment

---

## 2. Tech Stack

### Backend

* Java 17
* Spring Boot
* Spring Data JPA
* Hibernate

### Database

* PostgreSQL (Dockerized)

### Frontend

* HTML + CSS
* Vanilla JavaScript (Fetch API)

### DevOps

* Docker
* Docker Compose
* GitHub Actions
* Docker Hub
* Self-hosted GitHub Runner (Windows)

---

## 3. System Architecture Diagram (Interview‑Ready)

### High‑Level Architecture

```
+--------------------+
|  Browser (UI)      |
|  HTML + JS         |
+---------+----------+
          |
          | HTTP (REST)
          v
+---------+----------+
| Spring Boot App    |
| -----------------  |
| Controller Layer   |
| Service Layer      |
| Repository Layer   |
+---------+----------+
          |
          | JPA / Hibernate
          v
+---------+----------+
| PostgreSQL DB      |
| (Docker Container) |
+--------------------+
```

### DevOps Architecture

```
Developer Push
     │
     ▼
GitHub Repository
     │
     ▼
GitHub Actions (CI)
 - Build
 - Test
 - Docker Build
 - Push to Docker Hub
     │
     ▼
Docker Hub Registry
     │
     ▼
Self‑Hosted Runner (CD)
 - docker pull
 - docker compose down
 - docker compose up -d
```

---

## 4. Backend Layered Architecture (Interview Critical)

```
Browser (HTML + JS)
        ↓ REST
Spring Boot Controllers
        ↓
Service Layer (Business Logic)
        ↓
Repository Layer (JPA / EntityManager)
        ↓
PostgreSQL Database
```

---

## 4. Backend Layered Architecture (Interview Critical)

### 4.1 Entity Layer

**Purpose:**

* Represents database tables
* Uses JPA annotations

#### Category Entity

```java
@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
}
```

#### Expense Entity

```java
@Entity
@Table(name = "expenses")
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private Double amount;
    private LocalDate expenseDate;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
```

**Interview Concept:**

* `@ManyToOne` defines foreign key relationship
* `@JoinColumn` maps `category_id` in expenses table

---

### 4.2 Repository Layer

**Purpose:**

* Handles DB access
* Uses Spring Data JPA

```java
public interface ExpenseRepository extends JpaRepository<Expense, Long> {}
public interface CategoryRepository extends JpaRepository<Category, Long> {}
```

**Key Concepts:**

* CRUD auto-implemented by Spring
* No SQL needed
* Uses Hibernate internally

---

### 4.3 Service Layer

**Purpose:**

* Business rules
* Transaction boundary
* Entity validation

```java
@Service
public class ExpenseService {
    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private EntityManager entityManager;

    public Expense saveExpense(Expense expense) {
        Category managedCategory = entityManager.getReference(
            Category.class,
            expense.getCategory().getId()
        );
        expense.setCategory(managedCategory);
        return expenseRepository.save(expense);
    }
}
```

**Interview Concept:**

* `getReference()` avoids extra SELECT
* Prevents detached entity issues

---

### 4.4 Controller Layer

**Purpose:**

* Exposes REST APIs
* Handles HTTP requests

```java
@RestController
@RequestMapping("/expenses")
public class ExpenseController {

    @PostMapping
    public ResponseEntity<Expense> createExpense(@RequestBody Expense expense) {
        return new ResponseEntity<>(expenseService.saveExpense(expense), HttpStatus.CREATED);
    }
}
```

---

## 5. REST API Design

### 5.1 Category APIs

| Method | Endpoint    | Description     |
| ------ | ----------- | --------------- |
| POST   | /categories | Create category |
| GET    | /categories | List categories |

### 5.2 Expense APIs

| Method | Endpoint  | Description    |
| ------ | --------- | -------------- |
| POST   | /expenses | Create expense |
| GET    | /expenses | List expenses  |

### Sample Expense POST Body

```json
{
  "title": "Grocery",
  "amount": 500,
  "expenseDate": "2025-01-01",
  "category": {
    "id": 1
  }
}
```

---

## 6. Frontend Flow (HTML + JS)

### 6.1 Category Dropdown Flow

1. Page load
2. JS fetches `/categories`
3. Populates `<select>` options

### 6.2 Add Expense Flow

1. User fills form
2. JS constructs JSON
3. POST `/expenses`
4. Backend persists expense

**Key JS Concept:**

* Send only `category.id`, not full object

---

## 7. Docker Architecture

### Dockerfile

* Builds Spring Boot JAR
* Runs app using Java 17

### docker-compose.yml

```yaml
services:
  expense-postgres:
    image: postgres:16
    env_file:
      - .env
    ports:
      - "5433:5432"

  expense-app:
    image: yourusername/expense-tracker:latest
    depends_on:
      - expense-postgres
    ports:
      - "8080:8080"
```

---

## 8. CI/CD PIPELINE (MOST IMPORTANT SECTION)

## 8.1 CI – Continuous Integration

**Trigger:**

* Push to `main`
* Pull Request

**Steps:**

1. Checkout code
2. Setup Java 17
3. Run `mvn clean package`
4. Build Docker image
5. Push image to Docker Hub

---

## 8.2 CD – Continuous Deployment

**Runner Type:**

* Self-hosted (Windows)

**Steps:**

1. Runner listens for jobs
2. Pull latest Docker image
3. Stop running containers
4. Start updated containers

```yaml
runs-on: [self-hosted, runnerName]
```

---

## 9. Secrets Management (Interview Topic)

### GitHub Secrets

* DOCKER_USERNAME
* DOCKER_PASSWORD (access token)

### Local Secrets

* `.env` file (ignored in git)

---

## 10. Common Issues & Learnings

| Issue                  | Learning                    |         |                         |
| ---------------------- | --------------------------- | ------- | ----------------------- |
| Detached entity        | Use `getReference()`        |         |                         |
| Docker pull auth error | Runner needs `docker login` |         |                         |
| Job queued             | Label mismatch              |         |                         |
| PowerShell `           |                             | ` error | Use `continue-on-error` |

---

## 11. Interview Talking Points

* Layered architecture
* Entity relationships
* REST best practices
* Docker image immutability
* CI vs CD
* Self-hosted runner benefits

---

## 12. Future Enhancements

* Flyway DB migrations
* Versioned Docker deploys
* Rollback strategy
* Health checks
* OAuth login

---

## 13. Final Summary

This project demonstrates **full-stack backend development with real-world DevOps practices**, suitable for SDE-1 / Backend Engineer roles.

---

**END OF DOCUMENT**
