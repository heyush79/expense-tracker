function addCategory() {
    const name = document.getElementById('name').value;

    fetch('/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    }).then(loadCategories);
}

function loadCategories() {
    fetch('/categories')
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById('list');
            list.innerHTML = '';
            data.forEach(c => {
                const li = document.createElement('li');
                li.textContent = c.name;
                
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.onclick = () => deleteCategory(c.id);
                deleteBtn.style.marginLeft = '10px';
                deleteBtn.style.backgroundColor = '#e74c3c';
                deleteBtn.style.color = 'white';
                deleteBtn.style.border = 'none';
                deleteBtn.style.padding = '5px 10px';
                deleteBtn.style.borderRadius = '4px';
                deleteBtn.style.cursor = 'pointer';
                
                li.appendChild(deleteBtn);
                list.appendChild(li);
            });
        });
}

function deleteCategory(id) {
    if (confirm('Are you sure you want to delete this category?')) {
        fetch(`/categories/${id}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (res.ok) {
                loadCategories();
            } else {
                alert('Failed to delete category');
            }
        });
    }
}
function deleteCategory(id) {
    if (confirm('Are you sure you want to delete this category?')) {
        fetch(`/categories/${id}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (res.ok) {
                loadCategories();   
            } else {
                alert('Failed to delete category');
            }
        });
    }       
}

loadCategories();
