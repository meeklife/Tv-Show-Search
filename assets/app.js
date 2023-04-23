const form = document.querySelector('#searchForm');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm } }
    const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
    makeImages(res.data)
    form.elements.query.value = '';
})

const makeImages = (shows) => {

    // Remove existing images
    const existingImages = document.querySelectorAll('img');
    existingImages.forEach(img => img.remove());

    for (let result of shows) {
        if (result.show.image) {
            const container = document.createElement('div');
            container.classList.add('searches');

            const link = document.createElement('a');
            link.href = result.show.url;
            link.target = '_blank';

            const img = document.createElement('IMG');
            img.src = result.show.image.medium;


            const name = document.createElement('a');
            name.href = result.show.url;
            name.target = '_blank';
            name.textContent = result.show.name;

            link.append(img)
            container.append(link);
            container.append(name);
            document.body.append(container);
        }
    }
}

