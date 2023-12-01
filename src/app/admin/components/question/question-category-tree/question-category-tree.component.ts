import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-question-category-tree',
  templateUrl: './question-category-tree.component.html',
  // template: `
  //   <div class="tree-ul ml-3">
  //     <div *ngFor="let category of categories" class="tree-li cursor-pointer">
  //       <i class="fa-solid fa-folder text-warning mr-1"></i> {{ category.name }}
  //       <app-question-category-tree *ngIf="category.questionCategories" [categories]="category.questionCategories"></app-question-category-tree>
  //     </div>
  //   </div>
  // `,
  styleUrls: ['./question-category-tree.component.css']
})
export class QuestionCategoryTreeComponent {
  @Input() categories: any[] = [];

  activeCategoryId: number = 0;

  toggleCategory(event: Event, category: any): void {
    event.stopPropagation();
    console.log(category.id);
    // this.activeCategoryId = category.id;
    category.isExpanded = !category.isExpanded;
  }
}
