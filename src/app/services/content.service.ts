import { Injectable } from '@angular/core';
import { Topic, SidebarCategory } from '../models/topic.model';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private topics: Topic[] = [
    // ── Fundamentals ──
    {
      id: 'f1',
      slug: 'getting-started',
      title: 'Getting Started',
      description: 'Install the JDK, write your first program, and learn to compile & run Java.',
      category: 'fundamentals',
      sections: [
        {
          id: 'install-jdk',
          title: 'Installing the JDK',
          content: `
<p>The Java Development Kit (JDK) is the foundation of every Java project. It ships with the compiler (<code>javac</code>), the runtime (<code>java</code>), and a rich standard library. Oracle JDK and Eclipse Temurin (Adoptium) are the two most popular distributions.</p>
<p>On macOS you can use Homebrew; on Linux, your package manager; on Windows, download the installer from <a href="https://adoptium.net" target="_blank">adoptium.net</a>.</p>
<pre><code class="language-java">// Verify installation
$ java -version
openjdk version "21.0.2" 2024-01-16 LTS

$ javac -version
javac 21.0.2</code></pre>
<div class="callout">
  <strong>💡 Tip:</strong> Use a version manager like <code>sdkman</code> to switch between JDK versions effortlessly: <code>sdk install java 21.0.2-tem</code>.
</div>
<p>Make sure <code>JAVA_HOME</code> points to the JDK root and that <code>$JAVA_HOME/bin</code> is on your <code>PATH</code>. Most IDEs detect installed JDKs automatically, but setting the environment variable prevents surprises when building from the terminal.</p>`
        },
        {
          id: 'hello-world',
          title: 'Hello World',
          content: `
<p>Every Java application needs at least one class with a <code>public static void main(String[] args)</code> method — the entry point the JVM looks for when you run the program.</p>
<pre><code class="language-java">public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}</code></pre>
<p>Since Java 21 you can also use unnamed classes and instance main methods (JEP 463, preview) to reduce boilerplate for small programs:</p>
<pre><code class="language-java">// HelloSimple.java — no class declaration needed (preview)
void main() {
    System.out.println("Hello from a simpler Java!");
}</code></pre>
<p>Save the file as <code>HelloWorld.java</code>. The file name <strong>must</strong> match the public class name, including case.</p>
<div class="callout">
  <strong>📝 Note:</strong> Java is case-sensitive. <code>HelloWorld</code> and <code>helloworld</code> are two different identifiers.
</div>`
        },
        {
          id: 'compile-and-run',
          title: 'Compile & Run',
          content: `
<p>Java uses a two-step workflow: compile source (<code>.java</code>) into bytecode (<code>.class</code>), then execute the bytecode on the JVM.</p>
<pre><code class="language-java">// Step 1 — Compile
$ javac HelloWorld.java

// Step 2 — Run
$ java HelloWorld
Hello, World!</code></pre>
<p>The <code>javac</code> compiler verifies types at compile time, catching a large category of bugs before the program ever runs. The resulting <code>.class</code> file is platform-independent — it runs on any OS with a compatible JVM.</p>
<ul>
  <li><code>javac</code> — compiles <code>.java</code> source files to <code>.class</code> bytecode</li>
  <li><code>java</code> — launches the JVM and executes the specified class</li>
  <li><code>javap</code> — disassembles bytecode (useful for learning)</li>
  <li><code>jshell</code> — interactive REPL for quick experiments</li>
</ul>
<p>For quick single-file programs, Java 11+ lets you skip the explicit compile step:</p>
<pre><code class="language-java">$ java HelloWorld.java   // compiles in memory and runs</code></pre>`
        },
        {
          id: 'choosing-an-ide',
          title: 'Choosing an IDE',
          content: `
<p>While you can write Java in any text editor, a full-featured IDE dramatically improves productivity through code completion, refactoring tools, integrated debugging, and build automation.</p>
<ul>
  <li><strong>IntelliJ IDEA</strong> — The most popular Java IDE. The Community Edition is free and covers most needs; Ultimate adds enterprise framework support.</li>
  <li><strong>Eclipse</strong> — A veteran open-source IDE with a massive plugin ecosystem. Preferred in some enterprise environments.</li>
  <li><strong>VS Code</strong> — Lightweight and fast. The <em>Extension Pack for Java</em> by Microsoft adds language support, debugging, and Maven/Gradle integration.</li>
</ul>
<div class="callout">
  <strong>💡 Tip:</strong> Whichever IDE you choose, learn its keyboard shortcuts early. Navigation shortcuts like <em>Go to Definition</em> and <em>Find Usages</em> will save you hours every week.
</div>
<p>All three IDEs support <strong>Maven</strong> and <strong>Gradle</strong> projects out of the box, so you can import any standard Java project and start coding immediately.</p>`
        }
      ]
    },
    {
      id: 'f2',
      slug: 'data-types-and-variables',
      title: 'Data Types & Variables',
      description: 'Primitives, reference types, type casting, and the var keyword.',
      category: 'fundamentals',
      sections: [
        {
          id: 'primitive-types',
          title: 'Primitive Types',
          content: `
<p>Java has eight primitive types that are stored directly on the stack (or inlined in objects). They are not objects and have no methods of their own.</p>
<pre><code class="language-java">byte   b = 127;          // 8-bit signed integer
short  s = 32_767;       // 16-bit signed integer
int    i = 2_147_483_647;// 32-bit signed integer (most common)
long   l = 9_000_000_000L; // 64-bit signed integer

float  f = 3.14f;        // 32-bit IEEE 754
double d = 3.14159265;   // 64-bit IEEE 754 (default for decimals)

char   c = 'A';          // 16-bit Unicode character
boolean flag = true;     // true or false</code></pre>
<p>Underscores in numeric literals (e.g., <code>2_147_483_647</code>) improve readability and are ignored by the compiler. They were introduced in Java 7.</p>
<div class="callout">
  <strong>⚠️ Important:</strong> Prefer <code>int</code> for whole numbers and <code>double</code> for decimals unless you have a specific reason to use a smaller or larger type. For financial calculations, use <code>BigDecimal</code>.
</div>
<p>Each primitive has a corresponding wrapper class (<code>Integer</code>, <code>Double</code>, etc.) that allows it to be used where objects are required, such as in collections.</p>`
        },
        {
          id: 'reference-types',
          title: 'Reference Types',
          content: `
<p>Everything that is not a primitive is a reference type. Variables of reference types hold a <em>reference</em> (memory address) to an object on the heap — not the object itself.</p>
<pre><code class="language-java">String name = "Alice";           // String is a reference type
int[] numbers = {1, 2, 3};      // arrays are reference types
List&lt;String&gt; list = new ArrayList&lt;&gt;(); // collections too</code></pre>
<p>Key differences from primitives:</p>
<ul>
  <li>Reference variables can be <code>null</code> — primitives cannot.</li>
  <li><code>==</code> compares references (identity), not content. Use <code>.equals()</code> for content comparison.</li>
  <li>Objects are allocated on the heap and managed by the garbage collector.</li>
</ul>
<pre><code class="language-java">String a = new String("hello");
String b = new String("hello");

System.out.println(a == b);       // false — different objects
System.out.println(a.equals(b));  // true  — same content</code></pre>
<p>Understanding this distinction is one of the most important fundamentals in Java, as confusing identity with equality is a common source of bugs.</p>`
        },
        {
          id: 'type-casting',
          title: 'Type Casting',
          content: `
<p>Java performs <strong>widening</strong> conversions automatically (e.g., <code>int</code> → <code>long</code>) because no data is lost. <strong>Narrowing</strong> conversions (e.g., <code>double</code> → <code>int</code>) require an explicit cast because data may be truncated.</p>
<pre><code class="language-java">// Widening — automatic
int i = 42;
long l = i;       // OK
double d = i;     // OK

// Narrowing — explicit cast required
double pi = 3.14159;
int truncated = (int) pi;  // 3 — fractional part lost

long big = 3_000_000_000L;
int overflow = (int) big;  // undefined value — overflow!</code></pre>
<div class="callout">
  <strong>⚠️ Important:</strong> Narrowing casts can silently overflow. Always range-check values before casting, or use <code>Math.toIntExact()</code> which throws on overflow.
</div>
<p>For reference types, casting follows the inheritance hierarchy. You can upcast implicitly and downcast explicitly, but a bad downcast throws <code>ClassCastException</code> at runtime. Use <code>instanceof</code> to check first.</p>`
        },
        {
          id: 'var-keyword',
          title: 'The var Keyword',
          content: `
<p>Since Java 10, you can use <code>var</code> for local variable type inference. The compiler determines the type from the right-hand side of the assignment.</p>
<pre><code class="language-java">var message = "Hello";            // inferred as String
var numbers = List.of(1, 2, 3);   // inferred as List&lt;Integer&gt;
var map = new HashMap&lt;String, Integer&gt;(); // inferred type</code></pre>
<p>Rules and limitations:</p>
<ul>
  <li><code>var</code> can only be used for <strong>local variables</strong> with an initializer.</li>
  <li>It cannot be used for method parameters, return types, or fields.</li>
  <li>The inferred type is fixed at compile time — <code>var</code> does <em>not</em> make Java dynamically typed.</li>
</ul>
<div class="callout">
  <strong>💡 Tip:</strong> Use <code>var</code> when the type is obvious from the right-hand side (e.g., constructor calls). Avoid it when the type is not immediately clear, as readability matters more than brevity.
</div>
<p>Remember: <code>var</code> is a reserved type name, not a keyword. You can still name variables <code>var</code> (though you shouldn't), but you cannot use it as a class or interface name.</p>`
        }
      ]
    },
    {
      id: 'f3',
      slug: 'control-flow',
      title: 'Control Flow',
      description: 'if/else, switch expressions, loops, break and continue.',
      category: 'fundamentals',
      sections: [
        {
          id: 'if-else',
          title: 'If / Else Statements',
          content: `
<p>The <code>if</code> statement is the most basic branching construct. It evaluates a boolean expression and executes the corresponding block.</p>
<pre><code class="language-java">int score = 85;

if (score >= 90) {
    System.out.println("Grade: A");
} else if (score >= 80) {
    System.out.println("Grade: B");
} else if (score >= 70) {
    System.out.println("Grade: C");
} else {
    System.out.println("Grade: F");
}</code></pre>
<p>Java also provides the ternary operator for simple inline conditions:</p>
<pre><code class="language-java">String result = (score >= 60) ? "Pass" : "Fail";</code></pre>
<div class="callout">
  <strong>💡 Tip:</strong> Always use braces <code>{}</code> even for single-statement bodies. It prevents subtle bugs when someone later adds a second statement to the block.
</div>`
        },
        {
          id: 'switch-expressions',
          title: 'Switch Expressions',
          content: `
<p>Java 14 finalized <strong>switch expressions</strong>, which are more concise and less error-prone than the traditional switch statement because they don't require <code>break</code> and can return a value.</p>
<pre><code class="language-java">String day = "MONDAY";

String type = switch (day) {
    case "MONDAY", "TUESDAY", "WEDNESDAY",
         "THURSDAY", "FRIDAY" -> "Weekday";
    case "SATURDAY", "SUNDAY" -> "Weekend";
    default -> throw new IllegalArgumentException("Unknown: " + day);
};

System.out.println(type); // Weekday</code></pre>
<p>Pattern matching in switch (Java 21) takes this further, letting you match on type and destructure records:</p>
<pre><code class="language-java">Object obj = "Hello";

String description = switch (obj) {
    case Integer i -> "Integer: " + i;
    case String s  -> "String of length " + s.length();
    case null      -> "null value";
    default        -> "Unknown type";
};</code></pre>
<ul>
  <li>Arrow syntax (<code>-></code>) prevents fall-through by default.</li>
  <li>Switch expressions must be exhaustive — the compiler enforces coverage of all cases.</li>
  <li>You can still use the colon syntax with <code>yield</code> for multi-statement cases.</li>
</ul>`
        },
        {
          id: 'loops',
          title: 'Loops',
          content: `
<p>Java provides three primary loop constructs: <code>for</code>, <code>while</code>, and <code>do-while</code>.</p>
<pre><code class="language-java">// Classic for loop
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}

// Enhanced for-each loop (Java 5+)
int[] nums = {10, 20, 30};
for (int n : nums) {
    System.out.println(n);
}

// While loop
int count = 0;
while (count < 3) {
    System.out.println("Count: " + count);
    count++;
}

// Do-while — always executes at least once
do {
    System.out.println("Runs once even if false");
} while (false);</code></pre>
<p>The <strong>enhanced for-each</strong> loop works with any <code>Iterable</code> or array and is preferred when you don't need the index.</p>
<div class="callout">
  <strong>💡 Tip:</strong> For complex iteration, consider using Streams (<code>list.stream().filter(...).forEach(...)</code>) instead of manual loops. Streams are more declarative and often more readable.
</div>`
        },
        {
          id: 'break-continue',
          title: 'Break & Continue',
          content: `
<p><code>break</code> exits the enclosing loop immediately. <code>continue</code> skips the rest of the current iteration and moves to the next one.</p>
<pre><code class="language-java">// break — exit when target is found
for (int i = 0; i < 100; i++) {
    if (i == 42) {
        System.out.println("Found it!");
        break;
    }
}

// continue — skip even numbers
for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) continue;
    System.out.println(i); // 1, 3, 5, 7, 9
}</code></pre>
<p>Java also supports <strong>labeled break and continue</strong> for nested loops:</p>
<pre><code class="language-java">outer:
for (int i = 0; i < 5; i++) {
    for (int j = 0; j < 5; j++) {
        if (i * j > 6) break outer; // exits BOTH loops
        System.out.printf("(%d,%d) ", i, j);
    }
}</code></pre>
<div class="callout">
  <strong>⚠️ Important:</strong> Labeled breaks can make code harder to follow. Use them sparingly and consider extracting the nested loop into a separate method instead.
</div>`
        }
      ]
    },

    // ── Object-Oriented Programming ──
    {
      id: 'oop1',
      slug: 'classes-and-objects',
      title: 'Classes & Objects',
      description: 'Defining classes, constructors, methods, and access modifiers.',
      category: 'object-oriented-programming',
      sections: [
        {
          id: 'defining-classes',
          title: 'Defining Classes',
          content: `
<p>A class is a blueprint for creating objects. It encapsulates data (fields) and behavior (methods) into a single unit. Every Java file can contain at most one <code>public</code> class, and the file name must match that class.</p>
<pre><code class="language-java">public class Person {
    // Fields (instance variables)
    private String name;
    private int age;

    // Constructor
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Method
    public String greet() {
        return "Hi, I'm " + name + " and I'm " + age + " years old.";
    }
}</code></pre>
<p>Java 16 introduced <strong>records</strong> — a concise way to declare immutable data carriers:</p>
<pre><code class="language-java">public record Point(int x, int y) {}

var p = new Point(3, 4);
System.out.println(p.x()); // 3 — accessor method auto-generated</code></pre>
<p>Records automatically generate the constructor, <code>equals()</code>, <code>hashCode()</code>, <code>toString()</code>, and accessor methods, eliminating a lot of boilerplate.</p>`
        },
        {
          id: 'constructors',
          title: 'Constructors',
          content: `
<p>Constructors initialize new objects. They have the same name as the class and no return type. Java provides a default no-argument constructor only if you define <em>no</em> constructors yourself.</p>
<pre><code class="language-java">public class Car {
    private String make;
    private int year;

    // Primary constructor
    public Car(String make, int year) {
        this.make = make;
        this.year = year;
    }

    // Overloaded constructor — delegates to the primary one
    public Car(String make) {
        this(make, 2024); // constructor chaining
    }

    // Copy constructor
    public Car(Car other) {
        this(other.make, other.year);
    }
}</code></pre>
<ul>
  <li>Use <code>this(...)</code> to call another constructor in the same class (must be the first statement).</li>
  <li>Use <code>super(...)</code> to call a parent constructor.</li>
  <li>Validate arguments in the constructor to enforce invariants early.</li>
</ul>
<div class="callout">
  <strong>💡 Tip:</strong> If you find yourself writing constructors with many parameters, consider the <strong>Builder pattern</strong> or switch to a record with a compact constructor for validation.
</div>`
        },
        {
          id: 'methods',
          title: 'Methods',
          content: `
<p>Methods define the behavior of a class. A method signature consists of the access modifier, return type, name, and parameter list.</p>
<pre><code class="language-java">public class MathUtils {
    // Static method — called on the class, not an instance
    public static int add(int a, int b) {
        return a + b;
    }

    // Varargs — variable number of arguments
    public static int sum(int... numbers) {
        int total = 0;
        for (int n : numbers) total += n;
        return total;
    }

    // Method with generics
    public static &lt;T extends Comparable&lt;T&gt;&gt; T max(T a, T b) {
        return a.compareTo(b) >= 0 ? a : b;
    }
}

// Usage
int result = MathUtils.add(2, 3);       // 5
int total  = MathUtils.sum(1, 2, 3, 4); // 10</code></pre>
<p>Java supports <strong>method overloading</strong> — multiple methods with the same name but different parameter lists. The compiler selects the correct overload at compile time.</p>
<div class="callout">
  <strong>📝 Note:</strong> Java passes all arguments by value. For primitives, the value is copied. For objects, the <em>reference</em> is copied — so the method can modify the object's state, but cannot reassign the caller's variable.
</div>`
        },
        {
          id: 'access-modifiers',
          title: 'Access Modifiers',
          content: `
<p>Java has four levels of access control that determine visibility of classes, fields, and methods:</p>
<ul>
  <li><code>public</code> — accessible from anywhere.</li>
  <li><code>protected</code> — accessible within the same package and by subclasses.</li>
  <li><em>(package-private)</em> — no keyword; accessible only within the same package.</li>
  <li><code>private</code> — accessible only within the declaring class.</li>
</ul>
<pre><code class="language-java">public class BankAccount {
    private double balance;          // only this class
    String accountId;                // package-private
    protected String ownerName;      // package + subclasses
    public String bankName;          // everyone

    public double getBalance() {     // controlled access
        return balance;
    }
}</code></pre>
<div class="callout">
  <strong>💡 Tip:</strong> Follow the principle of <strong>least privilege</strong>: make everything <code>private</code> by default, then widen access only when necessary. This keeps your API surface small and your code easier to refactor.
</div>
<p>For classes, only <code>public</code> and package-private are valid at the top level. Inner classes can use all four modifiers. Sealed classes (Java 17) add even finer control by restricting which classes can extend them.</p>`
        }
      ]
    },
    {
      id: 'oop2',
      slug: 'inheritance-and-polymorphism',
      title: 'Inheritance & Polymorphism',
      description: 'extends, method overriding, abstract classes, and interfaces.',
      category: 'object-oriented-programming',
      sections: [
        {
          id: 'extends',
          title: 'Extending Classes',
          content: `
<p>Inheritance lets a subclass reuse and extend the behavior of a superclass using the <code>extends</code> keyword. Java supports single inheritance — a class can extend only one parent.</p>
<pre><code class="language-java">public class Animal {
    protected String name;

    public Animal(String name) {
        this.name = name;
    }

    public String speak() {
        return name + " makes a sound";
    }
}

public class Dog extends Animal {
    public Dog(String name) {
        super(name); // call parent constructor
    }

    @Override
    public String speak() {
        return name + " barks!";
    }
}</code></pre>
<p>Every class in Java implicitly extends <code>java.lang.Object</code>, which provides <code>toString()</code>, <code>equals()</code>, <code>hashCode()</code>, and other foundational methods. The <code>super</code> keyword references the parent class.</p>
<div class="callout">
  <strong>💡 Tip:</strong> Prefer <strong>composition over inheritance</strong> when the relationship is "has-a" rather than "is-a". Inheritance creates tight coupling; composition keeps your code more flexible.
</div>`
        },
        {
          id: 'method-overriding',
          title: 'Method Overriding',
          content: `
<p>A subclass can <strong>override</strong> a method from its superclass by providing a new implementation with the same signature. Always annotate overrides with <code>@Override</code> — the compiler will catch mistakes.</p>
<pre><code class="language-java">public class Shape {
    public double area() {
        return 0;
    }
}

public class Circle extends Shape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
}

// Polymorphism in action
Shape shape = new Circle(5);
System.out.println(shape.area()); // 78.539...</code></pre>
<p>Rules for overriding:</p>
<ul>
  <li>The method signature (name + parameters) must be identical.</li>
  <li>The return type can be the same or a covariant (more specific) type.</li>
  <li>The access modifier cannot be more restrictive than the parent's.</li>
  <li>A method marked <code>final</code> cannot be overridden.</li>
</ul>`
        },
        {
          id: 'abstract-classes',
          title: 'Abstract Classes',
          content: `
<p>An abstract class cannot be instantiated directly. It can define both concrete methods and abstract methods that subclasses <strong>must</strong> implement.</p>
<pre><code class="language-java">public abstract class Vehicle {
    protected int speed;

    // Concrete method — shared behavior
    public void accelerate(int amount) {
        speed += amount;
    }

    // Abstract method — subclasses must implement
    public abstract String fuelType();
}

public class ElectricCar extends Vehicle {
    @Override
    public String fuelType() {
        return "Electric";
    }
}

// Vehicle v = new Vehicle(); // ❌ Compile error
Vehicle v = new ElectricCar(); // ✅ OK</code></pre>
<div class="callout">
  <strong>📝 Note:</strong> Use abstract classes when you need shared state (fields) or partial implementations. Use interfaces when you only need to define a contract.
</div>
<p>Abstract classes are ideal for the <strong>Template Method</strong> design pattern, where the parent defines the algorithm's skeleton and subclasses fill in specific steps.</p>`
        },
        {
          id: 'interfaces',
          title: 'Interfaces',
          content: `
<p>An interface defines a contract — a set of methods that implementing classes must provide. Since Java 8, interfaces can also have <code>default</code> and <code>static</code> methods with implementations.</p>
<pre><code class="language-java">public interface Drawable {
    void draw();  // abstract by default

    default String description() {
        return "A drawable shape";
    }

    static Drawable empty() {
        return () -> {}; // lambda — no-op implementation
    }
}

public class Square implements Drawable {
    @Override
    public void draw() {
        System.out.println("Drawing a square");
    }
}

// A class can implement multiple interfaces
public class Canvas implements Drawable, Serializable {
    @Override
    public void draw() { /* ... */ }
}</code></pre>
<p>Java 17 introduced <strong>sealed interfaces</strong> that restrict which classes can implement them:</p>
<pre><code class="language-java">public sealed interface Shape
    permits Circle, Rectangle, Triangle {
    double area();
}</code></pre>
<ul>
  <li>Classes can implement <strong>multiple</strong> interfaces (unlike single inheritance with classes).</li>
  <li>Interfaces support constants (<code>public static final</code> by default).</li>
  <li>Sealed interfaces work beautifully with pattern matching in switch.</li>
</ul>`
        }
      ]
    },
    {
      id: 'oop3',
      slug: 'encapsulation-and-abstraction',
      title: 'Encapsulation & Abstraction',
      description: 'Data hiding, getters/setters, and abstraction principles.',
      category: 'object-oriented-programming',
      sections: [
        {
          id: 'data-hiding',
          title: 'Data Hiding',
          content: `
<p>Encapsulation is the practice of hiding an object's internal state and requiring all interaction to go through well-defined methods. This protects invariants and makes the code easier to change.</p>
<pre><code class="language-java">public class Temperature {
    private double celsius; // hidden internal state

    public Temperature(double celsius) {
        setCelsius(celsius); // use setter for validation
    }

    public double getCelsius() {
        return celsius;
    }

    public void setCelsius(double celsius) {
        if (celsius < -273.15) {
            throw new IllegalArgumentException(
                "Temperature below absolute zero");
        }
        this.celsius = celsius;
    }

    public double getFahrenheit() {
        return celsius * 9.0 / 5.0 + 32;
    }
}</code></pre>
<div class="callout">
  <strong>💡 Tip:</strong> Don't blindly generate getters and setters for every field. Only expose what is truly needed. If a field should be read-only, provide only a getter. Consider using <strong>records</strong> for immutable data.
</div>
<p>By making fields <code>private</code>, you can later change the internal representation (e.g., store Kelvin internally) without affecting any code that uses the class.</p>`
        },
        {
          id: 'immutability',
          title: 'Immutability',
          content: `
<p>An immutable object cannot be modified after creation. Immutability simplifies reasoning about code, prevents bugs in concurrent programs, and makes objects safe to share.</p>
<pre><code class="language-java">public final class Money {
    private final String currency;
    private final long amountInCents;

    public Money(String currency, long amountInCents) {
        this.currency = currency;
        this.amountInCents = amountInCents;
    }

    public Money add(Money other) {
        if (!currency.equals(other.currency)) {
            throw new IllegalArgumentException("Currency mismatch");
        }
        return new Money(currency, amountInCents + other.amountInCents);
    }

    public String currency() { return currency; }
    public long amountInCents() { return amountInCents; }
}</code></pre>
<p>Rules for creating immutable classes:</p>
<ul>
  <li>Make the class <code>final</code> (or sealed) so it cannot be subclassed.</li>
  <li>Make all fields <code>private final</code>.</li>
  <li>Don't provide setters.</li>
  <li>Make defensive copies of mutable fields in the constructor and accessors.</li>
</ul>
<p>Records are immutable by design, making them the simplest way to create value objects in modern Java:</p>
<pre><code class="language-java">public record Money(String currency, long amountInCents) {
    public Money add(Money other) {
        if (!currency.equals(other.currency))
            throw new IllegalArgumentException("Currency mismatch");
        return new Money(currency, amountInCents + other.amountInCents);
    }
}</code></pre>`
        },
        {
          id: 'abstraction-principles',
          title: 'Abstraction Principles',
          content: `
<p>Abstraction means exposing only the essential features of an object while hiding implementation details. In Java, abstraction is achieved through abstract classes and interfaces.</p>
<pre><code class="language-java">// Abstract interface — clients depend on this
public interface PaymentProcessor {
    PaymentResult charge(Money amount, PaymentMethod method);
    PaymentResult refund(String transactionId);
}

// Concrete implementation — hidden details
public class StripeProcessor implements PaymentProcessor {
    private final StripeClient client;

    public StripeProcessor(StripeClient client) {
        this.client = client;
    }

    @Override
    public PaymentResult charge(Money amount, PaymentMethod method) {
        // Stripe-specific implementation details
        var response = client.createCharge(amount.amountInCents(), method.token());
        return new PaymentResult(response.isSuccess(), response.id());
    }

    @Override
    public PaymentResult refund(String transactionId) {
        var response = client.createRefund(transactionId);
        return new PaymentResult(response.isSuccess(), response.id());
    }
}</code></pre>
<p>The calling code depends only on <code>PaymentProcessor</code>, not on Stripe-specific details. Swapping to a different provider requires no changes to client code.</p>
<div class="callout">
  <strong>💡 Tip:</strong> Follow the <strong>Dependency Inversion Principle</strong>: high-level modules should depend on abstractions, not on concrete implementations. This is the foundation of Dependency Injection in frameworks like Spring.
</div>`
        }
      ]
    },

    // ── Core Java ──
    {
      id: 'cj1',
      slug: 'collections-framework',
      title: 'Collections Framework',
      description: 'List, Set, Map, Queue, and iterators.',
      category: 'core-java',
      sections: [
        {
          id: 'list',
          title: 'List Implementations',
          content: `
<p>A <code>List</code> is an ordered, indexed collection that allows duplicates. The two primary implementations are <code>ArrayList</code> (backed by an array) and <code>LinkedList</code> (doubly-linked list).</p>
<pre><code class="language-java">// ArrayList — fast random access, O(1) get, O(n) insert in middle
List&lt;String&gt; names = new ArrayList&lt;&gt;();
names.add("Alice");
names.add("Bob");
names.add("Charlie");
System.out.println(names.get(1)); // Bob

// Immutable list (Java 9+)
var immutable = List.of("x", "y", "z");
// immutable.add("w"); // ❌ UnsupportedOperationException

// List with initial capacity hint
var large = new ArrayList&lt;Integer&gt;(10_000);</code></pre>
<ul>
  <li><strong>ArrayList</strong> — use by default. Best for random access and iteration.</li>
  <li><strong>LinkedList</strong> — better for frequent insertions/removals at the head. Rarely the right choice in practice due to poor cache locality.</li>
  <li><strong>List.of()</strong> / <strong>List.copyOf()</strong> — unmodifiable lists (Java 9+).</li>
</ul>
<div class="callout">
  <strong>💡 Tip:</strong> Always declare variables using the interface type (<code>List</code>, not <code>ArrayList</code>). This makes it easy to swap implementations later.
</div>`
        },
        {
          id: 'set-and-map',
          title: 'Set & Map',
          content: `
<p>A <code>Set</code> is a collection with <strong>no duplicate elements</strong>. A <code>Map</code> stores <strong>key-value pairs</strong> where each key is unique.</p>
<pre><code class="language-java">// HashSet — O(1) add, remove, contains
Set&lt;String&gt; tags = new HashSet&lt;&gt;();
tags.add("java");
tags.add("programming");
tags.add("java"); // duplicate — ignored
System.out.println(tags.size()); // 2

// TreeSet — sorted order, O(log n) operations
Set&lt;Integer&gt; sorted = new TreeSet&lt;&gt;(List.of(3, 1, 4, 1, 5));
System.out.println(sorted); // [1, 3, 4, 5]

// HashMap — O(1) average for get/put
Map&lt;String, Integer&gt; scores = new HashMap&lt;&gt;();
scores.put("Alice", 95);
scores.put("Bob", 87);

// Modern iteration
scores.forEach((name, score) -&gt;
    System.out.println(name + ": " + score));

// Immutable (Java 9+)
var config = Map.of("host", "localhost", "port", "8080");</code></pre>
<div class="callout">
  <strong>⚠️ Important:</strong> Objects used as keys in <code>HashMap</code> or elements in <code>HashSet</code> must correctly implement <code>equals()</code> and <code>hashCode()</code>. Records do this automatically.
</div>`
        },
        {
          id: 'queue-and-deque',
          title: 'Queue & Deque',
          content: `
<p><code>Queue</code> represents a FIFO (first-in, first-out) collection, while <code>Deque</code> (double-ended queue) supports insertion and removal at both ends.</p>
<pre><code class="language-java">// LinkedList as a Queue
Queue&lt;String&gt; queue = new LinkedList&lt;&gt;();
queue.offer("first");
queue.offer("second");
queue.offer("third");
System.out.println(queue.poll()); // first

// ArrayDeque — faster than LinkedList for both stack and queue
Deque&lt;String&gt; stack = new ArrayDeque&lt;&gt;();
stack.push("bottom");
stack.push("middle");
stack.push("top");
System.out.println(stack.pop()); // top

// PriorityQueue — elements ordered by natural ordering or Comparator
Queue&lt;Integer&gt; pq = new PriorityQueue&lt;&gt;();
pq.offer(30);
pq.offer(10);
pq.offer(20);
System.out.println(pq.poll()); // 10 — smallest first</code></pre>
<ul>
  <li><code>offer()</code> / <code>poll()</code> / <code>peek()</code> — return <code>null</code> on failure</li>
  <li><code>add()</code> / <code>remove()</code> / <code>element()</code> — throw exceptions on failure</li>
  <li>Prefer <code>ArrayDeque</code> over <code>Stack</code> and <code>LinkedList</code> for stack/queue use</li>
</ul>`
        },
        {
          id: 'iterators',
          title: 'Iterators & Iteration Patterns',
          content: `
<p>The <code>Iterator</code> interface provides a standard way to traverse any collection. The enhanced for-each loop uses it under the hood.</p>
<pre><code class="language-java">List&lt;String&gt; items = List.of("Apple", "Banana", "Cherry");

// For-each (preferred)
for (String item : items) {
    System.out.println(item);
}

// Explicit iterator (needed for safe removal)
List&lt;String&gt; mutable = new ArrayList&lt;&gt;(items);
Iterator&lt;String&gt; it = mutable.iterator();
while (it.hasNext()) {
    String item = it.next();
    if (item.startsWith("B")) {
        it.remove(); // safe removal during iteration
    }
}

// Modern alternatives
items.forEach(System.out::println);            // method reference
items.stream().filter(s -> s.length() > 5)
              .forEach(System.out::println);   // stream</code></pre>
<div class="callout">
  <strong>⚠️ Important:</strong> Modifying a collection while iterating with a for-each loop throws <code>ConcurrentModificationException</code>. Use <code>Iterator.remove()</code>, <code>removeIf()</code>, or create a new collection instead.
</div>`
        }
      ]
    },
    {
      id: 'cj2',
      slug: 'exception-handling',
      title: 'Exception Handling',
      description: 'try-catch, custom exceptions, checked vs unchecked.',
      category: 'core-java',
      sections: [
        {
          id: 'try-catch',
          title: 'Try-Catch-Finally',
          content: `
<p>Java uses exceptions to handle error conditions. The <code>try-catch</code> block lets you handle exceptions gracefully instead of crashing the program.</p>
<pre><code class="language-java">try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.err.println("Cannot divide by zero: " + e.getMessage());
} finally {
    System.out.println("This always executes");
}

// Try-with-resources (Java 7+) — auto-closes resources
try (var reader = new BufferedReader(new FileReader("data.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) {
    System.err.println("Failed to read file: " + e.getMessage());
}
// reader is automatically closed here</code></pre>
<ul>
  <li><code>try</code> — wraps code that may throw an exception</li>
  <li><code>catch</code> — handles specific exception types</li>
  <li><code>finally</code> — executes regardless of whether an exception was thrown</li>
  <li>Try-with-resources ensures <code>AutoCloseable</code> resources are properly closed</li>
</ul>
<div class="callout">
  <strong>💡 Tip:</strong> Always prefer try-with-resources over manual <code>finally</code> blocks for closing resources. It's shorter, safer, and handles edge cases (like exceptions in <code>close()</code>) correctly.
</div>`
        },
        {
          id: 'checked-vs-unchecked',
          title: 'Checked vs Unchecked Exceptions',
          content: `
<p>Java distinguishes between <strong>checked</strong> exceptions (must be caught or declared) and <strong>unchecked</strong> exceptions (can be thrown anywhere without declaration).</p>
<pre><code class="language-java">// Checked — extends Exception
// Must be caught or declared with "throws"
public String readFile(String path) throws IOException {
    return Files.readString(Path.of(path));
}

// Unchecked — extends RuntimeException
// No obligation to catch or declare
public int divide(int a, int b) {
    if (b == 0) throw new IllegalArgumentException("Divisor cannot be zero");
    return a / b;
}</code></pre>
<p>The exception hierarchy:</p>
<ul>
  <li><code>Throwable</code> — root of all exceptions and errors</li>
  <li><code>Error</code> — serious JVM problems (e.g., <code>OutOfMemoryError</code>). Don't catch these.</li>
  <li><code>Exception</code> — checked exceptions (e.g., <code>IOException</code>, <code>SQLException</code>)</li>
  <li><code>RuntimeException</code> — unchecked exceptions (e.g., <code>NullPointerException</code>, <code>IllegalArgumentException</code>)</li>
</ul>
<div class="callout">
  <strong>📝 Note:</strong> Modern Java practice favors unchecked exceptions for most cases. Checked exceptions work well for truly recoverable situations (like file I/O) but can create excessive boilerplate when overused.
</div>`
        },
        {
          id: 'custom-exceptions',
          title: 'Custom Exceptions',
          content: `
<p>Define your own exception classes to represent domain-specific error conditions. This makes error handling more meaningful and allows callers to catch specific failure types.</p>
<pre><code class="language-java">// Unchecked custom exception
public class OrderNotFoundException extends RuntimeException {
    private final String orderId;

    public OrderNotFoundException(String orderId) {
        super("Order not found: " + orderId);
        this.orderId = orderId;
    }

    public String getOrderId() {
        return orderId;
    }
}

// Usage
public Order findOrder(String id) {
    return orderRepository.findById(id)
        .orElseThrow(() -> new OrderNotFoundException(id));
}

// Catching
try {
    var order = findOrder("ORD-999");
} catch (OrderNotFoundException e) {
    log.warn("Order {} not found", e.getOrderId());
    // handle gracefully
}</code></pre>
<div class="callout">
  <strong>💡 Tip:</strong> Include contextual information in your exceptions (like the order ID above). It makes debugging much faster. Also, always pass the cause exception when wrapping: <code>throw new MyException("msg", cause)</code>.
</div>`
        }
      ]
    },
    {
      id: 'cj3',
      slug: 'generics',
      title: 'Generics',
      description: 'Type parameters, bounded types, and wildcards.',
      category: 'core-java',
      sections: [
        {
          id: 'type-parameters',
          title: 'Type Parameters',
          content: `
<p>Generics allow you to write classes and methods that work with any type while preserving compile-time type safety. They eliminate the need for casts and prevent <code>ClassCastException</code> at runtime.</p>
<pre><code class="language-java">// Generic class
public class Box&lt;T&gt; {
    private T value;

    public Box(T value) {
        this.value = value;
    }

    public T getValue() {
        return value;
    }

    public &lt;R&gt; Box&lt;R&gt; map(Function&lt;T, R&gt; mapper) {
        return new Box&lt;&gt;(mapper.apply(value));
    }
}

// Usage — the compiler infers and checks types
Box&lt;String&gt; stringBox = new Box&lt;&gt;("Hello");
String s = stringBox.getValue();        // no cast needed
Box&lt;Integer&gt; intBox = stringBox.map(String::length);</code></pre>
<p>Convention for type parameter names:</p>
<ul>
  <li><code>T</code> — Type</li>
  <li><code>E</code> — Element (used in collections)</li>
  <li><code>K</code>, <code>V</code> — Key, Value (used in maps)</li>
  <li><code>R</code> — Return type</li>
</ul>
<div class="callout">
  <strong>📝 Note:</strong> Due to <strong>type erasure</strong>, generic type information is removed at runtime. You cannot do <code>new T()</code>, <code>instanceof T</code>, or create arrays of generic types directly.
</div>`
        },
        {
          id: 'bounded-types',
          title: 'Bounded Types',
          content: `
<p>Bounded type parameters restrict the types that can be used as arguments. <code>extends</code> sets an upper bound; the type must be a subtype of the specified class or interface.</p>
<pre><code class="language-java">// Upper bounded — T must be Comparable
public static &lt;T extends Comparable&lt;T&gt;&gt; T findMax(List&lt;T&gt; list) {
    T max = list.getFirst();
    for (T item : list) {
        if (item.compareTo(max) > 0) {
            max = item;
        }
    }
    return max;
}

// Multiple bounds — T must satisfy all constraints
public static &lt;T extends Serializable & Comparable&lt;T&gt;&gt; void process(T item) {
    // T is guaranteed to be both Serializable and Comparable
}

// Usage
int max = findMax(List.of(3, 1, 4, 1, 5)); // 5
String maxStr = findMax(List.of("a", "c", "b")); // "c"</code></pre>
<p>The first bound can be a class; all subsequent bounds must be interfaces. The order matters because Java only supports single class inheritance.</p>`
        },
        {
          id: 'wildcards',
          title: 'Wildcards',
          content: `
<p>Wildcards (<code>?</code>) provide flexibility when working with generic types. The PECS principle guides their usage: <strong>Producer Extends, Consumer Super</strong>.</p>
<pre><code class="language-java">// Upper bounded wildcard — producer (read from)
public static double sum(List&lt;? extends Number&gt; numbers) {
    double total = 0;
    for (Number n : numbers) {
        total += n.doubleValue();
    }
    return total;
}

// Works with List&lt;Integer&gt;, List&lt;Double&gt;, etc.
sum(List.of(1, 2, 3));       // Integer
sum(List.of(1.5, 2.5));      // Double

// Lower bounded wildcard — consumer (write to)
public static void addIntegers(List&lt;? super Integer&gt; list) {
    list.add(1);
    list.add(2);
}

// Unbounded wildcard — when you don't care about type
public static void printAll(List&lt;?&gt; list) {
    for (Object item : list) {
        System.out.println(item);
    }
}</code></pre>
<div class="callout">
  <strong>💡 Tip:</strong> Remember <strong>PECS</strong>: If a parameterized type represents a <em>producer</em> (you read T from it), use <code>&lt;? extends T&gt;</code>. If it's a <em>consumer</em> (you write T to it), use <code>&lt;? super T&gt;</code>. If both, use the exact type.
</div>`
        }
      ]
    },

    // ── Advanced Java ──
    {
      id: 'aj1',
      slug: 'concurrency-and-multithreading',
      title: 'Concurrency & Multithreading',
      description: 'Thread, Runnable, ExecutorService, and synchronized.',
      category: 'advanced-java',
      sections: [
        {
          id: 'threads-basics',
          title: 'Thread Basics',
          content: `
<p>Java provides built-in support for multithreading. Every Java program has at least one thread — the main thread. You can create additional threads by extending <code>Thread</code> or implementing <code>Runnable</code>.</p>
<pre><code class="language-java">// Implementing Runnable (preferred)
Runnable task = () -> {
    System.out.println("Running on: " + Thread.currentThread().getName());
};
Thread thread = new Thread(task, "worker-1");
thread.start();
thread.join(); // wait for completion

// Extending Thread (less flexible)
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Custom thread running");
    }
}
new MyThread().start();</code></pre>
<p>Key thread lifecycle states: NEW → RUNNABLE → (BLOCKED / WAITING / TIMED_WAITING) → TERMINATED. The scheduler determines which runnable threads actually get CPU time.</p>
<div class="callout">
  <strong>⚠️ Important:</strong> Always call <code>start()</code>, not <code>run()</code>. Calling <code>run()</code> directly executes the code on the current thread — no new thread is created.
</div>`
        },
        {
          id: 'executor-service',
          title: 'ExecutorService & Thread Pools',
          content: `
<p>Creating threads manually is expensive and error-prone. The <code>ExecutorService</code> framework manages a pool of reusable threads and provides a higher-level API for concurrent execution.</p>
<pre><code class="language-java">// Fixed thread pool
ExecutorService executor = Executors.newFixedThreadPool(4);

// Submit tasks
Future&lt;String&gt; future = executor.submit(() -> {
    Thread.sleep(1000);
    return "Result from background thread";
});

// Get result (blocks until complete)
String result = future.get();
System.out.println(result);

// Virtual threads (Java 21) — lightweight threads
try (var exec = Executors.newVirtualThreadPerTaskExecutor()) {
    List&lt;Future&lt;String&gt;&gt; futures = new ArrayList&lt;&gt;();
    for (int i = 0; i < 10_000; i++) {
        final int id = i;
        futures.add(exec.submit(() -> "Task-" + id));
    }
    for (var f : futures) {
        System.out.println(f.get());
    }
} // auto-closed, waits for tasks

// Always shut down executors
executor.shutdown();</code></pre>
<ul>
  <li><code>newFixedThreadPool(n)</code> — exactly <em>n</em> threads</li>
  <li><code>newCachedThreadPool()</code> — creates threads as needed, reuses idle ones</li>
  <li><code>newVirtualThreadPerTaskExecutor()</code> — one virtual thread per task (Java 21)</li>
</ul>
<div class="callout">
  <strong>💡 Tip:</strong> Virtual threads are ideal for I/O-bound tasks (HTTP calls, database queries). For CPU-bound work, stick with platform threads sized to the number of CPU cores.
</div>`
        },
        {
          id: 'synchronization',
          title: 'Synchronization',
          content: `
<p>When multiple threads access shared mutable state, you need synchronization to prevent race conditions and ensure data consistency.</p>
<pre><code class="language-java">public class Counter {
    private int count = 0;

    // Synchronized method — only one thread at a time
    public synchronized void increment() {
        count++;
    }

    public synchronized int getCount() {
        return count;
    }
}

// Using explicit locks (more flexible)
public class BetterCounter {
    private int count = 0;
    private final ReentrantLock lock = new ReentrantLock();

    public void increment() {
        lock.lock();
        try {
            count++;
        } finally {
            lock.unlock();
        }
    }
}

// Atomic variables (best for simple counters)
AtomicInteger atomicCount = new AtomicInteger(0);
atomicCount.incrementAndGet(); // thread-safe without locking</code></pre>
<div class="callout">
  <strong>💡 Tip:</strong> Prefer higher-level concurrency utilities over raw <code>synchronized</code>: <code>AtomicInteger</code> for counters, <code>ConcurrentHashMap</code> for maps, <code>BlockingQueue</code> for producer-consumer patterns. They're faster and harder to misuse.
</div>`
        },
        {
          id: 'concurrent-collections',
          title: 'Concurrent Collections',
          content: `
<p>The <code>java.util.concurrent</code> package provides thread-safe collection implementations designed for high concurrency without the bottleneck of full synchronization.</p>
<pre><code class="language-java">// ConcurrentHashMap — fine-grained locking
ConcurrentHashMap&lt;String, Integer&gt; map = new ConcurrentHashMap&lt;&gt;();
map.put("visits", 0);
map.merge("visits", 1, Integer::sum); // atomic update

// CopyOnWriteArrayList — great for read-heavy workloads
CopyOnWriteArrayList&lt;String&gt; listeners = new CopyOnWriteArrayList&lt;&gt;();
listeners.add("listener1");
// Iteration never throws ConcurrentModificationException

// BlockingQueue — producer-consumer pattern
BlockingQueue&lt;String&gt; queue = new LinkedBlockingQueue&lt;&gt;(100);

// Producer
queue.put("message");      // blocks if queue is full

// Consumer
String msg = queue.take();  // blocks if queue is empty</code></pre>
<ul>
  <li><code>ConcurrentHashMap</code> — the go-to concurrent map. Never use <code>Collections.synchronizedMap</code> in new code.</li>
  <li><code>CopyOnWriteArrayList</code> — best when reads vastly outnumber writes.</li>
  <li><code>BlockingQueue</code> — thread-safe FIFO with blocking operations.</li>
</ul>`
        }
      ]
    },
    {
      id: 'aj2',
      slug: 'jvm-internals',
      title: 'JVM Internals',
      description: 'Class loading, memory model, and garbage collection.',
      category: 'advanced-java',
      sections: [
        {
          id: 'class-loading',
          title: 'Class Loading',
          content: `
<p>The JVM loads classes on demand through a delegation model of class loaders. Understanding this process helps debug <code>ClassNotFoundException</code>, <code>NoClassDefFoundError</code>, and class version conflicts.</p>
<pre><code class="language-java">// The three built-in class loaders (Java 9+ module system)
// 1. Bootstrap ClassLoader — loads java.base module (rt.jar equivalent)
// 2. Platform ClassLoader — loads platform modules (java.sql, java.xml, etc.)
// 3. Application ClassLoader — loads classes from classpath/modulepath

// Inspect which class loader loaded a class
System.out.println(String.class.getClassLoader());     // null (bootstrap)
System.out.println(App.class.getClassLoader());        // AppClassLoader</code></pre>
<p>The class loading process has three phases:</p>
<ul>
  <li><strong>Loading</strong> — finds the <code>.class</code> file and reads the bytecode into memory.</li>
  <li><strong>Linking</strong> — verifies bytecode, prepares static fields, and resolves symbolic references.</li>
  <li><strong>Initialization</strong> — executes static initializers and static field assignments.</li>
</ul>
<div class="callout">
  <strong>📝 Note:</strong> Classes are loaded lazily. A class is not loaded until it is first actively used (e.g., creating an instance, calling a static method, or accessing a static field).
</div>`
        },
        {
          id: 'memory-model',
          title: 'JVM Memory Model',
          content: `
<p>The JVM divides memory into several runtime data areas, each with a different purpose and lifecycle.</p>
<pre><code class="language-java">// Heap — where objects live
var list = new ArrayList&lt;String&gt;();  // allocated on the heap

// Stack — each thread has its own stack
// stores local variables, method frames
void calculate() {
    int x = 42;           // on the stack
    String s = "hello";   // reference on stack, String object on heap
}

// Metaspace — class metadata (replaced PermGen in Java 8)
// stores class definitions, method data, constant pools</code></pre>
<p>Memory areas:</p>
<ul>
  <li><strong>Heap</strong> — shared by all threads. Divided into Young Gen (Eden + Survivors) and Old Gen.</li>
  <li><strong>Stack</strong> — per-thread. Stores method frames, local variables, and partial results.</li>
  <li><strong>Metaspace</strong> — stores class metadata. Grows dynamically (uses native memory).</li>
  <li><strong>Code Cache</strong> — stores JIT-compiled native code.</li>
</ul>
<div class="callout">
  <strong>💡 Tip:</strong> Common JVM tuning flags: <code>-Xms</code> (initial heap), <code>-Xmx</code> (max heap), <code>-XX:+UseG1GC</code> (G1 collector). Start with defaults and tune only based on profiling data.
</div>`
        },
        {
          id: 'garbage-collection',
          title: 'Garbage Collection',
          content: `
<p>Java's garbage collector (GC) automatically reclaims memory occupied by objects that are no longer reachable. You never explicitly free memory in Java.</p>
<pre><code class="language-java">// Object becomes eligible for GC when no references point to it
void example() {
    var obj = new StringBuilder("Hello");  // obj is reachable
    obj = null;                            // original object now unreachable
    // GC may reclaim the StringBuilder at any time
}

// JVM flags to choose a collector
// -XX:+UseG1GC          — G1 (default in JDK 9+)
// -XX:+UseZGC           — ZGC (low-latency, Java 15+)
// -XX:+UseShenandoahGC  — Shenandoah (low-pause)

// Monitor GC activity
// -Xlog:gc*             — GC logging
// -XX:+PrintGCDetails   — detailed GC output (older JVMs)</code></pre>
<p>Common garbage collectors:</p>
<ul>
  <li><strong>G1 GC</strong> — default since Java 9. Good balance of throughput and latency.</li>
  <li><strong>ZGC</strong> — sub-millisecond pause times, works with terabyte-sized heaps.</li>
  <li><strong>Shenandoah</strong> — concurrent compaction, low and predictable pauses.</li>
  <li><strong>Parallel GC</strong> — maximizes throughput (best for batch processing).</li>
</ul>
<div class="callout">
  <strong>⚠️ Important:</strong> Avoid calling <code>System.gc()</code> — it's only a <em>suggestion</em> to the JVM and can actually hurt performance. Let the GC do its job. Focus on reducing unnecessary allocations and avoiding memory leaks (e.g., unclosed resources, growing collections).
</div>`
        }
      ]
    },
    {
      id: 'aj3',
      slug: 'streams-and-lambdas',
      title: 'Streams & Lambdas',
      description: 'Functional interfaces, stream operations, and method references.',
      category: 'advanced-java',
      sections: [
        {
          id: 'functional-interfaces',
          title: 'Functional Interfaces & Lambdas',
          content: `
<p>A <strong>functional interface</strong> has exactly one abstract method and can be implemented using a lambda expression. The <code>java.util.function</code> package provides the most common ones.</p>
<pre><code class="language-java">// Common functional interfaces
Function&lt;String, Integer&gt; length = s -> s.length();
Predicate&lt;String&gt; isLong = s -> s.length() > 10;
Consumer&lt;String&gt; printer = System.out::println;
Supplier&lt;String&gt; hello = () -> "Hello, World!";
BiFunction&lt;Integer, Integer, Integer&gt; add = (a, b) -> a + b;

// Lambda syntax
Comparator&lt;String&gt; byLength = (a, b) -> Integer.compare(a.length(), b.length());

// Multi-line lambda
Function&lt;String, String&gt; transform = s -> {
    String trimmed = s.trim();
    return trimmed.toUpperCase();
};</code></pre>
<ul>
  <li><code>Function&lt;T, R&gt;</code> — takes T, returns R</li>
  <li><code>Predicate&lt;T&gt;</code> — takes T, returns boolean</li>
  <li><code>Consumer&lt;T&gt;</code> — takes T, returns nothing</li>
  <li><code>Supplier&lt;T&gt;</code> — takes nothing, returns T</li>
</ul>
<div class="callout">
  <strong>💡 Tip:</strong> You can create your own functional interfaces with <code>@FunctionalInterface</code>. The annotation is optional but helps the compiler catch mistakes if you accidentally add a second abstract method.
</div>`
        },
        {
          id: 'stream-operations',
          title: 'Stream Operations',
          content: `
<p>Streams provide a declarative way to process collections. A stream pipeline consists of a source, zero or more intermediate operations, and a terminal operation.</p>
<pre><code class="language-java">List&lt;String&gt; names = List.of("Alice", "Bob", "Charlie", "David", "Eve");

// Filter, transform, collect
List&lt;String&gt; result = names.stream()
    .filter(n -> n.length() > 3)        // intermediate
    .map(String::toUpperCase)            // intermediate
    .sorted()                            // intermediate
    .toList();                           // terminal (Java 16+)
// [ALICE, CHARLIE, DAVID]

// Reduce
int totalLength = names.stream()
    .mapToInt(String::length)
    .sum(); // 24

// Grouping
Map&lt;Integer, List&lt;String&gt;&gt; byLength = names.stream()
    .collect(Collectors.groupingBy(String::length));
// {3=[Bob, Eve], 5=[Alice, David], 7=[Charlie]}</code></pre>
<p>Intermediate operations are <strong>lazy</strong> — they don't execute until a terminal operation triggers the pipeline. This allows optimizations like short-circuiting.</p>
<div class="callout">
  <strong>⚠️ Important:</strong> A stream can only be consumed <strong>once</strong>. After a terminal operation, the stream is closed. Create a new stream to process the data again.
</div>`
        },
        {
          id: 'method-references',
          title: 'Method References',
          content: `
<p>Method references are shorthand for lambdas that simply call an existing method. They improve readability when the lambda's only purpose is to delegate to a method.</p>
<pre><code class="language-java">// Four kinds of method references:

// 1. Static method — ClassName::staticMethod
Function&lt;String, Integer&gt; parse = Integer::parseInt;

// 2. Instance method of a particular object — instance::method
String prefix = "Hello";
Function&lt;String, String&gt; concat = prefix::concat;

// 3. Instance method of an arbitrary object — ClassName::method
Function&lt;String, String&gt; upper = String::toUpperCase;

// 4. Constructor reference — ClassName::new
Supplier&lt;ArrayList&lt;String&gt;&gt; listFactory = ArrayList::new;

// Real-world usage
List&lt;String&gt; words = List.of("hello", "world");
words.stream()
     .map(String::toUpperCase)        // method reference
     .forEach(System.out::println);   // method reference</code></pre>
<p>Use method references when a lambda is simply passing its parameter(s) to a single method call. If the lambda does anything more complex, keep the lambda syntax for clarity.</p>
<div class="callout">
  <strong>💡 Tip:</strong> Most IDEs can automatically convert between lambdas and method references. IntelliJ shows a gray hint when a lambda can be replaced with a method reference.
</div>`
        },
        {
          id: 'advanced-stream-patterns',
          title: 'Advanced Stream Patterns',
          content: `
<p>Beyond basic filtering and mapping, streams support powerful operations like flat-mapping, partitioning, and custom collectors.</p>
<pre><code class="language-java">// FlatMap — flatten nested structures
List&lt;List&lt;Integer&gt;&gt; nested = List.of(
    List.of(1, 2), List.of(3, 4), List.of(5)
);
List&lt;Integer&gt; flat = nested.stream()
    .flatMap(Collection::stream)
    .toList(); // [1, 2, 3, 4, 5]

// Partitioning
Map&lt;Boolean, List&lt;Integer&gt;&gt; evenOdd = IntStream.rangeClosed(1, 10)
    .boxed()
    .collect(Collectors.partitioningBy(n -> n % 2 == 0));

// Parallel streams — use multiple threads
long count = names.parallelStream()
    .filter(n -> n.length() > 3)
    .count();

// Gathering (Java 22+, preview) — custom intermediate operations
var gathered = names.stream()
    .gather(Gatherers.windowFixed(2))
    .toList(); // [[Alice, Bob], [Charlie, David], [Eve]]</code></pre>
<div class="callout">
  <strong>⚠️ Important:</strong> <code>parallelStream()</code> is not always faster. It adds overhead for thread management. Only use it for computationally expensive operations on large datasets. Always benchmark.
</div>`
        }
      ]
    },

    // ── Frameworks & Tools ──
    {
      id: 'ft1',
      slug: 'spring-boot-basics',
      title: 'Spring Boot Basics',
      description: 'Dependency injection, auto-configuration, and REST APIs.',
      category: 'frameworks-and-tools',
      sections: [
        {
          id: 'dependency-injection',
          title: 'Dependency Injection',
          content: `
<p>Spring Boot's core principle is <strong>Dependency Injection (DI)</strong> — the framework creates and wires objects (beans) together, so you don't have to manage dependencies manually.</p>
<pre><code class="language-java">// Define a service bean
@Service
public class UserService {
    private final UserRepository repository;

    // Constructor injection (recommended)
    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public User findById(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new UserNotFoundException(id));
    }
}

// Spring auto-detects and injects the repository
@Repository
public interface UserRepository extends JpaRepository&lt;User, Long&gt; {
    List&lt;User&gt; findByLastName(String lastName);
}</code></pre>
<ul>
  <li><code>@Component</code> — generic Spring-managed bean</li>
  <li><code>@Service</code> — business logic layer (semantic annotation)</li>
  <li><code>@Repository</code> — data access layer (adds exception translation)</li>
  <li><code>@Controller</code> / <code>@RestController</code> — web layer</li>
</ul>
<div class="callout">
  <strong>💡 Tip:</strong> Always use <strong>constructor injection</strong> over field injection (<code>@Autowired</code> on fields). Constructor injection makes dependencies explicit, supports immutability, and makes the class easy to test.
</div>`
        },
        {
          id: 'auto-configuration',
          title: 'Auto-Configuration',
          content: `
<p>Spring Boot automatically configures your application based on the dependencies on the classpath. Add <code>spring-boot-starter-web</code> and you get an embedded Tomcat server. Add <code>spring-boot-starter-data-jpa</code> and you get a configured <code>DataSource</code> and <code>EntityManager</code>.</p>
<pre><code class="language-java">// The main class — @SpringBootApplication combines three annotations
@SpringBootApplication
// = @Configuration + @EnableAutoConfiguration + @ComponentScan
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

// application.yml — externalized configuration
// spring:
//   datasource:
//     url: jdbc:postgresql://localhost:5432/mydb
//     username: admin
//     password: secret
//   jpa:
//     hibernate:
//       ddl-auto: validate</code></pre>
<p>Configuration properties are bound to Java objects using <code>@ConfigurationProperties</code>:</p>
<pre><code class="language-java">@ConfigurationProperties(prefix = "app.mail")
public record MailProperties(String host, int port, String from) {}

// application.yml:
// app.mail.host: smtp.example.com
// app.mail.port: 587
// app.mail.from: noreply@example.com</code></pre>
<div class="callout">
  <strong>💡 Tip:</strong> Use <code>spring-boot-starter-actuator</code> to get production-ready features like health checks, metrics, and environment info out of the box.
</div>`
        },
        {
          id: 'rest-apis',
          title: 'Building REST APIs',
          content: `
<p>Spring Boot makes it straightforward to build RESTful APIs. <code>@RestController</code> combines <code>@Controller</code> and <code>@ResponseBody</code>, so every method returns data directly (usually as JSON).</p>
<pre><code class="language-java">@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List&lt;User&gt; listAll() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable Long id) {
        return userService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User create(@Valid @RequestBody CreateUserRequest request) {
        return userService.create(request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }
}

// Global exception handling
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleNotFound(UserNotFoundException ex) {
        return new ErrorResponse(ex.getMessage());
    }
}</code></pre>
<div class="callout">
  <strong>💡 Tip:</strong> Use <code>@Valid</code> with Jakarta Bean Validation annotations (<code>@NotNull</code>, <code>@Size</code>, <code>@Email</code>) to validate request bodies automatically. Spring returns a 400 error with details if validation fails.
</div>`
        }
      ]
    },
    {
      id: 'ft2',
      slug: 'build-tools',
      title: 'Build Tools',
      description: 'Maven and Gradle basics.',
      category: 'frameworks-and-tools',
      sections: [
        {
          id: 'maven',
          title: 'Maven',
          content: `
<p>Apache Maven is the most widely used Java build tool. It uses a <code>pom.xml</code> file to declare project metadata, dependencies, and build configuration. Maven follows a "convention over configuration" philosophy.</p>
<pre><code class="language-java">// pom.xml
&lt;project&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;
    &lt;groupId&gt;com.example&lt;/groupId&gt;
    &lt;artifactId&gt;my-app&lt;/artifactId&gt;
    &lt;version&gt;1.0.0&lt;/version&gt;

    &lt;properties&gt;
        &lt;java.version&gt;21&lt;/java.version&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;
            &lt;version&gt;3.3.0&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.junit.jupiter&lt;/groupId&gt;
            &lt;artifactId&gt;junit-jupiter&lt;/artifactId&gt;
            &lt;version&gt;5.10.2&lt;/version&gt;
            &lt;scope&gt;test&lt;/scope&gt;
        &lt;/dependency&gt;
    &lt;/dependencies&gt;
&lt;/project&gt;</code></pre>
<p>Essential Maven commands:</p>
<ul>
  <li><code>mvn clean install</code> — clean build output, compile, test, and install to local repo</li>
  <li><code>mvn test</code> — run tests only</li>
  <li><code>mvn dependency:tree</code> — show dependency tree (great for debugging conflicts)</li>
  <li><code>mvn spring-boot:run</code> — run a Spring Boot application</li>
</ul>
<div class="callout">
  <strong>💡 Tip:</strong> Use the <strong>Maven Wrapper</strong> (<code>mvnw</code>) in your project so everyone uses the same Maven version: <code>mvn wrapper:wrapper</code>.
</div>`
        },
        {
          id: 'gradle',
          title: 'Gradle',
          content: `
<p>Gradle is a flexible build tool that uses a Groovy or Kotlin DSL instead of XML. It's faster than Maven thanks to incremental builds and a build cache.</p>
<pre><code class="language-java">// build.gradle.kts (Kotlin DSL)
plugins {
    java
    id("org.springframework.boot") version "3.3.0"
    id("io.spring.dependency-management") version "1.1.5"
}

group = "com.example"
version = "1.0.0"

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.test {
    useJUnitPlatform()
}</code></pre>
<p>Essential Gradle commands:</p>
<ul>
  <li><code>./gradlew build</code> — compile, test, and create JAR</li>
  <li><code>./gradlew test</code> — run tests</li>
  <li><code>./gradlew dependencies</code> — show dependency tree</li>
  <li><code>./gradlew bootRun</code> — run a Spring Boot application</li>
</ul>
<div class="callout">
  <strong>💡 Tip:</strong> If starting a new project, both Maven and Gradle are excellent choices. Maven is simpler to learn; Gradle is more flexible and faster for large projects. Use <a href="https://start.spring.io" target="_blank">start.spring.io</a> to generate a project with either.
</div>`
        }
      ]
    },
    {
      id: 'ft3',
      slug: 'testing',
      title: 'Testing',
      description: 'JUnit 5 and Mockito basics.',
      category: 'frameworks-and-tools',
      sections: [
        {
          id: 'junit5',
          title: 'JUnit 5 Basics',
          content: `
<p>JUnit 5 (Jupiter) is the standard testing framework for Java. It provides annotations for defining tests, lifecycle methods, assertions, and parameterized tests.</p>
<pre><code class="language-java">import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {

    private Calculator calc;

    @BeforeEach
    void setUp() {
        calc = new Calculator();
    }

    @Test
    @DisplayName("should add two positive numbers")
    void testAdd() {
        assertEquals(5, calc.add(2, 3));
    }

    @Test
    void testDivideByZero() {
        assertThrows(ArithmeticException.class,
            () -> calc.divide(10, 0));
    }

    @ParameterizedTest
    @ValueSource(ints = {1, 2, 3, 4, 5})
    void testIsPositive(int number) {
        assertTrue(calc.isPositive(number));
    }

    @Test
    void testMultipleAssertions() {
        assertAll(
            () -> assertEquals(4, calc.add(2, 2)),
            () -> assertEquals(0, calc.add(-1, 1)),
            () -> assertEquals(-2, calc.add(-1, -1))
        );
    }
}</code></pre>
<ul>
  <li><code>@Test</code> — marks a test method</li>
  <li><code>@BeforeEach</code> / <code>@AfterEach</code> — setup/teardown per test</li>
  <li><code>@BeforeAll</code> / <code>@AfterAll</code> — setup/teardown per class (static)</li>
  <li><code>@Disabled</code> — skip a test</li>
</ul>
<div class="callout">
  <strong>💡 Tip:</strong> Name your tests descriptively using <code>@DisplayName</code>. A good test name reads like a specification: "should return empty list when no results found".
</div>`
        },
        {
          id: 'mockito',
          title: 'Mockito Basics',
          content: `
<p>Mockito lets you create mock objects to isolate the class under test from its dependencies. This is essential for unit testing services that depend on repositories, external APIs, or other services.</p>
<pre><code class="language-java">import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    UserRepository repository;

    @InjectMocks
    UserService service;

    @Test
    void shouldFindUserById() {
        // Arrange
        var user = new User(1L, "Alice");
        when(repository.findById(1L)).thenReturn(Optional.of(user));

        // Act
        var result = service.findById(1L);

        // Assert
        assertEquals("Alice", result.getName());
        verify(repository).findById(1L);       // verify interaction
        verifyNoMoreInteractions(repository);   // no unexpected calls
    }

    @Test
    void shouldThrowWhenUserNotFound() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class,
            () -> service.findById(99L));
    }
}</code></pre>
<div class="callout">
  <strong>💡 Tip:</strong> Follow the <strong>Arrange-Act-Assert</strong> pattern in every test. Mock only the direct dependencies of the class under test — don't mock types you don't own (like <code>List</code> or <code>String</code>).
</div>`
        },
        {
          id: 'testing-best-practices',
          title: 'Testing Best Practices',
          content: `
<p>Writing effective tests is as important as writing production code. Good tests are fast, isolated, repeatable, and self-validating.</p>
<pre><code class="language-java">// Test naming convention: should_ExpectedBehavior_When_Condition
@Test
void should_ReturnEmpty_When_NoMatchingUsers() {
    when(repository.findByLastName("Unknown"))
        .thenReturn(Collections.emptyList());

    var result = service.findByLastName("Unknown");

    assertTrue(result.isEmpty());
}

// Use AssertJ for fluent assertions (better error messages)
import static org.assertj.core.api.Assertions.*;

@Test
void shouldReturnSortedUsers() {
    var users = service.findAll();

    assertThat(users)
        .hasSize(3)
        .extracting(User::getName)
        .containsExactly("Alice", "Bob", "Charlie");
}</code></pre>
<p>Key testing principles:</p>
<ul>
  <li><strong>One assertion per concept</strong> — each test should verify one behavior.</li>
  <li><strong>Test behavior, not implementation</strong> — tests should survive refactoring.</li>
  <li><strong>Use the test pyramid</strong> — many unit tests, fewer integration tests, even fewer E2E tests.</li>
  <li><strong>Keep tests fast</strong> — a slow test suite discourages running tests often.</li>
</ul>
<div class="callout">
  <strong>💡 Tip:</strong> Use <code>@SpringBootTest</code> for integration tests that need the full application context, and plain JUnit + Mockito for unit tests. Integration tests are slower but verify that components work together correctly.
</div>`
        }
      ]
    }
  ];

  private sidebarCategories: SidebarCategory[] = [
    {
      name: 'Fundamentals',
      icon: '📦',
      expanded: true,
      topics: [
        { slug: 'getting-started', title: 'Getting Started' },
        { slug: 'data-types-and-variables', title: 'Data Types & Variables' },
        { slug: 'control-flow', title: 'Control Flow' }
      ]
    },
    {
      name: 'Object-Oriented Programming',
      icon: '🧱',
      expanded: false,
      topics: [
        { slug: 'classes-and-objects', title: 'Classes & Objects' },
        { slug: 'inheritance-and-polymorphism', title: 'Inheritance & Polymorphism' },
        { slug: 'encapsulation-and-abstraction', title: 'Encapsulation & Abstraction' }
      ]
    },
    {
      name: 'Core Java',
      icon: '⚙️',
      expanded: false,
      topics: [
        { slug: 'collections-framework', title: 'Collections Framework' },
        { slug: 'exception-handling', title: 'Exception Handling' },
        { slug: 'generics', title: 'Generics' }
      ]
    },
    {
      name: 'Advanced Java',
      icon: '🚀',
      expanded: false,
      topics: [
        { slug: 'concurrency-and-multithreading', title: 'Concurrency & Multithreading' },
        { slug: 'jvm-internals', title: 'JVM Internals' },
        { slug: 'streams-and-lambdas', title: 'Streams & Lambdas' }
      ]
    },
    {
      name: 'Frameworks & Tools',
      icon: '🛠️',
      expanded: false,
      topics: [
        { slug: 'spring-boot-basics', title: 'Spring Boot Basics' },
        { slug: 'build-tools', title: 'Build Tools' },
        { slug: 'testing', title: 'Testing' }
      ]
    }
  ];

  getCategories(): SidebarCategory[] {
    return this.sidebarCategories;
  }

  getTopicBySlug(slug: string): Topic | undefined {
    return this.topics.find(t => t.slug === slug);
  }

  getCategoryForSlug(slug: string): SidebarCategory | undefined {
    return this.sidebarCategories.find(cat =>
      cat.topics.some(t => t.slug === slug)
    );
  }

  getCategoryRoutePrefix(categoryName: string): string {
    return categoryName.toLowerCase().replace(/ & /g, '-and-').replace(/ /g, '-');
  }
}
