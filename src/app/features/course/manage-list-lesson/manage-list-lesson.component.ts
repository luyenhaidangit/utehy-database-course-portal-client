import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb } from 'src/app/core/components/breadcrumb/breadcrumb.interface';
import { breadcrumbs } from './manage-list-lesson.config';
import { SectionService } from 'src/app/core/services/catalog/section.service';

@Component({
  selector: 'app-manage-list-lesson',
  templateUrl: './manage-list-lesson.component.html',
  styleUrls: ['./manage-list-lesson.component.css']
})
export class ManageListLessonComponent {
  //Config
  breadcrumb: Breadcrumb[] = breadcrumbs;

  //State
  section: any;

  constructor(private route: ActivatedRoute, private sectionService: SectionService) {}

  ngOnInit() {
    this.handleRouteParamsChange();
  }

  //Action
  handleRouteParamsChange(){
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      
      this.getSectionWithLesson(id);
    });
  }

  getSectionWithLesson(id: any){
    this.sectionService.getSectionWithLesson(id).subscribe((res) => {
      this.section = res?.data;
    });
  }
}
