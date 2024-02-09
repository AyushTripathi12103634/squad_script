import cron from 'node-cron';
import usermodel from '../models/usermodel.js'
import filemodel from '../models/filemodel.js';
import meetmodel from '../models/meetmodel.js';

cron.schedule('0 0 * * *', async () => {
    try {
        console.log("Deleting users not verified for 1 month");
        const users = await usermodel.find();
        users.forEach(user => {
            user.checkVerification();
        });
    } catch (error) {
        console.error(error);
    }
});
cron.schedule('0 0 * * *', async () => {
    try {
        console.log("Deleting files older than 1 day");
        const files = await filemodel.find();
        files.forEach(file => {
            file.checkExpiry();
        });
    } catch (error) {
        console.error(error);
    }
});

cron.schedule('0 0 * * *', async () => {
    try {
        console.log("Deleting meetings older than 1 day");
        const meets = await meetmodel.find();
        meets.forEach(meet => {
            meet.checkmeetExpiry();
        });
    } catch (error) {
        console.error(error);
    }
});
