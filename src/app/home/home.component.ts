import { Component, OnInit } from '@angular/core';
import { QuotesService } from '../quotes.service';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  title = 'app';
  public window = window
  public quote: {quote: string, author: string, cat: string}

  public constructor(private quotesService: QuotesService) {}

  public ngOnInit() {
    //setInterval(this.changeQuote(), 1000);

    this.changeQuote();
  }
   
  public changeQuote() {
    console.log('refreshed quote...');
    this.quotesService.getQuote()
      .subscribe((quote: any) => {
        this.quote = quote;
      });
  }
}
