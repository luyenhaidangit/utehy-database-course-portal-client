import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService as NgxToastrService } from 'ngx-toastr';
import { LessonService } from 'src/app/admin/services/apis/lesson.service';
import { DEFAULT_PER_PAGE_OPTIONS, DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from 'src/app/admin/configs/paging.config';

@Component({
  selector: 'app-content-course',
  templateUrl: './content-course.component.html',
  styleUrls: ['./content-course.component.css']
})
export class ContentCourseComponent {
  //Init
  constructor(
      private route: ActivatedRoute, private router: Router, 
      private ngxToastr: NgxToastrService,
      private lessonService: LessonService
    ) 
    { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const request = {
        ...params,
        pageIndex: params['pageIndex'] ? params['pageIndex'] : DEFAULT_PAGE_INDEX,
        pageSize: params['pageSize'] ? params['pageSize'] : DEFAULT_PAGE_SIZE,
      };

      this.getLessons(request);
    });
  }

  //Lessons
  public lessons: any[] = [];

  public config: { [key: string]: any, perPageOptions: any[] } = { perPageOptions: DEFAULT_PER_PAGE_OPTIONS };

  getLessons(request: any) {
    this.lessonService.getLessons(request).subscribe((result: any) => {
      if(result.status){
        if(request.pageIndex !== 1 && result.data.items.length === 0){
          this.route.queryParams.subscribe(params => {
            const request = {
              ...params,
              pageIndex: 1,
            };
      
            this.router.navigate([], {
              relativeTo: this.route,
              queryParams: request,
              queryParamsHandling: 'merge',
            });
          });
        }

        this.lessons = result.data.items;
      }
    });
  }
}
