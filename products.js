// Redirect if not logged in
if(localStorage.getItem('loggedIn') !== 'true') {
    window.location.href = 'auth.html';
  }
  
  const user = JSON.parse(localStorage.getItem('user'));
  document.getElementById('user-name').textContent = user.name;
  
  // Logout button
  document.getElementById('logout-btn').onclick = () => {
    localStorage.removeItem('loggedIn');
    window.location.href = 'auth.html';
  };
  
  // Dark mode toggle (similar to app.js)
  const navbar = document.getElementById('main-navbar');
  const btnToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);
  btnToggle.onclick = () => {
    const newTheme = navbar.getAttribute('data-bs-theme') === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  };
  function applyTheme(theme) {
    navbar.setAttribute('data-bs-theme', theme);
    document.body.setAttribute('data-bs-theme', theme);
    btnToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', theme);
  }
  
  // Elements
  const addForm = document.getElementById('add-product-form');
  const productList = document.getElementById('product-list');
  const editModal = new bootstrap.Modal(document.getElementById('editProductModal'));
  const editForm = document.getElementById('edit-product-form');
  
  // Load products list
  function loadProductList() {
    user.products = user.products || [];
    productList.innerHTML = '';
    if(user.products.length === 0) {
      productList.innerHTML = `<tr><td colspan="4" class="text-center">No products added.</td></tr>`;
      return;
    }
    user.products.forEach((p,i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${p.name}</td>
        <td>${p.description}</td>
        <td class="text-center clickable text-primary" onclick="editProduct(${i})"><i class="bi bi-pencil-square"></i></td>
        <td class="text-center clickable text-danger" onclick="deleteProduct(${i})"><i class="bi bi-trash"></i></td>
      `;
      productList.appendChild(tr);
    });
  }
  loadProductList();
  
  // Add product
  addForm.onsubmit = e => {
    e.preventDefault();
    const name = document.getElementById('product-name').value.trim();
    const desc = document.getElementById('product-description').value.trim();
    if(!name) {
      alert('Product name is required');
      return;
    }
    user.products.push({name, description: desc});
    localStorage.setItem('user', JSON.stringify(user));
    addForm.reset();
    loadProductList();
  };
  
  // Edit product
  window.editProduct = function(index) {
    const p = user.products[index];
    document.getElementById('edit-product-id').value = index;
    document.getElementById('edit-product-name').value = p.name;
    document.getElementById('edit-product-description').value = p.description;
    editModal.show();
  };
  
  // Save product edit
  editForm.onsubmit = e => {
    e.preventDefault();
    const idx = parseInt(document.getElementById('edit-product-id').value);
    const name = document.getElementById('edit-product-name').value.trim();
    const desc = document.getElementById('edit-product-description').value.trim();
    if(!name) {
      alert('Product name is required');
      return;
    }
    user.products[idx] = {name, description: desc};
    localStorage.setItem('user', JSON.stringify(user));
    editModal.hide();
    loadProductList();
  };
  
  // Delete product
  window.deleteProduct = function(index) {
    if(confirm('Are you sure you want to delete this product?')) {
      user.products.splice(index, 1);
      localStorage.setItem('user', JSON.stringify(user));
      loadProductList();
    }
  };
  