class Customer {
    constructor(id,name, age) {
      this.name = name;
      this.age = age;
      this._id = id;
    }
  
    getUserStats() {
      return `
        Name: ${this.name}
        Age: ${this.age}
        id: ${this._id}
      `;
    }
  }
  
  module.exports = Customer;
  