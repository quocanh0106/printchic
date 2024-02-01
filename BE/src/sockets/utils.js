const NotificationsService = require('../services/NotificationsService.js');
const PostsService = require('../services/PostsService');
const UsersService = require('../services/UsersService');
const { NOTIFICATION_TYPE } = require('../utils/constants.js');
let io = null;
let socket = null;
const receiveSocket = (_socket, _io) => {
    socket = _socket;
    io = _io;
}



const pushNotificationToClient = () => {
    io && io.emit('notifications', { message: 'Hello from the server!' });
    console.log('send thanh cong')
}

const sendNotification = async (data) => {
    try {
        const { senderObjId, receiverObjId, notifyType,
            notifyTitle, notifyContent, relatedObjId,
            relatedType, entity, isApprove = null
        } = data;
        const findSender = await UsersService.findByConditions({
            userObjId: senderObjId,
        })
        const notifyParams = [];
        switch (notifyType) {
            case NOTIFICATION_TYPE[100]: {
                const titlePost = entity?.title || '';
                const action = isApprove ? "duyệt" : "từ chối";
                // const titleForSender = `Bài đăng ${titlePost} của bạn đã được ${action}`
                // const contentForSender = `Bài đăng ${titlePost} đã được ${action} bởi ${findReceiver?.fullName}`
                // notifyParams.push({
                //     ...data,
                //     notifyTitle: titleForSender,
                //     notifyContent: contentForSender,
                // })
                const titleForReceiver = `Bài đăng ${titlePost} đã được ${action}`
                const contentForReceiver = `Bài đăng ${titlePost} của ${entity?.createdBy?.fullName} đã được ${action} bởi ${findSender?.fullName}`
                notifyParams.push({
                    ...data,
                    notifyTitle: titleForReceiver,
                    notifyContent: contentForReceiver,
                })
                break;
            }
            case NOTIFICATION_TYPE[400]: {
                const findSender = await UsersService.findByConditions({
                    userObjId: senderObjId,
                })
                const titlePost = entity?.title || '';
                const title = `Bài đăng ${titlePost} của bạn có ứng viên ứng tuyển`
                const content = `Bài đăng ${titlePost} đã có ${findSender?.fullName} ứng tuyển`
                notifyParams.push({
                    ...data,
                    notifyTitle: title,
                    notifyContent: content,
                })
                break;
            }
            default:
                break;
        }
        for (let i = 0; i < notifyParams.length; i++) {
            await NotificationsService.create(notifyParams[i])
        }
        pushNotificationToClient();
        console.log("Send notification successfully!")
    } catch (errors) {
        console.log(errors)
    }
}

module.exports = {
    pushNotificationToClient,
    receiveSocket,
    sendNotification,
}