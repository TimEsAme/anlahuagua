const mysql = require("mysql2");

// 创建一个数据库连接
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1998329sgw",
    database: "jojodb",
});

// connection.query("SELECT * FROM `company`;", function (err, results) {
//     console.log(results);
// });

// connection.query("insert into company(`name`,`location`,`buildDate`) values ('安拉花瓜','中东',curdate())", (err, res) => {
//     console.log(res);
// })

// connection.query("update company set `name`='安拉胡阿克巴' where `id`=5", (err, res) => {
//     console.log(res);
// })


// connection.query("delete from company where id=5", (err, res) => {
//     console.log(res)
// })