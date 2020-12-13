import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {CarService} from '../shared/car.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  cartypes;
  color;
  imgSrc;

  constructor(private fb: FormBuilder, private carservice: CarService, private route: Router) { }

  modelForm = this.fb.group(
    {
      make: ['', [Validators.required]],
      model: ['', [Validators.required]],
      type: ['', [Validators.required]],
      color: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.min(1950), Validators.max((new Date()).getFullYear())]],
      kilometrage: ['', [Validators.required, Validators.min(0)]],
      cylinders: ['', [Validators.required, Validators.min(1), Validators.max(24)]],
      horsepower: ['', [Validators.required, Validators.min(10), Validators.max(3000)]],
      price: ['', [Validators.required]],
      ownerphone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      image: ['', [Validators.required]]
    });

  get controls() {
    return this.modelForm.controls;
  }

  ngOnInit(): void {
    this.carservice.getAllCarTypes().subscribe(
      (data) => {this.cartypes = data['types'];} ,
      (error) => console.log(error)
    );
  }

  addCar(car){
    car.likes=0;
    car.image = this.imgSrc;
    this.carservice.addCar(car).subscribe(res => {
      alert("New Car added");
      this.route.navigateByUrl('/allcars');
    });
  }


  updateColor($event: string) {
    this.modelForm.patchValue({color: $event});
  }

  onFileChange(event) {

    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {

      const [image] = event.target.files;

      reader.readAsDataURL(image);

      reader.onload = () => {

        this.imgSrc = reader.result as string;
        this.modelForm.patchValue({image: reader.result as string});
      };
    }
  }
}
