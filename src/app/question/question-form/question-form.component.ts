import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Question } from '../question.model';
import icons from '../icons';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css'],
  providers: [QuestionService]
})

export class QuestionFormComponent implements OnInit {

  icons: Object[] = icons;
  questionForm: FormGroup;

  // validation icon version
  getIconVersion(icon: any) {
    let version;
    if (icon.versions.font.includes('plain-wordmark')) {
      version = 'plain-wordmark';
    } else {
      version = icon.versions.font[0];
    }
    return version;
  }

  constructor(
    private route: Router,
    private questionService: QuestionService
  ) { }

  ngOnInit() {
    this.questionForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      icon: new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    if (this.questionForm.valid) {
      const { title, description, icon } = this.questionForm.value;
      const q = new Question(title, description, new Date(), icon);
      this.questionService.addQuestion(q)
        .subscribe(
          res => this.route.navigate(['/questions', res.body._id]),
          error => console.log(error)
        );
      this.questionForm.reset();
    }
  }

}
