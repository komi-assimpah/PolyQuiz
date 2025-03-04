import { Component, Input } from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import {QuizService} from "../../../services/quiz.service";
import {ThemeService} from "../../../services/theme.service";
import {Theme} from "../../../models/theme.models";


@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss'],
})
export class QuizCardComponent {
  @Input() quiz!: Quiz;
  public themeList:Theme[] = this.themeService.themes;
  constructor(private quizService:QuizService,private themeService:ThemeService) {
  }

  editMode = false;

  onEdit() {
    this.editMode = true;
  }

  onCancel() {
    this.editMode = false;
  }

  onSave() {
    this.quizService.updateQuiz(this.quiz);
    this.editMode = false;
  }

  onDelete() {
    this.quizService.deleteQuiz(this.quiz);
  }
  onConfigure(){

  }
}
