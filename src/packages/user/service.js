/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
import i18n from 'i18n';
import fetch from 'node-fetch';
import { OAuth2Client } from 'google-auth-library';
import { User, Image, Area, Hobby, Personality, UserHeart } from '../../models';
import config from './config';
import { genUserTokenObject } from '../../utils/gen-token';
import { ObjectId } from '../../utils/mongoose';
// import { sendToAndroidDevice } from '../../services/firebase';
// import { notifyApp } from '../../services/fcmConstant';

const KAKAO_API = 'https://kapi.kakao.com/v2/user/me';
const NAVER_API = 'https://openapi.naver.com/v1/nid/me';
const GOOGLE_API = 'https://www.googleapis.com/oauth2/v2/userinfo';

const clientGoogle = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 *
 * @param {*} body
 * @returns
 */
const register = async (body) => {
  const { socialType, code } = body;

  if (code) {
    await verifyCode({ code });
  }

  const {
    socialType: { KAKAO, NAVER, GOOGLE, APPLE },
  } = config;

  switch (socialType) {
    case KAKAO:
      return _loginByKakaoTalk(body);
    case NAVER:
      return loginByNaver(body);
    case GOOGLE:
      return loginByGoogle(body);
    case APPLE:
      return loginByApple(body);
    default:
      break;
  }
};

/**
 *
 * @param {*} param0
 * @returns
 */
