import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { QuestionCategoryService } from 'src/app/admin/services/apis/question-category.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import questionCategoryConstant from 'src/app/admin/constants/question-category.constant';
import { ToastrService as NgxToastrService } from 'ngx-toastr';
import { QuestionCategoryTreeService } from 'src/app/admin/services/components/question-category-tree.service';
import { QuestionService } from 'src/app/admin/services/apis/question.service';
import { Router, ActivatedRoute } from '@angular/router';
import sortConstant from 'src/app/admin/constants/sortConstant';
import orderConstant from 'src/app/admin/constants/orderConstant';
import { DEFAULT_PER_PAGE_OPTIONS, DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from 'src/app/admin/configs/paging.config';

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.css']
})
export class ListQuestionComponent implements OnInit {
  //Constant
  sortConstant: any = sortConstant;
  orderConstant: any = orderConstant;
   //Config
   public config: { [key: string]: any, perPageOptions: any[]  } = { perPageOptions: DEFAULT_PER_PAGE_OPTIONS };

  //Collapse
  questionCategoryConstant: any = questionCategoryConstant;
  collapseFilter: any = {
    questionCategory: false,
    typeQuestion: false,
  };
  
  questionCategorySearch = '';
  questionCategories: any = [];
  questionCategoriesSelect: any = [];
  activeCategoryIdSelect: number = 0;

  //Question
  questions: any = [];
  search: any = {
    orderBy: '',
    sortBy: '',
    questionCategory: 0,
    type: 0,
    title: ''
  };
  selectedItems: number[] = [];
  pageSize: any = 10;
  pageIndex: any = 1;
  totalPages: any;

  //Modal
  createQuestionCategoryModalRef?: BsModalRef;
  @ViewChild('createQuestionCategoryTemplate') createQuestionCategoryTemplate!: TemplateRef<any>;
  questionCategory: any = {
    name: '',
    description: '',
    priority: 0,
    parentQuestionCategoryId: null
  };

  // Constructor
  constructor(private ngxToastr: NgxToastrService,private questionCategoryService: QuestionCategoryService, private modalService: BsModalService, public questionCategoryTreeService: QuestionCategoryTreeService, private questionService: QuestionService,private router: Router, private route: ActivatedRoute) { }

  // Event
  ngOnInit() {
    this.getQuestionCategoryTree();

    this.getQuestions();

    this.questionCategoryTreeService.myValueChange.subscribe((newValue) => {
      this.getQuestionCategoryTree(); 
      this.questionCategoryTreeService.setActiveCategoryId(0);
    });
  }

  //Question category
  getQuestionCategoryTree(){
    this.questionCategoryService.getQuestionCategoryTree().subscribe((result: any) => {
      if(result.status){
        this.questionCategories = result.data;
      }
    });
  }

  handleOnClickCreateQuestionCategoryButton(){
    this.questionCategory = {
      name: '',
      description: '',
      priority: 0,
      parentQuestionCategoryId: null
    };
    this.questionCategoryService.getQuestionCategoryTree().subscribe((result: any) => {
      if(result.status){
        const filteredArray = result.data.filter((item: any) => item.id !== null && item.id !== 0);
        this.questionCategoriesSelect = [
          {
            id: 0,
            name: 'Tất cả',
            questionCategories: filteredArray
          }
        ]
      }
    });

    this.questionCategoryTreeService.setActiveCategoryIdSelect(0);
    this.questionCategoryTreeService.setTypeAction(1);

    this.createQuestionCategoryModalRef = this.modalService.show(this.createQuestionCategoryTemplate,
    Object.assign({}, { class: 'modal-dialog modal-dialog-scrollable' }));
  }

  handleOnCloseCreateQuestionCategoryModal() {
    this.createQuestionCategoryModalRef?.hide();
  }

  handleOnSubmitCreateQuestionCategoryForm(){
    const request = { ...this.questionCategory, parentQuestionCategoryId: this.questionCategoryTreeService.activeCategoryIdSelect === 0 ? null : this.questionCategoryTreeService.activeCategoryIdSelect }; 

    this.questionCategoryService.createQuestionCategory(request).subscribe((result: any) => {
      if(result.status){
        this.ngxToastr.success(result.message,'',{
          progressBar: true
        });
        this.getQuestionCategoryTree();
        this.createQuestionCategoryModalRef?.hide();
      }
    },error => {
      console.log(error);
      this.ngxToastr.error(error.error.message,'',{
        progressBar: true
      });
    });
  }

  //Question
  getQuestions(): void{
    this.questionService.getQuestions().subscribe((result: any) => {
      if(result.status){
        this.questions = result.data.items;
        this.totalPages = result.data.totalPages;
      }
    });
  }

  selectAllQuestions(event: any): void{
    if (event.target.checked) {
      this.selectedItems = this.questions.map((teacher: any) => teacher.id);
    } else {
      this.selectedItems = [];
    }
  }

  onPerPageChange(event: any): void {
    this.pageSize = +event.target.value;

    this.route.queryParams.subscribe(params => {
      const request = {
        ...params,
        pageSize: this.pageSize,
      };

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: request,
        queryParamsHandling: 'merge',
      });
    });
  }

  onSortAndOrderChange(orderBy: string) {
    if(this.search.orderBy === orderBy){
      this.search.sortBy = this.search.sortBy === sortConstant.asc ? sortConstant.desc: sortConstant.asc;
    }else{
      this.search.sortBy = sortConstant.desc;
    }

    this.search = {
      orderBy: orderBy,
      sortBy: this.search.sortBy
    };

    this.route.queryParams.subscribe(params => {
      const request = {
        ...params,
        orderBy: this.search.orderBy,
        sortBy: this.search.sortBy,
      };

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: request,
        queryParamsHandling: 'merge',
      });
    });
  }

  isSelected(teacherId: number): boolean {
    return this.selectedItems.includes(teacherId);
  }

  toggleSelection(questionId: number): void {
    if (this.isSelected(questionId)) {
        this.selectedItems = this.selectedItems.filter((id) => id !== questionId);
    } else {
        this.selectedItems.push(questionId);
    }
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageIndex = page;
      
      this.route.queryParams.subscribe(params => {
        const request = {
          ...params,
          pageIndex: this.pageIndex,
        };

        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: request,
          queryParamsHandling: 'merge',
        });
      });
    }
  }

  handleDelete(id: number){
    
  }
}
