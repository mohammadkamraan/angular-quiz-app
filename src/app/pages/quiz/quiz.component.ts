import { Component, OnInit } from '@angular/core';
import { GetQuestionsService } from 'src/app/services/get-questions.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
})
export class QuizComponent implements OnInit {
  constructor(public getQuestinos: GetQuestionsService) {}

  ngOnInit(): void {
    this.getQuestinos.getQuestions();
  }
}
