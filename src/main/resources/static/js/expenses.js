// Load categories into dropdown
function loadCategories() {
    fetch("/categories")
        .then(res => {
            if (!res.ok) {
                throw new Error("Failed to fetch categories");
            }
            return res.json();
        })
        .then(categories => {
            const select = document.getElementById("categorySelect");
            select.innerHTML = '<option value="">-- Select Category --</option>';

            categories.forEach(cat => {
                const option = document.createElement("option");
                option.value = cat.id;
                option.textContent = cat.name;
                select.appendChild(option);
            });
        })
        .catch(err => console.error("Category load error:", err));
}

// Add new expense
function addExpense() {
    const title = document.getElementById("title").value;
    const amount = document.getElementById("amount").value;
    const expenseDateInput = document.getElementById("expenseDate").value;
    console.log("Raw date:", expenseDateInput);
    const categoryId = document.getElementById("categorySelect").value;
    const categoryName =
        document.getElementById("categorySelect")
        .options[document.getElementById("categorySelect").selectedIndex]
        .text;

    if (!categoryId) {
        alert("Please select a category");
        return;
    }

    const expense = {
        title: title,
        amount: parseFloat(amount),
        expenseDate: expenseDateInput,
        category: {
            id: parseInt(categoryId)
        }
    };

    fetch("/expenses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(expense)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Failed to add expense");
        }
        return res.json();
    })
    .then(() => {
        clearForm();
        loadExpenses();
    })
    .catch(err => console.error("Expense save error:", err));
}
function deleteExpense(id) {
    if (confirm("Are you sure you want to delete this expense?")) {
        fetch(`/expenses/${id}`, {
            method: "DELETE"
        })
        .then(res => {
            if (res.ok) {
                loadExpenses();
            } else {
                alert("Failed to delete expense");
            }
        });
    }
}
function editExpense(expense) {
    const newTitle = prompt("Enter new title:", expense.title);//
    const newAmount = prompt("Enter new amount:", expense.amount);//
    const newDate = prompt("Enter new date (YYYY-MM-DD):", expense.expenseDate.split('T')[0]);
    if (newTitle && newAmount && newDate) {
        const updatedExpense = {
            ...expense,
            title: newTitle,
            amount: parseFloat(newAmount),
            expenseDate: newDate
        };
        fetch(`/expenses/${expense.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedExpense)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error("Failed to update expense");
            }
            return res.json();
        })
        .then(() => {
            loadExpenses();
        }
        )
        .catch(err => console.error("Expense update error:", err));
    }
}

// Load all expenses
function loadExpenses() {
    fetch("/expenses")
        .then(res => res.json())
        .then(expenses => {
            const list = document.getElementById("expenseList");
            list.innerHTML = "";

            expenses.forEach(e => {
                const li = document.createElement("li");
                li.textContent =
                    `${e.title} - ₹${e.amount} (${e.category.name}) - ${new Date(e.expenseDate).toLocaleDateString()}`;
                
                const updateBtn = document.createElement("button");
                updateBtn.textContent = "Update";
                updateBtn.onclick = () => editExpense(e);
                updateBtn.style.marginLeft = "10px";
                updateBtn.style.backgroundColor = "#f39c12";
                updateBtn.style.color = "white";
                updateBtn.style.border = "none";
                updateBtn.style.padding = "5px 10px";
                updateBtn.style.borderRadius = "4px";
                updateBtn.style.cursor = "pointer";
                
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.onclick = () => deleteExpense(e.id);
                deleteBtn.style.marginLeft = "5px";
                deleteBtn.style.backgroundColor = "#e74c3c";
                deleteBtn.style.color = "white";
                deleteBtn.style.border = "none";
                deleteBtn.style.padding = "5px 10px";
                deleteBtn.style.borderRadius = "4px";
                deleteBtn.style.cursor = "pointer";
                
                li.appendChild(updateBtn);
                li.appendChild(deleteBtn);
                list.appendChild(li);
            });
        });
}

function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("expenseDate").value = "";
    document.getElementById("categorySelect").value = "";
}

// Initial load
loadCategories();
loadExpenses();
