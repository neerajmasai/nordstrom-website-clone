/* dynamic cart data */
let metaCart = JSON.parse(localStorage.getItem("metaCart"));
let cart = JSON.parse(localStorage.getItem("cart"));

let continueShopping = document.getElementById("continueShopping");
continueShopping.addEventListener("click", goToHomePage);

function goToHomePage() {
    window.location.href = "../landing_page/landingPage.html";
}

function processOrder(){
    let newOrder = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 5000);
    });
    newOrder.then(() => {
        //remove cart items
        const div = document.getElementById("successContainer");
        const div2 = document.getElementById("processingContainer");
        div2.remove();
        div.style.visibility = "visible";

        //save cart items to database
        storeCart();
    });
}
function emptyCart(){
    /* removes all cart items */

    localStorage.removeItem("metaCart");
    localStorage.removeItem("cart");
}

function storeCart(){
    /* stores cart info and user info as transaction */

    //get user id from database
    const currentEmail = JSON.parse(localStorage.getItem("currentEmail"));
    console.log(currentEmail);
    fetch(`http://localhost:2345/users/query/${currentEmail}`)
    .then(response => response.json())
    .then((data) => {
        const userId = data[0]["_id"];
        
        const transaction = {
            user: userId,
            cart: cart,
            meta: metaCart,
            success: true
        }

        //save to database
        fetch(`http://localhost:2345/transactions/`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(transaction),
        })
        .then(response => response.json())
        .then(data => {
            //empty cart after transaction success
            emptyCart();
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });      

      
    })    
    .catch((error) => {
        console.error('Error:', error);
    });     
}

processOrder();
