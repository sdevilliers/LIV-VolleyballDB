import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';
import { BracketsModule } from '../brackets/brackets.module';


@NgModule({
  imports: [HomeRoutingModule,
            SharedModule,
            BracketsModule],
  declarations: [HomeComponent,
                 LoginComponent],
  exports: [HomeComponent]
})
export class HomeModule { }
