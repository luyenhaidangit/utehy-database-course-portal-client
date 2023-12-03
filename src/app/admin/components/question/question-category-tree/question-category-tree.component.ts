import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { QuestionCategoryTreeService } from 'src/app/admin/services/components/question-category-tree.service';

@Component({
  selector: 'app-question-category-tree',
  templateUrl: './question-category-tree.component.html',
  styleUrls: ['./question-category-tree.component.css']
})
export class QuestionCategoryTreeComponent implements OnChanges {
  @Input() categories: any[] = [];
  @Input() categoriesSelect: any[] = [];
  @Input() activeCategoryId: number = 0;
  @Input() activeCategoryIdSelect: number = 0;
  @Input() type: number = 0;
  @Input() search: string = '';
  @Output() menuClicked: any = new EventEmitter<number>();

  constructor(public questionCategoryTreeService: QuestionCategoryTreeService) {}

  activeId: number = 0;

  handleOnClickMenu(event: any, category: any){
    event.stopPropagation();
    category.isExpanded = !category.isExpanded;
    this.questionCategoryTreeService.setActiveCategoryId(category.id);
  }

  handleOnClickMenuSelect(event: any, category: any){
    event.stopPropagation();
    category.isExpanded = !category.isExpanded;
    this.questionCategoryTreeService.setActiveCategoryIdSelect(category.id);
  }

  isQuestionCategoriesIncludeKey(categories: any, key: string): boolean {
    if (!categories) {
      return false;
    }
  
    const containsKeyword = categories.some((questionCategory: any) => {
      const currentCategoryMatch = questionCategory.name.trim().toLowerCase().includes(key.trim().toLowerCase());
      const childCategoriesMatch = this.isQuestionCategoriesIncludeKey(questionCategory.questionCategories, key);
      return currentCategoryMatch || childCategoriesMatch;
    });
  
    return containsKeyword;
  }

  ngOnChanges(changes: any) {
    if (changes.search) {
      this.activeCategoryId = 0;
      this.questionCategoryTreeService.setActiveCategoryId(0);
    }
  }
}
