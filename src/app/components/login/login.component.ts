import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isShowLogin: boolean = true;

  isShowSignup: boolean = true;

  loginForm!: FormGroup;

  signupForm!: FormGroup;

  isHidden: boolean = true;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createSignInGroup();
    this.createSignUpGroup();
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
    let loginDetails = JSON.parse(localStorage.getItem('login_details') || '{}');
    if (!!loginDetails) {
      this.loginForm.patchValue({
        email: loginDetails.email,
        password: loginDetails.password,
        isChecked: loginDetails.isChecked
      })
    };
  }

  createSignInGroup() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      isChecked: [false],
    })
  }

  createSignUpGroup() {
    this.signupForm = this.fb.group({
      fullName: [null, [Validators.required]],
      dob: [null, [Validators.required]],
      userEmail: [null, [Validators.required, Validators.email]],
      userPassword: [null, [Validators.required]]
    })

  }

  //getter methods for showing errors
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  get fullName() {
    return this.signupForm.get('fullName');
  }
  get dob() {
    return this.signupForm.get('dob');
  }
  get userEmail() {
    return this.signupForm.get('email');
  }
  get userPassword() {
    return this.signupForm.get('userPassword');
  }

  toggleSignIn() {
    this.isShowLogin = !this.isShowLogin;
    this.isShowSignup = !this.isShowSignup;
  }
  toggleSignUp() {
    this.toggleSignIn();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe(
        (_res) => {
          this.toastr.success("Success", "Admin Logged in Successfully");
          this.router.navigate(['/dashboard']);
        },
        (_err: Error) => {
          this.routeToNews();
        }
      );
    }
    if (this.loginForm.value.isChecked) {
      let reqObj: any = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
        isChecked: this.loginForm.value.isChecked
      }
      localStorage.setItem('login_details', JSON.stringify(reqObj));
    }
  }
  routeToNews() {
    if (this.loginForm.valid) {
      this.toastr.success("Success", "Guest Logged in Successfully");
      this.router.navigate(['/news-data']);
    }
  }

  changeInputType() {
    this.isHidden = !this.isHidden;
  }
  showToaster() {
    if (this.signupForm.valid) {
      this.toastr.success("Acccount created Successfully", "Success");
      this.toggleSignIn();
    }
  }

}
