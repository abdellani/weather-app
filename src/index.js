import WeatherLoader from './weather-loader';
import DomManger from './domManager';

const domManager = DomManger(WeatherLoader);
domManager.initiate();
