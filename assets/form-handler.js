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
    } catch (error) {}
  });
});
