const Params = require('./params');
exports.MongoConf = ( (SERVER, mongoose) => {
mongoose.Promise =  global.Promise;
mongoose.connect(Params.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("mongoDB connected"))
.catch(err => console.log(err));

});
