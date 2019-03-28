import { NgModule } from '@angular/core';
import { BracketsComponent } from './brackets.component';
import { SharedModule } from '../shared/shared.module';
import { CellComponent } from './cell/cell.component';
import { MatchComponent } from './match -only match.ts is currently used/match.component';
import { RoundComponent } from './round -only round.ts is currently used/round.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    BracketsComponent,
    CellComponent,
    MatchComponent,
    RoundComponent
  ],
  exports: [
    BracketsComponent,
    CellComponent,
    MatchComponent,
    RoundComponent
  ]
})
export class BracketsModule { }
