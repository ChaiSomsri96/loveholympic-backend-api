export default {
  regex: {
    objectId: /^[0-9a-fA-F]{24}$/,
    phone: /^\+?1?(\d{10,12}$)/,
    email: /\S+@\S+\.\S+/,
    password: /^[a-f0-9]{32}$/,
  },

  apiURLSocial: {
    kakao: 'https://kapi.kakao.com/v2/user/me',
  },

  sortBy: {
    asc: 'asc',
    desc: 'desc',
  },

  errorResponse: {
    create: 'Create failed!',
    update: 'Update failed!',
    destroy: 'Delete failed!',
    show: 'Not Found!',
    existed: 'Title field already existed!',
    common: 'Name field or Email field already existed!',
    format: 'SVG format is not supported',
    notMatchingPassword: 'Password must match repeatPassword',
    limit: 'File size must be smaller 5MB',
    invalidFile: 'File format must be png or jpg or gif or jpeg!',
  },

  uploadMaxSize: 1024 * 1024 * 5,

  imageDimensions: {
    thumbnail: {
      width: 800,
      height: 800,
    },
    feature: {
      width: 1200,
    },
    avatar: {
      width: 200,
      height: 200,
    },
  },

  luffingTestType: {
    LOVE: 'love',
    INTELLECT: 'intellect',
    SPIRIT: 'spirit',
    RESPONSIBILITY: 'responsibility',
    INNOCENCE: 'innocence',
  },

  soulTestType: {
    TEMPARATURE_LOVE: 'temparatureLove',
    POINT_OF_LOVE: 'opinionOfLove',
    RELATIONSHIPS: 'relationships',
    DATING: 'dating',
    SHOW_AFFECTION: 'showAffection',
  },

  typeHolympic: {
    REAL_HOLYMPIC: 'realHolympic',
    SOUL_FRIEND: 'soulFriend',
    SOUL_TEST: 'soulTest',
    LOVE_SECRET: 'loveSecret',
  },

  APP_NAME: '러브 홀림픽',
};
