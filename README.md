# Expense Tracker Project Documentation

## Overview
The Expense Tracker is a full-stack web application built with Spring Boot for the backend and a simple HTML/CSS/JavaScript frontend. It allows users to manage categories and track expenses, providing CRUD operations for both entities.

## Architecture
- **Backend**: Spring Boot with JPA/Hibernate for data persistence
- **Frontend**: Static HTML pages with vanilla JavaScript for API interactions
- **Database**: PostgreSQL
- **Build Tool**: Maven

## Project Structure
```
expense-tracker/
├── src/main/java/com/ayush/expensetracker/
│   ├── ExpensetrackerApplication.java          # Main Spring Boot application
│   ├── controller/
│   │   ├── CategoryController.java             # REST endpoints for categories
│   │   └── ExpenseController.java              # REST endpoints for expenses
│   ├── entity/
│   │   ├── Category.java                       # Category JPA entity
│   │   └── Expense.java                        # Expense JPA entity
│   ├── repository/
│   │   ├── CategoryRepository.java             # Category data access
│   │   └── ExpenseRepository.java              # Expense data access
│   └── service/
│       ├── CategoryService.java                # Category business logic
│       └── ExpenseService.java                 # Expense business logic
├── src/main/resources/
│   ├── application.properties                  # Application configuration
│   └── static/
│       ├── index.html                          # Home page
│       ├── categories.html                     # Category management page
│       ├── expenses.html                       # Expense management page
│       ├── css/style.css                       # Stylesheet
│       └── js/
│           ├── categories.js                   # Category frontend logic
│           └── expenses.js                     # Expense frontend logic
└── pom.xml                                     # Maven configuration
```

## Backend Components

### Entities

#### Category
- **Fields**: id (Long), name (String)
- **Table**: categories
- **Relationships**: One-to-many with Expense

#### Expense
- **Fields**: id (Long), title (String), amount (Double), expenseDate (LocalDate), category (Category)
- **Table**: expenses
- **Relationships**: Many-to-one with Category

### Controllers

#### CategoryController
- **Base URL**: `/categories`
- **Endpoints**:
  - `POST /categories` - Create category
  - `GET /categories` - Get all categories
  - `GET /categories/{id}` - Get category by ID (not implemented)
  - `PUT /categories/{id}` - Update category
  - `DELETE /categories/{id}` - Delete category

#### ExpenseController
- **Base URL**: `/expenses`
- **Endpoints**:
  - `GET /expenses` - Get all expenses
  - `GET /expenses/{id}` - Get expense by ID
  - `POST /expenses` - Create expense
  - `PUT /expenses/{id}` - Update expense
  - `DELETE /expenses/{id}` - Delete expense

### Services

#### CategoryService
- Provides business logic for category operations
- Methods: create, getAll, update, delete

#### ExpenseService
- Provides business logic for expense operations
- Methods: getAllExpenses, getExpenseById, saveExpense, updateExpense, deleteExpense

### Repositories

#### CategoryRepository
- Extends JpaRepository for standard CRUD operations

#### ExpenseRepository
- Custom implementation using EntityManager for CRUD operations

## Frontend Components

### Pages

#### index.html
- Home page with navigation links to categories and expenses management

#### categories.html
- Form to add new categories
- List to display existing categories

#### expenses.html
- Form to add new expenses with category selection
- List to display existing expenses with update/delete options

### JavaScript Files

#### categories.js
- Handles category CRUD operations via fetch API
- Functions: addCategory, loadCategories, deleteCategory, editCategory

#### expenses.js
- Handles expense CRUD operations via fetch API
- Functions: addExpense, loadExpenses, deleteExpense, editExpense, loadCategories

## Configuration

### application.properties
- Database connection settings (PostgreSQL)
- JPA/Hibernate configuration

### pom.xml
- Spring Boot version: 4.0.1
- Java version: 17
- Dependencies: Spring Boot Starter Web, Spring Boot Starter Data JPA, PostgreSQL driver

## API Usage

### Category Endpoints

```bash
# Create category
POST /categories
Content-Type: application/json
{
  "name": "Food"
}

# Get all categories
GET /categories

# Update category
PUT /categories/{id}
Content-Type: application/json
{
  "name": "Updated Food"
}

# Delete category
DELETE /categories/{id}
```

### Expense Endpoints

```bash
# Create expense
POST /expenses
Content-Type: application/json
{
  "title": "Lunch",
  "amount": 15.50,
  "expenseDate": "2023-10-01",
  "category": {
    "id": 1
  }
}

# Get all expenses
GET /expenses

# Update expense
PUT /expenses/{id}
Content-Type: application/json
{
  "title": "Updated Lunch",
  "amount": 20.00,
  "expenseDate": "2023-10-01",
  "category": {
    "id": 1
  }
}

# Delete expense
DELETE /expenses/{id}
```

## Running the Application

1. Ensure PostgreSQL is running and database is created
2. Update `application.properties` with correct database credentials
3. Run `mvn spring-boot:run` or use your IDE to start the application
4. Access the application at `http://localhost:8080`

## Notes

- The frontend uses vanilla JavaScript with fetch API for AJAX calls
- Error handling is basic and could be improved
- The application lacks authentication and authorization
- No input validation is implemented on the frontend
- The ExpenseController's update method sets the ID from the path variable, which may not be the best practice
