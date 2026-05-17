// ==========================================
// 1. LOGIKA FORUM (Fungsi Utama)
// ==========================================

// Buka-tutup form postingan
function togglePostForm() {
    const area = document.getElementById('createPostArea');
    if (area) {
        area.style.display = (area.style.display === 'none' || area.style.display === '') ? 'block' : 'none';
    }
};

// Simpan postingan ke LocalStorage
function savePost() {
    const titleEl = document.getElementById('postTitle');
    const contentEl = document.getElementById('postContent');

    if (!titleEl.value || !contentEl.value) {
        return alert("Please fill all fields!");
    };

    const newPost = {
        id: Date.now(),
        title: titleEl.value,
        content: contentEl.value,
        author: "UserGuest",
        time: new Date().toLocaleString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        replies: []
    };

    let posts = JSON.parse(localStorage.getItem('mirai_posts')) || [];
    posts.unshift(newPost); // Post baru di paling atas
    localStorage.setItem('mirai_posts', JSON.stringify(posts));

    // Reset Form
    titleEl.value = '';
    contentEl.value = '';
    togglePostForm();
    
    // Refresh tampilan
    loadPosts();
}

// Tambah balasan (Reply)
function addReply(postId) {
    const replyInput = document.getElementById(`reply-input-${postId}`);
    const replyText = replyInput.value;

    if (!replyText) return alert("Reply cannot be empty!");

    let posts = JSON.parse(localStorage.getItem('mirai_posts')) || [];
    const postIndex = posts.findIndex(p => p.id === postId);

    if (postIndex !== -1) {
        posts[postIndex].replies.push({
            author: "You",
            text: replyText,
            time: "Just now"
        });
        localStorage.setItem('mirai_posts', JSON.stringify(posts));
        loadPosts(); 
    };
}

// Tampilkan data dari LocalStorage ke HTML
function loadPosts() {
    const container = document.getElementById('forumContainer');
    if (!container) return;

    let posts = JSON.parse(localStorage.getItem('mirai_posts')) || [];

    if (posts.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:#718096;">No posts yet. Be the first to share!</p>`;
        return;
    }

    container.innerHTML = posts.map(post => `
        <div class="forum-card">
            <div class="post-header">
                <strong>👤 ${post.author}</strong> • <span class="text-gray">${post.time}</span>
            </div>
            <h3 style="margin: 10px 0; color: #2d3748;">${post.title}</h3>
            <p style="color: #4a5568; line-height: 1.6;">${post.content}</p>
            
            <div style="margin: 15px 0; font-size: 13px; color: #6495ED; font-weight: bold;">
                💬 ${post.replies.length} replies
            </div>

            <div class="replies-list" style="margin-left: 10px; padding-left: 15px;">
                ${post.replies.map(r => `
                    <div class="reply-item">
                        <div style="font-size: 12px;"><strong>${r.author}</strong> • <span style="color:gray;">${r.time}</span></div>
                        <div style="font-size: 13px; color: #4a5568;">${r.text}</div>
                    </div>
                `).join('')}
            </div>

            <div class="reply-box" style="display: flex; gap: 10px; margin-top: 20px;">
                <input type="text" id="reply-input-${post.id}" placeholder="Write a reply..." 
                       style="flex-grow: 1; padding: 10px; border: 1px solid #edf2f7; border-radius: 20px; font-size: 13px; background:#f8fafc;">
                <button onclick="addReply(${post.id})" 
                        style="background: #6495ED; color: white; border: none; padding: 0 20px; border-radius: 20px; cursor: pointer; font-size: 13px; font-weight:bold;">
                    Reply
                </button>
            </div>
        </div>
    `).join('');
};

// Jalankan loadPosts saat halaman pertama kali dibuka
window.addEventListener('load', loadPosts);

// ==========================================
// 2. LOGIKA THERAPIST (Hanya jalan di halaman therapists)
// ==========================================
const filterButtons = document.querySelectorAll('.filter-btn');
if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const activeBtn = document.querySelector('.filter-btn.active');
            if (activeBtn) activeBtn.classList.remove('active');
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');
            const cards = document.querySelectorAll('.therapist-card');
            let visibleCount = 0;

            cards.forEach(card => {
                const region = card.getAttribute('data-region');
                if (filterValue === 'all' || filterValue === region) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            const countEl = document.getElementById('count');
            if (countEl) countEl.textContent = visibleCount;
        });
    });
};
// ==========================================
// 3. LOGIKA SIGN UP/SIGN IN (validasi)
// ==========================================
let form_signup = document.getElementById("signupForm");
let errorMsg = document.getElementById("errorMsg");

form_signup.onsubmit = function(event){
    event.preventDefault();

    let name = document.getElementById("fullname").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (name == ""){
        errorMsg.innerHTML = "Name cannot be empty";
    }
    else if (email == ""){
        errorMsg.innerHTML = "Email cannot be empty";
    }
    else if (!email.includes("@")){
        errorMsg.innerHTML = "Email must contain @";
    }
    else if (password == ""){
        errorMsg.innerHTML = "Password cannot be empty";
    }
    else if (password.length < 8){
        errorMsg.innerHTML = "Password must be at least 8 characters";
    }
    else {
        errorMsg.innerHTML = ""
        alert("Sign up successful!");
    }
};

let form_signin = document.getElementById("signinForm");

form_signin.onsubmit = function(event){
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email == "" || password == "") {
        alert("Email and password cnnot be empty");
    }
    else{
        alert("Sign in successful!");
    }
};
