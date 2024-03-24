const posts = document.querySelector('.posts');

posts.addEventListener('click', async (e) => {
  const target = e.target;

  if (target.classList.contains('post__delete')) {
    const postId = target.dataset.post;

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        const post = target.closest('.post');

        if (post) {
          post.remove();
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
});
