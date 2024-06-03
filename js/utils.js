export function saveToLocalStorage(cart) {
  //local storage veri yazma
  localStorage.setItem("cart", JSON.stringify(cart));
}
export function getCartFromLocalStorage() {
  //local storage de cat adında bir key varsa onları json formatında getir yoksa boş dizi döndür
  return JSON.parse(localStorage.getItem("cart")) || [];
}

export function updateCartIcon(cart){
const cartIcon=document.getElementById("cart-icon")
 const i=document.querySelector(".bx-shopping-bag");

 let totalQuantity=cart.reduce((sum,item)=>sum+item.quantity,0);
 console.log(totalQuantity);

 i.setAttribute("data-quantity",totalQuantity);
 cartIcon.setAttribute("data-quantity",totalQuantity);
}
export function calculateCartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}