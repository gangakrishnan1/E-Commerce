
let cartContainer = document.getElementById("cartContainer");
let totalPrice = document.getElementById("totalPrice");
let buyNow = document.getElementById("buyNow");

 function getcartdetails(){
let data=localStorage.getItem("cart");
if(data==null){
return [];
}else{
    //return JSON.parse(data);
    let cartdata=JSON.parse(data);
    let filterddata=cartdata.filter(i=>i.userId==localStorage.getItem("login_user"))
    return filterddata;
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

//remove button
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
updateTotal(); 
}


if(cart.length==0){
    let h1=document.createElement("h1");
        h1.textContent="your cart is empty";
    cartContainer.appendChild(h1);
    cartContainer.style.display="flex";
    cartContainer.style.justifyContent="center";
    cartContainer.style.alignItems="center";
    
}else{
     if(localStorage.getItem("login_user")==null){
        location.replace("login.html");
    }
for(let product of cart){
    
   createproductcart(product);

}
}

//seraching 

// CART SEARCH (same like index page)

search.onkeyup = (event) => {

let value = event.target.value.toLowerCase();

let filteredData = cart.filter(product =>
    product.title.toLowerCase().includes(value)
);

cartContainer.textContent = "";

if(filteredData.length == 0){

    let h1 = document.createElement("h1");
    h1.textContent = "No Product Found";
    cartContainer.appendChild(h1);

}else{

    for(let product of filteredData){
        createproductcart(product);
    }
updateTotal(); 
}

};

//cart price

function updateTotal(){

let sum = 0;

for(let product of cart){
    sum += Number(product.price);
}

totalPrice.textContent = "Total Price : $" + sum.toFixed(2);

}


// buy now

buyNow.onclick = function(){
    location.href = "success.html";
}



