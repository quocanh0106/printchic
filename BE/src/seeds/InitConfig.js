require('dotenv').config()
const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;
const MONGODB_URI = `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@employment.vxdprgl.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;
const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb');
const configsService = require('../services/ConfigsService');
const {dataConfigs} = require('./dataSample/dataConfigs');
const {isEmpty} = require('../utils/shared');
const initConfig = async() => {
  try {
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
  for(let i=0;i<dataConfigs.length;i++) {
    const findConfig = await configsService.findByConditions({
      configCode: dataConfigs[i].configCode,
    })
    if(!isEmpty(findConfig)) continue;
    await configsService.create(
      dataConfigs[i],
    )
  }
  console.log('Init config successfully');

  } catch (err) {
    console.log(err, 'err')
  }
}

initConfig();
