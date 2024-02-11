import { Component } from '@angular/core';
import { AuthService } from '../out.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  logoUrl = 'assets/logo.png';

  constructor(private authservice: AuthService) { }

  login(islogged:boolean){
    if(islogged){
      this.authservice.login();
    } else {
      this.authservice.logout();
    }
  }
}
