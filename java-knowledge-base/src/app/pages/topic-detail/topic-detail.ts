import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { KnowledgeService } from '../../services/knowledge';
import { Topic, Category } from '../../models/knowledge.model';
import { CodeBlock } from '../../components/code-block/code-block';
import { FormatBodyPipe } from '../../pipes/format-body.pipe';

@Component({
  selector: 'app-topic-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatDividerModule,
    CodeBlock,
    FormatBodyPipe,
  ],
  templateUrl: './topic-detail.html',
  styleUrl: './topic-detail.scss',
})
export class TopicDetail {
  private route = inject(ActivatedRoute);
  private knowledgeService = inject(KnowledgeService);

  topic = signal<Topic | undefined>(undefined);
  category = signal<Category | undefined>(undefined);
  relatedTopics = signal<Topic[]>([]);

  constructor() {
    this.route.params.pipe(takeUntilDestroyed()).subscribe((params) => {
      const topicId = params['id'];
      const currentTopic = this.knowledgeService.getTopicById(topicId);
      this.topic.set(currentTopic);
      if (currentTopic) {
        this.category.set(this.knowledgeService.getCategoryById(currentTopic.categoryId));
        this.relatedTopics.set(
          this.knowledgeService
            .getTopicsByCategory(currentTopic.categoryId)
            .filter((t) => t.id !== currentTopic.id)
            .slice(0, 3),
        );
      }
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
}
