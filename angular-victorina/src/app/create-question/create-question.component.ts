import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Questions } from '../types/questions';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateService } from '../services/create.service';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css'],
})
export class CreateQuestionComponent implements OnInit {
  newQuestion: Questions = {
    questionId: '',
    text: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    correctAnswer: 1,
  };
  oneQuestionError: boolean = false;
  showSpinner: boolean = false;
  questions: Questions[] = [];
  questionForm: FormGroup;
  quizId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private createService: CreateService,
    private fb: FormBuilder
  ) {
    this.questionForm = this.fb.group({
      text: ['', { validators: [Validators.required], updateOn: 'blur' }],
      answer1: ['', { validators: [Validators.required], updateOn: 'blur' }],
      answer2: ['', { validators: [Validators.required], updateOn: 'blur' }],
      answer3: ['', { validators: [Validators.required], updateOn: 'blur' }],
      answer4: ['', { validators: [Validators.required], updateOn: 'blur' }],
      correctAnswer: [1],
    });
  }

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get('quizId');
    console.log(this.quizId);
  }

  OnSubmit() {
    if (this.questionForm.invalid) {
      this.markFormGroupTouched(this.questionForm);
      return;
    }

    const formValue = this.questionForm.value;

    const questionId = this.createService.generateUniqueId();

    formValue.questionId = questionId;

    this.questions.push(formValue);

    this.questionForm.reset();
  }

  onFinish() {
    if (this.questions.length < 1) {
      this.oneQuestionError = true;
      return;
    }
    if (this.quizId) {
      this.showSpinner = true;
      this.createService
        .updateQuizQuestions(this.quizId, this.questions)
        .then(() => {
          console.log('Quiz questions updated');
          this.router.navigate(['/browse']); // Navigate to the desired page
          this.showSpinner = false;
        });
    } else {
      this.showSpinner = false;
      console.error('Invalid quizId');
    }
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
