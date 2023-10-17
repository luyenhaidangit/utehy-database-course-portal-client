import { Component, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AuthComponent } from 'src/app/student/components/auth/auth.component';
import { AuthService } from 'src/app/student/services/api/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild(AuthComponent) authComponent!: AuthComponent;
  public readonly _authService: AuthService;

  constructor(public authService: AuthService ) {
    this._authService = authService;
  }
}
