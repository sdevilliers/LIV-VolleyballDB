import { NgModule } from '@angular/core';
import { BracketsComponent } from './brackets.component';
import { SharedModule } from '../shared/shared.module';
import { CellComponent } from '../cell/cell.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    BracketsComponent,
    CellComponent
  ],
  exports: [
    BracketsComponent,
    CellComponent
  ]
})
export class BracketsModule { }
