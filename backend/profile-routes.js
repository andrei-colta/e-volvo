var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './pictures')
    },
    filename: function (req, file, cb) {
        const oldName = file.originalname;
        const extensionParse = oldName.split('.');
        const extension = extensionParse[extensionParse.length - 1];
        const oldNameNoExt = oldName.substring(0, oldName.length - extension.length - 1);
        const timeStamp = (new Date()).getTime();
        cb(null, oldNameNoExt + timeStamp + '.' + extension);
    }
});
var upload = multer({ storage: storage });

const path = require('path');
const fs = require('fs');

const models = require('./models');
const constants = require('./constants');

module.exports = function (app) {
    app.get('/profile/getOwnProfile', function (req, res) {
        const user_id = req.query.user_id;

        models.User.findOne({ _id: user_id }, (err, user) => {
            if (user) {
                return res.send({ status: constants.DATA_RETRIEVED, data: user });
            }

            res.send({ status: constants.NOT_FOUND });
        });
    });

    app.get('/profile/getProfile', function (req, res) {
        const user_id = req.query.profileId;
        const own_user_id = req.query.user_id;

        models.User.findOne({ _id: user_id }, (err, user) => {
            if (user) {
                if (user.visibility === constants.PUBLIC_VISIBILITY || user_id === own_user_id) {
                    models.Car.find({ user_id: user_id }, (err, cars) => {
                        if (!err) {
                            return res.send({ status: constants.DATA_RETRIEVED, data: user, cars: cars });
                        }
                        res.send({ status: constants.DATA_RETRIEVED, data: user });
                    });
                } else {
                    res.send({ status: constants.PRIVATE_PROFILE });
                }
            } else {
                res.send({ status: constants.NOT_FOUND, err: err });
            }

        });
    });

    app.post('/profile/changeEmail', function (req, res) {
        const user_id = req.query.user_id;
        const email = req.body.email;

        models.User.updateOne({ _id: user_id }, { email: email }, (err, result) => {
            if (!err) {
                return res.send({ status: constants.DATA_UPDATED });
            }

            res.send({ status: constants.DATA_NOT_UPDATED });
        });
    });

    app.post('/profile/updateProfileData', function (req, res) {
        const user_id = req.body.user_id;

        models.User.findOne({ _id: user_id }, (err, user) => {
            if (!user) {
                return res.send({ status: constants.NOT_FOUND });
            }

            req.body.password = user.password;
            req.body.visibility = user.visibility;

            models.User.replaceOne({ _id: user_id }, req.body, (err, response) => {
                if (!err) {
                    return res.send({ status: constants.DATA_UPDATED });
                }

                res.send({ status: constants.DATA_NOT_UPDATED });
            });
        });
    });

    app.post('/profile/changePassword', function (req, res) {
        const user_id = req.query.user_id;
        const newPassword = req.body.newPassword;

        models.User.updateOne({ _id: user_id }, { password: newPassword }, (err, response) => {
            if (!err) {
                res.send({ status: constants.PASSWORD_CHANGED });
            } else {
                res.send({ message: constants.PASSWORD_NOT_CHANGED });
            }
        });
    });

    app.post('/profile/uploadPicture', upload.single('picture'), (req, res) => {
        const user_id = req.query.user_id;
        const fileName = constants.GET_PICTURE_ENDPOINT + req.file.filename;

        models.User.updateOne({ _id: user_id }, { picture: fileName }, (err, response) => {
            if (!err) {
                return res.send({ message: constants.FILE_UPLOADED, name: fileName });
            }
            res.send({ message: constants.FILE_NOT_UPLOADED });
        });
    });

    app.get('/profile/getPicture', function (req, res) {
        const fileName = req.query.fileName;

        res.sendFile(path.join(__dirname, './pictures', fileName));
    });

    app.post('/profile/updateVisibility', function (req, res) {
        const user_id = req.query.user_id;
        const visibility = req.body.visibility;

        models.User.updateOne({ _id: user_id }, { visibility: visibility }, (err, response) => {
            if (!err) {
                return res.send({ status: constants.DATA_UPDATED });
            }
            res.send({ status: constants.DATA_NOT_UPDATED });
        });
    })

    app.get('/profile/getCities', function (req, res) {
        const countryCode = req.query.country;

        models.City.find({ 'country': countryCode }, (err, cities) => {
            if (!err) {
                return res.send({ status: constants.DATA_RETRIEVED, data: cities });
            }
            res.send({ status: constants.NOT_FOUND });
        });
    });

    app.get('/profile/getCountries', function (req, res) {
        models.Country.find((err, countries) => {
            if (!err) {
                return res.send({ status: constants.DATA_RETRIEVED, data: countries });
            }
            res.send({ status: constants.NOT_FOUND });
        });
    });

    app.get('/profile/getCars', function (req, res) {
        const user_id = req.query.user_id;

        models.Car.find({ user_id: user_id }, (err, cars) => {
            if (!err) {
                return res.send({ status: constants.DATA_RETRIEVED, data: cars });
            }
            res.send({ status: constants.NOT_FOUND });
        });
    });

    app.post('/profile/addCar', function (req, res) {
        const body = req.body;
        const user_id = req.query.user_id;
        body.user_id = user_id;

        if (body._id) {
            models.Car.replaceOne({ _id: body._id }, body, (err, response) => {
                if (!err) {
                    return res.send({ status: constants.DATA_UPDATED });
                }
                res.send({ status: constants.DATA_NOT_UPDATED });
            });
        } else {
            new models.Car(body).save((err, car) => {
                if (!err) {
                    return res.send({ status: constants.DATA_UPDATED, id: car._id });
                }
                res.send({ status: constants.DATA_NOT_INSERTED, err: err, body: body });
            });
        }
    });

    app.post('/profile/uploadCarPicture', upload.single('picture'), (req, res) => {
        const carId = req.query.carId;
        const fileName = constants.GET_PICTURE_ENDPOINT + req.file.filename;

        const carPic = new models.File({
            carId: carId,
            name: fileName
        });

        carPic.save((err, newCarPic) => {
            if (!err) {
                return res.send({ status: constants.FILE_UPLOADED, file: newCarPic });
            }
            res.send({ status: constants.FILE_NOT_UPLOADED });
        });
    });

    app.get('/profile/getCarPictures', (req, res) => {
        const carId = req.query.carId;

        models.File.find({ carId: carId }, (err, files) => {
            if (!err) {
                return res.send({ status: constants.DATA_RETRIEVED, data: files });
            }
            res.send({ status: constants.NOT_FOUND });
        });
    });

    app.delete('/profile/deleteCarPicture', (req, res) => {
        const fileId = req.query.fileId;
        const fileName = req.query.fileName;

        models.File.deleteOne({ _id: fileId }, (err) => {
            if (!err) {
                const fileNameParsed = fileName.split('?fileName=')[1];
                fs.unlink('./pictures/' + fileNameParsed);
                return res.send({ status: constants.DATA_UPDATED });
            }
            res.send({ status: constants.DATA_NOT_DELETED });
        });
    });
}
