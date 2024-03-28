const header = document.querySelector('.header');

header.addEventListener('click', async (e) => {
  if (e.target.closest('button[name="logout"]')) {
    const response = await fetch('/api/users/logout', {
      method: 'post'
    });

    if (response.ok) {
      window.location.replace('/login');
    }
  }
});
