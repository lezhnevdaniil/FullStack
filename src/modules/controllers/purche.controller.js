const Purch = require('../../db/models/task/index');

module.exports.getAllPurchs = (req, res) => {
  Purch.find().then((result) => {
    res.send(result);
  }).catch((err) => {
    res.send(err);
  });
};

module.exports.createNewPurch = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const body = req.body;
  if (body.hasOwnProperty('place') && body.hasOwnProperty('date') && body.hasOwnProperty('price')) {
    const purch = new Purch(body);
    purch.save().then(result => {
      res.send(result);
    }).catch((err) => res.send(err));
  }
};

module.exports.changePurchInfo = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const body = req.body;
  if (!body.price) {
    body.price = 0;
  };
  Purch.updateOne(body.id, {
    $set: body
  }).then(result => {
      res.send(result);
    }).catch(err => {
    res.send(err);
  })
};

module.exports.deletePurch = (req, res) => {
  const id = req.query.id;
  if (id) {
    Purch.deleteOne({ _id: id }).then((result) => {
      res.send(result);
    }).catch((err) => { 
      res.send(err);
    });
  }
};