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
/**
 * QuestionnaireComponent is used to display case study questions in form of slideshow
 */
export class QuestionnaireComponent implements OnInit, OnDestroy {

  caseStudySubscription: Subscription;
  visible: Boolean = false;
  caseStudyQuestions: any[] = [];
  displayQuestion: String = '';
  intervalRef: any;

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

  /**
   * This method is used to shift question list arry left with 1 elemnt
   */
  slideLeft() {
    this.clearInterval();
    this.caseStudyQuestions.unshift(this.caseStudyQuestions.pop());
    this.allocateDisplayQuestion();
    this.playSlideShow();
  }

  /**
   * This method is used to shift question list arry right with 1 elemnt
   */
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

  /**
   * This method is used to shift question list arry right at certain interval
   */
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
