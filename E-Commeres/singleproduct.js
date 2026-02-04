  let productbg=document.getElementById("productbg");
  let No_of_carts=document.getElementById("No_of_carts");
  //to bring the data from local storage
  function getcartdetails(){
let data=localStorage.getItem("cart");
if(data==null){
    return [];
}else{
    //data is in the string formate to change it to its original we use parse()
   let cartdata= JSON.parse(data);
       let filtereddata=cartdata.filter(i=>i.userId==localStorage.getItem("login_user"))
       return filtereddata;
}
  }
  let cart=getcartdetails();
 let count=cart.length;
No_of_carts.textContent="Cart("+count+")"

function singleproductinterface(product){
    let img=document.createElement("img");
    img.src=product.image;
    productbg.appendChild(img);
    //creating div to wrap
    let div=document.createElement("div");
    productbg.appendChild(div);

//for title
let h1=document.createElement("h1");
h1.textContent=product.title;
div.appendChild(h1);

//for description
let p=document.createElement("p");
p.textContent=product.description;
div.appendChild(p);


//for price
let h2=document.createElement("h2");
h2.textContent="price : $"+product.price;
div.appendChild(h2);

//for rating
let h3=document.createElement("h3");
h3.textContent="Rating :"+product.rating.rate;
div.appendChild(h3);

//creating add to acrt button

let button=document.createElement("button");
button.textContent="Add to Cart";
div.appendChild(button);

button.onclick = function () {
    product.userId=localStorage.getItem("login_user");
cart.push(product);
localStorage.setItem("cart",JSON.stringify(cart));
count++
No_of_carts.textContent="Cart("+count+")";
}
}

  async function getsingleproduct(){
    try {
        if(localStorage.getItem("login_user")==null){
            location.replace("login.html")
        }
        let id=localStorage.getItem("productId");
        let res = await fetch('https://fakestoreapi.com/products/' + id);
        let jsonres=await res.json();
        singleproductinterface(jsonres);
    } catch (error) {
        console.log(error);
    }
}
getsingleproduct();


 