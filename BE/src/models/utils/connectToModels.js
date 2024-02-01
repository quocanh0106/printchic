

const { connectDatabase } = require('../../utils/shared');

const UsersSchema = require('../Users');
const VerifiesSchema = require('../Verifies');
const PostsSchema = require('../Posts');
const ChargingHistoriesSchema = require('../ChargingHistories');
const UserPostsSchema = require('../UserPosts');
const ChargingProfilesSchema = require('../ChargingProfiles');
const AttachmentsSchema = require('../Attachments');
const AttachmentEntitiesSchema = require('../AttachmentEntities');
const NewsSchema = require('../News');
const ConfigsSchema = require('../Configs');
const AdvertisementsSchema = require('../Advertisements');
const CountriesSchema = require('../Countries');
const CitiesSchema = require('../Cities');
const TrackingBusinessesSchema = require('../TrackingBusinesses');
const NotificationsSchema = require('../Notifications');
const XKLDCompaniesSchema = require('../XKLDCompanies');

const models = {};

module.exports = {
    users: UsersSchema,
    verifies: VerifiesSchema,
    posts: PostsSchema,
    charging_histories: ChargingHistoriesSchema,
    user_posts: UserPostsSchema,
    charging_profiles: ChargingProfilesSchema,
    attachments: AttachmentsSchema,
    attachment_entities: AttachmentEntitiesSchema,
    news: NewsSchema,
    configs: ConfigsSchema,
    advertisements: AdvertisementsSchema,
    countries: CountriesSchema,
    cities: CitiesSchema,
    tracking_businesses: TrackingBusinessesSchema,
    notifications: NotificationsSchema,
    xkldCompanies: XKLDCompaniesSchema,
    connectToModels: ({ databaseName, currentModels = [], otherModels = [] }) => {
        const conn = connectDatabase(databaseName);
        otherModels.map((model) => {
            conn.model(model, models[model]);
        });
        const objCurrentModels = currentModels.reduce((initObj, currModel) => {
            initObj[currModel] = conn && conn.model ? conn.model(currModel, models[currModel]) : null;
            return initObj;
        }, {});
        objCurrentModels.connectToModel = (model) => {
            conn.model(model, models[model]);
        };
        return objCurrentModels;
    },
};
