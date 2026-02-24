import { Topic } from '../../models/knowledge.model';

export const CONCURRENCY_TOPICS: Topic[] = [
    {
      id: 'thread-basics',
      title: 'Thread Fundamentals',
      description: 'Creating threads, thread lifecycle states, thread methods, daemon threads, and thread safety basics.',
      categoryId: 'concurrency',
      icon: '🧵',
      difficulty: 'Intermediate',
      tags: ['Threads', 'Runnable', 'Callable', 'Thread Lifecycle', 'Daemon Threads', 'Thread Safety', 'wait', 'notify', 'interrupt', 'join'],
      content: [
        {
          heading: 'Creating Threads',
          body: 'Three ways:\n1) Extend `Thread` class (*inflexible, Java doesn\'t support multiple inheritance*).\n2) Implement `Runnable` (*preferred, supports composition*).\n3) Implement `Callable<V>` (*returns a result, can throw checked exceptions*).\n\nSince Java 8, use lambdas with `Runnable`/`Callable`. Never call `run()` directly — call `start()` which creates a new OS thread.'
        },
        {
          heading: 'Thread Lifecycle',
          body: '`Thread.State` enum:\n**NEW** — created, not started.\n**RUNNABLE** — running or ready to run.\n**BLOCKED** — waiting for monitor lock.\n**WAITING** — `wait()`, `join()`, `park()` without timeout.\n**TIMED_WAITING** — `sleep()`, `wait(timeout)`, `join(timeout)`.\n**TERMINATED** — completed or exception.\n\nA thread can transition between RUNNABLE, BLOCKED, WAITING, TIMED_WAITING multiple times before TERMINATED.'
        },
        {
          heading: 'Key Thread Methods',
          body: '`start()`: creates OS thread and calls `run()`.\n`sleep(ms)`: pauses current thread (*does NOT release locks*).\n`yield()`: hints scheduler to give up CPU (*rarely useful*).\n`join()`: waits for another thread to finish.\n`interrupt()`: sets interrupt flag — blocking methods throw `InterruptedException`.\n`isInterrupted()`: checks flag without clearing.\n`Thread.interrupted()`: checks AND clears.\n\n`wait()`: releases the lock and suspends the thread until `notify()`/`notifyAll()` is called — *must be in a synchronized block*.\n`notify()`: wakes one waiting thread.\n`notifyAll()`: wakes all waiting threads.\nUse `wait`/`notify` for inter-thread communication (*producer-consumer*), but prefer `java.util.concurrent` utilities in modern code.'
        },
        {
          heading: 'Daemon Threads',
          body: '**Daemon threads** are background threads that don\'t prevent JVM shutdown. When all non-daemon threads finish, JVM terminates (*killing all daemon threads*).\nSet via `thread.setDaemon(true)` BEFORE `start()`. GC threads are daemon threads.\n\nDon\'t use daemon threads for tasks that need graceful shutdown (*file writes, transactions*). **Virtual threads** are always daemon.'
        },
        {
          heading: 'Thread Safety Basics',
          body: 'A class is **thread-safe** if it behaves correctly when accessed from multiple threads without external synchronization.\n\nThree approaches:\n1) Immutability (*best — no shared mutable state*).\n2) Synchronization (`locks`, `synchronized`, `volatile`).\n3) Thread confinement (each thread has its own copy — `ThreadLocal`).\n\nThe key challenge: **visibility** (*cached values in CPU registers/caches*) and **atomicity** (*compound operations are not atomic*).'
        },
        {
          heading: 'Synchronized Collections vs Concurrent Collections',
          body: '**Synchronized collections** (`Collections.synchronizedList()`, `synchronizedMap()`) wrap a standard collection with a single global lock — every operation acquires this lock, creating a bottleneck where only one thread can access the collection at a time. *Iterating requires external synchronization.*\n\n**Concurrent collections** (`ConcurrentHashMap`, `CopyOnWriteArrayList`, `ConcurrentLinkedQueue`) are purpose-built for concurrent access with much better performance.\n`ConcurrentHashMap` uses fine-grained locking (*per-bucket in Java 8+*), allowing multiple threads to read concurrently and write to different buckets simultaneously.\n`CopyOnWriteArrayList` creates a new copy on every write — *reads are lock-free*.\n`Hashtable` is a legacy synchronized Map — *avoid it*.\n\nRule: always prefer concurrent collections from `java.util.concurrent` over synchronized wrappers in production code.'
        },
        {
          heading: 'Single-Thread Deadlock & Common Threading Pitfalls',
          body: 'A traditional **deadlock** requires two or more threads, but a single thread can experience a **self-deadlock** (*resource starvation*) if it recursively acquires a non-reentrant lock it already holds. Since Java\'s `synchronized` and `ReentrantLock` are **reentrant** (*the same thread can acquire the same lock multiple times*), this is rare with built-in locks but possible with custom lock implementations.\n\nOther common pitfalls:\n**Thread leaks** — forgetting to shut down `ExecutorService`.\n**Race conditions** — check-then-act patterns (*check a condition then act on it without atomicity*).\n**Livelock** — threads keep responding to each other but never make progress.\n**Starvation** — a thread cannot get resources because others monopolize them.'
        },
        {
          heading: 'Real-World Analogy',
          body: 'Think of threads as *chefs in a kitchen*. Each chef (thread) can work independently on their own dish, but they all share the same ingredients (*shared memory*), utensils (*resources*), and counter space (*CPU*).\n\nIf two chefs grab the last egg at the same time, you have a **race condition**. If one chef is waiting for the stove while another is waiting for the pan the first chef is holding, you have a **deadlock**. The kitchen manager (**thread scheduler**) decides who gets to cook next, and you can\'t predict the order.\n\n**Thread safety** is about establishing kitchen rules: *labeling ingredients* (`volatile`), *taking turns at the stove* (`synchronization`), or *giving each chef their own prep station* (`thread confinement`).'
        }
      ],
      codeExamples: [
        {
          title: 'Thread Creation and Lifecycle',
          language: 'java',
          code: `// Runnable with lambda (preferred)
Thread t1 = new Thread(() -> System.out.println("Hello from " + Thread.currentThread().getName()));
t1.start();

// Callable with Future — returns result
ExecutorService executor = Executors.newSingleThreadExecutor();
Future<String> future = executor.submit(() -> {
    Thread.sleep(1000);
    return "Result";
});
String result = future.get(5, TimeUnit.SECONDS); // blocks until result

// Proper interrupt handling
Thread worker = new Thread(() -> {
    while (!Thread.currentThread().isInterrupted()) {
        try {
            doWork();
            Thread.sleep(100);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt(); // restore flag
            break; // exit gracefully
        }
    }
});

// join — wait for thread completion
Thread t = new Thread(() -> heavyComputation());
t.start();
t.join(5000); // wait up to 5 seconds
if (t.isAlive()) {
    t.interrupt(); // timeout — request cancellation
}`
        },
        {
          title: 'Thread States Inspection',
          language: 'java',
          code: `// Inspecting thread states at runtime
public class ThreadStateDemo {
    public static void main(String[] args) throws Exception {
        Object lock = new Object();

        Thread blockedThread = new Thread(() -> {
            synchronized (lock) { /* will block if lock is held */ }
        }, "blocked-thread");

        Thread waitingThread = new Thread(() -> {
            synchronized (lock) {
                try { lock.wait(); } catch (InterruptedException e) { }
            }
        }, "waiting-thread");

        Thread timedWaitingThread = new Thread(() -> {
            try { Thread.sleep(10_000); } catch (InterruptedException e) { }
        }, "timed-waiting-thread");

        // NEW state
        System.out.println(blockedThread.getName() + ": " + blockedThread.getState());

        synchronized (lock) {
            blockedThread.start();
            waitingThread.start();
            timedWaitingThread.start();
            Thread.sleep(100); // let threads reach their states

            // BLOCKED — waiting for monitor lock held by main
            System.out.println(blockedThread.getName() + ": " + blockedThread.getState());
        }

        Thread.sleep(100);
        // WAITING — in lock.wait()
        System.out.println(waitingThread.getName() + ": " + waitingThread.getState());
        // TIMED_WAITING — in Thread.sleep()
        System.out.println(timedWaitingThread.getName() + ": " + timedWaitingThread.getState());

        // Enumerate all threads and their states
        Thread.getAllStackTraces().forEach((thread, stack) ->
            System.out.printf("%s [%s] daemon=%b%n",
                thread.getName(), thread.getState(), thread.isDaemon()));
    }
}`
        }
      ]
    },
    {
      id: 'jmm',
      title: 'Java Memory Model (JMM)',
      description: 'Happens-before relationships, volatile semantics, instruction reordering, and memory visibility guarantees.',
      categoryId: 'concurrency',
      icon: '🧠',
      difficulty: 'Advanced',
      tags: ['JMM', 'Happens-Before', 'Volatile', 'Memory Visibility', 'Reordering', 'Memory Barrier', 'Double-Checked Locking', 'Singleton', 'CPU Cache'],
      content: [
        {
          heading: 'Why JMM Matters',
          body: 'Modern CPUs have multiple levels of caches (L1/L2/L3) and can reorder instructions for performance. Without proper synchronization, one thread may not see changes made by another thread (**visibility problem**), or operations may execute in unexpected order (**ordering problem**).\n\nThe **JMM** defines the rules for when a thread is guaranteed to see writes from other threads.'
        },
        {
          heading: 'Happens-Before Relationships',
          body: 'The **JMM** defines **happens-before** (HB) as the core ordering guarantee. If action A happens-before action B, then A\'s effects are visible to B.\n\nKey HB rules:\n1) Program order: each action in a thread HB every later action in that thread.\n2) Monitor lock: unlock HB subsequent lock of same monitor.\n3) Volatile: write to `volatile` HB subsequent read of same `volatile`.\n4) Thread start: `start()` HB any action in the started thread.\n5) Thread join: any action in a thread HB return from `join()` on that thread.\n6) Transitivity: if A HB B and B HB C, then A HB C.'
        },
        {
          heading: 'Volatile Semantics',
          body: '`volatile` provides two guarantees:\n1) Visibility — writes are immediately flushed to main memory, reads always fetch from main memory.\n2) Ordering — prevents reordering of instructions across `volatile` read/write boundaries (*acts as a memory barrier*).\n\n`volatile` does NOT provide atomicity for compound operations (`i++` is read-modify-write = 3 operations). Use `AtomicInteger` for atomic compound operations.'
        },
        {
          heading: 'Instruction Reordering',
          body: 'The compiler and CPU may reorder instructions that have no data dependency for performance optimization.\n\nExample: `x = 1; flag = true;` may execute as `flag = true; x = 1;`. If another thread checks `flag` and then reads `x`, it may see the stale value.\n\nSolutions: use `volatile` (*memory barrier*), `synchronized` (*lock release flushes writes*), or `final` (*safe publication guarantee*).'
        },
        {
          heading: 'Double-Checked Locking',
          body: 'Classic singleton pattern that illustrates **JMM** importance.\n\nWithout `volatile`: `instance = new Singleton()` involves 3 steps (*allocate, initialize, assign*). Reordering can cause another thread to see a non-null but partially initialized instance.\n\nFix: declare `instance` as `volatile` — prevents reordering of initialization and assignment. *In modern Java, prefer enum singleton or static holder idiom.*'
        },
        {
          heading: 'Real-World Analogy',
          body: 'Imagine a team working in an office. **Main memory** is *the shared whiteboard on the wall*, and each person (CPU core/thread) has their own *personal notebook* (**CPU cache/registers**).\n\nWhen you update a number in your notebook, no one else can see it — they\'re still reading the old value from their own notebooks or the whiteboard. Only when you walk over and *write your changes to the whiteboard* (**flush to main memory**) can others see them — and only if they actually *look at the whiteboard* (**read from main memory**) instead of their own notes.\n\nThe `volatile` keyword is like a rule saying: *"always write directly to the whiteboard, and always read directly from the whiteboard."* Without it, the JVM is free to let threads work from their personal notebooks indefinitely, *which is faster but means one thread may never see another thread\'s changes.*'
        }
      ],
      codeExamples: [
        {
          title: 'JMM and Volatile',
          language: 'java',
          code: `// Without volatile — may never terminate! (visibility problem)
class BrokenTask implements Runnable {
    private boolean running = true; // NOT volatile
    public void stop() { running = false; }
    public void run() {
        while (running) { /* compiler may hoist read out of loop */ }
    }
}

// With volatile — guaranteed to see the write
class CorrectTask implements Runnable {
    private volatile boolean running = true;
    public void stop() { running = false; } // volatile write
    public void run() {
        while (running) { /* volatile read on each iteration */ }
    }
}

// Double-Checked Locking (correct version)
public class Singleton {
    private static volatile Singleton instance; // must be volatile!

    public static Singleton getInstance() {
        if (instance == null) {              // first check (no lock)
            synchronized (Singleton.class) {
                if (instance == null) {      // second check (with lock)
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}

// Preferred: static holder idiom (lazy, thread-safe, no volatile needed)
public class BetterSingleton {
    private static class Holder {
        static final BetterSingleton INSTANCE = new BetterSingleton();
    }
    public static BetterSingleton getInstance() { return Holder.INSTANCE; }
}`
        },
        {
          title: 'Visibility Bug Without Volatile',
          language: 'java',
          code: `// This program may NEVER terminate on some JVMs!
// The JIT compiler can hoist the read of 'ready' out of the loop
// because it sees no synchronization and assumes no other thread modifies it.
public class VisibilityBug {
    private static boolean ready = false; // BUG: not volatile
    private static int number = 0;

    public static void main(String[] args) throws InterruptedException {
        Thread reader = new Thread(() -> {
            while (!ready) { /* busy-wait — may loop forever! */ }
            // Even if we exit, number may not be 42 due to reordering
            System.out.println("Number: " + number);
        });

        reader.start();
        Thread.sleep(100);
        number = 42;
        ready = true; // writer updates — but reader may never see it

        reader.join(5000);
        if (reader.isAlive()) {
            System.out.println("Reader thread is STUCK — visibility bug!");
            reader.interrupt();
        }
    }
}

// FIX: declare both fields as volatile
// private static volatile boolean ready = false;
// private static volatile int number = 0;
// OR use a single volatile (piggyback): write number BEFORE ready,
// read ready BEFORE number — happens-before transitivity guarantees
// that if the reader sees ready=true, it also sees number=42.`
        }
      ]
    },
    {
      id: 'thread-pool-deep-dive',
      title: 'Thread Pool Deep Dive',
      description: 'ThreadPoolExecutor\'s 7 parameters, 4 rejection policies, thread pool sizing, and lifecycle management.',
      categoryId: 'concurrency',
      icon: '🏊',
      difficulty: 'Advanced',
      tags: ['ThreadPoolExecutor', 'Thread Pool', 'ExecutorService', 'Rejection Policy', 'BlockingQueue', 'CallerRunsPolicy', 'Thread Pool Sizing', 'Graceful Shutdown'],
      content: [
        {
          heading: 'Why Thread Pools',
          body: 'Thread creation is expensive (*~1MB stack per OS thread*). **Thread pools** reuse threads to reduce creation/destruction overhead, control the maximum number of concurrent threads (*prevent resource exhaustion*), and provide task queuing, scheduling, and lifecycle management.\n\nAlways use thread pools instead of creating threads directly in production.'
        },
        {
          heading: 'ThreadPoolExecutor Parameters',
          body: 'The 7 parameters:\n1) `corePoolSize`: threads kept alive even when idle (*unless `allowCoreThreadTimeOut`*).\n2) `maximumPoolSize`: max threads allowed.\n3) `keepAliveTime`: idle time before non-core threads are terminated.\n4) `unit`: time unit for `keepAliveTime`.\n5) `workQueue`: `BlockingQueue` for pending tasks.\n6) `threadFactory`: creates new threads (*set names, daemon status*).\n7) `handler`: `RejectedExecutionHandler` when queue is full and max threads reached.'
        },
        {
          heading: 'Task Submission Flow',
          body: '1) If running threads < `corePoolSize` → create new core thread.\n2) If running threads >= `corePoolSize` → add task to queue.\n3) If queue is full AND running < `maximumPoolSize` → create non-core thread.\n4) If queue is full AND running >= `maximumPoolSize` → execute rejection policy.\n\n*This means non-core threads are only created AFTER the queue is full!*'
        },
        {
          heading: 'Rejection Policies',
          body: '`AbortPolicy` (*default*): throws `RejectedExecutionException`.\n`CallerRunsPolicy`: executes the task in the caller\'s thread (*provides back-pressure, recommended*).\n`DiscardPolicy`: silently discards the task (*dangerous*).\n`DiscardOldestPolicy`: discards the oldest queued task and retries.\nCustom: implement `RejectedExecutionHandler` for logging, persistent queueing, etc.'
        },
        {
          heading: 'Queue Types',
          body: '`LinkedBlockingQueue` — unbounded, *effectively disables non-core threads and rejection, can cause OOM*.\n`ArrayBlockingQueue` — bounded, *enables back-pressure, recommended*.\n`SynchronousQueue` — zero capacity, *direct handoff, each offer must be matched by a poll, used by `CachedThreadPool`*.\n`PriorityBlockingQueue` — priority-based.\n\nThe choice of queue critically affects pool behavior.'
        },
        {
          heading: 'Sizing Guidelines',
          body: '**CPU-bound tasks**: `corePoolSize` = number of CPU cores (or N+1).\n**IO-bound tasks**: `corePoolSize` = N × (1 + wait_time/compute_time), *typically 2N-10N*.\nIn practice: benchmark and profile.\n\nAvoid `Executors` factory methods in production: `newFixedThreadPool` uses unbounded queue (*OOM risk*), `newCachedThreadPool` has unbounded max threads (*thread explosion*). Always create `ThreadPoolExecutor` directly.'
        },
        {
          heading: 'Real-World Analogy',
          body: 'Think of a thread pool as *a restaurant*.\n\n**corePoolSize** is *your team of permanent waiters — they\'re always on staff, even during slow hours*.\n**workQueue** is *the waiting area (lobby) — when all waiters are busy, new customers wait in line*.\n**maximumPoolSize** is *your temp staff budget — only hired when the waiting area is completely full*.\n**keepAliveTime** is *how long temp staff wait with no customers before being sent home*.\n\n**RejectedExecutionHandler** is what happens when the restaurant is packed AND the waiting area is full AND you\'ve hired all possible temp staff:\n`AbortPolicy` = *turn customers away with an apology (throw exception)*.\n`CallerRunsPolicy` = *the manager serves the customer themselves (caller thread runs the task, providing natural back-pressure)*.\n`DiscardPolicy` = *pretend the customer doesn\'t exist (silently drop)*.'
        }
      ],
      codeExamples: [
        {
          title: 'Custom Thread Pool Configuration',
          language: 'java',
          code: `// Production-ready thread pool configuration
ThreadPoolExecutor executor = new ThreadPoolExecutor(
    Runtime.getRuntime().availableProcessors(),     // corePoolSize
    Runtime.getRuntime().availableProcessors() * 2, // maximumPoolSize
    60L, TimeUnit.SECONDS,                          // keepAliveTime
    new ArrayBlockingQueue<>(1000),                 // bounded queue
    new ThreadFactory() {
        private final AtomicInteger counter = new AtomicInteger();
        @Override
        public Thread newThread(Runnable r) {
            Thread t = new Thread(r, "worker-" + counter.incrementAndGet());
            t.setDaemon(false);
            t.setUncaughtExceptionHandler((thread, ex) ->
                log.error("Thread {} failed", thread.getName(), ex));
            return t;
        }
    },
    new ThreadPoolExecutor.CallerRunsPolicy()      // back-pressure
);

// Graceful shutdown
executor.shutdown();                // no new tasks, finish existing
if (!executor.awaitTermination(30, TimeUnit.SECONDS)) {
    executor.shutdownNow();         // interrupt running tasks
    executor.awaitTermination(10, TimeUnit.SECONDS);
}

// Monitor pool status
log.info("Pool: active={}, queued={}, completed={}",
    executor.getActiveCount(),
    executor.getQueue().size(),
    executor.getCompletedTaskCount());`
        }
      ]
    },
    {
      id: 'locks-overview',
      title: 'Locks: Optimistic vs Pessimistic',
      description: 'synchronized vs ReentrantLock, read-write locks, optimistic locking with CAS, and lock-free algorithms.',
      categoryId: 'concurrency',
      icon: '🔐',
      difficulty: 'Advanced',
      tags: ['Lock', 'ReentrantLock', 'ReadWriteLock', 'Optimistic', 'Pessimistic', 'StampedLock', 'Deadlock', 'synchronized', 'Lock Optimization', 'Biased Locking'],
      content: [
        {
          heading: 'Pessimistic Locking',
          body: 'Assumes conflicts will happen — acquires an exclusive lock before accessing shared data.\n`synchronized`: intrinsic lock on the object monitor.\n`ReentrantLock`: explicit lock with more features (`tryLock`, timed lock, interruptible, fairness).\n\nBoth are **reentrant** — *the same thread can acquire the same lock multiple times*.'
        },
        {
          heading: 'synchronized vs ReentrantLock',
          body: '`synchronized`: simpler syntax, automatic release (*even on exception*), no risk of forgetting unlock.\n`ReentrantLock`: `tryLock()` for non-blocking attempt, `lockInterruptibly()` for interruptible waiting, fair ordering option, multiple `Condition`s (*vs single wait/notify*).\n\nUse `synchronized` for simple cases, `ReentrantLock` when you need advanced features. *Since Java 6, `synchronized` performance is comparable to `ReentrantLock` (biased locking, lock coarsening, etc.).*'
        },
        {
          heading: 'Synchronized Method vs Synchronized Block',
          body: '**Synchronized method**: locks the entire method. For instance methods, the lock is on `this`; for static methods, the lock is on the `Class` object. *Simple but coarse-grained — other threads cannot enter ANY synchronized method of the same object, even if they target different data.*\n\n**Synchronized block**: `synchronized(lockObj) { ... }` — locks only the specific block of code on a specific object. More flexible and fine-grained, reducing the scope of locking to just the critical section. *This minimizes the time other threads are blocked, improving performance.*\n\nBest practice: minimize the scope of synchronized blocks. Lock on private final objects (`private final Object lock = new Object()`) rather than `this` to prevent external code from acquiring your lock.'
        },
        {
          heading: 'Exceptions Inside Synchronized Blocks',
          body: 'When an exception occurs inside a `synchronized` block or method, the lock is **automatically released**. This is a key safety feature of Java\'s `synchronized` mechanism — it ensures that locks are managed cleanly even during exceptional conditions, *preventing deadlocks from unreleased locks*.\n\nThis is one advantage of `synchronized` over `ReentrantLock`: with `ReentrantLock`, you MUST use `try-finally` to ensure the lock is released on exception, since there is no automatic release mechanism. *Forgetting the `finally` block with `ReentrantLock` is a common source of lock leaks and deadlocks.*'
        },
        {
          heading: 'ReadWriteLock',
          body: '`ReentrantReadWriteLock` allows multiple concurrent readers OR a single writer.\n**Read lock**: shared — multiple threads can hold simultaneously.\n**Write lock**: exclusive — blocks all readers and other writers.\n*Improves throughput when reads greatly outnumber writes.*\n\n`StampedLock` (Java 8): **optimistic read** that doesn\'t acquire a lock — validates after reading, falls back to read lock if data changed.'
        },
        {
          heading: 'Optimistic Locking (CAS)',
          body: 'Assumes conflicts are rare — reads without locking, uses **Compare-And-Swap** (**CAS**) to validate and update atomically.\n`CAS(expected, newValue)`: atomically sets value to newValue only if current value equals expected. If CAS fails, retry in a loop (*spin*).\n\nUsed by `AtomicInteger`, `ConcurrentHashMap`, `LongAdder`.\nCAS problems: **ABA problem** (*solved by `AtomicStampedReference`*), spin overhead under high contention.'
        },
        {
          heading: 'Lock Optimization in JVM',
          body: 'The JVM applies several lock optimizations:\n**Biased locking** (*deprecated in Java 15*): assumes a lock is mostly held by one thread.\n**Lightweight locking**: uses CAS on the mark word, *no OS thread blocking*.\n**Heavyweight locking**: falls back to OS mutex when contention is detected.\n**Lock coarsening**: merges consecutive lock/unlock on same monitor.\n**Lock elimination**: removes locks the JIT proves are thread-local.'
        },
        {
          heading: 'Real-World Analogy',
          body: 'Think of locks like *bathroom occupancy strategies*.\n\n**Pessimistic locking** (`synchronized`/`ReentrantLock`) is like *always locking the bathroom door — you assume someone might barge in, so you lock it every time, even if the building is empty*. It\'s safe but slow (*others must wait*).\n\n**Optimistic locking** (`CAS`/`StampedLock`) is like *checking if the bathroom is occupied first — you try the door handle, and if it\'s free, you go in*. If someone got there first, you wait briefly and try again. *It\'s faster when contention is low because you avoid the overhead of locking/unlocking.*\n\n**ReadWriteLock** is like *having a "viewing gallery" bathroom — multiple people can look in (read) at the same time, but only one person can use it (write) at a time, and everyone must leave before that person enters*.'
        }
      ],
      codeExamples: [
        {
          title: 'Lock Patterns',
          language: 'java',
          code: `// ReentrantLock with try-finally
private final ReentrantLock lock = new ReentrantLock();
public void update() {
    lock.lock();
    try {
        // critical section
    } finally {
        lock.unlock(); // always in finally!
    }
}

// tryLock — non-blocking
if (lock.tryLock(1, TimeUnit.SECONDS)) {
    try { /* critical section */ }
    finally { lock.unlock(); }
} else {
    // handle timeout — do something else
}

// ReadWriteLock — concurrent readers
private final ReadWriteLock rwLock = new ReentrantReadWriteLock();
public String read() {
    rwLock.readLock().lock(); // multiple readers allowed
    try { return data; }
    finally { rwLock.readLock().unlock(); }
}
public void write(String value) {
    rwLock.writeLock().lock(); // exclusive access
    try { data = value; }
    finally { rwLock.writeLock().unlock(); }
}

// StampedLock — optimistic read (Java 8+)
private final StampedLock sl = new StampedLock();
public double readOptimistic() {
    long stamp = sl.tryOptimisticRead(); // no lock!
    double x = this.x, y = this.y;
    if (!sl.validate(stamp)) {           // check if write occurred
        stamp = sl.readLock();           // fall back to read lock
        try { x = this.x; y = this.y; }
        finally { sl.unlockRead(stamp); }
    }
    return Math.sqrt(x * x + y * y);
}`
        },
        {
          title: 'Deadlock Detection and Prevention',
          language: 'java',
          code: `// Deadlock example and prevention strategies
public class DeadlockPrevention {

    // BAD: Classic deadlock — inconsistent lock ordering
    static final Object lockA = new Object();
    static final Object lockB = new Object();

    static void deadlockDemo() {
        new Thread(() -> {
            synchronized (lockA) {    // holds A, waits for B
                try { Thread.sleep(50); } catch (InterruptedException e) {}
                synchronized (lockB) { System.out.println("Thread 1"); }
            }
        }).start();

        new Thread(() -> {
            synchronized (lockB) {    // holds B, waits for A → DEADLOCK
                try { Thread.sleep(50); } catch (InterruptedException e) {}
                synchronized (lockA) { System.out.println("Thread 2"); }
            }
        }).start();
    }

    // FIX 1: Consistent lock ordering — always acquire in the same order
    static void fixedWithOrdering() {
        Runnable task = () -> {
            synchronized (lockA) {   // both threads lock A first
                synchronized (lockB) {
                    System.out.println(Thread.currentThread().getName());
                }
            }
        };
        new Thread(task, "T1").start();
        new Thread(task, "T2").start();
    }

    // FIX 2: tryLock with timeout — detect and back off
    static final ReentrantLock lock1 = new ReentrantLock();
    static final ReentrantLock lock2 = new ReentrantLock();

    static boolean tryBothLocks() throws InterruptedException {
        boolean gotLock1 = false, gotLock2 = false;
        try {
            gotLock1 = lock1.tryLock(100, TimeUnit.MILLISECONDS);
            gotLock2 = lock2.tryLock(100, TimeUnit.MILLISECONDS);
        } finally {
            if (!(gotLock1 && gotLock2)) {
                if (gotLock1) lock1.unlock();
                if (gotLock2) lock2.unlock();
                return false; // back off and retry
            }
        }
        try {
            // critical section with both locks
            return true;
        } finally {
            lock1.unlock();
            lock2.unlock();
        }
    }

    // Programmatic deadlock detection via ThreadMXBean
    static void detectDeadlocks() {
        ThreadMXBean bean = ManagementFactory.getThreadMXBean();
        long[] deadlockedThreads = bean.findDeadlockedThreads();
        if (deadlockedThreads != null) {
            ThreadInfo[] infos = bean.getThreadInfo(deadlockedThreads, true, true);
            for (ThreadInfo info : infos) {
                System.err.println("Deadlocked thread: " + info.getThreadName());
                System.err.println("  Waiting for: " + info.getLockName());
                System.err.println("  Held by: " + info.getLockOwnerName());
            }
        }
    }
}`
        }
      ]
    },
    {
      id: 'aqs',
      title: 'AQS (AbstractQueuedSynchronizer)',
      description: 'The framework behind ReentrantLock, CountDownLatch, Semaphore — CLH queue, state management, and custom synchronizers.',
      categoryId: 'concurrency',
      icon: '🏗️',
      difficulty: 'Advanced',
      tags: ['AQS', 'AbstractQueuedSynchronizer', 'CLH Queue', 'Synchronizer', 'CountDownLatch', 'Semaphore', 'CyclicBarrier', 'Phaser', 'LockSupport'],
      content: [
        {
          heading: 'What is AQS',
          body: '**AQS** is an abstract framework for building lock and synchronization primitives. It manages a `volatile int` `state` and a **FIFO wait queue** (*variant of CLH queue*).\n\nBuilt-in synchronizers using AQS: `ReentrantLock`, `ReentrantReadWriteLock`, `CountDownLatch`, `Semaphore`, `CyclicBarrier` (*indirectly*).\nTo build custom synchronizers, extend AQS and override `tryAcquire`/`tryRelease` (*exclusive*) or `tryAcquireShared`/`tryReleaseShared` (*shared*).'
        },
        {
          heading: 'State Management',
          body: 'The `state` field (`volatile int`) represents the synchronization state.\n`ReentrantLock`: state = number of holds (*0 = unlocked, 1+ = locked/reentrant*).\n`Semaphore`: state = available permits.\n`CountDownLatch`: state = count remaining.\n`ReentrantReadWriteLock`: high 16 bits = read holds, low 16 bits = write holds.\n\nState is modified via CAS: `compareAndSetState(expect, update)`.'
        },
        {
          heading: 'CLH Wait Queue',
          body: 'Threads that fail to acquire form a **FIFO queue** of `Node` objects. Each `Node` contains: thread reference, wait status (`CANCELLED`, `SIGNAL`, `CONDITION`, `PROPAGATE`), prev/next pointers.\n\nWhen the lock holder releases, it unparks (wakes up) the head\'s successor. Threads waiting in the queue are parked using `LockSupport.park()` — which uses `Unsafe.park()` under the hood.'
        },
        {
          heading: 'CountDownLatch, Semaphore, CyclicBarrier',
          body: '`CountDownLatch`: one-shot barrier — threads wait until count reaches 0 (*cannot be reset*).\n`Semaphore`: controls access to a pool of resources — `acquire()` decrements permits, `release()` increments.\n`CyclicBarrier`: all threads wait at the barrier until everyone arrives, then all proceed (*can be reset and reused*).\n\nThese are built on **AQS shared mode**.'
        },
        {
          heading: 'Simplified Explanation',
          body: '**AQS** can feel intimidating, but at its core it\'s just three things:\n1) A single integer (`state`) that represents "who owns this lock" or "how many permits are left."\n2) A waiting line (**FIFO queue**) where threads go to sleep when they can\'t get what they want.\n3) **CAS** (atomic compare-and-swap) to safely update the state without locks.\n\nHere\'s how the built-in tools use it:\n`ReentrantLock` — state counts how many times the owner locked it (*0 = free, 1+ = locked*). A thread tries `CAS(0→1)`. If it works, you own it. If not, get in line.\n`Semaphore` — state is the number of available permits. `acquire()` does `CAS(n→n-1)`. If permits reach 0, get in line.\n`CountDownLatch` — state is the count. `countDown()` does `CAS(n→n-1)`. `await()` blocks until state reaches 0.\n\nYou don\'t need to understand AQS internals to use these tools, but knowing the pattern (*try CAS → succeed or queue up → wake up and retry*) helps you reason about their behavior under contention.'
        }
      ],
      codeExamples: [
        {
          title: 'AQS-Based Synchronizers',
          language: 'java',
          code: `// CountDownLatch — wait for N tasks to complete
CountDownLatch latch = new CountDownLatch(3);
for (int i = 0; i < 3; i++) {
    executor.submit(() -> {
        try { doWork(); }
        finally { latch.countDown(); }
    });
}
latch.await(10, TimeUnit.SECONDS); // blocks until count reaches 0

// Semaphore — rate limiting / resource pool
Semaphore semaphore = new Semaphore(10); // max 10 concurrent
public void processRequest() throws InterruptedException {
    semaphore.acquire();
    try { handleRequest(); }
    finally { semaphore.release(); }
}

// CyclicBarrier — parallel phase computation
CyclicBarrier barrier = new CyclicBarrier(4, () -> mergeResults());
for (int i = 0; i < 4; i++) {
    executor.submit(() -> {
        computePartialResult();
        barrier.await(); // wait for all 4 threads
        // all threads proceed after barrier action
    });
}

// Custom synchronizer (simple mutex)
public class SimpleMutex extends AbstractQueuedSynchronizer {
    @Override protected boolean tryAcquire(int arg) {
        return compareAndSetState(0, 1); // CAS: 0 -> 1
    }
    @Override protected boolean tryRelease(int arg) {
        setState(0); // no CAS needed — only holder calls release
        return true;
    }
}`
        },
        {
          title: 'Phaser — Flexible CyclicBarrier',
          language: 'java',
          code: `// Phaser: a more flexible alternative to CyclicBarrier
// Supports dynamic registration/deregistration and multiple phases
public class PhaserDemo {
    public static void main(String[] args) {
        Phaser phaser = new Phaser(1); // register self (main thread)

        for (int i = 0; i < 3; i++) {
            phaser.register(); // dynamically add a party
            final int workerId = i;
            new Thread(() -> {
                // Phase 0: Load data
                System.out.printf("Worker %d loading data%n", workerId);
                phaser.arriveAndAwaitAdvance();

                // Phase 1: Process data
                System.out.printf("Worker %d processing%n", workerId);
                phaser.arriveAndAwaitAdvance();

                // Phase 2: Cleanup
                System.out.printf("Worker %d cleaning up%n", workerId);
                phaser.arriveAndDeregister(); // done — leave the phaser
            }, "worker-" + i).start();
        }

        // Main thread coordinates phases
        phaser.arriveAndAwaitAdvance(); // Phase 0 complete
        System.out.println("=== All data loaded ===");
        phaser.arriveAndAwaitAdvance(); // Phase 1 complete
        System.out.println("=== All processing done ===");
        phaser.arriveAndDeregister();   // Main thread leaves
        System.out.println("Phaser terminated: " + phaser.isTerminated());

        // Phaser with termination condition — auto-stop after N phases
        Phaser tieredPhaser = new Phaser(4) {
            @Override
            protected boolean onAdvance(int phase, int registeredParties) {
                System.out.println("Phase " + phase + " complete");
                return phase >= 2 || registeredParties == 0;
            }
        };
    }
}`
        }
      ]
    },
    {
      id: 'cas-atomic',
      title: 'CAS & Atomic Classes',
      description: 'Compare-And-Swap operation, ABA problem, AtomicInteger/Long/Reference, LongAdder, and lock-free programming.',
      categoryId: 'concurrency',
      icon: '⚛️',
      difficulty: 'Advanced',
      tags: ['CAS', 'Atomic', 'AtomicInteger', 'LongAdder', 'Lock-Free', 'ABA Problem', 'AtomicReference', 'Striped64', 'Compare-And-Swap'],
      content: [
        {
          heading: 'CAS Operation',
          body: '**Compare-And-Swap** (**CAS**) is a CPU-level atomic instruction: `CAS(address, expectedValue, newValue)`. It atomically checks if the value at the address equals expected, and if so, replaces it with newValue. Returns success/failure.\n\nNo lock is needed — *this is the foundation of all lock-free algorithms in Java*. On x86, implemented via `CMPXCHG` instruction.'
        },
        {
          heading: 'Atomic Classes',
          body: '`java.util.concurrent.atomic` provides: `AtomicInteger`, `AtomicLong`, `AtomicBoolean`, `AtomicReference<V>`, `AtomicIntegerArray`, `AtomicLongArray`, `AtomicReferenceArray`.\n\nKey methods: `get()`, `set()`, `compareAndSet(expect, update)`, `getAndIncrement()`, `incrementAndGet()`, `getAndUpdate(UnaryOperator)`, `updateAndGet(UnaryOperator)`, `accumulateAndGet(x, BinaryOperator)`.'
        },
        {
          heading: 'ABA Problem',
          body: 'CAS can be fooled: if value changes from A→B→A, CAS sees A and succeeds, *not knowing the value was modified in between*. Usually harmless for simple counters but dangerous for pointer-based structures (*e.g., lock-free stack*).\n\nSolutions: `AtomicStampedReference` (*tracks version number alongside value*), `AtomicMarkableReference` (*tracks boolean mark*).'
        },
        {
          heading: 'LongAdder & Striped64',
          body: '`AtomicLong` has contention issues under high write throughput — *all threads CAS on the same value*.\n\n`LongAdder` solves this by partitioning the count across multiple cells (`Striped64` base class). Each thread typically updates its own cell (*hash-based*). `sum()` aggregates all cells. *2-10x faster than `AtomicLong` under high contention.*\n\nUse `LongAdder` for counters/statistics; `AtomicLong` when you need the exact value at a specific point.'
        },
        {
          heading: 'Real-World Analogy',
          body: 'Imagine *a vending machine*. You see a soda in slot A3 (*read the current value*). You insert your money and press A3 (*expected value = soda is still there, new value = your purchase*).\n\nBut between looking and pressing, another person bought the last soda (*the value changed*). The machine rejects your transaction — *"item no longer available"* (**CAS fails**). You don\'t lose your money; you just look at the machine again, pick a different slot, and try again (*retry loop*).\n\nThis is exactly how **CAS** works: *read → compare → swap*. If the value changed between your read and your swap attempt, the operation fails atomically and you retry. No locks needed — the CPU hardware guarantees the compare-and-swap is a single indivisible operation.'
        }
      ],
      codeExamples: [
        {
          title: 'Atomic Operations',
          language: 'java',
          code: `// AtomicInteger — lock-free counter
AtomicInteger counter = new AtomicInteger(0);
counter.incrementAndGet();     // atomic i++
counter.compareAndSet(1, 10);  // atomic CAS

// AtomicReference — lock-free object swap
AtomicReference<Config> configRef = new AtomicReference<>(loadConfig());
Config oldConfig = configRef.get();
Config newConfig = reloadConfig();
configRef.compareAndSet(oldConfig, newConfig); // atomic swap

// Custom lock-free update with retry loop
AtomicInteger balance = new AtomicInteger(100);
int amount = 30;
int prev, next;
do {
    prev = balance.get();
    next = prev - amount;
    if (next < 0) throw new InsufficientFundsException();
} while (!balance.compareAndSet(prev, next)); // retry if contended

// LongAdder — high-throughput counter
LongAdder requestCount = new LongAdder();
requestCount.increment();    // thread-local cell update
requestCount.sum();          // aggregate all cells

// AtomicStampedReference — solves ABA problem
AtomicStampedReference<String> ref =
    new AtomicStampedReference<>("initial", 0);
int[] stampHolder = new int[1];
String value = ref.get(stampHolder);
ref.compareAndSet(value, "updated", stampHolder[0], stampHolder[0] + 1);`
        },
        {
          title: 'Lock-Free Stack with AtomicReference',
          language: 'java',
          code: `// A lock-free (non-blocking) stack using CAS and AtomicReference
public class LockFreeStack<E> {
    private static class Node<E> {
        final E item;
        Node<E> next;
        Node(E item, Node<E> next) {
            this.item = item;
            this.next = next;
        }
    }

    private final AtomicReference<Node<E>> top = new AtomicReference<>();

    public void push(E item) {
        Node<E> newHead = new Node<>(item, null);
        Node<E> oldHead;
        do {
            oldHead = top.get();
            newHead.next = oldHead;
        } while (!top.compareAndSet(oldHead, newHead)); // CAS retry loop
    }

    public E pop() {
        Node<E> oldHead;
        Node<E> newHead;
        do {
            oldHead = top.get();
            if (oldHead == null) return null; // stack is empty
            newHead = oldHead.next;
        } while (!top.compareAndSet(oldHead, newHead)); // CAS retry loop
        return oldHead.item;
    }

    public E peek() {
        Node<E> head = top.get();
        return head != null ? head.item : null;
    }

    public boolean isEmpty() {
        return top.get() == null;
    }

    public static void main(String[] args) throws InterruptedException {
        LockFreeStack<Integer> stack = new LockFreeStack<>();
        int threads = 10, opsPerThread = 10_000;
        CountDownLatch latch = new CountDownLatch(threads);

        for (int t = 0; t < threads; t++) {
            new Thread(() -> {
                for (int i = 0; i < opsPerThread; i++) {
                    stack.push(i);
                    stack.pop();
                }
                latch.countDown();
            }).start();
        }

        latch.await();
        System.out.println("All operations complete, stack empty: " + stack.isEmpty());
    }
}`
        }
      ]
    },
    {
      id: 'threadlocal',
      title: 'ThreadLocal',
      description: 'Thread-local variables, usage patterns, memory leak pitfalls, and InheritableThreadLocal.',
      categoryId: 'concurrency',
      icon: '📌',
      difficulty: 'Intermediate',
      tags: ['ThreadLocal', 'Memory Leak', 'InheritableThreadLocal', 'Thread Confinement', 'Request Context', 'Weak Reference'],
      content: [
        {
          heading: 'What is ThreadLocal',
          body: '`ThreadLocal<T>` provides **thread-confined variables** — each thread has its own independent copy. No synchronization needed since threads don\'t share the value.\n\nInternally, each `Thread` has a `ThreadLocalMap` (hash map) that stores ThreadLocal→value mappings. Access is O(1).\n\nCommon use cases: per-thread database connections, `SimpleDateFormat` instances, request context (*user ID, trace ID*).'
        },
        {
          heading: 'Memory Leak Problem',
          body: '`ThreadLocalMap` uses **weak references** for keys (the `ThreadLocal` itself) but **strong references** for values. If the `ThreadLocal` variable is GC\'d (*no strong reference*), the key becomes null but the value is still strongly held by the `ThreadLocalMap` entry — *creating a memory leak*.\n\nThis is especially dangerous with **thread pools** where threads are long-lived. The value is never collected until the thread dies or another `set`/`get` cleans up stale entries.'
        },
        {
          heading: 'Best Practices',
          body: 'ALWAYS call `threadLocal.remove()` when done (*especially in thread pools*) — use `try-finally`.\nDeclare `ThreadLocal` as `private static final` to ensure one instance per class.\nPrefer `ThreadLocal.withInitial(Supplier)` (Java 8+) for lazy initialization.\nIn Spring, use `RequestContextHolder` or custom interceptors that clean up automatically.'
        },
        {
          heading: 'InheritableThreadLocal',
          body: '`InheritableThreadLocal` copies the parent thread\'s value to child threads at creation time. Useful for propagating context (*trace IDs, security context*) to child threads.\n\nLimitation: only copies at thread creation — *not useful with thread pools (threads are reused, not created per task)*. For thread pools, use Alibaba\'s `TransmittableThreadLocal` or manually pass context.'
        },
        {
          heading: 'Real-World Analogy',
          body: 'Think of `ThreadLocal` like *personal lockers at a gym*. Every member (thread) gets their own locker (*ThreadLocal storage*) — they can put their belongings in it, and no one else can access it. You don\'t need a lock on the locker because it\'s already exclusively yours.\n\nWhen you leave the gym (*thread completes*), your locker should be emptied (`remove()`). The **memory leak** problem is like *a gym that reuses lockers for new members (thread pool) but never cleans them out — the previous member\'s stuff (old values) accumulates forever*.\n\nThat\'s why the golden rule is: always clean out your locker (*call `remove()` in a `try-finally`*) when you\'re done, especially at a busy gym (*thread pool*).'
        }
      ],
      codeExamples: [
        {
          title: 'ThreadLocal Usage and Cleanup',
          language: 'java',
          code: `// ThreadLocal with initial value
private static final ThreadLocal<SimpleDateFormat> DATE_FORMAT =
    ThreadLocal.withInitial(() -> new SimpleDateFormat("yyyy-MM-dd"));

// Request context propagation
public class RequestContext {
    private static final ThreadLocal<RequestContext> CONTEXT =
        new ThreadLocal<>();

    private final String traceId;
    private final String userId;

    private RequestContext(String traceId, String userId) {
        this.traceId = traceId;
        this.userId = userId;
    }

    public static void set(String traceId, String userId) {
        CONTEXT.set(new RequestContext(traceId, userId));
    }

    public static RequestContext get() { return CONTEXT.get(); }

    public static void clear() { CONTEXT.remove(); } // CRITICAL!
}

// Servlet filter — always remove in finally
public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) {
    try {
        RequestContext.set(extractTraceId(req), extractUserId(req));
        chain.doFilter(req, res);
    } finally {
        RequestContext.clear(); // prevent memory leak in thread pool!
    }
}`
        },
        {
          title: 'Thread-Safe Date Formatter with ThreadLocal',
          language: 'java',
          code: `// SimpleDateFormat is NOT thread-safe — sharing it causes corrupt dates.
// ThreadLocal gives each thread its own instance without synchronization.
public class SafeDateFormatter {
    private static final ThreadLocal<SimpleDateFormat> FORMATTER =
        ThreadLocal.withInitial(() -> {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
            return sdf;
        });

    public static String format(Date date) {
        return FORMATTER.get().format(date);
    }

    public static Date parse(String text) throws ParseException {
        return FORMATTER.get().parse(text);
    }

    public static void main(String[] args) throws InterruptedException {
        Date testDate = new Date();
        int threads = 20;
        CountDownLatch latch = new CountDownLatch(threads);
        Set<String> results = ConcurrentHashMap.newKeySet();

        for (int i = 0; i < threads; i++) {
            new Thread(() -> {
                try {
                    for (int j = 0; j < 1000; j++) {
                        String formatted = SafeDateFormatter.format(testDate);
                        results.add(formatted);
                    }
                } finally {
                    FORMATTER.remove(); // cleanup in thread pool environments!
                    latch.countDown();
                }
            }).start();
        }

        latch.await();
        // With ThreadLocal: always 1 unique result (correct)
        // Without ThreadLocal (shared SDF): random garbled dates
        System.out.println("Unique results: " + results.size()); // 1
    }

    // NOTE: In Java 8+, prefer java.time.DateTimeFormatter which is
    // immutable and thread-safe — no ThreadLocal needed.
    // DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
}`
        }
      ]
    },
    {
      id: 'completable-future',
      title: 'CompletableFuture',
      description: 'Composable async programming — chaining, combining, error handling, timeouts, and best practices.',
      categoryId: 'concurrency',
      icon: '🔮',
      difficulty: 'Advanced',
      tags: ['CompletableFuture', 'Async', 'Composition', 'Non-Blocking', 'Future', 'thenApply', 'thenCompose', 'Error Handling', 'Timeout'],
      content: [
        {
          heading: 'Overview',
          body: '`CompletableFuture` (Java 8+) provides a powerful API for **asynchronous programming**. Unlike `Future`, it supports non-blocking chaining, combining multiple futures, and error handling without blocking. *It\'s Java\'s equivalent of Promises in JavaScript.*\n\nDefault executor: `ForkJoinPool.commonPool()` — override with custom executor for production.'
        },
        {
          heading: 'Creating and Chaining',
          body: 'Create: `supplyAsync(Supplier)` — returns value, `runAsync(Runnable)` — no return.\nChain: `thenApply(Function)` — sync transform, `thenCompose(Function)` — flatMap for nested `CompletableFuture`, `thenAccept(Consumer)` — consume result, `thenRun(Runnable)` — side effect.\n\n`*Async` variants (`thenApplyAsync`) run on a different thread. Handle null carefully — *NPE in chains are hard to debug*.'
        },
        {
          heading: 'Combining Futures',
          body: '`thenCombine(other, BiFunction)` — combine two independent futures.\n`allOf(futures...)` — wait for all (*returns Void*).\n`anyOf(futures...)` — wait for first to complete.\n\nFor collecting results from `allOf`, manually get each: `allOf(f1,f2).thenApply(v -> List.of(f1.join(), f2.join()))`.\nJava 9+: `completeOnTimeout(value, timeout, unit)`, `orTimeout(timeout, unit)`.'
        },
        {
          heading: 'Error Handling',
          body: '`exceptionally(Function<Throwable, T>)` — recover from errors (*like catch*).\n`handle(BiFunction<T, Throwable, U>)` — process both result and error.\n`whenComplete(BiConsumer<T, Throwable>)` — side effects on completion (*doesn\'t change the result*).\n\nErrors propagate through the chain until handled. Always add error handling — *unhandled exceptions are silently swallowed!*'
        },
        {
          heading: 'Real-World Analogy',
          body: '`CompletableFuture` is like *ordering food delivery*. You place the order — `supplyAsync(() -> orderPizza())`. This returns immediately; you don\'t stand at the door waiting.\n\nInstead, you describe what should happen at each step:\n*"When the food arrives, heat it up"* — `thenApply(food -> microwave(food))`.\n*"Then serve it on a plate"* — `thenApply(hot -> plate(hot))`.\n*"Then eat it"* — `thenAccept(meal -> eat(meal))`.\n\nYou can even combine deliveries: *"When BOTH the pizza AND the drinks arrive, start the party"* — `thenCombine(drinksFuture, (pizza, drinks) -> party())`.\nIf anything goes wrong (*wrong order, late delivery*), you have a backup — `exceptionally(error -> orderBackupMeal())`.\n\nThe key insight: *you set up the entire pipeline upfront, and it executes asynchronously as results become available, without blocking your main thread.*'
        }
      ],
      codeExamples: [
        {
          title: 'CompletableFuture Patterns',
          language: 'java',
          code: `// Async composition with custom executor
ExecutorService executor = Executors.newFixedThreadPool(10);

CompletableFuture<UserProfile> profile =
    CompletableFuture.supplyAsync(() -> fetchUser(id), executor)
        .thenCombine(
            CompletableFuture.supplyAsync(() -> fetchOrders(id), executor),
            UserProfile::new
        )
        .orTimeout(5, TimeUnit.SECONDS)     // Java 9: timeout
        .exceptionally(ex -> {
            log.error("Profile load failed", ex);
            return UserProfile.empty();
        });

// Chain dependent async operations
CompletableFuture.supplyAsync(() -> findBestPrice("flight"), executor)
    .thenCompose(price -> applyDiscountAsync(price)) // flatMap
    .thenApply(this::formatCurrency)
    .thenAccept(this::displayResult);

// Collect results from multiple futures
List<CompletableFuture<String>> futures = urls.stream()
    .map(url -> CompletableFuture.supplyAsync(() -> fetch(url), executor))
    .toList();

CompletableFuture<List<String>> allResults =
    CompletableFuture.allOf(futures.toArray(CompletableFuture[]::new))
        .thenApply(v -> futures.stream()
            .map(CompletableFuture::join)
            .toList());`
        },
        {
          title: 'Retry with Exponential Backoff',
          language: 'java',
          code: `// Generic retry utility using CompletableFuture with exponential backoff
public class AsyncRetry {

    public static <T> CompletableFuture<T> withRetry(
            Supplier<CompletableFuture<T>> task,
            int maxRetries,
            Duration initialDelay,
            ScheduledExecutorService scheduler) {
        return task.get()
            .thenApply(CompletableFuture::completedFuture)
            .exceptionally(ex -> retry(task, maxRetries, 1, initialDelay, scheduler, ex))
            .thenCompose(Function.identity());
    }

    private static <T> CompletableFuture<T> retry(
            Supplier<CompletableFuture<T>> task,
            int maxRetries, int attempt,
            Duration delay,
            ScheduledExecutorService scheduler,
            Throwable lastError) {

        if (attempt > maxRetries) {
            return CompletableFuture.failedFuture(lastError);
        }

        CompletableFuture<T> future = new CompletableFuture<>();
        long delayMs = delay.toMillis() * (1L << (attempt - 1)); // exponential

        scheduler.schedule(() -> {
            task.get().whenComplete((result, ex) -> {
                if (ex == null) {
                    future.complete(result);
                } else {
                    retry(task, maxRetries, attempt + 1, delay, scheduler, ex)
                        .whenComplete((r, e) -> {
                            if (e != null) future.completeExceptionally(e);
                            else future.complete(r);
                        });
                }
            });
        }, delayMs, TimeUnit.MILLISECONDS);

        return future;
    }

    public static void main(String[] args) throws Exception {
        ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
        AtomicInteger attempts = new AtomicInteger();

        CompletableFuture<String> result = withRetry(
            () -> CompletableFuture.supplyAsync(() -> {
                int attempt = attempts.incrementAndGet();
                System.out.printf("Attempt %d at %s%n", attempt, Instant.now());
                if (attempt < 3) throw new RuntimeException("Service unavailable");
                return "Success on attempt " + attempt;
            }),
            5,                      // max retries
            Duration.ofMillis(100), // initial delay (100ms, 200ms, 400ms...)
            scheduler
        );

        System.out.println(result.get(10, TimeUnit.SECONDS));
        scheduler.shutdown();
    }
}`
        }
      ]
    },
    {
      id: 'virtual-threads',
      title: 'Virtual Threads (Project Loom)',
      description: 'Java 21\'s lightweight threads — scalability without complexity, structured concurrency, and migration guide.',
      categoryId: 'concurrency',
      icon: '🚀',
      difficulty: 'Advanced',
      tags: ['Virtual Threads', 'Project Loom', 'Java 21', 'Structured Concurrency', 'Carrier Thread', 'Pinning', 'Scalability', 'IO-Bound'],
      content: [
        {
          heading: 'Overview',
          body: '**Virtual threads** (Java 21) are lightweight threads managed by the JVM, not the OS. They enable creating millions of concurrent threads without the overhead of platform threads.\n\nWrite synchronous blocking code that scales like async — *no callback hell, no reactive complexity*. This is Java\'s answer to Go goroutines and Kotlin coroutines.'
        },
        {
          heading: 'Platform vs Virtual Threads',
          body: '**Platform threads**: 1:1 with OS threads, ~1MB stack, limited to thousands, expensive context switches.\n**Virtual threads**: M:N scheduling on carrier threads (`ForkJoinPool`), ~few KB initial stack (*grows as needed*), millions possible, cheap to create and block.\n\nWhen a virtual thread blocks (IO, sleep, lock), it **unmounts** from the carrier thread, freeing it for other virtual threads.'
        },
        {
          heading: 'Creating and Using',
          body: '`Thread.ofVirtual().start(runnable)`, `Thread.startVirtualThread(runnable)`, or `Executors.newVirtualThreadPerTaskExecutor()`.\n\nDon\'t pool virtual threads — *create a new one per task*. Virtual threads are always daemon threads, have no meaningful priority. They work seamlessly with existing Java APIs (*JDBC, HTTP clients, file I/O*).'
        },
        {
          heading: 'Pinning and Pitfalls',
          body: '**Carrier thread pinning**: `synchronized` blocks pin the virtual thread to the carrier (*cannot unmount*). Use `ReentrantLock` instead of `synchronized` on virtual threads.\n\nOther causes of pinning: native methods, JNI calls. Monitor pinning with `-Djdk.tracePinnedThreads=full`.\nCPU-bound tasks don\'t benefit from virtual threads — *use platform threads*.\n`ThreadLocal` works but creates per-virtual-thread copies (*memory concern with millions of threads*) — prefer **scoped values** (*preview*).'
        },
        {
          heading: 'Structured Concurrency (Preview)',
          body: '`StructuredTaskScope` (*preview in Java 21+*) treats concurrent tasks as a unit.\n`ShutdownOnFailure`: cancels remaining tasks on first failure.\n`ShutdownOnSuccess`: cancels remaining on first success.\n\nEnsures no task outlives the scope — *eliminates thread leak and orphaned tasks*. Combined with virtual threads, this is the future of concurrent Java programming.'
        },
        {
          heading: 'When to Use Virtual Threads',
          body: 'Use virtual threads for **IO-bound workloads**: HTTP servers handling thousands of concurrent requests, database-heavy applications with many blocking JDBC calls, microservices calling multiple downstream APIs, file I/O operations, and any task that spends most of its time waiting.\n\nDo NOT use virtual threads for **CPU-bound workloads** (*math, encryption, compression, image processing*) — they offer no benefit since the bottleneck is CPU, not thread count. Avoid with `synchronized` blocks (*causes carrier thread pinning — use `ReentrantLock` instead*). Avoid pooling virtual threads — *they are cheap to create, so use one-per-task via `Executors.newVirtualThreadPerTaskExecutor()`*. Be cautious with `ThreadLocal` — *millions of virtual threads means millions of copies*.\n\nMigration checklist:\n1) Replace `Executors.newFixedThreadPool()` with `newVirtualThreadPerTaskExecutor()`.\n2) Replace `synchronized` with `ReentrantLock`.\n3) Replace `ThreadLocal` with scoped values (*when stable*).\n4) Test under load to verify pinning with `-Djdk.tracePinnedThreads=full`.'
        }
      ],
      codeExamples: [
        {
          title: 'Virtual Threads in Action',
          language: 'java',
          code: `// Virtual thread per task — scales to millions
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    List<Future<String>> futures = IntStream.range(0, 100_000)
        .mapToObj(i -> executor.submit(() -> {
            Thread.sleep(Duration.ofSeconds(1));
            return fetchData("https://api.example.com/" + i);
        }))
        .toList();
    // All 100,000 requests complete in ~1 second (not 100,000 seconds)
}

// Spring Boot 3.2+ — enable virtual threads
// application.properties: spring.threads.virtual.enabled=true
// All request handling threads become virtual automatically

// Structured concurrency (preview)
record UserProfile(User user, List<Order> orders) {}

UserProfile fetchProfile(long userId) throws Exception {
    try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
        Subtask<User> user = scope.fork(() -> fetchUser(userId));
        Subtask<List<Order>> orders = scope.fork(() -> fetchOrders(userId));
        scope.join().throwIfFailed(); // wait for both, fail fast
        return new UserProfile(user.get(), orders.get());
    }
}

// IMPORTANT: Use ReentrantLock instead of synchronized
private final ReentrantLock lock = new ReentrantLock(); // NOT synchronized!
public void update() {
    lock.lock();
    try { /* critical section */ }
    finally { lock.unlock(); }
}`
        },
        {
          title: 'Migrating from Platform Thread Pool to Virtual Threads',
          language: 'java',
          code: `// BEFORE: Traditional platform thread pool (limited scalability)
public class PlatformThreadServer {
    private final ExecutorService pool = Executors.newFixedThreadPool(200);

    public void handleRequest(Socket socket) {
        pool.submit(() -> {
            try (var in = socket.getInputStream();
                 var out = socket.getOutputStream()) {
                byte[] data = in.readAllBytes();      // blocking IO
                byte[] result = queryDatabase(data);   // blocking IO
                out.write(result);                     // blocking IO
            } catch (IOException e) {
                log.error("Request failed", e);
            }
        });
    }
    // Limited to ~200 concurrent requests by thread pool size
}

// AFTER: Virtual threads (scales to thousands of concurrent requests)
public class VirtualThreadServer {
    private final ExecutorService pool =
        Executors.newVirtualThreadPerTaskExecutor();

    public void handleRequest(Socket socket) {
        pool.submit(() -> {
            try (var in = socket.getInputStream();
                 var out = socket.getOutputStream()) {
                byte[] data = in.readAllBytes();      // virtual thread unmounts
                byte[] result = queryDatabase(data);   // virtual thread unmounts
                out.write(result);                     // virtual thread unmounts
            } catch (IOException e) {
                log.error("Request failed", e);
            }
        });
    }
    // Scales to 100,000+ concurrent requests — each blocking call
    // unmounts the virtual thread, freeing the carrier for other work
}

// BEFORE: synchronized (causes pinning with virtual threads)
public class OldService {
    public synchronized void process() { /* pins carrier thread */ }
}

// AFTER: ReentrantLock (virtual-thread friendly)
public class NewService {
    private final ReentrantLock lock = new ReentrantLock();
    public void process() {
        lock.lock();
        try { /* virtual thread can unmount while waiting for lock */ }
        finally { lock.unlock(); }
    }
}

// Quick benchmark: Platform vs Virtual threads
public static void benchmark() throws InterruptedException {
    int taskCount = 10_000;
    Runnable ioTask = () -> {
        try { Thread.sleep(Duration.ofSeconds(1)); }
        catch (InterruptedException e) { Thread.currentThread().interrupt(); }
    };

    // Platform threads: ~50 seconds (10,000 tasks / 200 threads)
    long start = System.nanoTime();
    try (var pool = Executors.newFixedThreadPool(200)) {
        for (int i = 0; i < taskCount; i++) pool.submit(ioTask);
    }
    System.out.printf("Platform: %dms%n", (System.nanoTime() - start) / 1_000_000);

    // Virtual threads: ~1 second (all 10,000 run concurrently)
    start = System.nanoTime();
    try (var pool = Executors.newVirtualThreadPerTaskExecutor()) {
        for (int i = 0; i < taskCount; i++) pool.submit(ioTask);
    }
    System.out.printf("Virtual: %dms%n", (System.nanoTime() - start) / 1_000_000);
}`
        }
      ]
    },
    {
      id: 'concurrent-collections',
      title: 'Concurrent Collections',
      description: 'ConcurrentHashMap, CopyOnWriteArrayList, BlockingQueue, ConcurrentLinkedQueue — thread-safe collections.',
      categoryId: 'concurrency',
      icon: '📦',
      difficulty: 'Intermediate',
      tags: ['ConcurrentHashMap', 'BlockingQueue', 'CopyOnWriteArrayList', 'Thread-Safe', 'Producer-Consumer', 'DelayQueue', 'SynchronousQueue', 'ConcurrentLinkedQueue'],
      content: [
        {
          heading: 'Overview',
          body: '`java.util.concurrent` provides **concurrent collections** that are thread-safe without external synchronization. They outperform synchronized wrappers (`Collections.synchronizedXxx`) by using fine-grained locking, CAS, or copy-on-write strategies.\n\nChoose based on your access pattern: *read-heavy, write-heavy, or producer-consumer*.'
        },
        {
          heading: 'CopyOnWriteArrayList',
          body: 'Creates a new copy of the underlying array on every write (`add`, `set`, `remove`). Reads are **lock-free** and always see a consistent snapshot. Iterators never throw `ConcurrentModificationException`.\n\nIdeal for: small lists, read-heavy (*listeners, observers*), iterate-while-modify.\nTerrible for: large lists, write-heavy (*O(n) copy on every write*).\n*Thread-safe alternative to `synchronizedList` for read-dominated scenarios.*'
        },
        {
          heading: 'BlockingQueue Implementations',
          body: '`ArrayBlockingQueue`: bounded, array-backed, single lock.\n`LinkedBlockingQueue`: optionally bounded, linked nodes, two locks (*put/take*).\n`PriorityBlockingQueue`: unbounded, heap-based, priority ordering.\n`DelayQueue`: elements available only after their delay expires.\n`SynchronousQueue`: zero capacity — producer blocks until consumer takes.\n`LinkedTransferQueue`: most versatile, supports `transfer()` for direct handoff.'
        },
        {
          heading: 'Producer-Consumer Pattern',
          body: '`BlockingQueue` is the standard way to implement **producer-consumer**.\n`put()`: blocks if queue is full.\n`take()`: blocks if queue is empty.\n`offer()`/`poll()` with timeout for non-blocking variants.\n\nThe blocking behavior provides natural **flow control**. Use as the work queue in custom thread pools or message processing pipelines.'
        },
        {
          heading: 'Choosing the Right Concurrent Collection',
          body: 'Decision guide:\nNeed a thread-safe Map? → `ConcurrentHashMap` (*high throughput, fine-grained locking, the go-to choice*).\nRead-heavy list with rare writes? → `CopyOnWriteArrayList` (*lock-free reads, O(n) writes — great for listeners/observers*).\nProducer-consumer pipeline? → `LinkedBlockingQueue` (*bounded, two-lock for concurrent put/take*).\nNeed priority ordering? → `PriorityBlockingQueue` (*unbounded, heap-based*).\nNeed delayed processing? → `DelayQueue` (*elements available only after their delay expires — scheduled tasks, cache expiry*).\nDirect handoff without buffering? → `SynchronousQueue` (*zero capacity, producer blocks until consumer takes*).\nNeed a non-blocking queue? → `ConcurrentLinkedQueue` (*CAS-based, never blocks, returns null if empty*).\nSorted concurrent map? → `ConcurrentSkipListMap` (*O(log n) operations, ordered iteration*).\n\nAvoid: `Collections.synchronizedXxx()` wrappers — *they use a single mutex for all operations, creating a bottleneck*.\nAvoid: `Hashtable` — *legacy class, same single-lock problem as synchronized wrappers*.'
        }
      ],
      codeExamples: [
        {
          title: 'Producer-Consumer with BlockingQueue',
          language: 'java',
          code: `// Producer-Consumer pattern
BlockingQueue<Task> queue = new ArrayBlockingQueue<>(100);

// Producer
executor.submit(() -> {
    while (running) {
        Task task = generateTask();
        queue.put(task); // blocks if queue full — back pressure
    }
});

// Consumer
executor.submit(() -> {
    while (running) {
        Task task = queue.take(); // blocks if queue empty
        processTask(task);
    }
});

// CopyOnWriteArrayList — event listeners
CopyOnWriteArrayList<EventListener> listeners = new CopyOnWriteArrayList<>();
public void addListener(EventListener l) { listeners.add(l); }
public void fireEvent(Event e) {
    for (EventListener l : listeners) { // safe iteration, no lock
        l.onEvent(e);
    }
}

// ConcurrentLinkedQueue — non-blocking queue (CAS-based)
ConcurrentLinkedQueue<Task> tasks = new ConcurrentLinkedQueue<>();
tasks.offer(task); // never blocks
Task t = tasks.poll(); // null if empty`
        },
        {
          title: 'DelayQueue for Scheduled Tasks',
          language: 'java',
          code: `// DelayQueue: elements become available only after their delay expires
// Perfect for: cache expiration, scheduled tasks, retry delays, rate limiting
public class DelayQueueDemo {

    static class DelayedTask implements Delayed {
        private final String name;
        private final long executeAt; // absolute time in nanos

        DelayedTask(String name, long delayMs) {
            this.name = name;
            this.executeAt = System.nanoTime() + TimeUnit.MILLISECONDS.toNanos(delayMs);
        }

        @Override
        public long getDelay(TimeUnit unit) {
            return unit.convert(executeAt - System.nanoTime(), TimeUnit.NANOSECONDS);
        }

        @Override
        public int compareTo(Delayed other) {
            return Long.compare(this.executeAt, ((DelayedTask) other).executeAt);
        }

        @Override
        public String toString() { return name; }
    }

    public static void main(String[] args) throws InterruptedException {
        DelayQueue<DelayedTask> queue = new DelayQueue<>();

        queue.put(new DelayedTask("Send reminder email", 3000));
        queue.put(new DelayedTask("Retry failed API call", 1000));
        queue.put(new DelayedTask("Expire cache entry", 5000));
        queue.put(new DelayedTask("Health check", 2000));

        System.out.println("Tasks scheduled at: " + Instant.now());

        // Consumer — tasks come out in delay order, not insertion order
        while (!queue.isEmpty()) {
            DelayedTask task = queue.take(); // blocks until next task is ready
            System.out.printf("[%s] Executing: %s%n",
                Instant.now().toString().substring(11, 23), task);
        }
        // Output order: Retry(1s) → Health(2s) → Reminder(3s) → Cache(5s)
    }

    // Practical use case: simple cache with TTL expiration
    static class ExpiringCache<K, V> {
        private final ConcurrentHashMap<K, V> map = new ConcurrentHashMap<>();
        private final DelayQueue<ExpiringKey<K>> expiryQueue = new DelayQueue<>();

        record ExpiringKey<K>(K key, long expireAt) implements Delayed {
            @Override
            public long getDelay(TimeUnit unit) {
                return unit.convert(expireAt - System.nanoTime(), TimeUnit.NANOSECONDS);
            }
            @Override
            public int compareTo(Delayed o) {
                return Long.compare(expireAt, ((ExpiringKey<?>) o).expireAt);
            }
        }

        public ExpiringCache() {
            Thread cleaner = new Thread(() -> {
                while (true) {
                    try {
                        ExpiringKey<K> expired = expiryQueue.take();
                        map.remove(expired.key());
                    } catch (InterruptedException e) { break; }
                }
            }, "cache-cleaner");
            cleaner.setDaemon(true);
            cleaner.start();
        }

        public void put(K key, V value, long ttlMs) {
            map.put(key, value);
            expiryQueue.put(new ExpiringKey<>(key,
                System.nanoTime() + TimeUnit.MILLISECONDS.toNanos(ttlMs)));
        }

        public V get(K key) { return map.get(key); }
    }
}`
        }
      ]
    },
];
