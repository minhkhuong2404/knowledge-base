import { Component, input, output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebarCategory } from '../../models/topic.model';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  private contentService = inject(ContentService);

  categories = input.required<SidebarCategory[]>();
  activeSlug = input<string>('');
  isOpen = input(false);
  topicSelected = output();

  toggleCategory(category: SidebarCategory): void {
    category.expanded = !category.expanded;
  }

  getCategoryRoute(categoryName: string): string {
    return this.contentService.getCategoryRoutePrefix(categoryName);
  }
}
