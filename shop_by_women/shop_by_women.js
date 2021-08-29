let homeRedirect = document.getElementById("homeRedirect");
homeRedirect.addEventListener("click", redirectToHome);

function redirectToHome() {
    window.location.href = "../landing_page/landingPage.html";
}

window.onload = function logged() {
    var isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    
    if(isLoggedIn){
        //show name and logout option
        var sign = document.getElementById("signInOption");
        var currentEmail = JSON.parse(localStorage.getItem("currentEmail"));
        fetch(`http://localhost:2345/users/query/${currentEmail}`)
            .then(response => response.json())
            .then((details) => {
                console.log('details:', details);
                sign.innerHTML = `Hi, ${details[0].firstName}`;
                var logoutDiv = document.getElementById("signIn")
                var logout = document.createElement("option");
                logout.value = "Sign Out";
                logout.innerHTML = "Sign Out";
                logout.addEventListener("click", () => {
                    isLoggedIn = false;
                    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
                    window.location.reload();
                });
                logoutDiv.append(logout);
                var mail = document.getElementById("curmail");
                mail.innerHTML = currentEmail;
                var username = document.getElementById("username");
                username.innerHTML = details[0].firstName + " " + details[0].lastName;
            })
    }
    else{
        //show Sign In
        var sign = document.getElementById("signInOption");
        sign.innerHTML = "Sign In";
        sign.value = "Sign In";
    }
}
function myaccount() {
    /* go to my account page */

    var isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

    if (isLoggedIn) {
        window.location.href = "../personalInfo_page/personalInfo_page.html";
    }
    else{
         window.location.href = "../login page/login.html";
    }
}
function signIn(){
    /* redirect to sign in page */
    window.location.href = "../login page/login.html";
}

function shoppingCart(){
  /* redirect to shopping cart */
  window.location.href = "../shopping_cart/shopping_cart.html";
}

function loadNavCount(){
  /* loads navbar cart count */

  const navCart = document.getElementById("navCartCount");

  //get meta cart
  let cart = JSON.parse(localStorage.getItem("metaCart"));

  if(cart == null){
    navCart.innerHTML = 0;
  }
  
  navCart.innerHTML = cart.count;

}

//load navCount
loadNavCount();
//* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

// fetching products from database

let shopWomenProducts = document.getElementById("shopWomenProducts");
var newProdArray = [];
fetch("http://localhost:2345/products/")
.then(response => response.json())
.then((products) => {
    // console.log(products);
    /* products fetched from database */
    
    for (var i = 20; i < products.length; i++) {
        // console.log(products[i]);
        newProdArray.push(products[i]);
    }
    loadWomenProducts(newProdArray, shopWomenProducts);
});

console.log(newProdArray);

function loadWomenProducts(products, parentDiv) {
    console.log(products)
    products.forEach((product) => {
        let prodDiv = document.createElement("div");
        prodDiv.setAttribute("class", "prodDiv");
        let womenImg = document.createElement("img");
        womenImg.setAttribute("src", product.zoomImg);
        womenImg.setAttribute("class", "womenImgSize");
        // womenImg.addEventListener("mouseover", function () {
        //     womenImg.src = product.img2;
        // })
        // womenImg.addEventListener("mouseleave", function () {
        //     womenImg.src = product.zoomImg;
        // })

        // create color image
        const colorImg = document.createElement("img");
        colorImg.src = product.colorsImg;
        // colorImg.setAtrribute("class", "rabia");

        //create product name
        const name = document.createElement("h5");
        name.setAttribute("class", "prodName");
        name.innerHTML = product.name;


        //create product price
        const price = document.createElement("p");
        price.setAttribute("class", "prodPrice");
        price.innerHTML = `INR. ${product.price}`;

        //create brand 
        const brand = document.createElement("p");
        brand.innerHTML = product.brand;

        // create ratings

        const ratingsMainDiv = document.createElement("div");
        ratingsMainDiv.setAttribute("class", "ratingsMainDiv");

        const ratingsDiv = document.createElement("div");
        ratingsDiv.innerHTML = "";
        for(var i=0; i<product.ratings; i++){
            const starIcon = document.createElement("span");
            starIcon.setAttribute("class", "material-icons");
            starIcon.innerHTML = "star";
            ratingsDiv.append(starIcon);
        }
        const reviews = document.createElement("span");
        reviews.innerHTML = `(${Math.ceil(Math.random()*1999)})`;
        ratingsDiv.append(reviews);


        prodDiv.append(womenImg, name, brand, price, ratingsMainDiv);
        ratingsMainDiv.append(ratingsDiv, reviews);
        parentDiv.append(prodDiv);
    })
}

// sort by price functions

function sortH2L() {
    // loadWomenProducts(newProdArray, shopWomenProducts);
    newProdArray.sort(function (a, b) {
        return b.price - a.price;
    });

    shopWomenProducts.innerHTML = null;
    loadWomenProducts(newProdArray, shopWomenProducts);
    // newProdArray.forEach(function (product) {
    //     loadWomenProducts(product);
    // });

    // console.log(newProdArray)
}
// sortH2L();

function sortL2H() {
    // fetch("http://localhost:2345/products/")
    // .then(response => response.json())
    // .then((products) => {
    //     // console.log(products);
    //     /* products fetched from database */
    //     var newProdArray = [];
    //     for (var i = 20; i < products.length; i++) {
    //         // console.log(products[i]);
    //         newProdArray.push(products[i]);
    //     }
        // loadWomenProducts(newProdArray, shopWomenProducts);
        newProdArray.sort(function (a, b) {
            return a.price - b.price;
        });

        shopWomenProducts.innerHTML = null;

        // newProdArray.forEach(function (product) {
            loadWomenProducts(newProdArray, shopWomenProducts);
        // });
    // });

    // console.log(newProdArray)
}


// let low2High = document.getElementById("low2High");
// low2High.addEventListener("click", function () {
//     sortL2H();
// })

// let high2Low = document.getElementById("high2Low");
// high2Low.addEventListener("click", function () {
//     sortH2L();
// })
// sortL2H()
function getSelected() {
  var selectedValue = document.getElementById("sorting").value;
  if (selectedValue == "low") {
      sortL2H();
  } else {
    sortH2L();
  }
}

// getSelected();

function filterByBrand(msg) {
    shopWomenProducts.innerHTML = null;
    // fetch("http://localhost:2345/products/")
    // .then(response => response.json())
    // .then((products) => {
    //     // console.log(products);
       
    //     var newProdArray = [];
        // for (var i = 20; i < products.length; i++) {
            // console.log(products[i]);
            // newProdArray.push(products[i]);
        // }
        // console.log(newProdArray);
        
        // loadWomenProducts(newProdArray, shopWomenProducts);
        let newArray2 =[]
        for (var i = 0; i < newProdArray.length; i++) {
            if (newProdArray[i].brand == msg) {
                newArray2.push(newProdArray[i]);
                loadWomenProducts(newArray2, shopWomenProducts);
            }
        }
        
    // });
    // console.log(newArray);
}