//Fetching data using the API
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();


//Will show dynamic ratings based on the information
const customerRatings = (rate, count) => {
  let innerHtml = '';
  let i = 0;
  const fullStar = Math.floor(rate);
  const remaining = rate - fullStar;

  //full stars
  while (i < fullStar) {
    innerHtml += `<i class="fas fa-star"></i>`;
    i++;
  }

  //will show a half start
  if (remaining > 0) {
    innerHtml += `<i class="fas fa-star-half-alt"></i>`;
    i++;
  }

  //remaining will be all empty stars
  while (i < 5) {
    innerHtml += `<i class="far fa-star"></i>`;
    i++;
  }
  innerHtml += `(${rate}) <h6 class="rateCount"><i class="fas fa-users"></i> ${count}</h6>`;
  return innerHtml;
};

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  const allProductsContainer = document.getElementById("all-products");

  //loop through the each product to show on UI.
  for (const product of allProducts) {

    //Destructuring the objects
    const { image, title, category, price, id } = product;
    const { rate, count } = product.rating;

    //creating bootstrap cards, dynamically
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
            <p>${customerRatings(rate, count)}</p>
            <small id="price-text">Price:</small>
            <h3 id="amount-text">$${price}</h3>
          </div>
          <div class ="card-footer d-flex justify-content-between">
            <button onclick="addToCart(${id},${price})" id="addToCart-btn" class="customized-btn-one">add to cart</button>
            <button onclick="fetchSingleProduct(${id})" id="details-btn" class="customized-btn-two">Details</button>
          </div>
    </div>`;
    allProductsContainer.appendChild(div);
  }
};


//As user presses Add to cart btn, this function is executed.
let count = 0; // Initially 0 product is in cart, as user presses btn, it increases by one.
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

//getting innerText and convert it in to floating value.
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function as new items gets added.
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;

  //Showing in two decimal places
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax based on purchased amount
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


//Modal Area
const modal = document.querySelector('.modal-overlay');
const modalContainer = document.getElementById('modal-container');
const closeBtn = document.getElementById('close-btn');

const fetchSingleProduct = id => {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
    .then(data => showDetails(data))
}
const showDetails = product => {
  const { image, title, category, price, description } = product;
  modalContainer.innerHTML = `
      <div class="card mb-3">
        <div class="d-flex justify-content-center">
              <img src=${image} class="card-img-top modal-product-image mt-3" alt="...">
         </div>
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text"><small class="text-muted">${category}</small></p>
        <p class="card-text">${description}</p>
        <h4 class="text-center text-color">price: $${price} </h4>
      </div>
    </div>
    <button id="close-btn" onclick="closeModal()"> <i class="fas fa-times"></i> </button>`
  modal.classList.add('show-modal');
}

const closeModal = () => {
  modal.classList.remove('show-modal');
}


