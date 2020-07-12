/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
import faker from 'faker';
import { Seeder } from 'mongoose-data-seed';
import { NotificationSystem } from '../src/models';

class NotificationSystemSeeder extends Seeder {
  async shouldRun() {
    return NotificationSystem.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    const createData = [
      {
        name: faker.name.title(),
        title: '[이기홍 칼럼]약발 다한 文정권 필살기… 친문 재집권 방법은?',
        icon:
          'https://keno-techain-dev.s3.ap-southeast-1.amazonaws.com/public/images/2021-3-23/3/48978cef5d072d03ba6e220284f5f87a_1200',
        description:
          '2000년대 초 출근길 버스에서 항상 이어폰을 꽂고 EBS FM 라디오를 들었다. ‘모닝스페셜’이란 프로그램이었는데 팝송 영화 등 다양한 소재로 영어회화를 배울 수 있었다. 신도시에서 광화문까지 언제 왔는지 모를 정도로 재미있고 유익했다. 알고 보니 주변에 애청자가 수두룩한 인기 프로였다.',
      },
      {
        name: faker.name.title(),
        title: '文대통령, ‘마스크 내려달라’ 하자 “본인 확인하게?” 하하',
        icon:
          'https://keno-techain-dev.s3.ap-southeast-1.amazonaws.com/public/images/2021-3-23/3/48978cef5d072d03ba6e220284f5f87a_1200',
        description:
          '문 대통령은 투표소 관계자에게 신분증과 함께 가져온 종이를 건넸다. 직원은 “(신분증만 필요하고 종이는) 사전투표에 필요 없어요”라고 웃으며 말했다.',
      },
      {
        name: faker.name.title(),
        title: '드라마 ‘궁’ 블록버스터급 리메이크',
        icon:
          'https://keno-techain-dev.s3.ap-southeast-1.amazonaws.com/public/images/2021-3-23/3/48978cef5d072d03ba6e220284f5f87a_1200',
        description:
          '지난달 30일 만난 드라마 제작사 그룹에이트의 김영배 콘텐츠제작본부장(41)은 리메이크 이유에 대해 “좋은 이야기의 가치는 잊히지 않는다. 한 세대를 풍미한 만큼 다음 세대 배우들이 연기하는 궁을 궁금해하지 않을까 생각했다”고 말했다. 본격적으로 논의가 시작된 건 올해 초. 제작진은 리메이크 후보로 ‘꽃보다 남자’(2009년)와 궁 사이에서 고민했다. 김 본부장은 “궁 팬들이 소셜네트워크서비스(SNS)에서 끈질기게 리메이크 요청을 하는 등 궁의 브랜드파워가 큰 것이 결정의 이유였다”고 말했다.',
      },
    ];
    await NotificationSystem.insertMany(createData);
  }
}

export default NotificationSystemSeeder;
