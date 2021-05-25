import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CheckBalComponent } from './check-bal/check-bal.component';
import { PoliciesComponent } from './policies/policies.component';
import { StatementpageComponent } from './statementpage/statementpage.component';
import { ToaccountComponent } from './toaccount/toaccount.component';
import { TocontactComponent } from './tocontact/tocontact.component';
import { ToreqComponent } from './toreq/toreq.component';
import { ToselfComponent } from './toself/toself.component';
import { SignupComponent } from "./signup/signup.component";
import { BusTicketComponent } from './bus-ticket/bus-ticket.component';
import { CardBillComponent } from './card-bill/card-bill.component';
import { ElectricityBillComponent } from './electricity-bill/electricity-bill.component';
import { GasBillComponent } from './gas-bill/gas-bill.component';
import { MobileRechargeComponent } from './mobile-recharge/mobile-recharge.component';
import { MovieTicketComponent } from './movie-ticket/movie-ticket.component';
import { TrainTicketComponent } from './train-ticket/train-ticket.component';
import { WaterBillComponent } from './water-bill/water-bill.component';
const routes: Routes = [
  {path:'',redirectTo:'/home', pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'profile',component:ProfileComponent},
  {path:'statement',component:StatementpageComponent},
  {path:'change-password',component:ChangePasswordComponent},
  {path:'check-balance',component:CheckBalComponent},
  {path:'toaccount',component:ToaccountComponent},
  {path:'tocontact',component:TocontactComponent},
  {path:'request-money',component:ToreqComponent},
  {path:'self-transfer',component:ToselfComponent},
  {path:'policies',component:PoliciesComponent},
  {path:'mobile-recharge',component:MobileRechargeComponent},
  {path:'bus-ticket',component:BusTicketComponent},
  {path:'movie-ticket',component:MovieTicketComponent},
  {path:'train-ticket',component:TrainTicketComponent},
  {path:'water-bill',component:WaterBillComponent},
  {path:'electricity-bill',component:ElectricityBillComponent},
  {path:'card-bill',component:CardBillComponent},
  {path:'gas-bill',component:GasBillComponent},
  {path:'**',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
