export interface Topic {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  content: ContentSection[];
  codeExamples?: CodeExample[];
}

export interface ContentSection {
  heading: string;
  body: string;
}

export interface CodeExample {
  title: string;
  code: string;
  language: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  topicCount?: number;
}

export interface FeaturedArticle {
  id: string;
  topicId: string;
  title: string;
  summary: string;
  tag: string;
  author: string;
  categoryId: string;
}
