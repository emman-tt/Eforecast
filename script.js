let location1 = document.getElementById('location')
let weatherFigure = document.getElementById('weatherFigure')
let city = document.getElementById('city')
let condition = document.getElementById('condition')

let cityValue = 'Accra'
let emojiChange = document.getElementById('emojiChange')
let weatherEmoji = document.getElementById('weatherEmoji')
let windType = document.getElementById('windType')
let unitWind = document.getElementById('unitWind')
let pressureType = document.getElementById('pressure')
let unitPressure = document.getElementById('unitPressure')
let humidityType = document.getElementById('humidity')
let unitHumidity = document.getElementById('unitHumidity')
let body = document.getElementById('body')
let end = document.querySelector('.end')
let feat1 = document.querySelector('.feat1')
let feat2 = document.querySelector('.feat2')
let feat3 = document.querySelector('.feat3')
let menu = document.getElementById('menu')
let video = document.getElementById('video')
let bubble = document.getElementById('bubble')
let emojiPressure = document.getElementById('emojiPressure')
let emojiWind = document.getElementById('emojiWind')
let emojiHumidity = document.getElementById('emojiHumidity')

let pastWeather = document.getElementById('pastWeather')
let day1 = document.getElementById('day1')
let day2 = document.getElementById('day2')
let day3 = document.getElementById('day3')
let day4 = document.getElementById('day4')
let day5 = document.getElementById('day5')
let day6 = document.getElementById('day6')
let day7 = document.getElementById('day7')

let day1Weather = document.getElementById('day1Weather')
let day2Weather = document.getElementById('day2Weather')
let day3Weather = document.getElementById('day3Weather')
let day4Weather = document.getElementById('day4Weather')
let day5Weather = document.getElementById('day5Weather')
let day6Weather = document.getElementById('day6Weather')
let day7Weather = document.getElementById('day7Weather')

let day1Temperature = document.getElementById('day1Temperature')
let day2Temperature = document.getElementById('day2Temperature')
let day3Temperature = document.getElementById('day3Temperature')
let day4Temperature = document.getElementById('day4Temperature')
let day5Temperature = document.getElementById('day5Temperature')
let day6Temperature = document.getElementById('day6Temperature')
let day7Temperature = document.getElementById('day7Temperature')








let textArray = [];
let word;




let videoSource = document.getElementById('videoSource');
let lat;
let lon;
let timezone;
let time;
let hour;
let timeParts;

video.style.display = 'none'
bubble.style.opacity = 0.5

async function getTime () {
  try {
    const response = await fetch(
      `https://worldtimeapi.org/api/timezone/${timezone}`
    )
    const data = await response.json()
    let date = new Date(data.datetime)

    timeParts = data.datetime.split('T')[1]
    hour = parseInt(timeParts.split(':')[0])
   // console.log(timeParts)
    //console.log(hour)
    return hour
  } catch (error) {
    console.log('not available', error)
  }
}

async function getCordinates () {
  try {
    //console.log(lat);
    if (lat && lon) {
      const response = await fetch(
        `https://secure.geonames.org/timezoneJSON?lat=${lat}&lng=${lon}&username=emmantt`
      )
      const data = await response.json()
      timezone = await data.timezoneId
      //console.log(timezone);
      //  console.log(response)
      // console.log(data)
      return timezone
    }
  } catch (error) {
    console.log('no cordinates', error)
  }
}

