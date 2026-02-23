import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Sidebar } from '../sidebar/sidebar';
import { Content } from '../content/content';
import { ContentService } from '../../services/content.service';
import { SidebarCategory, Topic } from '../../models/topic.model';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [Sidebar, Content, RouterLink],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private contentService = inject(ContentService);
  private paramSub!: Subscription;

  currentSlug = signal('');
  sidebarOpen = signal(false);

  categories = signal<SidebarCategory[]>(this.contentService.getCategories());

  currentTopic = computed<Topic | undefined>(() =>
    this.contentService.getTopicBySlug(this.currentSlug())
  );

  currentCategoryName = computed(() => {
    const cat = this.contentService.getCategoryForSlug(this.currentSlug());
    return cat?.name ?? '';
  });

  ngOnInit(): void {
    this.paramSub = this.route.params.subscribe(params => {
      const slug = params['topic'] ?? '';
      this.currentSlug.set(slug);

      // Auto-expand the active category
      const cat = this.contentService.getCategoryForSlug(slug);
      if (cat) {
        cat.expanded = true;
      }

      // Close mobile sidebar on navigation
      this.sidebarOpen.set(false);

      // Scroll to top on topic change
      window.scrollTo({ top: 0 });
    });
  }

  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
  }

  toggleSidebar(): void {
    this.sidebarOpen.update(v => !v);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }
}
