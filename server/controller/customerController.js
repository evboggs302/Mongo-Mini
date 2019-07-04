const Customer = require("../collections/customer");

module.exports = {
  getAllCustomers: (req, res, next) => {
    Customer.find({}).then(customers => {
      res.status(200).send(customers);
    });
  },
  postCustomer: (req, res, next) => {
    const { name, email } = req.body;
    const customer = new Customer({ name, email });

    customer.save(err => {
      if (err) {
        res.status(400).send("there was an error on server");
      }
      Customer.find({}).then(customers => {
        res.status(200).send(customers);
      });
    });
  },
  updateCustomer: (req, res, next) => {
    const { id } = req.params;
    const { email } = req.query;

    Customer.findById(id).then(found => {
      (found.email = email),
        found.save(err => {
          if (err) {
            res.status(400).send("erroring on the server");
          }
          Customer.find({}).then(customers => {
            res.status(200).send(customers);
          });
        });
    });
  },
  deleteCustomer: (req, res, next) => {
    const { id } = req.params;

    Customer.findByIdAndDelete(id).then(err => {
      Customer.find({}).then(customers => {
        res.status(200).send(customers);
      });
    });
  }
};
