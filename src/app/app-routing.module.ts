import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './User/buy-book/book.component';
import { LoginComponent } from './Auth/login/login.component';
import { PurchasedBookComponent } from './User/purchased-book/purchased-book.component';
import { AllBookComponent } from './Admin/all-book/all-book.component';
import { EditBookComponent } from './Admin/edit-book/edit-book.component';
import { AdminComponent } from './Admin/admin-component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: LoginComponent },
  {
    path: 'user',
    component: BookComponent,
  },
  {
    path: 'book',
    component: AdminComponent,
    children: [
      { path: '', component: AllBookComponent },
      { path: 'new', component: EditBookComponent },
      { path: ':id/edit', component: EditBookComponent },
    ],
  },
  { path: 'user/getallPuchase', component: PurchasedBookComponent },
  { path: '**', redirectTo: '/auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
