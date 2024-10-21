const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUtRR2dUUGtWU0cycUs3MExpbFBKRjJtcnBiVlJlck1Yc1VvYUc2YUVFQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibk1OeE5jZmpkNTd2QW1DUk1UQXNkT0pGaTRTMkk4empHM1JkNEJRM29FUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBTEFuSFp4U0tjaHdUcklCeWJHbTFqZGtSS1hxRkY4amVlT0hVc0FSMVd3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJscHhkYXd5M1hDU28vRjIreTNrNXVFeVJYeTlJd1BkZVp6Vlk3amhnM2c4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNCdEJvOUxtMHhqeUI1MFI4RFovUDBMYlplcjhsR2dhbTd4blNDVjZyV0U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRhdHBINlY0dGdlL20wOEVFeDZLN1JpNWloUlc1bW5zUTVlRENTcnVSUWc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0FOdFRQQ2l4aVJHVk10VEpVdmFUSGU2TXNjeVg5UWZjSGVBR2FtRG5Icz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZkhwTnJNczFoTFFKYnd0eDhVd3UrR1N5R1hlQ2krcFdadmx0OEQ1N1BUOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imo5SWJJQ0RkRXk3UmZXaVFQTVhBVmcvSDRhYnB3ekxwNE9va2JDZkRSSTNwVWFGR3BPUkxzZ2ZVM25vSVlPS3pURm1hK0MxRnFMclUwS1Q0YU5HdUNBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAsImFkdlNlY3JldEtleSI6IjBhelhBRGdXYkh1NDJBTTZRS2NDLzd5a1RJTzRubnYrTEQrOFhvSnJhWTA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTY4OTc0NDgwODVAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMDhCN0RCREQ4Nzg5NjA4Q0ZGNjIzQjk1ODIxMDE4RDgifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyOTUyMTEyMH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoicXFoLVdfMFdRVXVEUmVGLUZraHl2QSIsInBob25lSWQiOiI2ZTFlYThjMS1mYzg0LTQ2NzQtODYzMS0zMjI1Y2MxODIyMTQiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaGpGQzNyN3VmUm5rS0hmdStvY283YTk1czBRPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImwyQkRmQ015UHkzbi9wK3V5dFI4elZ4bEdCTT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJLSkc2VFlNSiIsIm1lIjp7ImlkIjoiOTY4OTc0NDgwODU6MjFAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiU2FsYW0ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ052Yno2NERFTS9MMmJnR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InE4c3hRTWVaN3h4RytKZlVtRU9wN09qNWNxaVVqU2hkbUlDdHB3M1ZsRFk9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ijhub3BydWlZTldwZzArNzBKeVJETU9hSUJHRVNrWlFueFZvaDhSY0tRRHhkVTY4b21uZFpLenR4V2xGVXh1YXRWZHY4VE1ybk84V1RVQ0JDVVRwTEFBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI0MzFjMVo3TThFL2Jab05TUlYwRTFwbDdJd3VmbGJROVF6RTRoU2xxcGhTOExkS1FtK3NoTHhVa3pDOTdUNTcwbC9ndHBzWEhkbFJMTm5FbmdsWDJBZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijk2ODk3NDQ4MDg1OjIxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmF2TE1VREhtZThjUnZpWDFKaERxZXpvK1hLb2xJMG9YWmlBcmFjTjFaUTIifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mjk1MjExMTcsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBT3gwIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "SHAZO MENTAL",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " SHAZO MENTAL",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐀𝐋𝐏𝐇𝐀-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
