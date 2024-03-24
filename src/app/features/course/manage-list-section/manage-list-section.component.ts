import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CourseService } from 'src/app/core/services/catalog/course.service';
import { ToastrService } from 'src/app/core/modules/toastr/toastr.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/vi';
import { CkeditorUploadAdapter } from 'src/app/admin/adapters/ckeditor-upload.adapter';
import { Breadcrumb } from 'src/app/core/components/breadcrumb/breadcrumb.interface';
import { breadcrumbs } from './manage-info-section.config';
import { TextService } from 'src/app/core/services/utilities/text.service';
import { SectionDto } from 'src/app/core/models/interfaces/course/section-dto.interface';
import { CommonStatus } from 'src/app/core/constants/status.constant';

@Component({
  selector: 'app-manage-list-section',
  templateUrl: './manage-list-section.component.html',
  styleUrls: ['./manage-list-section.component.css']
})
export class ManageListSectionComponent {
  //Core
  Status = CommonStatus;

  //Config
  breadcrumb: Breadcrumb[] = breadcrumbs;

  //Filter
  filterTitle: string = '';
  filterStatus: string = '';

  //Course
  title: string = '';
  sectionsState: SectionDto[] = [];
  sections: SectionDto[] = [];

  //Constructor
  constructor(
    private courseService: CourseService, 
    private toastrService: ToastrService,
    private textService:TextService,
    private modalService: BsModalService
    ) {}

  ngOnInit() {
    this.getCourseWithSection();
  }
  
  //Handle
  getCourseWithSection(){
    this.courseService.getCourseWithSection().subscribe((res) => {
      const result = res.data;
      this.title = result?.title as string;
      this.sections = result?.sections as SectionDto[];
      this.sectionsState = result?.sections as SectionDto[];
    });
  };

  //Event
  handleSearchSection(){
    this.sections = this.sectionsState.filter(section => (section.title?.includes(this.filterTitle) || !this.title) && (section.status?.toString() === this.filterStatus || !this.filterStatus));
  }

  //Create section
  public createGroupModuleModalRef?: BsModalRef;
  @ViewChild('createGroupModuleTemplate') createGroupModuleTemplate!: TemplateRef<any>;

  handleOpenCreateSectionModal(){
    this.createGroupModuleModalRef = this.modalService.show(this.createGroupModuleTemplate,
      Object.assign({}, { class: 'modal-dialog modal-lg modal-dialog-scrollable' }));
  
      this.createGroupModuleModalRef.onHidden?.subscribe(() => {
      });
  }

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
