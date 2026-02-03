console.log("JS FILE LOADED ✅");
const container = document.getElementById("product-container");
const inputBox = document.getElementById("inputBox");
const btn = document.getElementById("btn");
const suggestionBox = document.getElementById("suggestions");
const cartBtn = document.getElementById("cartBtn");
const cartCount = document.getElementById("cartCount");
const scrollTopBtn = document.getElementById("scrollTopBtn");

let allProducts = [];
let currentPage = 1;
let itemsPerPage = 8;

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartCount.innerText = cart.length;
}

updateCartCount();

cartBtn.addEventListener("click", (e) => {
  e.preventDefault();
  alert("Cart: " + cartCount.innerText + " items");
});

// ================= SCROLL TO TOP BUTTON =================
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ================= FETCH PRODUCTS =================
fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((data) => {
    allProducts = data.products;
    renderPaginatedProducts();
  })
  .catch((err) => console.error("Error fetching products:", err));

// ================= RENDER PRODUCTS =================
function renderProducts(products) {
  container.innerHTML = "";

  allProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    const img = document.createElement("img");
    img.src = product.thumbnail;

    const title = document.createElement("h3");
    title.innerText = product.title;

    const desc = document.createElement("p");
    desc.innerText = product.description.slice(0, 60) + "...";

    const rating = document.createElement("p");
    rating.className = "rating";
    rating.innerText = "⭐ " + product.rating + " (" + product.reviews.length + " reviews)";

    const price = document.createElement("p");
    price.className = "price";
    price.innerText = "₹ " + product.price;

    const actions = document.createElement("div");
    actions.className = "product-actions";

    const addCartBtn = document.createElement("button");
    addCartBtn.className = "add-to-cart-btn";
    addCartBtn.innerText = "Add to Cart";
    addCartBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      addCartBtn.innerText = "✅ Added!";
      setTimeout(() => {
        addCartBtn.innerText = "Add to Cart";
      }, 1500);
    });

    actions.appendChild(addCartBtn);

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(rating);
    card.appendChild(price);
    card.appendChild(actions);

    card.addEventListener("click", () => {
      saveVisit(product);
      window.location.href = `product.html?id=${product.id}`;
    });

    container.appendChild(card);
  });
}

// ================= LOCAL STORAGE: SAVE SEARCH =================
function saveSearch(query) {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

  if (!history.includes(query)) {
    history.push(query);
  }

  localStorage.setItem("searchHistory", JSON.stringify(history));
}

// ================= SHOW SEARCH SUGGESTIONS =================
function showSuggestions(text = "") {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

  suggestionBox.innerHTML = "";

  const filtered = history.filter((item) =>
    item.toLowerCase().includes(text.toLowerCase()),
  );

  if (filtered.length === 0) {
    suggestionBox.style.display = "none";
    return;
  }

  filtered.forEach((item) => {
    const div = document.createElement("div");
    div.className = "suggestion-item";
    div.innerText = item;

    div.addEventListener("click", () => {
      inputBox.value = item;
      suggestionBox.style.display = "none";
    });

    suggestionBox.appendChild(div);
  });

  suggestionBox.style.display = "block";
}

// ================= INPUT EVENT (FILTER SUGGESTIONS) =================
inputBox.addEventListener("input", () => {
  const text = inputBox.value.trim();
  showSuggestions(text);
});

// ================= SEARCH BUTTON CLICK =================
btn.addEventListener("click", () => {
  const query = inputBox.value.trim();

  if (!query) return;

  saveSearch(query);

  setTimeout(() => {
    window.location.href = `search.html?q=${query}`;
  }, 300);
});

// ================= HIDE SUGGESTIONS WHEN CLICK OUTSIDE =================
document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-box")) {
    suggestionBox.style.display = "none";
  }
});

function saveVisit(product) {
  let visits = JSON.parse(localStorage.getItem("visitHistory")) || [];

  const visitData = {
    id: product.id,
    title: product.title,
    time: new Date().toISOString(),
  };

  visits.push(visitData);

  localStorage.setItem("visitHistory", JSON.stringify(visits));
}

function renderPaginationButtons() {
  const paginationDiv = document.getElementById("pagination");
  paginationDiv.innerHTML = "";

  const totalPages = Math.ceil(allProducts.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;

    if (i === currentPage) {
      btn.className = "active-page";
    }

    btn.addEventListener("click", () => {
      currentPage = i;
      renderPaginatedProducts();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    paginationDiv.appendChild(btn);
  }
}

function renderPaginatedProducts() {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const paginatedProducts = allProducts.slice(start, end);

  renderProducts(paginatedProducts);
  renderPaginationButtons();
}
