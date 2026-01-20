const data = {
    vanya: {
        owner: "ваня",
        friend: "яна",
        movies: ["всё о лили чоу-чоу", "красивый мальчик", "маленькая мисс счастье", "рок-н-рольщики", "что гложет гилберта грейпа", "наруто"]
    },
    yana: {
        owner: "яна",
        friend: "ваня",
        movies: ["колдовство", "красивый человек", "цвет граната", "властелины хаоса", "этот дом", "признания", "матрица времени"]
    }
};

let currentUser = null;

function initApp(user) {
    currentUser = user;
    const setupScreen = document.getElementById('setup-screen');
    const movieScreen = document.getElementById('movie-screen');
    const welcomeText = document.getElementById('welcome-text');

    setupScreen.classList.add('hidden');
    movieScreen.classList.remove('hidden');

    if (user === 'both') {
        welcomeText.innerText = "общий список: все фильмы";
    } else {
        welcomeText.innerText = `пользователь: ${data[user].owner}\n автор списка: ${data[user].friend}`;
    }

    renderMovies();
}

function renderMovies() {
    const listDiv = document.getElementById('movie-list');
    listDiv.innerHTML = '';
    
    let moviesToShow = [];
    
    if (currentUser === 'both') {
        moviesToShow = [...data.vanya.movies, ...data.yana.movies];
        moviesToShow = [...new Set(moviesToShow)];
    } else {
        moviesToShow = data[currentUser].movies;
    }

    // Теперь всегда используем один и тот же ключ в localStorage для синхронизации
    const savedProgress = JSON.parse(localStorage.getItem('all_movies_progress')) || {};

    moviesToShow.forEach(movie => {
        const isChecked = savedProgress[movie] ? 'checked' : '';
        
        const div = document.createElement('div');
        div.className = 'movie-item';
        div.innerHTML = `
            <label>
                <input type="checkbox" ${isChecked} onchange="toggleMovie('${movie}')">
                ${movie}
            </label>
        `;
        listDiv.appendChild(div);
    });
}

function toggleMovie(movieName) {
    // Получаем общее хранилище
    let savedProgress = JSON.parse(localStorage.getItem('all_movies_progress')) || {};
    
    // Меняем статус фильма
    savedProgress[movieName] = !savedProgress[movieName];
    
    // Сохраняем в единое хранилище
    localStorage.setItem('all_movies_progress', JSON.stringify(savedProgress));
}

function goBack() {
    document.getElementById('setup-screen').classList.remove('hidden');
    document.getElementById('movie-screen').classList.add('hidden');
}
