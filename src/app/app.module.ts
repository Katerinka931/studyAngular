import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { GroupsListComponent } from './components/groups-list/groups-list.component';
import { GroupDataComponent } from './components/group-data/group-data.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentsListComponent,
    GroupsListComponent,
    GroupDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
