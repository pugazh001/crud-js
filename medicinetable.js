// Redirect if not logged in
if(localStorage.getItem('loggedIn') !== 'true') {
    window.location.href = 'auth.html';
  }
  
  const user = JSON.parse(localStorage.getItem('user'));
  document.getElementById('user-name').textContent = user.name;
  
  document.getElementById('logout-btn').onclick = () => {
    localStorage.removeItem('loggedIn');
    window.location.href = 'auth.html';
  };
  
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
  