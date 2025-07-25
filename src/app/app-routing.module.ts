import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MemberComponent } from './member/member.component';
// import { HomeComponent } from './home/home.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { BorrowingHistoryComponent } from './borrowing-history/borrowing-history.component';
import { ProfileComponent } from './profile/profile.component';
import { FinesComponent } from './fines/fines.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { RegistrationComponent } from './registration/registration.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { BookDetailsDialogComponent } from './book/book-details-dialog/book-details-dialog.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { 
    path: '', component: MainHomeComponent, children: [
      { path: '', component: BookListComponent },
      { path: 'books/:id', component: BookDetailsDialogComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'member', component: MemberComponent, children: [
      { path: 'notifications', component: NotificationsComponent },
      { path: 'fines', component: FinesComponent },
      { path: 'history', component: BorrowingHistoryComponent },
    ] 
  },
  { path: 'profile', component: ProfileComponent },
  { path: 'registration', component: RegistrationComponent },
  {path:'**',component:PageNotFoundComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
