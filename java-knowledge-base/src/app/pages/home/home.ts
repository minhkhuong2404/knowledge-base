import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { KnowledgeService } from '../../services/knowledge';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatRippleModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private knowledgeService = inject(KnowledgeService);

  categories = this.knowledgeService.getCategories();
  featuredArticles = this.knowledgeService.getFeaturedArticles();
  recentTopics = this.knowledgeService.getAllTopics().slice(0, 6);

  getDifficultyClass(difficulty: string): string {
    return difficulty.toLowerCase();
  }

  getDifficultyIcon(difficulty: string): string {
    switch (difficulty) {
      case 'Beginner': return 'fa-solid fa-seedling';
      case 'Intermediate': return 'fa-solid fa-fire';
      case 'Advanced': return 'fa-solid fa-rocket';
      default: return 'fa-solid fa-circle';
    }
  }
}
