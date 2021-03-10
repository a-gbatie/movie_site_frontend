let addForm = false

// CONSTANTS
const moviesURL = 'http://localhost:3000/movies'
const container = document.querySelector('.movie-container')
const movieForm = document.querySelector('.movie-form')
const userForm = document.querySelector('user-form')



// HIDE FORM
    addForm = !addForm
    if (addForm) {
        container.style.display = "block"
    } else {
        container.style.display = "none"
    }

// CALL FUNCTIONS
getAll(moviesURL)
createMovie(movie) //why isn't 'movie' defined
buildMovieCard(movie)
// getOne(moviesURL, `${id}`)


// DATA
function getAll(url){
    fetch(url)
    .then(res => res.json())
    .then(movies => movies.forEach(movie => buildMovieCard(movie)))
}

// function getOne(url, id){
//     fetch(`${url}/${id}`)
//     .then(res => res.json())
//     .then(console.log)
// }
function createMovie(movie){
    fetch(moviesURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
    })
    .then(res => res.json())
    .then(movie => buildMovieCard(movie))
}

// DOM
function buildMovieCard(movie){
    let div = document.createElement('div')
    let h2 = document.createElement('h2')
    let p = document.createElement('p')
    let img = document.createElement('img')
    let btn = document.createElement('button')
    let main = document.querySelector('main')

    div.className = 'movie card'
    img.className = 'movie-image'
    div.data = movie.id
    h2.textContent = movie.name
    p.textContent = movie.release_date
    btn.textContent = 'x'
    img.src = movie.image
    img.style.width = '250px'
    img.style.height = '373px'

    btn.addEventListener('click', (e) => {
        handleDelete(btn.data)
        btn.parentElement.remove()
    })
    
    movie.comments.forEach(comment => {
        const ul = document.createElement('ul')
        const li = document.createElement('li')
        li.textContent = comment
        ul.appendChild(li)
    })
    
    div.append(h2, p, img, btn)
    main.appendChild(div)
}

// EVENT LISTENERS
movieForm.addEventListener('submit', handleSubmit)
userForm.addEventListener('submit', handleUserSubmit)


// HANDLERS
function handleSubmit(e){
    e.preventDefault()
    let movie = {
        name: e.target.name.value,
        release_date: e.target.release_date.value,
        image: e.target.image.value
    }
    movieForm.reset()
}

function handleDelete(id){
    fetch(`${moviesURL}/${id}`,{
        method:'DELETE'
    })
    .then(res => res.json())
}

function handleUserSubmit(e){
    e.preventDefault()
    let user = {
        name: e.target.name.value
    }
    userForm.reset()
}

// let currentUser variable 
// user login form
// find or create by
// words with nerds

