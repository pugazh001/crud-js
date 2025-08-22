document.getElementById('show-signup').onclick = e => {
  e.preventDefault();
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('signup-form').style.display = 'block';
};

document.getElementById('show-login').onclick = e => {
  e.preventDefault();
  document.getElementById('signup-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
};

// Signup form submit - calls API and stores user info in localStorage on success
document.getElementById('signup-form').onsubmit = async e => {
  e.preventDefault();

  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim().toLowerCase();
  const password = document.getElementById('signup-password').value;

  if (!name || !email || !password) {
    alert('Please fill all fields');
    return;
  }

  try {
    const res = await fetch('http://136.185.14.8:6565/api/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, email, password})
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Signup failed');

    // Save user info and token to localStorage
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('userId', data.user.userId || data.user.id || "");

    window.location.href = 'home.html';
  } catch (err) {
    alert(err.message);
  }
};

// Login form submit - calls API and stores user info in localStorage on success
document.getElementById('login-form').onsubmit = async e => {
  e.preventDefault();

  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const password = document.getElementById('login-password').value;

  if (!email || !password) {
    alert('Please fill all fields');
    return;
  }

  try {
    const res = await fetch('http://136.185.14.8:6565/api/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');

    // Save user info and token to localStorage
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('userId', data.user.userId || data.user.id || "");

    window.location.href = 'home.html';
  } catch (err) {
    alert(err.message);
  }
};
