
 let bg=document.getElementById("bg");
 let cartlength=document.getElementById("cartlength");
 let search=document.getElementById("search");
 let logoutBtn=document.getElementById("logoutBtn")
let allproducts;
 function getcartdetails(){
    let data = localStorage.getItem("cart");
    if(data==null){
        return []
    }else{
        return JSON.parse(data);
    }
 }
 let data=getcartdetails();
 cartlength.textContent="cart("+data.length+")";

 function createproductcard(products){
    for(let product of products){
        //creating anchore tag to move(singlepage.html) when we click the button

        let a=document.createElement("a");
        a.href="singleproduct.html";
        bg.appendChild(a);

// here from products storesas object -> each object comes in to product(i) , each product(object) has data like id, category
//  each object comes in to product so we need to cretae a card using div, so we are creating a div and appends to a anchortag(a tag appended to bg) selected with id

//creating div
        let div=document.createElement("div")
         a.appendChild(div);

         // creating image 
        let img =document.createElement("img");
        img.src=product.image;
        div.appendChild(img);

        //creating title 
        let h1=document.createElement("h1");
        h1.textContent=product.title;
        div.appendChild(h1);

        //creating description
        let p=document.createElement("p");
        p.textContent=product.description;
        div.appendChild(p);


        //creating price 
        let h2=document.createElement("h2");
        h2.textContent="price: $"+product.price;
        div.appendChild(h2);

        // craeting rating
        let h3=document.createElement("h3");
        h3.textContent="rating:"+product.rating.rate
        // here rating  is object -> rating>rate 
        div.appendChild(h3);
        //console.log(product)
     div.onclick = function () {
    localStorage.setItem("productId", product.id);
}

    }
}




 async function getData(){
    try {
        let res=await fetch("https://fakestoreapi.com/products");
        let jsonres= await res.json()
         createproductcard(jsonres);
         allproducts=jsonres;
    } catch (error) {
        console.log(error);
    }
}

getData();


//searching

search.onkeyup=(event)=>{
let filterddata=allproducts.filter(product=>{
    return product.title.includes(event.target.value)
});
bg.textContent="";
if(filterddata.length==0){
    let h1=document.createElement("h1");
    h1.textContent="No Product Found";
    bg.appendChild(h1);
    
}else{    
createproductcard(filterddata);
}
}
//logout

logoutBtn.onclick=function(){
    localStorage.removeItem("login_user")
    location.replace("login.html")
}