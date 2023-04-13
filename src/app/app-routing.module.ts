import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupsListComponent} from "./components/groups-list/groups-list.component";
import {StudentsListComponent} from "./components/students-list/students-list.component";
import {GroupDataComponent} from "./components/group-data/group-data.component";
import {LoginComponent} from "./components/login/login.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {AuthGuard} from "./guards/auth.guard";
import {RegisterComponent} from "./components/register/register.component";

const routes: Routes = [
  {path: 'api/auth/login', component: LoginComponent},
  {path: 'api/auth/register', component: RegisterComponent},
  {path: 'api/students', component: StudentsListComponent, canActivate: [AuthGuard], data: {role: ['ROLE_ADMIN']}},
  {path: 'api/groups', component: GroupsListComponent, canActivate: [AuthGuard], data: {role: ['ROLE_ADMIN', 'ROLE_USER']}},
  {path: 'api/groups/:group', component: GroupDataComponent, canActivate: [AuthGuard], data: {role: ['ROLE_ADMIN']}},
  {path: '', redirectTo: 'api/auth/login', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
