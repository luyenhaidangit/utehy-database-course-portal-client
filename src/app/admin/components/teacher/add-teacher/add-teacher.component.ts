import { Component, OnInit } from '@angular/core';
import { ToastrService as NgxToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {
  //Data
  public teacher: any = {
    teacherId: '',
    name: '',
    email: '',
    phone: '',
    verificationType: 2,
    status: true,
  };

  constructor(private ngxToastr: NgxToastrService) { }

  ngOnInit() {
    
  }

  onSubmit(){
    console.log(this.teacher);
  }

  validVerificationType(): number {
    if (this.teacher.verificationType === 2) {
        if (!this.teacher.email) {
            return -1;
        } else {
            return 1;
        }
    } else {
      if (!this.teacher.phone) {
        return -2;
      } else {
        return 1;
      }
    }
  }
}
