
export async function fetchProducts(){
    try{//db.json dosyasına istek attık
        const Response=await fetch("db.json");
        
        if(!Response.ok){
            //hata oluşturduk
            throw new Error("url yanlış");
        }
        //gelen cevabı json formatına çevirdik ve return ettik
        return await Response.json();

    }
    catch(error){
        console.error(error);
        return[];
    }
}

//ürünler sayfaya ekleyelim
export function renderProducts(products,addToCartCallback) {
   const productList=document.getElementById("productList");
   console.log(products);
   //db.json içerisindeki verileri html deki product cardlara ekleniyor
     productList.innerHTML=products
     .map(
        (product) => `
      <div class="product">
          <img
              src=${product.image}
              alt=""
              class="product-img"
          />
          <div class="product-info">
              <h2 class="product-title">${product.title}</h2>
              <p class="product-price">$${product.price}</p>
              <a class="add-to-cart" data-id="${product.id}">Add to cart</a>
          </div>
      </div>
    
    `
      )
      .join("");
    
//butona tıklayınca sepete ekleme yaptıracaz

const addToCardButtons=document.getElementsByClassName("add-to-cart");
for(let i=0;i<addToCardButtons.length;i++)
    {
        const addToCardButton=addToCardButtons[i];
        addToCardButton.addEventListener("click",addToCartCallback);
    }



}


 
