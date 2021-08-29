let homeRedirect = document.getElementById("homeRedirect");
homeRedirect.addEventListener("click", redirectToHome);

function redirectToHome() {
    window.location.href = "../landing_page/landingPage.html";
}


let purchaseDiv = document.getElementById("purchaseDiv");
purchaseDiv.addEventListener("click", function () {
    window.location.href = "../purchase_page/purchase_page.html";
})

let personalDiv = document.getElementById("personalDiv");
personalDiv.addEventListener("click", function () {
    window.location.href = "../personalInfo_page/personalInfo_page.html";
})

let paymentDiv = document.getElementById("paymentDiv");
paymentDiv.addEventListener("click", function () {
    window.location.href = "../paymentsMethod_page/payments_page.html";
})

function loadShippingDetails(){
    /* load shipping details from database for current user */

    //get user id
    const currentEmail = JSON.parse(localStorage.getItem("currentEmail"));
    console.log(currentEmail);
    fetch(`http://localhost:2345/users/query/${currentEmail}`)
    .then(response => response.json())
    .then((data) => {
        const userId = data[0]["_id"];

        //get shipping details for user
        fetch(`http://localhost:2345/users/${userId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //update front end
            appendShippingDetails(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });      
 
    })    
    .catch((error) => {
        console.error('Error:', error);
    }); 


}

function appendShippingDetails(data){
    /* updates shipping details data in fields of UI */

    document.getElementById("address1").value = data.shippingDetails.address;
    document.getElementById("address2").value = data.shippingDetails.addressOpt;
    document.getElementById("state").value = data.shippingDetails.state;
    document.getElementById("city").value = data.shippingDetails.city;
    document.getElementById("country").value = data.shippingDetails.country;
    document.getElementById("pin").value = data.shippingDetails.pin;

}

function saveShippingDetails(){
    /* save shipping details of user */

    //get user id
    const currentEmail = JSON.parse(localStorage.getItem("currentEmail"));
    console.log(currentEmail);
    fetch(`http://localhost:2345/users/query/${currentEmail}`)
    .then(response => response.json())
    .then((userData) => {
        const userId = userData[0]["_id"];

        //save shipping details
        const address = document.getElementById("address1").value;
        const addressOpt = document.getElementById("address1").value;
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
loadShippingDetails();