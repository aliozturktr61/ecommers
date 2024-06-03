import { calculateCartTotal, getCartFromLocalStorage, saveToLocalStorage, updateCartIcon } from "./utils.js";

let cart=getCartFromLocalStorage();
//sepete ürün ekleme fonksiyonu

export function addToCart(event,products){
   const productId= parseInt(event.target.dataset.id);//tıkladığımız ürünün id alıyor
    //id alınan elamanı find komutuyla dizi içinde arıyoruz
    const product=products.find((product)=>product.id===productId);
//eğer ürünü bulursa çalışacak
    if(product){
        //sepette önceden eklenen ürünleri bulur
        const exitingItem=cart.find((item)=>item.id===productId);
        //sepette bu üründen daha önce varsa if çalışacak
if(exitingItem)
    {//ürün miktarını arttırır
    exitingItem.quantity++;


    }
    else{
        //ürün sepette yoksa çalışacak
        const cartItem={
            id:product.id,
            title:product.title,
            price:product.price,
            image:product.image,
            quantity:1,
        };
        cart.push(cartItem);
        //ekleme yapıldığında butonun üzerine added yazılacak
        event.target.textContent="Added";//ekleme butonunun içeriğini değitirir
        updateCartIcon(cart);
        saveToLocalStorage(cart);
        renderCartItems();
        displayCartTotal();
        
    }
}

}
//sepetteki ürünleri silme işlemi
function removeFromCart(event){
    //sileceğimiz elemanın id aldık
    const productId=parseInt(event.target.dataset.id);
    //tıkladığımız elemanı sepetten kaldırır
    cart=cart.filter((item)=>item.id!==productId);
    
    saveToLocalStorage(cart);//local storageyi güncelle
    renderCartItems();//sayfayı yenile
displayCartTotal();
updateCartIcon(cart);
}

function changeQuantity(event){
    //inputun içerisindeki değeri aldık
    const quantity=parseInt(event.target.value);
    //değitilen adet sayısını id eriştik
    const productId=parseInt(event.target.dataset.id);
    if(quantity>0)
        {
          const cartItem= cart.find((item)=>item.id===productId);
          if(cartItem){
            cartItem.quantity=quantity;
            saveToLocalStorage(cart);
            displayCartTotal();
            updateCartIcon(cart);
          }
        }

}

//sepetteki ürünleri ekrana renderlar
export function renderCartItems(){
   const cartItemsElement= document.getElementById("cartItems");
   cartItemsElement.innerHTML=cart
   .map((item)=>`
        <div class="cart-item">
            <img
              src="${item.image}"
              alt=""/>
              <div class="cart-item-info">
                <h2 class="cart-item-title">${item.title}</h2>
                <input type="number" min="1" value="${item.quantity}" class="cart-item-quantity" data-id="${item.id}"/>
              </div>
              <h2>${item.price}</h2>
              <button class="remove-from-cart" data-id="${item.id}">Remove</button>
        </div>
          
          `)
          .join("");

          //tüm silme butonlarını aldık
          const removeButtons=document.getElementsByClassName("remove-from-cart");
          for(let i=0;i<removeButtons.length;i++)
            {
               const removeButton=removeButtons[i];//index numaralarına göre hepsini seçtik
               removeButton.addEventListener("click",removeFromCart);
            }
        
            const quantityInputs=document.getElementsByClassName("cart-item-quantity");
            for(let i=0;i<quantityInputs.length;i++)
                {
                    const quantityInput=quantityInputs[i];
                    quantityInput.addEventListener("change",changeQuantity)
                }
           updateCartIcon(cart)
}
//toplam miktarı ekrana yazdırıyoruz
export function displayCartTotal(){
  const cartTotalElement=  document.getElementById("cartTotal");
 const total=calculateCartTotal(cart);
 cartTotalElement.textContent=`Total:$ ${total.toFixed(2)}`;
}