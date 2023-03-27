import { Component } from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
})
export class QuizListComponent {
  public quizzes: Quiz[] = [];

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.quizService.quizzes$.subscribe((quizzes) => (this.quizzes = quizzes));
  }

  onQuizChange(updatedQuiz: Quiz) {
    const index = this.quizzes.findIndex((quiz) => quiz.id === updatedQuiz.id);
    this.quizzes[index] = updatedQuiz; // update the quiz object with the emitted value
  }
}
