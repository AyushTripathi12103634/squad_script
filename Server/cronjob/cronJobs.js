import cron from 'node-cron';
import usermodel from '../models/usermodel.js'

cron.schedule('0 0 * * *', async () => {
    try {
        const users = await usermodel.find();
        users.forEach(user => {
            user.checkVerification();
        });
    } catch (error) {
        console.error(error);
    }
});
