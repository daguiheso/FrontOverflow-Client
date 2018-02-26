import { Component, OnInit } from '@angular/core';
import { Question } from '../../question.model';

const q = new Question(
  '¿Como reutilizo un componente en Angular?',
  'Miren, esta es mi pregunta...',
  new Date(),
  'none',
);

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})

export class QuestionListComponent implements OnInit {

  questions: Question[] = new Array(10).fill(q);

  constructor() { }

  ngOnInit() {
  }

}
