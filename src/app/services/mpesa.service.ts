import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpRequest, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { tap, retry, catchError } from 'rxjs/operators';
import { Buffer } from 'buffer'
import { Observable, throwError } from "rxjs";
import { DatePipe } from '@angular/common';
import { toBase64String } from '@angular/compiler/src/output/source_map';

export interface authToken {
  access_token: string,
  expires_in: string
}


@Injectable({
  providedIn: 'root'
})
export class MpesaService {
  public auth: string;
  public httpOptions: any;
  public OAuth: Observable<any>;
  public headers: any;
  public host: any;
  public auth_token: any;


  public consumer_key = "dtroPUFZaYP6hDJO6N0KjdRqrWj4bVOo";
  public consumer_secret = "12DJQ25KqNN9C5KF";
  public url: string = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  result: authToken;
  public oAuthToken: any;
  public oAuthExp: any;
  public lipaAuth: string;
  public BusinessShortcode: string = "174379";
  public timeStamp: Date;
  public time: any;
  public passWord: string;
  public passKey: string = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
  public lipaUrl: string = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
  public json: any;


  constructor(
    public http: HttpClient,
    public datePipe: DatePipe

  ) {

  }

  getConfig() {
    this.auth = "Basic " + new Buffer(this.consumer_key + ":" + this.consumer_secret).toString("base64");
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": this.auth,
        "Content-Type": "application/json"
      })
    };
    return this.http.get<authToken>("auth",
      httpOptions
    ).subscribe(
      body => {
        this.result = body;
        this.oAuthToken = this.result.access_token;
        this.oAuthExp = this.result.expires_in;
        console.log(this.oAuthExp, this.oAuthToken)
      }
    );
  }

  lipaFunction(ammount) {
    this.lipaAuth = "Bearer " + this.oAuthToken;

    this.timeStamp = new Date()

    this.time = this.datePipe.transform(this.timeStamp, 'yyyyMMddhhmmss')
    this.passWord = btoa(this.BusinessShortcode + this.passKey + this.time)
    console.log(this.passWord)

    this.json = {
      "BusinessShortCode": this.BusinessShortcode,
      "Password": this.passWord,
      "Timestamp": this.time,
      "TransactionType": "CustomerPayBillOnline",
      "Amount": ammount,
      "PartyA": "254701737488",
      "PartyB": this.BusinessShortcode,
      "PhoneNumber": "254701737488",
      "CallBackURL": "https://console.firebase.google.com/project/research-locus/database/research-locus/data/users/2uSXI3Nv8fgaSeiVVmc9wrSqoQJ2",
      "AccountReference": "test",
      "TransactionDesc": "Pay to Researh Locus and begin your transaction"
    }
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.lipaAuth,
        'Content-Type': 'application/json',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        'Accept': 'text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8',
        'Access-Control-Allow-Headers': 'X-Custom-Header, Upgrade-Insecure-Requests,origin, x-requested-with',
        'Access-Control-Allow-Origin': "*"

      })
    };
    return this.http.post("lipa", this.json, this.httpOptions);

  }

}
