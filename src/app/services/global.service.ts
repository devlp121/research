import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  public user = new BehaviorSubject(null);
  public admin = new BehaviorSubject(null);
  public cart = new BehaviorSubject({});
  public order = new BehaviorSubject({});
  public searchTerm = new BehaviorSubject('');
  public site : string = "Research Locus";
  public phone : string;

  public slugify(text: string) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

  public hashCode(input: string) {
    let hash = 0, i, chr;
    if (input.length === 0) return hash;
    for (i = 0; i < input.length; i++) {
      chr   = input.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };
}
