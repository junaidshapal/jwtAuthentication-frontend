import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  //Credentials for login 
  loginData = { UserName: ' ', Password: ' ' };

constructor(private authService: AuthService, private router: Router) {}

//Method for login
login() {
  this.authService.login(this.loginData).subscribe({
    next: (response) => {
      if (this.authService.isAuthenticated()) {
        this.router.navigate(['dashboard']);
      }
    },
    error: (err) => {
      console.log('Login failed:', err);
    },
    complete: () => {
      console.log('Login request completed.');
    }
  });
}


}
