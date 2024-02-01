require('dotenv').config()
const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;
const MONGODB_URI = `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@employment.vxdprgl.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;
const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb');
const {
  xkldCompanies: XKLDCompaniesModels,
} = require('../models/utils/connectToModels');
const { dataXKLDCompanies } = require('./dataSample/dataXKLDCompanies');
const { isEmpty } = require('../utils/shared');
const initConfig = async () => {
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
    for (let i = 0; i < dataXKLDCompanies.length; i++) {
      console.log(i, ' : running')
      const findCompany = await XKLDCompaniesModels.findOne({
        companyName: dataXKLDCompanies[i].companyName,
      })
      if (!isEmpty(findCompany)) continue;
      await XKLDCompaniesModels.create(
        dataXKLDCompanies[i],
      )
    }
    console.log('Init companies successfully');

  } catch (err) {
    console.log(err, 'err')
  }
}

initConfig();
