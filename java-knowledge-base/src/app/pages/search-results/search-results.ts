import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { KnowledgeService } from '../../services/knowledge';
import { Topic } from '../../models/knowledge.model';

@Component({
  selector: 'app-search-results',
  imports: [RouterLink],
  templateUrl: './search-results.html',
  styleUrl: './search-results.scss'
})
export class SearchResults implements OnInit {
  query = '';
  results: Topic[] = [];

  constructor(
    private route: ActivatedRoute,
    private knowledgeService: KnowledgeService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'] || '';
      this.results = this.knowledgeService.searchTopics(this.query);
    });
  }

  getDifficultyClass(difficulty: string): string {
    return difficulty.toLowerCase();
  }

  getCategoryName(categoryId: string): string {
    return this.knowledgeService.getCategoryById(categoryId)?.name || '';
  }
}
