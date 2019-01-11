import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpRequest } from "@angular/common/http";
import { tap } from 'rxjs/operators';
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
  public auth: any;
  public Config: any;
  public OAuth: Observable<any>;
  public headers: any;

  public consumer_key = "dtroPUFZaYP6hDJO6N0KjdRqrWj4bVOo";
  public consumer_secret = "12DJQ25KqNN9C5KF";
  public url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";


  constructor(
    public http: HttpClient,
  ) {

  }
  getConfig() {


    this.auth = "Basic " + new Buffer(this.consumer_key + ":" + this.consumer_secret).toString("base64");
    this.Config = {
      url: this.url,
      headers: {
        "Authorization": this.auth
      }
    }

    return this.http.get(this.Config);
  }
}
