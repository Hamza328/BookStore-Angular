import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Auth/auth.service';
import { User } from 'src/app/Auth/user.modal';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated:boolean=false;
  private userSub!:Subscription;
  user!:User|null;

  constructor(private authservice:AuthService){}

  ngOnInit(): void {
    this.userSub = this.authservice.user.subscribe(user=>{
      this.isAuthenticated = !!user;
      this.user =user;
    })

  }

  logout(){
    this.authservice.logout();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userSub.unsubscribe();
  }

}
