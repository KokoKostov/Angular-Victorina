import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CreateService } from '../services/create.service';

import { CreateQuizInput } from '../types/create-quiz-input';

import { Questions } from '../types/questions';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  submited = false;
  form: FormGroup;
  showSpinner: boolean = false;
  questions: Questions[] = [];
  questionNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor(private createService: CreateService, private fb: FormBuilder) {
    this.form = this.fb.group({
      title: [''],
      description: [''],
      questionCount: [''],
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', { validators: [Validators.required], updateOn: 'blur' }],
      description: [
        '',
        { validators: [Validators.required], updateOn: 'blur' },
      ],
    });
  }

  onQuestionAdded(question: Questions) {
    this.questions.push(question);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      return;
    }
    const formData = this.form.value;
    const CreateQuizInput: CreateQuizInput = {
      title: formData.title,
      description: formData.description,
      questionCount: 0,
    };
    this.showSpinner = true;
    this.createService.create(CreateQuizInput);
    this.showSpinner = false;
  }
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
}
