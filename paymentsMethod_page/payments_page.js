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