import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import {
  GetQuestionsService,
  Question,
} from 'src/app/services/get-questions.service';

import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit, OnDestroy {
  question: Question;
  questionsSubscription: Subscription;
  routeSubscription: Subscription;
  questions: Question[];
  clicked = false;
  score: number;
  scoreSubscription: Subscription;
  questionNumber = 1;
  initialTime = 60;
  remainTime = 60;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionData: GetQuestionsService,
    private userData: UserDataService
  ) {}

  onChoseAnswerHandler(answer: string) {
    this.clicked = true;
    setTimeout(() => {
      if (this.question.correct_answer === answer) {
        this.userData.userScore.next(this.score + 1);
      }
      if (this.question.number + 1 < this.questions.length) {
        this.question = this.questions[this.questionNumber];
        this.questionNumber += 1;
        this.router.navigate([`quiz/${this.questionNumber}`], {
          replaceUrl: false,
        });
      } else {
        this.router.navigate(['result']);
      }
      this.clicked = false;
      this.remainTime = 60;
    }, 2000);
  }

  calculateTimeFraction() {
    return this.remainTime / this.initialTime;
  }

  dashArrayHandler() {
    return `${(this.calculateTimeFraction() * 283).toFixed(0)} 283`;
  }

  switchRingColor() {
    if (this.remainTime >= 40) return 'stroke-green-500';
    else if (this.remainTime >= 30) return 'stroke-teal-300';
    else if (this.remainTime >= 10) return 'stroke-amber-300';
    else if (this.remainTime <= 10) return 'stroke-red-500';
    return '';
  }

  ngOnInit(): void {
    interval(1000).subscribe((time) => {
      this.remainTime -= 1;
      if (this.remainTime === 0) {
        this.router.navigate(['result']);
      }
    });
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.questionsSubscription = this.questionData.questions.subscribe(
        (questions) => {
          this.questions = questions;
          this.question = questions[+params['questionIndex'] - 1];
        }
      );
    });
    this.scoreSubscription = this.userData.userScore.subscribe((userScore) => {
      this.score = userScore;
    });
  }
  ngOnDestroy(): void {
    this.questionsSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
    this.scoreSubscription.unsubscribe();
  }
}
