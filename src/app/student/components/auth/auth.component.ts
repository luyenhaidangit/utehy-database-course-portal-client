import {
  Component,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthComponent {
  modalRef?: BsModalRef;
  @ViewChild('template') template!: TemplateRef<any>;

  constructor(private modalService: BsModalService) {}

  openModal() {
    this.modalRef = this.modalService.show(this.template);
  }

  closeModal() {
    this.modalRef?.hide();
  }
}
