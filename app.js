let products = [];
const container = document.querySelector(".container");
const searchButton = document.querySelector("#search");
const inputArea = document.getElementById("search-query");
let query = document.getElementById("search-query");

// Making a GET request to fetch data from the server
fetch("https://fakestoreapi.com/products")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // Parse the response body as JSON
    return response.json();
  })
  .then((data) => {
    //console.log(data);
    products = data;
    renderProducts(data);
  })
  .catch((error) => {
    // Handle errors
    console.error("Fetch error:", error);
  });

//listening to input values
inputArea.addEventListener("input", function (e) {
  e.preventDefault();
  let searchResult = query.value.toLowerCase();
  let filteredResults = filterProducts(products, searchResult);
  console.log(filteredResults);
  container.innerHTML = "";
  renderProducts(filteredResults);
});

//filtering products based on input
function filterProducts(data, search) {
  search = search.toLowerCase();

  let filteredResult = [];
  for (let i = 0; i < data.length; i++) {
    // Destructure
    const { title, description } = data[i];
    const titleLC = title.toLowerCase();
    const descriptionLC = description.toLowerCase();

    // Searching
    if (titleLC.includes(search) || descriptionLC.includes(search)) {
      filteredResult.push(data[i]);
    }
  }
  return filteredResult;
}

//renderProducts
function renderProducts(products) {
  //console.log(products);
  for (let product of products) {
    const productData = document.createElement("div");
    productData.classList.add("product-card");

    productData.innerHTML = `
    <img src="${product.image}"
    alt="${product.name}"/>
    <div class="product-details">
        <h5 class="product-title">${product.title}</h5>
        <p>${product.description}</p>
        <h5 class="product-price">${product.price} $</h5>
    </div>
    `;

    container.appendChild(productData);
  }
}
