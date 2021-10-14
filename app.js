const express = require("express");
const app = express();
const ipfs_api = require("./ipfs_api/ipfs_api");



app.listen(3000);
console.log("RUNING coinscrow...", Date.now());
app.get('/ipfs_api/pinFileToIPFS', [ipfs_api.pinFileToIPFS]);
app.post('/ipfs_api/uploadImage', [ipfs_api.uploadImage]);
app.post('/ipfs_api/pinByHash', [ipfs_api.pinByHash]);

app.get('/', (req, res) => {
    res.status(200).send({ success: true, msg: 'Running' });
})