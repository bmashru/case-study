import { Component, OnInit, OnDestroy } from '@angular/core';
import { CaseStudyService } from '../../services/case-study/case-study.service';
import { Subscription } from 'rxjs';
import { trigger, transition, animate, style } from '@angular/animations';


@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('200ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class QuestionnaireComponent implements OnInit, OnDestroy {

  caseStudySubscription: Subscription;
  visible: Boolean = false;
  caseStudyQuestions: any[] = [];
  displayQuestion: String = '';
  intervalRef: NodeJS.Timer;

  constructor(
    private caseStudyService: CaseStudyService
  ) { }

  ngOnInit() {
    this.caseStudySubscription = this.caseStudyService.getCaseStudy().subscribe(caseStudy => {
      this.caseStudyQuestions = caseStudy.user_company_case_study.company_case_study.questions;
      this.allocateDisplayQuestion();
      this.playSlideShow();
    });
  }

  slideLeft() {
    this.clearInterval();
    this.caseStudyQuestions.unshift(this.caseStudyQuestions.pop());
    this.allocateDisplayQuestion();
    this.playSlideShow();
  }

  slideRight() {
    this.clearInterval();
    this.caseStudyQuestions.push(this.caseStudyQuestions.shift());
    this.allocateDisplayQuestion();
    this.playSlideShow();
  }

  allocateDisplayQuestion() {
    this.displayQuestion = '';
    setTimeout(() => this.displayQuestion = this.caseStudyQuestions[0].body, 500);
  }

  playSlideShow() {
    this.intervalRef = setInterval(() => this.slideRight(), 3000);
  }

  clearInterval() {
    clearInterval(this.intervalRef);
  }

  ngOnDestroy() {
    this.clearInterval();
    if (this.caseStudySubscription) {
      this.caseStudySubscription.unsubscribe();
    }
  }
}
