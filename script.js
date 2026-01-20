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
        // объединяем два списка в один уникальный массив
        moviesToShow = [...data.vanya.movies, ...data.yana.movies];
        // убираем дубликаты на случай, если вы посоветовали друг другу одно и то же
        moviesToShow = [...new Set(moviesToShow)];
    } else {
        moviesToShow = data[currentUser].movies;
    }

    // прогресс сохраняется отдельно для каждого экрана (ваня, яна, общий)
    const savedProgress = JSON.parse(localStorage.getItem(`movies_${currentUser}`)) || {};

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
    let savedProgress = JSON.parse(localStorage.getItem(`movies_${currentUser}`)) || {};
    savedProgress[movieName] = !savedProgress[movieName];
    localStorage.setItem(`movies_${currentUser}`, JSON.stringify(savedProgress));
}

function goBack() {
    document.getElementById('setup-screen').classList.remove('hidden');
    document.getElementById('movie-screen').classList.add('hidden');
}