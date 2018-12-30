import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire.component';
import { CONFIGURATION_INITIALIZER } from './services/client-config/client-config.service';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule, MatDividerModule, MatButtonModule, MatProgressBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UnauthorizedComponent,
    QuestionnaireComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatProgressBarModule,
    MatDividerModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  providers: [CONFIGURATION_INITIALIZER],
  bootstrap: [AppComponent]
})
export class AppModule { }
