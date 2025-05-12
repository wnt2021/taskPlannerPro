// config/dbConfig.js
import nodemailer from 'nodemailer';
export const mongoURI = 'mongodb+srv://wintop:wintop910@cluster1.gtpnda8.mongodb.net/TaskPlanner?retryWrites=true&w=majority';
export const JWT_SECRET = '271KMWoWU1u7Jeda0X';

const config = {
    PORT: 3000,
    EMAIL_USER: 'wintopadedokun@gmail.com',
    EMAIL_PASS: 'vtvz udvr tzet hkqs',
};

const createTransporter = () => {    
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS,
      },
    });
  };
  
export {config, createTransporter}
