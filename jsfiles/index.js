var forgot = document
  .getElementById("forgot")
  .addEventListener("click", forgotPass);
var reg = document.getElementById("reg").addEventListener("click", regForm);
var reg = document
  .getElementById("regLogin")
  .addEventListener("click", function () {
    window.location.reload();
  });
function forgotPass() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("forgotForm").style.display = "block";
}

var url = "https://url-shrten.herokuapp.com";
function auth() {
  var email = document.getElementById("frgtEmail").value;
  document.getElementById("layer").style.display = "block";
  fetch(url + "/forgot", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then((res) => {
      document.getElementById("layer").style.display = "none";
      return res.json();
    })
    .then((data) => {
      alert(data.message);
    })
    .then(() => {
      document.getElementById("forgotForm").style.display = "none";
      document.getElementById("loginForm").style.display = "block";
    });
}

function login() {
  var email = document.getElementById("loginEmail").value;
  var password = document.getElementById("loginPass").value;
   document.getElementById("layer").style.display = "block";
  fetch(url + "/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {   
       document.getElementById("layer").style.display = "none";
         return res.json();
    })
    .then((data) => {
      if (data.message == "success") {
        //  console.log("true");
        localStorage.setItem("token", data.token);
        window.location.href=`dashboard.html?${data.id}`;
      } else {
        document.getElementById("error").style.display = "block";
        document.getElementById("error").innerHTML = data.message;
      }
    });
}

function regForm() {
  document.getElementById("header").innerHTML = "Register";
  document.getElementById("login").style.display = "none";
  document.getElementById("register").style.display = "block";
}

function register() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("regEmail").value;
  var password = document.getElementById("regPass").value;
  var status = false;
  document.getElementById("layer").style.display = "block";
  fetch(url + "/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ name, email, password, status }),
  })
    .then((res) => {
      document.getElementById("layer").style.display = "none";
      return res.json();
    })
    .then((data) => {
      if (data.status) {
        document.getElementById("error").style.cssText =
          "display:block;background:green;color:white";
        document.getElementById("error").innerHTML = data.message;
      } else {
        document.getElementById("error").style.display = "block";
        document.getElementById("error").innerHTML = data.message;
      }
    });
}