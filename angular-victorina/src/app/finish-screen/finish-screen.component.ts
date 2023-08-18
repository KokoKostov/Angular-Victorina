import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VictorinaComponent } from '../victorina/victorina.component';

@Component({
  selector: 'app-finish-screen',
  templateUrl: './finish-screen.component.html',
  styleUrls: ['./finish-screen.component.css'],
})
export class FinishScreenComponent implements OnInit {
  @Input() correctAnswers: number = 0;
  @Input() incorrectAnswers: number = 0;
  quizId: string = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public victorinaComp: VictorinaComponent
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = params.get('quizId');
      if (id !== null) {
        this.quizId = id;
      }
    });
  }

  pickAnotherQuiz(): void {
    this.router.navigate(['/browse']);
  }
  tryAgain(): void {
    this.router.navigate(['/victorina', this.quizId]);
    this.victorinaComp.quizFinished = false;
    this.victorinaComp.currentQuestionIndex = 0;
    this.victorinaComp.answers.correct = 0;
    this.victorinaComp.answers.incorrect = 0;
  }
}
