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

function loadPaymentMethod() {
    /* load transactions from database for current user */

    //get user id
    const currentEmail = JSON.parse(localStorage.getItem("currentEmail"));
    console.log(currentEmail);
    fetch(`http://localhost:2345/users/query/${currentEmail}`)
    .then(response => response.json())
    .then((data) => {
        const userId = data[0]["_id"];

        //get transactions for user
        fetch(`http://localhost:2345/users/${userId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //update front end
            appendPaymentDetails(data)
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// appending user card details

function appendPaymentDetails(details) {
    document.getElementById("nameOnCard").value = details.paymentMethod.nameOnCard;
    document.getElementById("cardNumber").value = details.paymentMethod.cardNumber;
    document.getElementById("expMonth").value = details.paymentMethod.expMonth;
    document.getElementById("expYear").value = details.paymentMethod.expYear;
    document.getElementById("cvv").value = details.paymentMethod.cvv;
}

function savePaymentMethod(){
    /* save payment method of user */

    //get user id
    const currentEmail = JSON.parse(localStorage.getItem("currentEmail"));
    console.log(currentEmail);
    fetch(`http://localhost:2345/users/query/${currentEmail}`)
    .then(response => response.json())
    .then((userData) => {
        const userId = userData[0]["_id"];

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
          })
          .catch((error) => {
              console.error('Error:', error);
          });  

    })
    .catch((error) => {
        console.error('Error:', error);
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
loadPaymentMethod();