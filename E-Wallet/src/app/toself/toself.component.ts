import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from "./../dataservice.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { transaction } from '../transaction';
import { history } from '../history';

@Component({
  selector: 'app-toself',
  templateUrl: './toself.component.html',
  styleUrls: ['./toself.component.css']
})
export class ToselfComponent implements OnInit {
  amount: Number
  message: string
  password: string
  temp: Number
  user = []
  bank = []
  acc: Number
  form: FormGroup
  trans: transaction
  his = []
  constructor(private route: Router, private service: DataserviceService, private toastr: ToastrService) { }
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
      amount: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  onsubmit(): void {
    this.amount = this.form.get('amount').value
    this.message = this.form.get('message').value
    this.password = this.form.get('password').value

    for (let user of this.user) {
      if (this.password != user.Password) {
        this.toastr.error('Wrong Password.')
        this.route.navigateByUrl('/self-transfer')
        return
      }
      else {
        for (let bank of this.bank) {
          if (this.amount > bank.Bank_balance) {
            this.toastr.error('Not-sufficient balance.')
            this.route.navigateByUrl('/self-transfer')
            return
          }
          this.temp = bank.Bank_balance - Number(this.amount)
          this.amount = this.amount + user.Wallet_balance
          if (this.amount > 100000) {
            this.toastr.warning("You Can't add more then 100000 in Wallet", "Limit Reached!!")
            this.route.navigateByUrl('/self-transfer')
            return
          }

          bank = {
            Bank_name: bank.Bank_name,
            Branch_name: bank.Branch_name,
            Ifsc_code: bank.Ifsc_code,
            Acc_no: bank.Acc_no,
            Bank_balance: this.temp
          }
          this.service.putbank(bank).subscribe(Response => { })
        }

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
        var newhis:history = {
          "Name": "Self",
          "Description": "Self Transfer",
          "Credited": 0,
          "Debited": this.form.get('amount').value,
          "From_To": "Bank Acccount",
        }
        var newhis1:history = {
          "Name": "Self",
          "Description": "Self Transfer",
          "Credited": this.form.get('amount').value,
          "Debited": 0,
          "From_To": "Wallet",
        }
        let ac = Number(this.acc_no)
        this.his = this.trans.History
        this.his.push(newhis)
        this.his.push(newhis1)
        this.trans = {
          "Acc_no": ac,
          "History": this.his
        }
        this.service.updatehistory(this.trans).subscribe(Response => { })
        this.toastr.success('Money has been deposited in Wallet Account.')
        this.route.navigateByUrl('/home')
      }
    }
  }
}
