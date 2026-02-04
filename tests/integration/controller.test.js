const { TodoService } = require("../../js/model");
const { Controller } = require("../../js/controller");

const mockView = {
  bindAddTodo: jest.fn(),
  bindToggleTodo: jest.fn(),
  bindRemoveTodo: jest.fn(),
  update: jest.fn(),
};

describe("Controller–Model Integration Tests", () => {
  let service;
  let controller;

  beforeEach(() => {
    service = new TodoService();
    service.todos = [];

    controller = new Controller(service, mockView);
  });

  test("should add a todo through controller", () => {
    controller.handleAddTodo("Learn Integration Testing");

    expect(service.todos.length).toBe(1);
    expect(service.todos[0].text).toBe("Learn Integration Testing");
  });

  test("should toggle todo completion through controller", () => {
    controller.handleAddTodo("Toggle me");
    const todoId = service.todos[0].id;

    controller.handleToggleTodo(todoId);

    expect(service.todos[0].completed).toBe(true);
  });
});
