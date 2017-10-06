import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})

export class QuoteComponent {
  @Input() quote: {quote: string, author: string, cat: string};

  @Input() showButton: boolean;

  @Output() onQuoteChange = new EventEmitter<any>();
  readAnother(event) {
    this.onQuoteChange.emit();
  }
} 
