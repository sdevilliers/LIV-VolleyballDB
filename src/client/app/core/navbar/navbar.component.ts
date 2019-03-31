import { Component } from '@angular/core';

/**
 * <div class="text-info bg-info">
 *     This Component is visible from all screens.
 *     It allows for user navigation between the BracketsComponent, TeamDetailComponent, and AboutComponent.
 * </div>
 */
@Component({
  moduleId: module.id,
  selector: 'sd-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
})
export class NavbarComponent { }
