import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { KnowledgeService } from '../../services/knowledge';
import { Topic, Category } from '../../models/knowledge.model';
import { CodeBlock } from '../../components/code-block/code-block';

@Component({
  selector: 'app-topic-detail',
  imports: [RouterLink, CodeBlock],
  templateUrl: './topic-detail.html',
  styleUrl: './topic-detail.scss'
})
export class TopicDetail implements OnInit {
  topic?: Topic;
  category?: Category;
  relatedTopics: Topic[] = [];

  constructor(
    private route: ActivatedRoute,
    private knowledgeService: KnowledgeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const topicId = params['id'];
      this.topic = this.knowledgeService.getTopicById(topicId);
      if (this.topic) {
        this.category = this.knowledgeService.getCategoryById(this.topic.categoryId);
        this.relatedTopics = this.knowledgeService.getTopicsByCategory(this.topic.categoryId)
          .filter(t => t.id !== this.topic!.id)
          .slice(0, 3);
      }
    });
  }

  getDifficultyClass(difficulty: string): string {
    return difficulty.toLowerCase();
  }
}
