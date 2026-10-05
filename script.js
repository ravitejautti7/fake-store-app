const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("search");

let allProducts = [];

async function getProducts() {

    productsContainer.innerHTML =
        "<h2 class='loading'>Loading Products...</h2>";

    try {

        const response =
            await fetch("https://dummyjson.com/products");

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data =
            await response.json();

        // DummyJSON stores products inside "products"
        allProducts = data.products;

        displayProducts(allProducts);

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

            <img src="${product.thumbnail}" alt="${product.title}">

            <h2>${product.title}</h2>

            <p class="rating">
                ⭐ ${product.rating}
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
