// Redirect if not logged in
if (localStorage.getItem('loggedIn') !== 'true') {
  window.location.href = 'auth.html';
}

const user = JSON.parse(localStorage.getItem('user')) || {};
document.getElementById('user-name').textContent = user.name || "Guest";

// Logout
document.getElementById('logout-btn').onclick = () => {
  localStorage.removeItem('loggedIn');
  window.location.href = 'auth.html';
};

// Dark/Light Theme
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

// Pagination and Table Rendering
const tableBody = document.getElementById("medicine-table-body");
const pagination = document.getElementById("pagination");
const PAGE_SIZE = 5;

let medicinesData = [];
let currentPage = 1;

async function loadMedicines() {
  try {
    const response = await fetch("http://136.185.14.8:6565/api/productdetails");
    const result = await response.json();

    if (!result.success) throw new Error("Failed to fetch medicines");

    medicinesData = result.data || [];
    currentPage = 1; // Reset to first page on new data load
    renderTable();
    renderPagination();
  } catch (error) {
    tableBody.innerHTML = `<tr><td colspan="10" class="text-danger">Failed to load data</td></tr>`;
    pagination.innerHTML = "";
  }
}

function renderTable() {
  tableBody.innerHTML = "";
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageData = medicinesData.slice(start, end);

  if (pageData.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="10" class="text-warning">No data</td></tr>`;
    return;
  }

  pageData.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.ProductId}</td>
      <td>${item.ProductName}</td>
      <td>${item.ProductType || "-"}</td>
      <td>${item.Size || "-"}</td>
      <td>${item.Colour || "-"}</td>
      <td>${item.SalRate || 0}</td>
      <td>${item.MRP || 0}</td>
      <td>${item.GST || 0}</td>
      <td>${item.Company || "-"}</td>
      <td>${item.Stockist || "-"}</td>
    `;
    tableBody.appendChild(row);
  });
}

function renderPagination() {
  pagination.innerHTML = "";
  const totalPages = Math.ceil(medicinesData.length / PAGE_SIZE);

  if (totalPages <= 1) return;

  // Previous button
  const prevLi = document.createElement("li");
  prevLi.className = `page-item${currentPage === 1 ? " disabled" : ""}`;
  prevLi.innerHTML = `<a class="page-link" href="#">Previous</a>`;
  prevLi.onclick = function (e) {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      renderTable();
      renderPagination();
    }
  };
  pagination.appendChild(prevLi);

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = `page-item${currentPage === i ? " active" : ""}`;
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.onclick = function (e) {
      e.preventDefault();
      currentPage = i;
      renderTable();
      renderPagination();
    };
    pagination.appendChild(li);
  }

  // Next button
  const nextLi = document.createElement("li");
  nextLi.className = `page-item${currentPage === totalPages ? " disabled" : ""}`;
  nextLi.innerHTML = `<a class="page-link" href="#">Next</a>`;
  nextLi.onclick = function (e) {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      renderTable();
      renderPagination();
    }
  };
  pagination.appendChild(nextLi);
}

// Load Data on Page Ready
loadMedicines();
