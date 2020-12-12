import { Component, OnInit } from '@angular/core';
import {CarService} from '../shared/car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars;
  details = false;
  selectedCar;

  constructor(private carsService: CarService) { }

  ngOnInit(): void {
    this.carsService.getAllCars().subscribe(
      (data) => {this.cars = data;},
    (error) => console.log(error)
    );
  }

  showDetails(car) {
    this.details = !this.details;
    this.selectedCar = car;
  }
}