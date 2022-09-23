const clientRoutes = require('./Client');
const productsRoutes = require('./Products');
const orderRoutes = require('./Order');

const registerRoutes = (app)=>{
    app.use("/api",clientRoutes);
    app.use("/api",productsRoutes);
    app.use("/api",orderRoutes);
}

module.exports = registerRoutes