import {Injectable} from "@angular/core";
import {Apollo, gql } from "apollo-angular";
import {BehaviorSubject, Observable} from "rxjs";

export type User = {
  login: {
    name: string,
    email: string,
    company: string
  }
}

type LoginInput = {
  email: string,
  password: string,
}

export const defaultUserValue: User = {
  login: {
    name: 'Unknown',
    email: 'Not provided',
    company: 'Not provided'
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apollo: Apollo) {}

  private user$ = new BehaviorSubject<User>(defaultUserValue);

  get user(): Observable<User> {
    return this.user$.asObservable();
  }

  set user(user: User) {
    this.user$.next(user)
  }

  login({email, password}: any) {
    return this.apollo.mutate<User, LoginInput>({
      mutation: gql`
        mutation Login($email: String, $password: String) {
          login(email: $email, password: $password) {
            name
            email
            company
          }
        }
      `,
      variables: { email, password },
    })
  }

  logout() {
    this.user$.next(defaultUserValue)
  }
}
