import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/login.service';
import {LoginRegisterReset} from '../../app/models/login-register-reset';
import { Router } from '../../../node_modules/@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginRegisterReset: LoginRegisterReset = new LoginRegisterReset();
  constructor(private router: Router, private customerService: CustomerService) {
    this.loginRegisterReset.UserName = 'eswar24@gmail';
    this.loginRegisterReset.Password = 'eswar24#';
    this.loginRegisterReset.grant_type = 'password';
    this.customerService.loginCustomer(this.loginRegisterReset).subscribe((res) => {
if (res) {
  console.log(res);
  localStorage.setItem('token', res.access_token);
  this.router.navigate(['/preview']);
}
    });
  }

  ngOnInit() {
  }

}
