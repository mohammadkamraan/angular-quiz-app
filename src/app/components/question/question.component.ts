import { Component, Injectable, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  GetQuestionsService,
  Question,
} from 'src/app/services/get-questions.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit, OnDestroy {
  question: Question;
  questionsSubscription: Subscription;
  routeSubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private questionData: GetQuestionsService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.questionsSubscription = this.questionData.questions.subscribe(
        (questions) => {
          this.question = questions[+params['questionIndex'] - 1];
        }
      );
    });
  }
  ngOnDestroy(): void {
    this.questionsSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }
}
