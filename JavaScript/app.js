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
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card mx-auto mt-3 rounded-3" style="width: 18rem;">
            <img src="${phone.image}" class="card-img-top img-fluid p-5" alt="...">
             <div class="card-body">
                 <h5 class="card-title">Model : ${phone.phone_name}</h5>
                    <h5 class="card-text">Brand : ${phone.brand}</h5>
                    <a href="#" class="btn btn-primary">More detail</a>
                </div>
        </div>
        `
        div.classList.add('col-lg-4')
        searchedPhones.appendChild(div);
    }
}