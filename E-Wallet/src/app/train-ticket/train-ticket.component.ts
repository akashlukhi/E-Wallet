import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from "./../dataservice.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { history } from '../history';
import { transaction } from '../transaction';
@Component({
  selector: 'app-train-ticket',
  templateUrl: './train-ticket.component.html',
  styleUrls: ['./train-ticket.component.css']
})
export class TrainTicketComponent implements OnInit {
  source: string
  destination: string
  date: String
  time: String
  count: number
  amount: Number
  password: string
  from: string
  temp: Number
  user = []
  bank = []
  acc: Number
  form: FormGroup
  total:Number
  trans: transaction
  his = []
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
      source: new FormControl('', Validators.required),
      destination: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      count: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      from: new FormControl('', Validators.required),
      total:new FormControl('', Validators.required)
    });
  }
  calculate() {
    let temp = this.form.get('count').value
    this.total= temp* 500   
  }

  onsubmit() {
    this.source = this.form.get('source').value
    this.destination = this.form.get('destination').value
    this.date = this.form.get('date').value
    this.count = this.form.get('count').value
    this.password = this.form.get('password').value
    this.from = this.form.get('from').value
    //Deduct money
    for (let user of this.user) {
      if (this.password != user.Password) {
        this.toastr.error("Wrong Password.")
        this.route.navigateByUrl('/train-ticket')
        return
      }
      else {
        if (this.from == "bank") {
          for (let bank of this.bank) {
            if (this.amount > bank.Bank_balance) {
              this.toastr.error("Not-sufficient balance.")
              this.route.navigateByUrl('/train-ticket')
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
              "Name": "Train",
              "Description": "Train Ticket Successfully Booked For "+this.source+" To "+this.destination+" for "+this.count+" Person on "+this.date,
              "Credited": 0,
              "Debited": this.total,
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
            this.toastr.success("Train-Ticket Successfully Booked.")
          }
        }
        else {
          if (this.amount > user.Wallet_balance) {
            this.toastr.error("Not-sufficient balance.")
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
            "Name": "Train",
            "Description": "Train Ticket Successfully Booked For "+this.source+" To "+this.destination+" for "+this.count+" Person on "+this.date,
            "Credited": 0,
            "Debited": this.total,
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
          this.toastr.success("Train-Ticket Successfully Booked.")
        }
      }
    }
    this.route.navigateByUrl('/home')
  }
}
