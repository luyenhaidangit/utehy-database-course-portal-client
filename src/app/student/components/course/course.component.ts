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
}
