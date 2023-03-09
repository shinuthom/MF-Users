import { Component, Inject } from '@angular/core';

import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { filter, fromEvent, map, Observable, shareReplay } from 'rxjs';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  constructor(private oktaStateService: OktaAuthStateService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private userServiceService: UserServiceService) { }
  public name: any = '';
  message = '';
  cart = 0;
  
  ngOnInit() {
    fromEvent(window, 'event1').subscribe((event1:any) => {
      this.userServiceService.setMsg(event1.detail)
    });
    this.message = this.userServiceService.getMsg();
  }
  incrementCount() {
    this.cart = this.cart + 1;
    const event = new CustomEvent('event', { detail: this.cart});
    dispatchEvent(event);
  }
  public isAuthenticated$: Observable<boolean> = this.oktaStateService.authState$
  .pipe(
      filter(authState => !!authState),
      map(authState => authState.isAuthenticated ?? false),
      shareReplay()
  );

public name$: Observable<string> = this.oktaStateService.authState$
  .pipe(
      filter(authState => !!authState && !!authState.isAuthenticated),
      map(authState => authState.idToken?.claims.name ?? '')
  );
}
