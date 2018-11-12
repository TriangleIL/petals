const { expect } = require('chai');
const request = require('supertest');
const ALL_ITEMS = require('database/items');
const app = require('../../server');

const validOrder = {
  id: 1,
  quantity: 1,
};

const invalidOrderInsufficientQuantity = {
  id: 1,
  quantity: 10,
};

const invalidOrderMissingItem = {
  id: 6,
  quantity: 1,
};

const firstItem = ALL_ITEMS.find(item => item.id === 1);
const validOrderResponse = { ...firstItem, quantity: validOrder.quantity };

describe('API Integration Tests', async () => {
  context('Get All Items', async () => {
    it('should get all items', async (done) => {
      try {
        request(app).get('/v1/items').end((err, res) => {
          expect(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.deep.members(ALL_ITEMS);
        });
      } finally {
        done();
      }
    });
  });

  context('Place Order', async () => {
    it('should create a valid order', async (done) => {
      try {
        request(app)
          .post('/v1/orders')
          .send(validOrder)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer validAccessToken')
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.eql(validOrderResponse);
          });
      } finally {
        done();
      }
    });

    it('should return Unauthorized for missing bearer tokens', async (done) => {
      try {
        request(app)
          .post('/v1/orders')
          .send(validOrder)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(401);
            expect(res.body).to.eql({ error: 'Authentication Token Required' });
          });
      } finally {
        done();
      }
    });

    it('should return Forbidden for invalid bearer tokens', async (done) => {
      try {
        request(app)
          .post('/v1/orders')
          .send(validOrder)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer validAccessToken2')
          .end((err, res) => {
            expect(res.statusCode).to.equal(403);
            expect(res.body).to.eql({ error: 'This user is not authorized for this functionality' });
          });
      } finally {
        done();
      }
    });

    it('should return an error for Insufficent Inventory', async (done) => {
      try {
        request(app)
          .post('/v1/orders')
          .send(invalidOrderInsufficientQuantity)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer validAccessToken')
          .end((err, res) => {
            expect(res.statusCode).to.equal(409);
            expect(res.body).to.eql({
              status: 409,
              error: 'InsufficientQuantityError',
              reason: 'InsufficientQuantityError - Not enough of item remaining to fulfill request',
              id: 1,
              quantity: 4,
              requested: 10,
            });
          });
      } finally {
        done();
      }
    });

    it('should return an error for Invalid Items', async (done) => {
      try {
        request(app)
          .post('/v1/orders')
          .send(invalidOrderMissingItem)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer validAccessToken')
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body).to.eql({
              status: 404,
              error: 'ItemNotFoundError',
              reason: 'ItemNotFoundError - Item does not exist',
              id: 6,
              detail: 'Item could not be found by id',
            });
          });
      } finally {
        done();
      }
    });
  });
});
