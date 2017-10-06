import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class QuotesService {
  constructor(private http: Http) { }
 
  getQuote() {
    return this.http.get('https://talaikis.com/api/quotes/random')
      .map((quoteResponse: Response) => {
        return quoteResponse.json();
      });
  }
}