const _getDataKakaoTalk = async ({ accessToken }) => {
  const kakaoApiRes = await fetch(KAKAO_API, {
    method: 'post',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const kakaoData = await kakaoApiRes.json();

  if (kakaoData.code === -401) {
    throw new Error(JSON.stringify({
      message: i18n.__(kakaoData.msg),
    }));
  }

  return kakaoData;
};

/**
 *
 * @param {*} param0
 * @returns
 */
const _getDataNaver = async ({ accessToken }) => {
  const resNaverApi = await fetch(NAVER_API, {
    method: 'post',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const naverData = await resNaverApi.json();

  if (naverData.resultcode !== '00') {
    throw new Error(JSON.stringify({
      message: i18n.__(naverData.message),
    }));
  }

  return naverData;
};

/**
 *
 * @param {*} param0
 * @returns
 */
const _getDataGoogle = async ({ accessToken }) => {
  const googleResponse = await fetch(GOOGLE_API, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const googleResponseJson = await googleResponse.json();
  const { error } = googleResponseJson;

  if (error && error.code === 401) {
    throw new Error(JSON.stringify({
      message: error.message,
    }));
  }

  return googleResponseJson;
};

/**
 *
 * @param {*} param0
 * @returns
 */
const _loginByKakaoTalk = async ({
  accessToken,
  socialType,
  code,
  type,
  device,
  deviceToken,
}) => {
  const kakaoData = await _getDataKakaoTalk({ accessToken });
  const {
    id,
    kakao_account: {
      email,
      profile: { nickname },
    },
  } = kakaoData;

  let user = await User.findOne({
    deletedAt: { $eq: null },
    code,
  });

  const updateData = {
    kakaoId: id,
    email,
    socialType,
    nickname,
    code,
    type,
    isUseCode: true,
    device,
    deviceToken,
  };

  user = await createAndUpdateUser(user, updateData);
  const result = genUserTokenObject(user, '_id');
  return result;
};

/**
 *
 * @param {*} param0
 * @returns
 */
const loginByNaver = async ({
  accessToken,
  socialType,
  code,
  type,
  device,
  deviceToken,
}) => {
  const naverData = await _getDataNaver({ accessToken });
  // profile_image, age, gender, name, birthday
  const {
    response: { id, email, name },
  } = naverData;
  let user = await User.findOne({
    deletedAt: { $eq: null },
    code,
  });

  const updateData = {
    naverId: id,
    email,
    socialType,
    nickname: name,
    code,
    isUseCode: true,
    type,
    device,
    deviceToken,
  };

  user = await createAndUpdateUser(user, updateData);
  const result = genUserTokenObject(user, '_id');
  return result;
};

const loginByApple = async ({
  socialType,
  code,
  type,
  device,
  deviceToken,
  name: appleName,
  email: appleEmail,
  appleId,
}) => {
  let user = await User.findOne({
    deletedAt: { $eq: null },
    code,
  });

  const updateData = {
    appleId,
    email: appleEmail || null,
    socialType,
    nickname: appleName || null,
    code,
    isUseCode: true,
    type,
    device,
    deviceToken,
  };

  user = await createAndUpdateUser(user, updateData);
  const result = genUserTokenObject(user, '_id');
  return result;
};

/**
 *
 * @param {*} param0
 * @returns
 */
const loginByGoogle = async ({
  accessToken,
  socialType,
  code,
  type,
  device,
  deviceToken,
}) => {
  if (device === config.devideType.ANDROID) {
    return clientGoogle
      .verifyIdToken({
        idToken: accessToken,
        audience: [process.env.GOOGLE_CLIENT_ID],
      })
      .then(async (ticket, err) => {
        console.log({ err });
        const payload = ticket.getPayload();
        const { sub: id, email, name } = payload;
        let user = await User.findOne({
          code,
          deletedAt: { $eq: null },
        });

        const updateData = {
          googleId: id,
          email,
          socialType,
          nickname: name,
          code,
          type,
          isUseCode: true,
          device,
          deviceToken,
        };

        user = await createAndUpdateUser(user, updateData);
        const result = await genUserTokenObject(user, '_id');

        return result;
      });
  } else {
    const googleResponseJson = await _getDataGoogle({ accessToken });
    const { id, email, name } = googleResponseJson;
    let user = await User.findOne({
      code,
      deletedAt: { $eq: null },
    });

    const updateData = {
      googleId: id,
      email,
      socialType,
      nickname: name,
      code,
      type,
      isUseCode: true,
      device,
      deviceToken,
    };

    user = await createAndUpdateUser(user, updateData);
    const result = genUserTokenObject(user, '_id');
    return result;
  }
};

/**
 *
 * @param {*} param0
 * @returns
 */
const verifyCode = async ({ code }) => {
  const codeObj = await User.findOne({
    code,
    deletedAt: { $eq: null },
    $or: [{ isUseCode: false }, { isUseCode: { $exists: false } }],
  });

  if (!codeObj) {
    throw new Error(JSON.stringify({
      message: i18n.__('코드 번호가 잘못 되었습니다.'),
    }));
  }

  if (codeObj && codeObj.isUseCode) {
    throw new Error(JSON.stringify({
      message: i18n.__('코드 번호가 잘못 되었습니다.'),
    }));
  }

  return {
    message: i18n.__('code.valid'),
  };
};

/**
 *
 * @param {*} user
 * @param {*} createData
 * @param {*} updateData
 * @returns
 */
const createAndUpdateUser = async (user, updateData) => {
  if (user) {
    const u = await User.findOneAndUpdate({ _id: user.id }, updateData, {
      new: true,
    }).populate({
      path: 'avatars',
      ref: 'Image',
    });

    return u;
  }

  return null;
};

/**
 *
 * @param {*} param0
 * @returns
 */
const login = async ({
  accessToken,
  socialType,
  device,
  deviceToken,
  name: appleName,
  email: appleEmail,
  appleId,
}) => {
  let user = {};
  let updateData = {};

  if (socialType === config.socialType.KAKAO) {
    const kakaoData = await _getDataKakaoTalk({ accessToken });
    const {
      id,
      kakao_account: {
        email,
        profile: { nickname },
      },
    } = kakaoData;
    user = await User.findOne({
      kakaoId: id,
      socialType: config.socialType.KAKAO,
      deletedAt: { $eq: null },
    });

    if (!user) {
      throw new Error(JSON.stringify({
        message: i18n.__('user.notFound'),
        code: 1001,
      }));
    }

    updateData = {
      kakaoId: id,
      email,
      socialType,
      nickname,
      device,
      deviceToken,
    };
  } else if (socialType === config.socialType.GOOGLE) {
    if (device === config.devideType.ANDROID) {
      return clientGoogle
        .verifyIdToken({
          idToken: accessToken,
          audience: [process.env.GOOGLE_CLIENT_ID],
        })
        .then(async (ticket, err) => {
          console.log({ err });
          const payload = ticket.getPayload();
          const { sub: id, email, name } = payload;
          user = await User.findOne({
            googleId: id,
            socialType: config.socialType.GOOGLE,
            deletedAt: { $eq: null },
          });

          updateData = {
            googleId: id,
            email,
            socialType,
            nickname: name,
            device,
            deviceToken,
            isUseCode: true,
          };

          user = await createAndUpdateUser(user, updateData);
          const result = await genUserTokenObject(user, '_id');

          return result;
        });
    }
    const googleData = await _getDataGoogle({ accessToken });
    const { id, email, name } = googleData;

    user = await User.findOne({
      googleId: id,
      socialType: config.socialType.GOOGLE,
      deletedAt: { $eq: null },
    });

    if (!user) {
      throw new Error(JSON.stringify({
        message: i18n.__('user.notFound'),
        code: 1001,
      }));
    }

    updateData = {
      googleId: id,
      email,
      socialType,
      nickname: name,
      device,
      deviceToken,
    };
  } else if (socialType === config.socialType.NAVER) {
    const naverData = await _getDataNaver({ accessToken });
    const {
      response: { id, email, name },
    } = naverData;
    user = await User.findOne({
      naverId: id,
      socialType: config.socialType.NAVER,
      deletedAt: { $eq: null },
    });

    if (!user) {
      throw new Error(JSON.stringify({
        message: i18n.__('user.notFound'),
        code: 1001,
      }));
    }

    updateData = {
      naverId: id,
      email,
      socialType,
      nickname: name,
      device,
      deviceToken,
    };
  } else if (socialType === config.socialType.APPLE) {
    if (!appleId) {
      throw new Error(JSON.stringify({
        message: i18n.__('loginApple.Invalid'),
      }));
    }

    user = await User.findOne({
      appleId,
      socialType: config.socialType.APPLE,
      deletedAt: { $eq: null },
    });

    if (!user) {
      throw new Error(JSON.stringify({
        message: i18n.__('user.notFound'),
        code: 1001,
      }));
    }

    updateData = {
      appleId,
      email: appleEmail || null,
      socialType,
      nickname: appleName || null,
      device,
      deviceToken,
    };
  }

  if (user) {
    const u = await User.findOneAndUpdate({ _id: user.id }, updateData, {
      new: true,
    }).populate({
      path: 'avatars',
      ref: 'Image',
    });
    const result = genUserTokenObject(u, '_id');

    return result;
  }

  return null;
};

/**
 *
 * @param {*} req
 */
const getMe = async (req) => {
  const { _id } = req.user;
  const user = await User.findOne({
    _id,
  }).populate({
    path: 'avatars',
    ref: 'Image',
  }).lean();
  const { totalHeart } = user
  const stt = await User.count({ totalHeart: { $gt: totalHeart } });
  const ranking = stt + 1;

  return {
    ...user,
    ranking,
  };
};

/**
 *
 * @param {*} req
 * @returns
 */
const getUserDetail = async ({ id, userId }) => {
  const user = await User.findById(ObjectId(id))
    .populate({
      path: 'avatars',
      ref: 'Image',
    })
    .lean();
  const userHeart = await UserHeart.findOne({
    user: ObjectId(userId),
    userId: ObjectId(id),
  });

  let isUserHeart = null;
  if (userHeart) {
    isUserHeart = true;
  } else {
    isUserHeart = false;
  }

  return {
    ...user,
    isUserHeart,
  };
};

/**
 *
 * @param {*} body
 */
const updateProfile = async (data) => {
  const { avatars, description, userId } = data;
  const avatar = await Image.findById(avatars[0]);
  if (!avatar) {
    throw new Error(JSON.stringify({
      message: i18n.__('image.notFound'),
    }));
  }

  const user = await User.findOneAndUpdate(
    { _id: userId },
    {
      description,
      defaultAvatar: avatar.imageAvatarLink,
      step: config.step.UPDATE_PROFILE,
      avatars,
    },
    { new: true },
  ).populate({
    path: 'avatars',
    ref: 'Image',
  });

  return user;
};

/**
 *
 * @param {*} userId
 * @returns
 */
const _checkFinishLuffingTest = async (userId) => {
  const userObj = await User.findById(userId);
  const {
    lovePoint,
    intellectPoint,
    spiritPoint,
    responsibilityPoint,
    innocencePoint,
  } = userObj;

  return (
    !!lovePoint &&
    !!intellectPoint &&
    !!spiritPoint &&
    !!responsibilityPoint &&
    !!innocencePoint
  );
};

/**
 *
 * @param {*} areaID
 * @param {*} hobbyID
 * @param {*} personalitiesID
 */
const _checkAgeAreaHobbyPersonality = async (
  areaID,
  listHobbyID,
  listPersonalityID,
) => {
  const areaObj = await Area.findById(ObjectId(areaID));
  if (!areaObj) {
    throw new Error(JSON.stringify({
      message: i18n.__('area.notFound'),
    }));
  }

  const listHobby = listHobbyID.split(',');
  for (let i = 0; i < listHobby.length; i++) {
    const hobbyID = listHobby[i];
    const hobbyObj = await Hobby.findById(ObjectId(hobbyID));
    if (!hobbyObj) {
      throw new Error(JSON.stringify({
        message: i18n.__('hobby.notFound'),
      }));
    }
  }

  const listPersionality = listPersonalityID.split(',');
  for (let i = 0; i < listPersionality.length; i++) {
    const personalityID = listPersionality[i];
    const personalityObj = await Personality.findById(ObjectId(personalityID));
    if (!personalityObj) {
      throw new Error(JSON.stringify({
        message: i18n.__('personality.notFound'),
      }));
    }
  }

  return null;
};

/**
 *
 * @param {*} data
 * @returns
 */
const settingLineProfile = async (data) => {
  const { userId, age, area, hobbies, personalities } = data;

  if (age < 18) {
    throw new Error(JSON.stringify({
      message: i18n.__('user.ageMustBeMoreEqual18'),
    }));
  }

  await _checkAgeAreaHobbyPersonality(area, hobbies, personalities);

  const isCheckLuffingTest = await _checkFinishLuffingTest(ObjectId(userId));
  const user = await User.findOneAndUpdate(
    { _id: ObjectId(data.userId) },
    {
      ...data,
      step: config.step.SETTING_LINE,
      isRegisterProfile: isCheckLuffingTest,
    },
    { new: true },
  ).populate({
    path: 'avatars',
    ref: 'Image',
  });

  return user;
};

/**
 *
 * @param {*} body
 * @returns
 */
const loginByEmail = async (body) => {
  const { email } = body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error(JSON.stringify({
      message: i18n.__('user.notFound'),
    }));
  }

  const result = await genUserTokenObject(user, '_id');
  const { token, user: userObj } = result;

  await User.findOneAndUpdate(
    { _id: userObj._id },
    { accessToken: token },
    { new: true },
  );

  return result;
};

/**
 *
 * @param {*} param0
 * @returns
 */
const updatePhone = async ({ phoneNumber, userId }) => {
  const userPhone = await User.findOne({ phone: phoneNumber });
  if (userPhone) {
    throw new Error(JSON.stringify({
      message: i18n.__('user.PhoneExistSystem'),
    }));
  }

  const user = await User.findOneAndUpdate(
    {
      _id: ObjectId(userId),
    },
    { phone: phoneNumber },
    { new: true },
  ).populate({
    path: 'avatars',
    ref: 'Image',
  });

  return user;
};

/**
 *
 * @param {*} param0
 * @returns
 */
const likeAndUnlike = async (body) => {
  const { userId, like, userLogin } = body;
  let user = null;

  if (like) {
    user = await User.findOneAndUpdate(
      {
        _id: ObjectId(userId),
      },
      {
        $inc: { totalHeart: 1 },
      },
      { new: true },
    ).populate({
      path: 'avatars',
      ref: 'Image',
    }).lean();
  } else {
    user = await User.findOneAndUpdate(
      {
        _id: ObjectId(userId),
      },
      {
        $inc: { totalHeart: -1 },
      },
      { new: true },
    ).populate({
      path: 'avatars',
      ref: 'Image',
    }).lean();
  }

  const userHeart = await UserHeart.findOne({
    user: ObjectId(userLogin),
    userId: ObjectId(userId),
  });

  let isUserHeart = null;
  if (userHeart) {
    await UserHeart.remove({ _id: userHeart._id });
    isUserHeart = false;
  } else {
    await UserHeart.create({
      user: ObjectId(userLogin),
      userId: ObjectId(userId),
    });
    isUserHeart = true;
  }

  return { ...user, isUserHeart };
};

const updateOne = async (userId, data) => {
  return User.findOneAndUpdate({ _id: new ObjectId(userId) }, data, { new: true })
}

export default {
  register,
  verifyCode,
  login,
  getMe,
  updateProfile,
  settingLineProfile,
  getUserDetail,
  loginByEmail,
  updatePhone,
  _checkFinishLuffingTest,
  _checkAgeAreaHobbyPersonality,
  likeAndUnlike,
  updateOne
};
