Angular Workshop Part 2
=======================

Move the quotes variable assignment to the start of the ngOnInit method
------------------------------------------------------------------------------

We're gonna start by moving the quote variable assignment in the App component controller to the ngOnInit method, to have all content initialized there. It's not much of a change now, but we'll use it further on.

```
import { Component, OnInit } from '@angular/core';
... 
export class AppComponent implements OnInit { 
  public quote: {quote: string, author: string, cat: string};

  public ngOnInit() {
    this.quote = {
      quote: 'Respect is one of the greatest expressions of love.',
      author: 'Miguel Angel Ruiz',
      cat: 'respect'
    };
  }
}
```

Now our content is initalized using the OnInit hook.


Create a quotes service
-----------------------

Let's create a service! We'll use it to fetch quotes from a public API. It's gonna be conveniently named QuotesService.

```
ng generate service quotes
```

Easy!

Change the quote by fetching a new one from the API using our new service
--------------------------------------------------------------------------

First, declare our new service as a dependency in the app module. Also we'll need to import HttpModule and declare it in our modules' imports.

```
import { HttpModule } from '@angular/http';
import { QuotesService } from './quotes.service';
...
@NgModule({
  ...
  imports: [HttpModule],
  providers: [QuotesService]
  ...
})
export class AppModule { ... }
```

Then we’ll set up Http on our service by adding it as a parameter on the service's constructor, and create a public method on our service that fetches a random quote from the public API.

Angualr provides the `http.get()` method, which returns an `Observable`. You can think of it as *an array which values arrive over time*. Basically it's a stream which you can listen on, to use the values that it emits, and manipulate those values using a lot of different methods provided by the `rxjs` library.

In this case, calling `http.get()` with the URL of the public quotes API will create an `Observable` which will emit a Response object which contains our quote. However, in order to use the JSON quote object with the same structure as ours, we need to take it from the raw response object. We do that by appending the `map()` method to our Observable, which basically allows us to execute some processing logic to transform each object that the Observable emits, and return that (instead of the original object) as a response. In our case, we'll just return the original response object but with the `.json()` method attached, so it will allow us to get the quote in JSON format.

Try it!

```
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class QuotesService {

  // Inject Http dependency and name it 'http'
  constructor(private http: Http) { }
 
  getQuote() {
    // Get the response from the server and convert each value to it's json form
    return this.http.get('https://talaikis.com/api/quotes/random')
      .map((quoteResponse: Response) => {
        return quoteResponse.json();
      });
  }
}
```

Finally, we use our service in our App component by injecting it and calling its getQuote() method. Since it's an observable, we'll need to subscribe to it (listen to the values it emits) throught the `subscribe()` method. We pass a callback function to it that recieves the new values every time they come, and allow us to manipulate those values: in this case, we'll just assign that value to our `this.quote` variable so it updates it.

We'll also call this method on the ngOnInit so we'll get a quote from the API right from the start, instead of hardcoding the first quote we are shown.

```
import { QuotesService } from './quotes.service';
...
public constructor(private quotesService: QuotesService) {}

public ngOnInit() {
  this.changeQuote();
}
 
public changeQuote() {
  // Get the getQuote Observable and subscribe to it
  this.quotesService.getQuote()
    .subscribe((quote: any) => {
      // Every quote that arrives here is in JSON format (because of the map in the service) 
      this.quote = quote;
    });
}
```

All set! Test it!

In our Quote component, let’s uppercase the quote author using the built-in uppercase pipe
------------------------------------------------------------------------------------------

Just add ` | pipeline` to the interpolation where we show the quote's author in the quote template. 

```
<h1>
  {{quote.quote}}
</h1>
<h3>
  {{quote.author | uppercase}}
</h3>
<button (click)="readAnother()" *ngIf="showButton">Read Another</button>
```

Create the About component and the Home component
-------------------------------------------------

Ok, we'll have routing! But first, we need to create 2 components to route to: a new `about` component and a `home` component that will contain what's currently in our AppComponent. First, let's create them both! Run:

```
ng g component about
ng g component home 
```

Our About component is just to test that routing works, so you can just open the about page template and write a nice message. That'll be it.

In the Home component controller we'll take all the quote related logic that's currently in the App component. The idea is that the App component will just work as an entry point for our router. So, after copying and pasting, the Home component should look something like this:

```
import { Component, OnInit } from '@angular/core';
import {QuotesService} from './quotes.service';

export class HomeComponent implements OnInit {
	public quote: {quote: string, author: string, cat: string};
	public constructor(private quotesService: QuotesService) {}
	
	public ngOnInit() {
	   this.changeQuote();
	 }
	 
	public changeQuote() {
	   this.quotesService.getQuote()
	   .subscribe((quote: any) => {
	     this.quote = quote;
	   });
	 }
}
```

And its template:

```
<app-quote [quote]="quote" (onQuoteChange)="changeQuote()" [showButton]="true">
  </app-quote>
```

And the App component, both its template and its component, should be empty except for component definition and instantiation.

Add routing to our app and test it by setting the desired route in the address bar
---------------------------------------------------------------------------------
Let’s set up our router by importing its dependencies and creating a routes map in the app module. We'll add imports for everything we need and create an array of Routes that defines our route map.

```
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
...
const appRoutes: Routes = [
 { path: '', component: HomeComponent },
 { path: 'about', component: AboutComponent },
];
```

We also have to tell our app to use the routing we configured by importing the `RouterModule` with the `forRoot(config)` method. This is a method that allows to define a certain configuration for an imported module, specified in the `config` parameter. In this case, we'll use it to pass our route map to the Router module. Add this in the `imports` array of the app module:

```
imports: [
   BrowserModule,
   HttpModule,
   RouterModule.forRoot(
     appRoutes
   )
]
```

Finally, we need to tell our markup somewhere about this routing stuff! We'll have to add the `<router-outlet>` component in our App template. This will instantiate the component that matched the active route (by default, as we have defined in our route map, it will be the `HomeComponent`).

Add a link to the app and test that it works
--------------------------------------------

Just add a link in our Home component using the `<a>` tag, like any common link. Only one small difference: We use the `routerLink` directive (not `href`) for internal routing in the app. Just add it under the quote component in the Home template:

```
<app-quote [quote]="quote" (onQuoteChange)="changeQuote()">
</app-quote>
<a routerLink="about"> About this app </a>
```

Done! Click it to see if it works. You can also go back and forth using the browser's arrows to see that works too.
