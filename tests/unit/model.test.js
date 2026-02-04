const { TodoService } = require("../../js/model");

describe("TodoService Unit Tests", () => {
  let service;

  beforeEach(() => {
    // Create a new service instance for each test
    service = new TodoService();
    // Reset todos to ensure test isolation
    service.todos = [];
  });

  test("should add a new todo", () => {
    service.addTodo("Learn Jest");

    expect(service.todos.length).toBe(1);
    expect(service.todos[0].text).toBe("Learn Jest");
    expect(service.todos[0].completed).toBe(false);
  });

  test("should toggle the completed state of a todo", () => {
    service.addTodo("Write unit tests");
    const todoId = service.todos[0].id;

    service.toggleTodoComplete(todoId);
    expect(service.todos[0].completed).toBe(true);

    service.toggleTodoComplete(todoId);
    expect(service.todos[0].completed).toBe(false);
  });

  test("should remove a todo", () => {
    service.addTodo("Delete me");
    const todoId = service.todos[0].id;

    service.removeTodo(todoId);

    expect(service.todos.length).toBe(0);
  });

  test("should not add a todo if text is empty", () => {
    service.addTodo("");

    expect(service.todos.length).toBe(0);
  });
});
