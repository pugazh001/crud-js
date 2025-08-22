// Check login status, redirect if not logged in
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
  
  // Dark mode toggle
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
  
  // Render 5 medicine cards on home page
function loadHomeCards() {
  const container = document.getElementById('home-cards');

  // Clear existing cards if any
  container.innerHTML = '';

  fetch('http://136.185.14.8:6565/api/products')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      const products = data.products || [];

      if (products.length === 0) {
        container.innerHTML = '<p>No products found.</p>';
        return;
      }

      products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'col-md-4 col-lg-2 card-col';

        div.innerHTML = `
          <div class="card h-100 shadow-sm">
            <img src="http://136.185.14.8:6565/uploads/${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">Price: $${product.price}</p>
            </div>
          </div>
        `;

        container.appendChild(div);
      });
    })
    .catch(error => {
      console.error('Failed to fetch products:', error);
      container.innerHTML = '<p>Failed to load products.</p>';
    });
}

  loadHomeCards();
  
