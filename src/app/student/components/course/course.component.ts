import { Component, ViewChild } from '@angular/core';
import { ToastrService as NgxToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CourseService } from '../../services/api/course.service';
import systemConfig from 'src/app/admin/configs/system.config';
import { AuthComponent } from '../auth/auth.component';
import { AuthService } from '../../services/api/auth.service';
import { SharedComponentService } from '../../services/components/shared-component.service';
import permissionConstant from 'src/app/shared/constants/permisson.constant';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent {
  //Init
  public isInitialized: boolean = false;
  
  public config: any = {
    system: systemConfig
  };

  public constant: any = {
    permisson: permissionConstant
  };

  constructor(
    private route: ActivatedRoute, private router: Router, 
    private ngxToastr: NgxToastrService,
    private courseService: CourseService,
    private modalService: BsModalService, 
    public authService: AuthService,
    public sharedComponentService: SharedComponentService
  ) 
  { }

  public ngOnInit() {
    console.log("auth",this.authService.isAuthenticated);
    // alert(this.authService.isAuthenticated);
    if(!this.authService.isAuthenticated){
      this.getCourse();
    } else{
      const slug = this.route.snapshot.paramMap.get('slug');

      const request = {
        slug: slug
      };

      this.getCourseLearningUser(request);
    }
  }

  //Course
  public course: any = {
  };

  private getCourse() {
    this.courseService.getCourseDatabase().subscribe((result: any) => {
      if(result.status){
        this.isInitialized = true;

        this.course = result.data;

        if(this.course.lessons.length > 0){
          this.course.lessons[0].collapse = true;
        }

        this.course.numberLessonContent = this.getTotalNumberOfContents(this.course);

        this.course.totalEstimatedStudyTime = this.getTotalEstimatedStudyTime(this.course);
      }
    },
    (error) => {
      console.log("Xảy ra lỗi", error);
      this.isInitialized = false;
    });
  }

  private getCourseLearningUser(request: any) {
    this.courseService.getCourseLearningUser(request).subscribe((result: any) => {
      if(result.status){
        this.isInitialized = true;

        this.course = result.data;

        if(this.course.lessons.length > 0){
          this.course.lessons[0].collapse = true;
        }

        this.course.numberLessonContent = this.getTotalNumberOfContents(this.course);

        this.course.totalEstimatedStudyTime = this.getTotalEstimatedStudyTime(this.course);
      }
    },
    (error) => {
      console.log("Xảy ra lỗi", error);
      this.isInitialized = false;
    });
  }

  private getTotalNumberOfContents(course: any): number {
    let totalContents = 0;

    if (course && course.lessons) {
      for (const lesson of course.lessons) {
        totalContents += lesson.lessonContents ? lesson.lessonContents.length : 0;
      }
    }

    return totalContents;
  }

  private getTotalEstimatedStudyTime(course: any): string {
    let totalHours = 0;
    let totalMinutes = 0;
  
    if (course && course.lessons) {
      for (const lesson of course.lessons) {
        if (lesson.lessonContents) {
          for (const content of lesson.lessonContents) {
            const timeSpan = this.parseTimeSpan(content.estimatedStudyTime);
            totalHours += timeSpan.hours;
            totalMinutes += timeSpan.minutes;
          }
        }
      }
    }
  
    const formattedTime = this.formatTime(totalHours, totalMinutes);
    return formattedTime;
  }

  private parseTimeSpan(value: string): { hours: number, minutes: number, seconds: number } {
    const parts = value.split(':');
    return {
      hours: parseInt(parts[0], 10),
      minutes: parseInt(parts[1], 10),
      seconds: parseInt(parts[2], 10)
    };
  }

  private formatTime(hours: number, minutes: number): string {
    if (hours > 0) {
      return `${hours} giờ ${minutes} phút`;
    } else {
      return `${minutes} phút`;
    }
  }

  public areAllLessonsCollapsed(): boolean {
    return this.course.lessons.every((lesson: any) => lesson.collapse);
  }

  public handleOnCollapseAllLesson(type: boolean) {
    this.course.lessons.forEach((lesson: any) => (lesson.collapse = type));
  }

  //Register course
  @ViewChild(AuthComponent) authComponent!: AuthComponent;

  public handleOnRegisterCourse(){
    if(!this.authService.isAuthenticated){
      this.authComponent.openModal();
    }else{
      if(!this.course.isRegister){
        const slug = this.route.snapshot.paramMap.get('slug');
  
        const request = {
          slug: slug
        };
  
        this.courseService.registerCourseStudent(request).subscribe((result: any) => {
          if(result.status){
            this.getCourseLearningUser(request);
          }
        },
        (error) => {
          console.log("Xảy ra lỗi", error);
          this.isInitialized = false;
        });
      }
    }
  }
}
