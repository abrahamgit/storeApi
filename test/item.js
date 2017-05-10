//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Item = require('../app/models/item');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

//Our parent block
describe('Items', () => {
    beforeEach((done) => { //Before each test we empty the database
        Item.remove({}, (err) => {
            done();
        });
    });
    /*
     * Test the /GET route
     */
    describe('/GET Item', () => {
        it('it should GET all the Items', (done) => {
            chai.request(server)
                .get('/Item')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
    /*
     * Test the /POST route
     */
    describe('/POST Item', () => {
        it('it should not POST a Item without imageUrl field', (done) => {
            let Item = {
                productId: 13,
                productName: "New Book",
                productCode: "PDO-1954",
                releaseDate: "Jul, 12, 1991 ",
                description: "this is the dicription",
                price: 43.22,
                starRating: 3.5,
                //imageUrl:"image url is"
            }
            chai.request(server)
                .post('/Item')
                .send(Item)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('imageUrl');
                    res.body.errors.imageUrl.should.have.property('kind').eql('required');
                    done();
                });
        });
        it('it should POST a Item ', (done) => {
            let Item = {
                productId: 13,
                productName: "New Book",
                productCode: "PDO-1954",
                releaseDate: "Jul, 12, 1991 ",
                description: "this is the dicription",
                price: 43.22,
                starRating: 3.5,
                imageUrl: "image url is"
            }
            chai.request(server)
                .post('/Item')
                .send(Item)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Item successfully added!');
                    res.body.Item.should.have.property('productId');
                    res.body.Item.should.have.property('productName');
                    res.body.Item.should.have.property('productCode');
                    res.body.Item.should.have.property('releaseDate');
                    res.body.Item.should.have.property('description');
                    res.body.Item.should.have.property('price');
                    res.body.Item.should.have.property('starRating');
                    res.body.Item.should.have.property('imageUrl');
                    done();
                });
        });
    });
    /*
     * Test the /GET/:id route
     */
    describe('/GET/:id Item', () => {
        it('it should GET a Item by the given id', (done) => {
            let item = new Item({ 
                productId: 13,
                productName: "New Book",
                productCode: "PDO-1954",
                releaseDate: "Jul, 12, 1991 ",
                description: "this is the dicription",
                price: 43.22,
                starRating: 3.5,
                imageUrl: "image url is"
             });
            item.save((err, item) => {
                chai.request(server)
                    .get('/Item/' + item.id)
                    .send(item)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('productId');
                        res.body.should.have.property('productName');
                        res.body.should.have.property('productCode');
                        res.body.should.have.property('releaseDate');
                        res.body.should.have.property('description');
                        res.body.should.have.property('price');
                        res.body.should.have.property('starRating');
                        res.body.should.have.property('imageUrl');
                        res.body.should.have.property('_id').eql(item.id);
                        done();
                    });
            });

        });
    });
    /*
     * Test the /PUT/:id route
     */
    describe('/PUT/:id Item', () => {
        it('it should UPDATE a Item given the id', (done) => {
            let item = new Item({ 
                productId: 13,
                productName: "New Book",
                productCode: "PDO-1954",
                releaseDate: "Jul, 12, 1991 ",
                description: "this is the dicription",
                price: 43.22,
                starRating: 3.5,
                imageUrl:"image url is"
             })
            item.save((err, item) => {
                chai.request(server)
                    .put('/Item/' + item.id)
                    .send({ 
                        productId: 13,
                        productName: "New Book",
                        productCode: "PDO-1954",
                        releaseDate: "Jul, 12, 1991 ",
                        description: "this is the dicription",
                        price: 43.22,
                        starRating: 3.5,
                        imageUrl:"image url is" 
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Item updated!');
                        res.body.item.should.have.property('product').eql(4.5);
                        done();
                    });
            });
        });
    });
    /*
     * Test the /DELETE/:id route
     */
    describe('/DELETE/:id Item', () => {
        it('it should DELETE a Item given the id', (done) => {
            let item = new Item({ 
                productId: 13,
                productName: "New Book",
                productCode: "PDO-1954",
                releaseDate: "Jul, 12, 1991 ",
                description: "this is the dicription",
                price: 43.22,
                starRating: 3.5,
                imageUrl:"image url is"
             })
            item.save((err, item) => {
                chai.request(server)
                    .delete('/Item/' + item.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Item successfully deleted!');
                        res.body.result.should.have.property('ok').eql(1);
                        res.body.result.should.have.property('n').eql(1);
                        done();
                    });
            });
        });
    });
});
