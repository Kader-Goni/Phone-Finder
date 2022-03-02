// ===== search field =====
const searchPhone = () => {
  const searchField = document.getElementById("search-input");
  const searchValue = searchField.value;
  searchField.value = "";

  const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => searchResultShow(data.data));
};

// ===== show search result =====
const searchResultShow = (phones) => {
  const showSearchResult = document.getElementById("show-search-result");
  showSearchResult.innerHTML = "";

  const loadingSpinner = document.getElementById("spinner");
  loadingSpinner.style.display = "block";

  const phoneLength = phones.length;

  if (phones.length === 0) {
    resultFound();
  } else if (phoneLength > 20) {
    const buttonShow = document.getElementById("btn-btn");
    buttonShow.innerHTML = "";

    for (let i = 0; i < 20; i++) {
      const phone = phones[i];
      showPhone(phone);
    }
    moreBtn(phones);
  } else {
    for (let i = 0; i < phoneLength; i++) {
      const item = phones[i];
      showPhone(item);
    }
  }
};

// show phone
const showPhone = (phone) => {
  const searchResulShow = document.getElementById("show-search-result");
  const div = document.createElement("div");
  div.classList.add("col");
  div.innerHTML = ` 
        <div  class="card cart p-3 h-100">
            <img src=${phone.image} class="card-img-top w-75 img-fluid mx-auto" alt="phone">
            <div class="card-body p-0 pt-3">
              <h4 class="card-title fw-bold">${phone.phone_name}</h4>
              <h5 class="card-text fw-bold">${phone.brand}</h5>
              <button onclick="PhoneDetails('${phone.slug}')" class="btn mx-auto details-button">Details >></button>
            </div>
        </div>
        `;
  searchResulShow.appendChild(div);
};

// ===== show phone details =====
const PhoneDetails = (phoneID) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneID}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhoneDetails(data.data));
};

