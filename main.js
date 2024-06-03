import { addToCart, displayCartTotal, renderCartItems } from "./js/cart.js";
import { fetchProducts, renderProducts } from "./js/products.js";

//*olay izleyicisi ekledik
document.addEventListener("DOMContentLoaded", async() => {
 
  if (window.location.pathname.includes("card.html")) 
    {
    renderCartItems();
    displayCartTotal();
  } 
  else
   {
    //eğer sayfa cart.htm sayfasında değilse ürünleri al
    const products= await fetchProducts();

//ürünleri render et ve addtocartcallback fonk tanımla 
    renderProducts(products,(event)=>addToCart(event,products));
  }
});

