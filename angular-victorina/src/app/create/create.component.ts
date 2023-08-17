import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  questions: Questions[] = [];
  questionNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor(private createService: CreateService, private fb: FormBuilder) {
    this.form = this.fb.group({
      title: [''],
      description: [''],
      questionCount: [''],
    });
  }

  ngOnInit(): void {}

  onQuestionAdded(question: Questions) {
    this.questions.push(question);
  }

  onSubmit() {
    const formData = this.form.value;
    const CreateQuizInput: CreateQuizInput = {
      title: formData.title,
      description: formData.description,
      questionCount: formData.questionCount,
    };

    this.createService.create(CreateQuizInput);
  }
}
