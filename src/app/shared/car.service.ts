import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Car} from '../model/Car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  carsUrl: string = 'http://localhost:3000/cars';

  constructor(private http: HttpClient) {
  }

  getAllCars()
  {
    return this.http.get<Car[]>(this.carsUrl);
  }
}
