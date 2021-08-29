let homeRedirect = document.getElementById("homeRedirect");
homeRedirect.addEventListener("click", redirectToHome);

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