import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from "./../dataservice.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { transaction } from '../transaction';
import { history } from '../history';
@Component({
  selector: 'app-toreq',
  templateUrl: './toreq.component.html',
  styleUrls: ['./toreq.component.css']
})
export class ToreqComponent implements OnInit {
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
  name:String
  cont:String
  constructor(private route: Router, private service: DataserviceService,private toastr: ToastrService) { }
  acc_no = sessionStorage.getItem('acc_no')
  ngOnInit(): void {
    if (this.acc_no == null) {
      alert("Please Login Your Account")
      this.route.navigateByUrl('/login')
    }

    this.service.getuserwithacc(Number(this.acc_no)).subscribe(res => {
      this.user = res;
      this.name=res[0].Username
      this.cont=res[0].Phone_no
    })
    this.form = new FormGroup({
      contact: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onsubmit() {
    this.contact = this.form.get('contact').value
    this.amount = this.form.get('amount').value
    this.message = this.form.get('message').value
    this.password = this.form.get('password').value
    this.service.getuserwithcontact(Number(this.contact)).subscribe(res => {
     
      if (res.length > 0) {
        this.service.gethistorywithacc(Number(res[0].Acc_no)).subscribe(res => {
          this.trans = res[0]
          var newhis: history = {
            "Name": this.name,
            "Description": this.cont+" has requested " + (this.amount)+" "+ this.message,
            "Credited": 0,
            "Debited": 0,
            "From_To": "Wallet",
          }

          this.his = this.trans.History
          this.his.push(newhis)
          this.trans = {
            "Acc_no": res[0].Acc_no,
            "History": this.his
          }
          this.service.updatehistory(this.trans).subscribe(Response => { })
          this.toastr.info('Request Sent Successfully')
          this.route.navigateByUrl('/home')
        })
      }
      else{
        this.toastr.error('This Contact Number does not have an Account.')
        this.route.navigateByUrl('/request-money')
        return
      }
    
  })

  }
}
