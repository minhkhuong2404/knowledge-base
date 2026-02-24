import { Topic } from '../../models/knowledge.model';

export const NEW_FEATURES_TOPICS: Topic[] = [
  {
    id: 'java8-features',
    title: 'Java 8 Features',
    description: 'Lambda expressions, Stream API, Optional, Date/Time API, default methods — the biggest Java release ever.',
    categoryId: 'new-features',
    icon: '8️⃣',
    difficulty: 'Beginner',
    tags: ['Java 8', 'Lambda', 'Stream', 'Optional', 'Date API', 'Functional Interface', 'Method Reference', 'Collectors', 'Parallel Stream', 'Default Methods'],
    content: [
      {
        heading: 'Lambda Expressions',
        body: 'Anonymous functions targeting **functional interfaces** *(single abstract method)*. Syntax: `(params) -> expression` or `(params) -> { statements }`. Enable passing behavior as data.\n\n**Method references**: `ClassName::method` — shorthand for lambdas delegating to existing methods. Four kinds: static (`Math::abs`), instance of particular object (`str::length`), instance of arbitrary object (`String::length`), constructor (`ArrayList::new`).'
      },
      {
        heading: 'Stream API',
        body: 'Declarative data processing pipelines. Source → intermediate ops *(lazy)* → terminal op *(triggers execution)*.\n\nKey operations: `filter`, `map`, `flatMap`, `sorted`, `distinct`, `limit`, `skip` *(intermediate)*; `collect`, `forEach`, `reduce`, `count`, `findFirst`, `anyMatch` *(terminal)*.\n\n**Parallel streams**: `list.parallelStream()` — uses `ForkJoinPool`, *good for CPU-bound on large datasets, bad for IO or small datasets*.'
      },
      {
        heading: 'Optional',
        body: 'Container for potentially absent values — replaces null returns.\n\nCreate: `Optional.of(val)`, `Optional.ofNullable(val)`, `Optional.empty()`. Transform: `map()`, `flatMap()`, `filter()`. Extract: `orElse()`, `orElseGet()`, `orElseThrow()`.\n\n*Use for return types only — never for fields, parameters, or collections.*'
      },
      {
        heading: 'Date/Time API (java.time)',
        body: 'Replaces the terrible `Date`/`Calendar` API. **Immutable, thread-safe.**\n\n`LocalDate` *(date only)*, `LocalTime` *(time only)*, `LocalDateTime` *(date+time, no timezone)*, `ZonedDateTime` *(date+time+timezone)*, `Instant` *(machine timestamp, UTC)*.\n\n`Duration` *(time-based)*, `Period` *(date-based)*. `DateTimeFormatter` for formatting/parsing. *Always use `java.time` for new code.*'
      },
      {
        heading: 'Default Methods & Functional Interfaces',
        body: 'Interfaces can have **default methods** *(with implementation)* and **static methods**. Enables interface evolution without breaking implementors.\n\n`java.util.function`: `Function<T,R>`, `Predicate<T>`, `Consumer<T>`, `Supplier<T>`, `BiFunction`, `UnaryOperator`, `BinaryOperator`. `@FunctionalInterface` annotation for compile-time validation.'
      },
      {
        heading: 'filter() vs map() in Streams',
        body: '`filter()` eliminates elements from the collection where the condition is not satisfied — it returns a stream with fewer (or equal) elements but of the same type.\n\n`map()` transforms each element by applying a function — it returns a stream with the same number of elements but potentially a different type.\n\nExample: `filter(e -> e.getSalary() > 50000)` removes low earners. `map(Employee::getName)` transforms `Employee` objects into `String` names. They compose naturally: `stream().filter(predicate).map(transform).collect(toList())`.'
      },
      {
        heading: 'Intermediate vs Terminal Operations',
        body: '**Intermediate operations** (`filter`, `map`, `sorted`, `distinct`, `limit`, `skip`, `flatMap`, `peek`) return another `Stream` and are **lazy** — they are NOT executed until a terminal operation is called.\n\n**Terminal operations** (`forEach`, `collect`, `reduce`, `count`, `findFirst`, `anyMatch`, `allMatch`, `min`, `max`, `toArray`) trigger the actual processing of the entire pipeline and produce a result or side-effect.\n\nThis lazy evaluation means intermediate operations can be optimized — *for example, `limit(5)` after a filter may avoid processing the entire collection*.'
      },
      {
        heading: 'Streams vs Traditional For Loops',
        body: 'Traditional for loops are generally faster due to less overhead *(no lambda wrapping, no object creation for stream pipeline)*.\n\nHowever, **Streams** provide: better readability for complex data transformations, built-in parallelism (`parallelStream()`), declarative style over imperative.\n\nUse traditional loops for simple iterations over small datasets where maximum performance matters. Use Streams for complex data transformations, when readability and maintainability are priorities, or when working with large datasets where parallel processing provides benefit.'
      },
      {
        heading: 'Lambda vs Anonymous Classes',
        body: '**Lambda expressions** and **anonymous inner classes** both provide inline implementations, but differ significantly.\n\nLambdas are more concise *(single expression)*, target only **functional interfaces** *(one abstract method)*, do not create a new scope for `this` *(it refers to the enclosing class)*, and cannot shadow variables from the enclosing scope.\n\nAnonymous classes are more verbose, can implement interfaces with multiple methods or extend concrete classes, have their own `this` reference, and can shadow enclosing variables. *Lambdas generally produce cleaner, more readable code.*\n\nKey difference: `this` inside a lambda refers to the enclosing instance, while `this` inside an anonymous class refers to the anonymous class itself. Similarly, `super` in a lambda refers to the enclosing class\'s superclass.'
      },
      {
        heading: 'Variable Capture & Effectively Final',
        body: 'Lambda expressions can access variables from their enclosing scope, but only if those variables are **final** or **effectively final** *(not modified after initialization)*. This restriction ensures state consistency and thread safety — *lambdas may execute on different threads or at a later time*.\n\nAttempting to modify a local variable inside a lambda causes a compile error. This concept is called **"variable capture."**\n\nWorkarounds for mutable state: use `AtomicInteger`/`AtomicReference`, wrap in a single-element array, or use a mutable container object.\n\n*Note: you CAN read and modify instance or static fields from within a lambda (they are not captured in the same way), but this can introduce thread-safety issues.*'
      },
      {
        heading: 'findFirst() vs findAny()',
        body: 'Both are terminal operations returning an `Optional`.\n\n`findFirst()` returns the first element according to encounter order — *deterministic and useful in sequential streams*.\n\n`findAny()` can return any element and is optimized for parallel streams where encounter order does not matter, *potentially returning results faster by avoiding synchronization*.\n\nIn sequential streams, `findAny()` typically behaves like `findFirst()`. Rule: use `findFirst()` when order matters, `findAny()` when you just need any matching element and performance in parallel streams is a priority.'
      },
      {
        heading: 'Infinite Streams',
        body: 'Java 8 supports **infinite streams** via `Stream.iterate(seed, function)` and `Stream.generate(supplier)`.\n\n`Stream.iterate(0, n -> n + 1)` generates 0, 1, 2, 3... infinitely by repeatedly applying the function to the previous result. `Stream.generate(Math::random)` produces a stream of random numbers where each element is independent.\n\nBoth require a limiting operation (`limit()`, `takeWhile()` in Java 9+) to prevent infinite processing. Use `iterate()` for sequences with dependency on the previous value; use `generate()` for independent values.'
      },
      {
        heading: 'count(), sum(), and reduce()',
        body: '`count()` returns the number of elements in a stream as a `long`.\n\n`sum()` is available on specialized streams (`IntStream`, `LongStream`, `DoubleStream`) and returns the total of all elements.\n\n`reduce()` is the most general operation — it combines all stream elements using a binary operator into a single result. `reduce()` can implement both count and sum: `stream.reduce(0, Integer::sum)`. `reduce()` with an identity value is safe for empty streams; without identity, it returns `Optional`.\n\nUse `count()` for tallying, `sum()` for totals on numeric streams, and `reduce()` for custom accumulations *(max, min, string concatenation, etc.)*.'
      },
      {
        heading: 'limit() vs skip()',
        body: '`limit(n)` truncates the stream to at most n elements — *useful for pagination or taking the top-N results*.\n\n`skip(n)` discards the first n elements. Together they enable pagination: `stream.skip(page * size).limit(size)`.\n\nBoth are **short-circuiting** intermediate operations for limit, and **stateful** for skip. *On ordered parallel streams, `skip()` can be expensive because it must maintain encounter order.*'
      },
      {
        heading: 'Most Common Stream Pitfalls',
        body: '1) Reusing a stream — streams can only be consumed once; calling a terminal operation closes the stream. Creating a second pipeline on the same stream throws `IllegalStateException`.\n\n2) Side effects in lambdas — operations like `forEach` with shared mutable state *(e.g., adding to an external list)* break parallelism and can cause race conditions; use `collect()` instead.\n\n3) Infinite streams without limit — `Stream.generate()` or `Stream.iterate()` without `limit()` or `takeWhile()` will run forever.\n\n4) Parallel stream misuse — `parallelStream()` adds overhead from `ForkJoinPool` task splitting; for small datasets (<10K elements) or I/O-bound work, sequential is faster. *Also, parallel streams share the common `ForkJoinPool`, so a slow task blocks other parallel streams.*\n\n5) `Optional.get()` without check — throws `NoSuchElementException` if empty; always use `orElse()`, `orElseGet()`, or `orElseThrow()`.\n\n6) Modifying the source during iteration — adding/removing elements from the source collection while a stream is processing it causes `ConcurrentModificationException`.'
      }
    ],
    codeExamples: [
      {
        title: 'Java 8 Features',
        language: 'java',
        code: `// Stream pipeline
Map<String, List<Employee>> byDept = employees.stream()
    .filter(e -> e.getSalary() > 50000)
    .sorted(Comparator.comparing(Employee::getName))
    .collect(Collectors.groupingBy(Employee::getDepartment));

// Optional chaining
String city = findUser(id)
    .flatMap(User::getAddress)
    .map(Address::getCity)
    .orElse("Unknown");

// Date/Time API
LocalDate today = LocalDate.now();
LocalDate birthday = LocalDate.of(1990, Month.MARCH, 15);
Period age = Period.between(birthday, today);
ZonedDateTime meeting = ZonedDateTime.of(
    LocalDateTime.of(2024, 3, 15, 14, 30),
    ZoneId.of("America/New_York"));

// Functional composition
Function<String, String> pipeline =
    ((Function<String, String>) String::trim)
    .andThen(String::toLowerCase)
    .andThen(s -> s.replaceAll("\\\\s+", "-"));
pipeline.apply("  Hello World  "); // "hello-world"`
      },
      {
        title: 'Advanced Collectors',
        language: 'java',
        code: `// Collectors.toMap — build a map from a stream
Map<Long, Employee> employeeById = employees.stream()
    .collect(Collectors.toMap(
        Employee::getId,    // key mapper
        Function.identity() // value mapper (the employee itself)
    ));

// toMap with merge function (handle duplicate keys)
Map<String, Long> salaryByDept = employees.stream()
    .collect(Collectors.toMap(
        Employee::getDepartment,
        Employee::getSalary,
        Long::sum  // merge: sum salaries for same department
    ));

// partitioningBy — split into two groups (true/false)
Map<Boolean, List<Employee>> partitioned = employees.stream()
    .collect(Collectors.partitioningBy(e -> e.getSalary() > 75000));
List<Employee> highEarners = partitioned.get(true);
List<Employee> others = partitioned.get(false);

// Custom Collector — collect to an ImmutableList (Guava)
Collector<Employee, ?, ImmutableList<Employee>> toImmutableList =
    Collector.of(
        ImmutableList::builder,              // supplier
        ImmutableList.Builder::add,          // accumulator
        (b1, b2) -> b1.addAll(b2.build()),   // combiner (parallel)
        ImmutableList.Builder::build         // finisher
    );
ImmutableList<Employee> result = employees.stream()
    .filter(e -> e.isActive())
    .collect(toImmutableList);

// Combining collectors — average salary per department
Map<String, Double> avgSalary = employees.stream()
    .collect(Collectors.groupingBy(
        Employee::getDepartment,
        Collectors.averagingDouble(Employee::getSalary)
    ));`
      }
    ]
  },
  {
    id: 'java9-17-features',
    title: 'Java 9-17 Features',
    description: 'Module system, var, HTTP Client, records, sealed classes, text blocks, switch expressions, and more.',
    categoryId: 'new-features',
    icon: '🔢',
    difficulty: 'Intermediate',
    tags: ['Java 9', 'Java 11', 'Java 17', 'Records', 'Modules', 'var', 'Text Blocks', 'Sealed Classes', 'HTTP Client', 'Local Variable Type Inference'],
    content: [
      {
        heading: 'Java 9: Module System & Collection Factories',
        body: '**JPMS** (Project Jigsaw): `module-info.java` defines module boundaries (`requires`, `exports`). Collection factories: `List.of()`, `Set.of()`, `Map.of()` — **immutable collections**.\n\n`Optional` improvements: `ifPresentOrElse()`, `or()`, `stream()`. `Stream`: `takeWhile()`, `dropWhile()`, `ofNullable()`.\n\n**Process API** for managing OS processes. **JShell** REPL for interactive Java.'
      },
      {
        heading: 'Java 10-11: var and HTTP Client',
        body: '**Java 10**: `var` for local variable type inference — compiler infers the type. Use for complex generic types: `var map = new HashMap<String, List<Integer>>()`. *Don\'t use when the type isn\'t obvious from context.*\n\n**Java 11** (LTS): new **HTTP Client API** (`java.net.http`) — supports HTTP/2, async, WebSocket. **Epsilon Garbage Collector** *(experimental, no-op GC for benchmarks)*. **Z Garbage Collector** *(experimental, ultra-low latency)*.\n\nLocal-variable syntax for lambda parameters: `(var x, var y) -> x + y`. String methods: `isBlank()`, `strip()`, `stripLeading()`, `stripTrailing()`, `repeat()`, `lines()`. `Files.readString`/`writeString`. *The `strip()` methods are Unicode-aware (unlike `trim()` which only handles ASCII whitespace).*'
      },
      {
        heading: 'Java 14-16: Records and Pattern Matching',
        body: '**Records** (Java 16): immutable data carriers — `record Point(int x, int y) {}`. Auto-generates: constructor, accessors (`x()`, `y()`), `equals()`, `hashCode()`, `toString()`. Can have compact constructors for validation, static fields/methods, implement interfaces.\n\n**Pattern matching for instanceof** (Java 16): `if (obj instanceof String s)` — eliminates cast-after-check.'
      },
      {
        heading: 'Java 17 (LTS): Sealed Classes and More',
        body: '**Sealed classes**: `sealed class Shape permits Circle, Rectangle` — restricts subclasses. Enables exhaustive pattern matching.\n\n**Switch expressions** (Java 14): `var result = switch(x) { case 1 -> "one"; default -> "other"; };` — expression form, arrow syntax, no fall-through.\n\n**Text blocks** (Java 15): multi-line strings with `"""`. Enhanced pseudo-random number generators.'
      },
      {
        heading: 'Migration Tips',
        body: 'Upgrading from Java 8 to 11+:\n\n1) Module system impact — internal APIs like `sun.misc.Unsafe` are encapsulated; use `--add-opens`/`--add-exports` as a bridge or migrate to public APIs.\n\n2) Removed packages — `javax.xml.bind` (JAXB), `javax.activation`, CORBA, and `javax.annotation` are removed; add them as Maven/Gradle dependencies.\n\n3) JavaFX is decoupled — download separately from openjfx.io.\n\n4) `String.intern()` behavior changed — prefer explicit caching.\n\n5) GC defaults changed — **G1** is default since Java 9 *(was Parallel GC)*.\n\n6) `var` keyword — adopt gradually; *use where it improves readability, not everywhere*.\n\n7) Test early — run your test suite on the target JDK before upgrading production. Use `jdeprscan` to find deprecated APIs and `jdeps` to analyze module dependencies.\n\n8) Build tool compatibility — ensure Maven/Gradle plugins support the target Java version.\n\n9) Libraries — check compatibility of Spring, Hibernate, Jackson, etc. with your target JDK. *Most libraries have supported Java 17 since 2022.*'
      }
    ],
    codeExamples: [
      {
        title: 'Java 9-17 Features',
        language: 'java',
        code: `// var — local variable type inference (Java 10)
var list = List.of("hello", "world");  // inferred as List<String>
var map = new HashMap<String, List<Integer>>(); // reduces verbosity

// HTTP Client (Java 11)
HttpClient client = HttpClient.newBuilder()
    .connectTimeout(Duration.ofSeconds(5))
    .build();
HttpResponse<String> response = client.send(
    HttpRequest.newBuilder(URI.create("https://api.example.com/users"))
        .header("Accept", "application/json")
        .GET().build(),
    HttpResponse.BodyHandlers.ofString());

// Records (Java 16)
record User(String name, String email, LocalDate joined) {
    User { // compact constructor — validation
        Objects.requireNonNull(name);
        Objects.requireNonNull(email);
        if (!email.contains("@")) throw new IllegalArgumentException("Invalid email");
    }
}

// Text blocks (Java 15)
String json = """
    {
        "name": "Alice",
        "age": 30,
        "roles": ["admin", "user"]
    }
    """;

// Switch expression (Java 14)
String quarter = switch (month) {
    case 1, 2, 3 -> "Q1";
    case 4, 5, 6 -> "Q2";
    case 7, 8, 9 -> "Q3";
    case 10, 11, 12 -> "Q4";
    default -> throw new IllegalArgumentException();
};`
      },
      {
        title: 'Java Module System (JPMS)',
        language: 'java',
        code: `// module-info.java — placed at the root of your source tree
// Defines what your module exports and what it depends on

// === Module: com.myapp.core ===
// src/com.myapp.core/module-info.java
module com.myapp.core {
    exports com.myapp.core.api;          // public API — other modules can access
    exports com.myapp.core.model;        // model classes
    // com.myapp.core.internal is NOT exported — truly encapsulated
}

// === Module: com.myapp.service ===
// src/com.myapp.service/module-info.java
module com.myapp.service {
    requires com.myapp.core;              // depends on core module
    requires java.sql;                    // depends on JDK SQL module
    requires transitive com.myapp.core;   // transitive: our consumers also get core
    exports com.myapp.service.api;
    provides com.myapp.core.api.Plugin    // SPI: this module provides an implementation
        with com.myapp.service.MyPlugin;
}

// === Module: com.myapp.app ===
module com.myapp.app {
    requires com.myapp.service;
    uses com.myapp.core.api.Plugin;       // SPI: this module consumes plugins
}

// Compile with modules:
// javac -d out --module-source-path src \$(find src -name "*.java")
// Run:
// java --module-path out -m com.myapp.app/com.myapp.app.Main

// Migration tip: start with automatic modules
// Put a non-modular JAR on --module-path → it becomes an automatic module
// Its module name is derived from the JAR filename or Automatic-Module-Name manifest`
      }
    ]
  },
  {
    id: 'java21-features',
    title: 'Java 18-21+ Features',
    description: 'Virtual threads, pattern matching for switch, record patterns, sequenced collections, and structured concurrency.',
    categoryId: 'new-features',
    icon: '🚀',
    difficulty: 'Advanced',
    tags: ['Java 21', 'Virtual Threads', 'Pattern Matching', 'Sequenced Collections', 'Record Patterns', 'String Templates', 'Scoped Values', 'Structured Concurrency'],
    content: [
      {
        heading: 'Java 21 (LTS) Highlights',
        body: '**Virtual Threads** *(finalized)*: lightweight threads for scalable concurrent applications.\n\n**Pattern Matching for switch** *(finalized)*: type patterns, guarded patterns, record patterns, null matching.\n\n**Record Patterns** *(finalized)*: deconstruct records in pattern matching.\n\n**Sequenced Collections**: new interfaces (`SequencedCollection`, `SequencedSet`, `SequencedMap`) with `getFirst()`, `getLast()`, `reversed()` methods.\n\n**String Templates** *(preview)*: `STR."Hello \\{name}"`.'
      },
      {
        heading: 'Sequenced Collections',
        body: 'New interfaces for collections with defined encounter order.\n\n`SequencedCollection`: `getFirst()`, `getLast()`, `addFirst()`, `addLast()`, `reversed()`. `SequencedSet` extends `SequencedCollection`.\n\n`SequencedMap`: `firstEntry()`, `lastEntry()`, `pollFirstEntry()`, `pollLastEntry()`, `sequencedKeySet()`, `reversed()`.\n\n`List`, `LinkedHashSet`, `TreeSet`, `LinkedHashMap`, `TreeMap` all implement these. *Finally, a standard way to get the first/last element!*'
      },
      {
        heading: 'Java 22-24 (Preview/Incubating)',
        body: '**Structured Concurrency** *(preview)*: `StructuredTaskScope` treats concurrent tasks as a unit, ensuring no thread leaks.\n\n**Scoped Values** *(preview)*: efficient `ThreadLocal` replacement for virtual threads.\n\n**Unnamed Variables and Patterns**: `_` for unused variables.\n\n**Statements Before super()**: constructors can validate before calling `super`.\n\n**Stream Gatherers**: custom intermediate stream operations.\n\n**Foreign Function & Memory API** *(finalized)*: safe replacement for JNI and `Unsafe`.'
      },
      {
        heading: 'Migration Considerations',
        body: '**Java 8 → 11**: module system may break deep reflection, `javax` → `jakarta` namespace for some libraries.\n\n**Java 11 → 17**: security manager deprecated, sealed classes may conflict with mocking frameworks, Nashorn removed.\n\n**Java 17 → 21**: virtual threads require `ReentrantLock` instead of `synchronized` for best performance, **CDS** (Class Data Sharing) for faster startup.\n\n*Always test with the target version before upgrading.*'
      }
    ],
    codeExamples: [
      {
        title: 'Java 21+ Features',
        language: 'java',
        code: `// Virtual Threads (Java 21)
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 100_000).forEach(i ->
        executor.submit(() -> fetchAndProcess(i)));
}

// Pattern Matching for switch with Record Patterns (Java 21)
sealed interface Shape permits Circle, Rectangle {}
record Circle(double radius) implements Shape {}
record Rectangle(double w, double h) implements Shape {}

double area = switch (shape) {
    case Circle(var r) -> Math.PI * r * r;
    case Rectangle(var w, var h) -> w * h;
};

// Sequenced Collections (Java 21)
SequencedCollection<String> list = new ArrayList<>(List.of("A", "B", "C"));
String first = list.getFirst(); // "A"
String last = list.getLast();   // "C"
list.addFirst("Z");
SequencedCollection<String> reversed = list.reversed(); // view

// Unnamed Variables (Java 22)
try {
    parseJson(input);
} catch (JsonException _) { // unused exception variable
    return defaultValue;
}
map.forEach((_, value) -> process(value)); // unused key

// String Templates (preview)
// var greeting = STR."Hello \\{name}, you have \\{count} messages";
// var query = STR."SELECT * FROM users WHERE id = \\{userId}";`
      }
    ]
  }
];
