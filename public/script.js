const PRICES = {
  chair: 3499,
  sofa: 12999,
  desk: 7999,
  table: 4599
};

const select = document.getElementById("product-select");
const qty = document.getElementById("qty");
const total = document.getElementById("total");
const btn = document.getElementById("checkout-btn");
const successBox = document.getElementById("success");
const closeSuccess = document.getElementById("success-close");

function updateTotal() {
  const pid = select.value;
  const q = Math.max(1, Number(qty.value) || 1);

  if (!pid) {
    total.textContent = "0";
    btn.disabled = true;
    return;
  }

  total.textContent = (PRICES[pid] * q).toLocaleString("en-IN");
  btn.disabled = false;
}

select.addEventListener("change", updateTotal);
qty.addEventListener("input", updateTotal);

// Checkout
btn.addEventListener("click", async () => {
  btn.disabled = true;
  btn.textContent = "Redirecting...";

  const quantity = Math.max(1, Number(qty.value) || 1);

  const response = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId: select.value, quantity })
  });

  const data = await response.json();
  if (data.url) window.location = data.url;
});

// Handle success alert
const params = new URLSearchParams(window.location.search);
if (params.get("success")) {
  successBox.classList.remove("d-none");
  window.history.replaceState({}, "", "/");
}

closeSuccess.addEventListener("click", () => {
  successBox.classList.add("d-none");
});
