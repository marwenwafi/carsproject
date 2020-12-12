import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Car} from '../model/Car';
import {CarService} from '../shared/car.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  @Input() currentCar: Car;
  @Output() increaseLike = new EventEmitter<Car>();

  liked = false;

  constructor(private carservice: CarService) { }

  ngOnInit(): void {
  }

  deleteCar(id: number) {
    console.log(id);
    this.carservice.deleteCar(id).subscribe();
    window.location.reload();
    alert('The car has been deleted!');
  }

  addLike()
  {
    this.liked = true;
    this.currentCar.likes++;
    this.increaseLike.emit(this.currentCar);
  }
}
