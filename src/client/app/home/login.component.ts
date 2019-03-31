import { Component, OnInit } from '@angular/core';

/**
 * <div class="col-md text-danger bg-warning">NOT CURRENTLY FUNCTIONAL. TO BE INCORPORATED IN FUTURE VERSIONS.</div>
 * <div class="text-info bg-info">
 *     This component is a future feature for additional security
 * </div>
 */
@Component({
  moduleId: module.id,
  selector: 'vb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() {
    console.log('LoginComponent.ctor');
  }

  ngOnInit() {
    console.log('LoginComponent.init');
  }

}
