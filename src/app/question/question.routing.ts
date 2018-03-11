import { Routes, RouterModule } from '@angular/router';
import { QuestionListComponent } from './question-list/question-list/question-list.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { QuestionFormComponent } from './question-form/question-form.component';

export const QUESTION_ROUTES: Routes = [
	{ path: '', component: QuestionListComponent },
	{ path: 'new', component: QuestionFormComponent },
	{ path: ':id', component: QuestionDetailComponent }
];