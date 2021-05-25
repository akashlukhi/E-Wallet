import { Component, OnInit } from '@angular/core';
import { DataserviceService } from "./../dataservice.service";
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myform: FormGroup
  email: string = "";
  password: string = "";
  loginusers = [];
  flag: Boolean = false;

  constructor(private service: DataserviceService, private router: Router,private toastr: ToastrService) { }

  onsubmit() {
    this.email = this.myform.get('email').value;
    this.password = this.myform.get('password').value;
    
    for (let s of this.loginusers) {
      if (s.Email == this.email && s.Password == this.password) {
        sessionStorage.setItem('acc_no', s.Acc_no);
        this.flag=true;
        this.toastr.info("Mr. "+s.Username,"Welcome")
        this.router.navigateByUrl('/home');
        break;
      }
    }
    if(this.flag==false){
      alert("incorrect email id or password!!");
      this.router.navigateByUrl('/login');
    }

  }
  ngOnInit(): void {

      this.service.getuserdata().subscribe(res => {
      this.loginusers = res;
      })
      
      this.myform = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
      });

    (function () {
      'use strict';
      window.addEventListener('load', function () {
        // Get the forms we want to add validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
          form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }, false);
    })();

  }

}





