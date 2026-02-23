import { Topic } from '../../models/knowledge.model';

export const INTERVIEW_QA_TOPICS: Topic[] = [
    {
      id: 'interview-java-platform',
      title: 'Java Platform & Basics Q&A',
      description: 'Essential interview questions about Java as a platform — JDK/JRE/JVM, main method, features, and packages.',
      categoryId: 'interview-qa',
      icon: '☕',
      difficulty: 'Beginner',
      tags: ['Interview', 'JDK', 'JRE', 'JVM', 'Packages', 'Java Basics'],
      content: [
        {
          heading: 'Q: What is Java and what are its key features?',
          body: 'Java is a high-level, class-based, object-oriented programming language designed to have as few implementation dependencies as possible. Key features: 1) Platform independence — "Write Once, Run Anywhere" through JVM bytecode. 2) Object-oriented — everything revolves around objects and classes. 3) Robust — strong memory management, exception handling, and type checking. 4) Secure — no explicit pointers, bytecode verification, security manager. 5) Multithreaded — built-in support for concurrent programming. 6) Garbage collected — automatic memory management. 7) Rich standard library — extensive APIs for networking, I/O, collections, concurrency, etc.'
        },
        {
          heading: 'Q: What is the difference between JDK, JRE, and JVM?',
          body: 'JVM (Java Virtual Machine): the engine that executes Java bytecode. It provides platform independence by abstracting the OS. Each platform has its own JVM implementation (HotSpot, OpenJ9, GraalVM). JRE (Java Runtime Environment): JVM + core class libraries (java.lang, java.util, etc.) + supporting files. Everything needed to RUN Java applications. JDK (Java Development Kit): JRE + development tools (javac compiler, jdb debugger, jar tool, javadoc, jshell REPL). Everything needed to DEVELOP Java. Relationship: JDK ⊃ JRE ⊃ JVM. Since Java 11, Oracle distributes only the full JDK.'
        },
        {
          heading: 'Q: Why is the main method `public static void main(String[] args)`?',
          body: '`public` — accessible by the JVM from outside the class. `static` — can be called without creating an instance of the class (JVM calls it before any objects exist). `void` — returns nothing to the JVM (exit code is set via System.exit()). `main` — the specific method name the JVM looks for as the entry point. `String[] args` — command-line arguments passed to the program. Since Java 21 (preview), simple programs can use a simpler form: the "unnamed class" feature allows just `void main() { }` without the class declaration.'
        },
        {
          heading: 'Q: What are packages in Java?',
          body: 'A package is a namespace that organizes related classes and interfaces, similar to folders in a file system. Purpose: 1) Avoid naming conflicts (com.company.project.ClassName). 2) Access control — package-private (default) visibility restricts access to same package. 3) Logical grouping — java.util (utilities), java.io (I/O), java.net (networking). Convention: reverse domain name (com.company.project). Import: `import java.util.List;` or `import java.util.*;` (wildcard). Static import: `import static java.lang.Math.PI;`. The `java.lang` package is auto-imported (String, System, Math, Object, etc.).'
        },
        {
          heading: 'Q: What is the difference between compile-time and runtime?',
          body: 'Compile-time: javac converts .java source to .class bytecode. Checks: syntax errors, type checking, method resolution (overloading), checked exceptions, access modifiers. Errors here prevent compilation. Runtime: JVM executes bytecode. Occurs: dynamic dispatch (method overriding), exceptions (NullPointerException, ArrayIndexOutOfBoundsException), class loading, JIT compilation, garbage collection. Checked exceptions are enforced at compile-time; unchecked exceptions occur at runtime. Method overloading is resolved at compile-time; method overriding at runtime.'
        },
        {
          heading: 'Q: What are the key components of JVM Architecture?',
          body: 'JVM has three main components: 1) ClassLoader — loads .class files into the JVM. It follows a delegation hierarchy: Bootstrap → Extension → Application class loader. 2) Runtime Data Areas — memory regions used while the program runs, including Heap, Stack, Method Area (Metaspace since Java 8), PC Register, and Native Method Stacks. 3) Execution Engine — actually runs the bytecode instructions. It contains the Interpreter (executes bytecode line by line), JIT Compiler (compiles frequently executed bytecode to native machine code for performance), and the Garbage Collector.'
        },
        {
          heading: 'Q: What memory areas are available in the JVM?',
          body: 'JVM memory is divided into: 1) Heap Space — stores objects and shared data created at runtime. Divided into Young Generation (Eden + Survivor spaces) and Old Generation. 2) Stack Memory — stores method call frames, local variables, and partial results in LIFO order. Each thread has its own stack. 3) Method Area (Metaspace in Java 8+) — stores class-level data such as class structures, method metadata, and constants (runtime constant pool). 4) Native Method Stacks — used for native (non-Java) method calls. Stack is faster to access because of its simple LIFO structure and thread-local nature, while Heap is slower due to complex allocation and garbage collection overhead.'
        },
        {
          heading: 'Q: Can a Java application run without installing the JRE?',
          body: 'Traditionally no — the JRE provides essential libraries and the JVM needed to run Java applications. However, since Java 9, the jlink tool allows bundling a Java application with a custom, minimal JRE (only the modules the application needs). This produces a self-contained runtime image that can be distributed and run without a separate JRE installation. This is particularly useful for containerized deployments and embedded systems.'
        },
        {
          heading: 'Q: How does garbage collection work in Java?',
          body: 'Garbage collection automatically frees memory by removing objects that are no longer reachable from GC roots (active threads, static fields, JNI references). The JVM uses multiple GC algorithms depending on the collector chosen: Mark-Sweep (marks live objects, sweeps dead ones), Mark-Compact (marks then compacts to eliminate fragmentation), and Generational Copying (copies survivors between spaces). Modern collectors include G1GC (default since Java 9), ZGC (ultra-low pause), and Shenandoah. The finalize() method (deprecated since Java 9) was called before reclaiming an object — use try-with-resources or Cleaner instead. Memory leaks can still occur when objects are no longer needed but still referenced from reachable objects, preventing the GC from reclaiming their memory.'
        },
        {
          heading: 'Q: Is Java a 100% object-oriented language?',
          body: 'No, Java is not 100% object-oriented because it uses 8 primitive types (int, byte, short, long, float, double, char, boolean) that are not objects. In a fully OO language, everything is treated as an object. The advantages of this hybrid approach: 1) Primitives are faster and use less memory than wrapper objects. 2) The mix allows Java to work well with systems and technologies that are not fully object-oriented. Java provides wrapper classes (Integer, Double, etc.) to bridge the gap when object representation is needed (e.g., in collections).'
        },
        {
          heading: 'Q: Can we override or overload the main method?',
          body: 'Override: No — the main method is static, and static methods cannot be overridden (they are bound at compile-time to the class, not the instance). Overload: Yes — you can define multiple main methods with different parameters (e.g., main(int[] args), main(String arg)). However, the JVM will ONLY call the standard entry point: public static void main(String[] args). It will never call your overloaded versions automatically. If the main method is not declared static, the program compiles but fails to run with an error like "Main method is not static in class MyClass".'
        },
        {
          heading: 'Q: Can we declare pointers in Java?',
          body: 'No, Java does not support pointers as a language feature. This was a deliberate design decision for security — pointers allow direct memory access which can lead to security vulnerabilities, memory corruption, and hard-to-debug errors. Java uses references internally (which are similar to restricted pointers), but developers cannot perform pointer arithmetic or directly manipulate memory addresses. The JVM handles all memory management.'
        }
      ],
      codeExamples: [
        {
          title: 'Java Platform Basics',
          language: 'java',
          code: `// Traditional main method
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, " + (args.length > 0 ? args[0] : "World"));
        System.out.println("Java version: " + System.getProperty("java.version"));
        System.out.println("JVM: " + System.getProperty("java.vm.name"));
        System.out.println("OS: " + System.getProperty("os.name"));
    }
}

// Java 21+ unnamed class (preview) — simplified entry point
// void main() {
//     println("Hello, World!");
// }

// Package and import
package com.example.service;

import java.util.List;
import java.util.stream.Collectors;
import static java.lang.System.out; // static import

public class UserService {
    public List<String> getUserNames() {
        return List.of("Alice", "Bob", "Charlie");
    }
}`
        }
      ]
    },
    {
      id: 'interview-oop-qa',
      title: 'OOP Interview Q&A',
      description: 'Common OOP interview questions — constructors, abstract vs interface, overloading vs overriding, and SOLID principles.',
      categoryId: 'interview-qa',
      icon: '🏛️',
      difficulty: 'Beginner',
      tags: ['Interview', 'OOP', 'Abstract', 'Interface', 'Constructors', 'SOLID'],
      content: [
        {
          heading: 'Q: What is the difference between an abstract class and an interface?',
          body: 'Abstract class: can have state (instance fields), constructors, abstract AND concrete methods, any access modifier. A class can extend only ONE abstract class. Use when subclasses share common state or behavior. Interface: traditionally only method signatures (contracts), but Java 8+ allows default/static methods, Java 9+ private methods. NO instance fields (only static final constants). A class can implement MULTIPLE interfaces. Use to define capabilities. Key rule: use abstract classes for "is-a" with shared state; interfaces for "can-do" capabilities. Example: `abstract class Animal { int age; }` vs `interface Flyable { void fly(); }`.'
        },
        {
          heading: 'Q: Can a constructor be private? What is it used for?',
          body: 'Yes! A private constructor prevents external instantiation. Use cases: 1) Singleton pattern — only one instance exists (use enum instead in modern Java). 2) Utility classes — classes with only static methods (e.g., Math, Collections) use private constructors to prevent instantiation. 3) Factory pattern — force creation through static factory methods that control which subclass/implementation to return. 4) Builder pattern — the product class has a private constructor, and only the Builder can create instances. Records automatically have a canonical constructor but you can add validation in a compact constructor.'
        },
        {
          heading: 'Q: What is the difference between method overloading and method overriding?',
          body: 'Overloading: same method name, different parameters (compile-time polymorphism). Same class or subclass. Parameters MUST differ in number, type, or order. Return type can differ. Access modifier can differ. Resolved at compile-time based on reference type. Example: `print(int)`, `print(String)`, `print(int, String)`. Overriding: subclass redefines a parent method with the SAME signature (runtime polymorphism). Must have same name AND parameters. Return type must be same or covariant (subtype). Cannot reduce visibility. Cannot throw broader checked exceptions. Resolved at runtime based on actual object type. Mark with @Override.'
        },
        {
          heading: 'Q: What are the SOLID principles?',
          body: 'S — Single Responsibility: a class should have only one reason to change. O — Open/Closed: open for extension, closed for modification (use interfaces/abstract classes). L — Liskov Substitution: subtypes must be substitutable for their base types without altering correctness. I — Interface Segregation: many specific interfaces are better than one general-purpose interface. D — Dependency Inversion: depend on abstractions, not concrete implementations (foundation of DI/IoC in Spring). These principles lead to maintainable, testable, and flexible code — essential knowledge for Senior interviews.'
        },
        {
          heading: 'Q: What is the diamond problem and how does Java solve it?',
          body: 'The diamond problem: class D extends B and C, both of which extend A. If B and C override a method from A, which version does D inherit? Java solves this for classes by allowing single inheritance only (extends one class). For interfaces (which allow multiple inheritance since Java 8 default methods): if two interfaces provide conflicting default methods, the implementing class MUST override the method to resolve ambiguity. If one is a class and one is an interface, the class method wins. If an interface extends another, the more specific (child) default wins.'
        }
      ],
      codeExamples: [
        {
          title: 'Abstract Class vs Interface',
          language: 'java',
          code: `// Abstract class — shared state and behavior
public abstract class Animal {
    protected String name;
    protected int age;

    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public abstract String makeSound(); // must implement
    public String toString() { return name + " (age " + age + ")"; } // shared
}

// Interface — capability contract
public interface Flyable {
    void fly();
    default int maxAltitude() { return 1000; } // default method
}

public interface Swimmable {
    void swim();
    default int maxAltitude() { return 0; } // conflict!
}

// Multiple interfaces — must resolve conflict
public class Duck extends Animal implements Flyable, Swimmable {
    public Duck(String name, int age) { super(name, age); }

    @Override public String makeSound() { return "Quack!"; }
    @Override public void fly() { System.out.println(name + " flies"); }
    @Override public void swim() { System.out.println(name + " swims"); }

    @Override // MUST resolve diamond conflict
    public int maxAltitude() { return Flyable.super.maxAltitude(); }
}`
        }
      ]
    },
    {
      id: 'interview-core-concepts',
      title: 'Core Java Interview Q&A',
      description: 'Frequently asked questions — == vs equals, exceptions, garbage collection, String, static, final, and more.',
      categoryId: 'interview-qa',
      icon: '💡',
      difficulty: 'Beginner',
      tags: ['Interview', 'equals', 'Exceptions', 'Garbage Collection', 'String', 'static', 'final'],
      content: [
        {
          heading: 'Q: What is the difference between == and .equals()?',
          body: '`==` compares references for objects (do they point to the same memory location?) and values for primitives. `.equals()` compares logical equality (the CONTENT of objects). By default, Object.equals() uses == (reference comparison), so you MUST override it for meaningful comparison. Always override hashCode() when overriding equals() — this is the equals/hashCode contract required by HashMap and HashSet. Example: `new String("hello") == new String("hello")` is false (different objects), but `new String("hello").equals(new String("hello"))` is true (same content). String literals are interned: `"hello" == "hello"` is true (same pool reference).'
        },
        {
          heading: 'Q: What is the difference between String, StringBuilder, and StringBuffer?',
          body: 'String: immutable — every modification creates a new String object. Thread-safe by immutability. String pool enables caching. Use for: constants, keys, general text. StringBuilder (Java 5): mutable, NOT thread-safe, faster. Use for: string concatenation in loops, building dynamic strings within a single thread. StringBuffer: mutable, thread-safe (all methods synchronized), slower. Use for: mutable strings shared across threads (rare in practice). Performance: StringBuilder > StringBuffer > String concatenation in loops. The compiler optimizes simple concatenation (`"a" + "b"`) but loop concatenation still needs StringBuilder explicitly.'
        },
        {
          heading: 'Q: What is garbage collection? Can you force it?',
          body: 'Garbage Collection (GC) is automatic memory management in Java. The JVM periodically identifies objects that are no longer reachable from GC Roots (active threads, static fields, JNI references) and reclaims their memory. You CANNOT force GC — `System.gc()` is only a "suggestion" that the JVM may ignore. You CAN influence GC by: choosing a GC algorithm (-XX:+UseG1GC, -XX:+UseZGC), setting heap size (-Xms, -Xmx), tuning pause time goals. An object becomes eligible for GC when it has no strong references pointing to it. The finalize() method is deprecated (Java 9+) — use try-with-resources or Cleaner instead.'
        },
        {
          heading: 'Q: What are checked vs unchecked exceptions?',
          body: 'Checked exceptions (compile-time): subclasses of Exception (excluding RuntimeException). The compiler FORCES you to handle them with try-catch or declare with throws. Examples: IOException, SQLException, ClassNotFoundException. Represent recoverable conditions (file not found, network error). Unchecked exceptions (runtime): subclasses of RuntimeException. No compiler enforcement — they represent programming bugs. Examples: NullPointerException, ArrayIndexOutOfBoundsException, IllegalArgumentException, ClassCastException. Errors (OutOfMemoryError, StackOverflowError) are also unchecked — they represent JVM-level problems and should NOT be caught.'
        },
        {
          heading: 'Q: What is the difference between final, finally, and finalize?',
          body: 'final: keyword used for constants (final variable — cannot be reassigned), preventing method overriding (final method), and preventing inheritance (final class — e.g., String). finally: block in try-catch-finally that ALWAYS executes (whether exception occurs or not) — used for cleanup (closing resources). With try-with-resources (Java 7+), finally is often unnecessary. finalize(): DEPRECATED method (Java 9+) called by GC before reclaiming an object — unpredictable timing, performance penalty, resurrection risk. Never use finalize() — use try-with-resources or java.lang.ref.Cleaner instead. These three are completely unrelated despite similar names — a classic trick question.'
        },
        {
          heading: 'Q: What is the String Pool?',
          body: 'The String Pool (String Intern Pool) is a special memory area where Java stores string literals. When you write `String s = "hello"`, Java checks the pool first — if "hello" already exists, it returns the existing reference (no new object created). This is why `"hello" == "hello"` is true. `new String("hello")` always creates a new object on the heap (bypasses pool). You can manually add to the pool with `str.intern()`. Since Java 7, the String Pool is on the heap (moved from PermGen). Benefits: memory savings (no duplicate literals), faster comparisons (== for pooled strings). This is possible because String is immutable.'
        }
      ],
      codeExamples: [
        {
          title: 'Common Interview Code Questions',
          language: 'java',
          code: `// == vs equals
String s1 = "hello";
String s2 = "hello";
String s3 = new String("hello");
System.out.println(s1 == s2);      // true (same pool reference)
System.out.println(s1 == s3);      // false (different objects)
System.out.println(s1.equals(s3)); // true (same content)
System.out.println(s3.intern() == s1); // true (interned → pool)

// final, finally, finalize
final int MAX = 100;          // final — constant
try {
    riskyOperation();
} catch (IOException e) {
    log.error("Failed", e);
} finally {
    cleanup();                 // finally — always executes
}

// StringBuilder vs String concatenation
String slow = "";
for (int i = 0; i < 10000; i++) {
    slow += i;               // creates 10,000 String objects!
}

StringBuilder fast = new StringBuilder();
for (int i = 0; i < 10000; i++) {
    fast.append(i);          // mutates same object — much faster
}

// Exception hierarchy
try {
    int[] arr = new int[5];
    arr[10] = 1;             // ArrayIndexOutOfBoundsException (unchecked)
} catch (ArrayIndexOutOfBoundsException e) {
    System.err.println("Index error: " + e.getMessage());
}`
        }
      ]
    },
    {
      id: 'interview-concurrency-basics',
      title: 'Concurrency Interview Q&A',
      description: 'Threads, multithreading, synchronized, volatile, deadlocks, and thread safety interview questions.',
      categoryId: 'interview-qa',
      icon: '⚡',
      difficulty: 'Intermediate',
      tags: ['Interview', 'Threads', 'Synchronized', 'Volatile', 'Deadlock', 'Multithreading'],
      content: [
        {
          heading: 'Q: What is a thread and what is multithreading?',
          body: 'A thread is a lightweight unit of execution within a process. Each thread has its own stack (local variables, method calls) but shares the heap (objects) with other threads in the same process. Multithreading is the ability to execute multiple threads concurrently, maximizing CPU utilization. Java provides built-in thread support via the Thread class and Runnable interface. Creating threads: 1) Extend Thread class (limited, single inheritance). 2) Implement Runnable (preferred, composition-friendly). 3) Implement Callable<V> (returns a result, can throw exceptions). Always call start() (creates new OS thread) not run() (just a regular method call on the same thread).'
        },
        {
          heading: 'Q: What does synchronized do?',
          body: 'The synchronized keyword provides mutual exclusion — only one thread can execute the synchronized block/method at a time on the SAME monitor object. Synchronized method: locks on `this` (instance method) or the Class object (static method). Synchronized block: `synchronized(lockObj) { ... }` — more flexible, locks on a specific object. Synchronization guarantees: 1) Atomicity — the block executes without interruption by other threads. 2) Visibility — changes made inside are visible to other threads that subsequently acquire the same lock. It uses the object\'s intrinsic lock (monitor). Every object in Java has a monitor — this is why any object can be a lock.'
        },
        {
          heading: 'Q: What is the volatile keyword?',
          body: 'volatile is a variable modifier that ensures memory visibility across threads. Without volatile, a thread may cache a variable\'s value in its CPU register/cache and never see updates from other threads. volatile guarantees: 1) Every read fetches from main memory. 2) Every write flushes to main memory. 3) Prevents instruction reordering around volatile accesses. volatile does NOT provide atomicity — `counter++` on a volatile int is still NOT thread-safe (it\'s read-modify-write, 3 separate operations). Use volatile for: simple flags (boolean running = true), double-checked locking singleton. Use AtomicInteger for atomic compound operations.'
        },
        {
          heading: 'Q: What is a deadlock and how do you prevent it?',
          body: 'Deadlock occurs when two or more threads are each waiting for a lock held by the other, creating a circular dependency — none can proceed. Four conditions (all must be true): 1) Mutual exclusion — resources are non-shareable. 2) Hold and wait — thread holds a resource while waiting for another. 3) No preemption — resources cannot be forcibly taken. 4) Circular wait — T1 waits for T2, T2 waits for T1. Prevention: 1) Lock ordering — always acquire locks in a consistent global order (breaks circular wait). 2) Use tryLock with timeout (ReentrantLock) — give up if lock not available. 3) Avoid nested locks when possible. 4) Use higher-level constructs (concurrent collections, CompletableFuture). Detect with jstack or JMX ThreadMXBean.findDeadlockedThreads().'
        },
        {
          heading: 'Q: What is the difference between wait() and sleep()?',
          body: 'sleep(ms): static method on Thread. Pauses the current thread for the specified time. Does NOT release any locks it holds. No monitor/lock requirement. Can be called anywhere. Throws InterruptedException. wait(): instance method on Object. Releases the intrinsic lock and waits until notify()/notifyAll() is called. MUST be called inside a synchronized block on the same object (otherwise IllegalMonitorStateException). Used for inter-thread communication (producer-consumer). Always call wait() in a while loop (not if) to handle spurious wakeups. Modern alternative: use java.util.concurrent (BlockingQueue, Condition, CountDownLatch) instead of wait/notify for cleaner code.'
        },
        {
          heading: 'Q: What is the difference between Runnable and Callable?',
          body: 'Runnable: `void run()` — no return value, cannot throw checked exceptions. Used with Thread and ExecutorService.execute(). Callable<V>: `V call() throws Exception` — returns a value of type V, can throw checked exceptions. Used with ExecutorService.submit() which returns Future<V>. Future.get() blocks until the result is available (or timeout). In modern Java (8+), prefer CompletableFuture for complex async workflows: it supports chaining (thenApply, thenCompose), combining (thenCombine, allOf), and error handling (exceptionally, handle) — all without blocking.'
        }
      ],
      codeExamples: [
        {
          title: 'Concurrency Interview Examples',
          language: 'java',
          code: `// Thread creation — three ways
// 1. Runnable (preferred)
Thread t1 = new Thread(() -> System.out.println("Runnable"));

// 2. Callable with Future
ExecutorService executor = Executors.newFixedThreadPool(4);
Future<Integer> future = executor.submit(() -> {
    Thread.sleep(1000);
    return 42; // returns a value
});
int result = future.get(5, TimeUnit.SECONDS);

// 3. CompletableFuture (modern)
CompletableFuture.supplyAsync(() -> fetchData())
    .thenApply(data -> transform(data))
    .exceptionally(ex -> fallback());

// Deadlock example
Object lockA = new Object(), lockB = new Object();
// Thread 1: synchronized(lockA) { synchronized(lockB) { ... } }
// Thread 2: synchronized(lockB) { synchronized(lockA) { ... } } // DEADLOCK!
// Fix: always lock in same order: lockA then lockB

// wait/notify pattern (producer-consumer)
synchronized (queue) {
    while (queue.isEmpty()) {
        queue.wait();       // releases lock, waits for notify
    }
    item = queue.remove();
}
// Producer:
synchronized (queue) {
    queue.add(item);
    queue.notifyAll();     // wake up waiting consumers
}

// Modern alternative: BlockingQueue
BlockingQueue<Task> bq = new ArrayBlockingQueue<>(100);
bq.put(task);           // blocks if full
Task t = bq.take();     // blocks if empty`
        }
      ]
    },
];
