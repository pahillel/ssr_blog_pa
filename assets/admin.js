const users = document.querySelector('.users');

if (users) {
  users.addEventListener('click', async (event) => {
    event.preventDefault();

    const target = event.target;

    if (target.closest('button[name="delete"]')) {
      const userId = target.dataset.user;

      if (userId) {
        const response = await fetch(`/api/users/${userId}`, {
          method: 'delete'
        });

        if (response.ok) {
          window.location.reload();
        }
      }
    }
  });
}
