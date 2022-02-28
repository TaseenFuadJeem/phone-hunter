const searchByName = () => {
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value;

    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchValue}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data))
}

const displayPhones = (phones) => {
    const searchedPhones = document.getElementById('searched-phones');

    for (const phone of phones.data) {
        const h1 = document.createElement('h1');
        h1.innerText = `${phone.phone_name}`
        searchedPhones.appendChild(h1);
    }
}