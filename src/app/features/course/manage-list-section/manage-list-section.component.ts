import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CourseService } from 'src/app/core/services/catalog/course.service';
import { ToastrService } from 'src/app/core/modules/toastr/toastr.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/vi';
import { CkeditorUploadAdapter } from 'src/app/admin/adapters/ckeditor-upload.adapter';
import { classicEditorConfig } from 'src/app/core/configs/ckeditor.config';
import { Breadcrumb } from 'src/app/core/components/breadcrumb/breadcrumb.interface';
import { breadcrumbs } from './manage-info-section.config';
import { TextService } from 'src/app/core/services/utilities/text.service';
import { SectionDto } from 'src/app/core/models/interfaces/course/section-dto.interface';
import { CommonStatus } from 'src/app/core/constants/status.constant';
import { SectionField } from './manage-list-section.enum';
import { SectionService } from 'src/app/core/services/catalog/section.service';

@Component({
  selector: 'app-manage-list-section',
  templateUrl: './manage-list-section.component.html',
  styleUrls: ['./manage-list-section.component.css']
})
export class ManageListSectionComponent {
  //Core
  Status = CommonStatus;

  //Identifier
  SectionField = SectionField;

  //Config
  breadcrumb: Breadcrumb[] = breadcrumbs;
  classicEditor = ClassicEditor;
  classicEditorConfig: any = classicEditorConfig;

  //Filter
  filterTitle: string = '';
  filterStatus: string = '';

  //Course
  title: string = '';
  sectionsState: SectionDto[] = [];
  sections: any = [];

  //Section
  section: any = {
    title: '',
    description: '',
    status: true,
    priority: 0
  };

  //Constructor
  constructor(
    private courseService: CourseService, 
    private toastrService: ToastrService,
    private modalService: BsModalService,
    private sectionService: SectionService
    ) {}

  ngOnInit() {
    this.getCourseWithSection();
  }
  
  //Handle
  getCourseWithSection(){
    this.sectionService.getAllSection().subscribe((res) => {
      this.sections = res?.data;
      this.sectionsState = res?.data;
    });
  };

  //Event
  handleSearchSection(){
    this.sections = this.sectionsState.filter(section => (section.title?.includes(this.filterTitle) || !this.title) && (section.status?.toString() === this.filterStatus || !this.filterStatus));
  }

  //Create section
  createModalRef?: BsModalRef;
  @ViewChild('createTemplate') createSectionTemplate!: TemplateRef<any>;
  validateCreateForm: any = {
    priority: {
      inValidNumber: false,
    }
  }

  handleOpenCreateSectionModal(){
    this.section.priority = this.sections.length + 1;
    this.createModalRef = this.modalService.show(this.createSectionTemplate,
      Object.assign({}, { class: 'modal-dialog modal-lg modal-dialog-scrollable' }));
  
      this.createModalRef.onHidden?.subscribe(() => {
        this.section = {
          title: '',
          description: '',
          status: true,
          priority: 0
        };
      });
  }

  handleChangeDataCkeditor(event: any,object: any,type: number) {
    if(!event || !object || !type){
      return;
    }

    const data = event.editor.getData();

    if(type === SectionField.Description){
      object.description = data;
    }
  }

  initEditor(editor: ClassicEditor){
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
      return new CkeditorUploadAdapter( loader );
    };
  }

  onPriorityChange(value: number) {
    if(!this.section.priority){
      this.validateCreateForm.priority.inValidNumber = false;
    }
    this.validateCreateForm.priority.inValidNumber = isNaN(value) || value <= 0;
  }

  handleOnSubmitCreateSection(){
    this.sectionService.createSection(this.section).subscribe(
      (res) => {
        if(res.status){
          this.toastrService.success(res.message);
          this.createModalRef?.hide();
          this.getCourseWithSection();
        }
      },
      (exception) => {
        this.toastrService.error(exception.error.Message);
        console.log(exception?.error.Message);
      }
    );
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
