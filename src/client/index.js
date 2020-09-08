// Import SASS styles
import './styles/main.scss';

// Import JS files
import { performAction, addEventListener } from './js/formExecution';
import { validateForm } from './js/formValidation';

addEventListener();

export {
  performAction,
  validateForm,
  addEventListener
}

