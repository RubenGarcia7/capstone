import { validateForm } from '../formValidation';

describe("Testing the submit functionality", () => {
  test("Testing the handleSubmit() function", () => {
    // Check that the function exists
    expect(validateForm()).toBeDefined();
  })
});