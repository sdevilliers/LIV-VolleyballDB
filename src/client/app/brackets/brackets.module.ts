import { NgModule } from '@angular/core';
import { BracketsComponent } from './brackets.component';
import { SharedModule } from '../shared/shared.module';
import { CellComponent } from '../cell/cell.component';
import { MatchComponent } from '../match/match.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    BracketsComponent,
    CellComponent,
    MatchComponent
  ],
  exports: [
    BracketsComponent,
    CellComponent,
    MatchComponent
  ]
})
export class BracketsModule { }
