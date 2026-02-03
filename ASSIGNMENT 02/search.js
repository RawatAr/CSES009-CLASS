const container = document.getElementById("product-container");
const heading = document.getElementById("heading");
const scrollTopBtn = document.getElementById("scrollTopBtn");

const params = new URLSearchParams(window.location.search);
const query = params.get("q");

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

fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((data) => {
    const products = data.products;

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase()),
    );

    if (filtered.length === 0) {
      heading.innerText = "❌ No results found for: " + query;
      return;
    }

    heading.innerText = "✅ Found " + filtered.length + " results for: " + query;

    filtered.forEach((product) => {
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
      rating.innerText = "⭐ " + product.rating;

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
        window.location.href = `product.html?id=${product.id}`;
      });

      container.appendChild(card);
    });
  })
  .catch((err) => {
    console.error(err);
    heading.innerText = "⚠️ Error loading products";
  });

