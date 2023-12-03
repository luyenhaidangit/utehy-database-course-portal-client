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

  isQuestionCategoriesIncludeKey(category: any): boolean {
    if (!category?.questionCategories) {
      return false;
    }
  
    const containsKeyword = category?.questionCategories.some((questionCategory: any) => {
      const currentCategoryMatch = questionCategory.name.trim().toLowerCase().includes(this.questionCategoryTreeService.searchKey.trim().toLowerCase());
      const childCategoriesMatch = this.isQuestionCategoriesIncludeKey(questionCategory);
      return currentCategoryMatch || childCategoriesMatch;
    });
  
    return containsKeyword;
  }

  ngOnChanges(changes: any) {
    if (changes.search) {
      this.questionCategoryTreeService.setSearchKey(changes.search.currentValue)
      this.activeCategoryId = 0;
      this.questionCategoryTreeService.setActiveCategoryId(0);
    }
  }
}
