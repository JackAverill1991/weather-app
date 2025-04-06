const loading = document.querySelector('.loading-container');
const currentweatherSection = document.querySelector('.current-weather-forecast');
const dailyweatherSection = document.querySelector('.daily-weather-forecast');
const hourlyweatherSection = document.querySelector('.hourly-weather-forecast');
const errorContainer = document.querySelector('.error-container');


const showLoading = () => {
  loading.classList.remove('hide-loading');
};

const hideLoading = () => {
  loading.classList.add('hide-loading');
};

const showError = () => {
  currentweatherSection.style.display = 'none';
  dailyweatherSection.style.display = 'none';
  hourlyweatherSection.style.display = 'none';
  errorContainer.classList.add('show');
};

const hideError = () => {
  currentweatherSection.style.display = 'block';
  dailyweatherSection.style.display = 'flex';
  hourlyweatherSection.style.display = 'flex';
  errorContainer.classList.remove('show');
};

export {
  showLoading,
  hideLoading,
  showError,
  hideError
}