import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Answer } from './answer.model';
import { Question } from '../question/question.model';
import { User } from '../auth/user.model';
import { QuestionService } from '../question/services/question.service';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.css'],
  providers: [QuestionService]
})

export class AnswerFormComponent implements OnInit {

  @Input() question: Question;

  constructor(
    private questionService: QuestionService
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
        res => this.question.answers.unshift(res.body),
        error => console.error(error)
      );
    form.reset();
  }

}
