import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { AppRoutingModule } from "./../app-routing.module";
import { DataserviceService } from "./../dataservice.service";

import { ToastrService } from 'ngx-toastr';
import { delay } from 'q';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  user = []
  constructor(private service: DataserviceService, router: Router,private toastr: ToastrService) {
    router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        if (tree.fragment) {
          const element = document.querySelector("#" + tree.fragment);
          if (element) { element.scrollIntoView(); }
        }
      }
    });
  }
  openmenu(): void {
    document.getElementById("mymenu").style.width = "16%";
  }
  closemenu(): void {
    document.getElementById("mymenu").style.width = "0%";
  }
  acc_no = sessionStorage.getItem('acc_no')
  isLoggedIn: Boolean = false
  ngOnInit(): void {
    if (this.acc_no != null) {
      document.getElementById("dummy").style.setProperty("display", "none");
      this.isLoggedIn = true
    }
    else {
      document.getElementById("dummy").style.removeProperty("display");
    }
    this.service.getuserwithacc(Number(this.acc_no)).subscribe(res => {
      this.user = res;
    })
  }
  hide(){
    document.getElementById("dummy").style.setProperty("display", "none");
    
  }
  animate() {
    const expand = document.getElementById('expand');
    const options = document.querySelector('.options');
    options.classList.toggle('hidden');
  }
  logout(): void {
    this.isLoggedIn = false
    sessionStorage.removeItem('acc_no')
    this.toastr.info('Logout Successfully.')
    delay(1500)
    window.location.reload()
  }

}
