import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
	MatToolbarModule,
	MatIconModule,
	MatCardModule
} from '@angular/material';

const modules = [
	BrowserAnimationsModule,
	MatToolbarModule,
	MatIconModule,
	MatCardModule
]

@NgModule({
	imports: modules,
	exports: modules
})

export class MaterialModule { }