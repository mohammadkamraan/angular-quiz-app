import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  userName: Subject<string> = new Subject<string>();
  userScore: Subject<number> = new BehaviorSubject<number>(0);

  setUserName(name: string) {
    this.userName.next(name);
  }
  incraseUserScore() {
    this.userScore.subscribe((previousScore) => {
      this.userScore.next(previousScore + 1);
    });
    this.userScore.unsubscribe();
  }
}
