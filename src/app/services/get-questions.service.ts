import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { OptionsService } from './options.service';

// ?amount=20&difficulty=medium

@Injectable({
  providedIn: 'root',
})
export class GetQuestionsService {
  questions: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient, private options: OptionsService) {}

  getQuestions() {
    combineLatest(this.options.amountOfQuiz, this.options.gameLevel).subscribe(
      (result) => {
        this.http
          .get('', {
            params: {
              amount: result[0],
              difficulty: result[1],
            },
            responseType: undefined,
          })
          .subscribe((result) => {
            console.log(result);
            this.questions.next(result);
          });
      }
    );
  }

  // getQuestion(questionIndex: number) {}
}
