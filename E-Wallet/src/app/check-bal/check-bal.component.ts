import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from "./../dataservice.service";
@Component({
  selector: 'app-check-bal',
  templateUrl: './check-bal.component.html',
  styleUrls: ['./check-bal.component.css']
})
export class CheckBalComponent implements OnInit {
  user=[]
  ten: Boolean
  twenty: Boolean
  thirty: Boolean
  fourty: Boolean
  fifty: Boolean
  sixty: Boolean
  seventy: Boolean
  eighty: Boolean
  ninety: Boolean
  hundread: Boolean
  constructor(private route:Router, private service: DataserviceService) { }
  acc_no = sessionStorage.getItem('acc_no')
  ngOnInit(): void {
    if(this.acc_no==null){
      alert("Please Login Your Account")
      this.route.navigateByUrl('/login')
    }
    this.service.getuserwithacc(Number(this.acc_no)).subscribe(res => {
      this.user = res;
      for(let user of res){
        if(user.Wallet_balance<=10000){
          this.ten = true
          this.twenty = false
          this.thirty = false
          this.fourty = false
          this.fifty = false
          this.sixty = false
          this.seventy = false
          this.eighty = false
          this.ninety = false
          this.hundread = false
        }
        else if(user.Wallet_balance<=20000){
          this.ten = false
          this.twenty = false
          this.thirty = false
          this.fourty = false
          this.fifty = false
          this.sixty = false
          this.seventy = false
          this.eighty = false
          this.ninety = false
          this.hundread = false
        }
        else if(user.Wallet_balance<=30000){
          this.ten = false
          this.twenty = false
          this.thirty = true
          this.fourty = false
          this.fifty = false
          this.sixty = false
          this.seventy = false
          this.eighty = false
          this.ninety = false
          this.hundread = false
        }
        else if(user.Wallet_balance<=40000){
          this.ten = false
          this.twenty = false
          this.thirty = false
          this.fourty = true
          this.fifty = false
          this.sixty = false
          this.seventy = false
          this.eighty = false
          this.ninety = false
          this.hundread = false
        }
        else if(user.Wallet_balance<=50000){
          this.ten = false
          this.twenty = false
          this.thirty = false
          this.fourty = false
          this.fifty = true
          this.sixty = false
          this.seventy = false
          this.eighty = false
          this.ninety = false
          this.hundread = false
        }
        else if(user.Wallet_balance<=60000){
          this.ten = false
          this.twenty = false
          this.thirty = false
          this.fourty = false
          this.fifty = false
          this.sixty = true
          this.seventy = false
          this.eighty = false
          this.ninety = false
          this.hundread = false
        }
        else if(user.Wallet_balance<=70000){
          this.ten = false
          this.twenty = false
          this.thirty = false
          this.fourty = false
          this.fifty = false
          this.sixty = false
          this.seventy = true
          this.eighty = false
          this.ninety = false
          this.hundread = false
        }
        else if(user.Wallet_balance<=80000){
          this.ten = false
          this.twenty = false
          this.thirty = false
          this.fourty = false
          this.fifty = false
          this.sixty = false
          this.seventy = false
          this.eighty = true
          this.ninety = false
          this.hundread = false
        }
        else if(user.Wallet_balance<=90000){
          this.ten = false
          this.twenty = false
          this.thirty = false
          this.fourty = false
          this.fifty = false
          this.sixty = false
          this.seventy = false
          this.eighty = false
          this.ninety = true
          this.hundread = false
        }
        else{
          this.ten = false
          this.twenty = false
          this.thirty = false
          this.fourty = false
          this.fifty = false
          this.sixty = false
          this.seventy = false
          this.eighty = false
          this.ninety = false
          this.hundread = true
        }
      }
    })

    }
  }


