import { NgModule } from '@angular/core';
import { BracketsComponent } from './brackets.component';
import { SharedModule } from '../shared/shared.module';
import { CellComponent } from './cell/cell.component';
import { MatchComponent } from './match/match.component';
import { RoundComponent } from './round/round.component';

/**
 * <div class="text-info bg-info">
 *     This module houses the logic data (BracketLogic) and display data (BracketTable) classes together.
 *     It provides user interface to create an empty bracket for a certain number of teams.
 *     It also allows for the creation of a bracket using the teams in the database, that are retrieved via the TeamService service.
 * </div>
 */
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
  ]
})
export class BracketsModule { }
