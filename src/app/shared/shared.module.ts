import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';

// exports
import { TopToolbarComponent } from './components/top-toolbar/top-toolbar.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import {AppRoutingModule} from '../routes/app-routing.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [TopToolbarComponent, BookCardComponent],
  exports: [
    TopToolbarComponent,
    BookCardComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatCardModule,
    RouterModule
  ]
})
export class SharedModule { }
