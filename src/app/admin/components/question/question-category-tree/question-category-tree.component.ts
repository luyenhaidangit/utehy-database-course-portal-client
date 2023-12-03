import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, HostListener  } from '@angular/core';
import { QuestionCategoryTreeService } from 'src/app/admin/services/components/question-category-tree.service';
import questionCategoryConstant from 'src/app/admin/constants/question-category.constant';

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

  questionCategoryConstant: any = questionCategoryConstant;

  selectQuestionCategoryId: number = -1;

  constructor(public questionCategoryTreeService: QuestionCategoryTreeService) {}

  handleOnClickMenu(event: any, category: any){
    event.stopPropagation();
    category.isExpanded = !category.isExpanded;
    this.questionCategoryTreeService.setActiveCategoryId(category.id);
    this.questionCategoryTreeService.setSelectQuestionCategoryId(-1);
  }

  handleOnClickMenuSelect(event: any, category: any){
    event.stopPropagation();
    category.isExpanded = !category.isExpanded;
    this.questionCategoryTreeService.setActiveCategoryIdSelect(category.id);
    this.questionCategoryTreeService.setSelectQuestionCategoryId(-1);
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

  handleOnOpenActionQuestionCategoryMenu(event: any,category: any){
    if(this.questionCategoryTreeService.activeCategoryId === category.id && category.id !== 0){
      this.questionCategoryTreeService.setSelectQuestionCategoryId(category.id);
    }
    event.preventDefault();    
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent): void {
    this.questionCategoryTreeService.setSelectQuestionCategoryId(-1);
  }

  handleOnClickMenuAction(event: any, action: number ,category: any): void {
    this.questionCategoryTreeService.setSelectQuestionCategoryId(-1);
  }
}
