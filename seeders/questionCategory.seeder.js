/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable class-methods-use-this */
import { Seeder } from 'mongoose-data-seed';
import { QuestionCategory, Question, Answer } from '../src/models';
import config from '../src/configs';
import configQuestionCate from '../src/packages/questionCategory/config';

const questionCategoryData = [
  {
    title: '1. 진정한 <strong>사랑</strong>을 아는 자',
    color: '#FF5766',
    order: 1,
    type: config.luffingTestType.LOVE,
    questions: [
      {
        title:
          '<span style="color:#FF5766">Q1.</span> 현재 <span style="color:#FF5766">자신을 사랑</span>하고 있습니까?<br />만약 나를 사랑하는 구체적인<br />방법이 있다면 무엇일까요?',
        answers: [
          {
            title: '나에게 많은 선물로 보답한다.',
            point: 0,
          },
          {
            title: '자신의 감정들과 친해지려고 노력한다.',
            point: 2,
          },
          {
            title: '내 자신을 신중히 관찰해 본다.',
            point: 1.5,
          },
          {
            title: '상대방의 입장을 소중히 여기려고 노력한다.',
            point: 0.5,
          },
          {
            title: '내 자신의 생각을 들여다 본다.',
            point: 1,
          },
        ],
      },
      {
        title:
          '<span style="color:#FF5766">Q2.</span> 만약 당신이 진심으로 누군가를<br />사랑하게 된다면 진정한 <span style="color:#FF5766">사랑의 본질</span>은<br />무엇이라고 생각하시나요?',
        answers: [
          {
            title: '매 순간 생각나고 보고싶어 야 한다.',
            point: 0.5,
          },
          {
            title: '언제나 나로 인해 상대가 웃었으면 좋겠다',
            point: 1.5,
          },
          {
            title: '그 사람을 위해 모든 것을 희생해야 한다.',
            point: 1,
          },
          {
            title: '내가 가진 물질적인 모든 것을 포기 한다.',
            point: 0.5,
          },
          {
            title: '상대에게 변하지 않을 확고 함이 있다.',
            point: 2,
          },
        ],
      },
      {
        title:
          '<span style="color:#FF5766">Q3.</span> 문제없이 <span style="color:#FF5766">사랑을 주는</span><br /><span style="color:red">방법</span>이 있다면 어떤 방법이<br />상대에게는 최고의 정답일까요?',
        answers: [
          {
            title: '자신을 대하 듯 똑같이 대해준다.',
            point: 0,
          },
          {
            title: '진심으로 존중하고 조심스럽게 대한다.',
            point: 1,
          },
          {
            title: '항상 설레이는 감정으로 대한다.',
            point: 1,
          },
          {
            title: '늘 친구처럼 편안한 마음으로 대한다.',
            point: 0.5,
          },
          {
            title: '박력, 진솔, 어른의 마음으로 다가간다.',
            point: 2,
          },
        ],
      },
      {
        title:
          '<span style="color:#FF5766">Q4.</span> 사랑을 지키기 위해서 가장 중요한<br /><span style="color:#FF5766">마음의 요소</span>는 무엇일까요?',
        answers: [
          {
            title: '진심',
            point: 1,
          },
          {
            title: '확신',
            point: 2,
          },
          {
            title: '열정',
            point: 0.5,
          },
          {
            title: '초심',
            point: 1.5,
          },
          {
            title: '기다림',
            point: 0.5,
          },
        ],
      },
      {
        title:
          '<span style="color:#FF5766">Q5.</span> 올바른 <span style="color:#FF5766">사랑의 방정식</span> 중<br />상대를 위해서 가장 중요한<br />자신의 중립적인 태도는 무엇일까요?',
        answers: [
          {
            title: '잘 맞지 않는다면 싸워도 본다.',
            point: 1,
          },
          {
            title: '언제나 초심을 잃지 않고 잘해준다.',
            point: 0.5,
          },
          {
            title: '질리지 않고 오래 만나야 한다.',
            point: 0.5,
          },
          {
            title: '상대와 좋은 추억 쌓는 것을 중요시 한다.',
            point: 1,
          },
          {
            title: '대화를 중심으로 마음을 쌓아 간다.',
            point: 2,
          },
        ],
      },
    ],
  },
  {
    title: '2. 상대를 위하는 <strong>지혜</strong>로움',
    color: '#127CCC',
    order: 2,
    type: config.luffingTestType.INTELLECT,
    questions: [
      {
        title:
          '<span style="color:#127CCC">Q1.</span> 단어에도 무게가 있습니다.<br /><span style="color:#127CCC">자신의 입</span>으로 절대 쓰지<br />말아야 할 단어는 무엇일까요?',
        answers: [
          {
            title: '겸손과 배려',
            point: 2,
          },
          {
            title: '고민과 예의',
            point: 1,
          },
          {
            title: '진심과 행복',
            point: 0,
          },
          {
            title: '자존감과 자신감',
            point: 0.5,
          },
          {
            title: '고집과 고정관념',
            point: 0.5,
          },
        ],
      },
      {
        title:
          '<span style="color:#127CCC">Q2.</span> 상대방에게 어떠한 것도<br /><span style="color:#127CCC">바라는 마음</span>을 갖지 말아야 할<br />가장 큰 이유는 무엇일까요?',
        answers: [
          {
            title: '상대에게 아쉬움을 갖지 않기 위해서',
            point: 0.5,
          },
          {
            title: '더 큰 바램을 갖게 되기 때문에',
            point: 1,
          },
          {
            title: '그 사람을 있는 그대로를 바라보기 위해서',
            point: 2,
          },
          {
            title: '바라다 보면 당연해 지기 때문에',
            point: 1,
          },
          {
            title: '마음은 GIVE & TAKE가 아니라서',
            point: 0.5,
          },
        ],
      },
      {
        title:
          '<span style="color:#127CCC">Q3.</span> <span style="color:#127CCC">고민</span>이라는 것을 하지 않기<br />위해서는 구체적으로 어떤 방법을<br />먼저 선행해야 할까요?',
        answers: [
          {
            title: '절대 불평 불만을 하지 않는다.',
            point: 0,
          },
          {
            title: '고민 될 상황을 아예 만들지 않는다.',
            point: 1,
          },
          {
            title: '자신의 욕심과 이기심을 버리고 선택한다.',
            point: 2,
          },
          {
            title: '고민이 들 때마다 주변에 도움을 청한다.',
            point: 0.5,
          },
          {
            title: '나의 고민과 마주하며 소통을 한다.',
            point: 1.5,
          },
        ],
      },
      {
        title:
          '<span style="color:#127CCC">Q4.</span> 인간으로 살 것인지 아니면 인간답게<br />살 것인지. <span style="color:#127CCC">인간답게 살기</span> 위해<br />어떤 훈련이 가장 중요할까요?',
        answers: [
          {
            title: '불편한 것을 즉시 하며 극복해 나아간다.',
            point: 2,
          },
          {
            title: '주변 어려운 사람을 진심으로 도와준다.',
            point: 1,
          },
          {
            title: '재산의 절반 이상을 사회에 기부한다.',
            point: 0,
          },
          {
            title: '세상과 솔직하게 타협해 간다',
            point: 1.5,
          },
          {
            title: '우유부단하지 않고 성실하게 살아간다.',
            point: 0.5,
          },
        ],
      },
      {
        title:
          '<span style="color:#127CCC">Q5.</span> 언제든 자신과 상대를 마주보고<br />실시간으로 <span style="color:#127CCC">입장을 바꿔</span> 살아간다면<br />최종 무엇을 얻게 될까요?',
        answers: [
          {
            title: '서로에게 좋은 것을 동시에 볼 수 있다.',
            point: 0,
          },
          {
            title: '상대방의 마음을 잘 헤아려 줄 수 있다.',
            point: 1,
          },
          {
            title: '눈에 보이지 않는 기회를 잡아 낼 수 있다.',
            point: 2,
          },
          {
            title: '마음에 상처를 주지 않을 수 있다.',
            point: 1,
          },
          {
            title: '자만하지 않을 수 있다.',
            point: 1.5,
          },
        ],
      },
    ],
  },
  {
    title: '3. 흔들리지 않는 강인한 <strong>정신</strong>력',
    color: '#FFC406',
    order: 3,
    type: config.luffingTestType.SPIRIT,
    questions: [
      {
        title:
          '<span style="color:#FFC406">Q1.</span> 상대에게 말을 예쁘게 하려면<br />어떤 <span style="color:#FFC406">근본적인 정신</span>을<br />가지고 있어야 할까요?',
        answers: [
          {
            title: '예쁜 말들을 연습하고 노력 한다.',
            point: 0.5,
          },
          {
            title: '올바른 사상을 갖고 상대를 위해야 한다.',
            point: 2,
          },
          {
            title: '평상시에 칭찬을 자주하며 집중해 준다.',
            point: 1,
          },
          {
            title: '남을 위해서 행복한 상상을 자주 한다.',
            point: 1,
          },
          {
            title: '말을 평소에 신중하고 조심스럽게 한다.',
            point: 1,
          },
        ],
      },
      {
        title:
          '<span style="color:#FFC406">Q2.</span> 상대에게 <span style="color:#FFC406">오해와 착각</span>을 하는<br />본능적인 이유는 무엇 때문일까요?',
        answers: [
          {
            title: '아직 상대에게 믿음이 부족하기 때문에',
            point: 0.5,
          },
          {
            title: '정확하지 못한 어설픈 기준들 때문에',
            point: 1,
          },
          {
            title: '상처 받고 싶지 않는 방어적인 마음 때문에',
            point: 2,
          },
          {
            title: '잘못된 가정 환경에서의 부작용 때문에',
            point: 0,
          },
          {
            title: '자신의 성급한 성격 때문에',
            point: 1,
          },
        ],
      },
      {
        title:
          '<span style="color:#FFC406">Q3.</span> 상대에게 자신이 <span style="color:#FFC406">호구</span>가 되면<br />결국 나중에 얻게 될 높은 확률의<br />최대 장점은 무엇일까요?',
        answers: [
          {
            title: '더 이상 호구가 되지 않을 수 있다.',
            point: 0.5,
          },
          {
            title: '정신적인 시간을 낭비하지 않을 수 있다.',
            point: 1,
          },
          {
            title: '진짜 나와 평생 함께 할 사람을 찾을 수 있다.',
            point: 2,
          },
          {
            title: '상대에게 평생 나를 기억하게 할 수 있다.',
            point: 0.5,
          },
          {
            title: '자신이 상처 받았던 만큼 더 강해 진다.',
            point: 1,
          },
        ],
      },
      {
        title:
          '<span style="color:#FFC406">Q4.</span> 진짜 <span style="color:#FFC406">좋은 사상과 가치관</span>을<br />가지고 있는 특별한 사람은<br />어떤 상태에 사람일까요?',
        answers: [
          {
            title: '사소한 것에 감사할 줄 아는 사람',
            point: 1,
          },
          {
            title: '자신의 이익보다 남을 위할 줄 아는 사람.',
            point: 1.5,
          },
          {
            title: '힘든 삶을 극복하고 성공한 사람',
            point: 1,
          },
          {
            title: '자신을 온전히 사랑하는 사람',
            point: 2,
          },
          {
            title: '문제 해결 능력이 빠른 사람',
            point: 0.5,
          },
        ],
      },
      {
        title:
          '<span style="color:#FFC406">Q5.</span> 문제없이 <span style="color:#FFC406">행복한 인간관계</span>를<br />만들려면 어떤 사람과 함께해야<br />평생 행운이라고 여기게 될까요?',
        answers: [
          {
            title: '자신을 잘 아는 사람과 함께한다.',
            point: 1,
          },
          {
            title: '마음이 편안한 사람과 함께한다.',
            point: 1.5,
          },
          {
            title: '꿍꿍이가 없는 사람과 함께한다.',
            point: 2,
          },
          {
            title: '돈을 잘 버는 사람과 함께한다.',
            point: 0.5,
          },
          {
            title: '나에게 잘 해주는 사람과 함께한다.',
            point: 0.5,
          },
        ],
      },
    ],
  },
  {
    title: '4. 이기심 없는 이타적인 <strong>책임</strong>감',
    color: '#2FB24B',
    order: 4,
    type: config.luffingTestType.RESPONSIBILITY,
    questions: [
      {
        title:
          '<span style="color:#2FB24B">Q1.</span> 영원한 <span style="color:#2FB24B">믿음</span>의 현실적인 정의는<br />과연 무엇일까요?',
        answers: [
          {
            title: '상대와 자신의 행동만을 보고 믿는 것',
            point: 2,
          },
          {
            title: '시간이 지나 꾸준히 쌓인 신뢰들의 합',
            point: 1,
          },
          {
            title: '진실된 소통을 통해 얻게 되는 확신',
            point: 1,
          },
          {
            title: '마음의 벽을 허물어준 고마운 훈장',
            point: 0.5,
          },
          {
            title: '진심을 통해 순간 책임졌던 타이틀 뺏지',
            point: 0.5,
          },
        ],
      },
      {
        title:
          '<span style="color:#2FB24B">Q2.</span> 진정으로 <span style="color:#2FB24B">용기</span> 내고 있는<br />사람은 누구일까요?',
        answers: [
          {
            title: '소개팅 중 마음에 들지 않아 바로 일어난다.',
            point: 0.5,
          },
          {
            title: '말 다툼 중 감정을 진정시키고 원인을 찾는다.',
            point: 2,
          },
          {
            title: '좋아하는 상대에게 진심으로 고백한다.',
            point: 1,
          },
          {
            title: '쌓였던 마음을 한 번에 꺼내 놓는다.',
            point: 0,
          },
          {
            title: '불만이 생겨서 조심스럽게 얘기한다.',
            point: 1,
          },
        ],
      },
      {
        title:
          '<span style="color:#2FB24B">Q3.</span> 자신의 <span style="color:#2FB24B">이기적인 마음</span>을 버리면<br />무엇을 가장 크게 얻을 수 있을까요?',
        answers: [
          {
            title: '일방적인 행동을 안 할 수 있다.',
            point: 0.5,
          },
          {
            title: '모든 상황을 인정하고 행동할 수 있다.',
            point: 2,
          },
          {
            title: '서로의 사정을 빠르게 계산할 수 있다.',
            point: 1,
          },
          {
            title: '어리석은 판단을 하지 않을 수 있다.',
            point: 1.5,
          },
          {
            title: '자신의 주제를 잘 파악할 수 있게 된다.',
            point: 1,
          },
        ],
      },
      {
        title:
          '<span style="color:#2FB24B">Q4.</span> 보기 중에서 마음이 가장<br /><span style="color:#2FB24B">깨끗한 사람</span>은 누구인가요?',
        answers: [
          {
            title: '소신이 강하고 끈기 있는 사람',
            point: 1.5,
          },
          {
            title: '아직까진 조심스럽고 꾸준한 사람',
            point: 0.5,
          },
          {
            title: '늘 소중한 사람에게 최선을 다하는 사람',
            point: 2,
          },
          {
            title: '간절함으로 행동할 줄 아는 사람',
            point: 1,
          },
          {
            title: '모든 것에 예의가 우선인 사람',
            point: 1,
          },
        ],
      },
      {
        title:
          '<span style="color:#2FB24B">Q5.</span> 자신의 특정한 행동으로 인해<br /><span style="color:#2FB24B">헤어지게 되는 상황</span>입니다.<br />고치기 가장 힘든 사람은 누구일까요?',
        answers: [
          {
            title: '나에게만 푹 빠져 나를 지치게 하는 사람',
            point: 1,
          },
          {
            title: '초심을 잃고 당연함에 실망감을 주는 사람',
            point: 0.5,
          },
          {
            title: '나 말고 다른 이성과 바람을 피우는 사람',
            point: 1.5,
          },
          {
            title: '서로의 존중함 없이 나를 막 대하는 사람',
            point: 2,
          },
          {
            title: '싸우기만 하면 잠수를 타는 사람',
            point: 1,
          },
        ],
      },
    ],
  },
  {
    title: '5. 사랑을 담는 깨끗한 <strong>순수</strong>함',
    color: '#514F4F',
    order: 5,
    type: config.luffingTestType.INNOCENCE,
    questions: [
      {
        title:
          '<span style="color:#514F4F">Q1.</span> 성(19금)을 대하는 올바른<br /><span style="color:#514F4F">마음의 자세</span>는 무엇일까요?',
        answers: [
          {
            title: '상대가 원하고 나도 원한다면 언제든 좋다.',
            point: 1,
          },
          {
            title: '서로의 신중함과 책임의 밀당이 필요하다.',
            point: 2,
          },
          {
            title: '먼저 사랑해서 하고싶은 건지 아닌지 확인',
            point: 1,
          },
          {
            title: '상대를 위해 망설이지 말고 용기 낸다.',
            point: 0,
          },
          {
            title:
              '성을 바라보는 일방적인 기준을 없앤다',
            point: 1.5,
          },
        ],
      },
      {
        title:
          '<span style="color:#514F4F">Q2.</span> 서로 사랑을 알아가면서<br /><span style="color:#514F4F">자신의 환상</span>이 아닌 현실적인<br />기준에서 잘못된 것을 선택하세요.',
        answers: [
          {
            title: '운명적인 사랑은 존재하지 않는다.',
            point: 0.5,
          },
          {
            title: '남자와 여자는 너무 다른 동물이다.',
            point: 0,
          },
          {
            title: '질투심이 생기는 것은 어리석은 마음이다. ',
            point: 2,
          },
          {
            title: '나에게만 집착하는 사람은 매력이 없다.',
            point: 0.5,
          },
          {
            title: '우연과 인연, 필연은 내가 만드는 것이다.',
            point: 0,
          },
        ],
      },
      {
        title:
          '<span style="color:#514F4F">Q3.</span> 식사 자리, 처음 본 사람 앞에서<br /><span style="color: #514F4F">생리 현상</span>이 발생되었을 때 냄새가<br />많이 난다면 어떻게 대처해야 할까요?',
        answers: [
          {
            title: '신속히 입 바람으로 없앤다.',
            point: 0.5,
          },
          {
            title: ' 스스로 냄새를 맡고 기절한 척 웃겨준다.',
            point: 1,
          },
          {
            title: '그 자리에서 용서를 구하고 사과한다.',
            point: 0.5,
          },
          {
            title: '솔직히 말을 하고 마스크를 씌워 준다. ',
            point: 2,
          },
          {
            title: '잠시 숨을 쉬지 말아 달라고 부탁한다.',
            point: 1,
          },
        ],
      },
      {
        title:
          '<span style="color:#514F4F">Q4.</span> 좋은 관계를 위해서 서로의<br /><span style="color: #514F4F">마음을 표현</span>하는 것이 가장 중요하다.<br />본질적인 이유는 무엇일까요?',
        answers: [
          {
            title: '자신의 현재 마음을 확인시켜 주기 때문에',
            point: 1,
          },
          {
            title: '상대의 기분을 좋게 해주기 때문에',
            point: 0.5,
          },
          {
            title: '서로 정신적 안정감을 줄 수 있기 때문에',
            point: 2,
          },
          {
            title: '마음이 식는 것을 방지 할 수 있기 때문에',
            point: 0.5,
          },
          {
            title: '표현하지 않으면 상대가 모르기 때문에',
            point: 1.5,
          },
        ],
      },
      {
        title:
          '<span style="color:#514F4F">Q5.</span> 자신의 마음을 가장 오래<br />담을 수 있는 <span style="color: #514F4F">선물</span>은 무엇일까요?',
        answers: [
          {
            title: '상대를 위해 신중히 고른 성인용품',
            point: 0.5,
          },
          {
            title: '해본 적 없지만 손수 직접 짠 목도리',
            point: 1,
          },
          {
            title: '자신의 솔직함을 담은 손 편지',
            point: 1.5,
          },
          {
            title: '월급을 털어 산 명품 백 or 명품 시계',
            point: 0,
          },
          {
            title: '진심을 담은 나의 용기 있는 행동',
            point: 2,
          },
        ],
      },
    ],
  },
];

class QuestionAnswerSeeder extends Seeder {
  async shouldRun() {
    await Answer.remove({});
    await Question.remove({});
    await QuestionCategory.remove({});
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
        category: configQuestionCate.category.LUFFING_TEST,
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

export default QuestionAnswerSeeder;
