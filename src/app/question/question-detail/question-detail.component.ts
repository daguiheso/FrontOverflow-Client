import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../question.model';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css'],
  providers: [QuestionService]
})

export class QuestionDetailComponent implements OnInit, OnDestroy {

  question?: any | Question;
  loading = true;
  sub: any;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.questionService
        .getQuestion(params.id)
        .subscribe(res => {
          this.question = res.body;
          this.loading = false;
        });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
