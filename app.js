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
    const cardsData = [
      { title: 'Paracetamol', text: 'Pain relief medicine' },
      { title: 'Ibuprofen', text: 'Anti-inflammatory' },
      { title: 'Amoxicillin', text: 'Antibiotic' },
      { title: 'Omeprazole', text: 'Acid reducer' },
      { title: 'Vitamin C', text: 'Immune support' }
    ];
    const container = document.getElementById('home-cards');
    cardsData.forEach(card => {
      const div = document.createElement('div');
      div.className = 'col-md-4 col-lg-2 card-col';
      div.innerHTML = `<div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${card.title}</h5>
          <p class="card-text">${card.text}</p>
        </div>
      </div>`;
      container.appendChild(div);
    });
  }
  
  loadHomeCards();
  