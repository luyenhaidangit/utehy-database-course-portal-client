import { Component } from '@angular/core';
import { CourseService } from 'src/app/core/services/catalog/course.service';
import { ToastrService } from 'src/app/core/modules/toastr/toastr.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/vi';
import systemConfig from 'src/app/admin/configs/system.config';
import { CkeditorUploadAdapter } from 'src/app/admin/adapters/ckeditor-upload.adapter';
import { Breadcrumb } from 'src/app/core/components/breadcrumb/breadcrumb.interface';
import { breadcrumbs } from './manage-info-section.config';
import { Course } from 'src/app/core/models/course/course.model';
import { classicEditorConfig } from 'src/app/core/configs/ckeditor.config';
import { TextService } from 'src/app/core/services/utilities/text.service';
import { SectionDto } from 'src/app/core/models/interfaces/course/section-dto.interface';

@Component({
  selector: 'app-manage-list-section',
  templateUrl: './manage-list-section.component.html',
  styleUrls: ['./manage-list-section.component.css']
})
export class ManageListSectionComponent {
  //Config
  breadcrumb: Breadcrumb[] = breadcrumbs;
  classicEditor = ClassicEditor;
  classicEditorConfig: any = classicEditorConfig;

  //Course
  title: string = '';
  sections: SectionDto[] = [];

  //Constructor
  constructor(private courseService: CourseService, private toastrService: ToastrService,private textService:TextService) {}

  ngOnInit() {
    this.getCourseWithSection();
  }

  getCourseWithSection(){
    this.courseService.getCourseWithSection().subscribe((res) => {
      const result = res.data;
      this.title = result?.title as string;
      this.sections = result?.sections as SectionDto[];
    });
  };

  //Ckeditor
  initEditor(editor: ClassicEditor){
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
      return new CkeditorUploadAdapter( loader );
    };
  }

  //Ckeditor
  // config: any = {
  //   classicEditorConfig: classicEditorConfig,
  //   system: systemConfig
  // };

  // handleSubmitForm(){
  //   this.courseService.editCourse(this.course).subscribe(
  //     (res) => {
  //       if(res.status){
  //         this.toastrService.success(res.message);
  //       }
  //     },
  //     (exception) => {
  //       this.toastrService.error(exception.error.Message);
  //       console.log(exception?.error.Message);
  //     }
  //   );
  // }

  // handleGetSlugFromTitle(event: any){
  //   this.course.slug = this.textService.convertToSlug(event);
  // }
}
