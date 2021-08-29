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

let purchaseDiv = document.getElementById("purchaseDiv");
purchaseDiv.addEventListener("click", function () {
    window.location.href = "../purchase_page/purchase_page.html";
})

// loading the card details dynamically

// function loadPaymentMethod() {
//     /* load transactions from database for current user */

//     //get user id
//     const currentEmail = JSON.parse(localStorage.getItem("currentEmail"));
//     console.log(currentEmail);
//     fetch(`http://localhost:2345/users/query/${currentEmail}`)
//     .then(response => response.json())
//     .then((data) => {
//         const userId = data[0]["_id"];

//         //get transactions for user
//         fetch(`http://localhost:2345/users/${userId}`)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             //update front end
//             // appendPurchaseOrders(data);
//             appendPaymentDetails(data)
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });

//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });
// }

// // appending user card details

// function appendPaymentDetails(details) {
//     const nameOnCard = document.getElementById("nameOnCard").value = details.paymentMethod.nameOnCard;
//     const cardNumber = document.getElementById("cardNumber").value = details.paymentMethod.cardNumber;
//     const expMonth = document.getElementById("expMonth").value = details.paymentMethod.expMonth;
//     const expYear = document.getElementById("expYear").value = details.paymentMethod.expYear;
//     const cvv = document.getElementById("cvv").value = details.paymentMethod.cvv;
// }

// loadPaymentMethod()