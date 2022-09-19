const clientRoutes = require('./Client');
const productsRoutes = require('./Products');

const registerRoutes = (app)=>{
    app.use("/api",clientRoutes)
}

module.exports = registerRoutes