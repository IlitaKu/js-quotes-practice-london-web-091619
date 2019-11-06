const emebededLikes = "http://localhost:3000/quotes?_embed=likes"
const mainUrl = "http://localhost:3000/quotes"
const likesUrl = "http://localhost:3000/likes"

fetch(emebededLikes)
    .then(data => data.json())
    .then(data => displayQuotes(data))

    function displayQuotes(quotes){
        for(let i = 0; i < quotes.length; i++) displayQuote(quotes[i])
    }

    function displayQuote(quote){
        // debugger
        const quoteList = document.querySelector('#quote-list')
        const list = document.createElement('li')
        list.classList.add('quote-card')
        let quoteCount
        if(quoteCount === undefined){
            quoteCount = 0
        } else{
            quoteCount = quote.likes.length
        }

        list.innerHTML = `
        <blockquote class="blockquote"></blockquote>
        <p class='mb-0'>${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer>
        <br>
        <button class='btn-success' id="${quote.id}"> Likes: <span>${quoteCount}</span></button>
        <button class='btn-danger' id="${quote.id}">Delete</button>
        `
        // debugger
        quoteList.appendChild(list)

        const likeButton = list.querySelector('button.btn-success')
        const deleteButton = list.querySelector('button.btn-danger')

        likeButton.addEventListener('click', handleLikeButton)
        deleteButton.addEventListener('click', handleDeleteButton)

        // const removeButton = document.querySelector('#quote-list').children
        // for(let i = 0; i < removeButton.length; i++){
        //     removeClickedQuote(removeButton[i].lastElementChild)
        // }
    }

        const submitForm = document.querySelector('#new-quote-form')
        submitForm.addEventListener('submit', function(e){
            e.preventDefault()
            
        const newQuote = {
            quote: document.querySelector('input[placeholder="Learn. Love. Code."]').value,
            author: document.querySelector('input[placeholder="Flatiron School"]').value
        }
        
        createQuote(newQuote)
            .then(data => displayQuote(data))
    })

    function createQuote(newQuote){
        const configObject = {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newQuote)
        }
        return fetch(mainUrl, configObject)
            .then(data => data.json())
    }

    // function removeClickedQuote(quote){
    //     debugger
    //     increaseLikes(quote)
    //     quote.addEventListener('click', function(e){
    //         console.log(" times I've run")
    //         remove(e)
    //         e.target.parentElement.remove()
    //     })
    // }

    function handleDeleteButton(e){
        remove(e)
        e.target.parentElement.remove()
    }

    function handleLikeButton(e){
        let likes = e.target.lastElementChild
        let updatedLikes = parseInt(likes.innerText) +1
        likes.innerText = updatedLikes

        configObject = {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                quoteId: parseInt(e.target.id) }) 
        }
        return fetch(likesUrl,configObject)
            // .then(data =>data)
    }

        function remove(e){
            return fetch(`${mainUrl}/${parseInt(e.target.id)}`, {method: "DELETE"})
                .then(data => data.json())
        }

    // function increaseLikes(quote){
    //     const likeButton = quote.previousElementSibling
    //     likeButton.addEventListener('click', function(e){
    //         let likes = e.target.lastElementChild
    //         let updatedLikes = parseInt(likes.innerText) +1
    //         likes.innerText = updatedLikes
    //         debugger
    //         configObject = {
    //             method: 'POST', 
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Accept": "application/json"
    //             },
    //             body: JSON.stringify({
    //                 quoteId: parseInt(quote.id) }) 
    //         }
    //         return fetch(likesUrl,configObject)
    //             // .then(data =>data)
    //     })
        
    // }







