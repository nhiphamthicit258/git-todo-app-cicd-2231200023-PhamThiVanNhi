const { test, expect, _electron: electron } = require("@playwright/test");
const path = require("path");

test("End-to-end user workflow", async () => {
  // 🔑 Launch Electron with explicit main.js
  const electronApp = await electron.launch({
    executablePath: require("electron"),
    args: [path.join(__dirname, "../../main.js")],
  });

  const window = await electronApp.firstWindow();
  const taskText = "My new E2E test task";

  // --- Task 1: Add a new todo ---
  await window.fill("#todo-input", taskText);
  await window.click('button:has-text("Add")');

  // --- Task 2: Verify todo added ---
  const todoItem = window.locator(".todo-item").first();
  await expect(todoItem).toContainText(taskText);

  // --- Task 3: Mark todo complete ---
  await todoItem.locator('input[type="checkbox"]').click();
  await expect(todoItem).toHaveClass(/completed/);

  // --- Task 4: Delete todo ---
  await todoItem.locator('button:has-text("Delete")').click();
  await expect(todoItem).toHaveCount(0);

  await electronApp.close();
});
