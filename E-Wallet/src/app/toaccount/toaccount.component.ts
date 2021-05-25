import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from "./../dataservice.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { transaction } from '../transaction';
import { history } from '../history';
@Component({
  selector: 'app-toaccount',
  templateUrl: './toaccount.component.html',
  styleUrls: ['./toaccount.component.css']
})
export class ToaccountComponent implements OnInit {
  account: number
  amount: Number
  message: string
  password: string
  from: string
  temp: Number
  user = []
  bank = []
  to = []
  acc: Number
  form: FormGroup
  trans: transaction
  his = []
  temp_name:string
  Your_name:string
  constructor(private route: Router, private service: DataserviceService,private toastr: ToastrService) { }
  acc_no = sessionStorage.getItem('acc_no')
  ngOnInit(): void {
    if (this.acc_no == null) {
      alert("Please Login Your Account")
      this.route.navigateByUrl('/login')
    }
    
    this.service.getuserwithacc(Number(this.acc_no)).subscribe(res => {
      this.user = res;
    })

    this.service.getuserwithbank(Number(this.acc_no)).subscribe(res => {
      this.bank = res;
    })

    this.service.gethistorywithacc(Number(this.acc_no)).subscribe(res => {
      this.trans = res[0]
    })
    

    this.form = new FormGroup({
      account: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      from: new FormControl('', Validators.required)
    });
  }

  onsubmit() {
    this.account = this.form.get('account').value
    this.amount = this.form.get('amount').value
    this.message = this.form.get('message').value
    this.password = this.form.get('password').value
    this.from = this.form.get('from').value

    this.service.getuserwithacc(Number(this.account)).subscribe(res => {
      this.Your_name=String(res[0].Username)
      console.log(this.Your_name)
    })

    this.service.getuserwithacc(Number(this.account)).subscribe(res => {
      if (res.length > 0) {
        //Deduct money
        for (let user of this.user) {
          this.temp_name=user.Username
          if (this.password != user.Password) {
            this.toastr.error('Wrong Password.')
            this.route.navigateByUrl('/toaccount')
            return
          }
          else {
            console.log(this.Your_name)
            if (this.from == "bank") {
              for (let bank of this.bank) {
                if (this.amount > bank.Bank_balance) {
                  this.toastr.error('Not-sufficient balance.')
                  this.route.navigateByUrl('/toaccount')
                  return
                }
                this.temp = bank.Bank_balance - Number(this.amount)
                bank = {
                  Bank_name: bank.Bank_name,
                  Branch_name: bank.Branch_name,
                  Ifsc_code: bank.Ifsc_code,
                  Acc_no: bank.Acc_no,
                  Bank_balance: this.temp
                }
                this.service.putbank(bank).subscribe(Response => { })
                var newhis: history = {
                  "Name": this.Your_name,
                  "Description": "Paid to: " + (this.account)+" "+this.message,
                  "Credited": 0,
                  "Debited": this.amount,
                  "From_To": "Bank Acccount",
                }
                let ac = Number(this.acc_no)
                this.his = this.trans.History
                this.his.push(newhis)
                this.trans = {
                  "Acc_no": ac,
                  "History": this.his
                }
                this.service.updatehistory(this.trans).subscribe(Response => { })
              }
            }
            else {
              if (this.amount > user.Wallet_balance) {
                this.toastr.error('Not-sufficient balance.')
                this.route.navigateByUrl('/self-transfer')
                return
              }
              this.temp = user.Wallet_balance - Number(this.amount)
              user = {
                "Username": user.Username,
                "Email": user.Email,
                "Password": user.password,
                "Phone_no": user.Phone_no,
                "Bank_name": user.Bank_name,
                "Branch_name": user.Branch_name,
                "Ifsc_code": user.Ifsc_code,
                "Acc_no": user.Acc_no,
                "Birthday": user.Birthday,
                "Wallet_balance": this.temp
              }
              this.service.putuser(user).subscribe(Response => { })
              var newhis: history = {
                "Name": this.Your_name,
                "Description": "Paid to: " + (this.account)+" "+this.message,
                "Credited": 0,
                "Debited": this.amount,
                "From_To": "Wallet",
              }
              let ac = Number(this.acc_no)
              this.his = this.trans.History
              this.his.push(newhis)
              this.trans = {
                "Acc_no": ac,
                "History": this.his
              }
              this.service.updatehistory(this.trans).subscribe(Response => { })
            }
            //transer to---
            this.service.getuserwithacc(Number(this.account)).subscribe(res => {
              this.to = res;
              for (let user of this.to) {
                this.amount = this.amount + user.Wallet_balance
                user = {
                  "Username": user.Username,
                  "Email": user.Email,
                  "Password": user.password,
                  "Phone_no": user.Phone_no,
                  "Bank_name": user.Bank_name,
                  "Branch_name": user.Branch_name,
                  "Ifsc_code": user.Ifsc_code,
                  "Acc_no": user.Acc_no,
                  "Birthday": user.Birthday,
                  "Wallet_balance": this.amount
                }
                this.service.putuser(user).subscribe(Response => { })
                var newhis: history = {
                  "Name": this.temp_name,
                  "Description": "Recieved From: " + (this.acc_no)+" "+this.message,
                  "Credited": this.form.get('amount').value,
                  "Debited": 0,
                  "From_To": "Wallet",
                }
                let ac = Number(user.Acc_no)
                this.his = this.trans.History
                this.his.push(newhis)
                this.trans = {
                  "Acc_no": ac,
                  "History": this.his
                }
                this.service.updatehistory(this.trans).subscribe(Response => { })
              }
            })
            this.toastr.success('Fund Transfer Successfull')
            this.route.navigateByUrl('/home')
          }
        }
      } else {
        this.toastr.error('This Account Number does not exist.')
        this.route.navigateByUrl('/toaccount')
        return
      }
    })

  }
}

