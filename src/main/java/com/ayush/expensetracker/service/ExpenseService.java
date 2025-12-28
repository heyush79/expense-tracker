package com.ayush.expensetracker.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ayush.expensetracker.entity.Expense;
import com.ayush.expensetracker.repository.ExpenseRepository;

import jakarta.transaction.Transactional;


@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;
    

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public Expense getExpenseById(Long id) {
        Optional<Expense> expense = expenseRepository.findById(id);
        if (expense.isPresent()) {
            return expense.get();
        }
        throw new RuntimeException("Expense not found with ID: " + id);
    }
    

    public Expense saveExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public Expense updateExpense(Long id, Expense expenseDetails) {
        Expense expense = getExpenseById(id);
        
        if (expenseDetails.getTitle() != null) {
            expense.setTitle(expenseDetails.getTitle());
        }
        if (expenseDetails.getAmount() != null) {
            expense.setAmount(expenseDetails.getAmount());
        }
        if (expenseDetails.getExpenseDate() != null) {
            expense.setExpenseDate(expenseDetails.getExpenseDate());
        }
        if (expenseDetails.getCategory() != null) {
            expense.setCategory(expenseDetails.getCategory());
        }
        
        return expenseRepository.save(expense);
    }

    public void deleteExpense(Long id) {
        if (expenseRepository.existsById(id)) {
            expenseRepository.deleteById(id);
        } else {
            throw new RuntimeException("Expense not found with ID: " + id);
        }
    }
}
