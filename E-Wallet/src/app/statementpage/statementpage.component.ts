import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from "./../dataservice.service";
import { transaction } from '../transaction';
import { history } from '../history';
import { UserDetails } from '../signup/UserDetails';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-statementpage',
  templateUrl: './statementpage.component.html',
  styleUrls: ['./statementpage.component.css']
})
export class StatementpageComponent implements OnInit {
  history = []
  user: UserDetails
  temphis: history
  trans: transaction
  trans1: transaction
  his = []
  to = []
  history1 = []
  temp: number
  amount: number
  temp_name: String
  cont: String
  constructor(private route: Router, private service: DataserviceService, private toastr: ToastrService) { }
  acc_no = sessionStorage.getItem('acc_no')
  ngOnInit(): void {
    if (this.acc_no == null) {
      alert("Please Login Your Account")
      this.route.navigateByUrl('/login')
    }

    this.service.getuserwithacc(Number(this.acc_no)).subscribe(res => {
      this.user = res[0];
      this.temp_name = res[0].Username
      this.cont = res[0].Phone_no
    })

    this.service.gethistorywithacc(Number(this.acc_no)).subscribe(res => {
      this.history = res[0].History.reverse()
    })
  }

  pay(transaction: history) {
    this.temphis = {
      "Name": transaction.Name,
      "Description": transaction.Description,
      "Credited": transaction.Credited,
      "Debited": transaction.Debited,
      "From_To": transaction.From_To
    }
    let des = transaction.Description.split(" ", 4)
    let acc = Number(des[0])
    this.amount = Number(des[3])

    if (this.amount > this.user.Wallet_balance) {
      this.toastr.error('Not-sufficient balance.')
      this.route.navigateByUrl('/self-transfer')
      return
    }
    //remove

    //logdin
    this.temp = this.user.Wallet_balance - Number(this.amount)
    this.user = {
      "Username": this.user.Username,
      "Email": this.user.Email,
      "Password": this.user.Password,
      "Phone_no": this.user.Phone_no,
      "Bank_name": this.user.Bank_name,
      "Branch_name": this.user.Branch_name,
      "Ifsc_code": this.user.Ifsc_code,
      "Acc_no": this.user.Acc_no,
      "Birthday": this.user.Birthday,
      "Wallet_balance": this.temp,
      "Image_url":this.user.Image_url
    }
    this.service.putuser(this.user).subscribe(Response => { })
    let statement = []
    this.service.gethistorywithacc(Number(this.acc_no)).subscribe(res => {
      for (let h of res[0].History) {

        if ((h.Name == transaction.Name) && (h.Description == transaction.Description) && (h.Credited == transaction.Credited) && (h.Debited == transaction.Debited) && (h.From_To == transaction.From_To)) {
          continue
        }
        else {
          var newhis: history = {
            "Name": h.Name,
            "Description": h.Description,
            "Credited": h.Credited,
            "Debited": h.Debited,
            "From_To": h.From_To,
          }
          statement.push(newhis)
        }
      }
      var newhis: history = {
        "Name": transaction.Name,
        "Description": "Requested Money Paid to: " + acc,
        "Credited": 0,
        "Debited": this.amount,
        "From_To": "Wallet",
      }
      let ac = Number(res[0].Acc_no)
      statement.push(newhis)
      this.trans = {
        "Acc_no": ac,
        "History": statement
      }
      this.service.updatehistory(this.trans).subscribe(Response => { })
    })

    //other
    this.service.getuserwithcontact(Number(acc)).subscribe(res => {
      this.to = res

      for (let user of this.to) {
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
          "Wallet_balance": this.amount + user.Wallet_balance
        }
        this.service.putuser(user).subscribe(Response => { })

        this.service.gethistorywithacc(Number(this.to[0].Acc_no)).subscribe(res => {
          this.trans = res[0]

          var newhis: history = {
            "Name": this.temp_name,
            "Description": "Requested Money Recieved from: " + (this.cont),
            "Credited": this.amount,
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
        })
      }
    })
    this.toastr.success("Fund Transfer Successfully.")
    this.route.navigateByUrl('/home')
  }


  delete(transaction: history) {
    let statement = []
    this.service.gethistorywithacc(Number(this.acc_no)).subscribe(res => {
      
      for (let h of res[0].History) {

        if ((h.Name == transaction.Name) && (h.Description == transaction.Description) && (h.Credited == transaction.Credited) && (h.Debited == transaction.Debited) && (h.From_To == transaction.From_To)) {
          continue
        }
        else {
          var newhis: history = {
            "Name": h.Name,
            "Description": h.Description,
            "Credited": h.Credited,
            "Debited": h.Debited,
            "From_To": h.From_To,
          }
          statement.push(newhis)
        }
      }
      let t: transaction
      t = {
        "Acc_no": Number(this.acc_no),
        "History": statement
      }
      this.service.updatehistory(t).subscribe(Response => { })
    })
    this.route.navigateByUrl('/home')
    //window.location.reload()
  }

}
