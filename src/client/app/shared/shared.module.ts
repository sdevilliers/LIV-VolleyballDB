import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NameListService } from './name-list/name-list.service';
import { TeamService } from './team.service';

/**
 * <div class="text-info bg-info">
 *     This module houses the TeamService and a configuration file that is part of the supporting software
 *     It provides a location for components (like services) that need to be used in multiple modules.
 * </div>
 */
//NOTE: Do not specify providers for modules that might be imported by a lazy loaded module.
@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    FormsModule
  ]

})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [NameListService, TeamService]
    };
  }
}
