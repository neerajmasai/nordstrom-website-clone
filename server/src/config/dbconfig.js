
//server host name
const HOST = "localhost";

//remote database name
const DATABASE = "nordstromdb";

//database credentials
const USERNAME = "nordstrom";
const PASSWORD = "PBNYysaBJizYYkQc";

//default app port
const PORT = 2345;

//default connection url
const DEFAULT_CONNECTION_STRING = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.cindx.mongodb.net/${DATABASE}?retryWrites=true&w=majority`; 

//mongoose options for connection
const MONGOOSE_OPTIONS = {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true,
    useNewUrlParser:true
}

module.exports = {HOST, PORT, DATABASE, USERNAME, PASSWORD, DEFAULT_CONNECTION_STRING, MONGOOSE_OPTIONS}