import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataserviceService } from "./../dataservice.service";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  oldpa:string
  newpa:string
  newrepa:string
  users=[]
  changepa:FormGroup
  constructor(private route:Router,private service: DataserviceService,private toastr: ToastrService) { }
  acc_no = sessionStorage.getItem('acc_no')
  ngOnInit(): void {
    if(this.acc_no==null){
      alert("Please Login Your Account")
      this.route.navigateByUrl('/login')
    }

    this.service.getuserwithacc(Number(this.acc_no)).subscribe(res => {
      this.users = res;
      })

      this.changepa = new FormGroup({
        oldpa: new FormControl('', Validators.required),
        newpa:  new FormControl('', Validators.required),
        newrepa:  new FormControl('', Validators.required) 
     });
  }

  onsubmit():void{
    this.oldpa = this.changepa.get('oldpa').value
    this.newpa = this.changepa.get('newpa').value
    this.newrepa = this.changepa.get('newrepa').value
    if (this.newpa != this.newrepa){
      alert("New Password and Re-Enter Password must be same.")
      this.route.navigateByUrl('/change-password')
    }
    for(let user of this.users){
      if(this.oldpa == user.Password){
        user = {
          "Username":user.Username ,
          "Email": user.Email,
          "Password":  this.newpa,
          "Phone_no": user.Phone_no,
          "Bank_name":  user.Bank_name,
          "Branch_name":  user.Branch_name,
          "Ifsc_code":  user.Ifsc_code,
          "Acc_no":  user.Acc_no,
          "Birthday": user.Birthday,
          "Wallet_balance": user.Wallet_balance
        }
        this.service.putuser(user).subscribe(Response=>{})
        this.toastr.success('Password Successfully Changed.');
        this.route.navigateByUrl('/home')
      }
      else{
        this.toastr.error("Old Password is incorrect.")
        this.route.navigateByUrl('/change-password')
      }
    }
  }
} 


