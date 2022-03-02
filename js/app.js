// ===== search field ===== 
const searchPhone = () => {

    const searchField = document.getElementById('search-input');
    const searchText = searchField.value ; 

    // clear data field 
    searchField.value = ''; 

    // load data 
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data))

}


// ===== show search result ===== 

