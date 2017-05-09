let mongoose = require('mongoose');
let Item = require('../models/item');

/*
 * GET /Item route to retrieve all the Items.
 */
function getItems(req, res) {
	//Query the DB and if no errors, send all the Items
	let query = Item.find({});
	query.exec((err, Items) => {
		if(err) res.send(err);
		//If no errors, send them back to the client
		res.json(Items);
	});
}

/*
 * POST /Item to save a new Item.
 */
function postItem(req, res) {
	//Creates a new Item
	var newItem = new Item(req.body);
	//Save it into the DB.
	newItem.save((err,Item) => {
		if(err) {
			res.send(err);
		}
		else { //If no errors, send it back to the client
			res.json({message: "Item successfully added!", Item });
		}
	});
}

/*
 * GET /Item/:id route to retrieve a Item given its id.
 */
function getItem(req, res) {
	Item.findById(req.params.id, (err, Item) => {
		if(err) res.send(err);
		//If no errors, send it back to the client
		res.json(Item);
	});
}

/*
 * DELETE /Item/:id to delete a Item given its id.
 */
function deleteItem(req, res) {
	Item.remove({_id : req.params.id}, (err, result) => {
		res.json({ message: "Item successfully deleted!", result });
	});
}

/*
 * PUT /Item/:id to updatea a Item given its id
 */
function updateItem(req, res) {
	Item.findById({_id: req.params.id}, (err, Item) => {
		if(err) res.send(err);
		Object.assign(Item, req.body).save((err, Item) => {
			if(err) res.send(err);
			res.json({ message: 'Item updated!', Item });
		});
	});
}

//export all the functions
module.exports = { getItems, postItem, getItem, deleteItem, updateItem };
