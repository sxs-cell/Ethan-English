/* ============ 考研英语学习网站 · 数据 ============ */

/* ---- 高频词汇库（按七大主题分类） ---- */
const VOCAB = [
  // 文化类
  { cat: "文化类", en: "cultural integration", zh: "文化融合" },
  { cat: "文化类", en: "cultural heritage", zh: "文化遗产" },
  { cat: "文化类", en: "cultural diversity", zh: "文化多样性" },
  { cat: "文化类", en: "cultural confidence", zh: "文化自信" },
  { cat: "文化类", en: "traditional culture", zh: "传统文化" },
  { cat: "文化类", en: "intangible cultural heritage", zh: "非物质文化遗产" },
  { cat: "文化类", en: "cultural exchange", zh: "文化交流" },
  { cat: "文化类", en: "national pride", zh: "民族自豪感" },
  { cat: "文化类", en: "carry forward", zh: "弘扬、继承" },
  { cat: "文化类", en: "cultural deposit", zh: "文化底蕴" },
  // 科技创新类
  { cat: "科技创新类", en: "artificial intelligence", zh: "人工智能" },
  { cat: "科技创新类", en: "scientific innovation", zh: "科技创新" },
  { cat: "科技创新类", en: "cloud computing", zh: "云计算" },
  { cat: "科技创新类", en: "digital economy", zh: "数字经济" },
  { cat: "科技创新类", en: "new energy vehicle", zh: "新能源汽车" },
  { cat: "科技创新类", en: "driverless car", zh: "无人驾驶" },
  { cat: "科技创新类", en: "virtual reality", zh: "虚拟现实" },
  { cat: "科技创新类", en: "core technology", zh: "关键核心技术" },
  { cat: "科技创新类", en: "innovation-driven development", zh: "创新驱动发展" },
  { cat: "科技创新类", en: "robot technology", zh: "机器人技术" },
  // 自然环境类
  { cat: "自然环境类", en: "environmental protection", zh: "环境保护" },
  { cat: "自然环境类", en: "sustainable development", zh: "可持续发展" },
  { cat: "自然环境类", en: "ecological balance", zh: "生态平衡" },
  { cat: "自然环境类", en: "green and low-carbon", zh: "绿色低碳" },
  { cat: "自然环境类", en: "renewable resource", zh: "可再生资源" },
  { cat: "自然环境类", en: "climate change", zh: "气候变化" },
  { cat: "自然环境类", en: "global warming", zh: "全球变暖" },
  { cat: "自然环境类", en: "biodiversity", zh: "生物多样性" },
  { cat: "自然环境类", en: "ecological civilization", zh: "生态文明" },
  { cat: "自然环境类", en: "harmony between man and nature", zh: "人与自然和谐共生" },
  // 社会热点类
  { cat: "社会热点类", en: "population aging", zh: "人口老龄化" },
  { cat: "社会热点类", en: "high-quality development", zh: "高质量发展" },
  { cat: "社会热点类", en: "infrastructure", zh: "基础设施" },
  { cat: "社会热点类", en: "employment", zh: "就业" },
  { cat: "社会热点类", en: "social media", zh: "社交媒体" },
  { cat: "社会热点类", en: "food safety", zh: "食品安全" },
  { cat: "社会热点类", en: "information era", zh: "信息时代" },
  { cat: "社会热点类", en: "rural revitalization", zh: "乡村振兴" },
  { cat: "社会热点类", en: "people's livelihood", zh: "民生" },
  { cat: "社会热点类", en: "living standard", zh: "生活水平" },
  // 个人发展类
  { cat: "个人发展类", en: "perseverance", zh: "坚持不懈" },
  { cat: "个人发展类", en: "self-discipline", zh: "自律" },
  { cat: "个人发展类", en: "innovation", zh: "创新" },
  { cat: "个人发展类", en: "independent", zh: "独立自主" },
  { cat: "个人发展类", en: "courage", zh: "勇气" },
  { cat: "个人发展类", en: "confidence", zh: "自信" },
  { cat: "个人发展类", en: "determination", zh: "决心" },
  { cat: "个人发展类", en: "diligence", zh: "勤奋" },
  { cat: "个人发展类", en: "strong will", zh: "坚强的意志" },
  { cat: "个人发展类", en: "optimism", zh: "乐观主义" },
  // 成长教育类
  { cat: "成长教育类", en: "lifelong learning", zh: "终身学习" },
  { cat: "成长教育类", en: "quality-oriented education", zh: "素质教育" },
  { cat: "成长教育类", en: "critical thinking", zh: "批判性思维" },
  { cat: "成长教育类", en: "teamwork", zh: "团队合作" },
  { cat: "成长教育类", en: "comprehensive ability", zh: "综合能力" },
  { cat: "成长教育类", en: "extra-curricular activity", zh: "课外活动" },
  { cat: "成长教育类", en: "interpersonal relationship", zh: "人际关系" },
  { cat: "成长教育类", en: "habit", zh: "习惯" },
  { cat: "成长教育类", en: "role model", zh: "榜样" },
  { cat: "成长教育类", en: "filial piety", zh: "孝顺" },
];

