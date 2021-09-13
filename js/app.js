const loadProducts = () => {
  console.log("Hi");
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  console.log("Hello");
  const allProducts = products.map((pd) => pd);
  const allProductsContainer = document.getElementById("all-products");
  for (const product of allProducts) {
    const { image, title, category, price, id } = product;
    const { rate, count } = product.rating;
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100">
          <div class="d-flex justify-content-center">
            <img src=${image} class="card-img-top product-image mt-3" alt="...">
          </div>
          <div class ="card-body text-center">
            <h6 class ="card-title">${title} </h6>
            <p>Category: ${category}</p>
            <div class="d-flex justify-content-between">
              <div>
                <p id="price-text">Price: <span id="amount-text">$${price}</span></p>
              </div>
              <div>
                <p>Rating: ${rate}(${count})</p>
              </div>
            </div>
          </div>
          <div class ="card-footer d-flex justify-content-between">
            <button onclick="addToCart(${id},${price})" id="addToCart-btn" class="customized-btn-one">add to cart</button>
            <button id="details-btn" class="customized-btn-two">Details</button>
          </div>
    </div>`;

    allProductsContainer.appendChild(div);
  }
};

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// div.innerHTML = `
// <div class="card h-100">
//     <img src=${image} class="card-img-top product-image" alt="...">
//     <div class="card-body text-center">
//       <h5 class="card-title">${title}</h5>
//       <p>Category: ${category}</p>
//       <h2>Price: $ ${price}</h2>
//       <button onclick="addToCart(${id},${price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
//       <button id="details-btn" class="btn btn-danger">Details</button></div>
//     </div>
// </div>`


