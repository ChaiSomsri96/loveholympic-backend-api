/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable class-methods-use-this */
import { Seeder } from 'mongoose-data-seed';
import { QuestionCategory, Question, Answer } from '../src/models';
import config from '../src/configs';
import configQuestionCate from '../src/packages/questionCategory/config';

const questionCategoryData = [
  {
    title: '사랑의 온도',
    color: '#FF5766',
    order: 1,
    type: config.soulTestType.TEMPARATURE_LOVE,
    category: configQuestionCate.category.SOUL_TEST,
    questions: [
      {
        title:
          '<span style="color: #FF5766">누가 더</span> 많이 좋아하고 있나요?',
        answers: [
          {
            title: '내가 더 좋아하고 있다.',
            point: 7,
          },
          {
            title: '상대가 나를 더 좋아한다.',
            point: 4,
          },
          {
            title: '우리는 동시에 좋아하고 있다.',
            point: 10,
          },
          {
            title: '계속 오르락내리락 한다.',
            point: 3,
          },
          {
            title: '잘 모르겠다.',
            point: 2,
          },
        ],
      },
      {
        title:
          '현재 상대에게 <span style="color: #FF5766">믿음</span>이 있나요?',
        answers: [
          {
            title: '믿음이 크다.',
            point: 8,
          },
          {
            title: '믿음이 천천히 생기는 중이다.',
            point: 6,
          },
          {
            title: '믿음이 아예 없다.',
            point: 1,
          },
          {
            title: '믿을 만하면 자주 깨진다.',
            point: 3,
          },
          {
            title: '만난 지 얼마 되지 않아서 모르겠다.',
            point: 2,
          },
        ],
      },
      {
        title: '상대는 <span style="color: #FF5766">어떤 매력</span>이 있나요?',
        answers: [
          {
            title: '마냥 귀엽다',
            point: 7,
          },
          {
            title: '비주얼이 아주 훌륭하다.',
            point: 5,
          },
          {
            title: '나한테 잘 해주는 게 매력이다.',
            point: 4,
          },
          {
            title: '집안이 아주 잘 산다.',
            point: 3,
          },
          {
            title: '매력을 찾는 중이다.',
            point: 2,
          },
        ],
      },
    ],
  },
  {
    title: '연애 가치관',
    color: '#127CCC',
    order: 2,
    type: config.soulTestType.POINT_OF_LOVE,
    category: configQuestionCate.category.SOUL_TEST,
    questions: [
      {
        title:
          '남녀 사이에 <span style="color: #127CCC">친구</span>가 가능할까요?',
        answers: [
          {
            title: '나는 가능하다고 본다.',
            point: 4,
          },
          {
            title: '우리는 친구에서 발전된 연인이다.',
            point: 4,
          },
          {
            title: '절대적으로 불가능하다.',
            point: 5,
          },
          {
            title: '정확히는 아니지만 반반이다.',
            point: 3,
          },
          {
            title: '잘 모르겠다.',
            point: 2,
          },
        ],
      },
      {
        title:
          '애인과의 <span style="color: #127CCC">동거</span>에 대해<br />어떤 생각을 가지고 있나요?',
        answers: [
          {
            title: '반드시 해봐야 한다고 생각한다.',
            point: 6,
          },
          {
            title: '더 만나본 이후에 할 생각이다.',
            point: 5,
          },
          {
            title: '결혼식 날짜를 잡고 나서는 가능하다.',
            point: 4,
          },
          {
            title: '동거는 좋지 않다고 생각한다.',
            point: 3,
          },
          {
            title: '동거에 대해 별로 관심 없다.',
            point: 2,
          },
        ],
      },
      {
        title:
          '<span style="color: #127CCC">당신이 추구하는 삶</span>은<br />어떤 삶인가요?',
        answers: [
          {
            title: '물질적으로 여유로운 삶',
            point: 5,
          },
          {
            title: '항상 성실히 내일에 만족하는 삶',
            point: 5,
          },
          {
            title: '부족해도 남들과 나누며 사는 삶',
            point: 4,
          },
          {
            title: '자연과 어우러진 평화로운 삶',
            point: 3,
          },
          {
            title: '현재 아무런 생각이 없다. ',
            point: 2,
          },
        ],
      },
    ],
  },
  {
    title: '관계 유형',
    color: '#2FB24B',
    order: 3,
    type: config.soulTestType.RELATIONSHIPS,
    category: configQuestionCate.category.SOUL_TEST,
    questions: [
      {
        title:
          '당신의 <span style="color: #2FB24B">연애 스타일</span>은 어떤가요?',
        answers: [
          {
            title: '낮져밤져',
            point: 1,
          },
          {
            title: '낮져밤이',
            point: 6,
          },
          {
            title: '낮이밤져',
            point: 3,
          },
          {
            title: '낮이밤이',
            point: 4,
          },
          {
            title: '잘 모르겠다.',
            point: 2,
          },
        ],
      },
      {
        title:
          '<span style="color: #2FB24B">누가 더</span> 많이 좋아하고 있나요?',
        answers: [
          {
            title: '왜 연락 안 받아?',
            point: 3,
          },
          {
            title: '지금 어디야?',
            point: 2,
          },
          {
            title: '나 집 앞이야. 얼른 나와',
            point: 2,
          },
          {
            title: '이런 옷 입지 마!',
            point: 3,
          },
          {
            title: '그 친구 만나지 마!',
            point: 3,
          },
        ],
      },
      {
        title:
          '현재 애인의 <span style="color: #2FB24B">성격</span>은 어떤가요?',
        answers: [
          {
            title: '애교가 많다.',
            point: 7,
          },
          {
            title: '다정다감하다.',
            point: 8,
          },
          {
            title: '강인하다.',
            point: 5,
          },
          {
            title: '예민하다.',
            point: 4,
          },
          {
            title: '무심하다.',
            point: 1,
          },
        ],
      },
    ],
  },
  {
    title: '데이트 관점',
    color: '#FFC406',
    order: 4,
    type: config.soulTestType.DATING,
    category: configQuestionCate.category.SOUL_TEST,
    questions: [
      {
        title:
          '데이트할 때 가장<br /><span style="color: #FFC406">신경 쓰는 것</span>은 무엇인가요?',
        answers: [
          {
            title: '데이트 코스',
            point: 3,
          },
          {
            title: '나의 스타일',
            point: 6,
          },
          {
            title: '상대의 기분',
            point: 7,
          },
          {
            title: '데이트 비용',
            point: 2,
          },
          {
            title: '전혀 신경 쓰지 않는다.',
            point: 3,
          },
        ],
      },
      {
        title:
          '현재 <span style="color: #FFC406">데이트 횟수</span>는<br />어느 정도인가요?',
        answers: [
          {
            title: '엄청 자주 보는 편이다.',
            point: 6,
          },
          {
            title: '주마다 한 번씩 만난다.',
            point: 6,
          },
          {
            title: '그때 그때마다 협의해서 본다.',
            point: 4,
          },
          {
            title: '잘 못 만나고 있어서 아쉽다.',
            point: 3,
          },
          {
            title: '잘 만나지 않는다.',
            point: 1,
          },
        ],
      },
      {
        title:
          '우리가 가장 선호하는<br /><span style="color: #FFC406">데이트 코스</span>는 무엇인가요?',
        answers: [
          {
            title: '집에서 편하게 보내는 데이트',
            point: 4,
          },
          {
            title: '영화, 콘서트 문화생활 즐기기',
            point: 6,
          },
          {
            title: '계획 잡고 호캉스, 여행 가기',
            point: 7,
          },
          {
            title: 'SNS 검색 맛집 탐방 데이트',
            point: 4,
          },
          {
            title: '가까운 공원 산책 가기',
            point: 2,
          },
        ],
      },
    ],
  },
  {
    title: '애정표현',
    color: '#514F4F',
    order: 5,
    type: config.soulTestType.SHOW_AFFECTION,
    category: configQuestionCate.category.SOUL_TEST,
    questions: [
      {
        title:
          '<span style="color: #1A1A1A">스킨십은</span> <span style="color: #514F4F">누가</span> <span style="color: #1A1A1A">더 적극적인가요?</span>',
        answers: [
          {
            title: '내가 더 적극적이다.',
            point: 8,
          },
          {
            title: '나보다 상대가 적극적이다.',
            point: 4,
          },
          {
            title: '서로 비슷하다.',
            point: 9,
          },
          {
            title: '서로 눈치 보면서 가끔씩 한다.',
            point: 2,
          },
          {
            title: '서로 잘 하지 않는다.',
            point: 1,
          },
        ],
      },
      {
        title:
          '<span style="color: #1A1A1A">상대에게 고마움을</span><br /><span style="color: #514F4F">어떻게 표현</span><span style="color: #1A1A1A">하나요?</span>',
        answers: [
          {
            title: '즉시 말로 표현한다.',
            point: 7,
          },
          {
            title: '담아 두었다가 편지로 전한다.',
            point: 4,
          },
          {
            title: '가끔씩 선물로 기분을 업 시킨다.',
            point: 3,
          },
          {
            title: '마음으로만 생각한다.',
            point: 2,
          },
          {
            title: '어떻게 해야 할지 잘 모르겠다.',
            point: 1,
          },
        ],
      },
      {
        title:
          '<span style="color: #1A1A1A">상대방이 가장</span> <span style="color: #514F4F">섹시하다고</span><br /><span style="color: #514F4F">느끼는 순간</span><span style="color: #1A1A1A">은 언제인가요?</span>',
        answers: [
          {
            title: '곁에서 좋은 향기가 날 때',
            point: 6,
          },
          {
            title: '열정적으로 일하는 모습을 보았을 때',
            point: 7,
          },
          {
            title: '나를 거칠 게 다뤄 줬을 때',
            point: 4,
          },
          {
            title: '몸매가 드러나는 옷을 입었을 때',
            point: 3,
          },
          {
            title: '섹시함을 느껴본 적이 없다.',
            point: 1,
          },
        ],
      },
    ],
  },
];

