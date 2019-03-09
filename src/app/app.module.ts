import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { CustomerService } from './services/login.service';
import { customerReducer  } from './state/customer/customer.reducer';
import { CustomerEffects } from './state/customer/customer.effects';
import { AppRoutingModule } from './app.routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TokenInterceptor } from './services/token.interceptor';
import { LoginComponent } from './login/login.component';
import { PreviewComponent } from './preview/preview.component';
import { SafePipe } from './preview/safePipe';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,  SafePipe,
    PreviewComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule,
    StoreModule.forRoot({customer: customerReducer}),
    EffectsModule.forRoot([CustomerEffects]),
     AppRoutingModule,
     VgCoreModule,
       VgControlsModule,
     MDBBootstrapModule.forRoot(),
     BrowserAnimationsModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
    providers: [CustomerService, AuthService,  {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
