import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { QuestionCategoryService } from 'src/app/admin/services/apis/question-category.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import questionCategoryConstant from 'src/app/admin/constants/question-category.constant';
import { FormsModule } from '@angular/forms';

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
    name: ''
  };

  // Constructor
  constructor(private questionCategoryService: QuestionCategoryService, private modalService: BsModalService) { }

  // Event
  ngOnInit() {
    this.questionCategoryService.getQuestionCategoryTree().subscribe((result: any) => {
      if(result.status){
        this.questionCategories = result.data;
      }
    });
  }

  //Action
  handleOnClickCreateQuestionCategoryButton(){
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

  }
}
