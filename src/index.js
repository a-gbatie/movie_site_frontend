let addForm = false

// CONSTANTS
const moviesURL = 'http://localhost:3000/movies'
// const usersURL = 'http://localhost:3000/users'
const container = document.querySelector('.movie-container')
const movieForm = document.querySelector('.movie-form')
// const userForm = document.querySelector('.user-form')
// const commentsForm = document.querySelector('.comments-form')



// HIDE FORM
addForm = !addForm
if (addForm) {
    container.style.display = "block"
} else {
    container.style.display = "none"
}

// CALL FUNCTIONS
getAll(moviesURL)
// getUsers(usersURL)
// getOne(moviesURL, `${id}`)


// DATA
function getAll(url){
    fetch(url)
    .then(res => res.json())
    .then(movies => movies.forEach(movie => buildMovieCard(movie)))
}

// function getUsers(url){
//     fetch(url)
//     .then(res => res.json())
//     .then(movies => movies.forEach(movie => buildMovieCard(movie)))
// }

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
                Accept: 'application/json'
            },
            body: JSON.stringify(movie),
        })
        .then(res => res.json())
        .then(movie => buildMovieCard(movie))
    }

    function createComment(comment){
        fetch(moviesURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(comment),
        })
        .then(res => res.json())
        .then(comment => postComment(comment))
    }
    
    function editComment(url, id){
        fetch(moviesURL/`${id}`, {
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(url, id),
        })
        .then(res => res.json())
        .then(console.log)       
    }
    
// function updateLikes(movie){
//     movie.likes++
//     fetch(moviesURL/`${id}`, {
//         method:     'PATCH',
//         headers: {
//             'Content-Type': 'application/json',
//             Accept: 'application/json'
//         },
//         body: JSON.stringify({likes: movie.likes})
//     })
//     .then(res => res.json())
//     .then(like => {
//         let movie = document.getElementById(movie.id)
//         let p = movie.querySelector('p')
//         p.textContent = `${movie.likes} Users Have Liked This`
//     })
// }

    let main = document.querySelector('main')
    let userForm = document.createElement('form')
    let userLabel = document.createElement('label')
    let userInput = document.createElement('input')
    let submit = document.createElement('input')
    userForm.className = 'user-form'
    userInput.type = 'text'
    userInput.id = 'name'
    userInput.name = 'name'
    userLabel.textContent = 'Name:'
    userInput.textContent = 'Enter'
    submit.type = 'submit'

    userForm.append(userLabel, userInput, submit)
    main.appendChild(userForm)

// DOM
function buildMovieCard(movie){
    let div = document.createElement('div')
    let h2 = document.createElement('h2')
    let p = document.createElement('p')
    let img = document.createElement('img')
    let btn = document.createElement('button')
    let form = document.createElement('form')
    let edit = document.createElement('button')
    // let enter = document.createElement('button')
    let label = document.createElement('label')
    let subInput = document.createElement('input')
    let input = document.createElement('input')
    
    div.className = 'movie card'
    img.className = 'movie-image'
    div.data = movie.id
    h2.textContent = movie.name
    p.textContent = movie.release_date
    btn.textContent = 'x'
    img.src = movie.image
    img.style.width = '250px'
    img.style.height = '373px'

    form.className = 'comments-form'
    input.type = 'text'
    input.id = 'comments'
    input.name = 'comments'
    subInput.type = 'submit'
    subInput.textContent = 'Enter'
    edit.textContent = 'Edit'
    // enter.textContent = 'Enter'
    label.textContent = 'Leave A Comment:'
    
    
    
    // commentsForm.addEventListener('submit', (e) => handleCommentsSubmit(e))
    btn.addEventListener('click', (e) => {
        handleDelete(div.data)
        btn.parentElement.remove()
    })
    
    let ul = document.createElement('ul')
    // let user = {name: e.target.name.value}
    movie.comments.forEach(comment => {
        let li = document.createElement('li')
        // console.log(user)
        // li.textContent = `${user.name} said:` + ` ` + comment.comments
        ul.append(li, edit)
    })
    
    
    form.append(label, input, subInput)
    div.append(h2, p, img, ul, btn, form)
    main.appendChild(div)

    form.addEventListener('submit', (e) => handleCommentsSubmit(e))
    userForm.addEventListener('submit', (e) => handleUserSubmit(e))
}



// EVENT LISTENERS
movieForm.addEventListener('submit', (e) => handleSubmit(e))

// HANDLERS
function handleSubmit(e){
    e.preventDefault()
    let movie = {
        name: e.target.name.value,
        release_date: e.target.release_date.value,
        image: e.target.image.value,
        likes: 0
    }
    createMovie(movie)
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

function handleCommentsSubmit(e){
    e.preventDefault()
    let comment = {
        comments: e.target.comments.value
    }
    createComment(comment)
    form.reset()
}






