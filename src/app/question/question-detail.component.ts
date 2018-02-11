import { Component, OnInit } from '@angular/core';
import { Question } from './question.model';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})

export class QuestionDetailComponent implements OnInit {

  question: Question = new Question(
    'Esta es una nueva pregunta sobre Typescript',
    'Miren, tengo una duda con una web platform y quiero hacerla con typescript, se puede?',
    new Date,
    'devicon-typescript-plain colored'
  );

  constructor() { }

  ngOnInit() {
  }

}