const VOCAB_CATS = ["全部", "文化类", "科技创新类", "自然环境类", "社会热点类", "个人发展类", "成长教育类"];

/* ---- 范文库（模板示范，基于素材提炼） ---- */
const FANWEN = [
  {
    id: "picture",
    type: "大作文 · 图画作文",
    tag: "英语一重点",
    title: "图画作文三段式模板示范",
    structure: "第一段（图画描述+主题阐述）→ 第二段（原因分析）→ 第三段（总结+措施+展望）",
    sample: `【第一段】As is symbolically depicted in the figure above, 环境 + 主体 + 主要动作. The primary intention of the drawing seems to remind the whole society that 主题词 is so indispensable that we can hardly imagine our life without it.

【第二段】There exist plenty of causes accounting for my opinions in various aspects. For instance, my roommate, Kevin, is passionate about 主题词, which brings him remarkable progress. Not only does 主题词 improve our 能力, but it also enables us to 更大的收获.

【第三段】It is not difficult to draw the conclusion that enough attention must be turned to 主题词. It is imperative for the authorities to allocate more funds. Only through the joint efforts of all people can we effectively solve the problem and embrace a brighter future.`,
  },
  {
    id: "chart",
    type: "大作文 · 图表作文",
    tag: "英语二重点",
    title: "图表作文三段式模板示范",
    structure: "第一段（图表描述+主题阐述）→ 第二段（原因分析）→ 第三段（总结+趋势预测）",
    sample: `【第一段】According to the figures given in the chart above, the 数据 increased from A to B during the past few years. The purpose of the chart seems to remind us that 主题词 has been developing rapidly in recent years.

【第二段】There exist plenty of causes accounting for this phenomenon. The majority believe that 主题词 provide a broader platform for personal growth. If we ignored the importance of 主题词, our society would be confronted with unexpected problems.

【第三段】It is not difficult to draw the conclusion that 主题词 is playing an increasingly important role. Going forward, this trend is expected to continue, and more attention should be paid to its long-term influence.`,
  },
  {
    id: "text",
    type: "大作文 · 文字作文",
    tag: "通用",
    title: "文字作文三段式模板示范",
    structure: "第一段（文字改写+表明态度）→ 第二段（原因分析）→ 第三段（总结+措施+展望）",
    sample: `【第一段】It cannot be denied that 现象 is becoming increasingly common in our society. While the author believes that 观点, I agree with the statement to a large extent.

【第二段】There exist plenty of causes accounting for my opinions. Compared with the past, 主题词 enables people to achieve more with less effort. It is well known that 主题词 plays a vital role in 社会/个人发展.

【第三段】It is not difficult to draw the conclusion that 主题词 is not an option but a necessity. We should bear in mind that 主题词 is an integral part of our lives, and only in this way can we enjoy a better future.`,
  },
  {
    id: "letter",
    type: "小作文 · 书信",
    tag: "通用",
    title: "书信模板示范（邀请信）",
    structure: "称呼 → 第一段（背景+意图）→ 第二段（时间地点+内容+收获）→ 第三段（期待回信）+ 落款",
    sample: `Dear Professor,

I am very pleased to hear that 相关背景. I am writing this letter in order to invite you to 参加活动.

The event will be held in 地点 at 8:00 a.m. on Sunday, December 20th. The subject of the activity is to discuss 主题. All students from all grades are eligible to join it. The profound experience will be memorable and the prize will be valuable.

I would like to express my gratitude for your time. Your prompt reply will be highly appreciated.

Yours sincerely,
Li Ming`,
  },
  {
    id: "notice",
    type: "小作文 · 通知",
    tag: "通用",
    title: "通知（Notice）模板示范",
    structure: "标题 Notice → 第一段（概况+目的）→ 第二段（时间地点+人员+奖励）→ 第三段（邀请+报名方式）+ 署名",
    sample: `Notice
December 20, 2025

It's a pleasure to inform everyone that a 活动名称 will be held on campus. This notice is intended to introduce some details of the event.

The activity will be held in 地点 at 8:00 a.m. on Sunday, December 20th. All students from all grades are welcome to take part in it. The event will commence with an opening ceremony, followed by 具体环节. The profound experience will be memorable.

Please email us at 123456@qq.com to sign up. Put it into practice and you are sure to benefit a lot!

Student Union`,
  },
  {
    id: "minutes",
    type: "小作文 · 纪要",
    tag: "2023新增",
    title: "纪要（Minutes of Meeting）模板示范",
    structure: "标题 + 时间/地点/主题/参会人 → 会议内容（导入+目的+发言+决定）→ 记录人署名",
    sample: `Minutes of Meeting
Date: December 23, 2023
Time: From 10:00 a.m. to 11:30 a.m.
Location: A111, conference room
Objective: 会议主题
Attendees: 参会人员

Meeting content:
The meeting commenced with a warm welcome from the chairman. The meeting aims to make a plan for 主题. The chairman expressed the opinion that 观点. The majority of those attendees were in favour of 方案. The meeting agreed to hold the activity of 活动.

Recorded by: Li Ming
December 23, 2023`,
  },
];

