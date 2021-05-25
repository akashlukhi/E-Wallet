import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from "./../dataservice.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = []
  bank = []
  acc: String
  name: string
  form: FormGroup
  profilepic: File
  constructor(private service: DataserviceService, private router: Router, private toastr: ToastrService) { }
  acc_no = sessionStorage.getItem('acc_no')

  handleFileInput(files: FileList) {
    this.profilepic = files.item(0);
  }


  ngOnInit(): void {
    if (this.acc_no == null) {
      alert("Please Login Your Account")
      this.router.navigateByUrl('/login')
    }
    this.acc = sessionStorage.getItem('acc_no')
    this.service.getuserwithacc(Number(this.acc)).subscribe(res => {
      this.user = res;
    })

    this.service.getuserwithbank(Number(this.acc_no)).subscribe(res => {
      this.bank = res;
    })
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      file: new FormControl('', Validators.required)
    });
  }
  onsubmit(): void {
    this.name = this.form.get('name').value
    if (this.name != "") {
      for (let user of this.user) {
        user = {
          "Username": this.name,
          "Email": user.Email,
          "Password": user.Password,
          "Phone_no": user.Phone_no,
          "Bank_name": user.Bank_name,
          "Branch_name": user.Branch_name,
          "Ifsc_code": user.Ifsc_code,
          "Acc_no": user.Acc_no,
          "Birthday": user.Birthday,
          "Wallet_balance": user.Wallet_balance
        }
        this.service.putuser(user).subscribe(Response => { })
        if (!this.profilepic) {
          this.toastr.info('Changes Saved.')
          this.router.navigateByUrl('/home')
        }
      }
    }
    if (this.profilepic) {
      for (let user of this.user) {
        if(this.name==""){
          this.name=user.Username
        }
        user = {
          "Username": this.name,
          "Email": user.Email,
          "Password": user.Password,
          "Phone_no": user.Phone_no,
          "Bank_name": user.Bank_name,
          "Branch_name": user.Branch_name,
          "Ifsc_code": user.Ifsc_code,
          "Acc_no": user.Acc_no,
          "Birthday": user.Birthday,
          "Wallet_balance": user.Wallet_balance
        }
        this.service.Updateprofilepic(user,this.profilepic).subscribe(res => {})
        this.toastr.info('Changes Saved.')
        this.router.navigateByUrl('/home')
      }
    }
  }
}
