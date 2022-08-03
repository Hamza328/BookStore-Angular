import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError,tap} from 'rxjs/operators';
import {throwError,BehaviorSubject} from 'rxjs';

import {environment} from '../../environments/environment'
import { Role } from './role.enum';
import { User } from './user.modal';
import { Router } from '@angular/router';

const Api_url = `${environment.Base_Url}/api/authentication/`

export interface AuthResponse{
   id:number,
   username:string,
   password:string,
   role:Role,
   token: string,
   tokenExpirationDate: Date
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   user =new BehaviorSubject<User|null>(null);
  private expirationTimer:any;

  constructor(private http:HttpClient,
              private router:Router) { }

  signUp(username:string,password:string){
    return this.http.post<AuthResponse>(Api_url+'sign-up',
    {
      username:username,
      password:password
    }).pipe(
      catchError(this.handleError)
    );
  }

  login(username:string,password:string){
    return this.http.post<AuthResponse>(Api_url+'sign-in',
    {
      username:username,
      password:password
    }).pipe(
      catchError(this.handleError)
      ,tap((resData)=>{
      this.handleAuthentication(
        resData.id,
        resData.username,
        resData.password,
        resData.role,
        resData.token,
        +resData.tokenExpirationDate)
    }));;

  }

  handleAuthentication(
     id:number,
     username:string,
     password:string,
     role:Role,
     token: string,
     tokenExpirationduration: number){
       const expirationduration =new Date(new Date().getTime() + +tokenExpirationduration)
       const user = new User(id,username,password,role,token,expirationduration);
       console.log(expirationduration);
       this.user.next(user);
       this.router.navigate(['/user']);
       localStorage.setItem('userData',JSON.stringify(user));
       this.autologout(tokenExpirationduration);
  }

  autologin(){
    const userData:AuthResponse = JSON.parse(localStorage.getItem('userData')!);
    if(!userData){
      return;
    }

    const loaduser =new User(
      userData.id,
      userData.username,
      userData.password,
      userData.role,
      userData.token,
      new Date(userData.tokenExpirationDate)
    )
    if(loaduser._token){
      this.router.navigate(['/user']);
      this.user.next(loaduser);
      const duration= new Date(userData.tokenExpirationDate).getTime() - new Date().getTime();
      this.autologout(duration);
    }else{
      this.logout();
    }
  }

  autologout(expirationTime:number){
    this.expirationTimer = setTimeout(()=>{
      this.logout();

    },expirationTime);

  }

  handleError(errorRes:HttpErrorResponse){
    console.log(errorRes);
    let message ="AN Unknown Error Occured";
    if(typeof errorRes.error === 'string' && errorRes.error != null){
      message =errorRes.error;
    }
    return throwError(message);
  }

  logout(){
     this.user.next(null);
     this.router.navigate(['/auth']);
     localStorage.removeItem('userData');
     if(this.expirationTimer){
      clearTimeout(this.expirationTimer);
     }
     this.expirationTimer =null;
  }
}
