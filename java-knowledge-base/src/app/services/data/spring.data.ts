import { Topic } from '../../models/knowledge.model';

export const SPRING_TOPICS: Topic[] = [
    {
      id: 'spring-boot-essentials',
      title: 'Spring Boot Essentials',
      description: 'Auto-configuration, starters, application properties, profiles, and building production-ready apps.',
      categoryId: 'spring',
      icon: '🚀',
      difficulty: 'Intermediate',
      tags: ['Spring Boot', 'Auto-Configuration', 'Starters', 'Profiles'],
      content: [
        {
          heading: 'Auto-Configuration',
          body: 'Spring Boot auto-configuration automatically configures beans based on classpath contents, property settings, and existing beans. Uses @Conditional annotations (ConditionalOnClass, ConditionalOnMissingBean, etc.). You can see active configurations with --debug flag or /actuator/conditions. Custom auto-configuration: create @Configuration class + register in META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports.'
        },
        {
          heading: 'Starters',
          body: 'Starters are curated dependency sets: spring-boot-starter-web (Tomcat + Spring MVC), spring-boot-starter-data-jpa (Hibernate + Spring Data), spring-boot-starter-security, spring-boot-starter-test. They manage compatible versions through the spring-boot-dependencies BOM (Bill of Materials). Never specify versions for managed dependencies — let the BOM handle it.'
        },
        {
          heading: 'Configuration & Profiles',
          body: 'application.properties or application.yml configure the app. Profiles: application-{profile}.yml for environment-specific config. Activate: `spring.profiles.active=production`. @ConfigurationProperties binds properties to typed POJOs (type-safe, validated). Property precedence: command line → env variables → application-{profile} → application → defaults. Use @Value for simple cases, @ConfigurationProperties for groups.'
        },
        {
          heading: 'Production Features',
          body: 'Spring Boot Actuator: health checks (/health), metrics (/metrics), info (/info), env (/env), thread dump (/threaddump). Graceful shutdown: `server.shutdown=graceful`. Micrometer: metrics facade (like SLF4J for metrics) — supports Prometheus, Datadog, CloudWatch. DevTools: auto-restart, live reload (dev only). GraalVM native image support since Spring Boot 3.'
        },
        {
          heading: 'Common Mistakes',
          body: '1) Field injection everywhere — using @Autowired on fields hides dependencies, prevents final fields, and makes unit testing hard. Use constructor injection instead. 2) Catching exceptions in controllers — scattering try-catch blocks across every controller method. Use @ControllerAdvice for centralized exception handling. 3) Not using profiles — hardcoding configuration instead of externalizing with application-{profile}.yml. 4) Exposing entities as API responses — returning JPA entities directly causes lazy loading issues, circular references, and couples your API to your database schema. Use DTOs. 5) Ignoring connection pool tuning — the default HikariCP pool size (10) may be too small for production; set spring.datasource.hikari.maximum-pool-size based on load testing. 6) Blocking in WebFlux — mixing blocking calls (JDBC, Thread.sleep) in a reactive pipeline starves the event loop. Use subscribeOn(Schedulers.boundedElastic()) or switch to R2DBC. 7) Forgetting @Transactional boundaries — placing @Transactional on private methods (doesn\'t work due to proxy), or on methods called internally within the same class (self-invocation bypasses proxy).'
        }
      ],
      codeExamples: [
        {
          title: 'Spring Boot REST API',
          language: 'java',
          code: `@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public Page<UserDto> list(Pageable pageable) {
        return userService.findAll(pageable);
    }

    @GetMapping("/{id}")
    public UserDto getById(@PathVariable Long id) {
        return userService.findById(id)
            .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserDto create(@Valid @RequestBody CreateUserRequest request) {
        return userService.create(request);
    }
}

@ConfigurationProperties(prefix = "app.mail")
@Validated
public record MailProperties(
    @NotBlank String host,
    @Min(1) @Max(65535) int port,
    @Email String from
) {}`
        },
        {
          title: 'Exception Handling with @ControllerAdvice',
          language: 'java',
          code: `// Centralized exception handling — one place for all error responses
@RestControllerAdvice
public class GlobalExceptionHandler {

    record ErrorResponse(int status, String error, String message, Instant timestamp) {
        ErrorResponse(int status, String error, String message) {
            this(status, error, message, Instant.now());
        }
    }

    @ExceptionHandler(EntityNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    ErrorResponse handleNotFound(EntityNotFoundException ex) {
        return new ErrorResponse(404, "Not Found", ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    ErrorResponse handleValidation(MethodArgumentNotValidException ex) {
        String errors = ex.getBindingResult().getFieldErrors().stream()
            .map(fe -> fe.getField() + ": " + fe.getDefaultMessage())
            .collect(Collectors.joining(", "));
        return new ErrorResponse(400, "Validation Failed", errors);
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    ErrorResponse handleForbidden(AccessDeniedException ex) {
        return new ErrorResponse(403, "Forbidden", "Insufficient permissions");
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    ErrorResponse handleGeneral(Exception ex) {
        log.error("Unhandled exception", ex);
        return new ErrorResponse(500, "Internal Server Error",
            "An unexpected error occurred");
    }
}

// Now controllers are clean — just throw exceptions
@GetMapping("/{id}")
public UserDto getById(@PathVariable Long id) {
    return userService.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("User not found: " + id));
}`
        }
      ]
    },
    {
      id: 'dependency-injection',
      title: 'Dependency Injection & IoC',
      description: 'Spring\'s IoC container, bean lifecycle, scopes, injection types, and DI best practices.',
      categoryId: 'spring',
      icon: '💉',
      difficulty: 'Beginner',
      tags: ['DI', 'IoC', 'Bean Lifecycle', 'Spring Container', 'Scope'],
      content: [
        {
          heading: 'IoC and DI',
          body: 'Inversion of Control (IoC): the framework controls object creation and wiring, not your code. Dependency Injection (DI): dependencies are provided (\"injected\") rather than created by the class itself. Benefits: loose coupling, testability (mock dependencies), configurability (swap implementations via profiles).'
        },
        {
          heading: 'Injection Types',
          body: 'Constructor injection (recommended): dependencies as constructor parameters — fields can be final, clear required dependencies, easy to test. @Autowired optional since Spring 4.3 for single constructors. Setter injection: for optional dependencies. Field injection (@Autowired on fields): discouraged — hides dependencies, hard to test, can\'t make fields final. Use @Qualifier or @Primary to resolve ambiguity when multiple beans of same type exist.'
        },
        {
          heading: 'Bean Scopes',
          body: 'singleton (default): one instance per container. prototype: new instance per injection point. request: one per HTTP request. session: one per HTTP session. application: one per ServletContext. Custom scopes possible. Warning: injecting prototype into singleton → always gets the same prototype instance! Fix: use ObjectProvider<T>, @Lookup method, or Provider<T>.'
        },
        {
          heading: 'Bean Lifecycle',
          body: 'Instantiation → populate properties (DI) → BeanNameAware/BeanFactoryAware → @PostConstruct → InitializingBean.afterPropertiesSet() → custom init → ready → @PreDestroy → DisposableBean.destroy() → custom destroy. Use @PostConstruct for initialization logic (data loading, validation). Use @PreDestroy for cleanup (close connections, release resources). BeanPostProcessor hooks allow cross-cutting concerns (AOP proxy creation happens here).'
        },
        {
          heading: 'Real-World Analogy',
          body: 'Dependency Injection is like a restaurant kitchen. The chef (your service class) does not go shopping for ingredients — instead, the ingredients (dependencies) are delivered to the kitchen by a supplier (the Spring IoC container). The chef declares what they need: "I require butter, eggs, and flour" (constructor parameters). The restaurant manager (Spring) reads the recipe (configuration) and delivers the right ingredients before the chef starts cooking. This means the chef can focus on cooking (business logic) without worrying about where the ingredients come from. For testing, you can deliver mock ingredients (test doubles) — the chef cooks the same way regardless. If you switch from butter to margarine (swap implementations), the chef\'s recipe doesn\'t change — you just update the delivery manifest (Spring configuration or profile). Constructor injection is like a prep list posted on the kitchen door: everyone can see exactly what\'s needed before service starts.'
        }
      ],
      codeExamples: [
        {
          title: 'Spring DI Patterns',
          language: 'java',
          code: `// Constructor injection (preferred)
@Service
public class OrderService {
    private final OrderRepository orderRepo;
    private final PaymentGateway payment;

    public OrderService(OrderRepository orderRepo, PaymentGateway payment) {
        this.orderRepo = orderRepo;
        this.payment = payment;
    }

    @Transactional
    public Order placeOrder(CreateOrderRequest request) {
        Order order = orderRepo.save(Order.from(request));
        payment.charge(order.getTotal());
        return order;
    }
}

// Profile-based bean selection
@Configuration
public class PaymentConfig {
    @Bean @Profile("production")
    public PaymentGateway stripeGateway(StripeProperties props) {
        return new StripePaymentGateway(props);
    }

    @Bean @Profile("!production")
    public PaymentGateway mockGateway() {
        return new MockPaymentGateway();
    }
}

// Prototype in Singleton — use ObjectProvider
@Service
public class TaskService {
    private final ObjectProvider<TaskProcessor> processorProvider;

    public TaskService(ObjectProvider<TaskProcessor> processorProvider) {
        this.processorProvider = processorProvider;
    }

    public void process(Task task) {
        TaskProcessor processor = processorProvider.getObject(); // new instance
        processor.execute(task);
    }
}`
        },
        {
          title: 'Testing with Mocked Dependencies',
          language: 'java',
          code: `// Constructor injection makes unit testing trivial
// No Spring context needed — just pass mocks directly

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock OrderRepository orderRepo;
    @Mock PaymentGateway payment;
    @Mock EventPublisher events;

    @InjectMocks OrderService orderService;

    @Test
    void placeOrder_chargesPaymentAndSavesOrder() {
        // Arrange
        var request = new CreateOrderRequest("SKU-001", 2);
        var savedOrder = Order.builder().id(1L).total(new BigDecimal("99.98")).build();
        when(orderRepo.save(any(Order.class))).thenReturn(savedOrder);

        // Act
        Order result = orderService.placeOrder(request);

        // Assert
        assertThat(result.getId()).isEqualTo(1L);
        verify(payment).charge(new BigDecimal("99.98"));
        verify(orderRepo).save(any(Order.class));
        verify(events).publish(any(OrderPlacedEvent.class));
        verifyNoMoreInteractions(payment);
    }

    @Test
    void placeOrder_paymentFails_throwsAndDoesNotSave() {
        var request = new CreateOrderRequest("SKU-001", 1);
        doThrow(new PaymentDeclinedException("Insufficient funds"))
            .when(payment).charge(any());

        assertThatThrownBy(() -> orderService.placeOrder(request))
            .isInstanceOf(PaymentDeclinedException.class);

        verify(orderRepo, never()).save(any());
    }
}

// Integration test with Spring context (test slice)
@WebMvcTest(OrderController.class)
class OrderControllerTest {
    @Autowired MockMvc mockMvc;
    @MockBean OrderService orderService;

    @Test
    void getOrder_returnsJson() throws Exception {
        when(orderService.findById(1L)).thenReturn(Optional.of(testOrder()));
        mockMvc.perform(get("/api/orders/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(1));
    }
}`
        }
      ]
    },
];
