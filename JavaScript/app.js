// --------------JS event handler of searched phones--------------

const searchByName = () => {
    const searchedPhones = document.getElementById('searched-phones');
    searchedPhones.innerHTML = '';
    const displayDetailDiv = document.getElementById('display-details');
    displayDetailDiv.innerHTML = '';

    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value;

    if (searchValue == '') {
        document.getElementById('warning-massage').style.display = 'block';
    } else {
        const url = ` https://openapi.programming-hero.com/api/phones?search=${searchValue}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                let error = data.data.length == 0;
                if (error == true) {
                    document.getElementById('warning-massage').style.display = 'block';
                    searchInput.value = '';
                } else {
                    displayPhones(data.data);
                    document.getElementById('warning-massage').style.display = 'none';
                }
            })

        document.getElementById('warning-massage').style.display = 'none';
    }
}

const displayPhones = (phones) => {
    document.getElementById('seemore-btn').style.display = 'none';
    const searchInput = document.getElementById('search-input');
    searchInput.value = '';

    const searchedPhones = document.getElementById('searched-phones');

    for (const phone of phones.slice(0, 20)) {
        const div = document.createElement('div');
        div.innerHTML = `
        <section>
        <div class="card mx-auto mt-3 rounded-3" style="width: 18rem;">
            <img src="${phone.image}" class="card-img-top img-fluid p-5" alt="...">
             <div class="card-body">
                 <h5 class="card-title">Model : ${phone.phone_name}</h5>
                    <h5 class="card-text">Brand : ${phone.brand}</h5>
                    <a href="#" onclick="phoneDetails('${phone.slug}')" class="btn btn-primary">More detail</a>
                </div>
        </div>
        </section>
        `
        div.classList.add('col-lg-4')
        searchedPhones.appendChild(div);

    }
    const CountDiv = document.getElementsByTagName("section").length;
    console.log(CountDiv);
    if (CountDiv > 20) {
        document.getElementById('seemore-btn').style.display = 'block';
    }
}


// --------------JS event handler of showing details about phone--------------


const phoneDetails = (details) => {
    const url = `https://openapi.programming-hero.com/api/phone/${details}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data))
}

const displayPhoneDetails = (info) => {
    const displayDetailDiv = document.getElementById('display-details');
    displayDetailDiv.innerHTML = '';
    const div = document.createElement('div');

    const showRelease = () => {

        if (info?.data?.releaseDate == '') {
            let releaseInfo = 'No release date found online';
            return releaseInfo
        }
        else {
            let releaseInfo = '';
            return releaseInfo;
        }
    }

    div.innerHTML = `
    <div class="card mx-auto mb-3 rounded-3 my-4" style="max-width: 1165px;">
        <div class="row g-0">
            <div class="col-md-4 d-flex">
                 <img src="${info.data.image}" class="img-fluid rounded-start p-5" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${info.data.name}</h5>
                    <p class="card-text"><span class="fw-bold">Storage :</span> ${info.data.mainFeatures.storage}</p>
                    <p class="card-text"><span class="fw-bold">Sensors :</span> ${info.data.mainFeatures.sensors}</p>
                    <p class="card-text"><span class="fw-bold">Bluetooth :</span> ${info?.data?.others?.Bluetooth}</p>
                    <p class="card-text"><span class="fw-bold">GPS :</span> ${info?.data?.others?.GPS}</p>
                    <p class="card-text"><span class="fw-bold">NFC :</span> ${info?.data?.others?.NFC}</p>
                    <p class="card-text"><span class="fw-bold">Radio :</span> ${info?.data?.others?.Radio}</p>
                    <p class="card-text"><span class="fw-bold">USB :</span> ${info?.data?.others?.USB}</p>
                    <p class="card-text"><span class="fw-bold">WLAN :</span> ${info?.data?.others?.WLAN}</p>
                    <p class="card-text"><small class="text-muted">${info?.data?.releaseDate}${showRelease()}
                    </small ></p >
                    <button type="button" class="btn btn-primary">Order Now</button>
                </div>
            </div>
        </div>
    </div>
    <div class="my-5">
    <hr>
    </div>
    `
    displayDetailDiv.appendChild(div);
}