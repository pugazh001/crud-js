// Show signup form, hide login
document.getElementById('show-signup').onclick = e => {
    e.preventDefault();
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
  };
  // Show login form, hide signup
  document.getElementById('show-login').onclick = e => {
    e.preventDefault();
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
  };
  
  // Signup form submit
  document.getElementById('signup-form').onsubmit = e => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim().toLowerCase();
    const password = document.getElementById('signup-password').value;
    if(!name || !email || !password) {
      alert('Please fill all fields');
      return;
    }
    const user = { name, email, password, products: [] };
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('loggedIn', 'true');
    window.location.href = 'home.html';
  };
  
  // Login form submit
  document.getElementById('login-form').onsubmit = e => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value;
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user) {
      alert('No user found. Please register first.');
      return;
    }
    if(user.email === email && user.password === password) {
      localStorage.setItem('loggedIn', 'true');
      window.location.href = 'home.html';
    } else {
      alert('Incorrect email or password');
    }
  };
  