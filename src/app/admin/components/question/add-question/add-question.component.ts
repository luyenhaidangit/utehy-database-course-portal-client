import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { ToastrService as NgxToastrService } from 'ngx-toastr';
import { TeacherService } from 'src/app/admin/services/apis/teacher.service';
import { Router } from '@angular/router';
import questionConstant from 'src/app/admin/constants/question.constant';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { classicEditorConfig } from 'src/app/admin/configs/ckeditor.config';
import '@ckeditor/ckeditor5-build-classic/build/translations/vi';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CkeditorUploadAdapter } from 'src/app/admin/adapters/ckeditor-upload.adapter';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { QuestionCategoryService } from 'src/app/admin/services/apis/question-category.service';
import { AddQuestionCategoryTreeService } from 'src/app/admin/services/components/add-question-category-tree.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('hidden', style({
        opacity: 0,
        height: '0',
        display: 'none'
      })),
      state('visible', style({
        opacity: 1,
        height: '100%',
        display: 'flex'
      })),
      transition('hidden => visible', animate('300ms ease-out')),
      transition('visible => hidden', animate('300ms ease-in'))
    ]),
  ],
})
export class AddQuestionComponent implements OnInit {
  //Init
  constructor(
    private ngxToastr: NgxToastrService,private teacherService: TeacherService,
    private router:Router,private modalService: BsModalService, 
    private questionCategoryService: QuestionCategoryService,
    public addQuestionCategoryTreeService: AddQuestionCategoryTreeService
  ) { }

  ngOnInit() {
    this.questionCategoryService.getQuestionCategoryTree().subscribe((result: any) => {
      if(result.status){
        this.questionCategoryTree = result.data;

        const defaultCategory = result.data.find((category: any) => category.isDefault === true);

        this.questionCategory = defaultCategory;

        this.addQuestionCategoryTreeService.questionCategories = result.data;

        this.addQuestionCategoryTreeService.id = defaultCategory.id;
      }
    });
  }

  //Question
  questionContant: any = questionConstant;
  classicEditor = ClassicEditor;
  editor: any = null;
  questionAnswersEditor = [];
  config: { [key: string]: any, classicEditorConfig: any } = { classicEditorConfig: classicEditorConfig };

  //Question
  question: any = {
    type: 1,
    title: '',
    questionAnswers: [...questionConstant.defaultQuestionAnswerMultipleAnswers],
    questionCategoryId: 1
  };

  //Modal question category tree
  questionCategoryTree: any[] = [];
  questionCategory: any = {
    id: "",
    name: ""
  };
  questionCategorySearch: string = '';

  createQuestionCategoryModalRef?: BsModalRef;
  @ViewChild('questionCategoryTreeTemplate') questionCategoryTreeTemplate!: TemplateRef<any>;
  
  handleOpenQuestionCategoryTreeModal(){
    this.questionCategoryService.getQuestionCategoryTree().subscribe((result: any) => {
      if(result.status){
        this.questionCategoryTree = result.data;

        const defaultCategory = result.data.find((category: any) => category.isDefault === true);

        this.addQuestionCategoryTreeService.questionCategories = result.data;

        this.addQuestionCategoryTreeService.id = defaultCategory.id;
      }
    });
    this.createQuestionCategoryModalRef = this.modalService.show(this.questionCategoryTreeTemplate,
      Object.assign({}, { class: 'modal-dialog modal-lg modal-dialog-scrollable' }));
  }

  handleCloseQuestionCategoryTreeModal(){
    const defaultCategory = this.addQuestionCategoryTreeService.questionCategories.find((category: any) => category.isDefault === true);

    this.addQuestionCategoryTreeService.id = defaultCategory.id;   
    
    this.questionCategorySearch = '';

    this.createQuestionCategoryModalRef?.hide();
  }

  handleChooseQuestionCategoryId(){
    this.question.questionCategoryId = this.addQuestionCategoryTreeService.id;

    const category = this.findCategoryById(this.addQuestionCategoryTreeService.questionCategories,this.addQuestionCategoryTreeService.id);

    this.questionCategory = category;

    this.createQuestionCategoryModalRef?.hide();
  }

  handleChangeSearchCategory(){
    const defaultCategory = this.addQuestionCategoryTreeService.questionCategories.find((category: any) => category.isDefault === true);
    this.addQuestionCategoryTreeService.id = defaultCategory.id;
  }

  findCategoryById(categories: any[], targetId: number): any | null {
    for (const category of categories) {
        if (category.id === targetId) {
            return category; 
        }

        if (category.questionCategories) {
            const foundInChildren = this.findCategoryById(category.questionCategories, targetId);
            if (foundInChildren) {
                return foundInChildren;
            }
        }
    }

    return null;
  }

  //Common
  selectedAnswer: string = 'ok';
  typeScoreAnswer: number = 1;

  //Data
  public teacher: any = {
    teacherId: '',
    name: '',
    email: '',
    phone: '',
    verificationType: 2,
    status: true,
  };

  onSubmit(){
    this.teacherService.createTeachers(this.teacher).subscribe((result: any) => {
      if(result.status){
        this.ngxToastr.success(result.message,'',{
          progressBar: true
        });
        this.router.navigate(['/admin/teacher']);
      }
    },error => {
      console.log(error);
      this.ngxToastr.error(error.error.message,'',{
        progressBar: true
      });
    });
  }

  validVerificationType(): number {
    if (this.teacher.verificationType === 2) {
        if (!this.teacher.email) {
            return -1;
        } else {
            return 1;
        }
    } else {
      if (!this.teacher.phone) {
        return -2;
      } else {
        return 1;
      }
    }
  }

  handleMoveQuestion(index: number, direction: 'up' | 'down'): void {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
  
    if (newIndex >= 0 && newIndex < this.question.questionAnswers.length) {
      [this.question.questionAnswers[index], this.question.questionAnswers[newIndex]] = [this.question.questionAnswers[newIndex], this.question.questionAnswers[index]];
  
      this.question.questionAnswers[index].charIndex = String.fromCharCode(65 + index);
      this.question.questionAnswers[newIndex].charIndex = String.fromCharCode(65 + newIndex);
    }
  }

  handleAddQuestionAnswer(): void {
    const newAnswer = {
      charIndex: String.fromCharCode(65 + this.question.questionAnswers.length),
      title: '',
      order: this.question.questionAnswers.length + 1,
      isCorrect: this.question.questionAnswers.length > 0 ? false : true,
      score: 1
    };
  
    this.question.questionAnswers.push(newAnswer);
  }

  handleOnDeleteAnswerQuesion(index: number){
    this.question.questionAnswers.splice(index, 1);

    const isCorrectAnswerExists = this.question.questionAnswers.some((answer: any) => answer.isCorrect === true);

    if(!isCorrectAnswerExists && this.question.questionAnswers.length > 0){
      this.question.questionAnswers[0].isCorrect = true;
    }

    for (let i = index; i < this.question.questionAnswers.length; i++) {
      this.question.questionAnswers[i].charIndex = String.fromCharCode(65 + i);
      this.question.questionAnswers[i].title = "";
    }
  }

  handleOnChangeCorrectAnswerQuestion(selectedAnswer: any) {
    selectedAnswer.isCorrect = true;
  
    this.question.questionAnswers.forEach((answer: any) => {
      if (answer !== selectedAnswer) {
        answer.isCorrect = false;
      }
    });
  }

  onReady(editor: ClassicEditor): void {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
        return new CkeditorUploadAdapter( loader );
    };
  }
}
