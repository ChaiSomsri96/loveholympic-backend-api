import _ from 'lodash';
import { mongoose, Schema } from '../../utils/mongoose';
import config from './config';

const UserSchema = new Schema(
  {
    nickname: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    code: String,
    phone: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      enum: _.values(config.type),
    },
    kakaoId: String,
    naverId: String,
    googleId: String,
    appleId: String,
    socialType: {
      type: String,
      enum: _.values(config.socialType),
    },
    defaultAvatar: {
      type: String,
      default: null,
    },
    avatars: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
      },
    ],
    description: String,
    gender: {
      type: String,
      enum: _.values(config.sex),
    },
    age: {
      type: Number,
      default: null,
    },
    area: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Area',
      default: null,
    },
    hobbies: {
      type: String,
      default: null,
    },
    personalities: {
      type: String,
      default: null,
    },
    lovePoint: {
      type: Number,
      default: null,
    },
    intellectPoint: {
      type: Number,
      default: null,
    },
    spiritPoint: {
      type: Number,
      default: null,
    },
    responsibilityPoint: {
      type: Number,
      default: null,
    },
    innocencePoint: {
      type: Number,
      default: null,
    },
    step: {
      type: String,
      enum: _.values(config.step),
    },
    totalHeart: {
      type: Number,
      default: 0,
    },
    ranking: {
      type: Number,
      default: 0,
    },
    device: {
      type: String,
      enum: _.values(config.devideType),
    },
    deviceToken: {
      type: String,
      default: null,
    },
    userCouple: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    isGoldenTicket: {
      type: Boolean,
      default: false,
    },
    isFinishSoulTest: {
      type: Boolean,
      default: false,
    },
    isRegisterProfile: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isUseCode: {
      type: Boolean,
      default: false,
    },
    isSendSMS: {
      type: Boolean,
      default: false,
    },
    isSendSmsSuccess: {
      type: Boolean,
      default: false,
    },
    codeTesting: {
      type: Boolean,
      default: false,
    },
    userID: {
      type: String,
      default: null,
    },
    accessToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export default mongoose.model('User', UserSchema);