/* ---- 历年真题库 ---- */
const ZHENTI_YING1 = [
  { year: 2001, type: "一幅图", topic: "爱心是一盏明灯" },
  { year: 2002, type: "一幅图", topic: "美国女孩穿中国传统服饰（文化交流）" },
  { year: 2003, type: "两幅图", topic: "温室花朵经不起风雨（抗挫折）" },
  { year: 2004, type: "一幅图", topic: "终点又是新起点" },
  { year: 2005, type: "一幅图", topic: "养老足球赛（孝道）" },
  { year: 2006, type: "两幅图", topic: "偶像崇拜（理性追星）" },
  { year: 2007, type: "图画结合", topic: "自信" },
  { year: 2008, type: "一幅图", topic: "合作（你一条腿我一条腿）" },
  { year: 2009, type: "图画", topic: "网络的近与远" },
  { year: 2010, type: "图画", topic: "文化火锅（文化融合）" },
  { year: 2011, type: "一幅图", topic: "旅程之余（保护环境）" },
  { year: 2012, type: "对话图", topic: "乐观主义（全完了/幸好还剩点儿）" },
  { year: 2013, type: "一幅图", topic: "毕业生的选择" },
  { year: 2014, type: "两幅图", topic: "相携（孝道继承）" },
  { year: 2015, type: "一幅图", topic: "手机时代的聚会" },
  { year: 2016, type: "两幅图", topic: "与其只提要求不如做个榜样" },
  { year: 2017, type: "两幅图", topic: "有书与读书（行动）" },
  { year: 2018, type: "一幅图", topic: "选课（创新/挑战）" },
  { year: 2019, type: "对话图", topic: "途中（坚持）" },
  { year: 2020, type: "两幅图", topic: "习惯" },
  { year: 2021, type: "对话图", topic: "兴趣爱好与传统文化" },
  { year: 2022, type: "对话图", topic: "校园讲座（广泛学习）" },
  { year: 2023, type: "图画", topic: "赛龙舟（文化自信）" },
  { year: 2024, type: "图画+图表", topic: "公园建设（公共设施）" },
  { year: 2025, type: "图表·表格", topic: "耐用消费品拥有量" },
];

