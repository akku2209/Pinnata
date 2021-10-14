const fs = require("fs");
const db = require('./db');

var count = 8189;
async function test1() {
    let imagedata = await db.query("SELECT * FROM image where id > 8189");
    console.log(imagedata);
    if (imagedata.length) {
        imagedata.forEach(async function(res) {
            let jsondata = (JSON.parse(res.json_data));
            let proj = {
                "name": "RoachFest" + " " + "#" + res.id,
                "description": "",
                "image": "https://roachfest.mypinata.cloud/ipfs/QmdPKCDJxeEaHb6336NS4Y44B7NFBNTqy4L7DUNNnwnvr6/" + jsondata.image_name + ".png",
                "attributes": [
                    { "trait_type": "background", "value": jsondata.attributes.background },
                    { "trait_type": "chain", "value": jsondata.attributes.chain },
                    { "trait_type": "clothes", "value": jsondata.attributes.clothes },
                    { "trait_type": "earrings", "value": jsondata.attributes.earrings },
                    { "trait_type": "eyes", "value": jsondata.attributes.eyes },
                    { "trait_type": "eyewear", "value": jsondata.attributes.eyewear },
                    { "trait_type": "facial", "value": jsondata.attributes.facial },
                    { "trait_type": "head", "value": jsondata.attributes.head },
                    { "trait_type": "mouth", "value": jsondata.attributes.mouth },
                    { "trait_type": "shoes", "value": jsondata.attributes.shoes },
                    { "trait_type": "type", "value": jsondata.attributes.type }
                ]
            };

            count++;
            let file_newpath = './Jsonfolder/' + count;
            fs.writeFile(file_newpath, JSON.stringify(proj), async(error) => {
                let update_query = await db.query(`UPDATE image SET ipfs_json = '${JSON.stringify(proj)}' where image.id = ${res.id}`);
                console.log(update_query);
            });
        })
    }
}
test1();

// db.js
// require('dotenv').config()
// const mysql = require('mysql');

// const db_config = {
//     connectionLimit: 10,
//     host: process.env.db_host,
//     user: process.env.db_user,
//     password: process.env.db_pass,
//     database: process.env.db_name,
// };

// const pool = mysql.createPool(db_config);
// exports.pool = pool;
// exports.query = function(query) {
//     try {
//         return new Promise((resolve, reject) => {
//             pool.query(query, function(err, result, fields) {
//                 if (err) reject(err);
//                 resolve(result);
//             });
//         })
//     } catch (err) {
//         console.log('in db_sql function error');
//         console.log(err);
//         res.status(500).send({ success: false, msg: 'Error', data: '', errors: err });
//     }
// }