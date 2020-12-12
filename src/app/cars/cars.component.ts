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
  total;
  page: number = 1;

  constructor(private carsService: CarService) { }

  ngOnInit(): void {
    this.carsService.getAllCars().subscribe(
      (data) => {
        this.cars = data;
        this.total = data.length;
        },
    (error) => console.log(error)
    );
  }

  showDetails(car) {
    this.details = !this.details;
    this.selectedCar = car;
  }

  processLike($event: any) {
    this.carsService.updateCar($event.id, $event).subscribe(res => {
      alert('Car Liked');
    });
  }
}
