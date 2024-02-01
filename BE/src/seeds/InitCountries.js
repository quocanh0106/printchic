require('dotenv').config()
const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;
const MONGODB_URI = `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@employment.vxdprgl.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;
const express = require('express');
const app = express();
const {data} = require('./dataSample/dataCountries');
const CountriesService = require('../services/CountriesService');
const CitiesService = require('../services/CitiesService');
const { ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');


(async () => {
const options = {
  serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
  }
};
await mongoose.connect(MONGODB_URI, options);
mongoose.set('strictQuery', true);
console.log('database connected');
})();
app.listen(5005, () => {
  console.log(`App is listening at 5005`);
});

app.get("/data-init-countries", async (request, response) => {
  const result = [];
  console.log('start');
  for(let i=0;i<data.length;i++){
    console.log('i',i)
    const findCountry = await CountriesService.findByConditions({
      countryName: data[i].name,
    });
    if(findCountry) {
        for(let ii=0;ii<data[i].cities.length;ii++){
          const findCity = await CitiesService.findByConditions({
            cityName: data[i].cities[ii].name,
          })
          if(findCity) continue;
          const newCity = await CitiesService.create({
            cityName: data[i].cities[ii].name,
            countryObjId: findCountry._id,
          })
          console.log('ii',ii)
          result.push(newCity);
        }
    } else {
      const newCountry = await CountriesService.create({
        countryName: data[i].name,
      })
      if(newCountry) {
        for(let ii=0;ii<data[i].cities.length;ii++){
          const findCity = await CitiesService.findByConditions({
            cityName: data[i].cities[ii].name,
          })
          if(findCity) continue;
          const newCity = await CitiesService.create({
            cityName: data[i].cities[ii].name,
            countryObjId: newCountry._id,
          })
          console.log('ii',ii)
          result.push(newCity);
        }
    }
    }
  }
  console.log('finish');
  return response.json(result)
});