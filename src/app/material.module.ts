import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
	MatToolbarModule,
	MatIconModule,
	MatCardModule,
	MatInputModule,
	MatButtonModule
} from '@angular/material';

const modules = [
	BrowserAnimationsModule,
	MatToolbarModule,
	MatIconModule,
	MatCardModule,
	MatInputModule,
	MatButtonModule
]

@NgModule({
	imports: modules,
	exports: modules
})

export class MaterialModule { }