import { AfterViewInit, Component, OnInit,ChangeDetectorRef, ChangeDetectionStrategy, AfterViewChecked  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService as NgxToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/vi';
import systemConfig from 'src/app/admin/configs/system.config';
import { CkeditorUploadAdapter } from 'src/app/admin/adapters/ckeditor-upload.adapter';
import { CourseService } from 'src/app/core/services/catalog/course.service';
import { Breadcrumb } from 'src/app/core/components/breadcrumb/breadcrumb.interface';
import { breadcrumbs } from './manage-info-course.config';
import { Course } from 'src/app/core/models/course/course.model';
import { classicEditorConfig } from 'src/app/core/configs/ckeditor.config';
import { CourseField } from './manage-info-course.enum';

@Component({
  selector: 'app-manage-info-course',
  templateUrl: './manage-info-course.component.html',
  styleUrls: ['./manage-info-course.component.css']
})
export class ManageInfoCourseComponent {
  //Identifier
  CourseField = CourseField;

  //Config
  breadcrumb: Breadcrumb[] = breadcrumbs;
  classicEditor = ClassicEditor;
  classicEditorConfig: any = classicEditorConfig;

  //Course
  course: Course = new Course();

  //Prepare
  constructor(private fb: FormBuilder, private courseService: CourseService,private cdref: ChangeDetectorRef, private router:Router) {}

  ngOnInit() {
    this.getInfoCourse();
  }

  getInfoCourse(){
    this.courseService.getCourse().subscribe((result) => {
      this.course = result.data as Course;
    });
  };

  ngAfterViewChecked() {
    this.cdref.detectChanges();
  }

  //Course info
  // form: FormGroup;
  // course: any = {
  //   title: '',
  //   content: '',
  //   imageFile: null,
  //   base64Image: '',
  //   imageUrl: '',
  //   typeVideo: 1,
  //   videoUrl: '',
  //   base64Video: '',
  // }
  
  //Ckeditor
  initEditor(editor: ClassicEditor){
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
      return new CkeditorUploadAdapter( loader );
    };
  }

  //Ckeditor
  config: any = {
    classicEditorConfig: classicEditorConfig,
    system: systemConfig
  };

  handleChangeDataCkeditor(event: any,object: any,type: number) {
    if(!event || !object || !type){
      return;
    }

    const data = event.editor.getData();

    if(type === CourseField.Description){
      object.description = data;
    } else if(type === CourseField.Content){
      object.content = data;
    }
  }

  handleChangeImage(event: any) {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.course.base64Image = e.target.result;
      };
  
      reader.readAsDataURL(file);
  
      this.course.imageFile = file;
    }
  }

  handleChangeQuestionAnswer(event: any,question: any,type: number,index: any = null) {
    const data = event.editor.getData();

    if(type === 1){
      question.description = data;

     
    }else if(type === 2){
      question.content = data;

      
    }else{
      question.feedback = data;
    }
  }

  handleChangeVideo(event: any){
    const file = event.target.files[0];
    if (file) {
      this.convertVideoToBase64(file);
    }
  }

  convertVideoToBase64(file: File): void {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.course.base64Video = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  // handleSubmitForm(){
  //   this.courseService.editCourseDatabase(this.course).subscribe((result: any) => {
  //     if(result.status){
  //       // this.ngxToastr.success(result.message,'',{
  //       //   progressBar: true
  //       // });
  //     }
  //   },error => {
  //     console.log(error);
  //     // this.ngxToastr.error(error.error.message,'',{
  //     //   progressBar: true
  //     // });
  //   });
  // }
}
