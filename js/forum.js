document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const postsContainer = document.getElementById('posts-container');
    const createPostBtn = document.getElementById('create-post-btn');
    const modal = document.getElementById('create-post-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const postForm = document.getElementById('post-form');

    // --- Event Listeners ---
    if (createPostBtn) {
        createPostBtn.addEventListener('click', () => {
            modal.classList.remove('modal-hidden');
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.add('modal-hidden');
        });
    }

    if (postForm) {
        postForm.addEventListener('submit', handlePostSubmit);
    }

    // --- Initial Render ---
    renderPosts();

    // --- Functions ---
    function handlePostSubmit(e) {
        e.preventDefault();
        const newPost = {
            id: Date.now(),
            title: document.getElementById('post-title').value.trim(),
            category: document.getElementById('post-category').value,
            language: document.getElementById('post-language').value,
            mediaUrl: document.getElementById('post-media-url').value.trim(),
            deleteTimestamp: document.getElementById('post-delete-date').value,
            content: document.getElementById('post-content').value.trim(),
            author: 'Guest User', // Placeholder
            timestamp: new Date().toISOString()
        };

        if (!newPost.title || !newPost.content || !newPost.category || !newPost.language) {
            alert('Please fill out all required fields.');
            return;
        }

        savePost(newPost);
        renderPosts();

        if (typeof triggerVibration === 'function') triggerVibration();

        modal.classList.add('modal-hidden');
        postForm.reset();
    }

    function getPosts() {
        const posts = localStorage.getItem('forumPosts');
        return posts ? JSON.parse(posts) : [];
    }

    function savePost(post) {
        const posts = getPosts();
        posts.unshift(post);
        localStorage.setItem('forumPosts', JSON.stringify(posts));
    }

    function simpleMarkdownParse(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
    }

    function renderPosts() {
        if (!postsContainer) return;
        postsContainer.innerHTML = '';
        const posts = getPosts();
        const now = new Date();

        const validPosts = posts.filter(post => {
            if (!post.deleteTimestamp) return true;
            return now < new Date(post.deleteTimestamp);
        });

        if (validPosts.length === 0) {
            postsContainer.innerHTML = '<p>No posts yet. Be the first to create one!</p>';
            return;
        }

        validPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';

            let mediaElement = '';
            if (post.mediaUrl) {
                // Basic check for image or video based on extension
                if (/\.(jpg|jpeg|png|gif)$/i.test(post.mediaUrl)) {
                    mediaElement = `<img src="${post.mediaUrl}" alt="Post media" class="post-media">`;
                } else if (/\.(mp4|webm)$/i.test(post.mediaUrl)) {
                    mediaElement = `<video src="${post.mediaUrl}" controls class="post-media"></video>`;
                }
            }

            postElement.innerHTML = `
                <div class="post-header">
                    <h2>${post.title}</h2>
                </div>
                <div class="post-meta">
                    <span class="tag author">${post.author}</span>
                    <span class="tag category">${post.category}</span>
                    <span class="tag language">${post.language}</span>
                    <span class="tag date">${new Date(post.timestamp).toLocaleDateString()}</span>
                </div>
                <div class="post-content">
                    ${simpleMarkdownParse(post.content)}
                </div>
                ${mediaElement}
            `;
            postsContainer.appendChild(postElement);
        });
    }
});
