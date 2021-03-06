import { Component } from '@angular/core';
import { QuotesService } from './quotes.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
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
