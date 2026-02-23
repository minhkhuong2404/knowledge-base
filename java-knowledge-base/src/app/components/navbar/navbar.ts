import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { KnowledgeService } from '../../services/knowledge';
import { Category } from '../../models/knowledge.model';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  searchQuery = '';
  showMobileMenu = false;
  categories: Category[] = [];

  constructor(
    private router: Router,
    private knowledgeService: KnowledgeService
  ) {
    this.categories = this.knowledgeService.getCategories();
  }

  onSearch(event: Event): void {
    event.preventDefault();
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchQuery.trim() }
      });
      this.showMobileMenu = false;
    }
  }

  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }
}
