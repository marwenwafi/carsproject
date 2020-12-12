import { Component, OnInit } from '@angular/core';
import {CarService} from '../shared/car.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  cartypes;

  constructor(private carservice: CarService) { }

  ngOnInit(): void {
    this.carservice.getAllCarTypes().subscribe(
      (data) => {this.cartypes = data['types'];} ,
      (error) => console.log(error)
    );
  }

}
