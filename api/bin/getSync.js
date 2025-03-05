const sequelize = require("../config/sequelize");
const adminSchema = require("../schemas/adminSchema");
const bloodBankSchema = require("../schemas/bloodBankSchema");
const bloodStockSchema = require("../schemas/bloodStockSchema");
const orderSchema = require("../schemas/orderSchema");
const userSchema = require("../schemas/userSchema");



const getSync = async () => {

    try {


        let { models } = await sequelize.sync({ alter: true })

       
        console.log(`Total tables created: ${Object.keys(models)?.length}`);

        console.log(
            '\x1b[47m\x1b[30m%s\x1b[0m',
            'Database has been migrated successfully. You can now start the server.'
        );

        console.log(
            '\x1b[47m\x1b[30m%s\x1b[0m',
            'Use command: npm start (to start the server)'
        );

        process.exit();

    } catch (err) {
        console.error('Error:', err);
    }

};
module.exports = getSync;
