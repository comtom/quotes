import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QuoteComponent } from './quote/quote.component';
import { RouterModule, Routes } from '@angular/router';
import { QuotesService } from './quotes.service';
import { HttpModule } from '@angular/http';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';


const appRoutes: Routes = [
 { path: '', component: HomeComponent },
 { path: 'about', component: AboutComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    QuoteComponent,
    AboutComponent,
    HomeComponent
  ],
	imports: [
	   BrowserModule,
	   HttpModule,
	   RouterModule.forRoot(
	     appRoutes
	   )
	],
  providers: [
  	QuotesService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