const ZHENTI_YING2 = [
  { year: 2010, type: "柱状图", topic: "发展中国家与发达国家手机订阅数" },
  { year: 2011, type: "柱状图", topic: "国产品牌/日系/美系汽车占比" },
  { year: 2012, type: "表格", topic: "员工工作满意度调查" },
  { year: 2013, type: "柱状图", topic: "各年级学生占比" },
  { year: 2014, type: "柱状图", topic: "城镇与乡村人口变化" },
  { year: 2015, type: "饼状图", topic: "春节假期花销比例" },
  { year: 2016, type: "饼状图", topic: "学生旅游目的调查" },
  { year: 2017, type: "线状图", topic: "博物馆数量与参观人数" },
  { year: 2018, type: "饼状图", topic: "消费者选择餐厅关注因素" },
  { year: 2019, type: "柱状图", topic: "学生毕业去向对比" },
  { year: 2020, type: "饼状图", topic: "学生手机阅读目的调查" },
  { year: 2021, type: "柱状图", topic: "居民锻炼方式调查" },
  { year: 2022, type: "柱状图", topic: "快递业务量（总体与农村）" },
  { year: 2023, type: "线状图", topic: "居民健康素养水平" },
  { year: 2024, type: "柱状图", topic: "活动效果百分比" },
  { year: 2025, type: "柱状图", topic: "社区老人日常休闲活动" },
];

/* ---- 万能句库（写作技巧页引用） ---- */
const SENTENCES = [
  { cat: "图画引入", en: "As is symbolically depicted in the figure above, ...", zh: "如上图所示（象征性描绘）……" },
  { cat: "主题阐述", en: "The primary intention of the drawing seems to remind [sb] that ...", zh: "图画的主要意图似乎在于提醒……" },
  { cat: "图表引入", en: "According to the figures given in the chart above, ...", zh: "根据上图数据……" },
  { cat: "原因过渡", en: "There exist plenty of causes accounting for my opinions in various aspects.", zh: "众多原因从各方面解释了我的观点。" },
  { cat: "举例论证", en: "For instance, my roommate, Kevin, is passionate about ..., which brings him ...", zh: "例如，我的室友凯文热衷于……这给他带来了……" },
  { cat: "倒装原因", en: "Not only does [主题词] improve ..., but it also enables them to ...", zh: "……不仅能提升……，还能使他们……" },
  { cat: "虚拟警告", en: "If we ignored the importance of ..., our society would be confronted with ...", zh: "若忽视……的重要性，社会将面临……" },
  { cat: "总结全文", en: "It is not difficult to draw the conclusion that ...", zh: "不难得出这样的结论……" },
  { cat: "提出措施", en: "It is imperative for the authorities to allocate more funds.", zh: "政府部门有必要投入更多资金。" },
  { cat: "展望未来", en: "Only through the joint efforts of all people can we effectively solve the problem.", zh: "唯有通过全体人民的共同努力，我们才能有效解决这一问题。" },
  { cat: "书信意图", en: "I am writing this letter in order to ...", zh: "我写这封信是为了……" },
  { cat: "期待回信", en: "Your prompt reply will be highly appreciated.", zh: "如能早日回复，不胜感激。" },
];

