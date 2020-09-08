import {
  form
} from '../variables';

// import { validateForm } from '../formValidation';
import { addEventListener } from '../formExecution';

describe("Testing the submit functionality", () => {
  test("Testing the addEventListener function", () => {
    // Check that the event listener exists
    expect(addEventListener()).toBeDefined();
  })
});