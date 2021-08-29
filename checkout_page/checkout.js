/* dynamic nav cart count */
let metaCart = JSON.parse(localStorage.getItem("metaCart"));
let cart = JSON.parse(localStorage.getItem("cart"));

isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

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

function authenticateUser(){
  /* checks wether user is logged in or not */
  if(!isLoggedIn){
    window.location.href = "../login page/login.html";
  }
}
function shoppingCart(){
  /* redirect to shopping cart */
  window.location.href = "../shopping_cart/shopping_cart.html";
}

/* dynamic nav cart count */
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

  function loadCheckoutCart(){
    /* appends product images to checkout page */
    
    //get div
    const imgDiv = document.getElementById("prodImg");

    //add images
    for(var i=0; i<cart.length; i++){
      const img = document.createElement("img");
      img.style.width = "80px";
      img.style.height = "80px";
      img.style.margin = "5px";
      img.setAttribute("src", cart[i].prodObj.zoomImg);
      imgDiv.append(img);
    }

    //update total columns
    //load total columns
    const subTotalP = document.getElementById("subTotal");
    const total = document.getElementById("total");
    subTotalP.innerHTML = `<b>&#8377; ${metaCart.total}</b>`;
    total.innerHTML = `<b>&#8377; ${metaCart.total}</b>`;    
  
  }
  function success(){
    /* save details to database and redirect to success */

    //get user id from database
    const currentEmail = JSON.parse(localStorage.getItem("currentEmail"));
    console.log(currentEmail);
    fetch(`http://localhost:2345/users/query/${currentEmail}`)
    .then(response => response.json())
    .then((data) => {
      const userId = data[0]["_id"];

      //update user object with shipping details
      saveShippingDetails(userId);

      //update user object with payment method
      savePaymentMethod(userId);    
      
    });

  }

  function shoppingCart(){
    /* redirect to shopping cart */
    
    window.location.href = "../shopping_cart/shopping_cart.html";
  }  

  function saveShippingDetails(userId){
    /* save shipping details of user */

    //save shipping details
    const address = document.getElementById("address1").value;
    const addressOpt = document.getElementById("address2").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const country = document.getElementById("country").value;
    const pin = document.getElementById("pin").value;

    //shipping details data
    const data = {
      address: address,
      addressOpt: addressOpt,
      city: city,
      state: state,
      country: country,
      pin: pin
    }

    //save to database
    fetch(`http://localhost:2345/users/updateShippingDetails/${userId}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch((error) => {
          console.error('Error:', error);
      });      
  }

  function savePaymentMethod(userId){
    /* save payment method of user */

    const nameOnCard = document.getElementById("nameOnCard").value;
    const cardNumber = document.getElementById("cardNumber").value;
    const expMonth = document.getElementById("expMonth").value;
    const expYear = document.getElementById("expYear").value;
    const cvv = document.getElementById("cvv").value;

    //payment method data
    const data = {
      nameOnCard: nameOnCard,
      cardNumber: cardNumber,
      expMonth: expMonth,
      expYear: expYear,
      cvv: cvv
    }

    //save to database
    fetch(`http://localhost:2345/users/updatePaymentMethod/${userId}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        window.location.href = "../success_page/success.html";
      })
      .catch((error) => {
          console.error('Error:', error);
      });      
  }
  authenticateUser();
  loadCheckoutCart();
  //load navCount
loadNavCount();
/* end */
  