const Task = require("../../db/models/task/index");

module.exports.getAllPurchs = (req, res) => {
  Purch.find().then((result) => {
    res.send(result);
  }).catch((err) => {
    res.send(err);
  });
};

module.exports.createNewPurch = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const body = req.body;
  const {place, date, price} = body;
  if (body.hasOwnProperty('place') && body.hasOwnProperty("date") && body.hasOwnProperty("price")) {
    const purch = new Purch({
      place,
      date,
      price
    });
    purch.save().then((result) => {
      res.send(result);
    }).catch((err) => res.send(err));
  }
};

module.exports.changePurchInfo = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const body = req.body;
  let {place, date, price} = body;
  const id = {_id: body._id}
  if (!price) {
    price = 0;
  };
  Purch.updateOne(id, {
    $set: {
      place,
      date,
      price
    }
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
    })
  }
};