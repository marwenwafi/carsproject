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
  cartypes;
  selectedCar;
  total;
  page: number = 1;

  constructor(private carsService: CarService) { }

  ngOnInit(): void {
    this.carsService.getAllCarTypes().subscribe(
      (data) => {this.cartypes = data['types'];} ,
      (error) => console.log(error)
    );
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

  search(sf)
  {
    this.carsService.getAllCars().subscribe(
      (data) => {
        this.cars = data;
        this.cars = this.carsService.getByCriterias(this.cars,["make","model","type"],[sf.value['make'],sf.value['model'],sf.value['typ']]);
        this.total = this.cars.length;
      },
      (error) => console.log(error)
    );
  }
}
