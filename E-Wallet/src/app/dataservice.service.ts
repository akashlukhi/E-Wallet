import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDetails } from "./signup/UserDetails";
import { transaction } from "./transaction";
export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {


  constructor(private http: HttpClient) { }

  getuserdata(): Observable<any> {
    return this.http.get('http://localhost:3000/users');
  }

  getbankdata(): Observable<any> {
    return this.http.get('http://localhost:3000/banks');
  }

  postuserdata(user: UserDetails): Observable<any> {
    return this.http.post('http://localhost:3000/myform/', JSON.stringify(user), httpOptions);
  }
  
  Updateprofilepic(data:UserDetails, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('Username', data.Username);
    formData.append('Email', data.Email);
    formData.append('Phone_no', data.Phone_no);
    formData.append('Password', data.Password);
    formData.append('Bank_name', data.Bank_name);
    formData.append('Branch_name', data.Branch_name);
    formData.append('Ifsc_code', data.Ifsc_code);
    formData.append('Acc_no', String(data.Acc_no));
    formData.append('Birthday', data.Birthday);
    formData.append('Wallet_balance', String(data.Wallet_balance));
    formData.append('Image_url', data.Image_url);
    const header = new HttpHeaders();
    const params = new HttpParams();

    const options = {
    params,
    reportProgress: true,
    headers: header
    };
    const req = new HttpRequest('PUT', 'http://localhost:3000/updateprofile', formData, options);
    return this.http.request(req);
  }



  getuserwithacc(acc: number): Observable<UserDetails[]> {
    return this.http.get<any>('http://localhost:3000/users/' + acc, { observe: 'body' })
  }

  getuserwithbank(acc: number): Observable<UserDetails[]> {
    return this.http.get<any>('http://localhost:3000/banks/' + acc, { observe: 'body' })
  }

  getuserwithcontact(contact: number): Observable<UserDetails[]> {
    return this.http.get<any>('http://localhost:3000/usersviaphone/' + contact, { observe: 'body' })
  }

  putuser(user: UserDetails): Observable<any> {
    return this.http.put<UserDetails>('http://localhost:3000/updateuser/', JSON.stringify(user), httpOptions)
  }

  putbank(bank): Observable<any> {
    return this.http.put<UserDetails>('http://localhost:3000/updatebank/', JSON.stringify(bank), httpOptions)
  }

  createhistory(trans: transaction): Observable<any> {
    return this.http.post('http://localhost:3000/history/', JSON.stringify(trans), httpOptions);
  }

  gethistorywithacc(acc: number): Observable<transaction[]> {
    return this.http.get<any>('http://localhost:3000/history/' + acc, { observe: 'body' })
  }

  updatehistory(trans: transaction): Observable<any> {
    return this.http.put('http://localhost:3000/updatehistory/', JSON.stringify(trans), httpOptions);
  }

  issue(name: string, sub: string, msg: string, eml: string): Observable<any> {
    return this.http.get<any>('http://localhost:3000/issue/' + name + '/' + sub + '/' + msg + '/' + eml, { observe: 'body' })
  }


}
