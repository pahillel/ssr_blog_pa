const container = document.querySelector('.post-container');

if (container) {
  container.addEventListener('click', async (event) => {
    const target = event.target;

    const postId = target.dataset.post;
    const commentId = target.dataset.comment;

    if (target.closest('button[name="delete-post"]')) {
      if (postId) {
        await deletePost(postId);
      }
    } else if (target.closest('button[name="delete-comment"]')) {
      if (commentId) {
        await deleteComment(commentId);
      }
    }
  });
}

const deletePost = async (postId) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    window.location.replace('/home');
  }
};

const deleteComment = async (commentId) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    window.location.reload();
  }
};
