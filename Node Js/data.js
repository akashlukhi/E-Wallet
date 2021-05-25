var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
var express = require('express');
const cors = require('cors');
var app = express();
app.set('port', 3000);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var server = http.createServer(app);
var multer = require('multer')
var mongoose = require("mongoose");

mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/Safe-Pay");

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', mongoConnected);

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'SafePay40@gmail.com',
        pass: 'Safepay@123'
    }
});

var history = {
    Name: String,
    Description: String,
    From_To: String,
    Debited: Number,
    Credited: Number,
}

function mongoConnected() {
    var userSchema = new mongoose.Schema({
        Username: String,
        Email: String,
        Password: String,
        Phone_no: String,
        Bank_name: String,
        Branch_name: String,
        Ifsc_code: String,
        Acc_no: Number,
        Birthday: String,
        Wallet_balance: Number,
        Image_url: String
    }, { collection: 'users' });

    var bankSchema = new mongoose.Schema({
        Bank_name: String,
        Branch_name: String,
        Ifsc_code: String,
        Acc_no: Number,
        Bank_balance: Number
    }, { collection: 'banks' });

    var transactionSchema = new mongoose.Schema({
        Acc_no: Number,
        History: [history]
    }, { collection: 'transactions' });

    var user = mongoose.model("user", userSchema)
    var bank = mongoose.model("bank", bankSchema)
    var transaction = mongoose.model("transaction", transactionSchema)
    //bank data
    app.get("/banks", (req, res) => {
        bank.find(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                console.log("All bankdata returned");
                res.status(200);
                res.send(data);
            }
        });
    });


    //get all users
    app.get("/users", (req, res) => {
        user.find(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                console.log("All userdata returned");
                res.status(200);
                res.send(data);
            }
        });
    });

    //signup user
    app.post("/myform", (req, res) => {
        user.findOne({ Acc_no: req.body.Acc_no }, function (err, example) {
            if (err) console.log(err);
            if (example) {
                console.log("This data has already been saved");
            } else {
                var newUser = new user(req.body);
                newUser.save(function (err) {
                    if (err) {
                        res.status(400);
                        res.send({ "msg": "Unable to insert a new user" });
                    }
                    else {
                        console.log("user added!");
                    }
                });
            }
        });
    });

    //get account by one
    app.get("/users/:acc", (req, res) => {
        user.find({ Acc_no: parseInt(req.params.acc) }, function (err, user) {
            if (err) {
                console.log("Unable to find an Account");
                res.status(400);
                res.send(err);
            }
            else {
                if (Array.isArray(user)) {
                    if (user.length == 0) {
                        console.log("Unable to find an Account")
                        res.send({ "msg": "Unable to find an Account" })
                    }
                    else {
                        console.log("Account record returned");
                        res.send(user);
                    }
                }
            }
        });
    });

    //by contact
    app.get("/usersviaphone/:contact", (req, res) => {
        user.find({ Phone_no: parseInt(req.params.contact) }, function (err, user) {
            if (err) {
                console.log("Unable to find an Account");
                res.status(400);
                res.send(err);
            }
            else {
                if (Array.isArray(user)) {
                    if (user.length == 0) {
                        console.log("Unable to find an Account")
                        res.send({ "msg": "Unable to find an Account" })
                    }
                    else {
                        console.log("Account record returned");
                        res.send(user);
                    }
                }
            }
        });
    });

    //get account by one
    app.get("/banks/:acc", (req, res) => {
        bank.find({ Acc_no: parseInt(req.params.acc) }, function (err, user) {
            if (err) {
                console.log("Unable to find an Account");
                res.status(400);
                res.send(err);
            }
            else {
                if (Array.isArray(user)) {
                    if (user.length == 0) {
                        console.log("Unable to find an Account")
                        res.send({ "msg": "Unable to find an Account" })
                    }
                    else {
                        console.log("Account record returned");
                        res.send(user);
                    }
                }
            }
        });
    });

    //update user's details
    app.put("/updateuser", (req, res) => {
        user.findOneAndUpdate(
            { Acc_no: req.body.Acc_no },
            req.body,
            { new: true },
            function (err, data) {
                if (err) {
                    res.status(400);
                    res.send(err);
                }
                else {
                    res.status = 200;
                    res.send({ "msg": "User record updated!" });
                }
            }
        );
    });

    //update bank's details
    app.put("/updatebank", (req, res) => {
        bank.findOneAndUpdate(
            { Acc_no: req.body.Acc_no },
            req.body,
            { new: true },
            function (err, data) {
                if (err) {
                    res.status(400);
                    res.send(err);
                }
                else {
                    res.status = 200;
                    res.send({ "msg": "bank record updated!" });
                }
            }
        );
    });


    app.post("/history", (req, res) => {
        transaction.findOne({ Acc_no: req.body.Acc_no }, function (err, example) {
            if (err) console.log(err);
            if (example) {
                console.log("This data has already been saved");
            } else {
                var newUser = new transaction(req.body);
                newUser.save(function (err) {
                    if (err) {
                        res.status(400);
                        res.send({ "msg": "Unable to insert a new History" });
                    }
                    else {
                        console.log("History added!");
                    }
                });
            }
        });
    });

    app.put("/updatehistory", (req, res) => {
        transaction.findOneAndUpdate(
            { Acc_no: req.body.Acc_no },
            req.body,
            { new: true },
            function (err, data) {
                if (err) {
                    res.status(400);
                    res.send(err);
                }
                else {
                    res.status = 200;
                    res.send({ "msg": "History record updated!" });
                }
            }
        );
    });

    //get account by one
    app.get("/history/:acc", (req, res) => {
        transaction.find({ Acc_no: parseInt(req.params.acc) }, function (err, user) {
            if (err) {
                console.log("Unable to find an Account");
                res.status(400);
                res.send(err);
            }
            else {
                if (Array.isArray(user)) {
                    if (user.length == 0) {
                        console.log("Unable to find an Account")
                        res.send({ "msg": "Unable to find an Account" })
                    }
                    else {
                        console.log("Account record returned");
                        res.send(user);
                    }
                }
            }
        });
    });

    app.get("/issue/:name/:sub/:msg/:eml", (req, res) => {

        var mailOptions = {
            from: 'SafePay40@gmail.com',
            to: 'SafePay40@gmail.com',
            subject: req.params.sub,
            text: "From: " + req.params.eml + "\n\n" + req.params.msg + "\n\nBy Mr." + req.params.name
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("eror" + error);
            } else {
                res.send("EMAIL SENT");
                console.log('Email sent: ' + info.response);
            }
        });
    });

    var storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, '../E-Wallet/src/assets/profiles/');
        },
        filename: (req, file, cb) => {
            var filetype = '';
            if (file.mimetype === 'image/gif') {
                filetype = 'gif';
            }
            if (file.mimetype === 'image/png') {
                filetype = 'png';
            }
            if (file.mimetype === 'image/jpeg') {
                filetype = 'jpg';
            }
            cb(null, 'image-' + Date.now() + '.' + filetype);
        }
    });

    var upload = multer({ storage: storage });
    
    //update profile pic.
    app.put('/updateprofile', upload.single('file'), function (req, res, next) {
        if (!req.file) {
            return res.status(500).send({ message: 'Upload fail' });
        }
        else {
            req.body.Image_url = 'assets/profiles/' + req.file.filename;
            user.findOneAndUpdate(
                { Acc_no: req.body.Acc_no },
                req.body,
                { new: true },
                function (err, data) {
                    if (err) {
                        res.status(400);
                        res.send(err);
                    }
                    else {
                        res.status = 200;
                        res.send({ "msg": "uploades!" });
                    }
                }
            );
        }
    });



}

server.listen(3000, () => {
    console.log("Listineng on port 3000")
});