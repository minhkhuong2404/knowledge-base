import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { KnowledgeService } from '../../services/knowledge';
import { Category, Topic } from '../../models/knowledge.model';

@Component({
  selector: 'app-category',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatCardModule, MatChipsModule, MatButtonModule],
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class CategoryComponent {
  private route = inject(ActivatedRoute);
  private knowledgeService = inject(KnowledgeService);

  category = signal<Category | undefined>(undefined);
  topics = signal<Topic[]>([]);

  constructor() {
    this.route.params.pipe(takeUntilDestroyed()).subscribe((params) => {
      const categoryId = params['id'];
      this.category.set(this.knowledgeService.getCategoryById(categoryId));
      this.topics.set(this.knowledgeService.getTopicsByCategory(categoryId));
    });
  }

  getDifficultyClass(difficulty: string): string {
    return difficulty.toLowerCase();
  }

  getDifficultyIcon(difficulty: string): string {
    switch (difficulty) {
      case 'Beginner':
        return 'fa-solid fa-seedling';
      case 'Intermediate':
        return 'fa-solid fa-fire';
      case 'Advanced':
        return 'fa-solid fa-rocket';
      default:
        return 'fa-solid fa-circle';
    }
  }
}