// ===== display phone details =====
const displayPhoneDetails = (phoneDetails) => {
  //   console.log(phoneDetails);
  const showDetails = document.getElementById("showDetails");
  showDetails.innerHTML = "";

  const div = document.createElement("div");
  div.classList.add("col");
  div.innerHTML = `
          <div class="card cart-details mb-3">
              <div class="row d-flex g-0">
              <span onclick="toggleButton()" id="toogle-close"><i class='fas fa-times-circle'></i></span>
                  <div class="col-sm-3">
                      <img src=${
                        phoneDetails.image
                      } class="mt-5 w-75 img-fluid phone-img mx-auto" alt="...">
                      <div class="mt-3">
                          <h6 class="h3 card-title fw-bold">${
                            phoneDetails.name
                          }</h6>
                          <p class="h4 card-text fw-bold">${
                            phoneDetails.brand
                          }</p>
                          <p class="card-text fw-bold">
                              <span class="text-primary fw-bold"><i class='far fa-check-circle'></i></span>
                              <span class="fw-bold text-white bg-success p-1 border rounded-3">ReleaseDate:</span>    
                              <span class="text-dark">${
                                phoneDetails.releaseDate
                                  ? phoneDetails.releaseDate
                                  : "Relise Date Not Found"
                              }</span>
                          </p>
                      </div>
                  </div>
                  <div class="col-sm-5">
                      <div class="card-body mt-0">
                          <h5 class="h5 fw-bold text-primary my-1">Main Features</h5>
                          <p class="card-text p-style">
                              <span class="text-primary fw-bold"><i class='far fa-check-circle'></i></span>
                              <span class="fw-bold text-dark">Chipset:</span>    
                              <span class="text-dark">${
                                phoneDetails.mainFeatures.chipSet
                              }</span>
                          </p>
                          <p class="card-text p-style">
                              <span class="text-primary fw-bold"><i class='far fa-check-circle'></i></span>
                              <span class="fw-bold">DisplaySize:</span>    
                              <span class="text-dark">${
                                phoneDetails.mainFeatures.displaySize
                              }</span>
                          </p>
                          <p class="card-text p-style">
                              <span class="text-primary fw-bold"><i class='far fa-check-circle'></i></span>
                              <span class="fw-bold">Memory:</span>    
                              <span class="text-dark">${
                                phoneDetails.mainFeatures.memory
                              }</span>
                          </p>
                          <p class="card-text p-style">
                              <span class="text-primary fw-bold"><i class='far fa-check-circle'></i></span>
                              <span class="fw-bold">Storage:</span>    
                              <span class="text-dark">${
                                phoneDetails.mainFeatures.storage
                              }</span>
                          </p>
                          <p class="card-text p-style">
                              <span class="text-primary fw-bold"><i class='far fa-check-circle'></i></span>
                              <span class="fw-bold">Sensors:</span>  
                              <span class="text-dark">${phoneDetails.mainFeatures.sensors.map(
                                (item) => item
                              )}</span>
                          </p>
                      </div>
                  </div>
                  <div class="col-sm-4">
                      <div class="card-body">
                          <h5 class="h5 fw-bold text-primary my-1">Others</h5>
                          <p class="card-text p-style">
                              <span class="text-primary fw-bold"><i class='far fa-check-circle'></i></span>
                              <span class="fw-bold">Bluetooth:</span>    
                              <span class="text-dark">${
                                phoneDetails.others.Bluetooth
                              }</span>
                          </p>
                          <p class="card-text p-style">
                              <span class="text-primary fw-bold"><i class='far fa-check-circle'></i></span>
                              <span class="fw-bold">GPS:</span>    
                              <span class="text-dark">${
                                phoneDetails.others.GPS
                              }</span>
                          </p>
                          <p class="card-text p-style">
                              <span class="text-primary fw-bold"><i class='far fa-check-circle'></i></span>
                              <span class="fw-bold">NFC:</span>    
                              <span class="text-dark">${
                                phoneDetails.others.NFC
                              }</span>
                          </p>
                          <p class="card-text p-style">
                              <span class="text-primary fw-bold"><i class='far fa-check-circle'></i></span>
                              <span class="fw-bold">Radio:</span>    
                              <span class="text-dark">${
                                phoneDetails.others.Radio
                              }</span>
                          </p>
                          <p class="card-text p-style">
                              <span class="text-primary fw-bold"><i class='far fa-check-circle'></i></span>
                              <span class="fw-bold">USB:</span>    
                              <span class="text-dark">${
                                phoneDetails.others.USB
                              }</span>
                          </p>
                          <p class="card-text p-style">
                              <span class="text-primary fw-bold"><i class='far fa-check-circle'></i></span>
                              <span class="fw-bold">WLAN:</span>    
                              <span class="text-dark">${
                                phoneDetails.others.WLAN
                              }</span>
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      `;

  showDetails.appendChild(div);
};

// === display toggle button ===
const toggleButton = () => {
  const showDetails = document.getElementById("showDetails");
  showDetails.innerHTML = "";
};

// === view more button ===
const moreBtn = (phones) => {
  const buttonShow = document.getElementById("btn-btn");
  buttonShow.style.display = "block";
  const btn = document.createElement("div");
  btn.classList.add("morebtn");
  btn.innerHTML = `
          <button onclick="moreBtnResult(${phones})" class="btn btn-primary">View More Phones >> </button>
      `;
  buttonShow.appendChild(btn);

  //   console.log(phones);
};

// === show 20 phones function ===
const moreBtnResult = (phones) => {
  phones.forEach((phone) => {
    const searchResulShow = document.getElementById("show-search-result");
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = ` 
          <div  class="card cart p-3 h-100">
              <img src=${phone.image} class="card-img-top w-75 img-fluid mx-auto" alt="phone">
              <div class="card-body p-0 pt-3">
              <h4 class="card-title fw-bold">${phone.phone_name}</h4>
              <h5 class="card-text fw-bold">${phone.brand}</h5>
              <button onclick="PhoneDetails('${phone.slug}')" class="btn mx-auto details-button">Details >></button>
              </div>
          </div>
          `;
    searchResulShow.appendChild(div);
  });
};
