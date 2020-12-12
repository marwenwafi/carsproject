import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CarsComponent} from './cars/cars.component';
import {AddCarComponent} from './add-car/add-car.component';
import {HomeComponent} from './home/home.component';
import {CarComponent} from './car/car.component';
import {UpdateCarComponent} from './update-car/update-car.component';

const routes: Routes = [
  {path : '', component : HomeComponent},
  {path : 'allcars', component : CarsComponent},
  {path : 'addcar', component : AddCarComponent},
  {path : 'updatecar/:id', component : UpdateCarComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
