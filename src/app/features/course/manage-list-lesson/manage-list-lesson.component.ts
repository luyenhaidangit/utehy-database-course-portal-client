import { Component,TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Breadcrumb } from 'src/app/core/components/breadcrumb/breadcrumb.interface';
import { breadcrumbs } from './manage-list-lesson.config';
import { SectionService } from 'src/app/core/services/catalog/section.service';
import { classicEditorConfig } from 'src/app/core/configs/ckeditor.config';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/vi';
import { CkeditorUploadAdapter } from 'src/app/admin/adapters/ckeditor-upload.adapter';
import { ToastrService } from 'src/app/core/modules/toastr/toastr.service';
import { LessonService } from 'src/app/core/services/catalog/lesson.service';

@Component({
  selector: 'app-manage-list-lesson',
  templateUrl: './manage-list-lesson.component.html',
  styleUrls: ['./manage-list-lesson.component.css']
})
export class ManageListLessonComponent {
  //Config
  breadcrumb: Breadcrumb[] = breadcrumbs;
  classicEditor = ClassicEditor;
  classicEditorConfig: any = classicEditorConfig;

  //State
  section: any = {
    id: 0,
    title: '',
    lessons: []
  };

  constructor(
    private route: ActivatedRoute, 
    private sectionService: SectionService,
    private lessonService: LessonService,
    private modalService: BsModalService,
    private toastrService: ToastrService,
    ) {}

  ngOnInit() {
    this.handleRouteParamsChange();
  }

  //Action
  updateBreadcrumb(){
    
  }

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

  getLessonBySectionId(id: any){
    this.lessonService.getLessonBySectionId(id).subscribe((res) => {
      this.section.lessons = res?.data;
    });
  }

  //Create lesson
  lesson: any = {
    title: '',
    content: null,
    status: true,
    priority: 0,
    sectionId: 0
  };
  createModalRef?: BsModalRef;
  @ViewChild('createTemplate') createSectionTemplate!: TemplateRef<any>;
  validateCreateForm: any = {
     priority: {
       inValidNumber: false,
     }
  }
 
   handleOpenCreateSectionModal(){
     this.createModalRef = this.modalService.show(this.createSectionTemplate,
       Object.assign({}, { class: 'modal-dialog modal-lg modal-dialog-scrollable' }));
   
       this.createModalRef.onHidden?.subscribe(() => {
         this.lesson = {
          title: '',
          content: null,
          status: true,
          priority: 0,
          sectionId: this.section?.id
         }
       });
   }

   onPriorityChange(value: number) {
    if(!this.section.priority){
      this.validateCreateForm.priority.inValidNumber = false;
    }
    this.validateCreateForm.priority.inValidNumber = isNaN(value) || value <= 0;
  }

  handleChangeDataCkeditor(event: any,object: any) {
    if(!event || !object){
      return;
    }

    const data = event.editor.getData();

    object.content = data;
  }

  initEditor(editor: ClassicEditor){
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
      return new CkeditorUploadAdapter( loader );
    };
  }

  handleOnSubmitCreateSection(){
    this.lesson.sectionId = this.section?.id;
    this.lessonService.createLesson(this.lesson).subscribe(
      (res) => {
        if(res.status){
          this.toastrService.success(res.message);
          this.createModalRef?.hide();
          this.getLessonBySectionId(this.section.id);
        }
      },
      (exception) => {
        this.toastrService.error(exception.error.Message);
        console.log(exception?.error.Message);
      }
    );
  }
}
