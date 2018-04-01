import { Component, OnInit, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { Answer } from './answer.model';
import { Question } from '../question/question.model';
import { User } from '../auth/user.model';
import { QuestionService } from '../question/services/question.service';
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ng2-page-scroll';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.css'],
  providers: [QuestionService]
})

export class AnswerFormComponent implements OnInit {

  @Input() question: Question;

  constructor(
    private questionService: QuestionService,
    private pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: any
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const answer = new Answer(
      form.value.description,
      this.question
    );

    // Agregar de primero al array
    this.questionService
      .addAnswer(answer)
      .subscribe(
        res => {
          this.question.answers.unshift(res.body);
          let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#title');
          this.pageScrollService.start(pageScrollInstance);
        },
        error => console.error(error)
      );
    form.reset();
  }

}
