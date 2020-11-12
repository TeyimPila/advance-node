const AWS = require('aws-sdk')
const uuid = require('uuid')
const keys = require('../config/keys')
const requireLogin = require('../middlewares/requireLogin')
AWS.config.update({region: 'eu-central-1'});

const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey
})

module.exports = app => {
    app.get('/api/upload', requireLogin, (req, res) => {

        const key = `${req.user.id}/${uuid.v1()}.jpeg`;

        s3.getSignedUrl('putObject', {
            Bucket: 'node-photo-upload',
            ContentType: 'image/jpeg',
            Key: key
        }, (err, url) => res.send({ key, url }))

    })
}
