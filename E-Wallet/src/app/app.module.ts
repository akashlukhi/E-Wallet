import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BusTicketComponent } from './bus-ticket/bus-ticket.component';
import { CardBillComponent } from './card-bill/card-bill.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CheckBalComponent } from './check-bal/check-bal.component';
import { ElectricityBillComponent } from './electricity-bill/electricity-bill.component';
import { GasBillComponent } from './gas-bill/gas-bill.component';
import { LoginComponent } from './login/login.component';
import { MobileRechargeComponent } from './mobile-recharge/mobile-recharge.component';
import { MovieTicketComponent } from './movie-ticket/movie-ticket.component';
import { PoliciesComponent } from './policies/policies.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { StatementpageComponent } from './statementpage/statementpage.component';
import { ToaccountComponent } from './toaccount/toaccount.component';
import { TocontactComponent } from './tocontact/tocontact.component';
import { ToreqComponent } from './toreq/toreq.component';
import { ToselfComponent } from './toself/toself.component';
import { TrainTicketComponent } from './train-ticket/train-ticket.component';
import { WaterBillComponent } from './water-bill/water-bill.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BusTicketComponent,
    CardBillComponent,
    ChangePasswordComponent,
    CheckBalComponent,
    ElectricityBillComponent,
    GasBillComponent,
    LoginComponent,
    MobileRechargeComponent,
    MovieTicketComponent,
    PoliciesComponent,
    ProfileComponent,
    SignupComponent,
    StatementpageComponent,
    ToaccountComponent,
    TocontactComponent,
    ToreqComponent,
    ToselfComponent,
    TrainTicketComponent,
    WaterBillComponent,
    MenuComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
