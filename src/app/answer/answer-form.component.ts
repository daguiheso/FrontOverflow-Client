import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Answer } from './answer.model';
import { Question } from '../question/question.model';
import { User } from '../auth/user.model';
import { QuestionService } from '../question/services/question.service';
import * as SweetScroll from 'sweet-scroll';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.css'],
  providers: [QuestionService]
})

export class AnswerFormComponent implements OnInit {

  @Input() question: Question;
  sweetScroll: SweetScroll;

  constructor(
    private questionService: QuestionService
  ) {
    this.sweetScroll = new SweetScroll({
      duration: 1000
    });
  }

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
          this.sweetScroll.to('#title');
        },
        error => console.error(error)
      );
    form.reset();
  }

}
