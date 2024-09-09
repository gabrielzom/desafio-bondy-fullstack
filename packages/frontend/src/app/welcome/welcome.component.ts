import {Component, OnDestroy, OnInit} from "@angular/core";
import {RouterLink} from "@angular/router";
import {AuthService, defaultUserValue, User} from "../services/auth.service";
import {Subscription} from "rxjs";

@Component({
  standalone: true,
  templateUrl: 'welcome.component.html',
  imports: [RouterLink],
  styleUrls: ['welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  user: User = defaultUserValue
  subscriptions: Subscription[] = []

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.authService.user.subscribe(user => this.user = user)
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
    this.authService.logout()
  }

}
