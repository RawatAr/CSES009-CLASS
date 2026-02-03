const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const container = document.getElementById("product-detail");
const scrollTopBtn = document.getElementById("scrollTopBtn");

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

fetch(`https://dummyjson.com/products/${id}`)
  .then((res) => res.json())
  .then((product) => {
    const rating = document.createElement("p");
    rating.className = "rating";
    rating.innerHTML = `⭐ ${product.rating} (${product.reviews.length} reviews)`;

    const addBtn = document.createElement("button");
    addBtn.className = "add-to-cart-btn";
    addBtn.style.marginTop = "20px";
    addBtn.style.padding = "12px 24px";
    addBtn.style.width = "auto";
    addBtn.innerText = "Add to Cart";
    addBtn.addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      addBtn.innerText = "✅ Added to Cart!";
      setTimeout(() => {
        addBtn.innerText = "Add to Cart";
      }, 1500);
    });

    container.innerHTML = `
      <h2>${product.title}</h2>
      <img src="${product.thumbnail}" width="300" style="border-radius: 8px; margin-top: 16px;">
      <p style="margin-top: 16px;">${product.description}</p>
      <h3 style="color: var(--accent-color); margin-top: 16px;">₹ ${product.price}</h3>
    `;

    container.appendChild(rating);
    container.appendChild(addBtn);
  });

