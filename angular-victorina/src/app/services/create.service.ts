import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Quiz } from '../types/quiz';
import { CreateQuizInput } from '../types/create-quiz-input';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { publishFacade } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class CreateService {
  // authorName = this.authService.userData.displayName;
  private dbPath = '/quizes';
  quizCollectionRef!: AngularFirestoreCollection<Quiz>;

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
        this.router.navigate(['/question-create']);
      });
  }
  update(id: string, data: any): Promise<void> {
    return this.quizCollectionRef.doc(id).update(data);
  }
  delete(id: string): Promise<void> {
    return this.quizCollectionRef.doc(id).delete();
  }
}
