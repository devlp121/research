import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpRequest, HttpHeaders } from "@angular/common/http";
import { Headers } from '@angular/http';
import { tap, retry, catchError } from 'rxjs/operators';
import { Buffer } from 'buffer'
import { Observable } from "rxjs";

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


  constructor(
    public http: HttpClient,
  ) {

  }
  getConfig() {
    this.auth = "Basic " + new Buffer(this.consumer_key + ":" + this.consumer_secret).toString("base64");
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.auth,
        'Access-Control-Allow-Origin': "http://localhost:4200",
        "Content-Type": "application/json"
      })
    };
    return this.http.get<authToken>(this.url,
      httpOptions
    );
  }
}
