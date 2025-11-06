const base = require('@playwright/test');

exports.customTest = base.test.extend({
  testDataForOrder: {
      username: "mallikabhat99@gmail.com",
      password: "Mamatha@$54",
      productName: "ZARA COAT 3"
  }
  }
);

