import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwnFormsModule } from "./modules/forms/forms.module";
import { HttpClientModule, HttpContext, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BookTicketModule } from './modules/book-ticket/book-ticket.module';
import { AdminModule } from './modules/admin/admin/admin.module';
import { TokeninterceptorService } from './services/interceptor/tokeninterceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:TokeninterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
