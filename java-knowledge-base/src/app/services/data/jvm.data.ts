import { Topic } from '../../models/knowledge.model';

export const JVM_TOPICS: Topic[] = [
    {
      id: 'jvm-intro',
      title: 'JVM Architecture Overview',
      description: 'Class loading, runtime data areas, execution engine, JIT compilation, and how Java bytecode runs.',
      categoryId: 'jvm',
      icon: '🏛️',
      difficulty: 'Intermediate',
      tags: ['JVM', 'Architecture', 'Bytecode', 'JIT', 'Class Loading'],
      content: [
        {
          heading: 'JVM Components',
          body: 'The JVM has three main subsystems: 1) Class Loading Subsystem — loads, links, and initializes classes. 2) Runtime Data Areas — memory regions for program execution (Heap, Stack, Metaspace, PC Register, Native Method Stack). 3) Execution Engine — interprets bytecode or JIT-compiles to native code. Plus: Native Interface (JNI) for calling C/C++ code.'
        },
        {
          heading: 'Java Code Execution Flow',
          body: '.java → javac → .class (bytecode) → ClassLoader → JVM execution. Bytecode is platform-independent instruction set for the JVM stack machine. Each .class file contains: magic number (0xCAFEBABE), version, constant pool, access flags, fields, methods (bytecode), and attributes. The JVM is a stack-based virtual machine (vs register-based like Dalvik/ART).'
        },
        {
          heading: 'JIT Compilation',
          body: 'The JVM starts by interpreting bytecode (slow but fast startup). Hot methods (frequently called) are compiled to native code by the JIT compiler (C1 for quick compilation, C2 for aggressive optimization). Tiered compilation (default since Java 8): Level 0 (interpreter) → Level 1-3 (C1 with profiling) → Level 4 (C2 optimized). JIT optimizations: inlining, loop unrolling, escape analysis, dead code elimination, lock coarsening.'
        },
        {
          heading: 'GraalVM and AOT',
          body: 'GraalVM: advanced JIT compiler written in Java (replaces C2), supports polyglot (JS, Python, Ruby). Native Image (AOT compilation): compiles Java ahead-of-time to standalone executables — instant startup, low memory, no JVM needed. Trade-offs: no dynamic class loading, reflection must be configured, no JIT optimizations at runtime. Ideal for serverless, CLI tools, and microservices (Spring Boot 3 supports native image).'
        },
        {
          heading: 'Real-World Analogy',
          body: 'Think of the JVM as a translator who reads instructions written in a universal language (bytecode) and executes them on the local machine. Your Java source code is like a document written in English. The compiler (javac) translates it into bytecode — a universal instruction manual any JVM can read. Each platform has its own JVM implementation (the local translator), so the same bytecode runs on Windows, Linux, or macOS without modification. The JIT compiler is like the translator learning shortcuts: after repeating the same paragraph many times, they memorize it and recite it at native speed instead of reading it word by word.'
        }
      ],
      codeExamples: [
        {
          title: 'JVM Inspection Commands',
          language: 'java',
          code: `// View bytecode of a class
// javap -c -v MyClass.class

// JIT compilation monitoring
// java -XX:+PrintCompilation -jar myapp.jar
// java -XX:+UnlockDiagnosticVMOptions -XX:+PrintInlining -jar myapp.jar

// Check JVM version and settings
System.out.println("JVM: " + System.getProperty("java.vm.name"));
System.out.println("Version: " + Runtime.version());
System.out.println("Processors: " + Runtime.getRuntime().availableProcessors());

// List all loaded classes
// java -verbose:class -jar myapp.jar

// JVM flags
// -XX:+TieredCompilation (default)
// -XX:CompileThreshold=10000 (invocations before C2 compile)
// -XX:+UseCompressedOops (default, saves memory for <32GB heaps)

// GraalVM native image
// native-image -jar myapp.jar
// ./myapp  (standalone binary, ~10ms startup)`
        },
        {
          title: 'Reading Bytecode with javap',
          language: 'java',
          code: `// Compile and disassemble a class
// javac HelloWorld.java
// javap -c HelloWorld.class
//
// Output shows JVM stack-machine instructions:
//   public static void main(java.lang.String[]);
//     Code:
//       0: getstatic     #7  // Field java/lang/System.out
//       3: ldc           #13 // String Hello, World!
//       5: invokevirtual #15 // Method PrintStream.println
//       8: return

// Verbose mode — constant pool, stack map frames, flags
// javap -c -v -p HelloWorld.class
//   -c  disassemble bytecode
//   -v  verbose (constant pool, line numbers, local vars)
//   -p  show private members

// Compare bytecodes of two implementations
public int addLoop(int[] arr) {
    int sum = 0;
    for (int n : arr) sum += n;
    return sum;
}

public int addStream(int[] arr) {
    return java.util.Arrays.stream(arr).sum();
}
// Run: javap -c MyClass.class
// The loop compiles to ~15 bytecode instructions
// The stream version generates many more (method handles, lambdas)
// This explains why streams have higher overhead for tiny arrays`
        }
      ]
    },
    {
      id: 'memory-area',
      title: 'JVM Memory Areas',
      description: 'Heap, Stack, Metaspace, Program Counter, Native Method Stack — how JVM organizes memory.',
      categoryId: 'jvm',
      icon: '🧠',
      difficulty: 'Intermediate',
      tags: ['Heap', 'Stack', 'Metaspace', 'Memory', 'PermGen'],
      content: [
        {
          heading: 'Heap (Shared)',
          body: 'The heap stores all object instances and arrays, shared across all threads. Divided into: Young Generation (Eden + Survivor S0/S1) and Old Generation (Tenured). New objects are allocated in Eden. After surviving GC cycles, they move to Survivor spaces and eventually to Old Gen (tenuring). Configured with -Xms (initial) and -Xmx (maximum). Java 8+: String pool is on the heap (moved from PermGen in Java 7).'
        },
        {
          heading: 'Stack (Per-Thread)',
          body: 'Each thread has its own stack containing frames for method invocations. Each frame stores: local variables (array), operand stack (for computation), frame data (constant pool reference, exception table). Stack follows LIFO — frame pushed on method call, popped on return. Configured with -Xss (default ~512KB-1MB). StackOverflowError: too deep recursion. Stack memory is automatically reclaimed when the thread ends.'
        },
        {
          heading: 'Metaspace (Native Memory)',
          body: 'Replaced PermGen in Java 8. Stores class metadata (class structure, method bytecode, constant pool, annotations), and static variables. Located in native memory (not heap) — grows dynamically by default. Configure with -XX:MaxMetaspaceSize to prevent unbounded growth. Metaspace OOM: too many loaded classes (common in app servers with frequent redeployments, or heavy reflection/bytecode generation).'
        },
        {
          heading: 'Program Counter & Native Method Stack',
          body: 'PC Register (per-thread): holds address of current bytecode instruction being executed. Undefined for native methods. Native Method Stack (per-thread): stack for native (JNI) method calls. HotSpot JVM merges it with the Java stack. Direct Memory: off-heap memory allocated via ByteBuffer.allocateDirect() or Unsafe — used by NIO for zero-copy I/O. Not managed by GC — manual deallocation needed.'
        },
        {
          heading: 'Common OOM Scenarios',
          body: 'OutOfMemoryError: Java heap space — objects fill the heap (increase -Xmx or fix memory leak). OutOfMemoryError: Metaspace — too many classes loaded (increase -XX:MaxMetaspaceSize or fix classloader leak). StackOverflowError — infinite/deep recursion (increase -Xss or fix recursion). OutOfMemoryError: Direct buffer memory — too much direct ByteBuffer allocation. OutOfMemoryError: unable to create native thread — OS thread limit reached.'
        },
        {
          heading: 'Memory Leaks in Java',
          body: 'Although Java has automatic garbage collection, memory leaks can still occur when objects are no longer needed but are still referenced, preventing GC from reclaiming them. Common causes: 1) Static collections that grow indefinitely — static fields live for the entire application lifetime. 2) Unclosed resources — connections, streams, or sessions that hold native memory. 3) Listeners/callbacks not deregistered — registered observers that are never removed. 4) ThreadLocal not cleaned in thread pools — values persist across task executions. 5) Classloader leaks in application servers — redeployed webapps retain references. Tools for identification: VisualVM, JProfiler, YourKit for profiling; Eclipse MAT (Memory Analyzer Tool) for analyzing heap dumps; jmap -histo for quick object histograms; JFR for ongoing monitoring.'
        },
        {
          heading: 'Static Keyword and Memory Impact',
          body: 'Static fields and methods are stored in Metaspace (class metadata area), not on the heap with instance data. Static elements are created when the class is loaded and remain in memory as long as the class stays loaded — typically for the entire application lifecycle. This means static collections can accumulate data indefinitely if not managed. Static elements are shared among all instances of the class. Memory optimization: avoid storing large amounts of data in static fields unless truly needed as application-wide state; use weak references (WeakHashMap) for caches that should not prevent garbage collection.'
        },
        {
          heading: 'Real-World Analogy',
          body: 'The Heap is like a shared warehouse where all objects are stored — any worker (thread) can access items in the warehouse, but you need to coordinate access. When the warehouse is full and cannot be cleaned up, you get OutOfMemoryError (heap space). The Stack is like each worker\'s personal desk — it holds the notes (local variables) and task list (method call chain) for their current job. When a worker stacks too many tasks (deep recursion), the desk overflows: StackOverflowError. Metaspace is a filing cabinet of blueprints (class definitions) — every time the JVM loads a class, it files a blueprint. If you keep loading new classes without removing old ones (classloader leak), the filing cabinet runs out of space: OutOfMemoryError (Metaspace). The Program Counter is a bookmark each worker uses to remember where they are in the instruction manual.'
        }
      ],
      codeExamples: [
        {
          title: 'Memory Diagnostics',
          language: 'java',
          code: `// Runtime memory info
Runtime rt = Runtime.getRuntime();
System.out.printf("Heap: used=%dMB, free=%dMB, total=%dMB, max=%dMB%n",
    (rt.totalMemory() - rt.freeMemory()) / 1024 / 1024,
    rt.freeMemory() / 1024 / 1024,
    rt.totalMemory() / 1024 / 1024,
    rt.maxMemory() / 1024 / 1024);

// MXBean — detailed memory breakdown
MemoryMXBean memoryBean = ManagementFactory.getMemoryMXBean();
MemoryUsage heap = memoryBean.getHeapMemoryUsage();
MemoryUsage nonHeap = memoryBean.getNonHeapMemoryUsage(); // Metaspace etc.

// Per-pool memory (Eden, Survivor, Old Gen, Metaspace)
ManagementFactory.getMemoryPoolMXBeans().forEach(pool ->
    System.out.printf("%s: %s%n", pool.getName(), pool.getUsage()));

// JVM flags for debugging OOM
// -Xms2g -Xmx2g                          Fix heap size
// -XX:+HeapDumpOnOutOfMemoryError         Auto heap dump on OOM
// -XX:HeapDumpPath=/tmp/dump.hprof        Dump location
// -XX:MaxMetaspaceSize=256m               Cap metaspace
// -Xss1m                                  Thread stack size
// -XX:MaxDirectMemorySize=512m            Direct buffer limit`
        },
        {
          title: 'Triggering and Diagnosing OOM Scenarios',
          language: 'java',
          code: `// 1. Heap OOM — run with: java -Xmx32m HeapOOM
public class HeapOOM {
    public static void main(String[] args) {
        List<byte[]> leak = new ArrayList<>();
        while (true) {
            leak.add(new byte[1024 * 1024]); // 1MB each, never released
        }
        // java.lang.OutOfMemoryError: Java heap space
        // Diagnose: jmap -histo <pid> | head -20
        //   → shows which objects consume the most memory
    }
}

// 2. Stack Overflow — run with: java -Xss256k StackOOM
public class StackOOM {
    static int depth = 0;
    static void recurse() { depth++; recurse(); }
    public static void main(String[] args) {
        try { recurse(); }
        catch (StackOverflowError e) {
            System.out.println("Depth reached: " + depth);
            // Diagnose: jstack <pid> → look for deep recursive frames
        }
    }
}

// 3. Metaspace OOM — run with: java -XX:MaxMetaspaceSize=32m MetaspaceOOM
//    Requires a library like ByteBuddy or Javassist
public class MetaspaceOOM {
    public static void main(String[] args) throws Exception {
        ClassPool pool = ClassPool.getDefault();
        for (int i = 0; ; i++) {
            pool.makeClass("GeneratedClass" + i).toClass();
        }
        // java.lang.OutOfMemoryError: Metaspace
        // Diagnose: jcmd <pid> GC.class_stats → class metadata breakdown
    }
}`
        }
      ]
    },
    {
      id: 'garbage-collection',
      title: 'Garbage Collection',
      description: 'GC algorithms, generational collection, G1, ZGC, Shenandoah, tuning strategies, and GC log analysis.',
      categoryId: 'jvm',
      icon: '♻️',
      difficulty: 'Advanced',
      tags: ['GC', 'G1', 'ZGC', 'Generational', 'Tuning'],
      content: [
        {
          heading: 'Reachability Analysis & Reference Types',
          body: 'Java uses reachability analysis (NOT reference counting) to determine which objects are garbage. Starting from GC Roots (local variables, static fields, JNI references, active threads), the GC traces all reachable objects. Unreachable objects are eligible for collection. This handles circular references (unlike reference counting in Python/Swift). Java has four reference types: 1) Strong references — normal references, never GC\'d while reachable. 2) Soft references (SoftReference) — GC\'d only when memory is low, ideal for caches. 3) Weak references (WeakReference) — GC\'d at the next collection cycle when no strong references exist, used for metadata/canonicalization maps. 4) Phantom references (PhantomReference) — for cleanup actions after GC, replaces finalize(). The finalize() method (deprecated since Java 9) was called by the GC before reclaiming an object — but timing was unpredictable and it could delay collection. Use Cleaner or try-with-resources instead.'
        },
        {
          heading: 'Generational Hypothesis',
          body: 'Most objects die young. The heap is divided into Young Gen (Eden + Survivor S0/S1) and Old Gen. Minor GC (Young GC): collects Young Gen — fast, frequent. Major GC (Old GC): collects Old Gen — slower, less frequent. Full GC: collects entire heap — most expensive, often a performance red flag. Objects survive Minor GCs by copying between Survivor spaces and eventually get promoted (tenured) to Old Gen after a threshold (default 15 GC cycles).'
        },
        {
          heading: 'GC Algorithms',
          body: 'Serial GC (-XX:+UseSerialGC): single-threaded, STW, good for small heaps/clients. Parallel GC (-XX:+UseParallelGC): multi-threaded throughput collector, targets high throughput. G1 (-XX:+UseG1GC, default since Java 9): region-based, targets pause time (-XX:MaxGCPauseMillis=200), good for heaps >4GB. ZGC (-XX:+UseZGC): ultra-low latency (<1ms pauses), handles multi-TB heaps, concurrent. Shenandoah: concurrent compaction like ZGC, available in OpenJDK.'
        },
        {
          heading: 'G1 Collector Deep Dive',
          body: 'G1 divides heap into equal-sized regions (1-32MB). Each region is Eden, Survivor, Old, or Humongous (for objects >50% region size). G1 maintains a priority queue of regions sorted by garbage amount — collects the "garbage-first" regions (hence the name). Remembered Sets track inter-region references. Mixed collections reclaim both young and old regions. Concurrent marking runs alongside application threads.'
        },
        {
          heading: 'GC Tuning',
          body: 'Step 1: Enable GC logging: `-Xlog:gc*:file=gc.log:time,level,tags` (Java 9+). Step 2: Analyze with tools (GCViewer, GCEasy.io). Key metrics: pause times, frequency, throughput (% time not in GC). Common issues: frequent Full GC (increase heap or fix leak), long pauses (switch to ZGC/Shenandoah), premature promotion (increase Young Gen ratio). Use JFR (Java Flight Recorder) for production profiling with minimal overhead.'
        },
        {
          heading: 'Real-World Analogy',
          body: 'Think of GC as cleaning staff at an office. The Young Generation is like daily desk cleanup: every evening the janitor (Minor GC) clears away disposable cups and scratch paper (short-lived objects). Most trash is generated and collected here — fast and frequent. Items that people keep on their desks for weeks (surviving objects) get moved to a permanent storage room (Old Generation). The Old Generation deep clean is like a monthly warehouse cleanup (Major GC) — slower because there\'s more stuff and it\'s harder to tell what\'s still needed. A Full GC is like an emergency building-wide cleanout — everything stops while every room is inspected. G1 GC is like a smart janitor who prioritizes the messiest rooms first (garbage-first). ZGC is like a cleaning robot that works alongside employees without asking them to pause.'
        }
      ],
      codeExamples: [
        {
          title: 'GC Configuration Profiles',
          language: 'java',
          code: `// G1 GC — balanced (default for most applications)
// java -Xms4g -Xmx4g -XX:+UseG1GC
//   -XX:MaxGCPauseMillis=200
//   -XX:G1HeapRegionSize=16m
//   -XX:InitiatingHeapOccupancyPercent=45
//   -Xlog:gc*:file=gc.log:time,level,tags

// ZGC — ultra-low latency (Java 21+ generational ZGC)
// java -Xms8g -Xmx8g -XX:+UseZGC
//   -XX:+ZGenerational
//   -Xlog:gc*:file=gc.log

// Parallel GC — max throughput (batch processing)
// java -Xms4g -Xmx4g -XX:+UseParallelGC
//   -XX:ParallelGCThreads=8
//   -XX:GCTimeRatio=99

// Programmatic GC monitoring
for (GarbageCollectorMXBean gc : ManagementFactory.getGarbageCollectorMXBeans()) {
    System.out.printf("GC: %s, count=%d, time=%dms%n",
        gc.getName(), gc.getCollectionCount(), gc.getCollectionTime());
}

// JFR recording (production-safe profiling)
// java -XX:StartFlightRecording=duration=60s,filename=rec.jfr -jar app.jar
// jfr print --events jdk.GCPhasePause rec.jfr`
        },
        {
          title: 'Interpreting GC Logs',
          language: 'java',
          code: `// Enable GC logging (Java 9+ unified logging)
// java -Xlog:gc*:file=gc.log:time,level,tags -jar app.jar

// Sample G1 GC log output and how to read it:
// [2024-03-15T10:23:45.123+0000][info][gc] GC(42) Pause Young (Normal)
//     (G1 Evacuation Pause) 512M->128M(1024M) 12.345ms
//
// Breakdown:
//   GC(42)         → 42nd GC event since JVM start
//   Pause Young    → Minor GC (Young Generation collection)
//   512M->128M     → Heap: 512MB before → 128MB after (384MB freed)
//   (1024M)        → Total heap size
//   12.345ms       → Pause duration (STW = Stop The World)

// Red flags in GC logs:
// 1. Frequent Full GC:
//    [gc] GC(99) Pause Full (Allocation Failure) 900M->890M(1024M) 2345.678ms
//    → Only 10MB freed! Likely a memory leak. Heap dump needed.
//
// 2. Long pause times:
//    Pause Young ... 500.123ms  (target is MaxGCPauseMillis=200)
//    → Consider switching to ZGC or increasing heap.
//
// 3. Premature promotion (objects promoted too quickly):
//    → Increase -XX:MaxTenuringThreshold or Young Gen size

// Quick analysis with command line
// grep "Pause Full" gc.log | wc -l          # count Full GCs
// grep "Pause Young" gc.log | awk '{print \$NF}' # extract pause times
// Upload gc.log to https://gceasy.io for visual analysis`
        }
      ]
    },
    {
      id: 'class-loading',
      title: 'Class Loading Process',
      description: 'Loading, linking (verify, prepare, resolve), and initialization — how classes enter the JVM.',
      categoryId: 'jvm',
      icon: '📥',
      difficulty: 'Advanced',
      tags: ['Class Loading', 'Linking', 'Initialization', 'ClassLoader'],
      content: [
        {
          heading: 'Loading',
          body: 'The ClassLoader reads the .class file (from filesystem, JAR, network, or dynamically generated) and creates a Class<?> object in Metaspace. The binary data is read into memory but not yet usable. Loading is lazy — a class is loaded only when first actively used (instantiation, static method/field access, reflection, or subclass loading).'
        },
        {
          heading: 'Linking: Verification',
          body: 'Bytecode verification ensures the class file is structurally correct and won\'t violate JVM safety constraints. Checks: magic number (0xCAFEBABE), version compatibility, constant pool validity, bytecode instruction validity, type safety (stack map frames), access control. This prevents malicious or corrupted bytecode from crashing the JVM. Can be disabled with -Xverify:none (dangerous, only for trusted code in dev).'
        },
        {
          heading: 'Linking: Preparation & Resolution',
          body: 'Preparation: allocates memory for static fields and sets them to default values (0, null, false — NOT the initializer value). Resolution: replaces symbolic references in the constant pool with direct references (memory addresses). This can be eager (at link time) or lazy (on first use). For example, a reference to "java/lang/String" is resolved to the actual String class object.'
        },
        {
          heading: 'Initialization',
          body: 'Executes the class initializer <clinit> — runs static initializers and static blocks in textual order. This is when static fields get their declared values. Initialization is guaranteed to happen exactly once and is thread-safe (the JVM holds a lock). A class is initialized when: first instance created, static method called, static field accessed (except compile-time constants), reflection, or subclass initialized.'
        },
        {
          heading: 'Class Loading Triggers',
          body: 'Active use (triggers initialization): new, static field access/modification, static method call, reflection (Class.forName), subclass initialization, main class. Passive use (does NOT trigger initialization): accessing a compile-time constant (static final primitive/String), creating an array of the type, referencing the class via a child. This distinction is critical for understanding static block execution order in interviews.'
        },
        {
          heading: 'NoClassDefFoundError vs ClassNotFoundException',
          body: 'ClassNotFoundException is a checked exception thrown when the JVM cannot find a class at runtime that was requested dynamically — typically via Class.forName(), ClassLoader.loadClass(), or ClassLoader.findSystemClass(). The class may never have been on the classpath. NoClassDefFoundError is an Error thrown when the JVM finds the class at compile time but cannot find or load it at runtime. Common causes: the class was present during compilation but missing from the runtime classpath, or a static initializer failed (ExceptionInInitializerError first, then NoClassDefFoundError on subsequent attempts). Key difference: ClassNotFoundException = class never found; NoClassDefFoundError = class was known but became unavailable or failed to initialize.'
        },
        {
          heading: 'Class Unloading',
          body: 'Java does not provide explicit control over class unloading. However, a class can be unloaded when its classloader is garbage collected. For a class to be eligible for unloading: 1) All instances of the class must be GC-eligible (no strong references). 2) The Class object itself must have no strong references. 3) The classloader that loaded the class must be GC-eligible. In practice, classes loaded by the Bootstrap, Platform, or Application classloaders are never unloaded. Custom classloaders (used by app servers, OSGi, hot-reload frameworks) enable class unloading when the entire classloader and its loaded classes become unreachable. This is why application servers can redeploy webapps — each webapp has its own classloader that can be discarded.'
        },
        {
          heading: 'Class Loading and Memory Usage',
          body: 'Every class loaded into the JVM consumes memory for its metadata (stored in Metaspace): the class structure, method bytecode, constant pool, field descriptors, and annotations. Loading many classes or using large libraries increases Metaspace consumption. In application servers with frequent redeployments, classloader leaks (where old classloaders are not GC\'d due to lingering references) can cause Metaspace exhaustion. Monitor with: -XX:MaxMetaspaceSize, jcmd <pid> GC.class_stats, and jmap -clstats <pid>. Proper classloader lifecycle management is critical in long-running applications.'
        },
        {
          heading: 'Why This Matters',
          body: 'Understanding class loading is crucial in several practical scenarios: 1) Hot reload / Dev tools — frameworks like Spring DevTools create new classloaders to reload changed classes without restarting the JVM; this only works if you understand that a class is identified by both its name AND its classloader. 2) Plugin systems — IDEs like IntelliJ and servers like Tomcat use separate classloaders per plugin/webapp to isolate dependencies and allow independent upgrades. 3) Testing — mocking frameworks (Mockito, ByteBuddy) dynamically generate subclasses at runtime; understanding class loading helps debug "ClassNotFoundException" or "NoClassDefFoundError" in tests. 4) Dependency conflicts — "JAR hell" occurs when the same class exists in multiple JARs and the wrong version is loaded first. 5) Memory leaks — classloader leaks in application servers occur when a redeployed webapp retains references that prevent its classloader (and all its classes) from being garbage collected.'
        }
      ],
      codeExamples: [
        {
          title: 'Class Loading Demonstration',
          language: 'java',
          code: `public class Parent {
    static { System.out.println("Parent initialized"); }
    public static final String CONST = "constant"; // compile-time constant
    public static String RUNTIME = "runtime";       // runtime constant
}

public class Child extends Parent {
    static { System.out.println("Child initialized"); }
}

// Access compile-time constant — does NOT trigger initialization
System.out.println(Parent.CONST); // "constant" — no "Parent initialized"

// Access runtime constant — triggers initialization
System.out.println(Parent.RUNTIME); // "Parent initialized" then "runtime"

// Access parent's field through child — only Parent initialized
System.out.println(Child.RUNTIME); // "Parent initialized" (NOT Child!)

// Class.forName triggers initialization (default)
Class.forName("com.example.Parent"); // "Parent initialized"

// Class.forName without initialization
Class.forName("com.example.Parent", false, classLoader); // no init

// Array creation does NOT trigger initialization
Parent[] array = new Parent[10]; // no "Parent initialized"`
        },
        {
          title: 'Singleton Broken by Different ClassLoaders',
          language: 'java',
          code: `// A "singleton" is only singleton within its classloader
public class Singleton {
    private static final Singleton INSTANCE = new Singleton();
    private Singleton() { System.out.println("Singleton created: " + hashCode()); }
    public static Singleton getInstance() { return INSTANCE; }
}

// Load Singleton with two different classloaders
public class ClassLoaderBreakDemo {
    public static void main(String[] args) throws Exception {
        // ClassLoader 1: default app classloader
        Singleton s1 = Singleton.getInstance();

        // ClassLoader 2: custom classloader (isolates from parent)
        URLClassLoader cl2 = new URLClassLoader(
            new URL[]{ new File("target/classes").toURI().toURL() },
            null  // null parent = bypass parent delegation
        );
        Class<?> clazz = cl2.loadClass("com.example.Singleton");
        Object s2 = clazz.getMethod("getInstance").invoke(null);

        System.out.println("s1 class: " + s1.getClass().getClassLoader());
        System.out.println("s2 class: " + s2.getClass().getClassLoader());
        System.out.println("Same class? " + (s1.getClass() == clazz)); // false!
        System.out.println("instanceof? " + clazz.isInstance(s1));      // false!
        // Two "Singleton" instances exist — loaded by different classloaders
        // This is why Tomcat webapps can have their own singletons
    }
}`
        }
      ]
    },
    {
      id: 'classloader',
      title: 'ClassLoader',
      description: 'Bootstrap, Extension, Application classloaders, parent delegation model, and custom classloaders.',
      categoryId: 'jvm',
      icon: '🔄',
      difficulty: 'Advanced',
      tags: ['ClassLoader', 'Parent Delegation', 'Bootstrap', 'Custom ClassLoader'],
      content: [
        {
          heading: 'ClassLoader Hierarchy',
          body: 'Bootstrap ClassLoader: loads core Java classes (java.lang.*, java.util.*) from <JAVA_HOME>/lib. Written in C/C++, returns null as classloader. Platform ClassLoader (formerly Extension): loads platform-specific classes. Application ClassLoader: loads classes from classpath (-cp, CLASSPATH). Each classloader has a parent — forms a tree hierarchy.'
        },
        {
          heading: 'Parent Delegation Model',
          body: 'When a classloader receives a load request: 1) Check if already loaded (cache). 2) Delegate to parent classloader. 3) Parent delegates to its parent (recursively up to Bootstrap). 4) If parent cannot load, the current classloader tries itself. This ensures core Java classes are always loaded by Bootstrap (security — prevents replacing java.lang.String). If no classloader can find the class → ClassNotFoundException.'
        },
        {
          heading: 'Breaking Parent Delegation',
          body: 'Some frameworks break parent delegation: Thread Context ClassLoader (TCCL) — allows SPI implementations to load classes visible to the application (e.g., JDBC drivers loaded by Bootstrap need to see driver implementations on classpath). OSGi: each bundle has its own classloader with explicit import/export. Tomcat: web applications load their own classes first (reverse delegation for WEB-INF/classes), then parent.'
        },
        {
          heading: 'Custom ClassLoader',
          body: 'Extend ClassLoader, override findClass(String name). Use cases: loading classes from non-standard sources (database, network, encrypted), hot-reloading (create new classloader instance), isolation (multiple versions of same class). Two classes loaded by different classloaders are different types — even with same bytecode. This is why application server ClassCastExceptions occur across modules.'
        }
      ],
      codeExamples: [
        {
          title: 'ClassLoader Exploration',
          language: 'java',
          code: `// Inspect classloader hierarchy
ClassLoader appCL = ClassLoader.getSystemClassLoader();
System.out.println("App CL: " + appCL);             // AppClassLoader
System.out.println("Parent: " + appCL.getParent());   // PlatformClassLoader
System.out.println("Grand:  " + appCL.getParent().getParent()); // null (Bootstrap)

// String is loaded by Bootstrap (null classloader)
System.out.println(String.class.getClassLoader()); // null

// Custom ClassLoader
public class HotReloadClassLoader extends ClassLoader {
    private final Path classDir;

    public HotReloadClassLoader(Path classDir, ClassLoader parent) {
        super(parent);
        this.classDir = classDir;
    }

    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        try {
            Path classFile = classDir.resolve(name.replace('.', '/') + ".class");
            byte[] bytes = Files.readAllBytes(classFile);
            return defineClass(name, bytes, 0, bytes.length);
        } catch (IOException e) {
            throw new ClassNotFoundException(name, e);
        }
    }
}

// Thread Context ClassLoader — used by SPI
ClassLoader tccl = Thread.currentThread().getContextClassLoader();
ServiceLoader.load(MyService.class, tccl);`
        }
      ]
    },
    {
      id: 'jvm-monitoring',
      title: 'JDK Monitoring & Troubleshooting Tools',
      description: 'jps, jstack, jmap, jstat, jcmd, JFR, VisualVM — diagnosing production JVM issues.',
      categoryId: 'jvm',
      icon: '🔬',
      difficulty: 'Advanced',
      tags: ['jstack', 'jmap', 'jstat', 'JFR', 'Monitoring', 'Troubleshooting'],
      content: [
        {
          heading: 'Process Tools',
          body: 'jps: list JVM processes with PIDs. jcmd: Swiss army knife — thread dump, heap dump, GC info, VM flags, JFR control. jinfo: view/modify JVM flags at runtime. These are the first tools to reach for when troubleshooting a production JVM.'
        },
        {
          heading: 'Thread Analysis',
          body: 'jstack <pid>: capture thread dump — shows all threads, their states, and stack traces. Use for diagnosing: deadlocks (jstack reports detected deadlocks), high CPU threads (correlate with `top -H -p <pid>`), thread leaks. Take 3-5 dumps 5-10 seconds apart to identify threads stuck at the same point. `kill -3 <pid>` also generates a thread dump to stdout.'
        },
        {
          heading: 'Memory Analysis',
          body: 'jmap -heap <pid>: heap summary (GC algorithm, generation sizes). jmap -histo <pid>: histogram of object counts and sizes. jmap -dump:format=b,file=dump.hprof <pid>: full heap dump. Analyze heap dumps with Eclipse MAT (Memory Analyzer Tool) — find leak suspects, dominator tree, histogram. jstat -gc <pid> 1000: GC statistics every second (heap usage, GC counts, GC times).'
        },
        {
          heading: 'Java Flight Recorder (JFR)',
          body: 'JFR is the gold standard for production profiling — <2% overhead. Records events: method profiling, GC activity, thread states, I/O, allocations, locks. Start: `jcmd <pid> JFR.start duration=60s filename=rec.jfr` or JVM flag `-XX:StartFlightRecording`. Analyze with JDK Mission Control (JMC) GUI or `jfr` CLI tool. Available in all OpenJDK distributions since Java 11 (was commercial-only in Oracle JDK 8).'
        }
      ],
      codeExamples: [
        {
          title: 'Diagnostic Commands',
          language: 'java',
          code: `// List Java processes
// jps -lv

// Thread dump (deadlock detection)
// jcmd <pid> Thread.print
// jstack -l <pid>

// Heap dump
// jcmd <pid> GC.heap_dump /tmp/dump.hprof
// jmap -dump:format=b,file=/tmp/dump.hprof <pid>

// GC statistics (every 1 second)
// jstat -gc <pid> 1000
// Columns: S0C S1C S0U S1U EC EU OC OU MC MU YGC YGCT FGC FGCT GCT

// Object histogram (top memory consumers)
// jcmd <pid> GC.class_histogram | head -30

// Java Flight Recorder
// jcmd <pid> JFR.start duration=60s filename=recording.jfr
// jcmd <pid> JFR.stop
// jfr print --events jdk.CPULoad recording.jfr
// jfr summary recording.jfr

// Check VM flags
// jcmd <pid> VM.flags
// jcmd <pid> VM.system_properties

// Find high-CPU thread (Linux)
// top -H -p <pid>  → find thread ID (e.g., 12345)
// printf '%x' 12345  → convert to hex (0x3039)
// jstack <pid> | grep -A 20 "nid=0x3039"  → find in thread dump`
        }
      ]
    },
    {
      id: 'jvm-parameters',
      title: 'Important JVM Parameters',
      description: 'Essential JVM flags for heap, GC, debugging, and performance tuning in production.',
      categoryId: 'jvm',
      icon: '⚙️',
      difficulty: 'Intermediate',
      tags: ['JVM Parameters', 'Xmx', 'Xms', 'GC Flags', 'Tuning'],
      content: [
        {
          heading: 'Memory Parameters',
          body: '-Xms: initial heap size (-Xms2g). -Xmx: maximum heap size (-Xmx4g). Best practice: set -Xms = -Xmx in production (avoids resize pauses). -Xss: thread stack size (-Xss1m). -XX:MaxMetaspaceSize: metaspace limit (-XX:MaxMetaspaceSize=256m). -XX:MaxDirectMemorySize: NIO direct buffer limit.'
        },
        {
          heading: 'GC Parameters',
          body: '-XX:+UseG1GC (default since Java 9), -XX:+UseZGC, -XX:+UseParallelGC. -XX:MaxGCPauseMillis=200 (G1 target pause). -XX:G1HeapRegionSize=16m. -XX:ParallelGCThreads=N. -XX:ConcGCThreads=N. -XX:+ZGenerational (Java 21+ generational ZGC).'
        },
        {
          heading: 'Debugging Parameters',
          body: '-XX:+HeapDumpOnOutOfMemoryError: auto heap dump on OOM. -XX:HeapDumpPath=/path: dump location. -XX:OnOutOfMemoryError="kill -9 %p": action on OOM. -XX:+ExitOnOutOfMemoryError: terminate JVM on OOM. -Xlog:gc*:file=gc.log:time,level,tags: unified GC logging (Java 9+). -XX:+PrintFlagsFinal: print all JVM flags.'
        },
        {
          heading: 'Performance Parameters',
          body: '-XX:+UseCompressedOops (default for <32GB heaps): compress object references from 8 to 4 bytes. -XX:+UseStringDeduplication (G1 only): deduplicate String char arrays. -XX:+TieredCompilation (default): C1→C2 compilation. -XX:ReservedCodeCacheSize=256m: space for JIT-compiled code. -XX:+AlwaysPreTouch: commit heap memory at startup (avoids page faults).'
        },
        {
          heading: 'Container Parameters',
          body: 'Java 10+ is container-aware — respects cgroup memory/CPU limits. -XX:MaxRAMPercentage=75.0: use 75% of container memory as max heap (better than -Xmx in containers). -XX:InitialRAMPercentage=50.0. -XX:+UseContainerSupport (default). -XX:ActiveProcessorCount=N: override detected CPU count.'
        },
        {
          heading: 'Quick Reference Guide',
          body: 'MEMORY: -Xms/-Xmx (heap), -Xss (stack), -XX:MaxMetaspaceSize, -XX:MaxDirectMemorySize, -XX:MaxRAMPercentage (containers). GC SELECTION: -XX:+UseG1GC (balanced, default), -XX:+UseZGC (low latency), -XX:+UseParallelGC (throughput). GC TUNING: -XX:MaxGCPauseMillis (G1 target), -XX:G1HeapRegionSize, -XX:ParallelGCThreads, -XX:+UseStringDeduplication. DIAGNOSTICS: -XX:+HeapDumpOnOutOfMemoryError, -XX:HeapDumpPath, -Xlog:gc*, -XX:+ExitOnOutOfMemoryError. PERFORMANCE: -XX:+UseCompressedOops, -XX:+AlwaysPreTouch, -XX:ReservedCodeCacheSize, -XX:+TieredCompilation. CONTAINER: -XX:MaxRAMPercentage=75.0, -XX:+UseContainerSupport, -XX:ActiveProcessorCount. Rule of thumb: set -Xms = -Xmx in production, use G1 by default, enable heap dump on OOM, and use -XX:MaxRAMPercentage in containers instead of -Xmx.'
        }
      ],
      codeExamples: [
        {
          title: 'Production JVM Configuration',
          language: 'java',
          code: `// Production Spring Boot service (container)
// java
//   -XX:MaxRAMPercentage=75.0
//   -XX:InitialRAMPercentage=75.0
//   -XX:+UseG1GC
//   -XX:MaxGCPauseMillis=200
//   -XX:+UseStringDeduplication
//   -XX:+HeapDumpOnOutOfMemoryError
//   -XX:HeapDumpPath=/tmp/heapdump.hprof
//   -XX:+ExitOnOutOfMemoryError
//   -Xlog:gc*:file=/var/log/gc.log:time,level,tags:filecount=5,filesize=10m
//   -XX:+AlwaysPreTouch
//   -jar /app/service.jar

// Low-latency service
// java -Xms8g -Xmx8g
//   -XX:+UseZGC -XX:+ZGenerational
//   -XX:+AlwaysPreTouch
//   -jar /app/trading-engine.jar

// Batch processing (max throughput)
// java -Xms4g -Xmx4g
//   -XX:+UseParallelGC
//   -XX:ParallelGCThreads=8
//   -jar /app/batch-job.jar

// Print effective flags
// java -XX:+PrintFlagsFinal -version 2>&1 | grep -i "heapsize\\|gc"
// java -XshowSettings:vm -version`
        },
        {
          title: 'Recommended JVM Settings Script',
          language: 'java',
          code: `// Shell script that prints recommended JVM settings based on available memory
// Save as: jvm-recommend.sh

// #!/bin/bash
// TOTAL_MEM_MB=\$(free -m | awk '/^Mem:/{print \$2}')
// CPUS=\$(nproc)
//
// echo "=== System: \${TOTAL_MEM_MB}MB RAM, \${CPUS} CPUs ==="
//
// if [ "\$TOTAL_MEM_MB" -le 512 ]; then
//   HEAP="\$(( TOTAL_MEM_MB * 50 / 100 ))m"
//   GC="-XX:+UseSerialGC"
//   echo "Profile: Small (<=512MB) — Serial GC"
// elif [ "\$TOTAL_MEM_MB" -le 4096 ]; then
//   HEAP="\$(( TOTAL_MEM_MB * 70 / 100 ))m"
//   GC="-XX:+UseG1GC -XX:MaxGCPauseMillis=200"
//   echo "Profile: Medium (<=4GB) — G1 GC"
// else
//   HEAP="\$(( TOTAL_MEM_MB * 75 / 100 ))m"
//   GC="-XX:+UseZGC -XX:+ZGenerational"
//   echo "Profile: Large (>4GB) — ZGC"
// fi
//
// echo ""
// echo "Recommended JVM flags:"
// echo "  -Xms\${HEAP} -Xmx\${HEAP}"
// echo "  \${GC}"
// echo "  -XX:+HeapDumpOnOutOfMemoryError"
// echo "  -XX:HeapDumpPath=/tmp/heapdump.hprof"
// echo "  -XX:+ExitOnOutOfMemoryError"
// echo "  -XX:+AlwaysPreTouch"
// echo "  -Xlog:gc*:file=gc.log:time,level,tags"

// Java equivalent — print current JVM recommendations
Runtime rt = Runtime.getRuntime();
long maxMem = rt.maxMemory() / (1024 * 1024);
int cpus = rt.availableProcessors();
System.out.printf("Max heap: %dMB, CPUs: %d%n", maxMem, cpus);
System.out.printf("Recommended GC: %s%n",
    maxMem <= 512 ? "Serial" : maxMem <= 4096 ? "G1" : "ZGC");
System.out.printf("Recommended GC threads: %d%n",
    Math.max(1, cpus * 5 / 8));`
        }
      ]
    },
];
