const consoleBox = document.getElementById('js-console');
const btnPartA = document.getElementById('btn-part-a');
const btnPartB = document.getElementById('btn-part-b');

const elements = {
    btnRefresh: document.getElementById('btn-refresh'),
    loader: document.getElementById('api-loader'),
    usersContainer: document.getElementById('users-container'),
    postsContainer: document.getElementById('posts-container'),
    postsList: document.getElementById('posts-list'),
    currentUserName: document.getElementById('current-user-name'),
    errorBox: document.getElementById('error-box')
};

function logToScreen(message, type = 'info') {
    const div = document.createElement('div');
    div.classList.add('console-log-item');
    div.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    
    if (type === 'error') {
        div.classList.add('console-error');
    }
    
    consoleBox.appendChild(div);
    consoleBox.scrollTop = consoleBox.scrollHeight;
}

const simulateDataLoading = (id, duration, shouldFail = false) => {
    return new Promise((resolve, reject) => {
        logToScreen(`Start: ${id}...`);
        setTimeout(() => {
            if (shouldFail) {
                reject(`Błąd: ${id}`);
            } else {
                resolve(`Sukces: ${id}`);
            }
        }, duration);
    });
};

btnPartA.addEventListener('click', () => {
    consoleBox.innerHTML = '';
    logToScreen("--- CZĘŚĆ A (PROMISES) ---");

    simulateDataLoading('Zadanie 1', 1000)
        .then(res => logToScreen(res))
        .catch(err => logToScreen(err, 'error'))
        .finally(() => logToScreen('Zadanie 1 zakończone.'));

    Promise.all([
        simulateDataLoading('Zadanie A', 500),
        simulateDataLoading('Zadanie B', 1500)
    ])
    .then(results => logToScreen(`Promise.all: ${results.join(', ')}`))
    .catch(err => logToScreen(err, 'error'));

    const slow = simulateDataLoading('Wolne', 3000);
    const timeout = new Promise((_, reject) => setTimeout(() => reject('Timeout'), 2000));

    Promise.race([slow, timeout])
        .then(res => logToScreen(`Race wygrał: ${res}`))
        .catch(err => logToScreen(`Race błąd: ${err}`, 'error'));
});

btnPartB.addEventListener('click', async () => {
    consoleBox.innerHTML = '';
    logToScreen("--- CZĘŚĆ B (ASYNC/AWAIT) ---");

    try {
        const res = await simulateDataLoading('Async 1', 800);
        logToScreen(res);
        await simulateDataLoading('Async Błąd', 500, true);
    } catch (err) {
        logToScreen(`Złapano: ${err}`, 'error');
    }

    const startSeq = Date.now();
    await simulateDataLoading('Seq 1', 500);
    await simulateDataLoading('Seq 2', 500);
    logToScreen(`Sekwencja czas: ${Date.now() - startSeq}ms`);

    const startPar = Date.now();
    await Promise.all([
        simulateDataLoading('Par 1', 1000),
        simulateDataLoading('Par 2', 1000)
    ]);
    logToScreen(`Równolegle czas: ${Date.now() - startPar}ms`);
});

async function fetchUsers() {
    elements.errorBox.style.display = 'none';
    elements.usersContainer.innerHTML = '';
    elements.postsContainer.style.display = 'none';
    elements.loader.style.display = 'block';

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error(`Status: ${response.status}`);
        
        const users = await response.json();
        renderUserTable(users);
    } catch (error) {
        elements.errorBox.textContent = error.message;
        elements.errorBox.style.display = 'block';
    } finally {
        elements.loader.style.display = 'none';
    }
}

function renderUserTable(users) {
    const table = document.createElement('table');
    table.classList.add('data-table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>ID</th><th>Name</th><th>Email</th><th>Company</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody = table.querySelector('tbody');
    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.id}</td>
            <td><strong>${user.name}</strong></td>
            <td>${user.email}</td>
            <td>${user.company.name}</td>
        `;
        tr.addEventListener('click', () => fetchUserPosts(user.id, user.name));
        tbody.appendChild(tr);
    });

    elements.usersContainer.appendChild(table);
}

async function fetchUserPosts(userId, userName) {
    elements.postsContainer.style.opacity = '0.5';
    
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        if (!response.ok) throw new Error('Błąd pobierania postów');
        
        const posts = await response.json();
        
        elements.currentUserName.textContent = userName;
        elements.postsList.innerHTML = posts.map(post => `
            <li>
                <strong>${post.title}</strong>
                <p>${post.body}</p>
            </li>
        `).join('');
        
        elements.postsContainer.style.display = 'block';
        elements.postsContainer.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        alert(error.message);
    } finally {
        elements.postsContainer.style.opacity = '1';
    }
}

elements.btnRefresh.addEventListener('click', fetchUsers);