import { Topic } from '../../models/knowledge.model';

export const DESIGN_PATTERNS_TOPICS: Topic[] = [
  {
    id: 'creational-patterns',
    title: 'Creational Patterns',
    description: 'Singleton, Factory Method, Abstract Factory, Builder, and Prototype patterns in Java.',
    categoryId: 'design-patterns',
    icon: '🏭',
    difficulty: 'Intermediate',
    tags: ['Singleton', 'Factory', 'Builder', 'Creational'],
    content: [
      {
        heading: 'Singleton',
        body: 'Ensures a class has exactly one instance. Best approach in Java: enum singleton (immune to reflection and serialization attacks, guaranteed by JVM). Other approaches: static holder idiom (lazy, thread-safe via class loading), double-checked locking (requires volatile). Spring beans are singletons by default (but managed by the container, not the class itself). In modern Java, prefer dependency injection over singletons for testability.'
      },
      {
        heading: 'Builder Pattern',
        body: 'Separates construction of complex objects from their representation. Ideal for classes with many optional parameters (avoids telescoping constructors). The builder provides a fluent API for step-by-step construction. The product should be immutable (all fields final, set in constructor from builder). Java records can serve as simple builders with compact syntax. Lombok\'s @Builder generates builder boilerplate.'
      },
      {
        heading: 'Factory Method & Abstract Factory',
        body: 'Factory Method: defines an interface for creating objects but lets subclasses decide the concrete type. In Java, often implemented as static factory methods: `Optional.of()`, `List.of()`, `EnumSet.of()`. Advantages over constructors: named, can return cached instances, can return subtypes. Abstract Factory: creates families of related objects without specifying concrete classes — used in cross-platform UI toolkits.'
      },
      {
        heading: 'Prototype',
        body: 'Creates new objects by copying existing ones (cloning). Java supports via `Cloneable` interface and `clone()` method — but this is broken by design (shallow copy by default, checked exception, no constructor call). Better alternatives: copy constructors, copy factory methods, serialization-based deep copy, or simply creating new instances.'
      },
      {
        heading: 'When to Use Which Pattern',
        body: 'Singleton: when exactly one instance is needed globally (configuration, connection pool, cache). Prefer Spring-managed singletons over hand-rolled ones. Builder: when a class has 4+ constructor parameters, many optional parameters, or requires step-by-step construction. Essential for immutable objects with complex initialization. Factory Method: when the exact type to create is determined at runtime, or you want to return cached/shared instances. Use static factory methods (of(), from(), create()) as the default over public constructors. Abstract Factory: when you need to create families of related objects that must be used together (e.g., UI components for different platforms: WindowsButton + WindowsCheckbox vs MacButton + MacCheckbox). Prototype: when object creation is expensive (deep object graphs, database-loaded templates) and you need many similar copies. Rare in practice — copy constructors are simpler. Rule of thumb: start with a constructor, graduate to a static factory method, add a builder only when complexity demands it. Use Singleton only when you truly need exactly one instance.'
      }
    ],
    codeExamples: [
      {
        title: 'Creational Patterns',
        language: 'java',
        code: `// Enum Singleton (Joshua Bloch's recommended)
public enum AppConfig {
    INSTANCE;
    private final Properties props = loadProperties();
    public String get(String key) { return props.getProperty(key); }
}

// Builder Pattern
public class HttpRequest {
    private final String url;
    private final String method;
    private final Map<String, String> headers;
    private final Duration timeout;

    private HttpRequest(Builder b) {
        this.url = b.url; this.method = b.method;
        this.headers = Map.copyOf(b.headers); this.timeout = b.timeout;
    }

    public static class Builder {
        private final String url;
        private String method = "GET";
        private final Map<String, String> headers = new HashMap<>();
        private Duration timeout = Duration.ofSeconds(30);

        public Builder(String url) { this.url = Objects.requireNonNull(url); }
        public Builder method(String m) { this.method = m; return this; }
        public Builder header(String k, String v) { headers.put(k, v); return this; }
        public Builder timeout(Duration t) { this.timeout = t; return this; }
        public HttpRequest build() { return new HttpRequest(this); }
    }
}

// Static Factory Method
public static Optional<User> findById(long id) { /* ... */ }
public static List<User> of(User... users) { return List.of(users); }`
      },
      {
        title: 'Abstract Factory Pattern',
        language: 'java',
        code: `// Abstract Factory — create families of related objects
interface UIFactory {
    Button createButton();
    Checkbox createCheckbox();
    TextField createTextField();
}

interface Button { void render(); }
interface Checkbox { void render(); }
interface TextField { void render(); }

// Concrete factory for Material Design
class MaterialUIFactory implements UIFactory {
    public Button createButton() { return new MaterialButton(); }
    public Checkbox createCheckbox() { return new MaterialCheckbox(); }
    public TextField createTextField() { return new MaterialTextField(); }
}

// Concrete factory for iOS style
class IOSUIFactory implements UIFactory {
    public Button createButton() { return new IOSButton(); }
    public Checkbox createCheckbox() { return new IOSCheckbox(); }
    public TextField createTextField() { return new IOSTextField(); }
}

// Client code — depends only on abstractions
class LoginForm {
    private final Button submitBtn;
    private final TextField usernameField;
    private final Checkbox rememberMe;

    LoginForm(UIFactory factory) {
        this.submitBtn = factory.createButton();
        this.usernameField = factory.createTextField();
        this.rememberMe = factory.createCheckbox();
    }

    void render() {
        usernameField.render();
        rememberMe.render();
        submitBtn.render();
    }
}

// Usage — swap entire UI family by changing the factory
UIFactory factory = switch (platform) {
    case "material" -> new MaterialUIFactory();
    case "ios" -> new IOSUIFactory();
    default -> throw new IllegalArgumentException();
};
new LoginForm(factory).render();`
      }
    ]
  },
  {
    id: 'behavioral-patterns',
    title: 'Behavioral Patterns',
    description: 'Strategy, Observer, Template Method, Chain of Responsibility, and Command patterns in Java.',
    categoryId: 'design-patterns',
    icon: '🎭',
    difficulty: 'Intermediate',
    tags: ['Strategy', 'Observer', 'Template Method', 'Command', 'Behavioral'],
    content: [
      {
        heading: 'Strategy Pattern',
        body: 'Defines a family of algorithms, encapsulates each one, and makes them interchangeable. In modern Java, strategies are often functional interfaces + lambdas — no need for separate strategy classes. Examples in JDK: Comparator, java.util.function interfaces. Spring uses it extensively: PlatformTransactionManager, ResourceLoader, ViewResolver.'
      },
      {
        heading: 'Observer Pattern',
        body: 'Defines a one-to-many dependency: when one object changes state, all dependents are notified. Java provides: PropertyChangeListener/Support (beans), Flow API (Java 9, reactive streams spec). In Spring: ApplicationEvent/ApplicationListener, @EventListener. Modern alternatives: reactive libraries (Project Reactor, RxJava), message brokers for distributed systems.'
      },
      {
        heading: 'Template Method',
        body: 'Defines the skeleton of an algorithm in a superclass, deferring specific steps to subclasses. The abstract class defines invariant structure; subclasses provide variant behavior. Common in frameworks: Spring\'s JdbcTemplate, RestTemplate, TransactionTemplate — the "template" name literally comes from this pattern. With lambdas, often replaced by Strategy + functional interfaces.'
      },
      {
        heading: 'Chain of Responsibility',
        body: 'Passes a request along a chain of handlers until one handles it. Each handler decides to process or pass to the next. Examples: Servlet filters, Spring Security filter chain, Spring HandlerInterceptor, logging handlers. Decouples sender from receivers, allows dynamic chain composition.'
      },
      {
        heading: 'Patterns in the JDK and Spring',
        body: 'Strategy: Comparator (Collections.sort), LayoutManager (Swing), javax.crypto.Cipher. In Spring: PlatformTransactionManager, ResourceLoader, ViewResolver, RetryPolicy. Observer: java.beans.PropertyChangeListener, java.util.Observer (deprecated), Flow API (reactive streams). In Spring: ApplicationEvent/@EventListener, @TransactionalEventListener, WebSocket message handlers. Template Method: java.io.InputStream.read(byte[]) calls abstract read(), java.util.AbstractList. In Spring: JdbcTemplate, RestTemplate, TransactionTemplate, AbstractController. Chain of Responsibility: javax.servlet.Filter chain, java.util.logging.Handler chain. In Spring: Spring Security FilterChainProxy, HandlerInterceptor, Spring MVC ExceptionHandler chain, Spring AOP advisor chain. Command: Runnable (the command), ThreadPoolExecutor (the invoker). In Spring: Spring Batch Step/Tasklet, Spring Integration Message handlers. Iterator: java.util.Iterator, enhanced for-loop, Stream.iterator(). In Spring: ResultSet processing in JdbcTemplate, message channel iteration.'
      }
    ],
    codeExamples: [
      {
        title: 'Strategy and Observer',
        language: 'java',
        code: `// Strategy with lambdas
@FunctionalInterface
interface PricingStrategy {
    BigDecimal calculatePrice(BigDecimal basePrice, int quantity);
}

PricingStrategy standard = (price, qty) -> price.multiply(BigDecimal.valueOf(qty));
PricingStrategy bulk = (price, qty) ->
    price.multiply(BigDecimal.valueOf(qty))
         .multiply(qty > 100 ? new BigDecimal("0.85") : BigDecimal.ONE);

// Swap strategy at runtime
var calculator = new OrderCalculator(standard);
calculator.setStrategy(bulk);

// Observer with Spring Events
public record OrderPlacedEvent(Long orderId, BigDecimal total) {}

@Component
public class OrderService {
    @Autowired private ApplicationEventPublisher publisher;
    public void placeOrder(Order order) {
        // ... save order ...
        publisher.publishEvent(new OrderPlacedEvent(order.getId(), order.getTotal()));
    }
}

@Component
public class NotificationListener {
    @EventListener
    @Async
    public void onOrderPlaced(OrderPlacedEvent event) {
        sendConfirmationEmail(event.orderId());
    }
}`
      },
      {
        title: 'Chain of Responsibility Pattern',
        language: 'java',
        code: `// Chain of Responsibility — request passes through a pipeline of handlers
abstract class RequestHandler {
    private RequestHandler next;

    RequestHandler setNext(RequestHandler next) {
        this.next = next;
        return next; // enable chaining: a.setNext(b).setNext(c)
    }

    void handle(HttpRequest request) {
        if (canHandle(request)) {
            process(request);
        } else if (next != null) {
            next.handle(request);
        } else {
            throw new UnsupportedOperationException("No handler for: " + request);
        }
    }

    abstract boolean canHandle(HttpRequest request);
    abstract void process(HttpRequest request);
}

class AuthenticationHandler extends RequestHandler {
    boolean canHandle(HttpRequest req) { return true; } // always runs
    void process(HttpRequest req) {
        if (req.getHeader("Authorization") == null)
            throw new SecurityException("Unauthenticated");
        super.handle(req); // pass to next handler after auth check
    }
}

class RateLimitHandler extends RequestHandler {
    boolean canHandle(HttpRequest req) { return true; }
    void process(HttpRequest req) {
        if (isRateLimited(req.getClientIp()))
            throw new TooManyRequestsException();
        super.handle(req);
    }
}

class BusinessLogicHandler extends RequestHandler {
    boolean canHandle(HttpRequest req) { return true; }
    void process(HttpRequest req) { /* actual business logic */ }
}

// Build the chain
RequestHandler chain = new AuthenticationHandler();
chain.setNext(new RateLimitHandler())
     .setNext(new BusinessLogicHandler());

chain.handle(incomingRequest); // flows: auth → rate limit → logic`
      }
    ]
  },
];
