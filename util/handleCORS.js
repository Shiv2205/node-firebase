exports.CORS = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'localhost:3000, codepen.io, wedding-app-ebon.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    //res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
}