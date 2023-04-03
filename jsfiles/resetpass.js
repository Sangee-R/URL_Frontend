function resetPass() {
    var url = window.location.href;
  
    var arr = url.split("?");
    //   console.log(arr)
    var mail = arr[1];
    var string = arr[2];
    console.log(arr);
    var newPass = document.getElementById("frgtPass").value;
    document.getElementById("layer").style.display = "block";
    fetch(
      "https://url-shrten.herokuapp.com/resetpassword/" + mail + "/" + string,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newPass }),
      }
    )
      .then((res) => {
        document.getElementById("layer").style.display = "none";
        if (res.status == 200) {
          document.getElementById("login").style.display = "none";
          document.getElementById("error").style.display = "block";
        }
      })
      .then((data) => {
        fetch("https://url-shrten.herokuapp.com/updateToken/" + mail, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
        });
      });
  }