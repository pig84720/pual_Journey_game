/**
 * 題庫資料 - 保羅傳道之旅（僅採用課文中出現的地點與事件）
 * 資料來源：《使徒行傳》中文和合本（繁體＋現代標點）
 * 稱呼使用「神」而非「上帝」
 */

import type { Journey } from '../types';

/**
 * 第一次傳道之旅（徒 13–14）
 * 保留課文敘述之地點與事件：
 * 安提阿（敘利亞）→ 撒拉米（居比路）→ 帕弗（居比路）→ 別加（旁非利亞）
 * → 彼西底的安提阿 → 以哥念 → 路司得 → 特庇 → 回程（路司得→以哥念→彼西底的安提阿）
 * → 安提阿（敘利亞）
 */
export const J1: Journey = {
  id: 'J1',
  title: '第一次傳道之旅（徒 13–14）',
  steps: [
    {
      id: 'J1_S1',
      order: 1,
      place: '安提阿（敘利亞）',
      verses: [{ book: '徒', chap: 13, vers: '1-3' }],
      note: '聖靈差派，教會按手差遣'
    },
    {
      id: 'J1_S2',
      order: 2,
      place: '撒拉米（居比路）',
      verses: [{ book: '徒', chap: 13, vers: '5' }],
      note: '在會堂宣講神的道'
    },
    {
      id: 'J1_S3',
      order: 3,
      place: '帕弗（居比路）',
      verses: [{ book: '徒', chap: 13, vers: '6-12' }],
      note: '以呂馬抵擋；方伯「士求保羅」信主'
    },
    {
      id: 'J1_S4',
      order: 4,
      place: '別加（旁非利亞）',
      verses: [{ book: '徒', chap: 13, vers: '13' }],
      note: '約翰馬可離隊回耶路撒冷'
    },
    {
      id: 'J1_S5',
      order: 5,
      place: '彼西底的安提阿',
      verses: [{ book: '徒', chap: 13, vers: '14-52' }],
      note: '保羅講道；外邦人歡迎；遭逼迫'
    },
    {
      id: 'J1_S6',
      order: 6,
      place: '以哥念',
      verses: [{ book: '徒', chap: 14, vers: '1-7' }],
      note: '分黨；行神蹟；遭謀害離開'
    },
    {
      id: 'J1_S7',
      order: 7,
      place: '路司得',
      verses: [{ book: '徒', chap: 14, vers: '8-20' }],
      note: '醫治瘸子；被誤為神；保羅被石頭打'
    },
    {
      id: 'J1_S8',
      order: 8,
      place: '特庇',
      verses: [{ book: '徒', chap: 14, vers: '20-21' }],
      note: '傳福音使多人作門徒'
    },
    {
      id: 'J1_S9',
      order: 9,
      place: '回程：路司得 → 以哥念 → 彼西底的安提阿',
      verses: [{ book: '徒', chap: 14, vers: '21-22' }],
      note: '堅固門徒，勸勉恆守所信的道'
    },
    {
      id: 'J1_S10',
      order: 10,
      place: '安提阿（敘利亞）',
      verses: [{ book: '徒', chap: 14, vers: '26-28' }],
      note: '向差派教會述職，榮耀神'
    }
  ],
  events: [
    {
      key: 'J1_E1',
      title: '聖靈差派，教會按手差遣',
      verses: [{ book: '徒', chap: 13, vers: '2-3' }]
    },
    {
      key: 'J1_E2',
      title: '以呂馬被責備，方伯信主',
      verses: [{ book: '徒', chap: 13, vers: '6-12' }]
    },
    {
      key: 'J1_E3',
      title: '約翰馬可離隊',
      verses: [{ book: '徒', chap: 13, vers: '13' }]
    },
    {
      key: 'J1_E4',
      title: '保羅在彼西底的安提阿講道',
      verses: [{ book: '徒', chap: 13, vers: '16-41' }]
    },
    {
      key: 'J1_E5',
      title: '以哥念分黨與神蹟',
      verses: [{ book: '徒', chap: 14, vers: '1-7' }]
    },
    {
      key: 'J1_E6',
      title: '路司得醫治瘸子、被誤為神',
      verses: [{ book: '徒', chap: 14, vers: '8-18' }]
    },
    {
      key: 'J1_E7',
      title: '保羅在路司得被石頭打',
      verses: [{ book: '徒', chap: 14, vers: '19-20' }]
    },
    {
      key: 'J1_E8',
      title: '回程堅固門徒',
      verses: [{ book: '徒', chap: 14, vers: '21-22' }]
    },
    {
      key: 'J1_E10',
      title: '回安提阿向教會報告',
      verses: [{ book: '徒', chap: 14, vers: '26-28' }]
    }
  ],
  correctPairs: [
    { order: 1, eventKeys: ['J1_E1'] },
    { order: 3, eventKeys: ['J1_E2'] },
    { order: 4, eventKeys: ['J1_E3'] },
    { order: 5, eventKeys: ['J1_E4'] },
    { order: 6, eventKeys: ['J1_E5'] },
    { order: 7, eventKeys: ['J1_E6', 'J1_E7'] },
    { order: 9, eventKeys: ['J1_E8'] },
    { order: 10, eventKeys: ['J1_E10'] }
  ]
};

