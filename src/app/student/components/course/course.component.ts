import { Component } from '@angular/core';
import { ToastrService as NgxToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/api/course.service';
import { InitService } from '../../services/utilities/init.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent {
  //Init
  public isInitialized: boolean = false;

  constructor(
    private route: ActivatedRoute, private router: Router, 
    private ngxToastr: NgxToastrService,
    private courseService: CourseService,
    private initService: InitService
  ) 
  { }

  public ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.getCourse();
    });
  }

  //Course
  public course: any = {
  };

  private getCourse() {
    this.courseService.getCourseDatabase().subscribe((result: any) => {
      if(result.status){
        this.isInitialized = true;

        this.course = result.data;
      }
    },
    (error) => {
      console.log("Xảy ra lỗi", error);
      this.isInitialized = false;
    });
  }
}
