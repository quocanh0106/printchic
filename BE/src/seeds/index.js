const PostsService = require('../services/PostsService');
const { faker } = require('@faker-js/faker');
require('dotenv').config()
const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;
const MONGODB_URI = `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@employment.vxdprgl.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;
const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb');

const seedDB = async () => {
    try {
        const options = {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        };
        const db = await mongoose.connect(MONGODB_URI, options);
        mongoose.set('strictQuery', true);
        console.log('database connected');
        for (let i = 0; i < 100; i++) {
            const postParams = {};
            postParams.title = faker.person.jobTitle();
            postParams.countryObjId = faker.location.state();
            postParams.provinceObjId = faker.location.city();
            postParams.companyObjId = faker.company.name();
            postParams.jobObjId = faker.person.jobType();
            postParams.jobDescription = faker.person.jobDescriptor();
            postParams.image = faker.image.avatar();
            postParams.examPlace = faker.location.streetAddress();
            postParams.workingTime = faker.number.int();
            postParams.salary = faker.number.int();
            postParams.expectedIncome = faker.number.int();
            postParams.isOverTime = false;
            postParams.benefits = [faker.lorem.sentence(), faker.lorem.sentence(), faker.lorem.sentence()];
            postParams.contractObjId = faker.number.int();
            postParams.gender = 'MALE';
            postParams.fromBorn = 2000;
            postParams.endBorn = 2030;
            postParams.education = faker.vehicle.type();
            postParams.languages = ['en', 'vi', 'ja'];
            postParams.experiences = [faker.lorem.sentences()];
            postParams.healthCondition = faker.lorem.sentences();
            postParams.eyesight = faker.lorem.sentences();
            postParams.isHepatitis = false;
            postParams.isTattoo = false;
            postParams.otherRequirement = faker.lorem.sentences();
            postParams.examForm = faker.lorem.sentences();
            postParams.examDate = '2023-09-06 10:11:15';
            postParams.expiredDate = '2023-09-16 10:11:15';
            postParams.exportDate = '2023-10-20 10:11:15';
            postParams.description = faker.lorem.sentences();
            postParams.createdBy = '64c487c807c3c6f060393c48';
            await PostsService.create(postParams);
        }
        console.log('seed done')
    } catch (err) {
        console.log(err, 'err')
    }
}

seedDB();