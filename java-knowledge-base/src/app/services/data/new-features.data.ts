import { Topic } from '../../models/knowledge.model';

export const NEW_FEATURES_TOPICS: Topic[] = [
  {
    id: 'java8-features',
    title: 'Java 8 Features',
    description: 'Lambda expressions, Stream API, Optional, Date/Time API, default methods — the biggest Java release ever.',
    categoryId: 'new-features',
    icon: '8️⃣',
    difficulty: 'Beginner',
    tags: ['Java 8', 'Lambda', 'Stream', 'Optional', 'Date API'],
    content: [
      {
        heading: 'Lambda Expressions',
        body: 'Anonymous functions targeting functional interfaces (single abstract method). Syntax: `(params) -> expression` or `(params) -> { statements }`. Enable passing behavior as data. Method references: `ClassName::method` — shorthand for lambdas delegating to existing methods. Four kinds: static (Math::abs), instance of particular object (str::length), instance of arbitrary object (String::length), constructor (ArrayList::new).'
      },
      {
        heading: 'Stream API',
        body: 'Declarative data processing pipelines. Source → intermediate ops (lazy) → terminal op (triggers execution). Key operations: filter, map, flatMap, sorted, distinct, limit, skip (intermediate); collect, forEach, reduce, count, findFirst, anyMatch (terminal). Parallel streams: `list.parallelStream()` — uses ForkJoinPool, good for CPU-bound on large datasets, bad for IO or small datasets.'
      },
      {
        heading: 'Optional',
        body: 'Container for potentially absent values — replaces null returns. Create: `Optional.of(val)`, `Optional.ofNullable(val)`, `Optional.empty()`. Transform: map(), flatMap(), filter(). Extract: orElse(), orElseGet(), orElseThrow(). Use for return types only — never for fields, parameters, or collections.'
      },
      {
        heading: 'Date/Time API (java.time)',
        body: 'Replaces the terrible Date/Calendar API. Immutable, thread-safe. LocalDate (date only), LocalTime (time only), LocalDateTime (date+time, no timezone), ZonedDateTime (date+time+timezone), Instant (machine timestamp, UTC). Duration (time-based), Period (date-based). DateTimeFormatter for formatting/parsing. Always use java.time for new code.'
      },
      {
        heading: 'Default Methods & Functional Interfaces',
        body: 'Interfaces can have default methods (with implementation) and static methods. Enables interface evolution without breaking implementors. java.util.function: Function<T,R>, Predicate<T>, Consumer<T>, Supplier<T>, BiFunction, UnaryOperator, BinaryOperator. @FunctionalInterface annotation for compile-time validation.'
      },
      {
        heading: 'Most Common Stream Pitfalls',
        body: '1) Reusing a stream — streams can only be consumed once; calling a terminal operation closes the stream. Creating a second pipeline on the same stream throws IllegalStateException. 2) Side effects in lambdas — operations like forEach with shared mutable state (e.g., adding to an external list) break parallelism and can cause race conditions; use collect() instead. 3) Infinite streams without limit — Stream.generate() or Stream.iterate() without limit() or takeWhile() will run forever. 4) Parallel stream misuse — parallelStream() adds overhead from ForkJoinPool task splitting; for small datasets (<10K elements) or I/O-bound work, sequential is faster. Also, parallel streams share the common ForkJoinPool, so a slow task blocks other parallel streams. 5) Optional.get() without check — throws NoSuchElementException if empty; always use orElse(), orElseGet(), or orElseThrow(). 6) Modifying the source during iteration — adding/removing elements from the source collection while a stream is processing it causes ConcurrentModificationException.'
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
    tags: ['Java 9', 'Java 11', 'Java 17', 'Records', 'Modules', 'var'],
    content: [
      {
        heading: 'Java 9: Module System & Collection Factories',
        body: 'JPMS (Project Jigsaw): module-info.java defines module boundaries (requires, exports). Collection factories: `List.of()`, `Set.of()`, `Map.of()` — immutable collections. Optional improvements: ifPresentOrElse(), or(), stream(). Stream: takeWhile(), dropWhile(), ofNullable(). Process API for managing OS processes. JShell REPL for interactive Java.'
      },
      {
        heading: 'Java 10-11: var and HTTP Client',
        body: 'Java 10: `var` for local variable type inference — compiler infers the type. Use for complex generic types: `var map = new HashMap<String, List<Integer>>()`. Don\'t use when the type isn\'t obvious from context. Java 11 (LTS): new HTTP Client API (java.net.http) — supports HTTP/2, async, WebSocket. String methods: isBlank(), strip(), lines(), repeat(). Files.readString/writeString.'
      },
      {
        heading: 'Java 14-16: Records and Pattern Matching',
        body: 'Records (Java 16): immutable data carriers — `record Point(int x, int y) {}`. Auto-generates: constructor, accessors (x(), y()), equals(), hashCode(), toString(). Can have compact constructors for validation, static fields/methods, implement interfaces. Pattern matching for instanceof (Java 16): `if (obj instanceof String s)` — eliminates cast-after-check.'
      },
      {
        heading: 'Java 17 (LTS): Sealed Classes and More',
        body: 'Sealed classes: `sealed class Shape permits Circle, Rectangle` — restricts subclasses. Enables exhaustive pattern matching. Switch expressions (Java 14): `var result = switch(x) { case 1 -> "one"; default -> "other"; };` — expression form, arrow syntax, no fall-through. Text blocks (Java 15): multi-line strings with `"""`. Enhanced pseudo-random number generators.'
      },
      {
        heading: 'Migration Tips',
        body: 'Upgrading from Java 8 to 11+: 1) Module system impact — internal APIs like sun.misc.Unsafe are encapsulated; use --add-opens/--add-exports as a bridge or migrate to public APIs. 2) Removed packages — javax.xml.bind (JAXB), javax.activation, CORBA, and javax.annotation are removed; add them as Maven/Gradle dependencies. 3) JavaFX is decoupled — download separately from openjfx.io. 4) String.intern() behavior changed — prefer explicit caching. 5) GC defaults changed — G1 is default since Java 9 (was Parallel GC). 6) var keyword — adopt gradually; use where it improves readability, not everywhere. 7) Test early — run your test suite on the target JDK before upgrading production. Use jdeprscan to find deprecated APIs and jdeps to analyze module dependencies. 8) Build tool compatibility — ensure Maven/Gradle plugins support the target Java version. 9) Libraries — check compatibility of Spring, Hibernate, Jackson, etc. with your target JDK. Most libraries have supported Java 17 since 2022.'
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
    tags: ['Java 21', 'Virtual Threads', 'Pattern Matching', 'Sequenced Collections'],
    content: [
      {
        heading: 'Java 21 (LTS) Highlights',
        body: 'Virtual Threads (finalized): lightweight threads for scalable concurrent applications. Pattern Matching for switch (finalized): type patterns, guarded patterns, record patterns, null matching. Record Patterns (finalized): deconstruct records in pattern matching. Sequenced Collections: new interfaces (SequencedCollection, SequencedSet, SequencedMap) with getFirst(), getLast(), reversed() methods. String Templates (preview): `STR."Hello \\{name}"`.'
      },
      {
        heading: 'Sequenced Collections',
        body: 'New interfaces for collections with defined encounter order. SequencedCollection: getFirst(), getLast(), addFirst(), addLast(), reversed(). SequencedSet extends SequencedCollection. SequencedMap: firstEntry(), lastEntry(), pollFirstEntry(), pollLastEntry(), sequencedKeySet(), reversed(). List, LinkedHashSet, TreeSet, LinkedHashMap, TreeMap all implement these. Finally, a standard way to get the first/last element!'
      },
      {
        heading: 'Java 22-24 (Preview/Incubating)',
        body: 'Structured Concurrency (preview): StructuredTaskScope treats concurrent tasks as a unit, ensuring no thread leaks. Scoped Values (preview): efficient ThreadLocal replacement for virtual threads. Unnamed Variables and Patterns: `_` for unused variables. Statements Before super(): constructors can validate before calling super. Stream Gatherers: custom intermediate stream operations. Foreign Function & Memory API (finalized): safe replacement for JNI and Unsafe.'
      },
      {
        heading: 'Migration Considerations',
        body: 'Java 8 → 11: module system may break deep reflection, javax → jakarta namespace for some libraries. Java 11 → 17: security manager deprecated, sealed classes may conflict with mocking frameworks, Nashorn removed. Java 17 → 21: virtual threads require ReentrantLock instead of synchronized for best performance, CDS (Class Data Sharing) for faster startup. Always test with the target version before upgrading.'
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
