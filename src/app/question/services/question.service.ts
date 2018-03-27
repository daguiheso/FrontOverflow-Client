import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Question } from '../question.model';
import { environment } from '../../../environments/environment';
import * as urljoin from 'url-join';
// import 'rxjs/add/operator/toPromise';

@Injectable()

export class QuestionService {

  private questionsUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.questionsUrl = urljoin(environment.apiUrl, 'questions');
  }

  getQuestions(): Promise<void | Question[]> {
    return this.http.get(this.questionsUrl)
      .toPromise()
      .then(res => {
        return res as Question[]
      })
      .catch(this.handleError)
    }

  getQuestion(id): Promise<void | Question> {
    const url = urljoin(this.questionsUrl, id);
    return this.http.get(url)
      .toPromise()
      .then(res => {
        return res as Question
      })
      .catch(this.handleError)
  }

  handleError(error: any) {
    const errMsg = error.message ? error.message :
      error.status ? `${error.status} - $ {error.status.text}` : 'Server error';

    console.log(errMsg);
  }

}
