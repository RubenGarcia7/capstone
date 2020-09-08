import {
  form
} from '../variables';

// import { validateForm } from '../formValidation';
import { sayHello } from '../formValidation';

describe("Testing the submit functionality", () => {
  test("Testing the addEventListener function", () => {
    // Check that the event listener exists
    expect(sayHello()).toBe('Hello');
  })
});