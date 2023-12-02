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

  activeCategoryId: number = 0;

  toggleCategory(event: Event, category: any): void {
    event.stopPropagation();
    console.log(category.id);
    // this.activeCategoryId = category.id;
    category.isExpanded = !category.isExpanded;
  }

  questionCategories: any = [];

  constructor(private questionCategoryService: QuestionCategoryService) { }

  ngOnInit() {
    this.questionCategoryService.getQuestionCategoryTree().subscribe((result: any) => {
      if(result.status){
        this.questionCategories = result.data;
        console.log(this.questionCategories);
      }
    });
  }

  onDragged(item: any, list: any[], effect: DropEffect) {
    if (effect === 'move') {
      const index = list.indexOf(item);
      list.splice(index, 1);
    }
  }

  onDrop(event: DndDropEvent, list?: any[]) {
    console.log('onDrop', event, list);

    if (list && (event.dropEffect === 'copy' || event.dropEffect === 'move')) {
      let index = event.index;

      if (typeof index === 'undefined') {
        index = list.length;
      }

      list.splice(index, 0, event.data);
    }
  }
}
