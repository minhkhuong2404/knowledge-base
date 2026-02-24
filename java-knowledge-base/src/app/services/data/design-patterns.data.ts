import { Topic } from '../../models/knowledge.model';

export const DESIGN_PATTERNS_TOPICS: Topic[] = [
  {
    id: 'creational-patterns',
    title: 'Creational Patterns',
    description: 'Singleton, Factory Method, Abstract Factory, Builder, and Prototype patterns in Java.',
    categoryId: 'design-patterns',
    icon: '🏭',
    difficulty: 'Intermediate',
    tags: ['Singleton', 'Factory', 'Builder', 'Creational', 'Abstract Factory', 'Prototype', 'Factory Method', 'Fluent API', 'Immutable Objects'],
    content: [
      {
        heading: 'Singleton',
        body: 'Ensures a class has exactly one instance. Best approach in Java: **enum singleton** *(immune to reflection and serialization attacks, guaranteed by JVM)*.\n\nOther approaches: **static holder idiom** *(lazy, thread-safe via class loading)*, **double-checked locking** *(requires volatile)*.\n\nSpring beans are singletons by default *(but managed by the container, not the class itself)*. In modern Java, prefer **dependency injection** over singletons for testability.'
      },
      {
        heading: 'Builder Pattern',
        body: 'Separates construction of complex objects from their representation. Ideal for classes with many optional parameters *(avoids telescoping constructors)*.\n\nThe builder provides a **fluent API** for step-by-step construction. The product should be **immutable** *(all fields final, set in constructor from builder)*.\n\nJava records can serve as simple builders with compact syntax. Lombok\'s `@Builder` generates builder boilerplate.'
      },
      {
        heading: 'Factory Method & Abstract Factory',
        body: '**Factory Method**: defines an interface for creating objects but lets subclasses decide the concrete type. In Java, often implemented as **static factory methods**: `Optional.of()`, `List.of()`, `EnumSet.of()`.\n\nAdvantages over constructors: *named, can return cached instances, can return subtypes*.\n\n**Abstract Factory**: creates families of related objects without specifying concrete classes — used in cross-platform UI toolkits.'
      },
      {
        heading: 'Prototype',
        body: 'Creates new objects by copying existing ones (cloning). Java supports via `Cloneable` interface and `clone()` method — *but this is broken by design (shallow copy by default, checked exception, no constructor call)*.\n\nBetter alternatives: **copy constructors**, **copy factory methods**, serialization-based deep copy, or simply creating new instances.'
      },
      {
        heading: 'When to Use Which Pattern',
        body: '**Singleton**: when exactly one instance is needed globally *(configuration, connection pool, cache)*. Prefer Spring-managed singletons over hand-rolled ones.\n\n**Builder**: when a class has 4+ constructor parameters, many optional parameters, or requires step-by-step construction. *Essential for immutable objects with complex initialization.*\n\n**Factory Method**: when the exact type to create is determined at runtime, or you want to return cached/shared instances. Use static factory methods (`of()`, `from()`, `create()`) as the default over public constructors.\n\n**Abstract Factory**: when you need to create families of related objects that must be used together *(e.g., UI components for different platforms: WindowsButton + WindowsCheckbox vs MacButton + MacCheckbox)*.\n\n**Prototype**: when object creation is expensive *(deep object graphs, database-loaded templates)* and you need many similar copies. *Rare in practice — copy constructors are simpler.*\n\nRule of thumb: start with a constructor, graduate to a static factory method, add a builder only when complexity demands it. Use **Singleton** only when you truly need exactly one instance.'
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
    tags: ['Strategy', 'Observer', 'Template Method', 'Command', 'Behavioral', 'Chain of Responsibility', 'State Pattern', 'Iterator', 'Event-Driven'],
    content: [
      {
        heading: 'Strategy Pattern',
        body: 'Defines a family of algorithms, encapsulates each one, and makes them interchangeable. In modern Java, strategies are often **functional interfaces + lambdas** — *no need for separate strategy classes*.\n\nExamples in JDK: `Comparator`, `java.util.function` interfaces. Spring uses it extensively: `PlatformTransactionManager`, `ResourceLoader`, `ViewResolver`.'
      },
      {
        heading: 'Observer Pattern',
        body: 'Defines a one-to-many dependency: when one object changes state, all dependents are notified.\n\nJava provides: `PropertyChangeListener`/Support *(beans)*, **Flow API** *(Java 9, reactive streams spec)*.\n\nIn Spring: `ApplicationEvent`/`ApplicationListener`, `@EventListener`. Modern alternatives: reactive libraries *(Project Reactor, RxJava)*, message brokers for distributed systems.'
      },
      {
        heading: 'Template Method',
        body: 'Defines the skeleton of an algorithm in a superclass, deferring specific steps to subclasses. The abstract class defines invariant structure; subclasses provide variant behavior.\n\nCommon in frameworks: Spring\'s `JdbcTemplate`, `RestTemplate`, `TransactionTemplate` — *the "template" name literally comes from this pattern*. With lambdas, often replaced by **Strategy + functional interfaces**.'
      },
      {
        heading: 'Chain of Responsibility',
        body: 'Passes a request along a chain of handlers until one handles it. Each handler decides to process or pass to the next.\n\nExamples: Servlet filters, Spring Security filter chain, Spring `HandlerInterceptor`, logging handlers. Decouples sender from receivers, allows dynamic chain composition.'
      },
      {
        heading: 'Patterns in the JDK and Spring',
        body: '**Strategy**: `Comparator` (`Collections.sort`), `LayoutManager` (Swing), `javax.crypto.Cipher`. In Spring: `PlatformTransactionManager`, `ResourceLoader`, `ViewResolver`, `RetryPolicy`.\n\n**Observer**: `java.beans.PropertyChangeListener`, `java.util.Observer` *(deprecated)*, **Flow API** (reactive streams). In Spring: `ApplicationEvent`/`@EventListener`, `@TransactionalEventListener`, WebSocket message handlers.\n\n**Template Method**: `java.io.InputStream.read(byte[])` calls abstract `read()`, `java.util.AbstractList`. In Spring: `JdbcTemplate`, `RestTemplate`, `TransactionTemplate`, `AbstractController`.\n\n**Chain of Responsibility**: `javax.servlet.Filter` chain, `java.util.logging.Handler` chain. In Spring: Spring Security `FilterChainProxy`, `HandlerInterceptor`, Spring MVC ExceptionHandler chain, Spring AOP advisor chain.\n\n**Command**: `Runnable` *(the command)*, `ThreadPoolExecutor` *(the invoker)*. In Spring: Spring Batch Step/Tasklet, Spring Integration Message handlers.\n\n**Iterator**: `java.util.Iterator`, enhanced for-loop, `Stream.iterator()`. In Spring: `ResultSet` processing in `JdbcTemplate`, message channel iteration.'
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
  {
    id: 'solid-principles',
    title: 'SOLID Principles',
    description: 'The five SOLID principles of object-oriented design — SRP, OCP, LSP, ISP, DIP with practical Java examples.',
    categoryId: 'design-patterns',
    icon: '🏛️',
    difficulty: 'Intermediate',
    tags: ['SOLID', 'SRP', 'OCP', 'LSP', 'ISP', 'DIP', 'Design Principles', 'Clean Code', 'Dependency Inversion', 'Single Responsibility'],
    content: [
      {
        heading: 'Single Responsibility Principle (SRP)',
        body: 'A class should have only one reason to change — meaning it should handle just one part of the functionality.\n\nExample: a `VehicleRegistration` class should only handle registration details. If it also manages insurance, it violates **SRP**.\n\nBenefits: easier to understand, test, maintain, and less fragile to changes. In practice: split large service classes into focused ones *(`UserService`, `EmailService`, `AuditService` instead of one monolithic `UserManager`)*.'
      },
      {
        heading: 'Open/Closed Principle (OCP)',
        body: 'Classes should be open for extension but closed for modification. You should be able to add new behavior without changing existing code.\n\nAchieved through: inheritance, composition, **strategy pattern**, and **dependency injection**.\n\nExample: a `VehicleService` class provides maintenance services. When adding electric vehicle support, extend it with `ElectricVehicleService` rather than modifying the original. In Spring: new endpoints, services, and configurations are added without modifying existing ones.'
      },
      {
        heading: 'Liskov Substitution Principle (LSP)',
        body: 'Objects of a superclass should be replaceable with objects of its subclasses without affecting program correctness.\n\nIf `Vehicle` has a `startEngine()` method, and subclasses `Car` and `ElectricCar` exist, we should be able to use any `Vehicle` subclass interchangeably. If `ElectricCar` cannot implement `startEngine()` because it doesn\'t have a traditional engine, the hierarchy violates **LSP**.\n\nFix: redesign the interface *(e.g., separate `start()` from engine-specific behavior)*. Violations often manifest as `instanceof` checks or unexpected exceptions in polymorphic code.'
      },
      {
        heading: 'Interface Segregation Principle (ISP)',
        body: 'Do not force any client to depend on methods it does not use — split large interfaces into smaller, focused ones.\n\nBad: one large `VehicleOperations` interface with `drive()`, `refuel()`, `charge()`, and `navigate()`. An `ElectricCar` would be forced to implement `refuel()` *— which makes no sense*.\n\nGood: split into `Drivable`, `Refuelable`, `Chargeable`, `Navigable`. Each class implements only the interfaces relevant to it. In Spring: prefer many small `@Service` interfaces over one God-service interface.'
      },
      {
        heading: 'Dependency Inversion Principle (DIP)',
        body: 'High-level modules should not depend directly on low-level modules — both should depend on **abstractions** (interfaces).\n\nExample: a `VehicleTracker` class should not depend on a specific GPS device model. Instead, it interacts through a `GPSDevice` interface, allowing any implementation to be used without changing `VehicleTracker`.\n\nThis is the foundation of **Dependency Injection** (DI) in Spring — components depend on interfaces, and the container injects the concrete implementations at runtime.'
      },
      {
        heading: 'SOLID in Practice',
        body: 'These principles are not absolute rules but guidelines that lead to maintainable, testable, and flexible code.\n\n*Trade-offs: overly strict adherence can lead to excessive abstraction and complexity (over-engineering).* Apply **SOLID** pragmatically: start simple, refactor toward SOLID when pain points emerge *(hard to test, hard to extend, brittle changes)*.\n\nIn interviews, demonstrate understanding by explaining both the principle AND when NOT to apply it.\n\n**Spring Framework** embodies all five: **SRP** *(focused beans)*, **OCP** *(extensible through configuration)*, **LSP** *(interface-based programming)*, **ISP** *(many small interfaces)*, **DIP** *(IoC container manages dependencies)*.'
      }
    ],
    codeExamples: [
      {
        title: 'SOLID Principles in Practice',
        language: 'java',
        code: `// SRP — each class has one responsibility
class OrderValidator { boolean validate(Order o) { /* validation only */ return true; } }
class OrderPersistence { void save(Order o) { /* database only */ } }
class OrderNotifier { void notify(Order o) { /* email only */ } }

// OCP — extend without modifying
interface DiscountStrategy {
    BigDecimal apply(BigDecimal price);
}
class NoDiscount implements DiscountStrategy {
    public BigDecimal apply(BigDecimal price) { return price; }
}
class SeasonalDiscount implements DiscountStrategy {
    public BigDecimal apply(BigDecimal price) {
        return price.multiply(new BigDecimal("0.8"));
    }
}
// Add new discounts without changing existing code

// LSP — subtypes are substitutable
interface Vehicle { void start(); double getRange(); }
record ElectricCar(double batteryKwh) implements Vehicle {
    public void start() { /* electric motor */ }
    public double getRange() { return batteryKwh * 4; }
}
record GasCar(double fuelLiters) implements Vehicle {
    public void start() { /* combustion engine */ }
    public double getRange() { return fuelLiters * 15; }
}
// Any Vehicle works — no instanceof checks needed
void planTrip(Vehicle v) { System.out.println("Range: " + v.getRange()); }

// ISP — small, focused interfaces
interface Printable { void print(); }
interface Scannable { void scan(); }
interface Faxable { void fax(); }
// Modern printer: implements Printable, Scannable
// Basic printer: implements Printable only

// DIP — depend on abstractions
interface NotificationSender { void send(String to, String msg); }
class EmailSender implements NotificationSender { /* ... */ }
class SmsSender implements NotificationSender { /* ... */ }
// High-level module depends on interface, not concrete class
class OrderService {
    private final NotificationSender sender; // injected
    OrderService(NotificationSender sender) { this.sender = sender; }
}`
      }
    ]
  },
];
