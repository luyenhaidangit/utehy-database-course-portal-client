import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { QuestionCategoryService } from 'src/app/admin/services/apis/question-category.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import questionCategoryConstant from 'src/app/admin/constants/question-category.constant';
import { ToastrService as NgxToastrService } from 'ngx-toastr';
import { QuestionCategoryTreeService } from 'src/app/admin/services/components/question-category-tree.service';

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.css']
})
export class ListQuestionComponent implements OnInit {
  //Collapse
  questionCategoryConstant: any = questionCategoryConstant;
  collapseFilter: any = {
    questionCategory: false,
  };
  questionCategorySearch = '';
  questionCategories: any = [];
  questionCategoriesSelect: any = [];

  //Modal
  createQuestionCategoryModalRef?: BsModalRef;
  @ViewChild('createQuestionCategoryTemplate') createQuestionCategoryTemplate!: TemplateRef<any>;
  questionCategory: any = {
    name: '',
    description: '',
    priority: 0,
    parentQuestionCategoryId: null
  };

  // Constructor
  constructor(private ngxToastr: NgxToastrService,private questionCategoryService: QuestionCategoryService, private modalService: BsModalService, private questionCategoryTreeService: QuestionCategoryTreeService) { }

  // Event
  ngOnInit() {
    this.getQuestionCategoryTree();
  }

  //Action
  getQuestionCategoryTree(){
    this.questionCategoryService.getQuestionCategoryTree().subscribe((result: any) => {
      if(result.status){
        this.questionCategories = result.data;
      }
    });
  }

  handleOnClickCreateQuestionCategoryButton(){
    this.questionCategory = {
      name: '',
      description: '',
      priority: 0,
      parentQuestionCategoryId: null
    };
    this.questionCategoryService.getQuestionCategoryTree().subscribe((result: any) => {
      if(result.status){
        const filteredArray = result.data.filter((item: any) => item.id !== null && item.id !== 0);
        this.questionCategoriesSelect = [
          {
            id: 0,
            name: 'Tất cả',
            questionCategories: filteredArray
          }
        ]
      }
    });

    this.createQuestionCategoryModalRef = this.modalService.show(this.createQuestionCategoryTemplate,
    Object.assign({}, { class: 'modal-dialog modal-dialog-scrollable' }));
  }

  handleOnCloseCreateQuestionCategoryModal() {
    this.createQuestionCategoryModalRef?.hide();
  }

  handleOnSubmitCreateQuestionCategoryForm(){
    const request = { ...this.questionCategory, parentQuestionCategoryId: this.questionCategoryTreeService.activeCategoryIdSelect === 0 ? null : this.questionCategoryTreeService.activeCategoryIdSelect }; 

    this.questionCategoryService.createQuestionCategory(request).subscribe((result: any) => {
      if(result.status){
        this.ngxToastr.success(result.message,'',{
          progressBar: true
        });
        this.getQuestionCategoryTree();
        this.createQuestionCategoryModalRef?.hide();
      }
    },error => {
      console.log(error);
      this.ngxToastr.error(error.error.message,'',{
        progressBar: true
      });
    });
  }
}
