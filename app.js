// Make a GET request to fetch data from a server
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
    renderProducts(data);
  })
  .catch((error) => {
    // Handle errors
    console.error("Fetch error:", error);
  });

const container = document.querySelector(".container");

function renderProducts(products) {
  //console.log(products);
  for (let product of products) {
    console.log(product);
    const productData = document.createElement("div");
    productData.classList.add("product-card");

    productData.innerHTML = `
    <img src="${product.image}"
    alt="${product.name}"/>
    <div class="product-details">
        <h5 class="product-title">${product.title}</h5>
        <p>${product.title}</p>
        <h5 class="product-price">Rs ${product.price}</h5>
    </div>
    `;

    container.appendChild(productData);
  }
}
