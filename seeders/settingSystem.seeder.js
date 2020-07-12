/* eslint-disable no-return-await */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
import { Seeder } from 'mongoose-data-seed';
import { Personality, Hobby, Area, SettingSystem } from '../src/models';
import configUser from '../src/packages/user/config';

const personalitiesData = [
  '리더십', '활동적', '사교적', '외향적', '꼼꼼함', '인싸력',
  '조용함', '차분함', '소심함', '야무짐', '대담함', '열정적',
  '세심함', '해맑음', '센스갑', '엉뚱함', '철저함', '장난기',
  '용감함', '수줍음', '즉흥적', '계획적', '직관적', '내향적',
  '긍정적', '이성적', '독창적', '낙천적', '모범적', '개성파'
];

const areaData = [
  '서울',
  '경기',
  '인천',
  '강원',
  '충북',
  '충남',
  '세종',
  '대전',
  '전북',
  '전남',
  '광주',
  '경북',
  '경남',
  '대구',
  '울산',
  '부산',
  '제주'
];

const hobbiesMale = [
  '옷잘남', '근육남', '왜소남', '슬랜더', '키큰남',
  '키작남', '매너남',
  '다정함', '시크남', '박력남', '차도남', '뇌섹남', '위트남',
  '귀여움', '따도남', '청순남', '순수남', '똑똑함',
  '도도남', '무쌍남', '쌍수남', '문학남', '토끼상', '가련남', '감성남',
  '볼매남', '두부남', '냉미남', '온미남', '멍뭉미', '토끼상',
  '여우상', '백치미', '남사친', '문신남'
];

const hobbiesFeMale = [
  '옷잘녀',
  '똑똑함',
  '근육녀',
  '왜소녀',
  '슬랜더',
  '키큰녀',
  '키작녀',
  '아담녀',
  '가련녀',
  '매너녀',
  '다정함',
  '시크녀',
  '글래머',
  '박력녀',
  '차도녀',
  '뇌섹녀',
  '위트녀',
  '귀여움',
  '따도녀',
  '청순녀',
  '순수녀',
  '똑똑함',
  '도도녀',
  '무쌍녀',
  '쌍수녀',
  '문학녀',
  '감성녀',
  '볼매녀',
  '두부녀',
  '냉미녀',
  '온미녀',
  '멍뭉미',
  '토끼상',
  '여우상',
  '백치미',
  '여사친',
  '단발녀',
  '숏컷녀',
  '문신녀',
];

const listPersonalities = [];
const listHobbiesMale = [];
const listHobbiesFeMale = [];
const listArea = [];

for (let i = 0; i < personalitiesData.length; i++) {
  listPersonalities.push({
    name: `${personalitiesData[i]}`,
  });
}

for (let j = 0; j < hobbiesMale.length; j++) {
  listHobbiesMale.push({
    gender: configUser.sex.MALE,
    name: `${hobbiesMale[j]}`,
  });
}

for (let x = 0; x < hobbiesFeMale.length; x++) {
  listHobbiesFeMale.push({
    gender: configUser.sex.FEMALE,
    name: `${hobbiesFeMale[x]}`,
  });
}

for (let z = 0; z < areaData.length; z++) {
  listArea.push({
    name: `${areaData[z]}`,
  });
}

class SettingSystemSeeder extends Seeder {
  async shouldRun() {
    await Personality.remove({});
    await Area.remove({});
    await Hobby.remove({});
    await SettingSystem.remove({});

    return true;
  }

  async run() {
    return await Promise.all([
      Personality.create(listPersonalities),
      Area.create(listArea),
      Hobby.create(listHobbiesMale),
      Hobby.create(listHobbiesFeMale),
      SettingSystem.create({
        setting: {
          iconNotificationSystem: '',
          youtubeHistoryURL: '',
          notificationSystemId: '',
          loholGoodsURL: '',
          isPlayGoldenTicket: false,
        },
        isOpenCloseLoveHolympic: true,
        timeFrom: new Date(),
        timeTo: new Date(),
        goldenTicket: {
          timeFrom: '',
          timeTo: '',
          imageGlobal: '',
        },
      }),
    ]);
  }
}

export default SettingSystemSeeder;
