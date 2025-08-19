// Redirect if not logged in
if(localStorage.getItem('loggedIn') !== 'true') {
    window.location.href = 'auth.html';
  }
  
  const user = JSON.parse(localStorage.getItem('user'));
  document.getElementById('user-name').textContent = user.name;
  
  // Fill form values
  document.getElementById('profile-name').value = user.name;
  document.getElementById('profile-email').value = user.email;
  
  // Logout button
  document.getElementById('logout-btn').onclick = () => {
    localStorage.removeItem('loggedIn');
    window.location.href = 'auth.html';
  };
  
  // Dark mode toggle (similar to others)
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
  
  // Save profile update
  document.getElementById('profile-form').onsubmit = e => {
    e.preventDefault();
    const newName = document.getElementById('profile-name').value.trim();
    if(!newName) {
      alert('Name cannot be empty');
      return;
    }
    user.name = newName;
    localStorage.setItem('user', JSON.stringify(user));
    document.getElementById('user-name').textContent = newName;
    alert('Profile updated');
  };
  