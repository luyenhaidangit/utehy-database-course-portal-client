import { Component, OnInit } from '@angular/core';
import { QuestionCategoryService } from 'src/app/admin/services/apis/question-category.service';
import {
  DndDraggableDirective,
  DndDropEvent,
  DndDropzoneDirective,
  DndHandleDirective,
  DndPlaceholderRefDirective,
  DropEffect,
} from 'ngx-drag-drop';

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

  // Constructor
  constructor(private questionCategoryService: QuestionCategoryService) { }

  // Event
  ngOnInit() {
    this.questionCategoryService.getQuestionCategoryTree().subscribe((result: any) => {
      if(result.status){
        this.questionCategories = result.data;
      }
    });
  }
}
