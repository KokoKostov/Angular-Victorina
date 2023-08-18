import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import { CreateQuizInput } from '../types/create-quiz-input';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { Questions } from '../types/questions';

@Injectable({
  providedIn: 'root',
})
export class CreateService {
  private dbPath = '/quizes';
  quizCollectionRef!: AngularFirestoreCollection<any>;

  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    private router: Router
  ) {
    this.quizCollectionRef = this.db.collection(this.dbPath);
  }
  getAll(): Observable<any[]> {
    return this.quizCollectionRef.valueChanges();
  }

  create(quiz: CreateQuizInput): Promise<void> {
    return this.quizCollectionRef
      .add({
        ...quiz,
        quizId: '',
        author: '',
        questions: [],
      })
      .then((docRef) => {
        const quizId = docRef.id;
        console.log(`name`);

        docRef.update({
          quizId: quizId,
          author: this.authService.getDisplayName(),
        });
        this.router.navigate(['/create-question', quizId]);
      });
  }
  update(id: string, data: any): Promise<void> {
    return this.quizCollectionRef.doc(id).update(data);
  }
  delete(id: string): Promise<void> {
    return this.quizCollectionRef.doc(id).delete();
  }
  generateUniqueId(): string {
    return uuidv4();
  }
  updateQuizQuestions(quizId: string, questions: Questions[]): Promise<void> {
    const quizRef = this.quizCollectionRef.doc(quizId);

    return quizRef.update({
      questions: questions,
      questionCount: questions.length,
    });
  }
}
