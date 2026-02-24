import { Category } from '../../models/knowledge.model';

export const CATEGORIES: Category[] = [
  {
    id: 'core-java',
    name: 'Core Java',
    description:
      'Fundamentals of Java programming — OOP, keywords, generics, exceptions, reflection, proxy, serialization, and more.',
    icon: '☕',
    color: '#E76F00',
  },
  {
    id: 'collections',
    name: 'Collections Framework',
    description:
      'Deep dive into Java Collections — source code analysis of ArrayList, HashMap, ConcurrentHashMap, and more.',
    icon: '📦',
    color: '#5382A1',
  },
  {
    id: 'concurrency',
    name: 'Concurrency & Multithreading',
    description:
      'Threads, JMM, thread pools, locks, AQS, CAS, ThreadLocal, CompletableFuture, and virtual threads.',
    icon: '⚡',
    color: '#F89820',
  },
  {
    id: 'jvm',
    name: 'JVM Internals',
    description:
      'Memory areas, garbage collection, class loading, classloaders, bytecode, monitoring, and tuning.',
    icon: '🔧',
    color: '#4E7896',
  },
  {
    id: 'io',
    name: 'Java I/O',
    description:
      'IO streams, NIO channels & buffers, IO models (BIO/NIO/AIO), and IO design patterns.',
    icon: '📡',
    color: '#2ECC71',
  },
  {
    id: 'new-features',
    name: 'Java New Features',
    description:
      'Major features from Java 8 through Java 21+ — lambdas, modules, records, virtual threads, and more.',
    icon: '✨',
    color: '#9B59B6',
  },
  {
    id: 'design-patterns',
    name: 'Design Patterns',
    description:
      'Gang of Four patterns implemented in Java — Creational, Structural, and Behavioral.',
    icon: '🏗️',
    color: '#E67E22',
  },
  {
    id: 'spring',
    name: 'Spring Framework',
    description: 'Spring Boot, Dependency Injection, Spring MVC, Spring Data, and Spring Security.',
    icon: '🌱',
    color: '#6DB33F',
  },
  {
    id: 'interview-qa',
    name: 'Interview Essentials',
    description:
      'Frequently asked Java interview questions with clear, concise answers — from basics to advanced concepts.',
    icon: '🎯',
    color: '#E74C3C',
  },
];
