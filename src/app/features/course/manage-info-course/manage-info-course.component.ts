import { AfterViewInit, Component, OnInit,ChangeDetectorRef, ChangeDetectionStrategy, AfterViewChecked  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService as NgxToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/vi';
import { classicEditorConfig } from 'src/app/admin/configs/ckeditor.config';
import systemConfig from 'src/app/admin/configs/system.config';
import { CkeditorUploadAdapter } from 'src/app/admin/adapters/ckeditor-upload.adapter';
import { CourseService } from 'src/app/core/services/catalog/course.service';

@Component({
  selector: 'app-manage-info-course',
  templateUrl: './manage-info-course.component.html',
  styleUrls: ['./manage-info-course.component.css']
})
export class ManageInfoCourseComponent {
  //Prepare
  constructor(
    private formBuilder: FormBuilder, 
    private courseService: CourseService,
    private cdref: ChangeDetectorRef,
    private router:Router
  ) 
  {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.courseService.getCourse().subscribe((result: any) => {
      if(result.status){
        this.course = {...result.data,base64Image: '', base64Video: ''};
      }
    });
  }

  getInfoCourse(){
    this.courseService.getCourse().subscribe((result: any) => {
      console.log("log",result);
    });
  };

  ngAfterViewChecked() {
    this.cdref.detectChanges();
  }

  //Course info
  form: FormGroup;
  course: any = {
    title: '',
    content: '',
    imageFile: null,
    base64Image: '',
    imageUrl: '',
    typeVideo: 1,
    videoUrl: '',
    base64Video: '',
  }

  //Ckeditor
  config: any = {
    classicEditorConfig: classicEditorConfig,
    system: systemConfig
  };
  classicEditor = ClassicEditor;

  onReady(editor: ClassicEditor): void {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
        return new CkeditorUploadAdapter( loader );
    };
  }

  handleChangeQuestionAnswer(event: any,course: any,type: number) {
    if(!course || !event || !type){
      return;
    }

    const data = event.editor.getData();

    if(type === 1){
      course.description = data;
    } else if(type === 2){
      course.content = data;
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
