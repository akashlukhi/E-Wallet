import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from "./../dataservice.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { transaction } from '../transaction';
import { history } from '../history';
@Component({
  selector: 'app-tocontact',
  templateUrl: './tocontact.component.html',
  styleUrls: ['./tocontact.component.css']
})
export class TocontactComponent implements OnInit {

  contact: number
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
  temp_phone:string
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
      contact: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      from: new FormControl('', Validators.required)
    });
  }

  onsubmit() {
    this.contact = this.form.get('contact').value
    this.amount = this.form.get('amount').value
    this.message = this.form.get('message').value
    this.password = this.form.get('password').value
    this.from = this.form.get('from').value

    this.service.getuserwithcontact(Number(this.contact)).subscribe(res => {
      this.Your_name=String(res[0].Username)
    })

    this.service.getuserwithcontact(Number(this.contact)).subscribe(res => {
      if (res.length > 0) {
        //Deduct money
        for (let user of this.user) {
    
          this.temp_name=user.Username
          this.temp_phone=user.Phone_no
          if (this.password != user.Password) {
            this.toastr.error('Wrong Password.')
            this.route.navigateByUrl('/tocontact')
            return
          }
          else {
            if (this.from == "bank") {
              for (let bank of this.bank) {
                if (this.amount > bank.Bank_balance) {
                  this.toastr.error('Not-sufficient balance.')
                  this.route.navigateByUrl('/tocontact')
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
                  "Description": "Paid to: " + (this.contact)+" "+this.message,
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
                "Description": "Paid to: " + (this.contact)+" "+this.message,
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
            this.service.getuserwithcontact(Number(this.contact)).subscribe(res => {
              this.to = res
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
                  "Description": "Recieved from: " + (this.temp_phone)+" "+this.message,
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
        this.toastr.error('This Contact Number does not have an Account.')
        this.route.navigateByUrl('/tocontact')
        return
      }
    })

  }
}
