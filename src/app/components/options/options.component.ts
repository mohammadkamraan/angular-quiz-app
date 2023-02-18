import { Component } from '@angular/core';
import { OptionsService } from 'src/app/services/options.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css'],
})
export class OptionsComponent {
  amountOfQuiz: number[] = [10, 20, 30, 40, 50];
  gameLevel: string[] = ['easy', 'hard', 'medium'];
  constructor(public optionsService: OptionsService) {}
}
