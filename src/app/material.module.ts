import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
	MatToolbarModule,
	MatIconModule,
	MatCardModule,
	MatInputModule,
	MatButtonModule,
	MatListModule,
	MatGridListModule,
	MatRadioModule,
	MatProgressSpinnerModule
} from '@angular/material';

const modules = [
	BrowserAnimationsModule,
	MatToolbarModule,
	MatIconModule,
	MatCardModule,
	MatInputModule,
	MatButtonModule,
	MatListModule,
	MatGridListModule,
	MatRadioModule,
	MatProgressSpinnerModule
]

@NgModule({
	imports: modules,
	exports: modules
})

export class MaterialModule { }