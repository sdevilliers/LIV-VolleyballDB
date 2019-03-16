import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';
import { CellComponent } from '../cell/cell.component';
import { BracketsComponent } from '../brackets/brackets.component';


@NgModule({
  imports: [HomeRoutingModule,
            SharedModule],
  declarations: [HomeComponent,
                 LoginComponent,
                 CellComponent,
                 BracketsComponent],
  exports: [HomeComponent]
})
export class HomeModule { }
