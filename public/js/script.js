// const url = 'http://localhost:3000/weather?query=hawaii&units=f';

// fetch(url)
//   .then((res) => res.json())
//   .then((data) => console.log(data));

const weatherForm = document.querySelector('form');
const userInput = document.querySelector('input');

const weatherTable = document.querySelector('#weatherTable');
const weatherLocationCell = document.querySelector('#weatherLocationCell');
const weatherForcastCell = document.querySelector('#weatherForcastCell');

const errorText = document.querySelector('#errorText');

const hideTableHandler = () => {
  weatherLocationCell.textContent = '';
  weatherForcastCell.textContent = '';
  weatherTable.style.visibility = 'hidden';
  errorText.style.visibility = 'hidden';
  errorText.textContent = '';
};

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  hideTableHandler();
  console.log(userInput.value);

  const url = `http://localhost:3000/weather?query=${userInput.value}`;

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        return res.json();
      } else {
        return res.json();
      }
    })
    .then((data) => {
      if (data.Error) {
        errorText.textContent = data.Error;
        errorText.style.visibility = 'visible';
      } else {
        weatherLocationCell.textContent = data.Address;
        weatherForcastCell.textContent = data.Forcast;
        weatherTable.style.visibility = 'visible';
      }
    });
});