async function getWeather () {
  const apiKey = '7c682cb8855849fcae6c3dc3754c9319'
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
  console.log(cityValue)
  const cordinates = `https://api.openweathermap.org/geo/1.0/direct?q=${cityValue}&limit=1&appid=${apiKey}`

  try {
    const cordinateResponse = await fetch(cordinates)
    const cordinateData = await cordinateResponse.json()
    const cordinatesLat = await cordinateData[0].lat
    const cordinatesLon = await cordinateData[0].lon

    lat = await cordinatesLat.toFixed(1)
    lon = await cordinatesLon.toFixed(1)

    const response = await fetch(url)
    const data = await response.json()
    const main = await data.main
    const temp = await main.temp
    const wind = await data.wind
    const speed = await wind.speed
    const pressure = await main.pressure
    const weather = await data.weather[0].main.toLowerCase()
    const humidity = await main.humidity

    if (response.ok) {
      location1.textContent = cityValue
      weatherFigure.textContent = Number(temp).toFixed(1)
      windType.textContent = speed
      unitWind.textContent = 'm/s'

      humidityType.textContent = humidity
      unitHumidity.textContent = 'kg'

      pressureType.textContent = pressure
      unitPressure.textContent = 'Pa'


      
      cityValue = city.value

      switch (weather) {
        case 'clear':
          emojiChange.className = 'fa-solid fa-cloud-sun'
          condition.textContent = 'Sunny'
          day2.className = emojiChange.className ;
          day2Weather.textContent = condition.textContent;
          day2Temperature.textContent = weatherFigure.textContent
          break

        case 'clouds':
          emojiChange.className = 'fa-solid fa-cloud'
          condition.textContent = 'Cloudy'
          day2.className = emojiChange.className ;
           day2Weather.textContent = condition.textContent;
           day2Temperature.textContent = weatherFigure.textContent
          break

        case 'rain':
          emojiChange.className = 'fa-solid fa-cloud-showers-heavy'
          condition.textContent = 'Rainy'
          day2.className = emojiChange.className ;
           day2Weather.textContent = condition.textContent;
           day2Temperature.textContent = weatherFigure.textContent
          break

        case 'snow':
          emojiChange.className = 'fa-solid fa-snowflake'
          condition.textContent = 'Snowy'
          day2.className = emojiChange.className ;
           day2Weather.textContent = condition.textContent;
           day2Temperature.textContent = weatherFigure.textContent
          break

        case 'thunderstorm':
          emojiChange.className = 'fa-solid fa-cloud-bolt'
          condition.textContent = 'Thunderstorm'
          day2.className = emojiChange.className ;
           day2Weather.textContent = condition.textContent;
           day2Temperature.textContent = weatherFigure.textContent
          break

        default:
          break
      }
    }

    return lat;
  } catch (error) {
    console.log('error, not available', error)
  }
}

getWeather().then(() => {
  getCordinates().then(() => {
    getTime().then(() => {
      timeChange()
    })
  })
})

function timeChange () {
  if (hour >= 5 && hour < 16) {
    body.style.background =
      'linear-gradient(to bottom, rgb(255, 255, 255) , rgba(255, 255, 255, 0.4))'
    body.style.color = 'black'
    emojiChange.style.color = 'rgb(130, 170, 234)'
    weatherFigure.style.color = 'rgb(25, 26, 27)'
    end.style.borderColor = 'rgb(132, 132, 132)'
    feat1.style.color = 'black'
    feat2.style.color = 'black'
    feat3.style.color = 'black'
    menu.style.color = 'black'
    city.color = 'black'
    emojiPressure.style.color = 'rgb(131, 48, 77)'
    emojiHumidity.style.color = 'green'
    emojiWind.style.color = 'rgb(29, 70, 86)'
    video.style.display = 'none'
  } else {
    body.style.background =
      'linear-gradient(to bottom, rgba(37, 24, 89, 1), rgb(50, 41, 121))'
    body.style.color = 'white'
    emojiChange.style.color = 'white'
    weatherFigure.style.color = 'white'
    end.style.borderColor = 'rgb(132, 132, 132)'
    feat1.style.color = 'white'
    feat2.style.color = 'white'
    feat3.style.color = 'white'
    menu.style.color = 'white'
    city.color = 'white'
    emojiPressure.style.color = 'rgb(255, 255, 255)'
    emojiHumidity.style.color = 'rgb(255, 228, 169)'
    emojiWind.style.color = 'rgb(100, 211, 255)'
  }
}

document.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    cityValue = city.value
    getWeather().then(() => {
      getCordinates().then(() => {
        getTime().then(() => {
          timeChange()
        })
      })
    })
  }
})

document.addEventListener("click", () => {
  if (city.value) {
    cityValue = city.value
     getWeather().then(() => {
      getCordinates().then(() => {
        getTime().then(() => {
          timeChange()
        })
      })
    })
  }
})







