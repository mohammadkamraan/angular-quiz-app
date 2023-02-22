import { Component, OnInit } from '@angular/core';
import { OptionsService } from 'src/app/services/options.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  score: number;
  userName: string;
  amountOfQuestions: number;
  completeText: string = 'cogragulations you answerd all the questions';
  notCompeleteText: string = 'you cluld not answer all the questions';
  constructor(
    private userData: UserDataService,
    private gameOptions: OptionsService
  ) {}

  ngOnInit(): void {
    this.userName = this.userData.userName;
    this.userData.userScore
      .subscribe((userScore) => {
        this.score = userScore;
      })
      .unsubscribe();
    this.gameOptions.amountOfQuiz
      .subscribe((amount) => {
        this.amountOfQuestions = amount;
      })
      .unsubscribe();
  }
}
