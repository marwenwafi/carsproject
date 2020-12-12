import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Car} from '../model/Car';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  carsUrl: string = 'http://localhost:3000/cars';
  carTypesUrl: string = 'http://localhost:3000/cartypes';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getAllCars()
  {
    return this.http.get<Car[]>(this.carsUrl);
  }

  getAllCarTypes()
  {
    return this.http.get<string[]>(this.carTypesUrl);
  }

  getCarById(c: Car | number): Observable<Car>{
    const id = typeof c === 'number' ? c : c.id;
    console.log("inside service: "+c);
    return this.http.get<Car>(this.carsUrl + '/' + c);
  }

  addCar(c: Car): Observable<Car>{
    return this.http.post<Car>(this.carsUrl , c, this.httpOptions);
  }

  updateCar(id: number, c: Car): Observable<Car>{
    return this.http.put<Car>(this.carsUrl + '/' + id , c, this.httpOptions);
  }

  deleteCar(car: Car | number): Observable<Car>{
    const id = typeof car === 'number' ? car : car.id;
    return this.http.delete<Car>(this.carsUrl + '/' + id);
  }
}
