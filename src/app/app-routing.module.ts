import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CarsComponent} from './cars/cars.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path : '', component : HomeComponent},
  {path : 'allcars', component : CarsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
