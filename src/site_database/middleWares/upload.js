const multer = require('multer')
const moment = require('moment')



const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'src/site_database/imageBooks/')
    },
    filename(req, file, cb) {
        const data = moment().format('DDMMYYYY-HHmmss_SSS')
        cb(null, `${data}-${file.originalname}`)
    }
})


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true)

    } else {
        cb(null, false)
    }
}


module.exports = multer({ storage, fileFilter })