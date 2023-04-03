import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GroupsListComponent} from "./components/groups-list/groups-list.component";
import {StudentsListComponent} from "./components/students-list/students-list.component";

const routes: Routes = [
  {path: '', redirectTo: 'api/groups', pathMatch: 'full' },
  {path: 'api/groups', component: GroupsListComponent},
  {path: 'api/students', component: StudentsListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
