import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GroupsListComponent} from "./components/groups-list/groups-list.component";
import {StudentsListComponent} from "./components/students-list/students-list.component";
import {GroupDataComponent} from "./components/group-data/group-data.component";

const routes: Routes = [
  {path: '', redirectTo: 'api/students', pathMatch: 'full' },
  {path: 'api/students', component: StudentsListComponent},
  {path: 'api/groups', component: GroupsListComponent},
  {path: 'api/groups/:group', component: GroupDataComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
