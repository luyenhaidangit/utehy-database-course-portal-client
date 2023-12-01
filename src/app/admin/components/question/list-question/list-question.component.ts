import { Component, OnInit } from '@angular/core';
import { QuestionCategoryService } from 'src/app/admin/services/apis/question-category.service';

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.css']
})
export class ListQuestionComponent implements OnInit {
  //Collapse
  collapseFilter: any = {
    questionCategory: false,
  };

  questionCategories: any = [];

  constructor(private questionCategoryService: QuestionCategoryService) { }

  ngOnInit() {
    this.questionCategoryService.getQuestionCategoryTree().subscribe((result: any) => {
      if(result.status){
        this.questionCategories = result.data;
      }
    });
  }
}
