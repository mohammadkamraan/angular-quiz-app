import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropDownDirective } from './directives/drop-down.directive';
import { HomeComponent } from './pages/home/home.component';
import { OptionsComponent } from './components/options/options.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-intercepter.service';
import { QuestionComponent } from './components/question/question.component';

@NgModule({
  declarations: [
    AppComponent,
    DropDownDirective,
    HomeComponent,
    OptionsComponent,
    QuizComponent,
    QuestionComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: HttpInterceptorService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
