import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Topic } from '../../models/topic.model';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './content.html',
  styleUrl: './content.scss'
})
export class Content {
  topic = input<Topic | undefined>();
  categoryName = input('');

  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
