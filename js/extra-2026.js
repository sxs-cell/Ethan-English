/* ============ 2026 考研真题范文（2025年12月20日考试） ============ */
/* 注意：2026 英语一大作文由"图画"改为"图表（双饼图）"，属新型变化，值得重点研究 */

/* ---- 2026 大作文真题范文 ---- */
const FANWEN_2026 = [
  {
    year: 2026, exam: "英语一", type: "图表·双饼图", topic: "养老机器人接受度调查",
    yi: "两张饼图：左图是消费者对养老机器人的接受度（完全接受39.3%、部分接受32.8%、拒绝27.9%），右图是首要关注点（价格46.3%）。属“图表作文+社会现象”结合，且是英语一首次考图表（新型）。写作角度：描述双图数据→分析成因（经济发展、子女忙碌、技术进步）→评论（机器人+亲情陪伴）。",    fanwen: `As is vividly illustrated in the two charts above, a survey has been conducted on consumers' acceptance of elderly-care robots and their primary considerations. To be specific, the left pie chart shows that those who fully accept account for 39.3%, followed by those who partly accept at 32.8%, while 27.9% of respondents reject them. Meanwhile, the right chart reveals that 46.3% of consumers are most concerned about the price.

The charts reflect the profound impact of technology on modern life. There exist plenty of causes accounting for this phenomenon. On the one hand, with the rapid development of the economy, an increasing number of families can afford extra spending on a higher quality of life. On the other hand, young people today are much busier with work and study, leaving them inadequate time to look after their aging parents. Therefore, intelligent robots capable of chatting, reminding and making emergency calls have emerged, greatly easing the loneliness of the elderly.

However, as a young man, I deem that robots can never replace the warmth of family love. It is advisable for adult children to accompany their parents more, for it is genuine care that brings the elderly true happiness.`,
    jiexi: "第一段：图表描述（双图：左图接受度三项数据+右图关注点）；第二段：现象分析（成因用 There exist plenty of causes + On the one hand…On the other hand…）；第三段：评论（However 转折 + It is advisable for sb. to do + 强调句 it is…that…）。",    liangdian: [
      "As is vividly illustrated in the two charts above, a survey has been conducted on ...",
      "On the one hand, ... ; on the other hand, ... leaving them inadequate time to look after their aging parents.",
      "It is advisable for adult children to accompany their parents more, for it is genuine care that brings the elderly true happiness.",
    ],
    keywords: ["elderly-care robots", "acceptance", "an aging population"],
  },
  {
    year: 2026, exam: "英语二", type: "柱状图", topic: "儿童户外活动益处",
    yi: "柱状图呈现家长对儿童户外活动益处的认知调查：满足好奇心54.5%、提升观察力54.6%居前，增强身体素质33.2%、增进亲子互动31.2%次之。属“图表作文+教育/健康”类。写作角度：描述数据→分析家长观念转变（重认知探索、重身心健康）→总结建议。",    fanwen: `The chart above presents a survey on parents' perceptions of the benefits of children's outdoor activities. To be specific, "satisfying curiosity" and "improving observation skills" rank first, each recognized by about 54.5% of respondents. Following closely, "enhancing physical fitness" accounts for 33.2%, while "strengthening parent-child interaction" is valued by 31.2%.

The data reveals a shift in parental focus, as cognitive and exploratory development is now valued alongside physical health. There exist plenty of causes accounting for this phenomenon. First, it is well known that outdoor environments serve as vivid, unstructured classrooms where children learn through discovery. In addition, not only do outdoor activities improve children's physical fitness, but they also strengthen the bond between parents and children.

It is not difficult to draw the conclusion that outdoor activities play a vital role in children's all-round development. Going forward, parents are expected to attach greater importance to them. Only by stepping out of the room can children embrace a healthier and happier childhood.`,
    jiexi: "第一段：图表描述（总体+四项数据，用 To be specific、rank first、Following closely、accounts for）；第二段：分析（观念转变 + 成因：It is well known that…which…；not only…but also…）；第三段：总结（It is not difficult to draw the conclusion）+趋势（Going forward）+呼吁（Only by…can…）。",    liangdian: [
      "The data reveals a shift in parental focus, as cognitive and exploratory development is now valued alongside physical health.",
      "It is well known that outdoor environments serve as vivid, unstructured classrooms where children learn through discovery.",
      "Only by stepping out of the room can children embrace a healthier and happier childhood.",
    ],
    keywords: ["outdoor activities", "all-round development", "physical fitness"],
  },
];

/* ---- 2026 小作文真题范文 ---- */
const XIAOZUOWEN_2026 = [
  {
    year: 2026, exam: "英语一", type: "书信·回复信", topic: "回复手写信展览询问",
    yaoqiu: "阅读朋友 Paul 的邮件（他喜欢你分享的中国家庭手写信，想了解更多、并询问是否公开展出），给他写一封约100词的回复。",    fanwen: `Dear Paul,

I am very pleased to hear that you are deeply moved by the Chinese families' handwritten letters I posted. I am writing this letter in order to tell you more about them.

To begin with, these letters were written by ordinary family members to express love and care, and many of them have been preserved for decades. Their unique handwriting carries genuine emotions that cold digital messages can hardly convey. In addition, I am glad to tell you that some of them are currently on public display at the Beijing Folk Museum, where you can appreciate them in person.

I hope the above information is helpful. I am looking forward to your reply.

Yours sincerely,
Li Ming`,
    jiexi: "称呼 Dear Paul → 第一段：背景（很高兴你喜欢）+ 写信目的（I am writing this letter in order to…）→ 第二段：两点信息（To begin with 说明信件来历与价值；In addition 告知展出地点）→ 结尾（期待回信）+ 落款 Yours sincerely, Li Ming。",    liangdian: [
      "I am writing this letter in order to tell you more about them.",
      "Their unique handwriting carries genuine emotions that cold digital messages can hardly convey.",
    ],
    keywords: ["handwritten letters", "public display", "genuine emotions"],
  },
  {
    year: 2026, exam: "英语二", type: "邮件·回复信", topic: "回复旅行视频",
    yaoqiu: "朋友 Jack 分享了一段他与家人中国之行的旅行视频，写信谈谈你的看法，并询问更多旅行见闻。",    fanwen: `Dear Jack,

I am very pleased to receive your travel video, which I have just watched with great interest. I am writing this email in order to share my thoughts with you.

To begin with, the scenery in your video is truly breathtaking, and the local culture you captured feels so vivid that I almost traveled alongside you. What impresses me most is the part about the traditional village, whose architecture and daily life look fascinating. Moreover, I would be grateful if you could tell me more about your journey, such as the most memorable experience and the local food you enjoyed.

Your prompt reply will be highly appreciated. I am looking forward to hearing from you soon.

Yours sincerely,
Li Ming`,
    jiexi: "称呼 Dear Jack → 第一段：表明已观看视频 + 目的（share my thoughts）→ 第二段：具体看法（To begin with 赞美景色文化；What impresses me most 点出印象最深；Moreover 询问更多）→ 结尾（期待回复）+ 落款。",    liangdian: [
      "the local culture you captured feels so vivid that I almost traveled alongside you.",
      "I would be grateful if you could tell me more about your journey.",
    ],
    keywords: ["travel video", "local culture", "memorable experience"],
  },
];
