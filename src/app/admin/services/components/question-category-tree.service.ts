import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionCategoryTreeService {
  public activeCategoryId: number = 0;

  constructor() { }

  setActiveCategoryId(categoryId: number): void {
    this.activeCategoryId = categoryId;
  }
}
