var formx = document.getElementById("myform");

function validate() {
  
    if (phonevalidate() && accountvalidate() &&  passwordvalidate() && repasswordvalidate()) {
        console.log(chkphn);
        console.log(chkacc);
        console.log("pass:"+pass);
        console.log("repass"+ repass);
        console.log(String(pass).length);
        return true;
    }
    else { 
       console.log("Incorrect Credentials");
       return false;
    }
}

function phonevalidate() {
    
    var phn = document.getElementById("phone").value;
    var patt = /^\d{10}$/;
    var chkphn = patt.test(phn);
    if (chkphn == false) {
        document.getElementById("phone-p").style.removeProperty("display");
        return false;
   }
   else{
       document.getElementById("phone-p").style.setProperty("display","none");
       return true;
   }
}


function passwordvalidate() {
    
    var pass = document.getElementById("password").value;
    if (String(pass).length < 8) {
         document.getElementById("pass-p").style.removeProperty("display");
         return false;
    }
    else{
        document.getElementById("pass-p").style.setProperty("display","none");
        return true;
    }

}


function repasswordvalidate() {
   
    var repass = document.getElementById("re-password").value;
    var pass = document.getElementById("password").value;

    if (pass != repass) {
        document.getElementById("repass-p").style.removeProperty("display");
        return false;
   }
   else{
       document.getElementById("repass-p").style.setProperty("display","none");
       return true;
    }
}


function accountvalidate() {
   
    var acc = document.getElementById("account").value;
    var patt = /^\d{14}$/;
    var chkacc = patt.test(acc);
    if (chkacc == false) {
        document.getElementById("account-p").style.removeProperty("display");
        return false;
   }
   else{
       document.getElementById("account-p").style.setProperty("display","none");
       return true;
   }
}
