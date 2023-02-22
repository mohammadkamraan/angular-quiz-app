import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionComponent } from './components/question/question.component';
import { QuizAuthService } from './guards/quiz-auth.service';
import { HomeComponent } from './pages/home/home.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { ResultComponent } from './pages/result/result.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'quiz',
    component: QuizComponent,
    canActivate: [QuizAuthService],
    children: [
      {
        component: QuestionComponent,
        path: ':questionIndex',
      },
    ],
  },
  {
    path: 'result',
    component: ResultComponent,
    canActivate: [QuizAuthService],
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
