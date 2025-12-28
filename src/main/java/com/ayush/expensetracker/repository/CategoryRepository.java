package com.ayush.expensetracker.repository;

import com.ayush.expensetracker.entity.Category;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public class CategoryRepository {

    @PersistenceContext
    private EntityManager entityManager;

    // CREATE / UPDATE
    public Category save(Category category) {
        if (category.getId() == null) {
            entityManager.persist(category);   // INSERT
            return category;
        } else {
            return entityManager.merge(category); // UPDATE
        }
    }

    // READ ALL
    public List<Category> findAll() {
        return entityManager
                .createQuery("SELECT c FROM Category c", Category.class)
                .getResultList();
    }

    // READ BY ID
    public Optional<Category> findById(Long id) {
        return Optional.ofNullable(
                entityManager.find(Category.class, id)
        );
    }

    // DELETE
    public void deleteById(Long id) {
        Category category = entityManager.find(Category.class, id);
        if (category != null) {
            entityManager.remove(category);
        }
    }
}
