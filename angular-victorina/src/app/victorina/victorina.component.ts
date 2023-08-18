import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { VictorinaService } from '../services/victorina.service';

@Component({
  selector: 'app-victorina',
  templateUrl: './victorina.component.html',
  styleUrls: ['./victorina.component.css'],
})
export class VictorinaComponent implements OnInit {
  answers = {
    correct: 0,
    incorrect: 0,
  };
  quizFinished: boolean = false;
  isAnswerSelected: boolean = false;
  feedbackClasses: string[] = ['', '', '', ''];
  currentQuestionIndex: number = 0;
  quiz: any;
  constructor(
    private route: ActivatedRoute,
    private victorinaService: VictorinaService
  ) {}

  ngOnInit(): void {
    const quizId = this.route.snapshot.paramMap.get('quizId');
    if (quizId) {
      const quiz = this.victorinaService
        .getQuizById(quizId)
        .subscribe((quizData) => {
          this.quiz = quizData;
        });
    }
  }
  getCurrentQuestion() {
    return this.quiz.questions[this.currentQuestionIndex];
  }
  nextQuestion(): void {
    if (this.currentQuestionIndex < this.quiz.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.quizFinished = true;
    }
  }
  selectAnswer(selectedAnswer: any, optionIndex: number): void {
    if (this.isAnswerSelected) {
      return;
    }
    const correctAnswer = this.victorinaService.getCorrectAnswer(
      this.getCurrentQuestion()
    );

    if (selectedAnswer === correctAnswer) {
      this.answers.correct++;
      this.isAnswerSelected = true;
      this.applyAnswerFeedback('correct', optionIndex);
    } else {
      this.isAnswerSelected = true;
      this.applyAnswerFeedback('incorrect', optionIndex);
      this.answers.incorrect++;
    }
  }
  applyAnswerFeedback(
    feedbackType: 'correct' | 'incorrect',
    optionIndex: number
  ): void {
    const feedbackClass =
      feedbackType === 'correct' ? 'correct-answer' : 'incorrect-answer';
    this.feedbackClasses[optionIndex] = feedbackClass;
    setTimeout(() => {
      this.feedbackClasses[optionIndex] = '';
      this.isAnswerSelected = false;
      this.nextQuestion();
    }, 1500);
  }
}
