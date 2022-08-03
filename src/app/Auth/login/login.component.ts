import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthResponse, AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoginMode =true;
  error:String ='';
  constructor(
    private authservice: AuthService,
    private snack:MatSnackBar
    ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if(this.isLoginMode){
      this.authservice.login(form.value.username,form.value.password).subscribe(
        (response)=>{
          console.log(response);
        },error =>{
          this.error =error;
        }

      )

    }else{
      this.authservice.signUp(form.value.username, form.value.password).subscribe(
        (response) => {
          this.isLoginMode =!this.isLoginMode;
          this.snack.open('You have Successfully Sign Up!  Please Login','ok',{
            duration:4000,
            verticalPosition:'top'
          })
          form.reset();
        },
        (error) => {
          this.error =error;
        }
      );

    }
  }

  onSwitchMode(form:NgForm){
    this.isLoginMode =!this.isLoginMode;
    form.reset();
  }

  removeError(){
    this.error='';
  }

}
