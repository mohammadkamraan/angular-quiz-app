import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  userName: string;
  userScore: Subject<number> = new BehaviorSubject<number>(0);
}