class SoulTestSeeder extends Seeder {
  async shouldRun() {
    // await Answer.remove({});
    // await Question.remove({});
    // await QuestionCategory.remove({});
    return true;
  }

  async run() {
    let listQuestionId = [];

    for (let i = 0; i < questionCategoryData.length; i++) {
      const iCategory = questionCategoryData[i];
      const questionCate = await QuestionCategory.create({
        title: iCategory.title,
        color: iCategory.color,
        order: iCategory.order,
        type: iCategory.type,
        category: configQuestionCate.category.SOUL_TEST,
      });

      for (let j = 0; j < iCategory.questions.length; j++) {
        const iQuestion = iCategory.questions[j];
        const question = await Question.create({
          title: iQuestion.title,
          questionCategory: questionCate._id,
        });

        listQuestionId.push(question._id);

        let listAnswerId = [];
        for (let x = 0; x < iQuestion.answers.length; x++) {
          const iAnswer = iQuestion.answers[x];
          const answer = await Answer.create({
            question: question._id,
            title: iAnswer.title,
            point: iAnswer.point,
          });

          listAnswerId.push(answer._id);
        }

        question.answers = listAnswerId;
        await question.save();
        listAnswerId = [];
      }

      questionCate.questions = listQuestionId;
      await questionCate.save();
      listQuestionId = [];
    }
  }
}

export default SoulTestSeeder;
