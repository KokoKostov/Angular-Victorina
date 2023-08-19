import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  hasUser: boolean = false;
  user: User | null = null;

  constructor(
    private afAuth: AngularFireAuth,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = {
          uid: user.uid,
          displayName: user.displayName!,
          email: user.email!,
        };

        this.hasUser = true;
      } else {
        this.user = null;
        this.hasUser = false;
      }
    });
  }
}
