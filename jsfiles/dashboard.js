var id = window.location.href.split("?")[1];

var url = "https://url-shrten.herokuapp.com";
function post() {
  var short = Math.random().toString(36).substring(7);
  var fullurl = document.getElementById("fullURL").value;
  var date = new Date();
  date = date.toDateString();
  count = 0;
  fetch(url + "/url/" + id, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ date, fullurl, short, count }),
  }).then((res) => {
    //   console.log('sdv',res)
    document.getElementById("fullURL").value = url + "/" + short;
    document.getElementById("date").innerHTML = date;
    document.getElementById("url").innerHTML = fullurl;
    document.getElementById(
      "short"
    ).innerHTML = `<a href="${url}/${short}" target="blank">${url}/${short}</a>`;
    document.getElementById("card").style.display = "block";
    data();
  });
}

function data() {
  fetch(url + "/user/" + id, {
    method: "GET",
    headers: {
      authorization: localStorage.getItem("token"),
    },
  })
    .then((resp) => {
      if (resp.status == 401) {
        document.getElementById("layer").style.display = "block";
      } else {
        return resp.json();
      }
    })
    .then((res) => {
      console.log(res);
      document.getElementById("name").innerHTML = res.name;

      var tbody = document.getElementById("tbody");
      tbody.innerHTML = "";
      res.url.forEach((ele, i) => {
        CreateRow(i + 1, ele.fullurl, ele.short, ele.count, "tbody");
      });
    });
}
function CreateRow(no, fullurl, short, count, id) {
  var tr = document.createElement("tr");
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  var td4 = document.createElement("td");
  td1.innerHTML = no;
  td2.innerHTML = `<a href="${fullurl}" target="blank">${fullurl}</a>`;
  td3.innerHTML = `<a href="${url + "/" + short}" target="blank">${short}</a>`;
  td4.innerHTML = count;
  tr.append(td1, td2, td3, td4);
  document.getElementById(id).append(tr);

}
data();
function showTable() {
  
  document.getElementById("table").classList.toggle("showTable");
  var btn = document.getElementById("showUrl").innerHTML;
  if (btn == "Show URL's") {
    document.getElementById("showUrl").innerHTML = "Hide URL's";
  } else {
    document.getElementById("showUrl").innerHTML = "Show URL's";
  }
}

function logout() {
  localStorage.setItem("token", "");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1000);
}