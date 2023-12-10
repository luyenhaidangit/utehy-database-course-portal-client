import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ToastrService as NgxToastrService } from 'ngx-toastr';
import { TeacherService } from 'src/app/admin/services/apis/teacher.service';
import { Router } from '@angular/router';
import questionConstant from 'src/app/admin/constants/question.constant';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { classicEditorConfig } from 'src/app/admin/configs/ckeditor.config';
import '@ckeditor/ckeditor5-build-classic/build/translations/vi';
import { trigger, state, style, animate, transition } from '@angular/animations';

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
  //Question
  questionContant: any = questionConstant;
  classicEditor = ClassicEditor;
  questionAnswersEditor = [];
  config: { [key: string]: any, classicEditorConfig: any } = { classicEditorConfig: classicEditorConfig };

  question: any = {
    type: 1,
    title: '',
    questionAnswers: [...questionConstant.defaultQuestionAnswerMultipleAnswers]
  };

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

  constructor(private ngxToastr: NgxToastrService,private teacherService: TeacherService,private router:Router) { }

  ngOnInit() {
    // console.log()
    // this.questionAnswersEditor = Array(this.questionAnswersEditor.length).fill(null).map(() => ClassicEditor);
  }

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

  handleOnDeleteAnswerQuesion(index: number){
    this.question.questionAnswers.splice(index, 1);

    for (let i = index; i < this.question.questionAnswers.length; i++) {
      this.question.questionAnswers[i].charIndex = String.fromCharCode(65 + i); // Update charIndex to A, B, C, ...
      this.question.questionAnswers[i].title = "";
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

  addQuestionAnswer(): void {
    const newAnswer = {
      charIndex: String.fromCharCode(65 + this.question.questionAnswers.length), // Assuming you want to use A, B, C, ...
      title: '',
      order: this.question.questionAnswers.length + 1
    };
  
    this.question.questionAnswers.push(newAnswer);

    console.log(this.question.questionAnswers)
  }

  handleOnChangeCorrectAnswerQuestion(selectedAnswer: any) {
    selectedAnswer.isCorrect = true;
  
    this.question.questionAnswers.forEach((answer: any) => {
      if (answer !== selectedAnswer) {
        answer.isCorrect = false;
      }
    });
  }
}
