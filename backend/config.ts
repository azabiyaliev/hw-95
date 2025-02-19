import path from "path";

const rootPath = __dirname;

const config = {
    rootPath,
    publicPath: path.join(rootPath, 'public'),
    db: "mongodb://localhost/hw-95",
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        secretId: process.env.GOOGLE_CLIENT_SECRET,
    },
};

export default config;