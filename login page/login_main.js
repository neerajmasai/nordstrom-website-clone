localStorage.setItem("isLoggedIn", JSON.stringify(false))

// CHECKING WHETHER USER ALREADY EXIST OR NOT
function writeToStorage() {
    fetch('http://localhost:2345/users/')
        .then(response => response.json())
        .then(data => {
            console.log('Success', data);
            var email = document.getElementById("input1").value;
            console.log(email);
            localStorage.setItem("currentEmail", JSON.stringify(email));
            let flag = false;
            for (var i = 0; i < data.length; i++) {
                if (data[i].email == email) {
                    console.log("email found");
                    flag = true;
                    goToLogin();
                }
            }
            if(!flag){
              goToSignUp();
            }
        })
}

// REDIRECTING TO CREATE ACCOUNT PAGE IF USER IS NEW
function goToSignUp(){
    window.location.href = "login1.html";
}

// REDIRECTING TO SIGN IN PAGE FOR EXISTING USER
function goToLogin(){
    window.location.href = "login3.html";
}

// CREATING USER
function loggedIn() {
    var fName = document.getElementById("fName").value
    var lName = document.getElementById("lName").value
    var pwd = document.getElementById("pwd").value
    var curEmail = JSON.parse(localStorage.getItem("currentEmail"))
    const data = { email: curEmail, firstName: fName, lastName: lName, password: pwd};
    fetch('http://localhost:2345/users/', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        localStorage.setItem("isLoggedIn", JSON.stringify(true))
        window.location.href = "login2.html";
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function home() {

    var curEmail = JSON.parse(localStorage.getItem("currentEmail"));
    var pwd = document.getElementById("inp").value;

    validateUser(curEmail, pwd);
    
}

function validateUser(email, pwd){
    /* validate user and redirect */
    fetch(`http://localhost:2345/users/query/${email}`)
    .then(response => response.json())
    .then(data => {
        if(data[0].password == pwd){
            //correct password
            localStorage.setItem("isLoggedIn", JSON.stringify(true))
            window.location.href = "../landing_page/landingPage.html";
        }
        else{
            alert("Please enter valid password!");
        }
    });
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
                sign.innerHTML = `Hi, ${details[0].fName}`;
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
            })
    }
    else{
        //show Sign In
        var sign = document.getElementById("signInOption");
        sign.innerHTML = "Sign In";
        sign.value = "Sign In";
    }
}

function signIn(){
    /* redirect to sign in page */
    window.location.href = "../login page/login.html";
}

// Redirection to Home page

let homeRedirect = document.getElementById("homeRedirect");
homeRedirect.addEventListener("click", redirectToHome);

function redirectToHome() {
    window.location.href = "..landing_page/landingPage.html";
}