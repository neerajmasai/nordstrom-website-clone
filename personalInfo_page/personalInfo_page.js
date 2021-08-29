
let homeRedirect = document.getElementById("homeRedirect");
homeRedirect.addEventListener("click", redirectToHome);

function redirectToHome() {
    window.location.href = "../landing_page/landingPage.html";
}

let shippingDiv = document.getElementById("shippingDiv");
shippingDiv.addEventListener("click", function () {
    window.location.href = "../shippingAddress_page/shipping_page.html";
})

let purchaseDiv = document.getElementById("purchaseDiv");
purchaseDiv.addEventListener("click", function () {
    window.location.href = "../purchase_page/purchase_page.html";
})

let paymentDiv = document.getElementById("paymentDiv");
paymentDiv.addEventListener("click", function () {
    window.location.href = "../paymentsMethod_page/payments_page.html";
})

function loadAccountInfo(){
    /* loads account name and initials */

  //get user
  const currentEmail = JSON.parse(localStorage.getItem("currentEmail"));
  console.log(currentEmail);
  fetch(`http://localhost:2345/users/query/${currentEmail}`)
  .then(response => response.json())
  .then((userData) => {
      
      //first name initial
      document.getElementById("accountInitial").innerHTML = userData[0]["firstName"][0];

      //first name greeting
      document.getElementById("accountName").innerHTML = `${userData[0]["firstName"]}'s Account`;

  })
  .catch((error) => {
      console.error('Error:', error);
  });
    
}

loadAccountInfo();