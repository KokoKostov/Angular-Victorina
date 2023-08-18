import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CreateService } from '../services/create.service';
import { Quiz } from '../types/quiz';
@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
})
export class BrowseComponent implements OnInit {
  quizzes: Quiz[] = [];

  constructor(private createService: CreateService) {}

  ngOnInit(): void {
    this.createService.getAll().subscribe((quizzes) => {
      this.quizzes = quizzes;
    });
  }
}
