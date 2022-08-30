const loadPhones = async (search, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    const res = await (fetch(url));
    const data = await (res.json());
    displayPhones(data.data, dataLimit);
}
const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    // disply 15 result and show all button
    if (dataLimit && phones.length > 15) {
        phones = phones.slice(0, 15)
        document.getElementById('show-all').classList.remove('d-none');
    } else {
        document.getElementById('show-all').classList.add('d-none');
    }
    //display no result found
    if (phones.length === 0) {
        document.getElementById('no-result').classList.remove('d-none')
    } else {
        document.getElementById('no-result').classList.add('d-none')
    }
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card bg-light">
        <div class="p-5">
            <img src="${phone.image}" class="card-img-top p-5" alt="...">
        </div>
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                to additional content. This content is a little bit longer.</p>
                <button onclick = "loadDetails('${phone.slug}')" type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#showDetailsModal">
                Show Details
                </button>
            </div>
            
        </div>
        `
        phoneContainer.appendChild(phoneDiv);
    });
    toggleSpinner(false);
}

const searchProcess = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const phoneContainer = document.getElementById('phone-container').innerText = '';
    const searchItem = searchField.value;
    loadPhones(searchItem, dataLimit);
}
//search button functionality
document.getElementById('btn-search').addEventListener('click', function () {
    searchProcess(15);
})

//search by presssing enter key
document.getElementById('search-filed'), addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchProcess(15);
    }
})

//load details functionality
const loadDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await (fetch(url));
    const data = await (res.json());
    showDetails(data.data);
}
//show details funtionality
const showDetails = (phone) => {
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
    <div class=" mb-3">
  <div class="row g-0">
    <div class="col-md-3">
      <img src="${phone.image}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-9">
      <div class="card-body">
        <h4 class="">${phone.name}</h4>
        <p><strong>Manufacturer:</strong> ${phone.brand}</p>
        <p><strong>Released on:</strong> ${phone.releaseDate ? phone.releaseDate : 'Released date not available'}</p>
        <p><strong>SOC: </strong>${phone.mainFeatures.chipSet}</p>
        <p><strong>Storage: </strong>${phone.mainFeatures.storage}</p>
        <p><strong>Bluetooth: </strong>${phone.others.Bluetooth}</p>
        <p><strong>NFC: </strong>${phone.others.NFC}</p>
      </div>
    </div>
  </div>
</div>
    `

}

//sppinner show hide function
const toggleSpinner = isTrue => {
    if (isTrue) {
        document.getElementById('spinner').classList.remove('d-none');
    } else {
        document.getElementById('spinner').classList.add('d-none');

    }
}
//btn show all functionality
document.getElementById('btn-show-all').addEventListener('click', function () {
    searchProcess();
})


loadPhones('iphone')