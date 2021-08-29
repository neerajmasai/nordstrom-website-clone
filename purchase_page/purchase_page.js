let homeRedirect = document.getElementById("homeRedirect");
homeRedirect.addEventListener("click", redirectToHome);

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

function redirectToHome() {
    window.location.href = "../landing_page/landingPage.html";
}

let shippingDiv = document.getElementById("shippingDiv");
shippingDiv.addEventListener("click", function () {
    window.location.href = "../shippingAddress_page/shipping_page.html";
})

let personalDiv = document.getElementById("personalDiv");
personalDiv.addEventListener("click", function () {
    window.location.href = "../personalInfo_page/personalInfo_page.html";
})

let paymentDiv = document.getElementById("paymentDiv");
paymentDiv.addEventListener("click", function () {
    window.location.href = "../paymentsMethod_page/payments_page.html";
})

function loadPurchases(){
    /* load transactions from database for current user */

    //get user id
    const currentEmail = JSON.parse(localStorage.getItem("currentEmail"));
    console.log(currentEmail);
    fetch(`http://localhost:2345/users/query/${currentEmail}`)
    .then(response => response.json())
    .then((data) => {
        const userId = data[0]["_id"];

        //get transactions for user
        fetch(`http://localhost:2345/transactions/user/${userId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //update front end
            appendPurchaseOrders(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });      
 
    })    
    .catch((error) => {
        console.error('Error:', error);
    }); 


}

function appendPurchaseOrders(orders){
    /* dynamically append purchase order products */

    const parent = document.getElementById("ordersContainer");

    if(orders.length == 0){
        //no orders yet
        const h1 = document.createElement("h1");
        h1.innerHTML = "It looks like you have not ordered yet, order now, exciting offers await you!";
        parent.append(h1);
    }

    //append orders date wise
    orders.forEach(order => {

        //main div
        const div = document.createElement("div");
        div.setAttribute("class", "order-div");

        //order date
        const orderDate = document.createElement("h4");
        orderDate.innerHTML = `Ordered on: ${moment(order.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`;

        div.append(orderDate);

        order.cart.forEach(product => {

            //show cart items
            const cartDiv = document.createElement("div");
            cartDiv.setAttribute("class", "cart-div");

            //name
            const name = document.createElement("p");
            name.setAttribute("class", "name");
            name.innerHTML = product.prodObj.name;

            //img
            const img = document.createElement("img");
            img.setAttribute("src", product.prodObj.img1);
            img.setAttribute("class", "imgHeight")

            //price
            const subTotal = document.createElement("p");
            subTotal.setAttribute("class", "name");
            subTotal.innerHTML = `INR. ${product.subTotal}`;

            //qty
            const qty = document.createElement("p");
            qty.setAttribute("class", "name");
            qty.innerHTML = `Qty: ${product.qty}`;            

            cartDiv.append(img, name, qty, subTotal);

            div.append(cartDiv);
        });

        parent.append(div);
    });

}

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
loadPurchases();