/* ---- 真题范文解析（每周持续扩充） ---- */
const ZHENTI_FANWEN = [
  {
    year: 2025, exam: "英语一", type: "图表·表格", topic: "耐用消费品拥有量",
    yi: "表格显示我国居民每百户耐用消费品（空调/洗衣机/电冰箱）拥有量逐年增长，折射人民生活水平提高，属“积极现象”类图表题。写作重点：第一段描述数据趋势，第二段分析原因（经济+科技），第三段总结并预测趋势。",    fanwen: `The table above illustrates the remarkable growth in the ownership of major durable consumer goods per hundred households in China over the past few years. To be specific, the number of air conditioners rose from 75.2 to 145.9, while washing machines and refrigerators also witnessed steady increases.

The purpose of the table seems to remind us that the living standards of Chinese residents have been improving rapidly in recent years. There exist plenty of causes accounting for this phenomenon. First, it is well known that the economy has been developing at an unprecedented pace, which enables ordinary families to afford more household appliances. In addition, not only does the advancement of technology reduce the price of these products, but it also improves their quality, making them increasingly popular among consumers.

It is not difficult to draw the conclusion that the rising ownership of durable goods is a vivid reflection of social progress. Going forward, this trend is expected to continue, and more attention should be paid to the balanced development between urban and rural areas so that every family can share the fruits of economic growth.`,
    jiexi: "第一段：总体描述+细节数据（rose from…to…）；第二段：主题阐述（生活水平提高）+两条原因（经济发展用 It is well known that，技术进步用 not only…but also 倒装）；第三段：总结（It is not difficult to draw the conclusion）+趋势预测（Going forward）。",    liangdian: ["It is well known that the economy has been developing at an unprecedented pace…", "Not only does the advancement of technology reduce…, but it also improves…", "Going forward, this trend is expected to continue."],
    keywords: ["durable consumer goods", "living standards", "economic growth"],
  },
  {
    year: 2024, exam: "英语一", type: "图画+图表", topic: "公园建设",
    yi: "图画（家门口新建的小公园）+ 图表（公园数量增长）结合，主题为公共设施建设与居民幸福感。此类“图画+图表融合题”第一段需兼顾图与表的描述，再落到主题。",    fanwen: `As is symbolically depicted in the figure above, an elderly man is taking a leisurely walk in a newly built park near his home, with a contented smile on his face. Meanwhile, the chart shows that the number of parks in the city increased significantly from 2020 to 2022.

The primary intention of the drawing seems to remind the whole society that the construction of public facilities is so indispensable that it directly determines people's quality of life. There exist plenty of causes accounting for my opinions. For instance, my neighbor, Mr. Wang, is passionate about exercising in the community park every morning, which brings him remarkable health and happiness. Not only does the building of parks improve the living environment, but it also provides residents with spaces for recreation and social interaction.

It is not difficult to draw the conclusion that enough attention must be turned to the construction of public facilities. It is imperative for the authorities to allocate more funds to green spaces. Only through the joint efforts of the government and citizens can we create a more livable and harmonious community.`,
    jiexi: "第一段：图画描述+图表描述（融合）；第二段：主题阐述（so indispensable that）+举例（For instance…which brings him…）+倒装（Not only does…but it also…）；第三段：总结+措施（It is imperative for the authorities to…）+展望（Only through…can we…）。",    liangdian: ["…is so indispensable that it directly determines people's quality of life.", "For instance, my neighbor, Mr. Wang, is passionate about…, which brings him…", "Only through the joint efforts of the government and citizens can we create…"],
    keywords: ["public facilities", "green space", "quality of life"],
  },
  {
    year: 2023, exam: "英语一", type: "图画", topic: "赛龙舟（文化自信）",
    yi: "图画展示赛龙舟场景，主题为传统节日与文化自信。属于“传统文化”类，可套用“传统文化 so indispensable that…”的中心思想句式，并落到文化传承与自信。",    fanwen: `As is symbolically depicted in the figure above, a group of young people are rowing a dragon boat with great enthusiasm, splashing water everywhere. The dragon boat, decorated with vibrant colors, vividly reflects the charm of traditional Chinese culture.

The primary intention of the drawing seems to remind the whole society that traditional culture is so indispensable that we can hardly imagine our national identity without it. There exist plenty of causes accounting for my opinions. It is well known that traditional festivals and customs carry the wisdom and spirit of our ancestors, which provide a profound sense of belonging for the younger generation. Moreover, not only does the inheritance of traditional culture enhance our cultural confidence, but it also promotes cultural exchanges between China and the rest of the world.

It is not difficult to draw the conclusion that enough attention must be turned to the protection of traditional culture. We should bear in mind that cultural heritage is an integral part of our lives. Only through the joint efforts of all people can we pass down our splendid culture from generation to generation.`,
    jiexi: "第一段：图画描述（主体+动作+with细节）；第二段：主题阐述（so indispensable that）+原因（承载智慧 It is well known that…which…；增强自信 not only…but also…）；第三段：总结+措施（We should bear in mind）+展望（Only through…can we…）。",    liangdian: ["…traditional culture is so indispensable that we can hardly imagine our national identity without it.", "It is well known that traditional festivals and customs carry the wisdom and spirit of our ancestors…", "…pass down our splendid culture from generation to generation."],
    keywords: ["traditional culture", "cultural confidence", "cultural heritage"],
  },
  {
    year: 2022, exam: "英语一", type: "对话图", topic: "校园讲座（广泛学习）",
    yi: "对话图：一学生说“不是我们专业的，听了也没用”，另一学生说“听听总会有好处”。主题为广泛学习/跨界学习。对话图第一段需用“A 说的话，关联词+B 说的话”结构。",    fanwen: `As is symbolically depicted in the figure above, two students are standing in front of a notice board. One student says, "It is not our major, so attending the lecture is useless." However, the other replies, "A campus lecture always benefits us in some way."

The primary intention of the drawing seems to remind the whole society that extensive learning is so indispensable that it shapes our way of thinking and broadens our horizons. There exist plenty of causes accounting for my opinions. For instance, my roommate, Kevin, was addicted to attending lectures from various disciplines, which made him a well-rounded and competitive candidate in the job market. Not only does cross-disciplinary learning enrich our knowledge, but it also enables us to discover our true interests and potential.

It is not difficult to draw the conclusion that enough attention must be turned to extensive learning. It is imperative for universities to provide more diverse lectures and encourage students to step out of their comfort zones. Only in this way can students grow into versatile talents in the modern society.`,
    jiexi: "第一段：对话图描述（A 说的话, However, B 说的话）；第二段：主题阐述（so indispensable that）+举例（For instance…which made him…）+倒装；第三段：总结+措施+展望（Only in this way can…）。",    liangdian: ["…extensive learning is so indispensable that it shapes our way of thinking and broadens our horizons.", "For instance, my roommate, Kevin, was addicted to…, which made him a well-rounded and competitive candidate.", "Only in this way can students grow into versatile talents."],
    keywords: ["extensive learning", "broaden horizons", "comfort zone"],
  },
  {
    year: 2019, exam: "英语一", type: "对话图", topic: "途中（坚持）",
    yi: "对话图：爬山时一人说“累了，不爬了”，另一人说“休息一下再爬”。主题为坚持/毅力（perseverance）。对话图套用对话结构，主题词落在坚持上。",    fanwen: `As is symbolically depicted in the figure above, two young men are climbing a steep mountain. One of them, exhausted and sitting on the ground, says, "I am tired, and I will not climb any further." However, the other encourages him, "Come on! Let's have a rest and then keep climbing."

The primary intention of the drawing seems to remind the whole society that perseverance is so indispensable that it determines whether we can reach the peak of success. There exist plenty of causes accounting for my opinions. For instance, my friend Tom was once confronted with enormous difficulties in his study, but his strong will enabled him to overcome them and finally achieve his goal. Not only does perseverance help us conquer obstacles, but it also enables us to discover our unlimited potential.

It is not difficult to draw the conclusion that enough attention must be turned to the cultivation of perseverance. We should bear in mind that giving up halfway leads to nothing but regret. Only through persistent efforts can we embrace the beautiful scenery at the top of the mountain.`,
    jiexi: "第一段：对话图描述（主体+动作+对话）；第二段：主题阐述（so indispensable that）+举例（For instance…enabled him to…）+倒装；第三段：总结+措施（We should bear in mind）+展望（Only through…can we…）。",    liangdian: ["…perseverance is so indispensable that it determines whether we can reach the peak of success.", "For instance, my friend Tom was once confronted with enormous difficulties…", "Only through persistent efforts can we embrace the beautiful scenery at the top."],
    keywords: ["perseverance", "strong will", "overcome obstacles"],
  },
  {
    year: 2025, exam: "英语二", type: "柱状图", topic: "社区老人休闲活动",
    yi: "柱状图展示某社区老年人日常休闲活动调查，主题为老年生活多样化。属于“积极现象”类，第一段总体+细节描述，第二段原因（生活水平+智能设备），第三段总结+预测。",    fanwen: `According to the figures given in the chart above, the elderly people in a certain community spend their leisure time on various activities, with walking ranking first, followed by playing chess and dancing. To be specific, walking accounts for the largest proportion, while online activities occupy a relatively small share.

The purpose of the chart seems to remind us that the recreational life of the elderly has been becoming increasingly diversified in recent years. There exist plenty of causes accounting for this phenomenon. The majority believe that the improvement of living standards provides senior citizens with more opportunities and facilities for recreation. In addition, the popularization of smart devices enables the elderly to enjoy a wider variety of entertainment at home.

It is not difficult to draw the conclusion that the diversified leisure life of the elderly is a positive sign of social development. Going forward, this trend is expected to continue. Meanwhile, more attention should be paid to the elderly who may feel lonely, so that every senior citizen can enjoy a colorful and meaningful life.`,
    jiexi: "第一段：总体描述（with walking ranking first）+细节（accounts for…）；第二段：主题阐述+原因（生活水平 The majority believe that…；智能设备）；第三段：总结（It is not difficult to…）+趋势预测+人文关怀延伸。",    liangdian: ["According to the figures given in the chart above, …with walking ranking first…", "The majority believe that the improvement of living standards provides senior citizens with more opportunities…", "Going forward, this trend is expected to continue."],
    keywords: ["leisure activities", "living standards", "the elderly"],
  },
  {
    year: 2024, exam: "英语二", type: "柱状图", topic: "活动效果百分比",
    yi: "柱状图展示某活动效果百分比（提升动手能力等），主题为实践活动的价值。静态图用“accounts for…respectively”描述占比，第二段用对比论证（Compared with…）凸显实践意义。",    fanwen: `According to the figures given in the chart above, a certain activity has brought about various positive effects on its participants. To be specific, the proportion of students who improved their hands-on ability accounts for the largest share, while other benefits such as teamwork and creativity also occupy considerable proportions.

The purpose of the chart seems to remind us that extracurricular activities play a vital role in students' comprehensive development. There exist plenty of causes accounting for this phenomenon. It is well known that such activities provide students with a broader platform to apply what they have learned in practice. Compared with the traditional classroom, hands-on activities enable students to cultivate practical skills and a spirit of cooperation.

It is not difficult to draw the conclusion that the value of practical activities should not be underestimated. We should bear in mind that ability is not merely acquired from books but also developed through practice. Only by combining theory with practice can students achieve all-round development.`,
    jiexi: "第一段：静态图描述（accounts for…respectively）；第二段：主题阐述（play a vital role）+原因（平台 It is well known that…；对比 Compared with…）；第三段：总结（should not be underestimated）+深化（ability is not merely acquired…）+展望（Only by…can…）。",    liangdian: ["…extracurricular activities play a vital role in students' comprehensive development.", "Compared with the traditional classroom, hands-on activities enable students to cultivate practical skills…", "Only by combining theory with practice can students achieve all-round development."],
    keywords: ["hands-on ability", "comprehensive development", "practice"],
  },
  {
    year: 2022, exam: "英语二", type: "柱状图", topic: "快递业务量",
    yi: "柱状图展示快递业务量（总体与农村）2018–2020 增长，主题为电商与快递业繁荣。动态图用“surged from…to…”描述变化，原因落电商+基础设施。",    fanwen: `According to the figures given in the chart above, the volume of express delivery in China witnessed a remarkable growth from 2018 to 2020. To be specific, the total volume surged from about 50 billion to 80 billion parcels, and the rural delivery volume also increased significantly during the same period.

The purpose of the chart seems to remind us that the express delivery industry has been developing rapidly, which greatly facilitates people's daily life. There exist plenty of causes accounting for this phenomenon. The majority believe that the prosperity of e-commerce and online shopping provides a broader market for the express industry. In addition, the continuous improvement of infrastructure in rural areas enables farmers to enjoy convenient logistics services just like urban residents.

It is not difficult to draw the conclusion that the booming express industry reflects the vitality of China's economy. Going forward, this trend is expected to continue, and more attention should be paid to green packaging and sustainable development.`,
    jiexi: "第一段：动态图描述（surged from…to…）；第二段：主题阐述（has been developing rapidly）+原因（电商 The majority believe that…；基础设施）；第三段：总结（reflects the vitality）+趋势预测+绿色包装延伸。",    liangdian: ["…the total volume surged from about 50 billion to 80 billion parcels…", "The majority believe that the prosperity of e-commerce… provides a broader market…", "…the booming express industry reflects the vitality of China's economy."],
    keywords: ["express delivery", "e-commerce", "infrastructure"],
  },
];
