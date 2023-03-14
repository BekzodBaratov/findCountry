// 'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const countryContainer = document.querySelector('.country');
const inpCountry = document.querySelector('.inpCountry');
const inpBtn = document.querySelector('.btn');
const gifLoading = document.querySelector('.gifLoading');
// // const closeBtn = document.querySelector('.close');
// ///////////////////////////////////////
// let arr = new Set();
// let data;

// function renderHTML(el) {
//   let html = `<article class="country">
//         <div class="close">x</div>
//         <img class="country__img" src="${el.flag}" />
//         <div class="country__data">
//           <h3 class="country__name">${el.name}</h3>
//           <h4 class="country__region">${el.region}</h4>
//           <p class="country__row"><span>👫</span>${(
//             el.population / 1000000
//           ).toFixed(1)}mln</p>
//             <p class="country__row"><span>🗣️</span>${
//               el.languages ? el.languages[0].name : el.language
//             }</p>
//           <p class="country__row"><span>💰</span>${
//             el.currencies ? el.currencies[0].name : el.currency
//           }</p>
//         </div>
//       </article>`;

//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// }

// function chiqarish(el) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${el}`);
//   request.send();

//   request.addEventListener('load', () => {
//     let [el] = JSON.parse(request.responseText);
//     arr.add(el);

//     renderHTML(el)
// }
// // ////////////////////Function/////////////////////////////

// //Ma'lumotlarni localStorage ga saqlash
// function localStoragegaSaqlash(arr1) {
//   localStorage.setItem('countries', JSON.stringify(arr1));
// }
// //ma'lumotlarni localStoragedan olish
// function localStoragedanOlish(val) {
//   data = JSON.parse(localStorage.getItem(val));
//   if (!data) return;
// }
// //ma`lumotlarni localStoragedan o`chirish
// function localStoragedanUchirish(val) {
//   localStorage.removeItem(val);
// }

// // /////////////////////addEventListener////////////////////////////////////////////////////////////////////////////////////////
// inpBtn.addEventListener('click', () => {

//   localStoragegaSaqlash([...arr]);
//   localStoragedanOlish('countries');

//   data.forEach(val => {
//     chiqarish(val);
//   });

//   inpCountry.value = '';
//   countriesContainer.innerHTML = '';
// });

// countriesContainer.addEventListener('click', e => {
//   if (e.target.classList[0] == 'close') {
//     e.target.closest('.country').remove();
//   }
// });

// 'use strict';

// const btn = document.querySelector('.btn-country');
// const countriesContainer = document.querySelector('.countries');

// ///////////////////////////////////////

function renderHTML(data, className) {
  let html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        data.population / 1000000
      ).toFixed(1)}mln people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}

// const getCountryInfo = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();
//   // console.log(request.responseText);

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(request.responseText);
//     renderHTML(data);

//     let border = data.borders.forEach(border => {
//       const request2 = new XMLHttpRequest();
//       request2.open('GET', `https://restcountries.com/v2/alpha/${border}`);
//       request2.send();
//       request2.addEventListener('load', () => {
//         let data2 = JSON.parse(request2.responseText);
//         renderHTML(data2, 'neighbour');
//       });
//     });

//     console.log(data);
//     console.log(data.borders);
//   });
// };

// getCountryInfo('uzb');
// getCountryInfo('afg');
// getCountryInfo('uk');

function getJSON(url, msg) {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${msg} ${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

function getCountry(val) {
  getJSON(`https://restcountries.com/v2/name/${val}`, `davlatni topolmadim`)
    .then(res => {
      let [data] = res;
      renderHTML(data);
      let border = data.borders;

      return border.forEach(border => {
        getJSON(
          `https://restcountries.com/v2/alpha/${border}`,
          `qushni davlatni topolmadim`
        ).then(res => renderHTML(res, 'neighbour'));
      });
    })
    .catch(error => alert(error))
    .finally(() => (gifLoading.style.opacity = '0'));
}
getCountry('uzb');
