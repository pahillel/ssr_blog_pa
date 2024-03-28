const forms = document.querySelectorAll('form');

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
      await requestHandler(form, value);
    } catch (error) {}
  });
});

const requestHandler = async (form, value) => {
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

  if (data.error) {
    errorHandle(data.error, data.type, form);
  }
};

const errorHandle = (error, type, element) => {
  if (type === 'data-error') {
    addErrorElement(error, element);
  } else if (type === 'validation-error') {
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
