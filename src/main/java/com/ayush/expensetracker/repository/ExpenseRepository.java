package com.ayush.expensetracker.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;
import com.ayush.expensetracker.entity.Category;
import com.ayush.expensetracker.repository.CategoryRepository;


import com.ayush.expensetracker.entity.Expense;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
@Transactional
public class ExpenseRepository {

    @PersistenceContext
    private EntityManager entityManager;

    // CREATE / UPDATE
    public Expense save(Expense expense) {
        Category managedCategory = 
            entityManager.getReference(Category.class, expense.getCategory().getId());
        expense.setCategory(managedCategory);
        entityManager.persist(expense);
        return expense;
    }

    // READ ALL
    public List<Expense> findAll() {
        return entityManager
                .createQuery("SELECT e FROM Expense e", Expense.class)
                .getResultList();
    }

    // READ BY ID
    public Optional<Expense> findById(Long id) {
        return Optional.ofNullable(
                entityManager.find(Expense.class, id)
        );
    }

    // DELETE
    public void deleteById(Long id) {
        Expense expense = entityManager.find(Expense.class, id);
        if (expense != null) {
            entityManager.remove(expense);
        }
    }
    public boolean existsById(Long id) {
        Expense expense = entityManager.find(Expense.class, id);
        return expense != null;
    }
}
