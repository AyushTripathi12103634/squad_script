import cron from 'node-cron';
import usermodel from '../models/usermodel.js'

cron.schedule('*/10 * * * * *', async () => {
    try {
        console.log("hello");
    } catch (error) {
        console.error(error);
    }
});
