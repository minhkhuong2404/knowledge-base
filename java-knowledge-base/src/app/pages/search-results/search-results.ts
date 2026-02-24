import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { KnowledgeService } from '../../services/knowledge';
import { Topic } from '../../models/knowledge.model';

@Component({
  selector: 'app-search-results',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatCardModule, MatChipsModule, MatButtonModule],
  templateUrl: './search-results.html',
  styleUrl: './search-results.scss',
})
export class SearchResults {
  private route = inject(ActivatedRoute);
  private knowledgeService = inject(KnowledgeService);

  query = signal('');
  results = signal<Topic[]>([]);

  constructor() {
    this.route.queryParams.pipe(takeUntilDestroyed()).subscribe((params) => {
      const q = params['q'] || '';
      this.query.set(q);
      this.results.set(this.knowledgeService.searchTopics(q));
    });
  }

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

  getCategoryName(categoryId: string): string {
    return this.knowledgeService.getCategoryById(categoryId)?.name || '';
  }
}
