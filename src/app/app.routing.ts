import { Routes, RouterModule } from '@angular/router';
import { QuestionListComponent } from './question/question-list/question-list/question-list.component';
import { SigninScreenComponent } from './auth/signin/signin-screen.component';
import { SignupScreenComponent } from './auth/signup/signup-screen.component';


const APP_ROUTES: Routes = [
	{ path: '', component: QuestionListComponent, pathMatch: 'full' },
	{ path: 'signin', component: SigninScreenComponent },
	{ path: 'signup', component: SignupScreenComponent },
];

export const Routing = RouterModule.forRoot(APP_ROUTES);