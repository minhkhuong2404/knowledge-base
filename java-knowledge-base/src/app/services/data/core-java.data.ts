import { Topic } from '../../models/knowledge.model';

export const CORE_JAVA_TOPICS: Topic[] = [
  {
    id: 'java-fundamentals',
    title: 'Java Basics & Data Types',
    description:
      'JDK/JRE/JVM, primitive vs reference types, autoboxing, String immutability, pass-by-value, and platform independence.',
    categoryId: 'core-java',
    icon: '📝',
    difficulty: 'Beginner',
    tags: [
      'Data Types',
      'Primitives',
      'String',
      'Autoboxing',
      'Pass-by-Value',
      'JDK',
      'JRE',
      'JVM',
      'String Pool',
      'Immutability',
      'hashCode',
      'equals',
      'Wrapper Classes',
      'Integer Cache',
    ],
    content: [
      {
        heading: 'What is Java & Platform Independence',
        body: 'Java is a high-level, class-based, object-oriented programming language designed to have as few implementation dependencies as possible.\nKey features: **platform independence** ("Write Once, Run Anywhere"), strong OOP support, **automatic garbage collection**, robust security, built-in multithreading, and a massive standard library.\n\nJava source code is compiled to **bytecode** (`.class` files) which runs on the **JVM**, making it platform-independent — *the same bytecode runs on Windows, Linux, and macOS*.',
      },
      {
        heading: 'JDK vs JRE vs JVM',
        body: '**JVM** (Java Virtual Machine): the engine that executes Java bytecode. It provides platform independence by abstracting the underlying OS. *Each platform has its own JVM implementation.*\n**JRE** (Java Runtime Environment): JVM + core libraries (`java.lang`, `java.util`, etc.) + supporting files. Everything needed to **RUN** Java applications.\n**JDK** (Java Development Kit): JRE + development tools (`javac` compiler, `jdb` debugger, `jar` tool, `javadoc`, `jshell`). Everything needed to **DEVELOP** Java applications.\n\nSince Java 11, Oracle distributes only the JDK (*no separate JRE download*). The relationship: **JDK ⊃ JRE ⊃ JVM**.',
      },
      {
        heading: 'Primitive Types',
        body: 'Java has **8 primitive types**: `byte` (8-bit), `short` (16-bit), `int` (32-bit), `long` (64-bit), `float` (32-bit IEEE 754), `double` (64-bit IEEE 754), `char` (16-bit Unicode), and `boolean`.\nPrimitives are stored on the **stack** (when local) and hold values directly. Their wrapper classes (`Integer`, `Long`, etc.) are stored on the **heap** as objects.',
      },
      {
        heading: 'Autoboxing & Integer Cache',
        body: '**Autoboxing** automatically converts primitives to wrappers and vice versa.\nImportant: **Integer caches values from -128 to 127**, so `Integer.valueOf(127) == Integer.valueOf(127)` is true, but `Integer.valueOf(128) == Integer.valueOf(128)` is false. Always use `.equals()` to compare wrapper objects.\nThe cache range can be extended with `-XX:AutoBoxCacheMax=<size>`.',
      },
      {
        heading: 'String Immutability & String Pool',
        body: '**String is immutable** — backed by a `final char[]` (Java 8) or `final byte[]` (Java 9+ with compact strings). String literals are interned in the **String Pool** (*moved to heap in Java 7*).\n`new String("abc")` creates up to 2 objects (*one in pool, one on heap*). Use `StringBuilder` for mutable string manipulation (*not `StringBuffer` which adds unnecessary synchronization*).\n\nString immutability enables safe sharing across threads, caching of `hashCode`, and use as `HashMap` keys.',
      },
      {
        heading: 'Why Java is Always Pass-by-Value',
        body: "Java is strictly **pass-by-value**. For primitives, a copy of the value is passed. For objects, a copy of the reference (pointer) is passed — **NOT the object itself**.\nThis means you can modify the object's state through the reference, but you **cannot** make the caller's reference point to a different object. Reassigning the parameter inside a method does not affect the caller.\n\n*This is the most commonly misunderstood Java concept.*",
      },
      {
        heading: '== vs equals() vs hashCode()',
        body: '`==` compares **reference identity** for objects, value for primitives. `equals()` compares **logical equality** (must be overridden).\nThe **equals/hashCode contract**: if `a.equals(b)` is true, then `a.hashCode() == b.hashCode()` must be true. The reverse is not required (*hash collisions are allowed*).\n\nViolating this contract breaks `HashMap` and `HashSet`. Use `Objects.equals()` for null-safe comparison.',
      },
      {
        heading: 'Real-World Analogy',
        body: '**Primitives** — *think of labeled boxes on a shelf. Each box physically contains its value. When you copy a primitive, you make a completely new box with the same content.*\n\n**Reference types** — *like sticky notes (labels) attached to boxes. The sticky note tells you where the box is, but multiple sticky notes can point to the same box. When you copy a reference, you copy the sticky note — not the box.*\n\nThis is why two `Integer` variables can reference the same cached object (values -128 to 127) but different objects for larger values.\n\n**String Pool** — *string literals are like a shared warehouse where identical labels all point to the same physical crate, saving memory and enabling fast reference comparison.*',
      },
    ],
    codeExamples: [
      {
        title: 'Pass-by-Value Demonstration',
        language: 'java',
        code: `public class PassByValueDemo {
    public static void main(String[] args) {
        // Primitive: copy of value
        int x = 10;
        modify(x);
        System.out.println(x); // Still 10

        // Object reference: copy of reference
        StringBuilder sb = new StringBuilder("hello");
        append(sb);
        System.out.println(sb); // "hello world" — object modified

        // But reassigning the reference has no effect on caller
        reassign(sb);
        System.out.println(sb); // Still "hello world"
    }

    static void modify(int val) { val = 20; }
    static void append(StringBuilder s) { s.append(" world"); }
    static void reassign(StringBuilder s) { s = new StringBuilder("new"); }
}`,
      },
      {
        title: 'equals() and hashCode() Contract',
        language: 'java',
        code: `public class Employee {
    private final long id;
    private final String name;

    public Employee(long id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Employee e)) return false;
        return id == e.id && Objects.equals(name, e.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}`,
      },
      {
        title: 'String Pool Behavior',
        language: 'java',
        code: `public class StringPoolDemo {
    public static void main(String[] args) {
        // Literals share the same pooled instance
        String a = "hello";
        String b = "hello";
        System.out.println(a == b);           // true — same pool reference

        // 'new' forces a distinct heap object
        String c = new String("hello");
        System.out.println(a == c);           // false — different objects
        System.out.println(a.equals(c));      // true  — same content

        // intern() returns the pool reference for the content
        String d = c.intern();
        System.out.println(a == d);           // true — d now points to pooled "hello"

        // Compile-time constant folding also uses the pool
        String e = "hel" + "lo";
        System.out.println(a == e);           // true — resolved at compile time

        // Runtime concatenation creates a new object
        String f = "hel";
        String g = f + "lo";
        System.out.println(a == g);           // false — computed at runtime
    }
}`,
      },
    ],
  },
  {
    id: 'oop-principles',
    title: 'OOP Principles',
    description:
      'Encapsulation, Inheritance, Polymorphism, Abstraction, constructors, and method overloading vs overriding.',
    categoryId: 'core-java',
    icon: '🎯',
    difficulty: 'Beginner',
    tags: [
      'OOP',
      'Encapsulation',
      'Inheritance',
      'Polymorphism',
      'Abstraction',
      'Constructors',
      'Method Overloading',
      'Method Overriding',
      'Interface',
      'Abstract Class',
      'Composition',
    ],
    content: [
      {
        heading: 'Overview',
        body: '**Object-Oriented Programming** (OOP) is a paradigm centered around objects rather than functions. Java is inherently object-oriented — *almost everything is an object*.\nThe four core OOP principles are **Encapsulation**, **Inheritance**, **Polymorphism**, and **Abstraction**.',
      },
      {
        heading: 'Encapsulation',
        body: '**Encapsulation** bundles data (fields) and methods that operate on that data into a single unit (class), restricting direct access to some components. Use private fields with public getters/setters.\nThis protects internal state, enforces invariants, and allows internal implementation changes without affecting clients.\n\nAccess modifiers: `private` (class only), default/package-private (same package), `protected` (same package + subclasses), `public` (everywhere).',
      },
      {
        heading: 'Inheritance',
        body: '**Inheritance** allows a class to inherit fields and methods from another class using the `extends` keyword. Java supports **single inheritance** for classes but **multiple inheritance** through interfaces. Use `super` to call parent constructors and methods.\n\n**Composition over inheritance**: prefer "has-a" over "is-a" relationships to avoid tight coupling and fragile base class problems. *Use inheritance only when there is a genuine is-a relationship and the Liskov Substitution Principle holds.*',
      },
      {
        heading: 'Polymorphism',
        body: '**Polymorphism** means "many forms."\n**Compile-time polymorphism** (method overloading): same method name, different parameter lists — resolved at compile time.\n**Runtime polymorphism** (method overriding): subclass provides specific implementation — resolved via **dynamic dispatch** based on actual object type.\n\nMethod overriding rules: same signature, covariant return type allowed, cannot reduce visibility, cannot throw broader checked exceptions.',
      },
      {
        heading: 'Abstraction & Interfaces vs Abstract Classes',
        body: '**Abstraction** hides complex implementation details and exposes only essential features.\n**Abstract classes**: can have state (fields), constructors, and both abstract and concrete methods — use when subclasses share common state/behavior. A class with an abstract method MUST itself be declared `abstract`.\n**Interfaces**: pure contracts (Java 8+ supports `default` and `static` methods, Java 9+ `private` methods) — use for defining capabilities and achieving multiple inheritance.\n\nSince Java 8, the line between them has blurred, but the key difference remains: abstract classes model "what something IS," interfaces model "what something CAN DO." *Java supports multiple inheritance through interfaces — a class can implement many interfaces, combining different sets of capabilities.*',
      },
      {
        heading: 'Constructors',
        body: '**Constructors** are special methods used to initialize objects — they have the same name as the class and no return type.\nDefault constructor: if no constructor is defined, the compiler generates a no-arg constructor. *Once you define ANY constructor, the default is no longer generated.*\n**Constructor chaining**: use `this(...)` to call another constructor in the same class (must be first statement), or `super(...)` to call a parent constructor (implicitly `super()` if omitted).\n\nConstructors are **NOT** inherited. **Copy constructors** (manually written) create a new object from an existing one — *safer than `clone()`*.',
      },
      {
        heading: 'Method Overloading vs Overriding',
        body: "**Overloading** (compile-time polymorphism): same method name, different parameter lists (number, type, or order). Return type alone is not sufficient for overloading. Resolved at compile time based on reference type.\nThe compiler selects the most specific matching method; if ambiguous, it produces a compile error. *Can method overloading be determined at runtime? No — it is always resolved at compile time.*\n\n**Overriding** (runtime polymorphism): subclass provides a specific implementation of a method already defined in the parent. Rules: same name AND same parameters, covariant return type allowed (subtype of parent's return), access cannot be more restrictive, cannot throw broader checked exceptions.\nUse `@Override` annotation to catch mistakes at compile time. Declaring a method as `final` prevents it from being overridden — *use this when the method's behavior must remain consistent across all subclasses*.\n\n*Using both overloading and overriding in the same class hierarchy can lead to confusion about which method is called, especially with similar signatures.*",
      },
      {
        heading: 'Real-World Analogy',
        body: '**Encapsulation** — *like the engine hidden under the hood. You interact through a clean interface (pedals, steering wheel) without worrying about the internal combustion process.*\n\n**Inheritance** — *the "is-a" relationship: a Sedan is-a Car, a Truck is-a Car. They inherit common traits (wheels, engine, brakes) from the parent.*\n\n**Polymorphism** — *the same "drive" command works differently depending on the vehicle. A sports car accelerates aggressively, a truck prioritizes torque — the behavior changes based on the actual type at runtime.*\n\n**Abstraction** — *the steering wheel itself. It abstracts away the complex mechanics of rack-and-pinion gears, power steering fluid, and tie rods into a simple "turn left or right" interface. You don\'t need to know how it works to use it effectively.*',
      },
    ],
    codeExamples: [
      {
        title: 'Constructors and Overloading/Overriding',
        language: 'java',
        code: `public class Person {
    private final String name;
    private final int age;

    // Primary constructor
    public Person(String name, int age) {
        this.name = Objects.requireNonNull(name);
        this.age = age;
    }

    // Constructor chaining — delegates to primary
    public Person(String name) {
        this(name, 0); // calls Person(String, int)
    }

    // Copy constructor
    public Person(Person other) {
        this(other.name, other.age);
    }

    // Method overloading — same name, different params
    public String greet() { return "Hello, I'm " + name; }
    public String greet(String greeting) { return greeting + ", I'm " + name; }
}

public class Employee extends Person {
    private final String role;

    public Employee(String name, int age, String role) {
        super(name, age);  // must be first statement
        this.role = role;
    }

    @Override // Method overriding — same signature
    public String greet() { return super.greet() + ", " + role; }
}`,
      },
      {
        title: 'Polymorphism and Abstraction',
        language: 'java',
        code: `public sealed interface Shape permits Circle, Rectangle, Triangle {
    double area();
    double perimeter();
}

public record Circle(double radius) implements Shape {
    @Override public double area() { return Math.PI * radius * radius; }
    @Override public double perimeter() { return 2 * Math.PI * radius; }
}

public record Rectangle(double width, double height) implements Shape {
    @Override public double area() { return width * height; }
    @Override public double perimeter() { return 2 * (width + height); }
}

// Runtime polymorphism — actual type determines method called
Shape shape = new Circle(5);
System.out.println(shape.area()); // 78.54 — Circle.area() via dynamic dispatch`,
      },
      {
        title: 'Interface with Default Methods',
        language: 'java',
        code: `public interface Loggable {
    String getLogPrefix();

    // Default method — provides implementation in the interface
    default void log(String message) {
        System.out.printf("[%s] %s: %s%n",
            java.time.LocalTime.now(), getLogPrefix(), message);
    }

    // Interfaces can have static utility methods (Java 8+)
    static Loggable withPrefix(String prefix) {
        return () -> prefix; // functional interface shorthand
    }

    // Private helper methods (Java 9+) — shared by defaults
    private String formatEntry(String level, String msg) {
        return String.format("[%s][%s] %s", level, getLogPrefix(), msg);
    }

    default void warn(String message) {
        System.out.println(formatEntry("WARN", message));
    }

    default void error(String message) {
        System.err.println(formatEntry("ERROR", message));
    }
}

public class OrderService implements Loggable {
    @Override
    public String getLogPrefix() { return "OrderService"; }

    public void placeOrder(String item) {
        log("Placing order for: " + item);    // uses default method
        warn("Inventory running low");         // uses default method
    }
}

// Diamond problem resolution — must override if two interfaces
// provide the same default method
public interface Auditable {
    default void log(String msg) { System.out.println("AUDIT: " + msg); }
}

public class AuditedOrderService implements Loggable, Auditable {
    @Override
    public String getLogPrefix() { return "AuditedOrder"; }

    @Override // Must resolve conflict explicitly
    public void log(String message) {
        Loggable.super.log(message);  // choose which default to delegate to
    }
}`,
      },
    ],
  },
  {
    id: 'java-keywords',
    title: 'Java Keywords Summary',
    description:
      'Deep dive into important Java keywords — static, final, this, super, volatile, transient, and enums.',
    categoryId: 'core-java',
    icon: '🔑',
    difficulty: 'Intermediate',
    tags: [
      'static',
      'final',
      'volatile',
      'transient',
      'synchronized',
      'Enum',
      'Keywords',
      'Inner Classes',
      'Marker Interface',
      'Static Import',
      'EnumSet',
      'EnumMap',
      'Access Modifiers',
    ],
    content: [
      {
        heading: 'static Keyword',
        body: "`static` members belong to the class, not instances.\n`static` fields: shared across all instances (class-level state). `static` methods: called without an instance, cannot access `this` or instance members.\n`static` blocks: execute once during class loading — *used for complex static initialization*.\n`static` inner classes: don't hold a reference to the enclosing class instance (*prefer over non-static inner classes to avoid memory leaks*).\n\nStatic import: `import static java.lang.Math.PI;`",
      },
      {
        heading: 'final Keyword',
        body: '`final` variable: cannot be reassigned after initialization (*for references, the reference is fixed but the object can still be mutated*).\n`final` method: cannot be overridden by subclasses.\n`final` class: cannot be extended (e.g., `String`, `Integer`).\n`final` parameters: cannot be reassigned within the method.\n\n**Effectively final**: local variables that are not modified after assignment — required for lambda captures. *Using `final` promotes immutability and can help JVM optimizations (though impact is minimal in modern JVMs).*',
      },
      {
        heading: 'volatile Keyword',
        body: '`volatile` ensures **visibility**: reads always fetch from main memory, writes immediately flush to main memory. It prevents instruction reordering around volatile accesses.\n`volatile` is **NOT atomic** for compound operations (`i++` is not atomic even on a volatile `int`).\n\nUse cases: flags/boolean state shared between threads, **double-checked locking** (singleton). For atomicity of compound operations, use `AtomicInteger` or `synchronized`.',
      },
      {
        heading: 'transient Keyword',
        body: '`transient` marks a field to be excluded from Java serialization (`Serializable`). The field is not written to the byte stream and gets the default value (`null`/`0`/`false`) upon deserialization.\nUse for: sensitive data (passwords), derived/computed fields, or non-serializable fields (e.g., `Thread`, `Socket`).\n\n*`static` fields are also not serialized — they belong to the class, not the instance.*',
      },
      {
        heading: 'this and super',
        body: "`this` refers to the current instance: access instance members, call another constructor with `this(...)` (must be first statement). `this` cannot be assigned a new value — *it is a read-only reference*.\n`super` refers to the parent class: access parent's members, call parent constructor with `super(...)` (must be first statement, implicitly called if omitted).\n\nNeither `this` nor `super` can be used in a `static` method — *static methods belong to the class, not instances*. `super` plays a role in polymorphism by allowing a subclass to invoke the parent's version of an overridden method.\nIn an inner class, use `OuterClass.this` to reference the enclosing instance.",
      },
      {
        heading: 'Enums',
        body: '**Enum** (enumeration) is a special data type that defines a **fixed set of constants**. Each enum constant is an instance of the enum class, created once (*singleton per constant*).\nEnums can have fields, constructors (`private` only), and methods — they are full-featured classes. Enums implicitly extend `java.lang.Enum` (so they cannot extend another class) but can implement interfaces.\n\nBuilt-in methods: `values()` (all constants), `valueOf(String)` (parse by name), `name()`, `ordinal()` (position).\nEnums are **thread-safe** (constants initialized in a static block) and are the recommended way to implement the **Singleton pattern** (*Effective Java*).\n\n`EnumSet` and `EnumMap` are highly optimized collections for enum types — *always prefer them over `HashSet`/`HashMap` when the key is an enum*.',
      },
      {
        heading: 'Inner Classes',
        body: '**Inner classes** in Java are classes defined within another class. They are useful for logically grouping classes that will only be used in one place, increasing encapsulation.\n\n1) **Non-static inner class** (member inner class): has access to all members of the outer class, including `private` ones. Requires an instance of the outer class to be created.\n2) **Static nested class**: does not hold a reference to the enclosing instance — *prefer this over non-static to avoid memory leaks*. Can contain `static` members.\n3) **Local class**: defined inside a method body, can access effectively final local variables.\n4) **Anonymous class**: defined and instantiated in a single expression, useful for one-time interface implementations or event handlers.\n\nImportant: non-static inner classes **CANNOT** contain `static` declarations. *Anonymous inner classes are useful but largely replaced by lambdas (Java 8+) for functional interfaces.*',
      },
      {
        heading: 'Marker Interfaces',
        body: 'A **marker interface** is an interface with no methods or fields. It serves to "mark" a class with a certain property, allowing runtime checks via `instanceof`.\nExamples: `Serializable` (indicates a class can be serialized), `Cloneable` (indicates `clone()` is permitted), `RandomAccess` (indicates a `List` supports fast random access).\n\nCustom marker interfaces can enforce policies — for example, a `Transmittable` marker could restrict which data objects are allowed over a network.\nSince Java 5, annotations (`@interface`) can serve a similar purpose and are often preferred for new designs *because they can carry metadata*. However, marker interfaces define a type that can be used in method signatures (e.g., `void send(Transmittable obj)`), which annotations cannot.',
      },
      {
        heading: 'Imports and Static Imports',
        body: 'Regular imports allow accessing classes from other packages without their fully qualified names, making code cleaner.\n**Static imports** (Java 5+) allow direct access to `static` members (fields and methods) without qualifying them with the class name — e.g., `import static java.lang.Math.PI;` lets you use `PI` instead of `Math.PI`.\n\nImports do **NOT** affect compilation performance, class loading, or memory usage — *they are purely a compile-time convenience for name resolution*. Class loading occurs at runtime when a class is first used, regardless of imports.\n\n*Overusing static imports can harm readability and maintainability — it becomes unclear where methods or constants originate, especially in larger projects. Use static imports sparingly for frequently used utilities like Math functions or assertion methods.*',
      },
      {
        heading: 'Common Interview Pitfalls',
        body: "**Static initialization order**: `static` fields and `static` blocks execute in the order they appear in source code, from top to bottom, exactly once when the class is first loaded. A common trap is referencing a static field before it has been initialized — the field will have its default value (`null`/`0`/`false`). *Circular class dependencies can cause subtle bugs where a class is partially initialized when another class references it.*\n\n**final reference mutability**: declaring a reference as `final` only prevents reassignment of the reference — it does **NOT** make the object immutable. A `final List<String>` cannot be pointed to a new list, but you can still call `add()`, `remove()`, etc. on the existing list. To make it truly unmodifiable, wrap with `Collections.unmodifiableList()` or use `List.of()`.\n*Another pitfall: `final` fields must be initialized exactly once — either at declaration or in every constructor. Failing to do so is a compile error.*\n\n**Mutable HashMap keys**: using mutable objects as keys in a `HashMap` is dangerous — if the object's state changes after insertion, its `hashCode` changes, making it impossible to locate in the map. *This results in data loss and memory leaks.* Always use immutable objects as `HashMap` keys.",
      },
    ],
    codeExamples: [
      {
        title: 'Enum with Fields and Methods',
        language: 'java',
        code: `public enum HttpStatus {
    OK(200, "OK"),
    NOT_FOUND(404, "Not Found"),
    INTERNAL_ERROR(500, "Internal Server Error");

    private final int code;
    private final String message;

    HttpStatus(int code, String message) { // constructor must be private
        this.code = code;
        this.message = message;
    }

    public int getCode() { return code; }
    public String getMessage() { return message; }

    public boolean isSuccess() { return code >= 200 && code < 300; }

    // Reverse lookup by code
    public static HttpStatus fromCode(int code) {
        for (HttpStatus status : values()) {
            if (status.code == code) return status;
        }
        throw new IllegalArgumentException("Unknown status code: " + code);
    }
}

// Enum implementing interface (Strategy pattern)
public enum Operation implements BiFunction<Double, Double, Double> {
    ADD { public Double apply(Double a, Double b) { return a + b; } },
    SUB { public Double apply(Double a, Double b) { return a - b; } },
    MUL { public Double apply(Double a, Double b) { return a * b; } };
}

// EnumSet — bit-vector based, extremely fast
EnumSet<HttpStatus> errors = EnumSet.of(HttpStatus.NOT_FOUND, HttpStatus.INTERNAL_ERROR);
EnumMap<HttpStatus, String> pages = new EnumMap<>(HttpStatus.class);`,
      },
      {
        title: 'Keyword Usage Examples',
        language: 'java',
        code: `public class KeywordDemo {
    // static field — shared across all instances
    private static int instanceCount = 0;

    // final field — must be initialized, cannot be reassigned
    private final String id;

    // volatile flag — visible across threads without synchronization
    private volatile boolean running = true;

    // transient — excluded from serialization
    private transient CachedData cache;

    // static block — runs once during class loading
    static {
        System.out.println("Class loaded");
    }

    public KeywordDemo(String id) {
        this.id = id;       // this disambiguates field vs parameter
        instanceCount++;     // modifying static field
    }

    // final method — cannot be overridden
    public final String getId() { return id; }

    // static method — no 'this' reference
    public static int getInstanceCount() { return instanceCount; }

    public void stop() { running = false; } // volatile write
}`,
      },
      {
        title: 'Static Initialization Order',
        language: 'java',
        code: `public class InitOrderDemo {
    // Static fields and blocks execute top-to-bottom, once, at class load
    private static final int A = 10;
    private static final int B;
    private static final int C;

    static {
        B = A * 2;   // B = 20 — A is already initialized
        C = compute();
        System.out.println("Static block: A=" + A + " B=" + B + " C=" + C);
    }

    private static int compute() { return A + B; } // 10 + 20 = 30

    // Pitfall: forward reference to not-yet-initialized field
    private static final int X = Y + 1; // Y is still 0 at this point!
    private static final int Y = 10;
    // Result: X = 1, Y = 10 (not X = 11 as you might expect)

    public static void main(String[] args) {
        System.out.println("X=" + X + " Y=" + Y); // X=1 Y=10
    }
}

// final reference mutability pitfall
public class FinalReferencePitfall {
    private final List<String> items = new ArrayList<>();

    public void addItem(String item) {
        items.add(item);      // ALLOWED — modifying the object
    }

    public void replaceList() {
        // items = new ArrayList<>(); // COMPILE ERROR — cannot reassign final
    }

    public List<String> safeItems() {
        return Collections.unmodifiableList(items); // truly read-only view
    }
}`,
      },
    ],
  },
  {
    id: 'generics',
    title: 'Generics & Wildcards',
    description:
      'Type-safe programming with generic classes, methods, bounded types, wildcards, PECS principle, and type erasure.',
    categoryId: 'core-java',
    icon: '🔤',
    difficulty: 'Intermediate',
    tags: [
      'Generics',
      'Type Safety',
      'Wildcards',
      'Type Erasure',
      'PECS',
      'Bounded Types',
      'Diamond Operator',
      'Generic Methods',
    ],
    content: [
      {
        heading: 'Why Generics',
        body: '**Generics** enable types (classes, interfaces, methods) to be parameterized. They provide **compile-time type safety**, eliminating the need for explicit casting and catching type errors at compile time rather than runtime.\n*Before generics (Java < 5), collections stored `Object` and required dangerous casts.*',
      },
      {
        heading: 'Generic Classes and Methods',
        body: 'A generic class declares type parameters in angle brackets: `class Box<T>`. Generic methods declare their own type parameters: `<T> T max(T a, T b)`.\nMultiple type parameters: `class Pair<K, V>`.\n\nType parameter conventions: **T** (Type), **E** (Element), **K** (Key), **V** (Value), **N** (Number), **S/U/V** (2nd, 3rd, 4th types).',
      },
      {
        heading: 'Bounded Type Parameters',
        body: '**Upper bound**: `<T extends Number>` restricts T to `Number` or subclasses.\n**Multiple bounds**: `<T extends Serializable & Comparable<T>>` — class first, then interfaces.\n**Recursive bounds**: `<T extends Comparable<T>>` ensures T can compare with itself.\n\n*Bounds enable calling methods on the type parameter.*',
      },
      {
        heading: 'Wildcards and PECS',
        body: '**Unbounded**: `List<?>` — read-only, returns `Object`.\n**Upper bounded** (Producer Extends): `List<? extends Number>` — can read `Number` from it, but cannot add (except `null`).\n**Lower bounded** (Consumer Super): `List<? super Integer>` — can add `Integer` to it, but reads return `Object`.\n\n**PECS principle** (Producer Extends, Consumer Super): use `extends` when you only read, `super` when you only write.\nExample: `Collections.copy(List<? super T> dest, List<? extends T> src)`.',
      },
      {
        heading: 'Type Erasure',
        body: 'Java generics are implemented via **type erasure** — all generic type information is removed at compile time. `List<String>` and `List<Integer>` become the same `List` at runtime.\nConsequences: cannot use `instanceof` with generics, cannot create generic arrays (`new T[]`), cannot call `new T()`.\n\n**Bridge methods** are generated by the compiler to maintain polymorphism under erasure. *This is why you cannot overload methods that differ only in generic parameter types.*\n\nGenerics provide type safety by allowing classes and methods to operate on objects of specific types, preventing runtime `ClassCastException` and reducing code duplication compared to raw types with manual casting.',
      },
      {
        heading: 'Generic Type Inference & Diamond Operator',
        body: "**Generic type inference** allows the compiler to automatically determine type arguments from context. The **diamond operator** (`<>`), introduced in Java 7, simplifies generic instantiation: `List<String> list = new ArrayList<>()` — the compiler infers `String` from the variable type.\nJava 8 extended inference to lambda parameters and method arguments. Java 10's `var` further reduces verbosity: `var map = new HashMap<String, List<Integer>>()`.\n\nLimitations: you cannot create an array of a generic type (`new T[]`) because the JVM needs concrete type information for arrays at runtime, *which is lost due to type erasure*. You also cannot use `instanceof` with parameterized types — use unbounded wildcards instead: `obj instanceof List<?>`.",
      },
      {
        heading: 'Real-World Analogy',
        body: '**Generics** — *like a vending machine with typed slots. A `VendingMachine<Coin>` only accepts Coin objects — if you try to insert a Banknote, the compiler rejects it before the code even runs.*\n\n**Raw types** — *without generics, the machine accepts anything (`Object`) and you only discover the wrong item when you reach in and pull out something unexpected — a `ClassCastException` at runtime.*\n\n**Bounded types** — *like a vending machine that accepts "any Currency" (`<T extends Currency>`). It restricts input to a family of related types while remaining flexible.*\n\n**PECS** — *the dispenser tray (Producer Extends) gives you items to read, while the coin slot (Consumer Super) accepts items you insert.*',
      },
    ],
    codeExamples: [
      {
        title: 'Generics and PECS Principle',
        language: 'java',
        code: `// Generic class with bounded type
public class Pair<A extends Comparable<A>, B> {
    private final A first;
    private final B second;

    public Pair(A first, B second) {
        this.first = first;
        this.second = second;
    }

    public A getFirst() { return first; }
    public B getSecond() { return second; }
}

// Generic method with type inference
public static <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}

// PECS — Producer Extends, Consumer Super
public static <T> void copy(List<? super T> dest, List<? extends T> src) {
    for (T item : src) {    // src is producer — read from it
        dest.add(item);      // dest is consumer — write to it
    }
}

// Wildcard usage
public static double sum(List<? extends Number> numbers) {
    return numbers.stream().mapToDouble(Number::doubleValue).sum();
}`,
      },
      {
        title: 'Type Erasure Limitations',
        language: 'java',
        code: `public class TypeErasureDemo {

    // COMPILE ERROR: both methods erase to process(List)
    // void process(List<String> strings) { }
    // void process(List<Integer> integers) { }

    // Cannot use instanceof with parameterized types
    public static void checkType(Object obj) {
        // if (obj instanceof List<String>) { } // COMPILE ERROR
        if (obj instanceof List<?> list) {       // OK — unbounded wildcard
            System.out.println("It's a list of size " + list.size());
        }
    }

    // Cannot create generic arrays directly
    // T[] array = new T[10]; // COMPILE ERROR

    // Workaround: pass Class<T> token to create array
    @SuppressWarnings("unchecked")
    public static <T> T[] createArray(Class<T> type, int size) {
        return (T[]) java.lang.reflect.Array.newInstance(type, size);
    }

    // Cannot call new T() — workaround with Supplier
    public static <T> T createInstance(java.util.function.Supplier<T> factory) {
        return factory.get();
    }

    public static void main(String[] args) {
        // At runtime, both are just "List" — generic info is erased
        List<String> strings = new ArrayList<>();
        List<Integer> integers = new ArrayList<>();
        System.out.println(strings.getClass() == integers.getClass()); // true

        String[] arr = createArray(String.class, 5);
        StringBuilder sb = createInstance(StringBuilder::new);
    }
}`,
      },
    ],
  },
  {
    id: 'exception-handling',
    title: 'Exception Handling',
    description:
      'Checked vs unchecked exceptions, try-with-resources, custom exceptions, exception hierarchy, and best practices.',
    categoryId: 'core-java',
    icon: '⚠️',
    difficulty: 'Beginner',
    tags: [
      'Exceptions',
      'Try-Catch',
      'Error Handling',
      'Try-With-Resources',
      'Checked Exceptions',
      'Unchecked Exceptions',
      'RuntimeException',
      'Exception Chaining',
      'AutoCloseable',
    ],
    content: [
      {
        heading: 'Exception Hierarchy',
        body: "`Throwable` is the root: **Error** (unrecoverable JVM problems — `OutOfMemoryError`, `StackOverflowError`, *don't catch these*) and **Exception**.\n`Exception` splits into **checked exceptions** (`IOException`, `SQLException` — must be declared or caught) and **RuntimeException** (unchecked — `NullPointerException`, `IllegalArgumentException`, `ArrayIndexOutOfBoundsException`).\n\n*Errors and RuntimeExceptions are unchecked.*",
      },
      {
        heading: 'Checked vs Unchecked',
        body: '**Checked exceptions** represent recoverable conditions (file not found, network error) — the compiler forces handling.\n**Unchecked exceptions** represent programming errors (null access, array bounds) — no compile-time enforcement.\n\nUse checked exceptions when callers can reasonably recover; use unchecked for bugs. *Modern frameworks (Spring) prefer unchecked exceptions to reduce boilerplate.*',
      },
      {
        heading: 'Try-With-Resources',
        body: 'Introduced in Java 7, **try-with-resources** automatically closes `AutoCloseable` resources. Resources are closed in **reverse declaration order**.\nSuppressed exceptions from `close()` are accessible via `getSuppressed()`.\n\nJava 9 allows effectively-final variables in try-with-resources: `var reader = new BufferedReader(...); try (reader) { ... }`. *Always prefer this over manually closing in finally blocks.*',
      },
      {
        heading: 'Best Practices for Senior Developers',
        body: 'Never catch generic `Exception`/`Throwable` unless re-throwing. Don\'t use exceptions for flow control (*expensive — captures stack trace*). Use specific exception types.\nAlways include meaningful messages and context. Use **exception chaining** (`new CustomException("msg", cause)`) to preserve root causes.\n\nCreate domain-specific exception hierarchies. Log at the handling point, not at every rethrow. **Never** swallow exceptions with empty catch blocks.\n*Consider returning `Optional` or Result types instead of throwing for expected absent values.*',
      },
      {
        heading: 'Real-World Analogy',
        body: '**Exceptions** — *like a factory assembly line with quality checkpoints. As a product (data) moves down the line, each station (method) performs work. If a defect is detected, the inspector (throw statement) pulls the product off the line and tags it with a defect report (exception object) containing what went wrong, where, and why.*\n\n*The defect travels back up the chain of supervisors (call stack) until someone qualified to handle it (catch block) takes action — maybe fixing the product, scrapping it, or escalating further.*\n\n**Checked exceptions** — *like mandatory safety inspections. The factory rules require you to plan for them.*\n**Unchecked exceptions** — *like unexpected equipment failures (programming bugs) that could happen anywhere.*\n\n**Try-with-resources** — *like an auto-shutoff system: when a station finishes (or fails), its equipment is powered down automatically, preventing resource leaks.*',
      },
    ],
    codeExamples: [
      {
        title: 'Custom Exception Hierarchy & Try-With-Resources',
        language: 'java',
        code: `// Domain exception hierarchy
public class ServiceException extends RuntimeException {
    private final ErrorCode errorCode;

    public ServiceException(ErrorCode code, String message, Throwable cause) {
        super(message, cause);
        this.errorCode = code;
    }
}

public class ResourceNotFoundException extends ServiceException {
    public ResourceNotFoundException(String resource, Object id) {
        super(ErrorCode.NOT_FOUND,
              String.format("%s not found with id: %s", resource, id), null);
    }
}

// Try-with-resources (Java 9 enhanced)
var reader = new BufferedReader(new FileReader("input.txt"));
var writer = new BufferedWriter(new FileWriter("output.txt"));
try (reader; writer) {
    String line;
    while ((line = reader.readLine()) != null) {
        writer.write(line.toUpperCase());
        writer.newLine();
    }
} catch (IOException e) {
    throw new ServiceException(ErrorCode.IO_ERROR, "File transform failed", e);
}`,
      },
      {
        title: 'Exception Chaining & Logging Patterns',
        language: 'java',
        code: `import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class OrderProcessor {
    private static final Logger log = LoggerFactory.getLogger(OrderProcessor.class);

    public Order processOrder(OrderRequest request) {
        try {
            Order order = createOrder(request);
            chargePayment(order);
            sendConfirmation(order);
            return order;
        } catch (PaymentException e) {
            // Chain the original cause — preserves full stack trace
            log.error("Payment failed for order {}: {}", request.getId(),
                       e.getMessage(), e);
            throw new OrderProcessingException(
                "Failed to process order " + request.getId(), e);
        } catch (NotificationException e) {
            // Non-critical failure — log and continue
            log.warn("Confirmation email failed for order {}, will retry",
                      request.getId(), e);
            scheduleRetry(request.getId());
            return createOrder(request);
        }
    }

    // Anti-patterns to avoid:
    // 1. NEVER swallow exceptions
    //    catch (Exception e) { } // silent failure — impossible to debug

    // 2. NEVER log AND rethrow (causes duplicate logs up the chain)
    //    catch (Exception e) { log.error("...", e); throw e; }

    // 3. NEVER lose the original cause
    //    catch (Exception e) { throw new RuntimeException("failed"); }
    //    CORRECT: throw new RuntimeException("failed", e);

    // 4. PREFER specific exception types over generic catch
    //    catch (Exception e) — too broad
    //    catch (IOException | SQLException e) — targeted
}`,
      },
    ],
  },
  {
    id: 'reflection',
    title: 'Java Reflection',
    description:
      'Runtime class inspection, dynamic method invocation, field access, and reflection performance considerations.',
    categoryId: 'core-java',
    icon: '🔍',
    difficulty: 'Advanced',
    tags: [
      'Reflection',
      'Class',
      'Method',
      'Annotation',
      'Dynamic',
      'MethodHandle',
      'Runtime Inspection',
      'setAccessible',
      'Framework Internals',
    ],
    content: [
      {
        heading: 'What is Reflection',
        body: '**Reflection** allows inspecting and manipulating classes, methods, fields, and constructors at runtime. The entry point is the `Class<?>` object, obtainable via `obj.getClass()`, `ClassName.class`, or `Class.forName("fully.qualified.Name")`.\n\nReflection powers frameworks like **Spring** (DI, AOP), **Hibernate** (ORM), **JUnit** (test discovery), and **Jackson** (JSON serialization).',
      },
      {
        heading: 'Core Operations',
        body: 'Getting class info: `getFields()` (public, including inherited), `getDeclaredFields()` (all, this class only). Same pattern for methods and constructors.\n`setAccessible(true)` bypasses access modifiers (*breaks encapsulation — use judiciously*).\n\nCreate instances: `Constructor.newInstance()`. Invoke methods: `Method.invoke(target, args)`. Access fields: `Field.get(target)`, `Field.set(target, value)`.',
      },
      {
        heading: 'Annotations at Runtime',
        body: 'Annotations with `@Retention(RetentionPolicy.RUNTIME)` are available via reflection.\nCheck: `isAnnotationPresent(MyAnnotation.class)`. Read: `getAnnotation(MyAnnotation.class)`.\n\nThis is how Spring discovers `@Component`, `@Autowired`, `@RequestMapping` etc. **Annotation processing** at compile time (using `AbstractProcessor`) is a separate mechanism that generates code before runtime.',
      },
      {
        heading: 'Performance & Limitations',
        body: 'Reflection is **5-50x slower** than direct invocation due to: bypassing JVM optimizations (no inlining), security checks, boxing/unboxing of arguments, and array creation for varargs.\nMitigations: cache `Method`/`Field` objects, use `MethodHandle` (Java 7+) for better performance, or use code generation (**ByteBuddy**, **ASM**) in frameworks.\n\n*Reflection breaks encapsulation, is not type-safe at compile time, and may break with module system restrictions (Java 9+).*',
      },
      {
        heading: 'Real-World Analogy',
        body: "**Reflection** — *like X-ray vision for Java objects. Normally, you interact with an object through its public API — like looking at a person and only seeing their outward appearance.*\n\n*Reflection lets you peer inside: see the skeleton (private fields), examine the organs (internal methods), and even perform surgery (modify private state).*\n\n**Spring** — *uses this X-ray vision to wire dependencies: scans your classes, finds fields annotated with `@Autowired`, and injects the right objects — all without you writing explicit wiring code.*\n\n*The trade-off is the same as in medicine: X-rays are powerful diagnostic tools, but you wouldn't use one to check if someone is smiling. Use reflection when you need deep introspection (frameworks, testing, serialization), but prefer direct calls for everyday code.*",
      },
    ],
    codeExamples: [
      {
        title: 'Reflection in Action',
        language: 'java',
        code: `// Inspect class at runtime
Class<?> clazz = Class.forName("com.example.User");

// Create instance dynamically
Constructor<?> ctor = clazz.getDeclaredConstructor(String.class, int.class);
Object user = ctor.newInstance("Alice", 30);

// Access private field
Field nameField = clazz.getDeclaredField("name");
nameField.setAccessible(true);
String name = (String) nameField.get(user);

// Invoke method dynamically
Method greet = clazz.getDeclaredMethod("greet", String.class);
greet.setAccessible(true);
String result = (String) greet.invoke(user, "Bob");

// Read annotations
if (clazz.isAnnotationPresent(Entity.class)) {
    Entity entity = clazz.getAnnotation(Entity.class);
    System.out.println("Table: " + entity.tableName());
}

// MethodHandle (faster alternative, Java 7+)
MethodHandles.Lookup lookup = MethodHandles.lookup();
MethodHandle mh = lookup.findVirtual(clazz, "greet",
    MethodType.methodType(String.class, String.class));
String greeting = (String) mh.invoke(user, "Charlie");`,
      },
      {
        title: 'Annotation-Based Field Validator',
        language: 'java',
        code: `// Custom validation annotation
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface NotEmpty {
    String message() default "Field must not be empty";
}

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface Range {
    int min() default 0;
    int max() default Integer.MAX_VALUE;
    String message() default "Value out of range";
}

// Domain class using annotations
public class UserForm {
    @NotEmpty(message = "Name is required")
    private String name;

    @Range(min = 1, max = 150, message = "Age must be 1-150")
    private int age;

    @NotEmpty
    private String email;

    // constructors, getters...
}

// Reflection-based validator
public class SimpleValidator {
    public static List<String> validate(Object obj) {
        List<String> errors = new ArrayList<>();
        for (Field field : obj.getClass().getDeclaredFields()) {
            field.setAccessible(true);
            try {
                Object value = field.get(obj);

                if (field.isAnnotationPresent(NotEmpty.class)) {
                    NotEmpty ann = field.getAnnotation(NotEmpty.class);
                    if (value == null || value.toString().isBlank()) {
                        errors.add(field.getName() + ": " + ann.message());
                    }
                }

                if (field.isAnnotationPresent(Range.class)) {
                    Range ann = field.getAnnotation(Range.class);
                    int val = ((Number) value).intValue();
                    if (val < ann.min() || val > ann.max()) {
                        errors.add(field.getName() + ": " + ann.message());
                    }
                }
            } catch (IllegalAccessException e) {
                throw new RuntimeException("Validation failed", e);
            }
        }
        return errors;
    }
}

// Usage — this is essentially how Bean Validation (JSR 380) works
List<String> errors = SimpleValidator.validate(new UserForm("", -5, null));
// ["name: Name is required", "age: Age must be 1-150", "email: Field must not be empty"]`,
      },
    ],
  },
  {
    id: 'java-proxy',
    title: 'Java Proxy Pattern',
    description:
      'Static proxy, JDK dynamic proxy, and CGLIB proxy — how Spring AOP and frameworks work under the hood.',
    categoryId: 'core-java',
    icon: '🎭',
    difficulty: 'Advanced',
    tags: [
      'Proxy',
      'Dynamic Proxy',
      'CGLIB',
      'AOP',
      'Spring',
      'InvocationHandler',
      'Bytecode Generation',
      'Cross-Cutting Concerns',
    ],
    content: [
      {
        heading: 'Why Proxy',
        body: 'The **proxy pattern** provides a surrogate that controls access to another object. Proxies enable **cross-cutting concerns** (logging, transactions, security, caching) without modifying target classes.\nThis is the foundation of **Aspect-Oriented Programming** (AOP) in Spring.',
      },
      {
        heading: 'Static Proxy',
        body: 'A manually written class that implements the same interface and delegates to the real object, adding behavior before/after.\nDrawback: one proxy class per interface, does not scale. *Every new method in the interface requires updating the proxy.*',
      },
      {
        heading: 'JDK Dynamic Proxy',
        body: "Uses `java.lang.reflect.Proxy` and `InvocationHandler`. Creates proxy instances at runtime for interfaces.\n`Proxy.newProxyInstance(classLoader, interfaces, handler)` — the handler intercepts **ALL** method calls.\n\nLimitation: only works with **interfaces** — the target must implement at least one interface. *This is Spring's default proxy mechanism when the bean implements an interface.*",
      },
      {
        heading: 'CGLIB Proxy',
        body: "**CGLIB** (Code Generation Library) creates proxies by generating a **subclass** of the target class at runtime using ASM bytecode manipulation. Works with concrete classes (*no interface needed*).\nLimitation: cannot proxy `final` classes or `final` methods (cannot be overridden). *Slower to create than JDK proxies but faster to invoke.*\n\nSpring uses CGLIB when the bean doesn't implement an interface, or when `proxyTargetClass=true`.",
      },
      {
        heading: 'JDK vs CGLIB Comparison',
        body: '**JDK proxy**: interface-based, uses reflection (*slower invocation*), lighter weight, part of JDK.\n**CGLIB**: class-based, uses bytecode generation (*faster invocation*), heavier creation cost, third-party library (bundled in Spring).\n\nSince Spring Boot 2.0, CGLIB is the default even for interface-based beans (controlled by `spring.aop.proxy-target-class`). *The performance difference is negligible in practice.*',
      },
      {
        heading: 'Real-World Analogy',
        body: '**Proxy** — *like a receptionist at a corporate office who intercepts all visitors before they reach the executive. Every visitor (method call) must pass through the receptionist first.*\n\n*The receptionist can: check credentials (security proxy), log the visit in a guest book (logging proxy), tell the visitor the executive is busy and redirect them (caching proxy), or schedule the meeting for later (lazy initialization proxy). The visitor doesn\'t know they\'re interacting with a middleman — the receptionist presents the same "interface" as meeting the executive directly.*\n\n**JDK dynamic proxy** — *like a receptionist who only handles visitors arriving through the official front door (interface).*\n**CGLIB proxy** — *like a receptionist who can also intercept visitors coming through side entrances (concrete class methods) by placing themselves at every possible entry point.*',
      },
    ],
    codeExamples: [
      {
        title: 'JDK Dynamic Proxy',
        language: 'java',
        code: `public interface UserService {
    User findById(Long id);
    void save(User user);
}

// InvocationHandler — intercepts all method calls
public class LoggingHandler implements InvocationHandler {
    private final Object target;

    public LoggingHandler(Object target) { this.target = target; }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        long start = System.nanoTime();
        try {
            Object result = method.invoke(target, args);
            long elapsed = System.nanoTime() - start;
            log.info("{}() took {} ms", method.getName(), elapsed / 1_000_000);
            return result;
        } catch (InvocationTargetException e) {
            log.error("{}() failed", method.getName(), e.getCause());
            throw e.getCause();
        }
    }
}

// Create proxy
UserService realService = new UserServiceImpl();
UserService proxy = (UserService) Proxy.newProxyInstance(
    UserService.class.getClassLoader(),
    new Class<?>[] { UserService.class },
    new LoggingHandler(realService)
);
proxy.findById(1L); // Intercepted — logs timing`,
      },
      {
        title: 'CGLIB Proxy',
        language: 'java',
        code: `import net.sf.cglib.proxy.Enhancer;
import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;

// Concrete class — no interface required
public class ProductService {
    public Product getProduct(Long id) {
        return productRepository.findById(id);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}

// CGLIB MethodInterceptor — intercepts all non-final methods
public class CachingInterceptor implements MethodInterceptor {
    private final Map<String, Object> cache = new ConcurrentHashMap<>();

    @Override
    public Object intercept(Object obj, Method method, Object[] args,
                            MethodProxy proxy) throws Throwable {
        // Only cache getter-style methods
        if (method.getName().startsWith("get")) {
            String key = method.getName() + Arrays.toString(args);
            return cache.computeIfAbsent(key, k -> {
                try {
                    return proxy.invokeSuper(obj, args);
                } catch (Throwable t) {
                    throw new RuntimeException(t);
                }
            });
        }
        // Non-cacheable methods pass through and invalidate cache
        cache.clear();
        return proxy.invokeSuper(obj, args);
    }
}

// Create CGLIB proxy — generates a subclass at runtime
Enhancer enhancer = new Enhancer();
enhancer.setSuperclass(ProductService.class);
enhancer.setCallback(new CachingInterceptor());
ProductService proxy = (ProductService) enhancer.create();

proxy.getProduct(1L);  // hits database, caches result
proxy.getProduct(1L);  // returns cached result
proxy.deleteProduct(1L); // clears cache`,
      },
    ],
  },
  {
    id: 'serialization',
    title: 'Java Serialization',
    description:
      'Serializable, Externalizable, serialVersionUID, serialization pitfalls, and modern alternatives like JSON.',
    categoryId: 'core-java',
    icon: '💾',
    difficulty: 'Intermediate',
    tags: [
      'Serialization',
      'Serializable',
      'serialVersionUID',
      'JSON',
      'Jackson',
      'Externalizable',
      'Deserialization',
      'Protocol Buffers',
    ],
    content: [
      {
        heading: 'Java Serialization Basics',
        body: '**Serialization** converts an object to a byte stream; **deserialization** restores it. Implement `java.io.Serializable` (marker interface).\nUse `ObjectOutputStream.writeObject()` and `ObjectInputStream.readObject()`.\n\nAll fields are serialized by default unless marked `transient` or `static`.',
      },
      {
        heading: 'serialVersionUID',
        body: '`serialVersionUID` is a version identifier for serialized classes. If not explicitly declared, the JVM generates one from the class structure — *any change (adding a field, method) creates a new UID*, causing `InvalidClassException` on deserialization.\n\nAlways declare explicitly: `private static final long serialVersionUID = 1L;`. **This ensures backward compatibility** when the class evolves.',
      },
      {
        heading: 'Externalizable',
        body: '`Externalizable` extends `Serializable` and gives **full control** over serialization by requiring implementation of `writeExternal()` and `readExternal()`.\nUnlike `Serializable`, which uses reflection, `Externalizable` is faster but requires a public no-arg constructor and manual field handling.\n\n*Use when you need fine-grained control or performance optimization.*',
      },
      {
        heading: 'Pitfalls & Modern Alternatives',
        body: "Java serialization is **inherently insecure** — deserialization can execute arbitrary code (*exploited by many CVEs*). It's language-specific, verbose, slow, and hard to version.\n\nModern alternatives: **JSON** (Jackson, Gson), **Protocol Buffers**, **Avro**, **MessagePack**. For RPC: **gRPC** (protobuf), or JSON over HTTP.\nSpring Boot defaults to **Jackson** for JSON serialization. *The Java community recommends avoiding Java serialization in new code (Effective Java, Item 85).*",
      },
    ],
    codeExamples: [
      {
        title: 'Serialization Examples',
        language: 'java',
        code: `public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    private String name;
    private int age;
    private transient String password; // excluded from serialization

    // Custom serialization hooks
    private void writeObject(ObjectOutputStream out) throws IOException {
        out.defaultWriteObject();
        out.writeObject(encrypt(password)); // custom handling
    }

    private void readObject(ObjectInputStream in)
            throws IOException, ClassNotFoundException {
        in.defaultReadObject();
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
}`,
      },
      {
        title: 'JSON Serialization with Jackson',
        language: 'java',
        code: `import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

// Modern approach: JSON serialization with Jackson
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDto {
    private String name;
    private int age;

    @JsonIgnore // equivalent of transient — excluded from JSON
    private String password;

    @JsonProperty("registered_at") // custom JSON field name
    private LocalDateTime registeredAt;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;

    // Jackson needs a no-arg constructor (or use @JsonCreator)
    public UserDto() {}

    @JsonCreator // explicit deserialization constructor
    public UserDto(@JsonProperty("name") String name,
                   @JsonProperty("age") int age) {
        this.name = name;
        this.age = age;
    }

    // getters and setters...
}

// Configure ObjectMapper (create once, reuse — it's thread-safe)
ObjectMapper mapper = new ObjectMapper()
    .registerModule(new JavaTimeModule())
    .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

// Serialize to JSON string
UserDto user = new UserDto("Alice", 30);
String json = mapper.writeValueAsString(user);
// {"name":"Alice","age":30,"registered_at":"2024-01-15T10:30:00"}

// Deserialize from JSON string
UserDto restored = mapper.readValue(json, UserDto.class);

// Serialize to/from file
mapper.writeValue(new File("user.json"), user);
UserDto fromFile = mapper.readValue(new File("user.json"), UserDto.class);

// Collections
List<UserDto> users = mapper.readValue(jsonArray,
    new TypeReference<List<UserDto>>() {});`,
      },
    ],
  },
  {
    id: 'spi-mechanism',
    title: 'Java SPI Mechanism',
    description:
      'Service Provider Interface — how Java enables pluggable service discovery used by JDBC, SLF4J, and Spring Boot.',
    categoryId: 'core-java',
    icon: '🔌',
    difficulty: 'Advanced',
    tags: [
      'SPI',
      'ServiceLoader',
      'Plugin',
      'JDBC',
      'Service Discovery',
      'Extensibility',
      'META-INF',
    ],
    content: [
      {
        heading: 'What is SPI',
        body: "**SPI** (Service Provider Interface) is a built-in **service discovery mechanism**. It decouples service definition (interface) from service implementation (provider).\nThe JDK's `ServiceLoader` discovers and loads implementations at runtime based on configuration files in `META-INF/services/`.\n\nSPI powers **JDBC** driver loading, **SLF4J** logging backends, and many Java frameworks.",
      },
      {
        heading: 'How It Works',
        body: 'Define a service interface. Providers implement the interface and register by creating a file named `META-INF/services/<fully.qualified.InterfaceName>` containing the fully qualified provider class names (one per line).\n`ServiceLoader.load(ServiceInterface.class)` discovers and lazily instantiates all registered providers.\n\n*Providers must have a public no-arg constructor.*',
      },
      {
        heading: 'Real-World Examples',
        body: '**JDBC**: `java.sql.Driver` — each database vendor (MySQL, PostgreSQL) registers their driver via SPI.\n**SLF4J**: discovers logging backend (Logback, Log4j2).\n**Servlet containers**: discover `ServletContainerInitializer`.\n**Spring Boot**: `spring.factories` (*custom SPI-like mechanism*) loads auto-configurations.\n\n**Java Module System** (Java 9+): `provides ... with ...` directive replaces `META-INF/services`.',
      },
      {
        heading: 'SPI vs API',
        body: '**API** (Application Programming Interface): defined and called by the consumer — "here is what you can call."\n**SPI** (Service Provider Interface): defined by the framework, implemented by providers — "here is what you must implement."\n\nAPIs are for **calling** code, SPIs are for **extending** frameworks. *A good framework uses both: APIs for clients, SPIs for extensibility.*',
      },
    ],
    codeExamples: [
      {
        title: 'Custom SPI Example',
        language: 'java',
        code: `// 1. Define service interface
public interface MessageService {
    String getMessage(String key);
    boolean supports(String locale);
}

// 2. Provider implementation
public class EnglishMessageService implements MessageService {
    @Override public String getMessage(String key) { return englishMessages.get(key); }
    @Override public boolean supports(String locale) { return "en".equals(locale); }
}

// 3. Register: META-INF/services/com.example.MessageService
//    com.example.EnglishMessageService
//    com.example.FrenchMessageService

// 4. Discover and use
ServiceLoader<MessageService> loader = ServiceLoader.load(MessageService.class);
MessageService service = loader.stream()
    .map(ServiceLoader.Provider::get)
    .filter(s -> s.supports("en"))
    .findFirst()
    .orElseThrow(() -> new RuntimeException("No provider for locale: en"));`,
      },
    ],
  },
  {
    id: 'bigdecimal',
    title: 'BigDecimal',
    description:
      'Precise decimal arithmetic — avoiding floating-point traps, rounding modes, and best practices.',
    categoryId: 'core-java',
    icon: '💰',
    difficulty: 'Intermediate',
    tags: [
      'BigDecimal',
      'Precision',
      'Floating Point',
      'Money',
      'Rounding',
      'Arithmetic',
      'Financial Calculation',
    ],
    content: [
      {
        heading: 'Why BigDecimal',
        body: '`float` and `double` use IEEE 754 binary floating-point — they **cannot represent decimal fractions exactly**. `0.1 + 0.2 != 0.3` in floating-point.\n`BigDecimal` provides **arbitrary-precision decimal arithmetic**.\n\nEssential for financial calculations, tax computation, and anywhere exact decimal representation is required.',
      },
      {
        heading: 'Creating BigDecimal',
        body: '**NEVER** use `new BigDecimal(0.1)` — *this captures the imprecise double representation*.\n**ALWAYS** use `new BigDecimal("0.1")` (String constructor) or `BigDecimal.valueOf(0.1)` (uses `Double.toString()` which gives correct representation).\n\nConstants: `BigDecimal.ZERO`, `BigDecimal.ONE`, `BigDecimal.TEN`.',
      },
      {
        heading: 'Operations and Rounding',
        body: "`BigDecimal` is **immutable** — operations return new instances. Addition: `a.add(b)`. Division: `a.divide(b, scale, RoundingMode)` — **MUST** specify scale and rounding mode for non-terminating decimals (*otherwise `ArithmeticException`*).\n\nCommon rounding modes: `HALF_UP` (standard rounding), `HALF_EVEN` (banker's rounding), `DOWN` (truncate).\nComparison: use `compareTo()` not `equals()` — *`equals()` also compares scale (2.0 != 2.00)*.",
      },
      {
        heading: 'Best Practices',
        body: 'Always use String constructor or `valueOf()`. Always specify `RoundingMode` for division. Use `compareTo()` for equality checks.\nConsider creating a **Money** class wrapping `BigDecimal` for domain modeling.\n\nFor performance-critical scenarios with known precision, consider using `long` (cents instead of dollars). *Set a consistent scale for your application (e.g., 2 for currency, 8 for crypto).*',
      },
    ],
    codeExamples: [
      {
        title: 'BigDecimal Correct Usage',
        language: 'java',
        code: `// WRONG — captures imprecise double representation
BigDecimal bad = new BigDecimal(0.1); // 0.1000000000000000055511151231257827021...

// CORRECT
BigDecimal good = new BigDecimal("0.1");          // exactly 0.1
BigDecimal also = BigDecimal.valueOf(0.1);         // also 0.1

// Arithmetic with proper rounding
BigDecimal price = new BigDecimal("19.99");
BigDecimal taxRate = new BigDecimal("0.085");
BigDecimal tax = price.multiply(taxRate)
    .setScale(2, RoundingMode.HALF_UP);            // 1.70
BigDecimal total = price.add(tax);                  // 21.69

// Division — MUST specify scale and rounding
BigDecimal a = new BigDecimal("10");
BigDecimal b = new BigDecimal("3");
BigDecimal result = a.divide(b, 10, RoundingMode.HALF_UP); // 3.3333333333

// Comparison — use compareTo(), not equals()
new BigDecimal("2.0").equals(new BigDecimal("2.00"));       // false!
new BigDecimal("2.0").compareTo(new BigDecimal("2.00"));    // 0 (equal)`,
      },
    ],
  },
  {
    id: 'unsafe-class',
    title: 'sun.misc.Unsafe',
    description:
      'Low-level memory manipulation, CAS operations, and how Unsafe powers Java concurrency internals.',
    categoryId: 'core-java',
    icon: '☢️',
    difficulty: 'Advanced',
    tags: [
      'Unsafe',
      'CAS',
      'Memory',
      'Off-Heap',
      'Internal',
      'VarHandle',
      'Foreign Memory API',
      'Low-Level',
    ],
    content: [
      {
        heading: 'What is Unsafe',
        body: '`sun.misc.Unsafe` is an internal JDK class providing **low-level, hardware-level operations** that bypass Java\'s safety mechanisms. It is **NOT** part of the public API but is used extensively by the JDK itself (`java.util.concurrent`, NIO), and libraries like **Netty**, **Hazelcast**, and **Kafka**.\n\nAccess via reflection: `Unsafe.class.getDeclaredField("theUnsafe")`.',
      },
      {
        heading: 'Key Capabilities',
        body: '**Memory operations**: allocate/free native (off-heap) memory, direct memory read/write.\n**CAS** (Compare-And-Swap): `compareAndSwapInt/Long/Object` — the foundation of all atomic classes and lock-free algorithms.\n**Object manipulation**: create instances without calling constructors, modify `final` fields.\n**Thread operations**: `park()` / `unpark()` — used by `LockSupport` (*which powers AQS and all j.u.c. locks*).',
      },
      {
        heading: 'Why It Matters for Interviews',
        body: 'Understanding `Unsafe` explains **HOW** concurrent utilities work internally.\n`AtomicInteger` uses `Unsafe.compareAndSwapInt`. `LockSupport` uses `Unsafe.park/unpark`. `ConcurrentHashMap` uses `Unsafe` for volatile-like access to array elements. `DirectByteBuffer` uses `Unsafe` for off-heap allocation.\n\nWhen asked "how does CAS work in Java," the answer traces back to `Unsafe` invoking **CPU-level compare-and-swap instructions**.',
      },
      {
        heading: 'Future: VarHandle and Foreign Memory',
        body: "Java 9 introduced `VarHandle` as a **safer replacement** for `Unsafe`'s CAS and memory access operations.\nJava 21+ introduces the **Foreign Function & Memory API** (replacing `sun.misc.Unsafe` for off-heap memory). The JDK team is gradually restricting `Unsafe` access.\n\n*Modern code should use `VarHandle`, `AtomicXxxFieldUpdater`, or the Foreign Memory API instead.*",
      },
    ],
    codeExamples: [
      {
        title: 'Unsafe Operations (Conceptual)',
        language: 'java',
        code: `// How AtomicInteger works internally (simplified)
public class AtomicInteger {
    private static final Unsafe U = Unsafe.getUnsafe();
    private static final long VALUE_OFFSET =
        U.objectFieldOffset(AtomicInteger.class, "value");
    private volatile int value;

    public final int incrementAndGet() {
        return U.getAndAddInt(this, VALUE_OFFSET, 1) + 1;
    }

    public final boolean compareAndSet(int expect, int update) {
        return U.compareAndSetInt(this, VALUE_OFFSET, expect, update);
    }
}

// Modern alternative: VarHandle (Java 9+)
public class SafeCounter {
    private static final VarHandle VALUE;
    static {
        try {
            VALUE = MethodHandles.lookup()
                .findVarHandle(SafeCounter.class, "value", int.class);
        } catch (ReflectiveOperationException e) { throw new Error(e); }
    }
    private volatile int value;

    public int incrementAndGet() {
        return (int) VALUE.getAndAdd(this, 1) + 1;
    }
}`,
      },
    ],
  },
  {
    id: 'pattern-matching',
    title: 'Pattern Matching & Sealed Classes',
    description:
      'Modern Java features: pattern matching for instanceof/switch, record patterns, sealed class hierarchies, and algebraic data types.',
    categoryId: 'core-java',
    icon: '🧩',
    difficulty: 'Intermediate',
    tags: [
      'Pattern Matching',
      'Sealed Classes',
      'Records',
      'Java 21',
      'Switch',
      'Algebraic Data Types',
      'Deconstruction',
      'Type Safety',
    ],
    content: [
      {
        heading: 'Pattern Matching for instanceof (Java 16)',
        body: 'Instead of casting after `instanceof`: `if (obj instanceof String s)` — binds variable `s` directly. The pattern variable is scoped to where the match is guaranteed true.\nWorks with `&&` (both sides) but not `||` (neither side).\n\n*Eliminates boilerplate cast-after-check code.*',
      },
      {
        heading: 'Sealed Classes (Java 17)',
        body: '**Sealed classes** restrict which classes can extend them: `sealed class Shape permits Circle, Rectangle`. Subclasses must be `final`, `sealed`, or `non-sealed`.\nThis creates a **closed hierarchy** — the compiler knows all possible subtypes.\n\nCombined with switch pattern matching, sealed types enable **exhaustive matching** without a `default` case.',
      },
      {
        heading: 'Pattern Matching for switch (Java 21)',
        body: 'Match against types, `null`, guarded patterns, and record patterns.\n**Type patterns**: `case Integer i -> ...`\n**Guarded patterns**: `case String s when s.length() > 5 -> ...`\n**Record patterns**: `case Point(var x, var y) -> ...` — deconstruct records inline.\n**Null handling**: `case null -> ...` (*instead of NPE*).\n\n*Exhaustive switches on sealed types need no `default`.*',
      },
      {
        heading: 'Records as Algebraic Data Types',
        body: '**Records** (Java 16) are **immutable data carriers**: `record Point(int x, int y) {}`. Combined with sealed interfaces, they create **algebraic data types** (sum types) like in Scala/Kotlin/Haskell.\nRecords automatically generate: canonical constructor, accessors (`x()`, `y()`), `equals()`, `hashCode()`, `toString()`.\n\nRecords can implement interfaces, have `static` fields/methods, and custom constructors (*compact constructor for validation*).',
      },
      {
        heading: 'Why This Matters',
        body: 'Pattern matching transforms how you write conditional logic in Java, making code both **safer and more readable**.\n\nConsider a practical use case: parsing a JSON-like value tree. Without pattern matching, you would write long chains of `instanceof` checks, manual casts, and nested if-else blocks. With **sealed types + record patterns**, the compiler guarantees exhaustive handling — if you add a new variant (e.g., `JsonNull`), every switch that matches on the sealed hierarchy produces a compile error until you handle the new case. *This eliminates an entire class of bugs where new types are added but not all code paths are updated.*\n\nIn domain-driven design, pattern matching enables clean expression of business rules: matching against different order states, payment types, or validation results without verbose visitor patterns. Combined with records, you get concise, immutable value objects that deconstruct naturally in `switch` expressions, *bringing Java closer to the ergonomics of functional languages like Scala and Kotlin*.',
      },
    ],
    codeExamples: [
      {
        title: 'Sealed Hierarchy with Pattern Matching',
        language: 'java',
        code: `public sealed interface Expr permits Num, Add, Mul, Neg {
}
public record Num(double value) implements Expr {}
public record Add(Expr left, Expr right) implements Expr {}
public record Mul(Expr left, Expr right) implements Expr {}
public record Neg(Expr operand) implements Expr {}

// Exhaustive pattern matching — compiler verifies all cases
public static double evaluate(Expr expr) {
    return switch (expr) {
        case Num(var v) -> v;
        case Add(var l, var r) -> evaluate(l) + evaluate(r);
        case Mul(var l, var r) -> evaluate(l) * evaluate(r);
        case Neg(var e) -> -evaluate(e);
    };
}

// Guarded patterns
public static String classify(Object obj) {
    return switch (obj) {
        case null -> "null";
        case Integer i when i < 0 -> "negative: " + i;
        case Integer i -> "positive: " + i;
        case String s when s.isBlank() -> "blank string";
        case String s -> "string: " + s;
        case int[] arr -> "int array of length " + arr.length;
        default -> obj.getClass().getSimpleName();
    };
}`,
      },
      {
        title: 'Practical JSON-Like Value Parser',
        language: 'java',
        code: `// Sealed hierarchy representing JSON values
public sealed interface JsonValue
    permits JsonString, JsonNumber, JsonBool, JsonNull, JsonArray, JsonObject {}

public record JsonString(String value) implements JsonValue {}
public record JsonNumber(double value) implements JsonValue {}
public record JsonBool(boolean value) implements JsonValue {}
public record JsonNull() implements JsonValue {}
public record JsonArray(List<JsonValue> elements) implements JsonValue {}
public record JsonObject(Map<String, JsonValue> fields) implements JsonValue {}

// Pretty printer using exhaustive pattern matching
public static String prettyPrint(JsonValue value, int indent) {
    String pad = " ".repeat(indent);
    return switch (value) {
        case JsonNull() -> "null";
        case JsonBool(var b) -> String.valueOf(b);
        case JsonNumber(var n) -> n == Math.floor(n)
            ? String.valueOf((long) n) : String.valueOf(n);
        case JsonString(var s) -> "\\"" + s + "\\"";
        case JsonArray(var elems) -> {
            if (elems.isEmpty()) yield "[]";
            String items = elems.stream()
                .map(e -> pad + "  " + prettyPrint(e, indent + 2))
                .collect(Collectors.joining(",\\n"));
            yield "[\\n" + items + "\\n" + pad + "]";
        }
        case JsonObject(var fields) -> {
            if (fields.isEmpty()) yield "{}";
            String entries = fields.entrySet().stream()
                .map(e -> pad + "  \\"" + e.getKey() + "\\": "
                    + prettyPrint(e.getValue(), indent + 2))
                .collect(Collectors.joining(",\\n"));
            yield "{\\n" + entries + "\\n" + pad + "}";
        }
    };
}

// Type-safe value extraction with guarded patterns
public static Optional<String> getStringField(JsonValue json, String key) {
    return switch (json) {
        case JsonObject(var fields)
            when fields.get(key) instanceof JsonString(var s) ->
                Optional.of(s);
        default -> Optional.empty();
    };
}

// Usage
var user = new JsonObject(Map.of(
    "name", new JsonString("Alice"),
    "age", new JsonNumber(30),
    "active", new JsonBool(true),
    "tags", new JsonArray(List.of(
        new JsonString("admin"), new JsonString("dev")))
));
System.out.println(prettyPrint(user, 0));`,
      },
    ],
  },
];
