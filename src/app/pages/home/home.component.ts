import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  @ViewChild('nameForm')
  nameForm = NgForm;

  constructor(private router: Router) {}

  onStartGame() {
    this.router.navigate(['/quiz']);
  }
}
