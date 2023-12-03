import { Component, Input, Output, EventEmitter } from '@angular/core';
import { QuestionCategoryTreeService } from 'src/app/admin/services/components/question-category-tree.service';

@Component({
  selector: 'app-question-category-tree',
  templateUrl: './question-category-tree.component.html',
  styleUrls: ['./question-category-tree.component.css']
})
export class QuestionCategoryTreeComponent {
  @Input() categories: any[] = [];
  @Input() categoriesSelect: any[] = [];
  @Input() activeCategoryId: number = 0;
  @Input() activeCategoryIdSelect: number = 0;
  @Input() type: number = 0;
  @Output() menuClicked: any = new EventEmitter<number>();

  constructor(public questionCategoryTreeService: QuestionCategoryTreeService) {}

  activeId: number = 0;

  // toggleCategory(event: Event, category: any): void {
  //   event.stopPropagation();
  //   this.activeCategoryId = category.id;
  //   category.isExpanded = !category.isExpanded;
  //   console.log(category.id);
  //   this.menuClicked.emit(category.id);
  //   console.log("ok",category.id);
  //   console.log("l",this.activeId);
  // }

  handleOnClickMenu(event: any, category: any){
    event.stopPropagation();
    category.isExpanded = !category.isExpanded;
    this.questionCategoryTreeService.setActiveCategoryId(category.id);
  }

  handleOnClickMenuSelect(event: any, category: any){
    event.stopPropagation();
    console.log("cs",this.categoriesSelect,"ff",category.id,'f',this.questionCategoryTreeService.activeCategoryIdSelect)
    category.isExpanded = !category.isExpanded;
    this.questionCategoryTreeService.setActiveCategoryIdSelect(category.id);
  }
}
