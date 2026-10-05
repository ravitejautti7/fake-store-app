const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("search");

let allProducts = [];

async function getProducts() {

    productsContainer.innerHTML =
        "<h2 class='loading'>Loading Products...</h2>";

    try {

        const response =
            await fetch("https://fakestoreapi.com/products");

        // Check if API response is successful
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const products =
            await response.json();

        allProducts = products;

        displayProducts(products);

    } catch (error) {

        productsContainer.innerHTML =
            "<h2 class='error'>Unable to load products.</h2>";

        console.error("API Error:", error);

    }
}


function displayProducts(products) {

    productsContainer.innerHTML = "";

    products.forEach(product => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `

            <img src="${product.image}" alt="${product.title}">

            <h2>${product.title}</h2>

            <p class="rating">
                ⭐ ${product.rating.rate}
                (${product.rating.count} Reviews)
            </p>

            <p class="price">
                $${product.price.toFixed(2)}
            </p>

            <p class="category">
                ${product.category}
            </p>

            <button>
                🛒 Add to Cart
            </button>

        `;

        productsContainer.appendChild(card);

    });

}


searchInput.addEventListener("input", () => {

    const value =
        searchInput.value.toLowerCase();

    const filtered =
        allProducts.filter(product =>
            product.title.toLowerCase().includes(value)
        );

    displayProducts(filtered);

});


getProducts();
