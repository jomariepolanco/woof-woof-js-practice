//DOM ELEMENTS
const dogBar = document.querySelector("#dog-bar")
const dogButton = document.querySelector("#good-bad")
const dogCont = document.querySelector("#dog-summary-container")
const dogFilter = document.querySelector("#good-dog-filter")


//Event Listeners

dogFilter.addEventListener("click", event => {
    const badDogs = Array.from(dogBar.children).filter(dog => dog.dataset.good === "false")
    if (event.target.textContent === "Filter good dogs: OFF") {
        event.target.textContent = "Filter good dogs: ON"
        badDogs.forEach(dog => {
        dog.style.display = "none"
        })
    } else if (event.target.textContent === "Filter good dogs: ON") {
        event.target.textContent = "Filter good dogs: OFF"
        badDogs.forEach(dog => {
            dog.style.display = ""
        })
    }
})

dogBar.addEventListener("click", event => {
    if (event.target.tagName === "SPAN") {
        getOnePupFetch(event.target.dataset.id)
    }
})

dogCont.addEventListener("click", (event) => {
    if (event.target.id === "good-bad") {
        let newPup = {}
        if (event.target.textContent === "Good Dog!") {
            event.target.textContent = "Bad Dog!"
            newPup = {isGoodDog: false}
        } else {
            event.target.textContent = "Good Dog!"
            newPup = {isGoodDog: true}
        }
        updatePupFetchPatch(event.target.dataset.id, newPup)
    }
})

//Fetches
const updatePupFetchPatch = (id, pupObj) => {
    return fetch(`http://localhost:3000/pups/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pupObj)
    })
    .then(resp => resp.json())
    .then(updatePup => renderPupInfo(updatePup))
}
    
const getOnePupFetch = (id) => {
    return fetch(`http://localhost:3000/pups/${id}`)
        .then(resp => resp.json())
        .then(pupData => renderPupInfo(pupData))

}

//Render Functions
const renderPups = (pups) => {
    pups.forEach(pup => {
        const span = document.createElement("span")
        span.dataset.id = pup.id 
        span.dataset.good= pup.isGoodDog
        span.textContent = pup.name 
        dogBar.append(span)
    })
}

const renderPupInfo = (pup) => {
    const div = document.querySelector("#dog-info")
    div.innerHTML = ""
    const pupImg = document.createElement("img")
    pupImg.src = pup.image
    const pupH2 = document.createElement("h2")
    pupH2.textContent = pup.name 
    const pupButton = document.createElement("button")
    pupButton.dataset.id = pup.id 
    pupButton.id = "good-bad"
    if (pup.isGoodDog){
        pupButton.textContent = "Good Dog!"
    } else {
        pupButton.textContent = "Bad Dog!"
    }
    div.append(pupImg, pupH2, pupButton)

}

//initialize
const initialize = () => {
    return fetch('http://localhost:3000/pups')
        .then(resp => resp.json())
        .then(pupsData => renderPups(pupsData))
}
initialize()