// https://api.tvmaze.com/search/shows?q=

const form = document.querySelector("#form")
let i = 0;
const makeImages = (shows) => {
    console.log(shows)
    if (i != 0) {
        const del = document.querySelector(".removable")
        del.remove()
    }
    i++;
    const container = document.createElement("div")
    container.classList.add("maindiv")
    container.classList.add("removable")
    for (let result of shows) {
        if (result.show.image) {
            const div = document.createElement("div")
            div.classList.add("movieContainer")
            const img = document.createElement("IMG");
            img.src = result.show.image.medium;
            div.appendChild(img)
            const movieName = document.createElement("p")
            movieName.innerText = result.show.name;

            const rating = document.createElement("p")
            if (result.show.rating.average) {
                rating.innerText = `rating: ${result.show.rating.average}`
            } else {
                rating.innerText = "not rated"
            }
            div.appendChild(movieName)
            div.appendChild(rating)


            container.appendChild(div)

        }
    }
    document.body.appendChild(container)

}


form.addEventListener('submit', async function (e) {

    e.preventDefault();

    const searchTerm = form.elements.query.value;

    const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
    // console.dir(res.data[0].show.image.medium)

    makeImages(res.data)
    form.elements.query.value = "";
})
