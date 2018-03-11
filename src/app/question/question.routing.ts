import { Routes, RouterModule } from '@angular/router';
import { QuestionListComponent } from './question-list/question-list/question-list.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';


export const QUESTION_ROUTES: Routes = [
	{ path: '', component: QuestionListComponent },
	{ path: ':id', component: QuestionDetailComponent }
];