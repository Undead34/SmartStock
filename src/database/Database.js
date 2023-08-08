const mysql = require('mysql2');

class Database {
  constructor(config) {
    this.pool = mysql.createPool(config);
  }

  async query(sql, data) {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, data, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) reject(err);
        else {
          console.log('Connected to database!');
          resolve(connection);
        }
      });
    });
  }

  async disconnect(connection) {
    connection.release();
    console.log('Disconnected from database!');
  }

  async saveTempLoginCode(id, code) {
    const sql = 'UPDATE Users SET TempLoginCodes = ? WHERE Id = ?';
    try {
      const connection = await this.connect();
      const result = await this.query(sql, [code, id]);
      this.disconnect(connection);
      return result;
    } catch {
      throw error;
    }
  }

  async existUser(userData) {
    const sql = 'SELECT * FROM Users WHERE Email = ?';
    try {
      const connection = await this.connect();
      const result = await this.query(sql, userData);
      this.disconnect(connection);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async insertToken(id, token) {
    const dateNow = new Date();
    dateNow.setDate(dateNow.getDate() + 30);

    const sql = 'UPDATE Users SET LoginToken = ?, TokenExpirationDate = ? WHERE Id = ?';

    try {
      const connection = await this.connect();
      const result = await this.query(sql, [token, dateNow, id]);
      this.disconnect(connection);
      return result;
    } catch {
      throw error;
    }
  }

  async createUser(userData) {
    const sql = 'INSERT INTO Users SET ?';
    try {
      const connection = await this.connect();
      const result = await this.query(sql, userData);
      this.disconnect(connection);
      console.log('User created successfully!');
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  async createEquipment(equipmentData) {
    const sql = 'INSERT INTO Equipment SET ?';
    try {
      const connection = await this.connect();
      const result = await this.query(sql, equipmentData);
      this.disconnect(connection);
      console.log('Equipment created successfully!');
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  async createClient(clientData) {
    const sql = 'INSERT INTO Clients SET ?';
    try {
      const connection = await this.connect();
      const result = await this.query(sql, clientData);
      this.disconnect(connection);
      console.log('Client created successfully!');
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  async createDeliveryNote(deliveryNoteData) {
    const sql = 'INSERT INTO Delivery_Notes SET ?';
    try {
      const connection = await this.connect();
      const result = await this.query(sql, deliveryNoteData);
      this.disconnect(connection);
      console.log('Delivery note created successfully!');
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  async createPurchaseTracking(purchaseTrackingData) {
    const sql = 'INSERT INTO Purchase_Tracking SET ?';
    try {
      const connection = await this.connect();
      const result = await this.query(sql, purchaseTrackingData);
      this.disconnect(connection);
      console.log('Purchase tracking created successfully!');
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  async updateEquipment(equipmentID, newData) {
    const sql = 'UPDATE Equipment SET ? WHERE ID = ?';
    try {
      const connection = await this.connect();
      await this.query(sql, [newData, equipmentID]);
      this.disconnect(connection);
      console.log('Equipment updated successfully!');
    } catch (error) {
      throw error;
    }
  }

  async updateClient(clientID, newData) {
    const sql = 'UPDATE Clients SET ? WHERE ID = ?';
    try {
      const connection = await this.connect();
      await this.query(sql, [newData, clientID]);
      this.disconnect(connection);
      console.log('Client updated successfully!');
    } catch (error) {
      throw error;
    }
  }

  async deleteEquipment(equipmentID) {
    const sql = 'DELETE FROM Equipment WHERE ID = ?';
    try {
      const connection = await this.connect();
      await this.query(sql, equipmentID);
      this.disconnect(connection);
      console.log('Equipment deleted successfully!');
    } catch (error) {
      throw error;
    }
  }

  async deleteClient(clientID) {
    const sql = 'DELETE FROM Clients WHERE ID = ?';
    try {
      const connection = await this.connect();
      await this.query(sql, clientID);
      this.disconnect(connection);
      console.log('Client deleted successfully!');
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Database;






// const mysql = require('mysql');

// class Database {
//   constructor(config) {
//     this.connection = mysql.createConnection(config);
//   }

//   connect() {
//     this.connection.connect((err) => {
//       if (err) throw err;
//       console.log('Connected to database!');
//     });
//   }

//   disconnect() {
//     this.connection.end((err) => {
//       if (err) throw err;
//       console.log('Disconnected from database!');
//     });
//   }

//   existUser(userData, callback) {
//     const sql = 'SELECT * FROM Users WHERE Email = ?';
//     this.connection.query(sql, userData, (err, result) => {
//       if (err) throw err;
//       callback(result);
//     })
//   }

//   createUser(userData, callback) {
//     const sql = 'INSERT INTO Users SET ?';
//     this.connection.query(sql, userData, (err, result) => {
//       if (err) throw err;
//       console.log('User created successfully!');
//       callback(result);
//     })
//   }

//   createEquipment(equipmentData, callback) {
//     const sql = 'INSERT INTO Equipment SET ?';
//     this.connection.query(sql, equipmentData, (err, result) => {
//       if (err) throw err;
//       console.log('Equipment created successfully!');
//       callback(result.insertId);
//     });
//   }

//   createClient(clientData, callback) {
//     const sql = 'INSERT INTO Clients SET ?';
//     this.connection.query(sql, clientData, (err, result) => {
//       if (err) throw err;
//       console.log('Client created successfully!');
//       callback(result.insertId);
//     });
//   }

//   createDeliveryNote(deliveryNoteData, callback) {
//     const sql = 'INSERT INTO Delivery_Notes SET ?';
//     this.connection.query(sql, deliveryNoteData, (err, result) => {
//       if (err) throw err;
//       console.log('Delivery note created successfully!');
//       callback(result.insertId);
//     });
//   }

//   createPurchaseTracking(purchaseTrackingData, callback) {
//     const sql = 'INSERT INTO Purchase_Tracking SET ?';
//     this.connection.query(sql, purchaseTrackingData, (err, result) => {
//       if (err) throw err;
//       console.log('Purchase tracking created successfully!');
//       callback(result.insertId);
//     });
//   }

//   updateEquipment(equipmentID, newData, callback) {
//     const sql = 'UPDATE Equipment SET ? WHERE ID = ?';
//     this.connection.query(sql, [newData, equipmentID], (err) => {
//       if (err) throw err;
//       console.log('Equipment updated successfully!');
//       callback();
//     });
//   }

//   updateClient(clientID, newData, callback) {
//     const sql = 'UPDATE Clients SET ? WHERE ID = ?';
//     this.connection.query(sql, [newData, clientID], (err) => {
//       if (err) throw err;
//       console.log('Client updated successfully!');
//       callback();
//     });
//   }

//   deleteEquipment(equipmentID, callback) {
//     const sql = 'DELETE FROM Equipment WHERE ID = ?';
//     this.connection.query(sql, equipmentID, (err) => {
//       if (err) throw err;
//       console.log('Equipment deleted successfully!');
//       callback();
//     });
//   }

//   deleteClient(clientID, callback) {
//     const sql = 'DELETE FROM Clients WHERE ID = ?';
//     this.connection.query(sql, clientID, (err) => {
//       if (err) throw err;
//       console.log('Client deleted successfully!');
//       callback();
//     });
//   }
// }

// module.exports = Database;
