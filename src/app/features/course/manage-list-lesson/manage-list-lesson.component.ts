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
import { Action } from 'src/app/core/enums/action.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-list-lesson',
  templateUrl: './manage-list-lesson.component.html',
  styleUrls: ['./manage-list-lesson.component.css']
})
export class ManageListLessonComponent {
  //Core
  Action = Action;

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

  setDefaultLessonValues(){
    this.lesson = {
      title: '',
      content: null,
      status: true,
      priority: 0,
      sectionId: this.section?.id
     }
  }
  
  validateCreateForm: any = {
     priority: {
       inValidNumber: false,
     }
  }
 
   handleOpenCreateSectionModal(){
    this.lesson.priority = this.section?.lessons?.length + 1;
    this.createModalRef = this.modalService.show(this.createSectionTemplate,
       Object.assign({}, { class: 'modal-dialog modal-lg modal-dialog-scrollable' }));
   
       this.createModalRef.onHidden?.subscribe(() => {
          this.setDefaultLessonValues();
       });
   }

  onPriorityChange(value: number,action: any) {
    if(action === Action.Add){
      if(!this.lesson.priority){
        this.validateCreateForm.priority.inValidNumber = false;
      }

      this.validateCreateForm.priority.inValidNumber = isNaN(value) || value <= 0;
    } else{
      if(!this.lesson.priority){
        this.validateCreateForm.priority.inValidNumber = false;
      }

      this.validateCreateForm.priority.inValidNumber = isNaN(value) || value <= 0;
    }
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

  //Edit lesson
  editModalRef?: BsModalRef;
  @ViewChild('editTemplate') editSectionTemplate!: TemplateRef<any>;

  validateEditForm: any = {
    priority: {
      inValidNumber: false,
    }
  }

  handleOpenEditSectionModal(lesson: any){
    const lessonCopy = { ...lesson };

    this.lesson = lessonCopy;

    this.editModalRef = this.modalService.show(this.editSectionTemplate,
      Object.assign({}, { class: 'modal-dialog modal-lg modal-dialog-scrollable' }));
  
    this.editModalRef.onHidden?.subscribe(() => {
        this.setDefaultLessonValues();
    });
  }

  handleOnSubmitEditSection(){
    this.lessonService.editLesson(this.lesson).subscribe(
      (res) => {
        if(res.status){
          this.toastrService.success(res.message);
          this.editModalRef?.hide();
          this.getLessonBySectionId(this.section.id);
        }
      },
      (exception) => {
        this.toastrService.error(exception.error.Message);
        console.log(exception?.error.Message);
      }
    );
  }

  //Delete section
  handleDeleteSection(id: any){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        cancelButton: "btn btn-danger ml-2",
        confirmButton: "btn btn-success",
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: `Bạn có chắc muốn xoá bài học có Id ${id}?`,
      text: "Sau khi xoá bản sẽ không thể khôi phục dữ liệu!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Bỏ qua",
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        const request = {
          id: +id
        }

        this.lessonService.deleteLesson(request).subscribe((result: any) => {
          if(result.status){           
            swalWithBootstrapButtons.fire({
              title: "Xoá thành công!",
              text: `Bản ghi bài học có Id ${id} đã bị xoá!`,
              icon: "success"
            });
    
            this.getLessonBySectionId(this.section.id);
          }
        },error => {
          this.toastrService.error(error.error.Message);
          console.log(error?.error.Message);
        });
      }
    });
  }
}