/**
 * 第二次傳道之旅（徒 15:36–18:22）
 * 保留課文敘述之地點與事件：
 * 安提阿（敘利亞）→ 路司得 → 弗呂家、加拉太 → 每西亞邊界→特羅亞（異象）
 * → 腓立比 → 帖撒羅尼迦 → 庇哩亞 → 雅典 → 哥林多
 * （課文未敘述堅革哩、以弗所短停與返安提阿的段落，故移除）
 */
export const J2: Journey = {
  id: 'J2',
  title: '第二次傳道之旅（徒 15:36–18:22）',
  steps: [
    {
      id: 'J2_S1',
      order: 1,
      place: '安提阿（敘利亞）',
      verses: [{ book: '徒', chap: 15, vers: '36-41' }],
      note: '與巴拿巴分開；保羅選西拉'
    },
    {
      id: 'J2_S2',
      order: 2,
      place: '路司得',
      verses: [{ book: '徒', chap: 16, vers: '1-5' }],
      note: '提摩太加入；交付耶路撒冷定規'
    },
    {
      id: 'J2_S3',
      order: 3,
      place: '弗呂家、加拉太',
      verses: [{ book: '徒', chap: 16, vers: '6' }],
      note: '聖靈禁止在亞西亞講道'
    },
    {
      id: 'J2_S4',
      order: 4,
      place: '每西亞邊界',
      verses: [{ book: '徒', chap: 16, vers: '7-8' }],
      note: '耶穌的靈不許往庇推尼'
    },
    {
      id: 'J2_S5',
      order: 5,
      place: '特羅亞',
      verses: [{ book: '徒', chap: 16, vers: '9-10' }],
      note: '馬其頓呼召異象'
    },
    {
      id: 'J2_S6',
      order: 6,
      place: '腓立比',
      verses: [{ book: '徒', chap: 16, vers: '13-40' }],
      note: '呂底亞信主；被囚；地震；禁卒一家得救'
    },
    {
      id: 'J2_S7',
      order: 7,
      place: '帖撒羅尼迦',
      verses: [{ book: '徒', chap: 17, vers: '1-9' }],
      note: '三個安息日辯論；騷動'
    },
    {
      id: 'J2_S8',
      order: 8,
      place: '庇哩亞',
      verses: [{ book: '徒', chap: 17, vers: '10-14' }],
      note: '查考聖經；多有信主'
    },
    {
      id: 'J2_S9',
      order: 9,
      place: '雅典',
      verses: [{ book: '徒', chap: 17, vers: '15-34' }],
      note: '亞略巴古談「未識之神」'
    },
    {
      id: 'J2_S10',
      order: 10,
      place: '哥林多',
      verses: [{ book: '徒', chap: 18, vers: '1-17' }],
      note: '與亞居拉、百基拉同工；住一年六個月；迦流案'
    }
  ],
  events: [
    {
      key: 'J2_E1',
      title: '與巴拿巴分開；西拉同行',
      verses: [{ book: '徒', chap: 15, vers: '36-41' }]
    },
    {
      key: 'J2_E2',
      title: '提摩太加入並受割禮',
      verses: [{ book: '徒', chap: 16, vers: '1-3' }]
    },
    {
      key: 'J2_E3',
      title: '聖靈禁止在亞西亞；不許往庇推尼',
      verses: [{ book: '徒', chap: 16, vers: '6-7' }]
    },
    {
      key: 'J2_E4',
      title: '馬其頓呼召異象',
      verses: [{ book: '徒', chap: 16, vers: '9-10' }]
    },
    {
      key: 'J2_E5',
      title: '呂底亞信主受洗',
      verses: [{ book: '徒', chap: 16, vers: '13-15' }]
    },
    {
      key: 'J2_E6',
      title: '被囚與地震；禁卒全家得救',
      verses: [{ book: '徒', chap: 16, vers: '25-34' }]
    },
    {
      key: 'J2_E7',
      title: '帖撒羅尼迦騷動',
      verses: [{ book: '徒', chap: 17, vers: '5-9' }]
    },
    {
      key: 'J2_E8',
      title: '庇哩亞人查考聖經',
      verses: [{ book: '徒', chap: 17, vers: '10-12' }]
    },
    {
      key: 'J2_E9',
      title: '亞略巴古講道：未識之神',
      verses: [{ book: '徒', chap: 17, vers: '22-31' }]
    },
    {
      key: 'J2_E10',
      title: '在哥林多與亞居拉、百基拉同工',
      verses: [{ book: '徒', chap: 18, vers: '1-4' }]
    }
  ],
  correctPairs: [
    { order: 1, eventKeys: ['J2_E1'] },
    { order: 2, eventKeys: ['J2_E2'] },
    { order: 3, eventKeys: ['J2_E3'] },
    { order: 5, eventKeys: ['J2_E4'] },
    { order: 6, eventKeys: ['J2_E5', 'J2_E6'] },
    { order: 7, eventKeys: ['J2_E7'] },
    { order: 8, eventKeys: ['J2_E8'] },
    { order: 9, eventKeys: ['J2_E9'] },
    { order: 10, eventKeys: ['J2_E10'] }
  ]
};

/**
 * 所有旅程資料
 */
export const journeys: Journey[] = [J1, J2];