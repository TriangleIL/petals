const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { mockRes } = require('sinon-express-mock');
const { authentication } = require('middleware');

const { expect } = chai;
chai.use(sinonChai);

describe('Middleware', async () => {
  const requestWithValidToken = {
    token: 'validAccessToken',
  };

  const requestWithInvalidToken = {
    token: 'invalidToken',
  };

  const emptyNext = function emptyNext() {};

  context('Authentication', async () => {
    it('should call next() once for a valid token', async () => {
      const nextSpy = sinon.spy();

      authentication(requestWithValidToken, {}, nextSpy);

      expect(nextSpy.calledOnce).to.be.true;
    });

    it('should change response status to 403 for invalid token', async () => {
      const res = mockRes();

      authentication(requestWithInvalidToken, res, emptyNext);

      expect(res.status).to.be.calledWith(403);
      expect(res.json).to.be.calledWith({
        error: 'This user is not authorized for this functionality',
      });
    });

    it('should change response status to 401 for a missing token', async () => {
      const res = mockRes();

      authentication({}, res, emptyNext);

      expect(res.status).to.be.calledWith(401);
      expect(res.json).to.be.calledWith({
        error: 'Authentication Token Required',
      });
    });
  });
});