async function yesterdayWeather () {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const formattedDate = yesterday.toISOString().split('T')[0]
  try {
    const pastWeather = await fetch(
      `https://api.weatherapi.com/v1/history.json?key=1828e26665274259bbc172046251007&q=${cityValue}&dt=${formattedDate}`
    )
       const data = await pastWeather.json();
    const day = await data.forecast.forecastday[0].day;
const text = await day.condition.text;
const temp = await day.avgtemp_c;
textArray= text.split(" ")
//console.log(temp);
    // console.log(day)
    // console.log(text);
    // console.log(textArray);



    switch (textArray.includes(word)) {
      case word === 'rain':
        day1.className = "fa-solid fa-cloud-showers-heavy"
        day1Weather.textContent = "Rainy"
        day1Temperature.textContent = temp
        break;
      case word === 'cloudy':
        day1.className = 'fa-solid fa-cloud'
        day1Temperature.textContent = temp
        day1Weather.textContent = "Cloudy"
        break;
      case word === 'Sunny':
        day1.className = 'fa-solid fa-cloud-sun'
        day1Temperature.textContent = temp
        day1Weather.textContent = "Sunny"
        break;
      case word === 'thunder':
        day1.className = 'fa-solid fa-cloud-bolt'
        day1Temperature.textContent = temp
        day1Weather.textContent = "Thunder"
        break;
      case word === 'snow':
        day1.className = 'fa-solid fa-snowflake'
        day1Temperature.textContent = temp
        day1Weather.textContent = "Snowy"
        break;
    
      default:console.log('no');
        break;
    }
  } catch (error) {
    console.log('not available', error)
  }
}
async function tomorrowWeather () {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() + 1)
  const formattedDate = yesterday.toISOString().split('T')[0]
  try {
    const pastWeather = await fetch(
      `https://api.weatherapi.com/v1/history.json?key=1828e26665274259bbc172046251007&q=${cityValue}&dt=${formattedDate}`
    )
       const data = await pastWeather.json();
    const day = await data.forecast.forecastday[0].day;
const text = await day.condition.text;
const temp = await day.avgtemp_c;
textArray= text.split(" ")
    // console.log(day)
    // console.log(text);
    // console.log(textArray);
    // console.log(temp);



    switch (textArray.includes(word)) {
      case word === 'rain':
        day3.className = "fa-solid fa-cloud-showers-heavy"
        day3Temperature.textContent = temp
        day3Weather.textContent = "Rainy"
        break;
      case word === 'cloudy':
        day3.className = 'fa-solid fa-cloud'
        day3Temperature.textContent = temp
        day3Weather.textContent = "Cloudy"
        break;
      case word === 'Sunny':
        day3.className = 'fa-solid fa-cloud-sun'
        day3Temperature.textContent = temp
        day3Weather.textContent = "Sunny"
        break;
      case word === 'thunder':
        day3.className = 'fa-solid fa-cloud-bolt'
        day3Temperature.textContent = temp
        day3Weather.textContent = "Thunder"
        break;
      case word === 'snow':
        day3.className = 'fa-solid fa-snowflake'
        day3Temperature.textContent = temp
        day3Weather.textContent = "Snowy"
        break;
    
      default:console.log('no');
        break;
    }
  } catch (error) {
    console.log('not available', error)
  }

}

async function day4WeatherInfo () {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() + 3)
 
  const formattedDate = yesterday.toISOString().split('T')[0]
   console.log(formattedDate);
  try {
    const pastWeather = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=1828e26665274259bbc172046251007&q=${cityValue}&dt=${formattedDate}`
    ) 
    const data = await pastWeather.json();
    const day = await data.forecast.forecastday[0].day;
    const text = await day.condition.text;
    const temp = await day.avgtemp_c;
    textArray= text.split(" ")
    console.log(data);
    console.log(temp);
    switch (textArray.includes(word)) {
      case word === 'rain':
        day4.className = "fa-solid fa-cloud-showers-heavy"
        day4Temperature.textContent = temp
        day4Weather.textContent = "Rainy"
        break;
      case word === 'cloudy':
        day4.className = 'fa-solid fa-cloud'
        day4Temperature.textContent = temp
        day4Weather.textContent = "Cloudy"
        break;
      case word === 'Sunny':
        day4.className = 'fa-solid fa-cloud-sun'
        day4Temperature.textContent = temp
        day4Weather.textContent = "Sunny"
        break;
      case word === 'thunder':
        day4.className = 'fa-solid fa-cloud-bolt'
        day4Temperature.textContent = temp
        day4Weather.textContent = "Thunder"
        break;
      case word === 'snow':
        day4.className = 'fa-solid fa-snowflake'
        day4Temperature.textContent = temp
        day4Weather.textContent = "Snowy"
        break;
      default:console.log('no');
        break;
    }
  } catch (error) {
    console.log('not available', error)
  }
}



yesterdayWeather()
tomorrowWeather();
day4WeatherInfo()