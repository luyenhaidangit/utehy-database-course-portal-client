import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddQuestionCategoryTreeService {
  questionCategories: any[] = [];
  id: number = 0;
  currentId = 0;
  search: string = '';
  type: number = -1;

  constructor() { }
}
