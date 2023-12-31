import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CreateService } from '../services/create.service';
import { Quiz } from '../types/quiz';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
})
export class BrowseComponent implements OnInit {
  quizzes: Quiz[] = [];
  showSpinner: boolean = true;
  constructor(private createService: CreateService) {}

  ngOnInit(): void {
    this.createService.getAll().subscribe((quizzes) => {
      this.quizzes = quizzes;
      this.showSpinner = false;
    });
  }

  async deleteQuiz(quizId: string): Promise<void> {
    try {
      await this.createService.delete(quizId);
      await this.createService.getAll(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  }
}
