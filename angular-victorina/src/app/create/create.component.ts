import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit{

constructor(private fb:FormBuilder) { 
}
questionNumbers=[1,2,3,4,5,6,7,8,9,10]
ngOnInit(): void {
}
}
