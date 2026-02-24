import { FeaturedArticle } from '../../models/knowledge.model';

export const FEATURED_ARTICLES: FeaturedArticle[] = [
  {
    id: 'fa-1',
    topicId: 'hashmap-source',
    title: 'HashMap Source Code Analysis',
    summary:
      'A deep dive into HashMap internals — hashing, bucket structure, treeification in Java 8+, resize mechanism, and why you must override both hashCode() and equals(). Essential for Senior interviews.',
    tag: 'Collections Deep Dive',
    author: 'Java Knowledge Base',
    categoryId: 'collections',
  },
  {
    id: 'fa-2',
    topicId: 'thread-pool-deep-dive',
    title: 'Thread Pool Internals & Best Practices',
    summary:
      'Master ThreadPoolExecutor — the 7 core parameters, 4 rejection policies, thread pool sizing strategies, and common pitfalls. The most frequently asked concurrency topic in Senior Java interviews.',
    tag: 'Concurrency',
    author: 'Java Knowledge Base',
    categoryId: 'concurrency',
  },
  {
    id: 'fa-3',
    topicId: 'jmm',
    title: 'Java Memory Model Deep Dive',
    summary:
      'Understand happens-before relationships, volatile semantics, instruction reordering, and memory visibility. Critical for writing correct concurrent code and acing Senior-level interviews.',
    tag: 'Concurrency',
    author: 'Java Knowledge Base',
    categoryId: 'concurrency',
  },
];
