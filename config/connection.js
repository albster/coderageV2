// Dependencies
var Sequelize = require("sequelize");

var sequelize = new Sequelize("apwl4ps42kxf73ja", "nkzqw2sl69sggim9", "jlj3b2vcgokcpo0y", {
  host: "ysp9sse09kl0tzxj.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  port: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = sequelize;