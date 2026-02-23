import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KnowledgeService } from '../../services/knowledge';
import { Category, FeaturedArticle, Topic } from '../../models/knowledge.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  categories: Category[] = [];
  featuredArticles: FeaturedArticle[] = [];
  recentTopics: Topic[] = [];

  constructor(private knowledgeService: KnowledgeService) {}

  ngOnInit(): void {
    this.categories = this.knowledgeService.getCategories();
    this.featuredArticles = this.knowledgeService.getFeaturedArticles();
    this.recentTopics = this.knowledgeService.getAllTopics().slice(0, 6);
  }

  getDifficultyClass(difficulty: string): string {
    return difficulty.toLowerCase();
  }
}
