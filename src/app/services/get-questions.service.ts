import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, map, Subject, Subscription } from 'rxjs';
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
  loading = false;

  constructor(private http: HttpClient, private options: OptionsService) {}

  getQuestions() {
    combineLatest(this.options.amountOfQuiz, this.options.gameLevel)
      .subscribe((result) => {
        this.loading = true;
        this.http
          .get<QuizData>('', {
            params: {
              amount: result[0],
              difficulty: result[1],
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
          .subscribe((response) => {
            this.questions.next(response.results);
            this.loading = false;
          });
      })
      .unsubscribe();
  }
}
