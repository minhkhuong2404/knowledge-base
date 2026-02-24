import { Injectable } from '@angular/core';
import { Category, FeaturedArticle, Topic } from '../models/knowledge.model';
import { CATEGORIES } from './data/categories.data';
import { FEATURED_ARTICLES } from './data/featured-articles.data';
import { CORE_JAVA_TOPICS } from './data/core-java.data';
import { COLLECTIONS_TOPICS } from './data/collections.data';
import { CONCURRENCY_TOPICS } from './data/concurrency.data';
import { JVM_TOPICS } from './data/jvm.data';
import { IO_TOPICS } from './data/io.data';
import { NEW_FEATURES_TOPICS } from './data/new-features.data';
import { DESIGN_PATTERNS_TOPICS } from './data/design-patterns.data';
import { SPRING_TOPICS } from './data/spring.data';
import { INTERVIEW_QA_TOPICS } from './data/interview-qa.data';

@Injectable({ providedIn: 'root' })
export class KnowledgeService {
  private readonly topics: Topic[] = [
    ...CORE_JAVA_TOPICS,
    ...COLLECTIONS_TOPICS,
    ...CONCURRENCY_TOPICS,
    ...JVM_TOPICS,
    ...IO_TOPICS,
    ...NEW_FEATURES_TOPICS,
    ...DESIGN_PATTERNS_TOPICS,
    ...SPRING_TOPICS,
    ...INTERVIEW_QA_TOPICS,
  ];

  private readonly topicsByCategory = new Map<string, Topic[]>();
  private readonly topicById = new Map<string, Topic>();
  private readonly categoryById = new Map<string, Category>();
  private readonly categoriesWithCounts: Category[];

  constructor() {
    for (const topic of this.topics) {
      this.topicById.set(topic.id, topic);

      const list = this.topicsByCategory.get(topic.categoryId);
      if (list) {
        list.push(topic);
      } else {
        this.topicsByCategory.set(topic.categoryId, [topic]);
      }
    }

    for (const cat of CATEGORIES) {
      this.categoryById.set(cat.id, cat);
    }

    this.categoriesWithCounts = CATEGORIES.map(cat => ({
      ...cat,
      topicCount: this.topicsByCategory.get(cat.id)?.length ?? 0,
    }));
  }

  getCategories(): Category[] {
    return this.categoriesWithCounts;
  }

  getCategoryById(id: string): Category | undefined {
    return this.categoryById.get(id);
  }

  getFeaturedArticles(): FeaturedArticle[] {
    return FEATURED_ARTICLES;
  }

  getTopicsByCategory(categoryId: string): Topic[] {
    return this.topicsByCategory.get(categoryId) ?? [];
  }

  getTopicById(id: string): Topic | undefined {
    return this.topicById.get(id);
  }

  getAllTopics(): Topic[] {
    return this.topics;
  }

  searchTopics(query: string): Topic[] {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return this.topics.filter(topic =>
      topic.title.toLowerCase().includes(q) ||
      topic.description.toLowerCase().includes(q) ||
      topic.tags.some(tag => tag.toLowerCase().includes(q)) ||
      topic.content.some(section =>
        section.heading.toLowerCase().includes(q) ||
        section.body.toLowerCase().includes(q)
      )
    );
  }
}
