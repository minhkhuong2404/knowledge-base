import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { KnowledgeService } from '../../services/knowledge';
import { Category, Topic } from '../../models/knowledge.model';

@Component({
  selector: 'app-category',
  imports: [RouterLink],
  templateUrl: './category.html',
  styleUrl: './category.scss'
})
export class CategoryComponent implements OnInit {
  category?: Category;
  topics: Topic[] = [];

  constructor(
    private route: ActivatedRoute,
    private knowledgeService: KnowledgeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const categoryId = params['id'];
      this.category = this.knowledgeService.getCategoryById(categoryId);
      this.topics = this.knowledgeService.getTopicsByCategory(categoryId);
    });
  }

  getDifficultyClass(difficulty: string): string {
    return difficulty.toLowerCase();
  }
}
