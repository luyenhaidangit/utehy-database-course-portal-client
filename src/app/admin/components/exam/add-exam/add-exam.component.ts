import animationConstant from '../../../constants/animation.constant';
import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { ToastrService as NgxToastrService } from 'ngx-toastr';
import { TeacherService } from 'src/app/admin/services/apis/teacher.service';
import { Router } from '@angular/router';
import questionConstant from 'src/app/admin/constants/question.constant';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { classicEditorConfig } from 'src/app/admin/configs/ckeditor.config';
import '@ckeditor/ckeditor5-build-classic/build/translations/vi';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { QuestionCategoryService } from 'src/app/admin/services/apis/question-category.service';
import { AddQuestionCategoryTreeService } from 'src/app/admin/services/components/add-question-category-tree.service';
import { TagService } from 'src/app/admin/services/apis/tag.service';
import { QuestionService } from 'src/app/admin/services/apis/question.service';
import { SectionService } from 'src/app/admin/services/apis/section.service';
import { GroupModuleService } from 'src/app/admin/services/apis/group-module.service';


@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css'],
  animations: animationConstant.animations

})
export class AddExamComponent {


  constructor(
    private ngxToastr: NgxToastrService,private teacherService: TeacherService,
    private router:Router,private modalService: BsModalService, 
    private questionCategoryService: QuestionCategoryService,
    public addQuestionCategoryTreeService: AddQuestionCategoryTreeService,
    private questionService: QuestionService,
    private sectionService: SectionService,
    private groupModuleService: GroupModuleService

  ) { }

  ngOnInit() {

    this.getSections({sortBy: 'asc'});
    this.getGroupModules({sortBy: 'asc'});

  }







  public sections: any = [];
  public groupmodules: any = [];

  public exam: any = [];


  public validateFormSuccess: any = {
    touchSection: false,
    touchDiff: false
  }

  public getSections(request: any): void{
    this.sectionService.getSections(request).subscribe((result: any) => {
      if(result.status){
        this.sections = result.data.items;
      }
    });
  }
  public getGroupModules(request: any): void{
    this.groupModuleService.getGroupModules(request).subscribe((result: any) => {
      if(result.status){
        this.groupmodules = result.data.items;
      }
    });
  }
}
