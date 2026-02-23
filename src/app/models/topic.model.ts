export interface TopicSection {
  id: string;
  title: string;
  content: string;
}

export interface Topic {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  sections: TopicSection[];
}

export interface SidebarCategory {
  name: string;
  icon: string;
  topics: { slug: string; title: string }[];
  expanded: boolean;
}
