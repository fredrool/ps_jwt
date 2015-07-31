var jwt = require('jwt-simple');
var moment = require('moment');

var secret = 'sshhhh....';

module.exports = function createSendToken(user, res) {
    var payload = {
//        iss: req.hostname, // Issuer
        sub: user.id,  // Subject
        exp: moment().add(10, 'days').unix() // Expiry
    }
    
    var token = jwt.encode(payload, secret);
    
    res.status(200).send({
        user: user.toJSON(),
        token: token
    });
}