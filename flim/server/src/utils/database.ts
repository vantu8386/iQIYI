import mysql2, { PoolOptions, Pool } from "mysql2";

// tạo các config để kết nối
const databaseConfig: PoolOptions = {
  database: "clone_iqiyi",
  password: "12345678",
  host: "localhost",
  user: "root",
  port: 3306,
};
//  khoi tao ket noi
const database: Pool = mysql2.createPool(databaseConfig)

database.getConnection((err, conn) => {
  if (err) {
    console.log("Kết nối sql thất bại");
  } else{
    console.log("kết nối thành công");
    
  }
})

// đẩy database ra bên ngoài để sử dụng
export default database.promise();
