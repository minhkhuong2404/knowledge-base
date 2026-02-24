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
        },
        {
          heading: 'Q: What are the four OOP pillars?',
          body: 'Encapsulation: bundles data and methods into a class, restricting direct access to internal state via access modifiers (private fields, public getters/setters). Protects data integrity. Inheritance: one class inherits fields and methods from another (extends). Promotes code reuse. Java supports single class inheritance and multiple interface inheritance. Polymorphism: the same method can behave differently depending on the object type. Compile-time (overloading: same name, different params) and runtime (overriding: subclass provides specific implementation, resolved via dynamic dispatch). Abstraction: hides complex details, exposing only essential features through abstract classes and interfaces.'
        },
        {
          heading: 'Q: What is a Singleton class and how do you create one?',
          body: 'A Singleton class ensures only one instance exists at any time. Creation: 1) Make the constructor private. 2) Create a private static instance. 3) Provide a public static method to return the instance. Thread safety: the basic Singleton is NOT thread-safe. If multiple threads call getInstance() simultaneously, multiple instances could be created. Solutions: synchronized method (slow), double-checked locking with volatile, static holder idiom (lazy + thread-safe), or enum singleton (recommended by Effective Java — immune to reflection and serialization attacks). Spring beans are singletons by default (container-managed).'
        },
        {
          heading: 'Q: What is immutability and how do you create an immutable class?',
          body: 'Immutability means an object\'s state cannot be changed after creation. Immutable objects are useful in concurrent programming because they can be shared across threads without synchronization. To create an immutable class: 1) Declare the class as final (cannot be extended). 2) Make all fields private and final. 3) Don\'t provide setter methods. 4) Initialize all fields through the constructor. 5) For mutable reference fields (like collections), return defensive copies in getters. Examples: String, Integer, LocalDate are all immutable. Java records (Java 16+) create immutable data carriers by default.'
        },
        {
          heading: 'Q: What is the difference between association, aggregation, and composition?',
          body: 'Association: a general "uses" relationship between two independent classes (Teacher uses Student, both exist independently). Aggregation: a weak "has-a" relationship where the child can exist independently of the parent. Example: Department has Employees — if the department is disbanded, employees still exist. Composition: a strong "has-a" relationship where the child cannot exist without the parent. Example: House has Rooms — if the house is destroyed, the rooms cease to exist. The principle "composition over inheritance" advocates using composition (has-a) instead of inheritance (is-a) for more flexible, loosely coupled designs.'
        },
        {
          heading: 'Q: What are access modifiers in Java?',
          body: 'Java has four access modifiers that control visibility: 1) public — accessible from any class, any package. Use for APIs and public contracts. 2) protected — accessible within the same package AND by subclasses in other packages. Ideal for members intended for extension. 3) default (no modifier) — accessible only within the same package (package-private). Use when members should be internal to a module. 4) private — accessible only within the declaring class. Best for internal implementation details. Why use getters/setters instead of public fields? They allow validation, change notification, computed values, and the ability to change internal representation without affecting clients.'
        },
        {
          heading: 'Q: What are anonymous classes?',
          body: 'Anonymous classes are classes without a name, defined and instantiated in a single expression. They create a one-time-use subclass or interface implementation inline. Advantages: reduced boilerplate, encapsulated functionality, ability to override methods on the fly. In modern Java (8+), lambdas replace anonymous classes for functional interfaces (single abstract method), but anonymous classes are still needed when: implementing interfaces with multiple methods, extending concrete classes, or needing to maintain state across method calls.'
        },
        {
          heading: 'Q: What are functional interfaces?',
          body: 'Functional interfaces are interfaces with exactly one abstract method. They are the target types for lambda expressions and method references. Annotate with @FunctionalInterface for compile-time validation. Key built-in functional interfaces: Function<T,R> (transform), Predicate<T> (test), Consumer<T> (accept), Supplier<T> (provide). A functional interface can inherit another interface only if the parent has only static and default methods (not adding another abstract method). They enable functional programming patterns in Java — cleaner, more expressive code.'
        },
        {
          heading: 'Q: What is dynamic method dispatch?',
          body: 'Dynamic method dispatch is the mechanism by which Java decides at runtime which overridden method to call. When a superclass reference points to a subclass object and an overridden method is called, the JVM uses the actual object type (not the reference type) to determine which version to execute. This is the foundation of runtime polymorphism. Example: Animal a = new Dog(); a.speak(); calls Dog.speak(), not Animal.speak(). The decision is made at runtime by looking up the method in the object\'s virtual method table (vtable).'
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
          heading: 'Q: What is the role of each try, catch, and finally block?',
          body: 'try: contains code that might throw exceptions — it defines the scope of exception monitoring. catch: handles specific exceptions thrown in the try block. You can have multiple catch blocks for different exception types, or catch multiple exceptions in one block: catch (IOException | SQLException e). finally: executes code after try/catch regardless of whether an exception occurred — typically for cleanup (closing resources). A return statement in try/catch does NOT prevent finally from executing. The finally block will NOT execute only if System.exit() is called or the JVM crashes. You can use try-finally without a catch block to ensure cleanup while letting the exception propagate up.'
        },
        {
          heading: 'Q: How would you handle multiple exceptions in a single catch block?',
          body: 'Since Java 7, you can catch multiple exception types in a single catch block using the pipe (|) operator: catch (IOException | SQLException e). This handles both exception types with the same logic, reducing code duplication. The caught variable e is implicitly final — you cannot reassign it inside the block. Throwable is the superclass for all errors and exceptions. Exception represents recoverable conditions, while Error (another subclass of Throwable) represents serious JVM issues (OutOfMemoryError, StackOverflowError) that applications should generally not attempt to catch.'
        },
        {
          heading: 'Q: What is the static keyword in Java?',
          body: 'static indicates that a member belongs to the class itself, not to any instance. static fields: shared across all instances (class-level state). static methods: called without creating an instance, cannot access `this` or non-static members directly — you need an object reference. static blocks: execute once during class loading, used for complex static initialization. Can a static block throw an exception? Yes, but it must be handled within the block. Can we override static methods? No — static methods are bound at compile-time (not dynamic dispatch). Can you access non-static members from a static method? Not directly — static methods have no `this` reference. You must create an instance first.'
        },
        {
          heading: 'Q: What is the final keyword and how does it improve code?',
          body: 'final has three uses: 1) final variable — value cannot be changed after assignment (constants). 2) final method — cannot be overridden by subclasses. 3) final class — cannot be extended (e.g., String, Integer). final contributes to immutability: a final field reference cannot point to a different object (though the object itself can still be mutated if it\'s mutable). For thread safety, final ensures safe publication — other threads are guaranteed to see the correct value of final fields after construction. Performance: the JIT compiler can potentially optimize final methods by inlining them.'
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
      id: 'interview-types-wrappers',
      title: 'Data Types, Wrappers & Strings Q&A',
      description: 'Interview questions on primitive vs non-primitive types, wrapper classes, autoboxing pitfalls, String pool, and immutability.',
      categoryId: 'interview-qa',
      icon: '📦',
      difficulty: 'Beginner',
      tags: ['Interview', 'Primitives', 'Wrapper Classes', 'Autoboxing', 'String', 'StringBuilder'],
      content: [
        {
          heading: 'Q: What is the difference between primitive and non-primitive data types?',
          body: 'Primitive data types are basic types predefined by the language with a fixed size — they are not objects. Java has 8 primitives: byte, short, int, long, float, double, char, boolean. They hold values directly and are stored on the stack (when local). Non-primitive data types (reference types) are objects and classes defined by the programmer or Java API. They can call methods, their size is not fixed, and they are stored on the heap. Examples: String, arrays, and any class instances. Primitives have default values (0, false, etc.) and CANNOT be null.'
        },
        {
          heading: 'Q: Can primitive data types be null?',
          body: 'No, primitive data types in Java cannot be null. They always have a default value: 0 for numeric types (int, long, etc.), 0.0 for floating-point types, false for boolean, and \'\\u0000\' for char. If you need a nullable numeric value, use the corresponding wrapper class (Integer, Long, etc.) which can hold null. This is particularly important when working with databases or JSON where null values are common.'
        },
        {
          heading: 'Q: What are wrapper classes and why do we need them?',
          body: 'Wrapper classes are object representations of primitive data types. Each primitive has a corresponding wrapper: Integer (int), Long (long), Double (double), Boolean (boolean), etc. We need them because: 1) Java collections (ArrayList, HashMap, etc.) can only hold objects, not primitives — wrapper classes bridge this gap. 2) Wrapper classes are final and immutable, providing thread safety. 3) They provide utility methods like Integer.parseInt(), Integer.valueOf(), Integer.MAX_VALUE. 4) They enable autoboxing/unboxing for seamless conversion between primitives and objects. 5) They allow representing null values for primitives (useful for database nullable columns).'
        },
        {
          heading: 'Q: Explain autoboxing and unboxing. When can they cause unexpected behavior?',
          body: 'Autoboxing automatically converts a primitive to its wrapper class (int → Integer). Unboxing does the reverse (Integer → int). Unexpected behavior: 1) When comparing two Integer instances using ==, autoboxing may give false results because == compares object references, not values, for integers outside the cache range of -128 to 127. Integer.valueOf(127) == Integer.valueOf(127) is true (cached), but Integer.valueOf(128) == Integer.valueOf(128) is false (different objects). Always use .equals() for wrapper comparisons. 2) NullPointerException can occur when unboxing a null wrapper — assigning null to an Integer and then using it where an int is expected causes NPE. 3) Performance overhead — autoboxing in tight loops creates many short-lived objects that pressure the GC.'
        },
        {
          heading: 'Q: What is the String Pool?',
          body: 'The Java String Pool is a special area in heap memory where all string literals defined in the program are stored. When you create a string literal, the JVM checks the pool for an existing match — if found, the same reference is shared; otherwise, a new string object is created in the pool. This saves memory when the same string is used multiple times. Using new String("abc") bypasses the pool and always creates a new heap object. You can explicitly add to the pool with intern(). The pool works because String is immutable — shared references are safe since the value can never change.'
        },
        {
          heading: 'Q: What is the difference between String, StringBuffer, and StringBuilder?',
          body: 'String is immutable — once created, its value cannot be changed. Every modification (concatenation, replace, etc.) creates a new String object. StringBuffer is mutable and thread-safe — all methods are synchronized, making it suitable for multithreaded environments where strings need to be modified. StringBuilder is similar to StringBuffer but is NOT thread-safe, making it faster for single-threaded scenarios (no synchronization overhead). When to use each: String for constants and general text; StringBuilder for string manipulation in single-threaded code (most common); StringBuffer only when multiple threads modify a shared string concurrently (rare). A scenario where StringBuffer is better than String: a multi-threaded server application building a complex log entry concurrently from different threads.'
        },
        {
          heading: 'Q: What is the difference between a String literal and a String object?',
          body: 'A String literal (e.g., "hello") is stored in the String pool for reusability. If the same literal already exists, the existing reference is returned — no new object is created. A String object created with new String("hello") is always stored on the heap as a separate object, even if it has the same value as a literal in the pool. This means: "hello" == "hello" is true (same pool reference), but new String("hello") == "hello" is false (different objects), while new String("hello").equals("hello") is true (same content). Use intern() to move a heap String into the pool.'
        },
        {
          heading: 'Q: Why is String immutable in Java?',
          body: 'String is immutable for several important reasons: 1) Security — Strings are widely used for sensitive data (class names, file paths, network connections, database URLs). If strings were mutable, these could be changed maliciously. 2) String Pool — immutability enables the String pool optimization. Multiple references can safely share the same String object because no one can modify it. 3) Thread safety — immutable objects are inherently thread-safe without synchronization. 4) Caching hashCode — String caches its hashCode, computed lazily on first call. Since the value cannot change, the hash never needs recalculation, making String ideal as HashMap/HashSet keys. 5) Class loading — the JVM uses strings for class names during class loading; immutability prevents security issues.'
        }
      ],
      codeExamples: [
        {
          title: 'Wrapper Classes and Autoboxing Pitfalls',
          language: 'java',
          code: `// Autoboxing: primitive → wrapper
int primitive = 42;
Integer wrapper = primitive; // autoboxing

// Unboxing: wrapper → primitive
Integer boxed = Integer.valueOf(100);
int unboxed = boxed; // unboxing

// PITFALL 1: == comparison beyond cache range
Integer a = 127, b = 127;
System.out.println(a == b);      // true (cached: -128 to 127)
Integer c = 128, d = 128;
System.out.println(c == d);      // false (different objects!)
System.out.println(c.equals(d)); // true (correct way)

// PITFALL 2: NullPointerException from unboxing null
Integer nullInt = null;
// int value = nullInt; // NPE! Unboxing null

// PITFALL 3: Performance in loops
long sum = 0L;
for (long i = 0; i < 1_000_000; i++) {
    sum += i; // no autoboxing — use primitives in hot loops
}

// String, StringBuilder, StringBuffer comparison
String immutable = "hello";
// immutable.concat(" world"); // returns NEW string, original unchanged

StringBuilder sb = new StringBuilder("hello");
sb.append(" world"); // mutates same object — fast, not thread-safe

StringBuffer sbuf = new StringBuffer("hello");
sbuf.append(" world"); // mutates same object — slower, thread-safe`
        }
      ]
    },
    {
      id: 'interview-serialization-qa',
      title: 'Serialization Interview Q&A',
      description: 'Interview questions about Java serialization — serialVersionUID, transient, Externalizable, and serialization pitfalls.',
      categoryId: 'interview-qa',
      icon: '💾',
      difficulty: 'Intermediate',
      tags: ['Interview', 'Serialization', 'serialVersionUID', 'transient', 'Externalizable'],
      content: [
        {
          heading: 'Q: What is Serialization in Java?',
          body: 'Serialization is the process of converting an object into a byte stream for storage (file, database) or transmission (network). Deserialization is the reverse — restoring an object from the byte stream. To make a class serializable, implement the java.io.Serializable marker interface. All fields are serialized by default unless marked transient or static. Serialization preserves the complete object graph — if an object references other objects, they are serialized too.'
        },
        {
          heading: 'Q: What is serialVersionUID and why is it important?',
          body: 'serialVersionUID is a unique identifier for Serializable classes that ensures version compatibility during deserialization. If not explicitly declared, the JVM generates one based on the class structure (fields, methods, etc.) — any change to the class creates a new UID, causing InvalidClassException during deserialization of old data. Always declare explicitly: private static final long serialVersionUID = 1L. This ensures backward compatibility when the class evolves (adding new fields won\'t break existing serialized data).'
        },
        {
          heading: 'Q: What happens if the serialVersionUID changes during deserialization?',
          body: 'If the serialVersionUID of the class at deserialization time doesn\'t match the UID stored in the serialized data, the JVM considers the class incompatible. This results in an InvalidClassException, preventing incompatible class versions from being used. This is a safety mechanism — without it, deserializing data from an old class version into a new class structure could cause data corruption or crashes.'
        },
        {
          heading: 'Q: How can you prevent certain fields from being serialized?',
          body: 'Mark fields with the transient keyword. Transient fields are excluded from the serialization process — their value will not be saved when the object is serialized, and they receive their default value (null/0/false) upon deserialization. Use transient for: 1) Sensitive data like passwords or tokens. 2) Derived/computed fields that can be recalculated. 3) Non-serializable fields (Thread, Socket, database connections). Note: static fields are also not serialized — they belong to the class, not individual instances.'
        },
        {
          heading: 'Q: Can a class be serialized if one of its member fields is not serializable?',
          body: 'Yes, but only if the non-serializable field is marked transient. If the field is NOT transient AND is not serializable, attempting to serialize the object throws NotSerializableException. Alternatively, you can implement custom serialization by defining writeObject() and readObject() methods to manually handle the non-serializable field — for example, by saving only the necessary data to reconstruct it.'
        },
        {
          heading: 'Q: What is the difference between writeObject()/readObject() methods?',
          body: 'writeObject() and readObject() are private methods you can define to customize the serialization/deserialization process. writeObject() controls how an object is serialized — you can encrypt sensitive data, serialize transient fields selectively, or add extra metadata. readObject() controls deserialization — you can decrypt data, reconstruct transient fields, or validate the deserialized state. Call defaultWriteObject()/defaultReadObject() first to handle the standard serialization, then add custom logic.'
        },
        {
          heading: 'Q: Is it possible to serialize static fields? Why or why not?',
          body: 'No, static fields are not serialized because they belong to the class, not to individual instances. Serialization captures the state of an OBJECT (instance data), and static fields are part of the CLASS state, shared across all instances. When you deserialize an object, static fields retain whatever value the class currently has in the JVM — they are not restored from the serialized data.'
        },
        {
          heading: 'Q: How does Java handle circular references during serialization?',
          body: 'Java handles circular references automatically by keeping track of objects already serialized using an identity-based lookup table. When the same object reference appears again during traversal of the object graph, Java writes a back-reference pointer to the already-serialized object instead of serializing it again. This prevents infinite recursion and correctly maintains the object graph structure. Upon deserialization, the same object identity relationships are restored.'
        }
      ],
      codeExamples: [
        {
          title: 'Serialization with Custom Handling',
          language: 'java',
          code: `public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    private String name;
    private int age;
    private transient String password; // excluded from serialization
    private static String company;    // not serialized (static)

    // Custom serialization — encrypt sensitive data
    private void writeObject(ObjectOutputStream out) throws IOException {
        out.defaultWriteObject(); // serialize non-transient fields
        out.writeObject(encrypt(password));
    }

    private void readObject(ObjectInputStream in)
            throws IOException, ClassNotFoundException {
        in.defaultReadObject(); // deserialize non-transient fields
        this.password = decrypt((String) in.readObject());
    }
}

// Serialize
try (var out = new ObjectOutputStream(new FileOutputStream("user.dat"))) {
    out.writeObject(new User("Alice", 30));
}

// Deserialize
try (var in = new ObjectInputStream(new FileInputStream("user.dat"))) {
    User user = (User) in.readObject();
    // user.password is decrypted; User.company retains current JVM value
}`
        }
      ]
    },
    {
      id: 'interview-collections-qa',
      title: 'Collections Framework Q&A',
      description: 'Interview questions on collections — HashMap internals, HashSet uniqueness, ArrayList vs LinkedList, TreeSet, and time complexity.',
      categoryId: 'interview-qa',
      icon: '🗂️',
      difficulty: 'Intermediate',
      tags: ['Interview', 'HashMap', 'HashSet', 'ArrayList', 'TreeMap', 'Collections'],
      content: [
        {
          heading: 'Q: What is the Java Collection Framework?',
          body: 'The Java Collection Framework is a unified architecture for storing, managing, and manipulating groups of data. It includes interfaces (Collection, List, Set, Queue, Map), implementations (ArrayList, HashMap, TreeSet, etc.), and algorithms (sort, search, shuffle). Main interfaces: Collection (root), List (ordered, allows duplicates), Set (no duplicates), Queue (FIFO), Map (key-value pairs, separate hierarchy). Common methods across all Collection types: add(), remove(), clear(), size(), isEmpty(), contains(), iterator().'
        },
        {
          heading: 'Q: What are the use cases for ArrayList, LinkedList, and HashSet?',
          body: 'ArrayList: use when you need efficient random access to elements via indices (O(1) get) and mostly append at the end. Best for read-heavy workloads with infrequent mid-list modifications. LinkedList: use when you frequently add and remove elements from the beginning or middle of the list (O(1) at head/tail). Good for implementing queues, stacks, or deques. Caveat: O(n) random access. HashSet: use when you need to ensure no duplicates with fast lookups, additions, and deletions (O(1) average). Ideal for membership checks, removing duplicates from a collection, and set operations (union, intersection).'
        },
        {
          heading: 'Q: How does a HashSet ensure no duplicates?',
          body: 'HashSet internally uses a HashMap — each element you add to the HashSet is stored as a KEY in the underlying HashMap (with a constant dummy value). Since HashMap keys must be unique (determined by hashCode() and equals()), HashSet automatically prevents duplicates. When you call add(element): 1) hashCode() is called to determine the bucket. 2) If the bucket has existing entries, equals() is called to check for duplicates. 3) If an equal element already exists, the add returns false; otherwise the element is stored.'
        },
        {
          heading: 'Q: How do hashCode() and equals() work together in collections?',
          body: 'hashCode() determines which bucket an object goes into in hash-based collections (HashMap, HashSet). equals() checks for logical equality between objects in the same bucket to handle collisions. The contract: if a.equals(b) is true, then a.hashCode() == b.hashCode() MUST be true. The reverse is not required (hash collisions are allowed). If you override equals() without overriding hashCode(), objects that are logically equal may end up in different buckets, causing HashMap/HashSet to fail — contains() returns false for an element that was just added.'
        },
        {
          heading: 'Q: Explain the internal working of HashMap in Java.',
          body: 'HashMap stores key-value pairs in an array of "buckets" (Node[] table). Each bucket is initially a linked list. Process: 1) When you put(key, value), the hash of the key determines which bucket. 2) If the bucket is empty, a new Node is created. 3) If the bucket is occupied, entries are compared using hashCode() and equals(). 4) If the key exists, the value is updated; otherwise a new node is appended. 5) If a collision causes the chain length to reach 8 (and table capacity ≥ 64), the linked list converts to a red-black tree for O(log n) lookups. This treeification was introduced in Java 8 — prior to Java 8, collisions always used linked lists, giving O(n) worst case.'
        },
        {
          heading: 'Q: What happens when two keys have the same hash code (collision)?',
          body: 'When two different keys produce the same hashCode, it\'s called a hash collision. Java handles this by storing both entries in the same bucket. Prior to Java 8, entries were chained in a simple linked list (O(n) traversal). Starting from Java 8, if the number of entries in a bucket exceeds 8 (and table capacity is ≥ 64), the linked list is converted to a balanced red-black tree for O(log n) lookups. The equals() method is used to differentiate between keys with the same hash code.'
        },
        {
          heading: 'Q: What is the difference between HashMap and TreeMap?',
          body: 'HashMap: stores key-value pairs with no ordering guarantee. Average O(1) for get/put operations. Allows one null key and multiple null values. Uses hashing internally. TreeMap: stores entries sorted by keys (natural ordering or a Comparator). O(log n) for get/put operations due to its red-black tree structure. Does NOT allow null keys (throws NPE) but allows null values. Provides range operations (subMap, headMap, tailMap). Use HashMap when you need fast lookups without ordering; use TreeMap when you need sorted keys or range queries.'
        },
        {
          heading: 'Q: What is ConcurrentHashMap and how does it improve performance?',
          body: 'ConcurrentHashMap is a thread-safe version of HashMap designed for high-concurrency environments. In Java 7, it used segment-based locking (16 segments = 16 concurrent writers). In Java 8+, it was rewritten to use CAS on empty buckets and per-bucket synchronized blocks — much finer-grained locking. This allows multiple threads to read concurrently (no lock needed for reads) and write to different buckets simultaneously. Performance is 10-100x better than Hashtable or Collections.synchronizedMap() under high contention, because those use a single global lock for ALL operations.'
        },
        {
          heading: 'Q: What is the difference between Iterator and ListIterator?',
          body: 'Iterator allows forward-only traversal of any Collection (List, Set, Queue) using hasNext() and next(). It supports remove() to safely delete the current element during iteration. ListIterator extends Iterator and is specific to Lists. It supports bidirectional traversal (hasNext/next AND hasPrevious/previous), element modification (set()), insertion (add()), and provides the current index (nextIndex/previousIndex). Use Iterator for simple forward scanning; use ListIterator when you need to traverse backwards or modify elements during iteration.'
        },
        {
          heading: 'Q: What are the time complexities of common collection operations?',
          body: 'HashMap/HashSet: average O(1) for insertion, deletion, retrieval; worst case O(n) during rehashing (O(log n) with treeification in Java 8+). Note: HashMap and HashSet are NOT internally sorted. TreeMap/TreeSet: O(log n) for insertion, deletion, and retrieval because they use a red-black tree (self-balancing BST). These maintain sorted order. ArrayList: O(1) for get/set by index, O(1) amortized for add at end, O(n) for add/remove at arbitrary position (shifts elements). LinkedList: O(1) for add/remove at head/tail, O(n) for random access by index.'
        },
        {
          heading: 'Q: What sorting algorithms do Arrays.sort() and Collections.sort() use?',
          body: 'Arrays.sort() uses Dual-Pivot Quicksort for primitive type arrays (faster in practice due to cache locality) and TimSort for object arrays. Collections.sort() uses TimSort — a hybrid algorithm combining merge sort and insertion sort. TimSort is stable (preserves order of equal elements), adaptive (performs well on partially sorted data), and guarantees O(n log n) worst-case time complexity. It was invented by Tim Peters for Python and adopted by Java in JDK 7.'
        },
        {
          heading: 'Q: When would you use a TreeSet over a HashSet?',
          body: 'Use TreeSet when you need elements maintained in sorted order. For example, managing a list of customer names that must be displayed alphabetically, or when you need range queries (headSet, tailSet, subSet). TreeSet guarantees O(log n) for add, remove, and contains. Use HashSet when you only need uniqueness with O(1) average operations and don\'t care about order. For insertion-order preservation without sorting, use LinkedHashSet.'
        }
      ],
      codeExamples: [
        {
          title: 'Collection Operations and Comparisons',
          language: 'java',
          code: `// HashSet duplicate prevention via hashCode/equals
Set<String> names = new HashSet<>();
names.add("Alice"); // true
names.add("Alice"); // false — duplicate

// HashMap collision and treeification
Map<String, Integer> map = new HashMap<>();
map.put("key1", 1); // bucket determined by "key1".hashCode()
map.put("key2", 2); // may or may not collide

// TreeMap — sorted by keys
TreeMap<String, Integer> sorted = new TreeMap<>();
sorted.put("Banana", 2);
sorted.put("Apple", 1);
sorted.put("Cherry", 3);
System.out.println(sorted.firstKey()); // "Apple"
sorted.subMap("Apple", "Cherry");      // range query

// ConcurrentHashMap — atomic compound operations
ConcurrentHashMap<String, Integer> wordCount = new ConcurrentHashMap<>();
wordCount.merge("hello", 1, Integer::sum); // thread-safe increment

// Iterator vs ListIterator
List<String> list = new ArrayList<>(List.of("A", "B", "C"));
ListIterator<String> it = list.listIterator(list.size());
while (it.hasPrevious()) {
    System.out.print(it.previous() + " "); // C B A (reverse)
}

// Comparable vs Comparator
record Employee(String name, int salary) implements Comparable<Employee> {
    @Override
    public int compareTo(Employee other) {
        return Integer.compare(this.salary, other.salary);
    }
}
TreeSet<Employee> bySalary = new TreeSet<>(); // uses natural order
TreeSet<Employee> byName = new TreeSet<>(
    Comparator.comparing(Employee::name)); // custom order`
        }
      ]
    },
    {
      id: 'interview-advanced-core',
      title: 'Advanced Core Java Q&A',
      description: 'Intermediate-to-advanced interview questions — inner classes, enums, generics, serialization, HashMap pitfalls, and design considerations.',
      categoryId: 'interview-qa',
      icon: '🔥',
      difficulty: 'Intermediate',
      tags: ['Interview', 'Inner Classes', 'Enums', 'Generics', 'HashMap', 'Builder Pattern', 'Advanced'],
      content: [
        {
          heading: 'Q: Describe a scenario where you used a PriorityQueue, and explain why it was chosen.',
          body: 'PriorityQueue is ideal for managing tasks by priority rather than arrival order. Unlike regular queues (FIFO), PriorityQueue sorts elements based on their natural ordering or a custom Comparator, ensuring the highest-priority element is always at the head. Use case: a task scheduler where critical tasks must be processed before routine ones. Internally, PriorityQueue is backed by a binary heap — offer/poll operations are O(log n), peek is O(1). It is NOT thread-safe; use PriorityBlockingQueue for concurrent access.'
        },
        {
          heading: 'Q: What is the Builder Pattern and how is it different from the Factory Pattern?',
          body: 'The Builder Pattern constructs complex objects step by step, allowing different parts to be built independently before assembling the final object. It provides fine-grained control over the construction process — e.g., `new Pizza.Builder().size("large").cheese(true).pepperoni(true).build()`. The Factory Pattern creates objects without exposing creation logic, producing a complete object in a single step — e.g., `ShapeFactory.create("circle")`. Use Builder when an object has many optional parameters or complex construction; use Factory when you need to decouple object creation from the client and the creation logic involves selecting among related types.'
        },
        {
          heading: 'Q: Can an enum extend another class in Java?',
          body: 'No. All enums implicitly extend java.lang.Enum, and since Java does not support multiple inheritance for classes, an enum cannot extend any other class. However, enums CAN implement interfaces, allowing additional functionality. Enums are full-featured classes: they can have fields, constructors (private only), and methods. They are thread-safe (constants are initialized in a static block) and are the recommended way to implement the Singleton pattern (Effective Java). You iterate over all values using the values() method, which returns an array of all constants in declaration order.'
        },
        {
          heading: 'Q: What happens if you override only equals() and not hashCode() in a HashMap key class?',
          body: 'This violates the equals/hashCode contract. Java requires that equal objects MUST have the same hash code. If they don\'t, HashMap may store logically equal keys in different buckets, leading to: duplicate keys in the map, contains() returning false for an element that was just added, and get() returning null for an existing key. Always override both methods together. Use Objects.hash() for consistent hashCode generation and ensure the same fields used in equals() are used in hashCode().'
        },
        {
          heading: 'Q: What are the potential issues with using mutable objects as HashMap keys?',
          body: 'If a mutable object is used as a key in a HashMap and its state changes after insertion, its hashCode changes. This makes it impossible to locate the entry in the map — the key is now in the wrong bucket. The result: loss of access to the entry (get returns null), effective data loss, and potential memory leaks (the entry exists but is unreachable). Solution: always use immutable objects as HashMap keys (String, Integer, records, or custom immutable classes). If you must use a mutable key, never modify it after insertion.'
        },
        {
          heading: 'Q: What is the difference between HashMap and IdentityHashMap?',
          body: 'HashMap uses equals() and hashCode() for key comparison — it checks for logical equality. IdentityHashMap uses == (reference equality) — two keys are equal only if they are the exact same object in memory. IdentityHashMap is useful for identity-based operations: topology-preserving object graph transformations, maintaining object references in serialization frameworks, and implementing certain design patterns where object identity matters more than value equality. It is backed by a linear-probe hash table rather than chaining.'
        },
        {
          heading: 'Q: How does Collections.sort() work internally?',
          body: 'Collections.sort() uses TimSort, a hybrid algorithm combining merge sort and insertion sort, invented by Tim Peters for Python and adopted by Java in JDK 7. TimSort is: stable (preserves order of equal elements), adaptive (performs well on partially sorted data), and guarantees O(n log n) worst-case time. It identifies pre-existing sorted runs in the data and merges them efficiently. For primitive arrays, Arrays.sort() uses Dual-Pivot Quicksort instead (faster due to cache locality but not stable). Sorting a list with null elements throws NullPointerException — use a custom Comparator that explicitly handles nulls (Comparator.nullsFirst/nullsLast).'
        },
        {
          heading: 'Q: What happens if two packages have the same class name?',
          body: 'You can use both classes in your program, but you must manage naming conflicts by using fully qualified names. For example, if both java.util and java.sql have a Date class, you can use `java.util.Date utilDate = new java.util.Date();` and `java.sql.Date sqlDate = new java.sql.Date(System.currentTimeMillis());`. You can import one with a regular import and use the fully qualified name for the other. Importing both with wildcards (`import java.util.*; import java.sql.*;`) and then using just `Date` causes a compile error due to ambiguity.'
        },
        {
          heading: 'Q: How are Strings represented in memory?',
          body: 'In Java, Strings are objects of the String class, internally backed by a final char[] (Java 8 and earlier) or final byte[] (Java 9+ with compact strings — Latin-1 uses 1 byte per character, others use 2 bytes via UTF-16). String is immutable — once created, it cannot be changed. The String Pool (moved to heap in Java 7) stores string literals. If you create a string that already exists in the pool, Java reuses the existing reference, saving memory. `new String("abc")` creates up to 2 objects: one in the pool and one on the heap.'
        },
        {
          heading: 'Q: What is Type Erasure in Java?',
          body: 'Type erasure is the process by which the Java compiler removes all generic type information after compilation. At runtime, a List<Integer> and a List<String> are both just List — the generic type parameter is "erased." This was done for backward compatibility with pre-Java 5 code. Consequences: you cannot use instanceof with generic types, cannot create generic arrays (new T[]), cannot overload methods that differ only in generic parameters (both erase to the same signature), and cannot call new T(). Bridge methods are generated by the compiler to maintain polymorphism. The workaround for runtime type information is to pass a Class<T> token as a method parameter.'
        },
        {
          heading: 'Q: Can you sort a list of custom objects without a Comparator?',
          body: 'Yes, but only if the custom objects implement the Comparable interface, which requires defining a compareTo() method specifying the natural ordering. Without Comparable or an explicit Comparator, attempting to sort throws ClassCastException. Use Comparable for the natural/default ordering of a class (e.g., sorting Employees by ID). Use Comparator for alternate orderings (e.g., by name, by salary) or when you cannot modify the class. Java 8+ provides convenient factory methods: Comparator.comparing(Employee::getName).thenComparing(Employee::getSalary).'
        },
        {
          heading: 'Q: How would you choose the initial capacity of an ArrayList that is repeatedly cleared and reused?',
          body: 'Set the initial capacity to the expected maximum size the list reaches during its heaviest use. This avoids frequent resizing and array copying (ArrayList doubles its internal array when full, which is O(n)). If the list typically holds 500 elements at peak, initialize with `new ArrayList<>(500)`. When the list is cleared (clear()), the internal array is NOT resized down — it retains its capacity, which is actually beneficial for reuse scenarios. For unknown or highly variable sizes, the default capacity (10) with automatic growth is usually fine.'
        },
        {
          heading: 'Q: Can you modify a final object reference in Java?',
          body: 'You cannot reassign a final reference to point to a different object. However, the object ITSELF can still be modified if it is mutable. `final List<String> list = new ArrayList<>();` prevents `list = new ArrayList<>()` (compile error), but you CAN call `list.add("item")`, `list.remove(0)`, etc. To make a collection truly immutable, use `List.of()`, `Collections.unmodifiableList()`, or Guava\'s ImmutableList. For custom objects, make all fields private and final, and do not provide setters.'
        },
        {
          heading: 'Q: What is the default access modifier if none is specified?',
          body: 'The default access level is package-private — the member is accessible only within classes in the same package. It is more restrictive than protected (which adds subclass access across packages) and public (everywhere), but less restrictive than private (class only). Package-private is the access level for classes, methods, and fields when no modifier keyword is used. Notably, interface methods are implicitly public, and interface fields are implicitly public static final.'
        }
      ],
      codeExamples: [
        {
          title: 'Builder Pattern and PriorityQueue',
          language: 'java',
          code: `// Builder Pattern — fluent API for complex object construction
public class Pizza {
    private final String size;
    private final boolean cheese;
    private final boolean pepperoni;
    private final boolean mushrooms;

    private Pizza(Builder builder) {
        this.size = builder.size;
        this.cheese = builder.cheese;
        this.pepperoni = builder.pepperoni;
        this.mushrooms = builder.mushrooms;
    }

    public static class Builder {
        private final String size; // required
        private boolean cheese;
        private boolean pepperoni;
        private boolean mushrooms;

        public Builder(String size) { this.size = size; }
        public Builder cheese(boolean v) { cheese = v; return this; }
        public Builder pepperoni(boolean v) { pepperoni = v; return this; }
        public Builder mushrooms(boolean v) { mushrooms = v; return this; }
        public Pizza build() { return new Pizza(this); }
    }
}

Pizza pizza = new Pizza.Builder("large")
    .cheese(true).pepperoni(true).build();

// PriorityQueue — tasks sorted by priority
PriorityQueue<Task> queue = new PriorityQueue<>(
    Comparator.comparingInt(Task::getPriority));
queue.offer(new Task("Low priority", 3));
queue.offer(new Task("Critical", 1));
queue.offer(new Task("Normal", 2));
queue.poll(); // returns "Critical" (priority 1)`
        },
        {
          title: 'Inner Classes and Enum Patterns',
          language: 'java',
          code: `// Non-static inner class — has access to outer class members
public class Outer {
    private int value = 42;

    class Inner {
        int getValue() { return value; } // accesses outer private field
    }
}
Outer.Inner inner = new Outer().new Inner();

// Static nested class — no outer instance needed (preferred)
public class Config {
    public static class Builder { /* ... */ }
}
Config.Builder builder = new Config.Builder();

// Anonymous inner class (pre-Java 8 pattern)
Runnable task = new Runnable() {
    @Override
    public void run() { System.out.println("Running"); }
};

// Enum implementing interface — strategy pattern
public enum MathOp {
    ADD { public double apply(double a, double b) { return a + b; } },
    SUB { public double apply(double a, double b) { return a - b; } };
    public abstract double apply(double a, double b);
}

// Iterating enum values
for (MathOp op : MathOp.values()) {
    System.out.println(op.name() + ": " + op.apply(10, 3));
}`
        }
      ]
    },
    {
      id: 'interview-exception-memory',
      title: 'Exception Handling & Memory Q&A',
      description: 'Interview questions on exception handling, static initialization failures, finally block pitfalls, memory management, and Throwable.',
      categoryId: 'interview-qa',
      icon: '🛡️',
      difficulty: 'Intermediate',
      tags: ['Interview', 'Exceptions', 'Memory', 'finally', 'static', 'Throwable', 'GC'],
      content: [
        {
          heading: 'Q: What happens when an exception is thrown in a static initialization block?',
          body: 'A static initialization block that throws an exception causes java.lang.ExceptionInInitializerError, which prevents the class from loading properly. If any code later attempts to use the class, the JVM throws NoClassDefFoundError because the class was never fully initialized. This mechanism ensures no class is used in a partially initialized state. To avoid this: wrap risky static initialization in try-catch blocks and handle errors gracefully, or use lazy initialization instead of static blocks.'
        },
        {
          heading: 'Q: When would you use a checked exception over an unchecked one?',
          body: 'Use checked exceptions when callers can reasonably recover from the error and MUST be aware of the possibility. Examples: IOException when reading files (retry, use a fallback), SQLException when querying a database (rollback, show error message). Use unchecked exceptions for programming errors that should be fixed in code rather than caught at runtime: NullPointerException, IllegalArgumentException, ArrayIndexOutOfBoundsException. Modern Java frameworks (Spring, Hibernate) prefer unchecked exceptions to reduce boilerplate — they wrap checked exceptions in runtime exceptions.'
        },
        {
          heading: 'Q: Can the finally block cause unexpected behavior?',
          body: 'Yes, in several ways: 1) If a new exception is thrown in the finally block, it obscures the original exception from the try block — the original exception is lost. 2) A return statement in finally overrides the return value from the try or catch block. 3) If close() throws in a manually-written finally, it can mask the primary exception. Try-with-resources (Java 7+) solves these problems: it automatically calls close() and correctly handles suppressed exceptions (accessible via getSuppressed()). Best practice: never throw exceptions or use return statements in finally blocks.'
        },
        {
          heading: 'Q: Why is it bad practice to catch Throwable?',
          body: 'Throwable is the superclass of BOTH Exception and Error. Catching Throwable means catching errors like OutOfMemoryError, StackOverflowError, and VirtualMachineError — serious JVM problems that a normal application should NOT attempt to handle. Catching these can: prevent the application from terminating when it should (corrupted state), mask critical system failures, and lead to unpredictable behavior. Instead, catch specific exception types: catch (IOException | SQLException e). Only catch Exception (not Throwable) as a last resort, and never silently swallow it.'
        },
        {
          heading: 'Q: What is a deadlock in multithreading? How can you prevent it?',
          body: 'A deadlock occurs when two or more threads each hold a lock the other needs, creating a circular dependency where none can proceed. Four necessary conditions: mutual exclusion, hold and wait, no preemption, and circular wait. Prevention strategies: 1) Consistent lock ordering — always acquire locks in the same global order across all threads. 2) Lock timeout — use tryLock(timeout) with ReentrantLock to give up if the lock is not available. 3) Avoid nested locks when possible. 4) Use higher-level concurrency tools (ConcurrentHashMap, BlockingQueue) that manage locking internally. Detection: jstack <pid> reports detected deadlocks; ThreadMXBean.findDeadlockedThreads() for programmatic detection.'
        },
        {
          heading: 'Q: How does Java handle memory leaks?',
          body: 'Java\'s garbage collector automatically reclaims objects no longer reachable from GC roots. However, memory leaks still occur when objects are referenced unintentionally: static collections that grow indefinitely, unclosed resources (streams, connections), listeners/observers not deregistered, ThreadLocal values not cleaned in thread pools, and classloader leaks in app servers. Developers must be vigilant about resource management. Tools: profiling with VisualVM/JProfiler/YourKit, heap dump analysis with Eclipse MAT, jmap -histo for quick histograms, and GC log analysis for identifying gradual memory growth patterns.'
        },
        {
          heading: 'Q: Describe the Java Memory Model (JMM).',
          body: 'The JMM defines how threads interact through memory and what behaviors are allowed in concurrent execution. It specifies rules for reading and writing variables, ensuring visibility, atomicity, and ordering. The core concept is happens-before relationships: if action A happens-before action B, then A\'s effects are guaranteed visible to B. Key happens-before rules: unlock of a monitor HB subsequent lock of same monitor; volatile write HB subsequent volatile read; Thread.start() HB actions in the started thread; actions in a thread HB join() on that thread. Without proper synchronization, one thread may never see writes from another (the visibility problem), or operations may execute in unexpected order due to instruction reordering by the CPU and compiler.'
        },
        {
          heading: 'Q: How does garbage collection handle circular references?',
          body: 'Java uses reachability analysis (NOT reference counting) to identify garbage. Starting from GC roots (local variables, static fields, active threads, JNI references), the GC traces all reachable objects. Objects not reachable from any GC root are eligible for collection — even if they reference each other in a circular manner. This means two objects that point to each other but have no path from any GC root are BOTH collected. This is a key advantage over reference counting (used by Python/Swift), which requires special cycle-detection algorithms.'
        },
        {
          heading: 'Q: How do JVM optimizations affect performance?',
          body: 'JVM optimizations significantly enhance performance: 1) JIT compilation — the JVM starts by interpreting bytecode, then compiles frequently executed (hot) methods to optimized native code. The C1 compiler provides fast compilation; C2 applies aggressive optimizations (inlining, loop unrolling, escape analysis, dead code elimination). 2) Escape analysis — determines if an object is confined to a method/thread; if so, it may be allocated on the stack instead of the heap, or eliminated entirely. 3) Lock optimization — biased locking, lightweight locking, lock coarsening, and lock elimination for uncontended or thread-local locks. 4) Garbage collection tuning — generational collection, concurrent marking, and region-based collection (G1) minimize pause times.'
        },
        {
          heading: 'Q: Can \'this\' be used in a static method or block?',
          body: 'No. The keyword `this` refers to the current instance of a class, and static methods/blocks belong to the class itself, not to any instance. Since static methods can be called without creating an instance, there is no `this` context. Attempting to use `this` in a static context produces a compile error. Similarly, `super` cannot be used in a static context. To access instance members from a static method, you must create or receive an object reference explicitly.'
        },
        {
          heading: 'Q: What happens if an exception occurs during serialization?',
          body: 'If an exception is thrown during serialization, the process fails and the object state is NOT saved. Common exceptions: NotSerializableException (an object in the graph does not implement Serializable), IOException (underlying I/O failure), and InvalidClassException (serialVersionUID mismatch). If a Serializable class contains a member that is NOT serializable, you must either mark that field as transient (excluding it from serialization), make the member class implement Serializable, or provide custom writeObject/readObject methods to handle the field manually.'
        },
        {
          heading: 'Q: What happens when both overloading and overriding exist in the same hierarchy?',
          body: 'Using both in the same class hierarchy can create confusion. The compiler resolves overloading at compile time based on the reference type and parameter types. Overriding is resolved at runtime based on the actual object type. When the signatures are similar (e.g., parent has process(Object) and child has process(String) + overrides process(Object)), it becomes unclear which method is invoked, especially with null arguments or widening conversions. This ambiguity makes code harder to read, maintain, and debug. Best practice: be explicit about intent — use @Override, avoid overloading with similar parameter hierarchies, and prefer distinct method names when the behavior differs significantly.'
        }
      ],
      codeExamples: [
        {
          title: 'Exception Handling Patterns',
          language: 'java',
          code: `// Static initialization exception handling
public class ConfigLoader {
    private static final Properties CONFIG;
    static {
        try {
            CONFIG = loadProperties("config.properties");
        } catch (IOException e) {
            throw new ExceptionInInitializerError(e);
        }
    }
}

// finally block pitfall — return in finally overrides try return
public static int riskyMethod() {
    try {
        return 1;
    } finally {
        return 2; // This wins! Method returns 2, not 1
    }
}

// Try-with-resources handles suppressed exceptions correctly
try (var conn = dataSource.getConnection();
     var stmt = conn.prepareStatement(sql);
     var rs = stmt.executeQuery()) {
    while (rs.next()) {
        process(rs);
    }
} catch (SQLException e) {
    for (Throwable suppressed : e.getSuppressed()) {
        log.warn("Suppressed exception during close", suppressed);
    }
    throw new DataAccessException("Query failed", e);
}

// Multi-catch (Java 7+)
try {
    processData(input);
} catch (IOException | ParseException | ValidationException e) {
    log.error("Processing failed: {}", e.getMessage(), e);
    throw new ServiceException("Data processing failed", e);
}`
        }
      ]
    },
    {
      id: 'interview-java8-qa',
      title: 'Java 8 Features Interview Q&A',
      description: 'Interview questions on Java 8 — lambda expressions, Stream API, Optional, default methods, functional interfaces, and method references.',
      categoryId: 'interview-qa',
      icon: '🌊',
      difficulty: 'Intermediate',
      tags: ['Interview', 'Java 8', 'Lambda', 'Streams', 'Optional', 'Functional Interface'],
      content: [
        {
          heading: 'Q: What are the key features introduced in Java 8?',
          body: 'Java 8 was the biggest release in Java history. Key additions: 1) Lambda expressions — concise syntax for functional-style programming. 2) Stream API — declarative data processing pipelines with lazy evaluation. 3) Optional — container for potentially absent values, reducing NullPointerException. 4) Date/Time API (java.time) — immutable, thread-safe replacement for the terrible Date/Calendar API. 5) Default and static methods in interfaces — enables interface evolution without breaking implementors. 6) Functional interfaces — @FunctionalInterface annotation and predefined interfaces (Function, Predicate, Consumer, Supplier). 7) Method references — shorthand for lambdas that delegate to existing methods.'
        },
        {
          heading: 'Q: What is the difference between a Lambda Expression and an Anonymous Inner Class?',
          body: 'Lambdas are more concise, target only functional interfaces (single abstract method), and do not have their own scope for `this` — `this` refers to the enclosing class. Anonymous inner classes are more verbose, can implement multiple methods, have their own `this` reference, and can extend concrete classes. Lambdas cannot shadow variables from the enclosing scope, while anonymous classes can. Performance: lambdas use invokedynamic under the hood (more efficient) while anonymous classes create a new .class file for each usage. Use lambdas for functional interfaces; use anonymous classes when you need multiple method implementations, your own state, or class extension.'
        },
        {
          heading: 'Q: What is a Functional Interface? Name some predefined ones.',
          body: 'A functional interface has exactly ONE abstract method (can have any number of default/static methods). Annotate with @FunctionalInterface for compile-time validation. Predefined functional interfaces: Function<T,R> — takes T, returns R (apply). Predicate<T> — takes T, returns boolean (test). Consumer<T> — takes T, returns void (accept). Supplier<T> — takes nothing, returns T (get). BiFunction<T,U,R> — takes T and U, returns R. UnaryOperator<T> — takes T, returns T. BinaryOperator<T> — takes two T, returns T. An interface with multiple default methods CAN still be a functional interface as long as it has only ONE abstract method.'
        },
        {
          heading: 'Q: What is Optional and how do you handle null values with it?',
          body: 'Optional is a container that may or may not contain a non-null value. Create: Optional.of(val) — throws NPE if null; Optional.ofNullable(val) — returns empty Optional if null; Optional.empty(). Transform: map(), flatMap(), filter(). Extract: orElse(default), orElseGet(supplier), orElseThrow(). Use Optional for return types where absence is a valid outcome — never for fields, parameters, or collections. Avoid Optional.get() without checking isPresent() — it throws NoSuchElementException. Can Optional be used as a method parameter? Technically yes, but it is discouraged — it complicates method signatures and obscures intent.'
        },
        {
          heading: 'Q: Explain the difference between map() and flatMap() in Streams.',
          body: 'map() applies a function to each element and returns a stream of the results — one-to-one transformation. For example, converting strings to their lengths: stream.map(String::length). flatMap() applies a function that returns a stream for each element, then flattens all streams into a single stream — one-to-many transformation. For example, splitting sentences into words: stream.flatMap(sentence -> Arrays.stream(sentence.split(" "))). Use map() for simple transformations; use flatMap() when each element maps to multiple results or when dealing with nested Optional/Stream.'
        },
        {
          heading: 'Q: What is the difference between peek() and map()?',
          body: 'map() transforms each element and returns a new stream of transformed elements — it is designed for data transformation. peek() performs a side-effect action on each element without altering the stream — it returns the same stream unchanged. peek() is primarily intended for debugging (inspecting elements as they flow through the pipeline). Caution: relying on peek() for business logic is fragile because peek actions may not execute if the terminal operation short-circuits or if the stream is lazy. Also, side effects in peek() can cause unpredictable results in parallel streams.'
        },
        {
          heading: 'Q: What are Default Methods and why were they introduced?',
          body: 'Default methods (Java 8) are methods in interfaces that have a body (implementation). They were introduced to enable interface evolution without breaking existing implementations. Before default methods, adding a new method to an interface required ALL implementing classes to provide an implementation — breaking backward compatibility. With default methods, the interface provides a fallback implementation. Static methods in interfaces (also Java 8) provide utility methods that can be called on the interface itself. Key difference: default methods are invoked on instances; static methods are invoked on the interface type.'
        },
        {
          heading: 'Q: How does Java 8 handle parallel processing with Streams?',
          body: 'Calling parallelStream() or stream().parallel() creates a parallel stream that splits data into chunks processed concurrently using the common ForkJoinPool. The framework handles decomposition, parallel execution, and merging results. Caveats: parallel streams share the common ForkJoinPool (a slow task blocks other parallel streams), they add overhead from task splitting/merging, and they are only beneficial for CPU-bound operations on large datasets (>10K elements typically). IO-bound operations and small datasets are often slower with parallel streams. Also, operations with side effects (modifying shared state) break parallelism and cause race conditions.'
        },
        {
          heading: 'Q: What is the significance of the Collectors class?',
          body: 'Collectors provides factory methods for common mutable reduction operations used with Stream.collect(). Key collectors: toList(), toSet(), toMap() — collect into collections. groupingBy() — group elements by a classifier function. partitioningBy() — split into true/false groups. joining() — concatenate strings. summarizingInt/Long/Double() — statistics (count, sum, min, max, average). counting() — count elements in groups. Custom collectors can be built with Collector.of(). Collectors enable complex aggregation operations in a declarative, composable style.'
        },
        {
          heading: 'Q: What are method references and how do they relate to lambdas?',
          body: 'Method references are shorthand notation for lambdas that simply delegate to existing methods. Four types: 1) Static method: Math::abs equivalent to x -> Math.abs(x). 2) Instance method of a particular object: str::length equivalent to () -> str.length(). 3) Instance method of an arbitrary object: String::length equivalent to s -> s.length(). 4) Constructor: ArrayList::new equivalent to () -> new ArrayList<>(). Method references improve readability by removing the lambda boilerplate when the lambda simply calls a single method. They work with functional interfaces just like lambdas.'
        },
        {
          heading: 'Q: How can you convert a List to a Map using Streams?',
          body: 'Use collect(Collectors.toMap(keyMapper, valueMapper)). For example, converting a list of employees to a map by ID: `employees.stream().collect(Collectors.toMap(Employee::getId, Function.identity()))`. To handle duplicate keys, provide a merge function: `Collectors.toMap(Employee::getDepartment, Employee::getSalary, Long::sum)`. To specify the map implementation: add a fourth parameter as a map supplier: `Collectors.toMap(keyFn, valFn, mergeFn, LinkedHashMap::new)`. Without a merge function, duplicate keys throw IllegalStateException.'
        },
        {
          heading: 'Q: Is it possible to use synchronized inside a Lambda expression?',
          body: 'You cannot use the synchronized keyword directly as a statement inside a lambda body. Lambdas are meant to be concise, stateless blocks — they do not have an intrinsic lock object to synchronize on. If synchronization is needed, you must synchronize on an external object: `synchronized(lockObj) { ... }` within the lambda, or handle synchronization outside the lambda entirely using higher-level concurrency utilities (ReentrantLock, ConcurrentHashMap, AtomicInteger). In general, if you need synchronization inside a lambda, it is a sign that you may want to rethink the design.'
        },
        {
          heading: 'Q: How is Java 8 backward-compatible with earlier versions?',
          body: 'Java 8 maintains backward compatibility through default methods in interfaces. New methods (like stream(), forEach(), removeIf()) were added to existing interfaces (Collection, Iterable, List) as default methods, so existing implementations do not need to change. The bytecode format is backward-compatible — older JARs run on Java 8+ JVMs without recompilation. The JVM ensures that existing interfaces can evolve without breaking implementations, and the diamond operator, generics, and existing APIs continue to work as before.'
        }
      ],
      codeExamples: [
        {
          title: 'Java 8 Interview Code Examples',
          language: 'java',
          code: `// Lambda vs Anonymous class — 'this' behavior
public class LambdaDemo {
    private String name = "Outer";

    void demo() {
        // Lambda: 'this' refers to LambdaDemo instance
        Runnable lambda = () -> System.out.println(this.name); // "Outer"

        // Anonymous class: 'this' refers to Runnable instance
        Runnable anon = new Runnable() {
            private String name = "Anon";
            @Override public void run() {
                System.out.println(this.name); // "Anon"
            }
        };
    }
}

// Effectively final variable capture
void capture() {
    int count = 0; // effectively final — never modified
    Runnable r = () -> System.out.println(count); // OK
    // count++; // uncomment → compile error in lambda above
}

// Infinite stream with limit
List<Integer> powers = Stream.iterate(1, n -> n * 2)
    .limit(10)
    .toList(); // [1, 2, 4, 8, 16, 32, 64, 128, 256, 512]

// List to Map with duplicate key handling
Map<String, Long> salaryByDept = employees.stream()
    .collect(Collectors.toMap(
        Employee::getDepartment,
        Employee::getSalary,
        Long::sum // merge: sum salaries for duplicate departments
    ));

// Optional chaining
String result = Optional.ofNullable(getUser())
    .flatMap(User::getAddress)
    .map(Address::getCity)
    .filter(city -> !city.isBlank())
    .orElse("Unknown");`
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
        },
        {
          heading: 'Q: Can we start a thread twice?',
          body: 'No, a thread in Java cannot be started more than once. Once a thread has completed execution (TERMINATED state), calling start() again throws IllegalThreadStateException. The thread lifecycle goes: NEW → RUNNABLE → (BLOCKED/WAITING/TIMED_WAITING) → TERMINATED, and there is no transition back from TERMINATED. If you need to re-execute the same task, create a new Thread instance with the same Runnable.'
        },
        {
          heading: 'Q: What is the difference between the Thread class and the Runnable interface?',
          body: 'Thread class: you extend Thread and override run(). Limitation: Java doesn\'t support multiple inheritance, so extending Thread prevents extending another class. The Runnable interface: you implement Runnable and pass it to a Thread constructor. Advantages: supports composition (implement Runnable + extend another class), separates the task from the execution mechanism, can be submitted to ExecutorService. Best practice: always prefer Runnable (or Callable) over extending Thread — it provides better separation of concerns and flexibility.'
        },
        {
          heading: 'Q: How can you ensure a method is thread-safe?',
          body: 'Multiple approaches: 1) Synchronization — use synchronized blocks/methods or ReentrantLock to ensure mutual exclusion. 2) Volatile variables — for simple reads/writes of shared flags. 3) Atomic classes — AtomicInteger, AtomicReference for lock-free compound operations. 4) Concurrent collections — ConcurrentHashMap, CopyOnWriteArrayList instead of synchronized wrappers. 5) Immutability — immutable objects are inherently thread-safe. 6) Thread confinement — keep data local to a thread (ThreadLocal). The best approach depends on the use case: immutability is safest, concurrent collections are most practical for shared data structures.'
        },
        {
          heading: 'Q: What is the Java Memory Model (JMM) and how is it linked to threads?',
          body: 'The Java Memory Model defines the rules for when a thread is guaranteed to see writes from other threads. Modern CPUs have multiple cache levels — without proper synchronization, one thread may not see changes made by another. The JMM establishes happens-before relationships that guarantee visibility: 1) Unlock of a monitor happens-before subsequent lock of the same monitor. 2) Write to a volatile field happens-before subsequent read. 3) Thread.start() happens-before any action in the started thread. 4) All actions in a thread happen-before Thread.join() returns. Understanding JMM explains why you need volatile, synchronized, or atomic classes for shared mutable state.'
        },
        {
          heading: 'Q: What are the main challenges with multithreaded programs?',
          body: 'Key challenges: 1) Race conditions — when the program outcome depends on the timing of thread execution (e.g., two threads incrementing the same counter). 2) Deadlocks — two or more threads each waiting for a lock held by the other. 3) Starvation — a thread cannot get the resources it needs to proceed because other threads monopolize them. 4) Livelock — threads keep responding to each other but never make progress. 5) Memory visibility — changes made by one thread may not be visible to other threads without proper synchronization. 6) Resource contention — threads compete for shared resources, causing performance degradation. Debugging is particularly difficult because bugs may be intermittent and depend on timing.'
        },
        {
          heading: 'Q: What is the difference between synchronized and ReentrantLock?',
          body: 'Both provide locking mechanisms, but they differ in flexibility. synchronized: simpler syntax, automatic lock release (even on exception), no risk of forgetting to unlock. ReentrantLock: supports tryLock() for non-blocking attempts, lockInterruptibly() for interruptible waiting, fairness policies (FIFO ordering), and multiple Conditions (vs single wait/notify). Both are reentrant — the same thread can acquire the same lock multiple times. Use synchronized for simple cases; ReentrantLock when you need timeout-based locking, interruptibility, or multiple condition variables.'
        },
        {
          heading: 'Q: What is a synchronized collection vs a concurrent collection?',
          body: 'Synchronized collections (Collections.synchronizedList(), Hashtable) use a single global lock for ALL operations — one thread at a time can access the collection, creating a bottleneck. Concurrent collections (ConcurrentHashMap, CopyOnWriteArrayList) are designed for concurrent access with much better performance: ConcurrentHashMap uses per-bucket locking (Java 8+), CopyOnWriteArrayList creates array copies on write for lock-free reads. Concurrent collections also support atomic compound operations (computeIfAbsent, merge) that would require external synchronization with synchronized collections.'
        },
        {
          heading: 'Q: What are ThreadLocal variables and their use cases?',
          body: 'ThreadLocal provides thread-confined variables — each thread has its own independent copy, eliminating the need for synchronization. Common use cases: per-thread database connections, SimpleDateFormat instances (which are not thread-safe), request context propagation (user ID, trace ID) in web applications, and transaction management in frameworks. Critical: ALWAYS call remove() when done, especially in thread pool environments — otherwise the value persists across task executions, causing memory leaks and incorrect behavior. InheritableThreadLocal copies the parent value to child threads at creation time.'
        },
        {
          heading: 'Q: What is the role of ExecutorService? What is the difference between submit() and execute()?',
          body: 'ExecutorService manages thread pools and task execution, providing higher-level abstractions over raw threads. It handles thread lifecycle, task queuing, and graceful shutdown. execute(Runnable) runs the task with no return value and no way to check completion or catch exceptions from the caller. submit(Callable/Runnable) returns a Future that can be used to retrieve the result, check if the task completed, or cancel it. submit() catches exceptions and stores them in the Future; execute() propagates exceptions to the thread\'s UncaughtExceptionHandler. Always prefer submit() for better error handling and task management.'
        },
        {
          heading: 'Q: How do you check if a Thread holds a lock?',
          body: 'Use Thread.holdsLock(Object obj) — a static method that returns true if the current thread holds the monitor lock on the specified object. This is useful for debugging and assertion checks (e.g., assert Thread.holdsLock(lock) : "Lock not held"). For ReentrantLock, use lock.isHeldByCurrentThread(). To inspect locks held by OTHER threads, use jstack for thread dumps or ThreadMXBean for programmatic deadlock detection. Note: holdsLock() only checks intrinsic (synchronized) locks, not j.u.c. locks.'
        },
        {
          heading: 'Q: How do you get a thread dump in Java?',
          body: 'Several methods: 1) jstack <pid> — JDK tool that prints all thread stack traces and detects deadlocks. 2) jcmd <pid> Thread.print — alternative using jcmd. 3) kill -3 <pid> (Unix) or Ctrl+Break (Windows) — sends SIGQUIT, JVM prints thread dump to stdout. 4) Programmatically: Thread.getAllStackTraces() returns a map of all threads and their stack traces. 5) JMX: ThreadMXBean.dumpAllThreads(). Best practice: take 3-5 dumps 5-10 seconds apart to identify threads consistently stuck at the same point. Thread dumps show thread states (RUNNABLE, BLOCKED, WAITING), locks held/waited for, and full stack traces.'
        },
        {
          heading: 'Q: Can volatile variables replace synchronization?',
          body: 'No. Volatile ensures visibility (writes are immediately visible to other threads) and ordering (prevents instruction reordering), but it does NOT provide atomicity for compound operations. For example, volatile int count; count++ is NOT atomic — it is three operations: read, increment, write. Two threads can read the same value and both write the same incremented value, losing one update. Volatile is sufficient only for simple read/write of a single variable (e.g., a boolean flag). For compound operations, use synchronized, AtomicInteger, or ReentrantLock.'
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
