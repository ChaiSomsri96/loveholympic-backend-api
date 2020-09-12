import aws from 'aws-sdk'
import multer from 'multer'
import sharp from 'sharp'
import multerS3 from 'multer-s3-transform'
import path from 'path'
import crypto from 'crypto'
import config from '../configs'
import imageConfig from '../packages/image/config'
import stringUtil from './stringUtil'
import { getDate, getHour, getTime } from './datetime'

const { avatar, feature, origin, thumbnail } = imageConfig.imageTypes

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: process.env.AWS_REGION
})

const s3 = new aws.S3()
const { errorResponse, uploadMaxSize } = config
const { format: formatError, invalidFile } = errorResponse
const multerOptions = {
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET,
    acl: 'public-read',
    limits: {
      fileSize: uploadMaxSize,
      files: 5
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    shouldTransform: (req, file, cb) => {
      cb(null, /^image/i.test(file.mimetype))
    },
    transforms: [
      {
        id: origin,
        key: (req, file, cb) => {
          const encodeFileName = crypto.createHash('md5').update(file.originalname).digest('hex');
          const fileName = stringUtil.reverseString(encodeFileName + getTime())
          const compactName = crypto.createHash('md5').update(fileName).digest('hex');
          const fileNameToSave = `public/images/${getDate()}/${getHour()}/${compactName}_${origin}`
          cb(null, fileNameToSave)
        },
        transform: (req, file, cb) => {
          cb(null, sharp().withMetadata())
        }
      }, {
        id: thumbnail,
        key: (req, file, cb) => {
          const encodeFileName = crypto.createHash('md5').update(file.originalname).digest('hex');
          const fileName = stringUtil.reverseString(encodeFileName + getTime())
          const compactName = crypto.createHash('md5').update(fileName).digest('hex');
          const fileNameToSave = `public/images/${getDate()}/${getHour()}/${compactName}_800x800`
          cb(null, fileNameToSave)
        },
        transform: (req, file, cb) => {
          cb(
            null,
            sharp()
              .resize(config.imageDimensions.thumbnail)
              .withMetadata()
          )
        }
      },
      {
        id: feature,
        key: (req, file, cb) => {
          const encodeFileName = crypto.createHash('md5').update(file.originalname).digest('hex');
          const fileName = stringUtil.reverseString(encodeFileName + getTime())
          const compactName = crypto.createHash('md5').update(fileName).digest('hex');
          const fileNameToSave = `public/images/${getDate()}/${getHour()}/${compactName}_1200`
          cb(null, fileNameToSave)
        },
        transform: (req, file, cb) => {
          cb(
            null,
            sharp()
              .resize(config.imageDimensions.feature)
              .withMetadata()
          )
        }
      },
      {
        id: avatar,
        key: (req, file, cb) => {
          const encodeFileName = crypto.createHash('md5').update(file.originalname).digest('hex');
          const fileName = stringUtil.reverseString(encodeFileName + getTime())
          const compactName = crypto.createHash('md5').update(fileName).digest('hex');
          const fileNameToSave = `public/images/${getDate()}/${getHour()}/${compactName}_200x200`
          cb(null, fileNameToSave)
        },
        transform: (req, file, cb) => {
          cb(
            null,
            sharp()
              .resize(config.imageDimensions.avatar)
              .withMetadata()
          )
        }
      }
    ]
  })
};

function fileFilter(req, file, callback) {
  const ext = path.extname(file.originalname)
  if (ext.toLowerCase() === '.svg') {
    req.fileValidationError = formatError

    return callback(null, false, new Error(formatError))
  }
  if (!['.png', '.jpg', '.gif', '.jpeg'].includes(ext.toLowerCase())) {
    req.invalidFile = invalidFile

    return callback(null, false)
  }

  callback(null, true);
}


const upload = multer({ storage: multerOptions.storage, fileFilter, limits: { fileSize: uploadMaxSize } })

module.exports = upload
