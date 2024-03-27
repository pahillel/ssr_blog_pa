const forms = document.querySelectorAll('form');

const ERRORS_MAP = {
  'User not found': true,
  'Password or login is incorrect': true,
  'User already exists': true
};

forms.forEach((form) => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.target;

    const formData = new FormData(form);

    const value = {};

    formData.forEach((item, key) => {
      value[key] = item;
    });

    try {
      await requestHandler(form);
    } catch (error) {}
  });
});

const requestHandler = async (form) => {
  const response = await fetch(form.action, {
    method: form.method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(value)
  });

  if (response.ok) {
    window.location.reload();
    return;
  }

  const data = await response.json();

  let error = data.error;

  if (data.validation_error) {
    error = 'validationError';
  }

  if (error) {
    errorHandle(error, form);
  }
};

const errorHandle = (error, element) => {
  console.log(error);

  if (ERRORS_MAP[error]) {
    addErrorElement(error, element);
  } else if (error === 'validationError') {
    handleControlsErrors(element);
  }
};

const addErrorElement = (errorText, element) => {
  const errors = document.querySelectorAll('.error');

  if (errors) {
    errors.forEach((error) => {
      error.remove();
    });
  }

  const errorElement = document.createElement('span');
  errorElement.classList.add('error');
  errorElement.textContent = errorText;

  element.appendChild(errorElement);
};

const handleControlsErrors = (form) => {
  const inputs = form.querySelectorAll('input');
  const textareas = form.querySelectorAll('textarea');

  const controls = [...inputs, ...textareas];

  controls.forEach((control) => {
    const label = control.labels && control.labels[0];

    addControlError(control, label);

    function inputHandler() {
      removeControlError(control, label);
      control.removeEventListener('input', inputHandler);
    }

    control.addEventListener('input', inputHandler);
  });
};

const addControlError = (control, label) => {
  control.classList.add('control-error');

  if (label) {
    label.classList.add('error');
  }
};

const removeControlError = (control, label) => {
  control.classList.remove('control-error');

  if (label) {
    label.classList.remove('error');
  }
};
