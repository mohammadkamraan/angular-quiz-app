import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OptionsService {
  gameLevel: Subject<string> = new BehaviorSubject<string>('easy');
  amountOfQuiz: Subject<number> = new BehaviorSubject<number>(10);

  changeSubjectValueHandler(
    value: string | number,
    subject: 'gameLevel' | 'amountOfQuiz'
  ) {
    if (subject === 'gameLevel') {
      this.gameLevel.next(value as string);
    } else {
      this.amountOfQuiz.next(value as number);
    }
  }
}
