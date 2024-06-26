const users = document.querySelector('.users');

if (users) {
  users.addEventListener('click', async (event) => {
    const target = event.target;

    if (target.closest('button[name="delete-user"]')) {
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
