import { Topic } from '../../models/knowledge.model';

export const IO_TOPICS: Topic[] = [
  {
    id: 'io-basics',
    title: 'Java IO Basics',
    description:
      'InputStream/OutputStream, Reader/Writer, byte streams vs character streams, and buffering.',
    categoryId: 'io',
    icon: '📄',
    difficulty: 'Beginner',
    tags: [
      'IO',
      'InputStream',
      'OutputStream',
      'Reader',
      'Writer',
      'Buffering',
      'Byte Stream',
      'Character Stream',
      'File IO',
      'Encoding',
    ],
    content: [
      {
        heading: 'IO Stream Classification',
        body: 'Java IO is based on **streams** (*sequential flow of data*). Two dimensions:\n1) Direction — `InputStream`/`Reader` (input) vs `OutputStream`/`Writer` (output).\n2) Data type — **byte streams** (`InputStream`/`OutputStream`) for binary data vs **character streams** (`Reader`/`Writer`) for text.\n\nCharacter streams handle encoding/decoding (*UTF-8, etc.*) automatically. Always close streams (*use try-with-resources*).',
      },
      {
        heading: 'Byte Streams',
        body: '`InputStream`/`OutputStream` read/write raw bytes.\n\nKey implementations:\n`FileInputStream`/`FileOutputStream` (*file access*).\n`ByteArrayInputStream`/`ByteArrayOutputStream` (*in-memory*).\n`BufferedInputStream`/`BufferedOutputStream` (*buffered, reduces system calls*).\n`DataInputStream`/`DataOutputStream` (*primitives*).\n`ObjectInputStream`/`ObjectOutputStream` (*serialized objects*).',
      },
      {
        heading: 'Character Streams',
        body: '`Reader`/`Writer` handle characters with proper encoding.\n\nKey implementations:\n`FileReader`/`FileWriter` (*uses default encoding — avoid!*).\n`InputStreamReader`/`OutputStreamWriter` (*explicit encoding — preferred*).\n`BufferedReader`/`BufferedWriter` (*line-oriented*).\n`StringReader`/`StringWriter` (*in-memory*).\n`PrintWriter` (*formatted output*).\n\nAlways specify charset: `new InputStreamReader(fis, StandardCharsets.UTF_8)`.',
      },
      {
        heading: 'Buffering',
        body: 'Unbuffered streams make a system call for each byte/char — *very slow*. `BufferedInputStream`/`BufferedReader` maintain an internal buffer (*default 8KB*) and read in chunks. This reduces system calls dramatically.\n\nPerformance tip: always wrap file streams in buffered streams unless the stream is already buffered. For writing, `flush()` forces buffer contents to the underlying stream.',
      },
      {
        heading: 'Real-World Analogy',
        body: 'Think of IO streams as *water pipes*.\n\nA **byte stream** (`InputStream`/`OutputStream`) is *a raw pipe carrying unprocessed water (raw bytes)* — you get exactly what flows through.\nA **character stream** (`Reader`/`Writer`) is like *a filtered pipe with a purification system (charset decoder)* — it converts raw water into clean drinking water (*characters with proper encoding*).\n\nA **buffered stream** is *a pipe connected to a water tank* — instead of the faucet dripping one drop at a time (*one byte per system call*), the tank fills up in bulk and you draw from the tank. This is why `BufferedReader` is dramatically faster than raw `FileReader`: *one trip to the reservoir (disk) fills the tank (8KB buffer), and subsequent reads come from the tank instantly.*',
      },
    ],
    codeExamples: [
      {
        title: 'IO Operations',
        language: 'java',
        code: `// Reading a text file (modern approach)
String content = Files.readString(Path.of("file.txt"), StandardCharsets.UTF_8);
List<String> lines = Files.readAllLines(Path.of("file.txt"));

// Buffered reading with explicit charset
try (var reader = new BufferedReader(
        new InputStreamReader(new FileInputStream("file.txt"), StandardCharsets.UTF_8))) {
    String line;
    while ((line = reader.readLine()) != null) {
        process(line);
    }
}

// Files utility (Java 7+) — simplest approach
try (Stream<String> lines = Files.lines(Path.of("large.txt"))) {
    long count = lines.filter(l -> l.contains("ERROR")).count();
}

// Copying files
Files.copy(Path.of("src.txt"), Path.of("dst.txt"), StandardCopyOption.REPLACE_EXISTING);

// Binary file copy with buffered streams
try (var in = new BufferedInputStream(new FileInputStream("image.png"));
     var out = new BufferedOutputStream(new FileOutputStream("copy.png"))) {
    in.transferTo(out); // Java 9+ — copies all bytes
}`,
      },
      {
        title: 'Reading CSV Data',
        language: 'java',
        code: `// Simple CSV parser using BufferedReader
record Employee(String name, String dept, double salary) {}

List<Employee> employees = new ArrayList<>();
try (var reader = Files.newBufferedReader(Path.of("employees.csv"), StandardCharsets.UTF_8)) {
    String header = reader.readLine(); // skip header row
    String line;
    while ((line = reader.readLine()) != null) {
        String[] fields = line.split(",");
        employees.add(new Employee(
            fields[0].trim(),
            fields[1].trim(),
            Double.parseDouble(fields[2].trim())
        ));
    }
}

// Stream-based CSV reading with filtering and aggregation
Map<String, Double> avgSalaryByDept = Files.lines(Path.of("employees.csv"))
    .skip(1) // skip header
    .map(line -> line.split(","))
    .collect(Collectors.groupingBy(
        fields -> fields[1].trim(),
        Collectors.averagingDouble(fields -> Double.parseDouble(fields[2].trim()))
    ));

// Writing CSV output
try (var writer = Files.newBufferedWriter(Path.of("output.csv"), StandardCharsets.UTF_8)) {
    writer.write("name,department,salary");
    writer.newLine();
    for (Employee emp : employees) {
        writer.write(String.format("%s,%s,%.2f", emp.name(), emp.dept(), emp.salary()));
        writer.newLine();
    }
}`,
      },
    ],
  },
  {
    id: 'nio-basics',
    title: 'Java NIO',
    description:
      'Channels, Buffers, Selectors — non-blocking IO for high-performance network and file operations.',
    categoryId: 'io',
    icon: '🔀',
    difficulty: 'Intermediate',
    tags: [
      'NIO',
      'Channel',
      'Buffer',
      'Selector',
      'Non-Blocking',
      'DirectByteBuffer',
      'FileChannel',
      'Memory-Mapped IO',
      'Zero-Copy',
    ],
    content: [
      {
        heading: 'NIO vs IO',
        body: '**Traditional IO**: stream-oriented, blocking, one thread per connection.\n**NIO** (Java 1.4): buffer-oriented, non-blocking capability, multiplexing with **Selectors**.\nNIO enables a single thread to handle many connections (*event-driven*).\n**NIO.2** (Java 7): added asynchronous channels (AIO) and the `Files`/`Path` API.',
      },
      {
        heading: 'Buffers',
        body: '`Buffer` is a container for fixed-size data (`ByteBuffer`, `CharBuffer`, `IntBuffer`, etc.).\n\nKey properties: **capacity** (*max size, fixed*), **position** (*next read/write index*), **limit** (*first index that should not be read/written*).\n\nOperations: `put()` writes and advances position, `flip()` prepares for reading (*limit=position, position=0*), `clear()` prepares for writing (*position=0, limit=capacity*), `compact()` discards already-read data.',
      },
      {
        heading: 'Channels',
        body: '`Channel` is a bidirectional connection to an IO source (*unlike streams which are unidirectional*).\n\nKey channels: `FileChannel` (*file IO, supports memory-mapped files*), `SocketChannel` (*TCP client*), `ServerSocketChannel` (*TCP server*), `DatagramChannel` (*UDP*).\nChannels read from/write to `Buffer`s.\n`FileChannel` supports `transferTo`/`transferFrom` for **zero-copy** file transfers (*kernel-level, bypasses user space*).',
      },
      {
        heading: 'Selectors',
        body: '`Selector` allows one thread to monitor multiple channels for events (`OP_ACCEPT`, `OP_CONNECT`, `OP_READ`, `OP_WRITE`). Register channels with a selector, then call `select()` — blocks until at least one channel is ready. Process ready channels, then loop.\n\nThis is the **reactor pattern** — powers Netty, Tomcat NIO connector, and all high-performance Java network servers.',
      },
      {
        heading: 'Real-World Analogy',
        body: 'An NIO **Selector** is like *a receptionist handling multiple phone lines at a switchboard*. Instead of hiring one receptionist per phone line (*the BIO model — one thread per connection*), a single receptionist monitors all lines simultaneously.\n\nWhen a light blinks (*a channel becomes ready*), the receptionist picks up that line, handles the call, and goes back to monitoring. The receptionist does not sit and wait on any single line — *they react to whichever line is active*. This is the **reactor pattern**.\n\n**Buffers** are like *notepads*: the receptionist writes down the message (*write to buffer*), then flips the notepad around (`buffer.flip()`) to read it back to someone else.\n**Channels** are *bidirectional phone lines* (*unlike streams which are one-way intercoms*).',
      },
    ],
    codeExamples: [
      {
        title: 'NIO Server with Selector',
        language: 'java',
        code: `// NIO echo server — single thread handles many connections
Selector selector = Selector.open();
ServerSocketChannel server = ServerSocketChannel.open();
server.bind(new InetSocketAddress(8080));
server.configureBlocking(false);
server.register(selector, SelectionKey.OP_ACCEPT);

while (true) {
    selector.select(); // block until events available
    Iterator<SelectionKey> keys = selector.selectedKeys().iterator();
    while (keys.hasNext()) {
        SelectionKey key = keys.next();
        keys.remove();
        if (key.isAcceptable()) {
            SocketChannel client = server.accept();
            client.configureBlocking(false);
            client.register(selector, SelectionKey.OP_READ);
        } else if (key.isReadable()) {
            SocketChannel client = (SocketChannel) key.channel();
            ByteBuffer buffer = ByteBuffer.allocate(1024);
            int read = client.read(buffer);
            if (read == -1) { client.close(); continue; }
            buffer.flip();
            client.write(buffer); // echo back
        }
    }
}

// Memory-mapped file — extremely fast large file access
try (FileChannel fc = FileChannel.open(Path.of("big.dat"), StandardOpenOption.READ)) {
    MappedByteBuffer map = fc.map(FileChannel.MapMode.READ_ONLY, 0, fc.size());
    // map is directly backed by OS page cache — no copying
}`,
      },
    ],
  },
  {
    id: 'io-models',
    title: 'IO Models: BIO, NIO, AIO',
    description:
      'Blocking IO, Non-blocking IO, Asynchronous IO — understanding the 5 IO models and their trade-offs.',
    categoryId: 'io',
    icon: '🔄',
    difficulty: 'Advanced',
    tags: [
      'BIO',
      'NIO',
      'AIO',
      'IO Multiplexing',
      'Reactor',
      'epoll',
      'Event-Driven',
      'Netty',
      'Proactor',
    ],
    content: [
      {
        heading: 'BIO (Blocking IO)',
        body: "Traditional Java IO — **one thread per connection**. Thread blocks on read/write until data is available. *Simple to program but doesn't scale*: 10,000 connections need 10,000 threads (*each ~1MB stack*).\n\nSuitable for: low-concurrency servers, simple clients, file operations. *Spring MVC's traditional model (Tomcat BIO connector).*",
      },
      {
        heading: 'NIO (Non-blocking IO / IO Multiplexing)',
        body: 'Java NIO with **Selectors** enables **IO multiplexing**: one thread monitors multiple connections using `select`/`poll`/`epoll` (*OS-level*). Thread is only activated when data is available. The thread drives the IO loop (**Reactor pattern**).\n\nSuitable for: high-concurrency servers. Powers: Netty, Tomcat NIO connector, Nginx.\n*Not truly asynchronous — the IO operation itself still blocks the calling thread briefly.*',
      },
      {
        heading: 'AIO (Asynchronous IO)',
        body: "Java NIO.2 (Java 7) adds truly **asynchronous channels**: `AsynchronousSocketChannel`, `AsynchronousFileChannel`. IO operations return immediately and notify via callback (`CompletionHandler`) or `Future` when complete.\n\nThe OS performs the IO in the background (**Proactor pattern**). *Limited adoption in practice — Netty chose NIO over AIO because Linux's AIO support (`io_uring` is new) wasn't mature. Windows IOCP has better AIO support.*",
      },
      {
        heading: 'Reactor vs Proactor',
        body: '**Reactor** (NIO): the application is notified when IO IS READY — the application then performs the IO.\n**Proactor** (AIO): the application initiates IO and is notified when IO IS COMPLETE — the OS performs the IO.\n\nMost Java frameworks use Reactor (Netty, Vert.x, Spring WebFlux).\nModern approach: **virtual threads** (Java 21) make BIO scalable again — *write simple blocking code, JVM handles the multiplexing*.',
      },
      {
        heading: 'When to Use Each Model',
        body: 'Use **BIO** when: low concurrency (<100 connections), simple request-response, file I/O operations, or when using Java 21+ virtual threads (*they make BIO scalable again*).\n\nUse **NIO** (Reactor) when: high concurrency (thousands of connections), building a chat server, proxy, or API gateway, or when you need to maximize throughput with minimal threads — *this is the standard for production network servers (Netty, Tomcat NIO)*.\n\nUse **AIO** (Proactor) when: the OS has strong AIO support (Windows IOCP), or for file operations where true async is beneficial. *In practice, AIO is rarely used in Java — Netty benchmarked it and found NIO with `epoll` outperformed Linux AIO.*\n\nModern recommendation: for new projects, use **virtual threads** (Java 21+) with simple blocking I/O for most use cases. Use Netty/NIO only when you need the absolute highest performance or are building infrastructure-level software (*proxies, message brokers, databases*).',
      },
    ],
    codeExamples: [
      {
        title: 'IO Model Comparison',
        language: 'java',
        code: `// BIO — one thread per connection (simple but doesn't scale)
ServerSocket server = new ServerSocket(8080);
while (true) {
    Socket client = server.accept(); // blocks
    new Thread(() -> {
        try (var in = client.getInputStream(); var out = client.getOutputStream()) {
            int b;
            while ((b = in.read()) != -1) { out.write(b); } // blocks
        }
    }).start(); // one thread per connection!
}

// AIO — truly asynchronous with callback
AsynchronousServerSocketChannel aServer =
    AsynchronousServerSocketChannel.open().bind(new InetSocketAddress(8080));
aServer.accept(null, new CompletionHandler<AsynchronousSocketChannel, Void>() {
    @Override public void completed(AsynchronousSocketChannel client, Void att) {
        aServer.accept(null, this); // accept next connection
        ByteBuffer buffer = ByteBuffer.allocate(1024);
        client.read(buffer, buffer, new CompletionHandler<>() {
            @Override public void completed(Integer result, ByteBuffer buf) {
                buf.flip();
                client.write(buf); // echo back
            }
            @Override public void failed(Throwable exc, ByteBuffer buf) {}
        });
    }
    @Override public void failed(Throwable exc, Void att) {}
});

// Modern approach: Virtual Threads make BIO scalable!
// Simple blocking code + virtual threads = best of both worlds
try (var server = ServerSocket(8080);
     var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    while (true) {
        Socket client = server.accept();
        executor.submit(() -> handleClient(client)); // virtual thread per connection
    }
}`,
      },
      {
        title: 'Netty-Style Event Loop (Conceptual)',
        language: 'java',
        code: `// Simplified event loop — the core idea behind Netty's architecture
// One thread runs the loop, handling events for MANY connections

class EventLoop implements Runnable {
    private final Selector selector;
    private final Map<SelectionKey, Handler> handlers = new ConcurrentHashMap<>();

    EventLoop() throws IOException { this.selector = Selector.open(); }

    void register(SocketChannel channel, Handler handler) throws IOException {
        channel.configureBlocking(false);
        SelectionKey key = channel.register(selector, SelectionKey.OP_READ);
        handlers.put(key, handler);
    }

    @Override
    public void run() {
        while (!Thread.interrupted()) {
            try {
                selector.select(100); // poll with timeout
                var keys = selector.selectedKeys().iterator();
                while (keys.hasNext()) {
                    var key = keys.next();
                    keys.remove();
                    Handler handler = handlers.get(key);
                    if (handler != null) handler.handle(key);
                }
            } catch (IOException e) { break; }
        }
    }
}

// Netty's real architecture layers on top of this:
// EventLoopGroup (multiple event loops, one per CPU core)
//   └── EventLoop (single-threaded selector loop)
//         └── Channel (many channels per event loop)
//               └── ChannelPipeline (chain of handlers)
//                     └── ChannelHandler (codec, business logic)

// In Netty, you write:
// EventLoopGroup bossGroup = new NioEventLoopGroup(1);   // accepts connections
// EventLoopGroup workerGroup = new NioEventLoopGroup();   // handles I/O
// ServerBootstrap b = new ServerBootstrap()
//     .group(bossGroup, workerGroup)
//     .channel(NioServerSocketChannel.class)
//     .childHandler(new MyChannelInitializer());`,
      },
    ],
  },
  {
    id: 'io-design-patterns',
    title: 'IO Design Patterns',
    description:
      'Decorator pattern in Java IO, Adapter pattern, and how the IO library is architecturally designed.',
    categoryId: 'io',
    icon: '🎨',
    difficulty: 'Intermediate',
    tags: [
      'Decorator',
      'Adapter',
      'Design Pattern',
      'IO Architecture',
      'Wrapper Pattern',
      'Stream Chaining',
      'Composition',
    ],
    content: [
      {
        heading: 'Decorator Pattern in Java IO',
        body: 'Java IO extensively uses the **Decorator pattern**: wrap a stream with additional functionality without changing the interface.\n\nExample: `new BufferedInputStream(new FileInputStream("file"))` — `BufferedInputStream` decorates `FileInputStream` with buffering. You can stack decorators: `new DataInputStream(new BufferedInputStream(new FileInputStream("file")))`.\nEach layer adds responsibility while delegating the core operation to the wrapped stream.',
      },
      {
        heading: 'Common Decorator Chains',
        body: '**File + Buffer**: `new BufferedReader(new FileReader(...))`.\n**File + Charset + Buffer**: `new BufferedReader(new InputStreamReader(new FileInputStream(...), UTF_8))`.\n**Compression**: `new GZIPInputStream(new BufferedInputStream(new FileInputStream(...)))`.\n**Encryption + Compression**: `new CipherInputStream(new GZIPInputStream(...))`.\n\nEach wrapper is transparent — the outer code just sees `InputStream`/`Reader`.',
      },
      {
        heading: 'Adapter Pattern',
        body: '`InputStreamReader`/`OutputStreamWriter` are **adapters**: they convert byte streams to character streams (*adapting the interface*).\n`InputStreamReader` adapts `InputStream` to `Reader` interface, handling character encoding. Similarly, `Channels.newInputStream`/`newOutputStream` adapt NIO `Channel`s to IO `Stream`s.',
      },
      {
        heading: 'Why This Design',
        body: "Without decorators, you'd need: `FileBufferedInputStream`, `FileBufferedGZIPInputStream`, `NetworkBufferedInputStream`... — *combinatorial explosion of classes*. The **decorator pattern** allows mixing and matching capabilities.\n\nThe cost is verbosity (*deep nesting of constructors*), which is why the `Files` utility class (Java 7+) provides convenience methods like `Files.newBufferedReader(path)` and `Files.readString(path)`.",
      },
    ],
    codeExamples: [
      {
        title: 'Decorator Pattern in IO',
        language: 'java',
        code: `// Classic decorator chain
InputStream fileStream = new FileInputStream("data.gz");
InputStream buffered = new BufferedInputStream(fileStream);    // + buffering
InputStream decompressed = new GZIPInputStream(buffered);      // + decompression
Reader textReader = new InputStreamReader(decompressed, UTF_8);// + charset decoding
BufferedReader lineReader = new BufferedReader(textReader);     // + line reading

// Same thing, inline
try (var reader = new BufferedReader(
        new InputStreamReader(
            new GZIPInputStream(
                new BufferedInputStream(
                    new FileInputStream("data.gz"))),
            StandardCharsets.UTF_8))) {
    reader.lines().forEach(System.out::println);
}

// Modern equivalent using Files utility
try (var lines = Files.lines(Path.of("file.txt"), StandardCharsets.UTF_8)) {
    lines.filter(l -> !l.isBlank()).forEach(System.out::println);
}

// Writing compressed data
try (var out = new PrintWriter(
        new OutputStreamWriter(
            new GZIPOutputStream(
                new FileOutputStream("output.gz")),
            StandardCharsets.UTF_8))) {
    out.println("Compressed text output");
}`,
      },
    ],
  },
];
