const container = document.getElementById("history-container");
const scrollTopBtn = document.getElementById("scrollTopBtn");

let visits = JSON.parse(localStorage.getItem("visitHistory")) || [];

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

visits.sort((a, b) => new Date(b.time) - new Date(a.time));

if (visits.length === 0) {
  container.innerHTML = "<p style='text-align: center; font-size: 16px; color: #999;'>No history found 😢</p>";
} else {
  const clearBtn = document.createElement("button");
  clearBtn.className = "add-to-cart-btn";
  clearBtn.innerText = "🗑️ Clear History";
  clearBtn.style.marginBottom = "20px";
  clearBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear history?")) {
      localStorage.removeItem("visitHistory");
      location.reload();
    }
  });
  container.appendChild(clearBtn);
}

visits.forEach((item) => {
  const div = document.createElement("div");
  div.className = "history-item";

  const date = new Date(item.time).toLocaleString();

  div.innerHTML = `
    <h3>${item.title}</h3>
    <small>Visited at: ${date}</small>
  `;

  div.addEventListener("click", () => {
    window.location.href = `product.html?id=${item.id}`;
  });

  container.appendChild(div);
});

