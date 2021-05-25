import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from "./../dataservice.service";
import { UserDetails } from "./UserDetails";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { transaction } from "./../transaction";
import { history } from "./../history";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit {
  constructor(private route:Router,private service: DataserviceService,private toastr: ToastrService) { }
  allusers = []
  bankusers = []
  myform: FormGroup
  flag: boolean=false;
  name:string 
  email:string
  password:string
  phone:string
  bank:string
  branch:string
  ifsc:string
  account:number 
  birthday:string
  user: UserDetails
  trans:transaction
  his:history
  profilepic:File
  
  ngOnInit(): void {
    this.service.getbankdata().subscribe(res => {
      this.bankusers = res;
      })

    this.myform = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      bank: new FormControl('', Validators.required),
      branch: new FormControl('', Validators.required),
      ifsc: new FormControl('', Validators.required),
      account: new FormControl('', Validators.required),
      birthday: new FormControl('', Validators.required),
   });
  }
  onsubmit():void{
    this.account = this.myform.get('account').value
    for (let acc of this.bankusers) {
      if (acc.Acc_no == this.account) {
        sessionStorage.setItem('acc_no', acc.Acc_no);
        this.flag=true;
        break;
      }
    }
    if(this.flag==true){
      this.user = {
        "Username": this.myform.get('name').value ,
        "Email": this.myform.get('email').value,
        "Password":  this.myform.get('password').value,
        "Phone_no": this.myform.get('phone').value,
        "Bank_name":  this.myform.get('bank').value,
        "Branch_name":  this.myform.get('branch').value,
        "Ifsc_code":  this.myform.get('ifsc').value,
        "Acc_no":  this.myform.get('account').value,
        "Birthday": this.myform.get('birthday').value,
        "Wallet_balance":0,
        "Image_url" : "assets/profiles/aboutme.jpg"
      }
     // this.service.registerUser(this.user,this.profilepic).subscribe(Response=>{})
      this.service.postuserdata(this.user).subscribe(Response=>{})
      this.trans = {
        "Acc_no": this.account,
        "History": [] 
      }
      this.service.createhistory(this.trans).subscribe(Response=>{})
      this.toastr.info("Mr. "+this.myform.get('name').value,"Welcome")
      this.route.navigateByUrl('/home')
    }
    else{
      alert("this Account does not exist.")
      this.route.navigateByUrl('/signup')
    }
    
  }
  
}
