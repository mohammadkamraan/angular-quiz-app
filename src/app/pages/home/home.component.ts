import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  @ViewChild('nameForm')
  nameForm = NgForm;
  userName: string;
  constructor(private router: Router, private userData: UserDataService) {}

  onStartGame() {
    this.userData.userName = this.userName;
    this.router.navigate(['/quiz/1']);
  }
}
