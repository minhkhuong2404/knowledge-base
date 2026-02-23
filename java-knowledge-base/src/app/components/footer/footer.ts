import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KnowledgeService } from '../../services/knowledge';
import { Category } from '../../models/knowledge.model';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  categories: Category[] = [];
  currentYear = new Date().getFullYear();

  constructor(private knowledgeService: KnowledgeService) {
    this.categories = this.knowledgeService.getCategories();
  }
}
