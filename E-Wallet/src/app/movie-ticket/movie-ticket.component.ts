import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from "./../dataservice.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { history } from '../history';
import { transaction } from '../transaction';
@Component({
  selector: 'app-movie-ticket',
  templateUrl: './movie-ticket.component.html',
  styleUrls: ['./movie-ticket.component.css']
})
export class MovieTicketComponent implements OnInit {
  city: string
  cinema: string
  show: String
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
  total: Number
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
      city: new FormControl('', Validators.required),
      cinema: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      count: new FormControl('', Validators.required),
      show: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      from: new FormControl('', Validators.required)
    });
  }
  calculate() {
    let temp = this.form.get('count').value
    this.total = temp * 500
  }

  onsubmit() {
    this.city = this.form.get('city').value
    this.cinema = this.form.get('cinema').value
    this.show = this.form.get('show').value
    this.date = this.form.get('date').value
    this.time = this.form.get('time').value
    this.count = this.form.get('count').value
    this.password = this.form.get('password').value
    this.from = this.form.get('from').value
    //Deduct money
    for (let user of this.user) {
      if (this.password != user.Password) {
        this.toastr.error("Wrong Password.")
        this.route.navigateByUrl('/movie-ticket')
        return
      }
      else {
        if (this.from == "bank") {
          for (let bank of this.bank) {
            if (this.amount > bank.Bank_balance) {
              this.toastr.error("Not-sufficient balance.")
              this.route.navigateByUrl('/movie-ticket')
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
              "Name": "Movie",
              "Description": "Movie Ticket Successfully Booked For " + this.show + " Show in " + this.cinema + " in " + this.city + " on " + this.time + " " + this.date,
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
            "Name": "Movie",
            "Description": "Movie Ticket Successfully Booked For " + this.show + " Show in " + this.cinema + " in " + this.city + " on " + this.time + " " + this.date,
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
