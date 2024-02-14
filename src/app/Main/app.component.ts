import { Component } from '@angular/core';
import { AuthService } from '../out.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  logoUrl = 'assets/logo.png';

  constructor(private authservice: AuthService,private router: Router, private http: HttpClient) {  }


  goToHome(): void {
    this.router.navigate(['/']);
  }

  login(islogged:boolean){
    if(islogged){
      this.authservice.login();
    } else {
      this.authservice.logout();
    }
  }
  
  fetchData(): void {
    this.http.get('https://softwium.com/api/pokemons').subscribe(data => {
      console.log(data);
    });
  }
}
