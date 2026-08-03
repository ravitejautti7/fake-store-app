
const productsContainer=document.getElementById("products");
async function getproducts(){
    try{

        const response=await fetch("https://fakestoreapi.com/products");
        const products=await response.json();
        products.forEach((product) => {
            const card=document.createElement("div");
            card.className="card";
            card.innerHTML=`
            <img src="${product.image}">
            <h2>${product.title}</h2>
            <p>⭐ ${product.rating.rate}</p>
            <p> $ ${product.price}</p>
            <p>${product.category}</p>
            <button>Add to cart</button>
            `;
            productsContainer.appendChild(card);
            
        });
        
    }
    catch(err){
        console.log(err);
    }
    finally{
        console.log("Completed");
    }
}

getproducts();

