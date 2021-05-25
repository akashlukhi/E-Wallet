function validate() {


  var phn = document.getElementById("phone").value;
  var patt = /^\d{10}$/;
  var chkphn = patt.test(phn);

  if (chkphn == true) {
    window.location.href = "index.html";
  }
  else { }
}

function phonevalidate() {
  var phn = document.getElementById("phone").value;
  var patt = /^\d{10}$/;
  var chkphn = patt.test(phn);
  if (chkphn == false) {
    document.getElementById("phone-p").style.removeProperty("display");
  }
  else {
    document.getElementById("phone-p").style.setProperty("display", "none");
  }
}
