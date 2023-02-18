import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropDownDirective } from './directives/drop-down.directive';
import { HomeComponent } from './pages/home/home.component';
import { OptionsComponent } from './components/options/options.component';

@NgModule({
  declarations: [AppComponent, DropDownDirective, HomeComponent, OptionsComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
