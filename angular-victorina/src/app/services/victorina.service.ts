import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VictorinaService {
  private dbPath = '/quizes';
  quizCollectionRef!: AngularFirestoreCollection<any>;
  constructor(private db: AngularFirestore) {
    this.quizCollectionRef = this.db.collection(this.dbPath);
  }
  getQuizById(quizId: string): Observable<any> {
    return this.db.collection(this.dbPath).doc(quizId).valueChanges();
  }
  getCorrectAnswer(quiz: any): any {
    const answers = [quiz.answer1, quiz.answer2, quiz.answer3, quiz.answer4];
    return answers[quiz.correctAnswer - 1];
  }
}
