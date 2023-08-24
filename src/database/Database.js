const mysql = require('mysql2');

class Database {
  constructor(config) {
    this.pool = mysql.createPool(config);
  }

  // get userinfo from Users by Id 
  async getUserInfo(id) {
    const sql = 'SELECT Email, FullName FROM Users WHERE Id = ?';
    try {
      const connection = await this.connect();
      const result = await this.query(sql, id);
      this.disconnect(connection);
      return result;
    } catch {
      throw error;
    }
  }

  async query(sql, data) {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, data, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  async getUserById(id) {
    const sql = 'SELECT * FROM Users WHERE Id = ?';
    try {
      const connection = await this.connect();
      const result = await this.query(sql, id);
      this.disconnect(connection);
      return result;
    } catch {
      throw error;
    }
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

  // change password by ID funcition
  async changePasswordByID(password, id) {
    const sql = 'UPDATE Users SET Password = ? WHERE Id = ?';
    try {
      const connection = await this.connect();
      const result = await this.query(sql, [password, id]);
      this.disconnect(connection);
      return result;
    } catch {
      throw error;
    }
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

  async equipmentExists(equipmentId) {
    const sql = 'SELECT id FROM equipment WHERE id = ?';
    try {
      const connection = await this.connect();
      const result = await this.query(sql, equipmentId);
      this.disconnect(connection);
      return result.length > 0;
    } catch (error) {
      throw error;
    }
  }

  async saveEquipment(equipmentData) {
    const equipmentId = equipmentData.id;

    if (await this.equipmentExists(equipmentId)) {
      console.log('Equipment already exists in the database.');
      return;
    }

    const sql = 'INSERT INTO equipment SET ?';
    try {
      const connection = await this.connect();
      const result = await this.query(sql, equipmentData);
      this.disconnect(connection);
      console.log('Equipment saved successfully!');
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  async getEquipmentById(equipmentId) {
    const sql = 'SELECT * FROM equipment WHERE id = ?';
    try {
      const connection = await this.connect();
      const result = await this.query(sql, equipmentId);
      this.disconnect(connection);
      return result[0]; // Retorna el primer resultado encontrado
    } catch (error) {
      throw error;
    }
  }

  async getAllEquipment() {
    const sql = 'SELECT * FROM equipment';
    try {
      const connection = await this.connect();
      const result = await this.query(sql);
      this.disconnect(connection);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateEquipment(equipmentData) {
    const equipmentId = equipmentData.id;

    if (!(await this.equipmentExists(equipmentId))) {
      console.log('Equipment does not exist in the database.');
      return false;
    }

    const sql = 'UPDATE equipment SET ? WHERE id = ?';
    try {
      const connection = await this.connect();
      const result = await this.query(sql, [equipmentData, equipmentId]);
      this.disconnect(connection);

      if (result.affectedRows === 1) {
        console.log('Equipment updated successfully!');
        return true;
      } else {
        console.log('Equipment update failed.');
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteEquipmentsByIds(equipmentIds) {
    const sql = 'DELETE FROM equipment WHERE id IN (?)';
    try {
      const connection = await this.connect();
      const result = await this.query(sql, [equipmentIds]);
      this.disconnect(connection);

      if (result.affectedRows > 0) {
        console.log('Equipment deleted successfully!');
        return true;
      } else {
        console.log('Equipment deletion failed.');
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  // Tracking -----------------------------------------------------------------------

  async trackingExists(trackingId) {
    const sql = 'SELECT id FROM tracking WHERE id = ?';
    try {
      const connection = await this.connect();
      const result = await this.query(sql, trackingId);
      this.disconnect(connection);
      return result.length > 0;
    } catch (error) {
      throw error;
    }
  }

  async getTrackingById(trackingId) {
    const sql = 'SELECT * FROM tracking WHERE id = ?';
    try {
      const connection = await this.connect();
      const result = await this.query(sql, trackingId);
      this.disconnect(connection);
      return result[0]; // Retorna el primer resultado encontrado
    } catch (error) {
      throw error;
    }
  }

  async getAllTracking() {
    const sql = 'SELECT * FROM tracking';
    try {
      const connection = await this.connect();
      const result = await this.query(sql);
      this.disconnect(connection);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async saveTracking(trackingData) {
    const sql = 'INSERT INTO tracking SET ?';
    try {
      const connection = await this.connect();
      const result = await this.query(sql, trackingData);
      this.disconnect(connection);
      console.log('Tracking record saved successfully!');
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  async updateTracking(trackingData) {
    const trackingId = trackingData.id;

    if (!(await this.trackingExists(trackingId))) {
      console.log('Tracking record does not exist in the database.');
      return false;
    }

    const sql = 'UPDATE tracking SET ? WHERE id = ?';
    try {
      const connection = await this.connect();
      const result = await this.query(sql, [trackingData, trackingId]);
      this.disconnect(connection);

      if (result.affectedRows === 1) {
        console.log('Tracking record updated successfully!');
        return true;
      } else {
        console.log('Tracking record update failed.');
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteTrackingByIds(trackingIds) {
    const sql = 'DELETE FROM tracking WHERE id IN (?)';
    try {
      const connection = await this.connect();
      const result = await this.query(sql, [trackingIds]);
      this.disconnect(connection);

      if (result.affectedRows > 0) {
        console.log('Tracking records deleted successfully!');
        return true;
      } else {
        console.log('Tracking records deletion failed.');
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  async getCustomerById(customerId) {
    const sql = 'SELECT * FROM customers WHERE id = ?';
    try {
      const connection = await this.connect();
      const result = await this.query(sql, customerId);
      this.disconnect(connection);
      return result[0]; // Retorna el primer resultado encontrado
    } catch (error) {
      throw error;
    }
  }

  async getAllCustomers() {
    const sql = 'SELECT * FROM customers';
    try {
      const connection = await this.connect();
      const result = await this.query(sql);
      this.disconnect(connection);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateCustomer(customerData) {
    const customerId = customerData.id;

    if (!(await this.customerExists(customerId))) {
      console.log('Customer does not exist in the database.');
      return false;
    }

    const sql = 'UPDATE customers SET ? WHERE id = ?';
    try {
      const connection = await this.connect();
      const result = await this.query(sql, [customerData, customerId]);
      this.disconnect(connection);

      if (result.affectedRows === 1) {
        console.log('Customer updated successfully!');
        return true;
      } else {
        console.log('Customer update failed.');
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteCustomersByIds(customerIds) {
    const sql = 'DELETE FROM customers WHERE id IN (?)';
    try {
      const connection = await this.connect();
      const result = await this.query(sql, [customerIds]);
      this.disconnect(connection);

      if (result.affectedRows > 0) {
        console.log('Customers deleted successfully!');
        return true;
      } else {
        console.log('Customers deletion failed.');
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  async customerExists(customerId) {
    const sql = 'SELECT id FROM customers WHERE id = ?';
    try {
      const connection = await this.connect();
      const result = await this.query(sql, customerId);
      this.disconnect(connection);
      return result.length > 0;
    } catch (error) {
      throw error;
    }
  }

  async saveCustomer(customerData) {
    const sql = 'INSERT INTO customers SET ?';
    try {
      const connection = await this.connect();
      const result = await this.query(sql, customerData);
      this.disconnect(connection);
      console.log('Customer saved successfully!');
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  async getEquipmentSummary() {
    const sql = `
      SELECT
        equipment_name,
        equipment_type,
        model,
        code,
        customer_name
      FROM equipment
    `;
    
    try {
      const connection = await this.connect();
      const result = await this.query(sql);
      this.disconnect(connection);

      // Realizar el cálculo de stock y sold utilizando JavaScript
      const equipmentSummary = {};
      result.forEach(item => {
        const key = item.code;
        if (!equipmentSummary[key]) {
          equipmentSummary[key] = {
            equipment_name: item.equipment_name,
            equipment_type: item.equipment_type,
            model: item.model,
            code: item.code,
            stock: 0,
            sold: 0,
          };
        }
        
        equipmentSummary[key].stock++;
        if (item.customer_name) {
          equipmentSummary[key].sold++;
        }
      });

      // Restar el valor de sold al valor de stock
      Object.values(equipmentSummary).forEach(item => {
        item.stock -= item.sold;
      });

      return Object.values(equipmentSummary);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Database;
