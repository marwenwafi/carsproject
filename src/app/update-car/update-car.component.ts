import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {CarService} from '../shared/car.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent implements OnInit {

  cartypes;
  id;
  car;
  color;
  likes;
  imgSrc;

  constructor(private fb: FormBuilder, private carservice: CarService, private router: Router, private route: ActivatedRoute) { }

  modelForm = this.fb.group(
    {
      make: ['', [Validators.required]],
      model: ['', [Validators.required]],
      type: ['', [Validators.required]],
      color: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.min(1950), Validators.max((new Date()).getFullYear())]],
      kilometrage: ['', [Validators.required, Validators.min(0), Validators.max(1000000)]],
      cylinders: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      horsepower: ['', [Validators.required, Validators.min(10), Validators.max(1500)]],
      price: ['', [Validators.required]],
      ownerphone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      image: ['', [Validators.required]]
    });

  get controls() {
    return this.modelForm.controls;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log("inside update ts : "+this.id);
    this.carservice.getCarById(this.id).subscribe(
      (data) => {
        this.car = data;
        this.likes = this.car.likes;
        this.color = this.car.color;
        this.imgSrc = this.car.image;
        this.modelForm.patchValue(this.car);
      },
      (error => console.log(error))
    );
    this.carservice.getAllCarTypes().subscribe(
      (data) => {this.cartypes = data['types'];} ,
      (error) => console.log(error)
    );
  }

  updateCar(car){
    if (this.modelForm.dirty)
    {
      car.likes = this.likes;
      car.image = this.imgSrc;
      this.carservice.updateCar(this.id, car).subscribe(res => {
        alert('Car Updated Successfully');
        this.router.navigateByUrl('/allcars');
      });
    }
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

        console.log(reader.result as string);
        this.imgSrc = reader.result as string;
        this.modelForm.patchValue({image: reader.result as string});

      };
    }
  }

}
