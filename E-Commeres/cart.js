
let cartContainer = document.getElementById("cartContainer");

 function getcartdetails(){
let data=localStorage.getItem("cart");
if(data==null){
return [];
}else{
    return JSON.parse(data);
}
}
let cart=getcartdetails();

function createproductcart(product){
     let div=document.createElement("div");
cartContainer.appendChild(div);

let img=document.createElement("img");
img.src=product.image;
div.appendChild(img);

let h1=document.createElement("h1");
h1.textContent=product.title;
div.appendChild(h1);

let p=document.createElement("p");
p.textContent=product.description;
div.appendChild(p);

let h2=document.createElement("h2");
h2.textContent="Price : $"+product.price;
div.appendChild(h2);

let h3=document.createElement("h3");
h3.textContent="Rating:"+product.rating.rate;
div.appendChild(h3);

let button=document.createElement("button");
button.textContent="Remove";
div.appendChild(button);

button.onclick=function(){
let index=cart.indexOf(product);
cart.splice(index,1);
localStorage.setItem("cart",JSON.stringify(cart));

cartContainer.textContent=""
for(let i of cart){
    createproductcart(i);
}
if(cart.length==0){
     let h1=document.createElement("h1");
        h1.textContent="your cart is empty";
    cartContainer.appendChild(h1);
    cartContainer.style.display="flex";
    cartContainer.style.justifyContent="center";
    cartContainer.style.alignItems="center";
    
}
}
}


if(cart.length==0){
    let h1=document.createElement("h1");
        h1.textContent="your cart is empty";
    cartContainer.appendChild(h1);
    cartContainer.style.display="flex";
    cartContainer.style.justifyContent="center";
    cartContainer.style.alignItems="center";
    
}else{
for(let product of cart){
    
   createproductcart(product);

}
}
