const PORT_DEFAULT = 3001;
const PORT = process.env.PORT || PORT_DEFAULT;

const MONGODB_DEFAULT = 'mongodb://localhost:27017/wealth-wizdb';
const MONGO_DB = process.env.MONGODB || MONGODB_DEFAULT;

const { NODE_ENV, JWT_SECRET } = process.env;
const SECRET_KEY = 'some-secret-key';

module.exports = {
	PORT,
	MONGO_DB,
	NODE_ENV,
	JWT_SECRET,
	SECRET_KEY,
};