import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionCategoryTreeService {
  public activeCategoryId: number = 0;
  public activeCategoryIdSelect: number = 0;

  constructor() { }

  setActiveCategoryId(categoryId: number): void {
    this.activeCategoryId = categoryId;
  }

  setActiveCategoryIdSelect(categoryId: number): void {
    this.activeCategoryIdSelect = categoryId;
  }
}
