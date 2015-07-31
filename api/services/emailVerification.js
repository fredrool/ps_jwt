var _ = require('underscore');
var fs = require('fs');
var jwt = require('jwt-simple');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('./config.js');
var User = require('../models/User.js');

var model = {
    verifyUrl: 'http://localhost:3000/auth/verifyEmail?token=',
    title: 'psJwt',
    subTitle: 'Thank you for signing up',
    body: 'Please verify your email address by clicking the button bellow'
}

exports.send = function(email) {
    var payload = {
        sub: email
    }
    
    var token = jwt.encode(payload, config.EMAIL_SECRET);
    
    var transporter = nodemailer.createTransport(smtpTransport({
        host: config.SMTP_HOST,
        secure: true,
        auth: {
            user: config.SMTP_USER,
            pass: config.SMTP_PASSWORD
        }
    }));
    
    var mailOptions = {
        from: 'Accounts <' + config.SMTP_ACCOUNTS + '>',
        to: email,
        subject: 'psJwt Account verification',
        html: getHtml(token)
    };
    
    transporter.sendMail(mailOptions, function(err, info) {
        if(err) return res.status(500, err); // TODO no res here
        
        console.log('email sent', info.response);
    });
    
};

exports.handler = function(req, res) {
    var token = req.query.token;
    
    var payload = jwt.decode(token, config.EMAIL_SECRET);
    
    var email = payload.sub;
    
    if(!email) return handleError(res);
    
    User.findOne({
        email: email
    }, function(err, foundUser) {
        if(err) return res.status(500);
        
        if(!foundUser) return handleError(res);
        
        if(!user.active)
            user.active = true;
        
        user.save(function(err) {
            if(err) return res.status(500);
            
            return res.redirect(config.APP_URL);
        });
        
    });
};

function getHtml(token) {
    var path = './views/emailVerification.html';
    var html = fs.readFileSync(path, encoding = 'utf8');
    
    var template = _.template(html);
    
    model.verifyUrl + token;
    
    return template(model);
}

function handleError(res) {
    return res.status(401).send({
        message: 'Authentication failed, unable to verify email'
    });
};

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};