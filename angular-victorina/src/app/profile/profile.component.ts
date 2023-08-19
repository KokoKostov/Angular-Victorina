import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CreateService } from '../services/create.service';
import { Quiz } from '../types/quiz';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;
  quizCollection: Quiz[] = [];
  quizzes: Quiz[] = [];
  showSpinner: boolean = true;
  constructor(
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private createService: CreateService
  ) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe((userData) => {
      this.user = userData;

      if (this.user) {
        this.createService.getAll().subscribe((quizzes) => {
          this.quizzes = quizzes;

          this.quizCollection = this.quizzes.filter(
            (quiz) => quiz.author === this.user.displayName
          );
        });
        this.showSpinner = false;
      }
    });
  }
}
