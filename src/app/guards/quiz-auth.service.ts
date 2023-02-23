import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDataService } from '../services/user-data.service';

@Injectable({
  providedIn: 'root',
})
export class QuizAuthService implements CanActivate {
  constructor(private router: Router, private userData: UserDataService) {}
  canActivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.userData.userName) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
