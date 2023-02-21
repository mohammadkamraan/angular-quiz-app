import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Subject, Subscription } from 'rxjs';
import { OptionsService } from './options.service';

interface Question {
  category: string;
  correct_answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  incorrect_answers: string[];
  question: string;
  type: string;
}

interface QuizData {
  response_code: number;
  results: Question[];
}

@Injectable({
  providedIn: 'root',
})
export class GetQuestionsService {
  questions: Subject<Question[]> = new Subject<Question[]>();
  question: Subject<Question> = new Subject<Question>();
  httpSubscription: Subscription;

  constructor(private http: HttpClient, private options: OptionsService) {}

  getQuestions() {
    combineLatest(this.options.amountOfQuiz, this.options.gameLevel).subscribe(
      (result) => {
        this.httpSubscription = this.http
          .get<QuizData>('', {
            params: {
              amount: result[0],
              difficulty: result[1],
            },
            responseType: undefined,
          })
          .subscribe(({ results }) => {
            this.questions.next(results);
          });
        this.httpSubscription.unsubscribe();
        this.questions.unsubscribe();
      }
    );
  }
  getQuestion(questionIndex: number) {
    this.questions.subscribe((question) => {
      this.question.next(question[questionIndex]);
    });
    this.questions.unsubscribe();
    this.question.unsubscribe();
  }
}
