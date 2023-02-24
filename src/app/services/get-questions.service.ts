import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject, Subscription } from 'rxjs';
import { shuffle } from '../utils/suffle';
import { OptionsService } from './options.service';

export interface Question {
  category: string;
  correct_answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  incorrect_answers: string[];
  question: string;
  type: string;
  number: number;
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
  error: any;
  loading = false;
  httpSubsciption: Subscription;

  constructor(private http: HttpClient, private options: OptionsService) {}

  getQuestions() {
    this.loading = true;
    this.httpSubsciption = this.http
      .get<QuizData>('', {
        params: {
          amount: this.options.amountOfQuiz,
          difficulty: this.options.gameLevel,
        },
        responseType: undefined,
      })
      .pipe(
        map<QuizData, QuizData>((quizData) => {
          return {
            results: quizData.results.map((question, index) => {
              return {
                ...question,
                incorrect_answers: shuffle([
                  ...question.incorrect_answers,
                  question.correct_answer,
                ]),
                number: index,
              };
            }),
            response_code: quizData.response_code,
          };
        })
      )
      .subscribe(
        (quiz) => {
          this.questions.next(quiz.results);
          this.loading = false;
          this.httpSubsciption.unsubscribe();
        },
        (error) => {
          this.error = error;
          this.loading = false;
          this.httpSubsciption.unsubscribe();
        }
      );
  }
}
