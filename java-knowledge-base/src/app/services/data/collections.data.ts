import { Topic } from '../../models/knowledge.model';

export const COLLECTIONS_TOPICS: Topic[] = [
    {
      id: 'collection-overview',
      title: 'Collections Framework Overview',
      description: 'The Java Collections hierarchy — List, Set, Queue, Map, and choosing the right implementation.',
      categoryId: 'collections',
      icon: '🗂️',
      difficulty: 'Beginner',
      tags: ['Collections', 'List', 'Set', 'Map', 'Queue', 'Hierarchy', 'Comparable', 'Comparator', 'Deque', 'Iterable', 'TreeSet', 'HashSet'],
      content: [
        {
          heading: 'Collection Hierarchy',
          body: '`Iterable` → `Collection` → **List** (ordered, duplicates allowed), **Set** (no duplicates), **Queue/Deque** (FIFO/LIFO). `Map` is separate (*not a `Collection`*).\n\nKey interfaces: **List** (`ArrayList`, `LinkedList`, `Vector`), **Set** (`HashSet`, `LinkedHashSet`, `TreeSet`, `EnumSet`), **Queue** (`LinkedList`, `PriorityQueue`, `ArrayDeque`), **Deque** (`ArrayDeque`, `LinkedList`), **Map** (`HashMap`, `LinkedHashMap`, `TreeMap`, `Hashtable`, `ConcurrentHashMap`).'
        },
        {
          heading: 'List vs Set vs Queue vs Map',
          body: '**List**: ordered sequence with index-based access, allows duplicates.\n**Set**: unique elements, no ordering guarantee (`HashSet`) or sorted (`TreeSet`) or insertion-ordered (`LinkedHashSet`).\n**Queue**: FIFO ordering, `PriorityQueue` for priority-based.\n**Deque**: double-ended queue, use as stack or queue (*prefer `ArrayDeque` over `Stack`*).\n**Map**: key-value pairs with unique keys.'
        },
        {
          heading: 'Choosing the Right Collection',
          body: 'Need indexed access? `ArrayList`. Need fast add/remove at both ends? `ArrayDeque`.\nNeed uniqueness? `HashSet`. Need sorted unique elements? `TreeSet`.\nNeed key-value lookups? `HashMap`. Need sorted keys? `TreeMap`. Need insertion-order keys? `LinkedHashMap`.\nNeed thread safety? `ConcurrentHashMap`, `CopyOnWriteArrayList`, or `BlockingQueue`.\nNeed enum keys? `EnumMap`/`EnumSet` (*fastest*).'
        },
        {
          heading: 'Comparable vs Comparator',
          body: '`Comparable<T>`: **natural ordering** defined BY the class itself (implement `compareTo(T)`).\n`Comparator<T>`: **external ordering** strategy (separate from the class).\n\nUse `Comparator` for multiple sort criteria: `Comparator.comparing(User::getName).thenComparingInt(User::getAge).reversed()`. `TreeSet`/`TreeMap` require elements to be `Comparable` OR supply a `Comparator`.'
        },
        {
          heading: 'Real-World Analogy',
          body: '**List** — *a numbered shelf where every slot has a position (0, 1, 2…) and you can have duplicate items on different slots.*\n\n**Set** — *a bag of unique marbles. You can toss marbles in, but if one is already there it\'s ignored; there is no inherent "first" or "second" marble.*\n\n**Queue** — *a line at a store. People join at the back and leave from the front (FIFO). A `PriorityQueue` is like a hospital ER where the most critical patient is seen first regardless of arrival time.*\n\n**Map** — *a dictionary or phone book. You look up a word (key) to find its definition (value); each word appears only once, but different words can share the same definition.*'
        }
      ],
      codeExamples: [
        {
          title: 'Collection Choice Examples',
          language: 'java',
          code: `// ArrayList — most common, O(1) random access
List<String> list = new ArrayList<>();

// ArrayDeque — fastest stack/queue (prefer over Stack/LinkedList)
Deque<String> stack = new ArrayDeque<>();
stack.push("A"); stack.pop();
Deque<String> queue = new ArrayDeque<>();
queue.offer("A"); queue.poll();

// HashSet — O(1) uniqueness check
Set<String> seen = new HashSet<>();
if (!seen.add(item)) { /* duplicate */ }

// TreeMap — sorted keys with range operations
NavigableMap<String, Integer> sorted = new TreeMap<>();
sorted.subMap("A", true, "M", false); // range query

// EnumMap/EnumSet — optimized for enum keys
enum Status { ACTIVE, INACTIVE, PENDING }
Map<Status, List<User>> byStatus = new EnumMap<>(Status.class);
Set<Status> valid = EnumSet.of(Status.ACTIVE, Status.PENDING);

// Immutable collections (Java 9+)
List<String> immutable = List.of("A", "B", "C");
Map<String, Integer> immutableMap = Map.of("key", 1, "other", 2);`
        },
        {
          title: 'Comparator Composition',
          language: 'java',
          code: `record Employee(String name, String dept, int salary, LocalDate hireDate) {}

List<Employee> employees = List.of(
    new Employee("Alice", "Eng", 95000, LocalDate.of(2020, 1, 15)),
    new Employee("Bob", "Eng", 95000, LocalDate.of(2019, 6, 1)),
    new Employee("Carol", "Sales", 88000, LocalDate.of(2021, 3, 10)),
    new Employee("Dave", "Sales", 92000, LocalDate.of(2020, 11, 5))
);

// Compose multiple sort keys with thenComparing
Comparator<Employee> byDeptThenSalaryDescThenHireDate =
    Comparator.comparing(Employee::dept)
        .thenComparing(Employee::salary, Comparator.reverseOrder())
        .thenComparing(Employee::hireDate);

List<Employee> sorted = employees.stream()
    .sorted(byDeptThenSalaryDescThenHireDate)
    .toList();
// Eng: Alice (95k, 2020) → Bob (95k, 2019 — same salary, earlier date)
// Sales: Dave (92k) → Carol (88k)

// Null-safe comparator
Comparator<Employee> nullSafe =
    Comparator.nullsLast(Comparator.comparing(Employee::name));

// Reuse and invert
Comparator<Employee> bySalaryAsc = Comparator.comparingInt(Employee::salary);
Comparator<Employee> bySalaryDesc = bySalaryAsc.reversed();`
        }
      ]
    },
    {
      id: 'arraylist-source',
      title: 'ArrayList Source Code Analysis',
      description: 'Internal array structure, dynamic resizing, capacity growth strategy, and performance characteristics.',
      categoryId: 'collections',
      icon: '📋',
      difficulty: 'Intermediate',
      tags: ['ArrayList', 'Source Code', 'Array', 'Resize', 'Performance', 'Dynamic Array', 'Cache Locality', 'System.arraycopy', 'Amortized O(1)'],
      content: [
        {
          heading: 'Internal Structure',
          body: '`ArrayList` is backed by `Object[] elementData` with a `size` field tracking actual elements. Default initial capacity: **10** (*created lazily — empty array until first add*).\nElements are stored contiguously in the array, providing **excellent cache locality**.'
        },
        {
          heading: 'Growth Strategy',
          body: 'When capacity is exhausted, `grow()` is called: new capacity = old capacity + (old capacity >> 1) — approximately **1.5x growth**.\nA new array is allocated and `Arrays.copyOf()` copies elements (`System.arraycopy` internally).\n\nThis amortized strategy means `add()` is **O(1) amortized** but O(n) worst case during resize. Pre-size with `new ArrayList<>(expectedSize)` if you know the size to avoid resizes.'
        },
        {
          heading: 'Key Operations Complexity',
          body: '`get(index)`: **O(1)** — direct array access. `add(element)`: **O(1)** amortized.\n`add(index, element)`: **O(n)** — shifts elements right via `System.arraycopy`. `remove(index)`: **O(n)** — shifts elements left.\n`contains`/`indexOf`: **O(n)** — linear scan. `set(index, element)`: **O(1)**.\n\n**Fail-fast iterators**: `modCount` detects concurrent modification.'
        },
        {
          heading: 'ArrayList vs LinkedList',
          body: '`ArrayList` wins in **almost all practical scenarios** due to cache locality and lower memory overhead (*no node objects/pointers*).\n`LinkedList`: O(1) add/remove at head/tail but O(n) random access, higher memory (*each node has prev/next pointers + object overhead*).\n\nOnly use `LinkedList` as a `Deque` when you need constant-time add/remove at both ends AND never random access. *In benchmarks, `ArrayList` is faster even for mid-list insertions until list size is very large.*'
        },
        {
          heading: 'Visual Walkthrough',
          body: 'Step-by-step: adding 11 elements to a default `ArrayList`.\n\n(1) `new ArrayList<>()` — `elementData` is an empty array `{}` (*lazy initialization, capacity 0*).\n(2) First `add()` — triggers `grow()`, allocates `Object[10]`. Elements 1-10 are added at indices 0-9, size goes from 1 to 10, no further resizing needed.\n(3) 11th `add()` — size (10) == capacity (10), triggers `grow()`. New capacity = 10 + (10 >> 1) = **10 + 5 = 15**. A new `Object[15]` is allocated, `Arrays.copyOf` copies all 10 elements, then element 11 is placed at index 10.\n\nThe old `Object[10]` array becomes eligible for GC. After this, you have 4 empty slots (indices 11-14) ready for future adds without resizing. *Next resize happens at element 16 (capacity grows 15 → 22).*'
        }
      ],
      codeExamples: [
        {
          title: 'ArrayList Internals (Simplified)',
          language: 'java',
          code: `// Simplified ArrayList growth mechanism
public class SimpleArrayList<E> {
    private Object[] elementData;
    private int size;

    public SimpleArrayList() {
        elementData = new Object[10]; // default capacity
    }

    public void add(E element) {
        if (size == elementData.length) {
            grow();
        }
        elementData[size++] = element;
    }

    private void grow() {
        int oldCapacity = elementData.length;
        int newCapacity = oldCapacity + (oldCapacity >> 1); // 1.5x
        elementData = Arrays.copyOf(elementData, newCapacity);
    }

    public void add(int index, E element) {
        if (size == elementData.length) grow();
        // Shift elements right — this is why it's O(n)
        System.arraycopy(elementData, index, elementData, index + 1, size - index);
        elementData[index] = element;
        size++;
    }

    @SuppressWarnings("unchecked")
    public E get(int index) {
        return (E) elementData[index]; // O(1) direct access
    }
}`
        },
        {
          title: 'ArrayList vs LinkedList Performance Timing',
          language: 'java',
          code: `int n = 100_000;

// Sequential add — ArrayList wins (contiguous memory, no node allocation)
List<Integer> arrayList = new ArrayList<>();
long start = System.nanoTime();
for (int i = 0; i < n; i++) arrayList.add(i);
long alAdd = System.nanoTime() - start;

List<Integer> linkedList = new LinkedList<>();
start = System.nanoTime();
for (int i = 0; i < n; i++) linkedList.add(i);
long llAdd = System.nanoTime() - start;

System.out.printf("Sequential add — ArrayList: %d ms, LinkedList: %d ms%n",
    alAdd / 1_000_000, llAdd / 1_000_000);

// Random access by index — ArrayList O(1) vs LinkedList O(n)
start = System.nanoTime();
for (int i = 0; i < 10_000; i++) arrayList.get(ThreadLocalRandom.current().nextInt(n));
long alGet = System.nanoTime() - start;

start = System.nanoTime();
for (int i = 0; i < 10_000; i++) linkedList.get(ThreadLocalRandom.current().nextInt(n));
long llGet = System.nanoTime() - start;

System.out.printf("Random get — ArrayList: %d ms, LinkedList: %d ms%n",
    alGet / 1_000_000, llGet / 1_000_000);
// Typical result: ArrayList random get is ~1000x faster

// Insert at head — LinkedList O(1) vs ArrayList O(n)
start = System.nanoTime();
for (int i = 0; i < 10_000; i++) arrayList.add(0, i); // shifts all elements
long alHead = System.nanoTime() - start;

start = System.nanoTime();
for (int i = 0; i < 10_000; i++) linkedList.add(0, i); // just pointer update
long llHead = System.nanoTime() - start;

System.out.printf("Insert at head — ArrayList: %d ms, LinkedList: %d ms%n",
    alHead / 1_000_000, llHead / 1_000_000);`
        }
      ]
    },
    {
      id: 'hashmap-source',
      title: 'HashMap Source Code Analysis',
      description: 'Hash function, bucket structure, treeification, resize mechanism, and why equals/hashCode matter.',
      categoryId: 'collections',
      icon: '🗺️',
      difficulty: 'Advanced',
      tags: ['HashMap', 'Hashing', 'Treeification', 'Source Code', 'Resize', 'Red-Black Tree', 'Bucket', 'Load Factor', 'hashCode', 'equals'],
      content: [
        {
          heading: 'Internal Structure',
          body: '`HashMap` uses `Node<K,V>[] table` (array of buckets). Each bucket is a **linked list** (or **red-black tree** when threshold exceeded).\nKey fields: `table` (bucket array), `size` (entry count), `threshold` (resize trigger = capacity × loadFactor), `loadFactor` (default **0.75**).\n\nDefault initial capacity: **16** (*must be power of 2*).'
        },
        {
          heading: 'Hash Function & Index Calculation',
          body: 'Hash computation: `(h = key.hashCode()) ^ (h >>> 16)` — XORs high bits into low bits to reduce collisions when capacity is small (*since index uses only low bits*).\nBucket index: `(n - 1) & hash` where n is capacity (power of 2) — equivalent to `hash % n` but faster.\n\n*This is why capacity must be power of 2.*'
        },
        {
          heading: 'Put Operation',
          body: '1) Compute hash and bucket index. 2) If bucket is empty, create new `Node`. 3) If bucket occupied, traverse chain: if key exists (`equals()` check), replace value; otherwise append.\n4) If chain length ≥ **TREEIFY_THRESHOLD (8)** AND table length ≥ **MIN_TREEIFY_CAPACITY (64)**, convert to **red-black tree**.\n5) If size > threshold, resize.\n\nThis makes worst-case lookup **O(log n)** instead of O(n).'
        },
        {
          heading: 'Resize (Rehash)',
          body: 'When size exceeds threshold (capacity × 0.75), table **doubles** in size. Each entry is rehashed to its new position.\nIn Java 8+, rehashing is optimized: since new capacity is 2× old, each node either stays at the same index OR moves to **index + oldCapacity**. This is determined by the bit at `hash & oldCapacity`.\n\n*The resize creates two lists per old bucket (lo/hi) and assigns them to new positions.*'
        },
        {
          heading: 'Thread Safety Warning',
          body: '`HashMap` is **NOT thread-safe**. Concurrent `put` from multiple threads can cause infinite loops (*Java 7 — head insertion during resize*) or data loss (*Java 8 — overwriting*).\n\nFor concurrent access: use `ConcurrentHashMap` (fine-grained locking, best performance), `Collections.synchronizedMap` (global lock, poor performance), or `Hashtable` (*legacy, global lock, do NOT use*).'
        },
        {
          heading: 'Step-by-Step: What Happens When You Put',
          body: 'Example: `map.put("hello", 42)` on a default `HashMap` (capacity 16, load factor 0.75).\n\n(1) Compute hash: `"hello".hashCode()` returns 99162322 (0x05E91A52). Perturbation: `99162322 ^ (99162322 >>> 16)` = 99162322 ^ 1513 = 99163579 (0x05E91F3B).\n(2) Bucket index: `(16 - 1) & 99163579` = `15 & 99163579` = **11** (*only the last 4 bits matter since capacity is 16*).\n(3) Check bucket 11: if empty → create a new `Node("hello", 42)` and place it at `table[11]`.\n(4) If bucket 11 is occupied: walk the linked list. For each node, check `node.hash == hash && node.key.equals("hello")`. If found → replace value and return old value. If not found → append a new node at the end of the chain.\n(5) After insertion: if chain length ≥ 8 AND table capacity ≥ 64 → **treeify** the chain into a red-black tree.\n(6) Increment size. If size > threshold (16 × 0.75 = **12**) → resize to 32, rehash all entries.'
        }
      ],
      codeExamples: [
        {
          title: 'HashMap Internals (Simplified)',
          language: 'java',
          code: `// Simplified Node structure
static class Node<K,V> {
    final int hash;
    final K key;
    V value;
    Node<K,V> next;

    Node(int hash, K key, V value, Node<K,V> next) {
        this.hash = hash; this.key = key;
        this.value = value; this.next = next;
    }
}

// Simplified put logic
public V put(K key, V value) {
    int hash = hash(key);
    int index = (table.length - 1) & hash; // bucket index

    Node<K,V> node = table[index];
    if (node == null) {
        table[index] = new Node<>(hash, key, value, null);
    } else {
        // Traverse chain, find matching key or append
        while (node != null) {
            if (node.hash == hash && Objects.equals(node.key, key)) {
                V old = node.value;
                node.value = value; // replace existing
                return old;
            }
            if (node.next == null) {
                node.next = new Node<>(hash, key, value, null);
                break;
            }
            node = node.next;
        }
    }
    if (++size > threshold) resize(); // double capacity
    return null;
}

// Hash perturbation — spreads high bits to low bits
static int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}`
        },
        {
          title: 'Bad hashCode — All Keys in Same Bucket',
          language: 'java',
          code: `// Pathological hashCode that always returns the same value
class BadKey {
    private final String value;

    BadKey(String value) { this.value = value; }

    @Override
    public int hashCode() {
        return 42; // Every key lands in the same bucket!
    }

    @Override
    public boolean equals(Object o) {
        return o instanceof BadKey bk && Objects.equals(value, bk.value);
    }
}

// Demonstrate the performance impact
Map<BadKey, Integer> badMap = new HashMap<>();
Map<String, Integer> goodMap = new HashMap<>();

int n = 50_000;
long start = System.nanoTime();
for (int i = 0; i < n; i++) badMap.put(new BadKey("key" + i), i);
long badTime = System.nanoTime() - start;

start = System.nanoTime();
for (int i = 0; i < n; i++) goodMap.put("key" + i, i);
long goodTime = System.nanoTime() - start;

System.out.printf("Bad hashCode: %d ms%n", badTime / 1_000_000);
System.out.printf("Good hashCode: %d ms%n", goodTime / 1_000_000);
// Bad hashCode is orders of magnitude slower because:
// - All entries form a single chain → O(n) per put/get
// - After 8 entries + capacity ≥ 64, chain treeifies → O(log n)
// - Even with treeification, still much worse than O(1) with spread hashes`
        }
      ]
    },
    {
      id: 'concurrenthashmap-source',
      title: 'ConcurrentHashMap Source Code Analysis',
      description: 'Segment locking (Java 7) vs CAS + synchronized (Java 8+), concurrent operations, and how it achieves thread safety.',
      categoryId: 'collections',
      icon: '🔒',
      difficulty: 'Advanced',
      tags: ['ConcurrentHashMap', 'Thread Safety', 'CAS', 'Lock Striping', 'Source Code', 'Segment Locking', 'Concurrent', 'computeIfAbsent'],
      content: [
        {
          heading: 'Java 7 Implementation (Segment Locking)',
          body: 'In Java 7, `ConcurrentHashMap` uses an array of **Segments** (each is a `ReentrantLock` protecting a portion of the table). Default: **16 segments** = 16 concurrent writers.\nEach segment is essentially a mini `HashMap`. Reads are mostly lock-free using `volatile` reads.\n\n*This approach limits scalability to concurrency level (number of segments).*'
        },
        {
          heading: 'Java 8+ Implementation (CAS + synchronized)',
          body: 'Java 8 completely rewrote `ConcurrentHashMap`. Uses a single `Node<K,V>[] table` (like `HashMap`).\nPuts use **CAS** on empty buckets and `synchronized` on the first node of occupied buckets — **locking per-bucket** instead of per-segment. This is much finer-grained: concurrent writes to different buckets require no locking.\n\nUses `Unsafe`/`VarHandle` for volatile array element access.'
        },
        {
          heading: 'Key Operations',
          body: '`get()`: **NO lock**, uses volatile reads — very fast. `put()`: CAS if bucket empty; `synchronized` on head node if occupied. Treeification at threshold 8 (*same as `HashMap`*).\n`size()`: approximate — uses `baseCount` + `CounterCell[]` (like `LongAdder`) to avoid contention on a single counter.\n\n`computeIfAbsent`/`compute`/`merge`: **atomic compound operations** — *the primary advantage over manual synchronization*.'
        },
        {
          heading: 'Why Not Hashtable or synchronizedMap',
          body: '`Hashtable`: every method is `synchronized` on the entire table — *only one thread can read OR write at a time*.\n`Collections.synchronizedMap`: wraps `HashMap` with a mutex — *same global lock problem*.\n`ConcurrentHashMap`: concurrent reads (no lock), concurrent writes to different buckets, no iterator fail-fast (**weakly consistent iterators**).\n\nPerformance difference: **10-100x** under high contention.'
        },
        {
          heading: 'Important Caveats',
          body: '`size()` and `isEmpty()` may be inaccurate during concurrent modifications (*best-effort*). Iterators are **weakly consistent** — reflect state at or after creation, don\'t throw `ConcurrentModificationException`.\n\n**Null keys and null values are NOT allowed** (unlike `HashMap`) — `null` is used internally as a sentinel during resize.\n*The single-most-asked concurrent collection in Java interviews.*'
        },
        {
          heading: 'Real-World Analogy',
          body: '**Hashtable** — *like a library with a single entrance gate and one librarian. Only one person can enter at a time, whether to read or shelve a book. Everyone else waits outside.*\n\n**Collections.synchronizedMap** — *the same: one lock for the whole building.*\n\n**ConcurrentHashMap** (Java 8+) — *like a library where each shelf has its own lock. Multiple readers can browse any shelf simultaneously with no lock at all (volatile reads). Writers only lock the specific shelf they are modifying. Two people can shelve books on different shelves at the same time.*\n\n*If a shelf gets too crowded (chain length ≥ 8), the librarian reorganizes that shelf into a sorted index (treeification) for faster lookups. The result: under high traffic, `ConcurrentHashMap` serves 10-100x more visitors than the single-gate library.*'
        }
      ],
      codeExamples: [
        {
          title: 'ConcurrentHashMap Atomic Operations',
          language: 'java',
          code: `ConcurrentHashMap<String, LongAdder> metrics = new ConcurrentHashMap<>();

// Atomic compute — thread-safe increment
metrics.computeIfAbsent("requests", k -> new LongAdder()).increment();

// Atomic merge — combine values
ConcurrentHashMap<String, Integer> wordCount = new ConcurrentHashMap<>();
for (String word : words) {
    wordCount.merge(word, 1, Integer::sum); // atomic read-modify-write
}

// Bulk parallel operations (Java 8+)
// Threshold: only parallelize if map has > 1000 entries
long total = wordCount.reduceValuesToLong(
    1000,           // parallelism threshold
    Integer::longValue,
    0L,
    Long::sum
);

// forEach with parallelism
wordCount.forEach(1000, (key, value) -> {
    if (value > 100) System.out.println(key + ": " + value);
});

// search with parallelism — returns first match
String found = wordCount.search(1000, (key, value) -> {
    return value > 1000 ? key : null;
});`
        },
        {
          title: 'get-then-put (Unsafe) vs computeIfAbsent (Atomic)',
          language: 'java',
          code: `ConcurrentHashMap<String, List<String>> registry = new ConcurrentHashMap<>();

// WRONG: get-then-put is NOT atomic — race condition!
// Two threads can both see null, both create a new list,
// and one thread's list (with its added item) is silently lost.
List<String> list = registry.get("listeners");
if (list == null) {
    list = new ArrayList<>();
    registry.put("listeners", list); // another thread may overwrite!
}
list.add("myListener");

// CORRECT: computeIfAbsent is atomic — only one thread creates the list
registry.computeIfAbsent("listeners", k -> new CopyOnWriteArrayList<>())
    .add("myListener");

// WRONG: check-then-act with separate operations
if (!registry.containsKey("config")) {       // Thread A checks
    registry.put("config", loadDefaults());   // Thread B may have inserted between check and put
}

// CORRECT: putIfAbsent for simple insert-if-missing
registry.putIfAbsent("config", loadDefaults());

// CORRECT: compute for atomic read-modify-write
registry.compute("listeners", (key, existing) -> {
    List<String> result = (existing != null) ? existing : new CopyOnWriteArrayList<>();
    result.add("newListener");
    return result;
});`
        }
      ]
    },
    {
      id: 'linkedhashmap-source',
      title: 'LinkedHashMap & LRU Cache',
      description: 'Insertion-order / access-order iteration, and building an LRU cache with LinkedHashMap.',
      categoryId: 'collections',
      icon: '🔗',
      difficulty: 'Intermediate',
      tags: ['LinkedHashMap', 'LRU Cache', 'Insertion Order', 'Access Order', 'Doubly-Linked List', 'Cache Eviction'],
      content: [
        {
          heading: 'How LinkedHashMap Works',
          body: '`LinkedHashMap` extends `HashMap` and maintains a **doubly-linked list** running through all entries. This preserves **insertion order** (default) or **access order** (when `accessOrder=true`).\nEach entry has `before` and `after` pointers in addition to `HashMap`\'s `next` pointer.\n\nPerformance is same as `HashMap` (O(1) put/get) with *slightly higher memory overhead for the linked list pointers*.'
        },
        {
          heading: 'Insertion Order vs Access Order',
          body: '**Insertion order** (default): entries iterate in the order they were first put.\n**Access order** (`new LinkedHashMap<>(16, 0.75f, true)`): entries are moved to the end on every `get`/`put`/`compute`.\n\nThis makes the **least recently used** entry always at the head — *perfect for LRU caches*.'
        },
        {
          heading: 'Building an LRU Cache',
          body: 'Override `removeEldestEntry(Map.Entry)` to automatically evict when size exceeds the limit. This method is called after every `put`.\nCombined with access-order, this creates a simple but effective **LRU cache**.\n\nFor thread-safe LRU, wrap with `Collections.synchronizedMap()` or use **ConcurrentLinkedHashMap** / **Caffeine** library for production use.'
        },
        {
          heading: 'How Access-Order Works',
          body: 'When you create a `LinkedHashMap` with `accessOrder=true`, every `get()`, `put()`, or `compute()` on an existing key moves that entry to the **tail** of the doubly-linked list.\n\nStep-by-step example: Start with entries [A→1, B→2, C→3] (head→tail).\nCall `get("A")`: entry A is unlinked from its position and re-linked at the tail. The list is now [B→2, C→3, A→1].\nCall `get("B")`: B moves to tail → [C→3, A→1, B→2].\nCall `put("D", 4)`: new entry appended at tail → [C→3, A→1, B→2, D→4].\nCall `put("C", 99)`: existing key C is updated AND moved to tail → [A→1, B→2, D→4, C→99].\n\nThe head of the list is always the **Least Recently Used** entry. With `removeEldestEntry()`, this head entry is the one evicted when the cache is full.'
        }
      ],
      codeExamples: [
        {
          title: 'LRU Cache with LinkedHashMap',
          language: 'java',
          code: `public class LRUCache<K, V> extends LinkedHashMap<K, V> {
    private final int maxSize;

    public LRUCache(int maxSize) {
        super(maxSize, 0.75f, true); // accessOrder = true
        this.maxSize = maxSize;
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return size() > maxSize;
    }
}

// Usage
LRUCache<String, User> cache = new LRUCache<>(1000);
cache.put("user:1", user1);  // MRU
cache.put("user:2", user2);  // MRU
cache.get("user:1");          // user:1 moves to MRU position
// When size > 1000, least recently used entry is automatically removed

// Thread-safe wrapper
Map<String, User> syncCache = Collections.synchronizedMap(new LRUCache<>(1000));`
        },
        {
          title: 'Insertion-Order vs Access-Order Behavior',
          language: 'java',
          code: `// INSERTION ORDER (default) — iteration follows put() order
LinkedHashMap<String, Integer> insertionOrder = new LinkedHashMap<>();
insertionOrder.put("Banana", 2);
insertionOrder.put("Apple", 5);
insertionOrder.put("Cherry", 3);
insertionOrder.get("Banana"); // access does NOT change order
System.out.println(insertionOrder.keySet());
// Output: [Banana, Apple, Cherry] — always insertion order

// ACCESS ORDER — iteration follows most-recent-access order
LinkedHashMap<String, Integer> accessOrder =
    new LinkedHashMap<>(16, 0.75f, true); // accessOrder = true
accessOrder.put("Banana", 2);   // list: [Banana]
accessOrder.put("Apple", 5);    // list: [Banana, Apple]
accessOrder.put("Cherry", 3);   // list: [Banana, Apple, Cherry]

accessOrder.get("Banana");      // Banana moves to tail: [Apple, Cherry, Banana]
accessOrder.get("Apple");       // Apple moves to tail:  [Cherry, Banana, Apple]

System.out.println(accessOrder.keySet());
// Output: [Cherry, Banana, Apple] — LRU (Cherry) is first, MRU (Apple) is last

accessOrder.put("Cherry", 99);  // update existing → moves to tail
System.out.println(accessOrder.keySet());
// Output: [Banana, Apple, Cherry] — Cherry is now MRU

// Practical use: iterate in LRU → MRU order to find stale entries
for (var entry : accessOrder.entrySet()) {
    System.out.println(entry.getKey() + " → " + entry.getValue());
    // First entry is always the least recently used
}`
        }
      ]
    },
    {
      id: 'priorityqueue-source',
      title: 'PriorityQueue Source Code Analysis',
      description: 'Binary heap implementation, sift-up/sift-down operations, and use cases for priority queues.',
      categoryId: 'collections',
      icon: '⏫',
      difficulty: 'Intermediate',
      tags: ['PriorityQueue', 'Heap', 'Binary Heap', 'Source Code', 'Sift Up', 'Sift Down', 'Top-K', 'Dijkstra'],
      content: [
        {
          heading: 'Internal Structure',
          body: '`PriorityQueue` is backed by a **binary min-heap** stored in `Object[] queue`. The smallest element (by natural order or `Comparator`) is always at index 0.\nParent of index i: `(i - 1) / 2`. Left child: `2 * i + 1`. Right child: `2 * i + 2`.\n\nDefault initial capacity: **11**. *Not thread-safe — use `PriorityBlockingQueue` for concurrent access.*'
        },
        {
          heading: 'Key Operations',
          body: '`offer()`/`add()`: **O(log n)** — add to end, sift up to restore heap property.\n`poll()`: **O(log n)** — remove root, move last to root, sift down.\n`peek()`: **O(1)** — return root without removal.\n`remove(Object)`: **O(n)** — linear search + O(log n) sift. `contains()`: **O(n)**.\n\nThe heap is **NOT fully sorted** — *only the root is guaranteed to be the min/max*.'
        },
        {
          heading: 'Sift Up and Sift Down',
          body: '**Sift up** (after insertion): compare with parent, swap if smaller, repeat until heap property restored or root reached.\n**Sift down** (after removal): compare with smaller child, swap if larger, repeat until heap property restored or leaf reached.\n\nThese operations maintain the heap invariant in **O(log n)** time.'
        },
        {
          heading: 'Common Use Cases',
          body: 'Task scheduling (*process highest priority first*). **Dijkstra\'s** shortest path algorithm. Merge K sorted lists. Find the **Kth largest element** (min-heap of size K). Event-driven simulation.\n\nFor max-heap: `new PriorityQueue<>(Comparator.reverseOrder())` or `new PriorityQueue<>((a, b) -> b - a)`.'
        },
        {
          heading: 'Visual Walkthrough',
          body: 'Inserting 5, 3, 8, 1, 4 into a min-heap (`PriorityQueue`).\n\n(1) Insert 5: heap = [5]. Tree: just the root `5`.\n(2) Insert 3: placed at index 1 (left child of root). 3 < 5 → **sift up**, swap with parent. Heap = [3, 5].\n(3) Insert 8: placed at index 2 (right child of root). 8 > 3 → no sift needed. Heap = [3, 5, 8].\n(4) Insert 1: placed at index 3 (left child of `5`). 1 < 5 → swap → 1 < 3 → swap. Heap = [1, 3, 8, 5].\n(5) Insert 4: placed at index 4 (right child of `3`). 4 > 3 → no sift needed. Final heap = **[1, 3, 8, 5, 4]**.\n\nCalling `poll()` returns `1`, moves `4` to root, then **sifts down**: 4 > 3 → swap with `3`. Result: [3, 4, 8, 5].'
        }
      ],
      codeExamples: [
        {
          title: 'PriorityQueue Usage',
          language: 'java',
          code: `// Min-heap (default) — smallest element first
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
minHeap.offer(5); minHeap.offer(1); minHeap.offer(3);
minHeap.poll(); // 1 (smallest)
minHeap.poll(); // 3

// Max-heap — largest element first
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Comparator.reverseOrder());

// Custom priority — process tasks by priority then arrival time
record Task(String name, int priority, long timestamp) {}
PriorityQueue<Task> taskQueue = new PriorityQueue<>(
    Comparator.comparingInt(Task::priority)
        .thenComparingLong(Task::timestamp)
);

// Find K largest elements — maintain min-heap of size K
public static List<Integer> topK(int[] nums, int k) {
    PriorityQueue<Integer> minHeap = new PriorityQueue<>();
    for (int num : nums) {
        minHeap.offer(num);
        if (minHeap.size() > k) minHeap.poll(); // evict smallest
    }
    return new ArrayList<>(minHeap); // K largest remain
}`
        },
        {
          title: 'Merge K Sorted Lists Using PriorityQueue',
          language: 'java',
          code: `// Merge K sorted lists into one sorted list — O(N log K)
// where N is total elements across all lists, K is number of lists
public static List<Integer> mergeKSortedLists(List<List<Integer>> lists) {
    List<Integer> result = new ArrayList<>();
    if (lists == null || lists.isEmpty()) return result;

    // Each entry in the heap: [value, listIndex, elementIndex]
    PriorityQueue<int[]> minHeap = new PriorityQueue<>(
        Comparator.comparingInt(a -> a[0])
    );

    // Seed the heap with the first element of each list
    for (int i = 0; i < lists.size(); i++) {
        if (!lists.get(i).isEmpty()) {
            minHeap.offer(new int[]{lists.get(i).get(0), i, 0});
        }
    }

    while (!minHeap.isEmpty()) {
        int[] smallest = minHeap.poll();
        int value = smallest[0];
        int listIdx = smallest[1];
        int elemIdx = smallest[2];

        result.add(value);

        // If the list has more elements, push the next one
        if (elemIdx + 1 < lists.get(listIdx).size()) {
            int nextVal = lists.get(listIdx).get(elemIdx + 1);
            minHeap.offer(new int[]{nextVal, listIdx, elemIdx + 1});
        }
    }
    return result;
}

// Usage
List<List<Integer>> sorted = List.of(
    List.of(1, 4, 7),
    List.of(2, 5, 8),
    List.of(3, 6, 9)
);
System.out.println(mergeKSortedLists(sorted));
// Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]`
        }
      ]
    },
    {
      id: 'collection-pitfalls',
      title: 'Collection Pitfalls & Best Practices',
      description: 'Common mistakes with collections — fail-fast iterators, Arrays.asList traps, and performance anti-patterns.',
      categoryId: 'collections',
      icon: '🚫',
      difficulty: 'Intermediate',
      tags: ['Best Practices', 'Pitfalls', 'Fail-Fast', 'Immutable Collections', 'ConcurrentModificationException', 'Arrays.asList', 'removeIf', 'List.of'],
      content: [
        {
          heading: 'Concurrent Modification Exception',
          body: 'Iterators from `ArrayList`/`HashMap` are **fail-fast** — they throw `ConcurrentModificationException` if the collection is structurally modified during iteration (*except through the iterator itself*).\n\nSolution: use `iterator.remove()`, collect items to remove then call `removeAll()`, use `removeIf()`, or use concurrent collections.'
        },
        {
          heading: 'Arrays.asList() Traps',
          body: '`Arrays.asList()` returns a **fixed-size list** backed by the original array — `add()` and `remove()` throw `UnsupportedOperationException`. *Changes to the list modify the array and vice versa.*\n\nFor primitive arrays, `Arrays.asList(new int[]{1,2,3})` creates a `List<int[]>` with **ONE element** (the array itself), not `List<Integer>`.\nUse `List.of()` (Java 9+) for true immutable lists, or `new ArrayList<>(Arrays.asList(...))` for mutable copies.'
        },
        {
          heading: 'hashCode/equals Pitfalls',
          body: 'Using a mutable object as a `HashMap` key, then modifying the fields used in `hashCode()` — the entry becomes **unreachable** (wrong bucket). Always use immutable keys (`String`, `Integer`, records).\n\nIf you override `equals()` without `hashCode()`, objects that are "equal" may end up in different buckets. *`HashSet.contains()` can return false for an element that was just added if `hashCode` is inconsistent.*'
        },
        {
          heading: 'Performance Anti-Patterns',
          body: 'Using `LinkedList` when `ArrayList` works fine (*almost always*). Using `Vector`/`Stack` (*legacy, synchronized, use `ArrayList`/`ArrayDeque`*).\nNot pre-sizing `ArrayList` when the size is known. Using `contains()` on a `List` in a loop (O(n) each time — use `Set`).\n\nIterating a `HashMap` to find a value (*use BiMap or reverse index*). Boxing overhead: use specialized collections (**Eclipse Collections**, **Trove**) for primitive-heavy workloads.'
        },
        {
          heading: 'Immutable Collections',
          body: 'Java 9+ `List.of()`, `Set.of()`, `Map.of()`: truly **immutable**, null-hostile (throw NPE), structurally immutable.\n`Collections.unmodifiableList()`: wraps a mutable list — *changes to the original are reflected!*\n\nFor safe publication, use `List.copyOf()` (Java 10+) which copies elements. Guava `ImmutableList`/`ImmutableMap`/`ImmutableSet` are also excellent choices.'
        },
        {
          heading: 'Debugging Tips',
          body: '`ConcurrentModificationException`: (1) Check the stack trace — it shows exactly where the iterator was created and where the modification happened. (2) The exception does **NOT** mean multi-threaded access — *the most common cause is modifying a collection inside a for-each loop in a single thread*. (3) Search for patterns like `for (X x : collection) { collection.remove(x); }` — this always fails.\n\n(4) `HashMap`/`TreeMap` iterators track a `modCount` field; any put/remove increments it, and the iterator checks it on every `next()` call.\n(5) For **silent data corruption** (no exception but wrong results): check if mutable objects are used as `Map` keys or `Set` elements — modifying them after insertion makes them "invisible" because they are in the wrong bucket.\n\n(6) For `NullPointerException` in collections: check if you are using `Map.of()` or `Set.of()` (*null-hostile*) vs `HashMap`/`HashSet` (*null-tolerant*).\n(7) For `UnsupportedOperationException`: check if the list comes from `Arrays.asList()`, `List.of()`, or `Collections.unmodifiableList()` — *all prevent structural modification*.'
        }
      ],
      codeExamples: [
        {
          title: 'Common Collection Mistakes',
          language: 'java',
          code: `// WRONG: ConcurrentModificationException
List<String> list = new ArrayList<>(List.of("a", "b", "c"));
for (String s : list) {
    if (s.equals("b")) list.remove(s); // throws!
}
// CORRECT: use removeIf
list.removeIf(s -> s.equals("b"));

// WRONG: Arrays.asList returns fixed-size list
List<String> fixed = Arrays.asList("a", "b");
fixed.add("c"); // throws UnsupportedOperationException!
// CORRECT
List<String> mutable = new ArrayList<>(Arrays.asList("a", "b"));

// WRONG: Arrays.asList with primitives
List<int[]> oops = Arrays.asList(new int[]{1, 2, 3}); // List of 1 element!
// CORRECT
List<Integer> correct = IntStream.of(1, 2, 3).boxed().toList();

// WRONG: mutable HashMap key
Map<List<String>, String> map = new HashMap<>();
List<String> key = new ArrayList<>(List.of("a"));
map.put(key, "value");
key.add("b"); // mutates the key — hashCode changes!
map.get(key); // null! Entry is lost in the wrong bucket`
        },
        {
          title: 'Correct Patterns for Modifying Collections During Iteration',
          language: 'java',
          code: `List<String> names = new ArrayList<>(List.of("Alice", "Bob", "Charlie", "David", "Eve"));

// Pattern 1: Iterator.remove() — the ONLY safe way to remove during iteration
Iterator<String> it = names.iterator();
while (it.hasNext()) {
    String name = it.next();
    if (name.startsWith("C")) {
        it.remove(); // safe — iterator updates modCount internally
    }
}
// names = [Alice, Bob, David, Eve]

// Pattern 2: removeIf() — cleanest for simple predicates (Java 8+)
names.removeIf(name -> name.length() <= 3);
// names = [Alice, David]

// Pattern 3: Collect-then-remove — when removal logic is complex
List<String> toRemove = new ArrayList<>();
for (String name : names) {
    if (someComplexCondition(name)) {
        toRemove.add(name);
    }
}
names.removeAll(toRemove);

// Pattern 4: ListIterator for add/set during iteration
ListIterator<String> listIt = names.listIterator();
while (listIt.hasNext()) {
    String name = listIt.next();
    if (name.equals("Alice")) {
        listIt.set("ALICE");      // replace current element
        listIt.add("Alice-Jr");   // insert after current element
    }
}

// Pattern 5: ConcurrentHashMap — safe concurrent iteration
ConcurrentHashMap<String, Integer> cmap = new ConcurrentHashMap<>();
cmap.put("a", 1); cmap.put("b", 2); cmap.put("c", 3);
for (var entry : cmap.entrySet()) {
    if (entry.getValue() < 2) {
        cmap.remove(entry.getKey()); // safe — weakly consistent iterator
    }
}

// Pattern 6: Stream + filter for creating a new collection (non-mutating)
List<String> filtered = names.stream()
    .filter(n -> n.length() > 4)
    .toList();`
        }
      ]
    },
];
