import { Injectable } from '@angular/core';

export type GameLevel = 'easy' | 'medium' | 'hard';
export type AmountOfQuiz = 10 | 20 | 30 | 40 | 50;

@Injectable({
  providedIn: 'root',
})
export class OptionsService {
  gameLevel: GameLevel = 'easy';
  amountOfQuiz: AmountOfQuiz = 10;
  changeGameOptionHandler(
    value: string | number,
    option: 'gameLevel' | 'amountOfQuiz'
  ) {
    if (option === 'gameLevel') {
      this.gameLevel = value as GameLevel;
    } else {
      this.amountOfQuiz = value as AmountOfQuiz;
    }
  }
}
