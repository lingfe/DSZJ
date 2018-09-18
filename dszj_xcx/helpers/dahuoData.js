
export default {

  /**
   * 银行
   */
  bank_list:[
    "贵阳银行","储蓄银行", "发行银行", "国家银行", "汇兑银行","工商银行",
    "农业银行", "交通银行", "兴业银行", "华夏银行","上海浦东发展银行",
    "中国人民银行", "中信银行","中国银行","招商银行",
    "其他银行"
  ],

  /**
   * 金额
   */
  jingE_list:[
    "10", "20","50","100",
    "200","300","500","1000"
  ],


  /**
   * 健康告知
   */
  immediatelyJoin_list:{
    zhohe:{
      imgUrl:"https://www.dishuihuzhu.cn/Public/weixin/images/healthInform.png",
      title:"综合意外互助计划",
      title_text:"意外身故 ，  意外伤残",
      textarea: "为加入本计划，您需要查看被互助人是否符合加入要求。若不符合以下要求，将不能加入计划。若您未如实告知其中任何一项情况，将来申请互助时，运营方将按规定拒绝您的申请。 ",
      content:'<div class="inform-item"><div class="item-content"><h3>一、被互助人加入本计划之时身体健康，无残疾，能够正常生活工作，以下六项基本活动正常：</h3><div style="line-height:18px;"> 1. 穿衣：自己能够穿衣及脱衣；<br>          2. 移动：自己从一个房间到另一个房间；<br>          3. 行动：自己上下床或上下轮椅；<br>          4. 如厕：自己控制进行大小便；<br>          5. 进食：自己从已准备好的碗或碟中取食物放入口中；<br>          6. 洗澡：自己进行淋浴或盆浴。 </div></div></div><div class="inform-item"><div class="item-content"><h3>二、被互助人加入本计划之时，职业或工种不在以下职业范围内：</h3><div> 1. 海上、船上、高空、森林、山区、山地、地下、潜水、水下、隧道坑道、井下作业人员；<br>          2. 陆上油矿开采业作业人员；<br>          3. 四吨以上卡车、液化或气化油罐车司机及随车人员；<br>          4. 涉及或接触任何危险物（化学物质、爆炸物、有毒物质等）；<br>          5. 高压电或带电作业；<br>          6. 现役军警人员中的地面部队、海军陆战队、水兵、空军飞行员、前线军人、特种部队人员，或防爆警、刑警、军警校学生、消防队员；<br>          7. 曲棍球、橄榄球、摔跤、柔道、空手道、跆拳道、武术、拳击、卡丁车运动员或教练员；<br>          8. 潜水、水上摩托车、滑雪、马术、特技表演、雪车、滑翔机、汽车摩托车赛车、跳伞、击剑运动员及教练；<br>          9. 涉及铁牛车、&nbsp;机动三轮车、&nbsp;吊车、&nbsp;直升机&nbsp;、工作时间内摩托车的驾驶或操作；<br>          10. 机械厂、钢铁厂、造修船业的工人，从事挖泥船、锅炉、石棉瓦、采掘相关工作的工人；<br>          11. 制造业的机械操作人员；<br>          12. 驯兽师；<br>          13. 动物饲养员；<br>          14. 飞行训练教官；<br>          15. 建筑工程车辆驾驶或机械操作；<br>          16. 高架公路工程人员；<br>          17. 战地记者；<br>          18. 武打、特技、杂技演员；<br>          19. 跑片员；<br>          20. 海水浴场救生员；<br>          21. 酒吧女或舞女，非职业按摩师；<br>          22. 烟囱或高速公路清洁工；<br>          23. 职业保镖；<br>          24. 军事武器弹药研究或管理人员；<br>          25. 无固定摊位的个体经营者及商贩。 </div></div></div>',
    },//综合意外互助计划
    youth:{
      imgUrl: "https://www.dishuihuzhu.cn/Public/weixin/images/healthInform.png",
      title: "中青年抗癌计划",
      title_text: "胃癌、肝癌等各种癌症",
      textarea: "为加入本计划，您需要查看被互助人是否符合加入要求。若不符合以下要求，将不能加入计划。若您未如实告知其中任何一项情况，将来申请互助时，运营方将按规定拒绝您的申请。 ",
      content: '<div class="inform-item"><div class="item-content"><h3>一、过去三年内，被互助人未曾因疾病进行手术治疗，或连续住院≥15天，或服药≥3个月。</h3></div></div><div class="inform-item"><div class="item-content"><h3>二、被互助人目前或曾经未患有下列任一疾病：</h3><div> 1.肿瘤(包括恶性肿瘤、脑部肿瘤、白血病，但已经确诊为良性息肉、囊肿、结节和赘生物且已治愈的除外)、原位癌及病理学描述为癌前病变的疾病等;<br>        2. 心脏病(心功能2级以上)、冠心病(包括心绞痛、心肌梗死等类型)、高血压病(2级或2级以上)、脑血管疾病、主动脉疾病;<br>        3. 糖尿病、甲亢(未治疗，症状严重)等慢性疾病;<br>        4. 慢性阻塞性肺疾病、支气管哮喘(重度或重度以上);<br>        5. 肝硬化;<br>        6. 急慢性肾脏疾病;<br>        7. 再生障碍性贫血;<br>        8. 精神科疾病(含癫痫);<br>        9. 特定传染病(鼠疫、霍乱、病毒性肝炎、痢疾、艾滋病、梅毒、流行性出血病、狂犬病、炭疽、黑热病、疟疾、登革热、人感染高致病禽流感、传染性非典型肺炎、甲型H1N1流感、MERS和埃博拉出血热);<br>        10. 先天性疾病或者遗传性疾病;<br>        11. 智力发育不全以及身体残障(含严重3度烧伤)。 </div></div></div>',
    },//中青年抗癌计划
    lao:{
      imgUrl: "https://www.dishuihuzhu.cn/Public/weixin/images/healthInform.png",
      title: "中老年抗癌计划",
      title_text: "胃癌、肝癌等各种癌症",
      textarea: "为加入本计划，您需要查看被互助人是否符合加入要求。若不符合以下要求，将不能加入计划。若您未如实告知其中任何一项情况，将来申请互助时，运营方将按规定拒绝您的申请。 ",
      content: '<div class="inform-item"><div class="item-content"><h3>一、过去三年内，被互助人未曾因疾病进行手术治疗，或连续住院≥15天，或服药≥3个月。</h3></div></div><div class="inform-item"><div class="item-content"><h3>二、被互助人目前或曾经未患有下列任一疾病：</h3><div> 1.肿瘤(包括恶性肿瘤、脑部肿瘤、白血病，但已经确诊为良性息肉、囊肿、结节和赘生物且已治愈的除外)、原位癌及病理学描述为癌前病变的疾病等;<br>        2. 心脏病(心功能2级以上)、冠心病(包括心绞痛、心肌梗死等类型)、高血压病(2级或2级以上)、脑血管疾病、主动脉疾病;<br>        3. 糖尿病、甲亢(未治疗，症状严重)等慢性疾病;<br>        4. 慢性阻塞性肺疾病、支气管哮喘(重度或重度以上);<br>        5. 肝硬化;<br>        6. 急慢性肾脏疾病;<br>        7. 再生障碍性贫血;<br>        8. 精神科疾病(含癫痫);<br>        9. 特定传染病(鼠疫、霍乱、病毒性肝炎、痢疾、艾滋病、梅毒、流行性出血病、狂犬病、炭疽、黑热病、疟疾、登革热、人感染高致病禽流感、传染性非典型肺炎、甲型H1N1流感、MERS和埃博拉出血热);<br>        10. 先天性疾病或者遗传性疾病;<br>        11. 智力发育不全以及身体残障(含严重3度烧伤)。 </div></div></div>',
    },//中老年抗癌计划
    shao:{
      imgUrl: "https://www.dishuihuzhu.cn/Public/weixin/images/healthInform.png",
      title: "少儿健康互助计划",
      title_text: "白血病、癌症等50种大病",
      textarea: "为加入本计划，您需要查看被互助人是否符合加入要求。若不符合以下要求，将不能加入计划。若您未如实告知其中任何一项情况，将来申请互助时，运营方将按规定拒绝您的申请。 ",
      content: '<div class="inform-item"><div class="item-content"><h3>一、过去三年内，被互助人未曾因疾病进行手术治疗，或连续住院≥15天，或服药≥3个月。</h3></div></div><div class="inform-item"><div class="item-content"><h3>二、被互助人目前或曾经未患有下列任一疾病：</h3><div> 1.肿瘤(包括恶性肿瘤、脑部肿瘤、白血病，但已经确诊为良性息肉、囊肿、结节和赘生物且已治愈的除外)、原位癌及病理学描述为癌前病变的疾病等;<br>        2. 心脏病(心功能2级以上)、冠心病(包括心绞痛、心肌梗死等类型)、高血压病(2级或2级以上)、脑血管疾病、主动脉疾病;<br>        3. 糖尿病、甲亢(未治疗，症状严重)等慢性疾病;<br>        4. 慢性阻塞性肺疾病、支气管哮喘(重度或重度以上);<br>        5. 肝硬化;<br>        6. 急慢性肾脏疾病;<br>        7. 再生障碍性贫血;<br>        8. 精神科疾病(含癫痫);<br>        9. 特定传染病(鼠疫、霍乱、病毒性肝炎、痢疾、艾滋病、梅毒、流行性出血病、狂犬病、炭疽、黑热病、疟疾、登革热、人感染高致病禽流感、传染性非典型肺炎、甲型H1N1流感、MERS和埃博拉出血热);<br>        10. 先天性疾病或者遗传性疾病;<br>        11. 智力发育不全以及身体残障(含严重3度烧伤)。 </div></div></div>',
    }//少儿健康互助计划
  },

    /**
   * 常见问题
   */
  commonProblem_List:{
    zhohe:[
      {
        id: "pro1",
        title: 'Q1 意外互助范围是什么？什么才算意外？',
        content: '<div class="mui-collapse-content"><p class="tabFonts">“意外”需同时满足外来的、突发的、非本意的和非疾病的四个要素，符合此要求造成的身体伤残才可以在本计划中获得互助哦。</p><p class="tabFonts">会员遭受意外伤害，并自该意外伤害发生之日起一百八十日内因该意外伤害导致身故或者身残的，其亲属或本人可发起求助申请。</p><p class="tabFonts">其中意外伤残的标准以中国法医学会在2013年6月联合发布的《人身医疗伤残评定标准》对应的伤残等级，按比例进行互助。 </p></div>',
      }, {
        id: "pro2",
        title: "Q2 若遇不幸怎么申请互助？",
        content: '<div class="mui-collapse-content"><p>如果不幸发生意外，可按照以下流程申请互助</p><p class="qus-two">（1）拨打客服电话400-6063-400发起申请；<br>          （2）第三方专业公估机构核实后，全平台公示；<br>          （3）公示通过无异议，从互助金中划款。</p><p class="qus-two">以“我的滴水”页面中已加入的计划为凭证。</p></div>',
      }, {
        id: "pro3",
        title: "Q3 我已经加入其它互助计划？",
        content: '<div class="mui-collapse-content"><p class="tabFonts">双重互助，为您的健康保驾护航。</p></div>',
      }
    ],//综合意外互助计划
    youth:[
      {
        id: "pro1",
        title: 'Q1 若遇不幸怎么申请互助？',
        content: '<div class="mui-collapse-content"><p>如果不幸发生意外，可按照以下流程申请互助</p><p class="qus-two">（1）拨打客服电话400-6063-400发起申请；<br>          （2）第三方专业公估机构核实后，全平台公示；<br>          （3）公示通过无异议，从互助金中划款。</p><p class="qus-two">以“我的滴水”页面中已加入的计划为凭证。</p></div>',
      }, {
        id: "pro2",
        title: "Q2 已加入其它互助，还需加入吗？",
        content: ' 还是需要的。患病后，治疗费用18-30万元。加入互助，又可多了一份互助。',
      }, {
        id: "pro3",
        title: "Q3 快到50岁了加入后还能互助多久?",
        content: '<p>本互助计划加入年龄为18-50周岁，包含18周岁和50周岁。如果今年50周岁，可以放心加入。<br>          年满51周岁时，会自动转入面向中老年抗癌计划，继续享受互助计划。</p>',
      }
    ],//中青年抗癌计划
    lao:[
      {
        id: "pro1",
        title: 'Q1 已加入其它互助，还需加入吗？',
        content: '<p>还是需要的。患病后，治疗费用18-30万元。加入互助，又可多了一份互助。</p>',
      }, {
        id: "pro2",
        title: "Q2 怎么申请互助，以什么为凭证？",
        content: '<div class="mui-collapse-content"><em></em><p>如果患病了，可按照以下流程申请互助：</p><p class="qus-two">（1）拨打客服电话400-6063-400发起申请；<br>          （2）第三方专业公估机构核实后，全平台公示；<br>          （3）公示通过无异议，从互助金中划款。 </p><p class="qus-two">以“我的滴水”页面中已加入的计划为凭证。</p></div>',
      }, {
        id: "pro3",
        title: "Q3 65岁能加入吗？加入后互助多久？",
        content: '<p>本计划加入年龄为51-65周岁，包含51周岁和65周岁。如果父母今年65周岁，可以放心加入。<br>          之后，只要账户余额不低于3元，可以一直享受互助计划。</p>',
      }, {
        id: "pro4",
        title: "Q4 能帮父母外的其他长辈加入吗？",
        content: '可以的，加入时填写被互助人的姓名、身份证号即可。',
      }
    ],//中老年抗癌计划
    shao: [
      {
        id: "pro1",
        title: 'Q1 已加入其它互助，还需加入吗？',
        content: '<p>还是需要的。患病后，治疗费用18-30万元。加入互助，又可多了一份互助。</p>',
      }, {
        id: "pro2",
        title: "Q2 怎么申请互助，以什么为凭证？",
        content: '<div class="mui-collapse-content"><em></em><p>如果患病了，可按照以下流程申请互助：</p><p class="qus-two">（1）拨打客服电话400-6063-400发起申请；<br>          （2）第三方专业公估机构核实后，全平台公示；<br>          （3）公示通过无异议，从互助金中划款。 </p><p class="qus-two">以“我的滴水”页面中已加入的计划为凭证。</p></div>',
      }, {
        id: "pro3",
        title: "Q3 17岁能加入吗？加入后互助多久？",
        content: '<p>本计划加入年龄为出生后30天-17周岁，包含17周岁。如果孩子今年17周岁，可以放心加入。<br>          孩子年满18周岁时，会自动转入中青年抗癌计划，继续享受互助计划。</p>',
      }, {
        id: "pro4",
        title: "Q4 小孩还没有身份证，怎么加入？",
        content: '户口本上有小朋友的身份证号，您可以通过户口本查找。',
      }
    ],//少儿健康互助计划
  },
  
  /**
   * 互助规则
   */
  isTuou_List:{
    zhohe: [{
        id: "tuou1",
        title: "互助人群",
        text: "中少年，老人，身体健康",
        content: '<div class="mui-collapse - content"><p class="font - one">为保证公平性，加入者须满足以下条件：</p><p class="font - one">1.年龄1至65周岁（年满66周岁自动退出计划）。</p><p class="font - one">2.身体健康，能正常工作，无肢体运动功能或躯体感觉障碍，无器官移植史。</p><p class="font - one">3.非港澳台居民。</p><p class="font - one">4.符合《健康及职业要求》中的规定。</p><p class="font - one">5.认同并承诺遵守《会员公约》以及本互助计划规则。</p></div>',
      }, {
        id: "tuou2",
        title: "互助额度",
        text: "最高10万元互助金",
        content: '<div class="mui-collapse-content"><p class="font-one">意外身故：遭受意外事故，且自事故发生之日起180日内因同一原因身故的（不包括猝死）</p><p class="font-one">意外伤残：遭受意外事故，并自该意外伤害发生之日起180日内因同一原因导致身体伤残的</p></div>',
      }, {
        id: "tuou3",
        title: "互助范围",
        text: "意外身故和意外伤残",
        tableImg: "http://pic.yupoo.com/lingfe/38b6dc99/30e77e3b.png",
        imgStyle: "height:200rpx;"
      }, {
        id: "tuou4",
        title: "分摊规则",
        text: "单次不超过 <span class='class_div'> 3元</span>，每年约 <span class='class_div'> 50元 </span>",
        tableImg: "http://pic.yupoo.com/lingfe/bcde726b/94e1480c.png",
        imgStyle: "height:500rpx;"
      }, {
        id: "tuou5",
        title: "互助延续",
        text: "账户余额不低于<span class='class_div'>3元</span>即可",
        tableImg: "http://pic.yupoo.com/lingfe/158a2fea/f5d9a92c.png",
        imgStyle: "height:600rpx;"
      }, {
        id: "tuou6",
        title: "等待期",
        text: "30天",
        content: '<div class="mui-collapse-content"><p class="wait-font font-one">设置等待期的目的是为了防止一些故意的、非正常的行为，导致发生损害广大互助群体利益的情况。</p><p class="font-one">在等待期内，若发生意外不可以申请互助金，但须履行分摊义务。等待期过后，会员如不幸发生意外，本计划下的其他互助会员为其发起互助。</p></div>',
      }
    ],  //综合意外互助计划
    youth:[
      {
        id: "tuou1",
        title: "加入条件",
        text: "18-50周岁，身体健康",
        tableImg:"http://pic.yupoo.com/lingfe/9a20a343/a423b634.png",
        imgStyle: "height:600rpx;"
      }, {
        id: "tuou2",
        title: "互助范围",
        text: "胃癌、肝癌等各种癌症",
        content: '<em></em><p class="font-one">所有恶性肿瘤（癌症），但下列疾病不可互助：</p><p>(1) 原位癌及癌前病变；</p><p>(2) 相当于Binet分期方案A期程度的慢性淋巴细胞白血病；</p><p>(3) 相当于Ann Arbor分期方案I期程度的何杰金氏病；</p><p>(4) 皮肤癌（不包括恶性黑色素瘤及已发生转移的皮肤病）；</p><p>(5) TNM分期为T1N0M0期或者更轻分期的前列腺癌；</p><p>(6) 感染艾滋病病毒或者患艾滋病期间所患恶性肿瘤。</p>',
      }, {
        id: "tuou3",
        title: "互助额度",
        text: '<span>最高<span class="class_div">30万元</span>互助金</span>',
        tableImg: "http://pic.yupoo.com/lingfe/ab0dde09/554e7745.png",
        imgStyle: "height:300rpx;"
      }, {
        id: "tuou4",
        title: "分摊规则",
        text: "单次不超过 <span class='class_div'> 3元</span>，每年约 <span class='class_div'> 150元 </span>",
        tableImg: "http://pic.yupoo.com/lingfe/e43d9cc5/fc07cc47.png",
        imgStyle: "height:500rpx;"
      }, {
        id: "tuou5",
        title: "互助延续",
        text: "账户余额不低于<span class='class_div'>3元</span>即可",
        tableImg: "http://pic.yupoo.com/lingfe/158a2fea/f5d9a92c.png",
        imgStyle: "height:600rpx;"
      }, {
        id: "tuou6",
        title: "等待期",
        text: "180天（为防止带病加入）",
        content: '<div class="mui-collapse-content"><p class="wait-font font-one">设置等待期的目的是为了防止一些故意的、非正常的行为，导致发生损害广大互助群体利益的情况。</p><p class="font-one">在等待期内，若发生意外不可以申请互助金，但须履行分摊义务。等待期过后，会员如不幸发生意外，本计划下的其他互助会员为其发起互助。</p></div>',
      }
    ],//中青年抗癌计划
    lao:[
      {
        id:"tuou1",
        title:"加入条件",
        text:"51-65周岁，身体健康",
        tableImg:"http://pic.yupoo.com/lingfe/bf02f516/44e0ca8b.png",
        imgStyle:"height:700rpx;",
      }, {
        id: "tuou2",
        title: "互助范围",
        text: "胃癌、肝癌等各种癌症",
        content: '<em></em><p class="font-one">所有恶性肿瘤（癌症），但下列疾病不可互助：</p><p>(1) 原位癌及癌前病变；</p><p>(2) 相当于Binet分期方案A期程度的慢性淋巴细胞白血病；</p><p>(3) 相当于Ann Arbor分期方案I期程度的何杰金氏病；</p><p>(4) 皮肤癌（不包括恶性黑色素瘤及已发生转移的皮肤病）；</p><p>(5) TNM分期为T1N0M0期或者更轻分期的前列腺癌；</p><p>(6) 感染艾滋病病毒或者患艾滋病期间所患恶性肿瘤。</p>',
      }, {
        id: "tuou3",
        title: "互助额度",
        text: '<span>最高<span class="class_div">10万元</span>互助金</span>',
        tableImg: "http://pic.yupoo.com/lingfe/1f4a08ae/64d6d8ed.png",
        imgStyle: "height:280rpx;"
      }, {
        id: "tuou4",
        title: "分摊规则",
        text: "单次不超过 <span class='class_div'> 3元</span>，每年约 <span class='class_div'> 350元 </span>",
        tableImg: "http://pic.yupoo.com/lingfe/e43d9cc5/fc07cc47.png",
        imgStyle: "height:500rpx;"
      }, {
        id: "tuou5",
        title: "互助延续",
        text: "账户余额不低于<span class='class_div'>3元</span>即可",
        tableImg: "http://pic.yupoo.com/lingfe/158a2fea/f5d9a92c.png",
        imgStyle: "height:600rpx;"
      }, {
        id: "tuou6",
        title: "等待期",
        text: "180天（为防止带病加入）",
        content: '<div class="mui-collapse-content"><p class="wait-font font-one">设置等待期的目的是为了防止一些故意的、非正常的行为，导致发生损害广大互助群体利益的情况。</p><p class="font-one">在等待期内，若发生意外不可以申请互助金，但须履行分摊义务。等待期过后，会员如不幸发生意外，本计划下的其他互助会员为其发起互助。</p></div>',
      }
    ],//中老年抗癌计划
    shao:[
      {
        id: "tuou1",
        title: "加入条件",
        text: "出生后30天-17周岁，身体健康",
        tableImg: "http://pic.yupoo.com/lingfe/7c6939d5/2c89cab3.png",
        imgStyle: "height:800rpx;",
      }, {
        id: "tuou2",
        title: "互助范围",
        text: "白血病、癌症等50种大病",
        content: '涵盖恶性肿瘤（俗称癌症，包含白血病）、良性脑肿瘤、严重烧伤、重大器官移植、双耳失聪、双目失明等50种重大疾病。',
      }, {
        id: "tuou3",
        title: "互助额度",
        text: '<span>最高<span class="class_div">30万元</span>互助金</span>',
        tableImg: "http://pic.yupoo.com/lingfe/8ab3119a/6284c8bb.png",
        imgStyle: "height:200rpx;"
      }, {
        id: "tuou4",
        title: "分摊规则",
        text: "单次不超过 <span class='class_div'> 3元</span>，每年约 <span class='class_div'> 150元 </span>",
        tableImg: "http://pic.yupoo.com/lingfe/e43d9cc5/fc07cc47.png",
        imgStyle: "height:500rpx;"
      }, {
        id: "tuou5",
        title: "互助延续",
        text: "账户余额不低于<span class='class_div'>3元</span>即可",
        tableImg: "http://pic.yupoo.com/lingfe/158a2fea/f5d9a92c.png",
        imgStyle: "height:600rpx;"
      }, {
        id: "tuou6",
        title: "等待期",
        text: "180天（为防止带病加入）",
        content: '<div class="mui-collapse-content"><p class="wait-font font-one">设置等待期的目的是为了防止一些故意的、非正常的行为，导致发生损害广大互助群体利益的情况。</p><p class="font-one">在等待期内，若发生意外不可以申请互助金，但须履行分摊义务。等待期过后，会员如不幸发生意外，本计划下的其他互助会员为其发起互助。</p></div>',
      }
    ],//少儿健康互助计划
  }, 

  /**
 * 公约
 */
  goyue_list: [
    {
      title: " 《会员公约》 ",
      url: "https://www.dishuihuzhu.cn/Home/Plan/convention.html",
      page_tab_content_class: "bor",
      youth: true,
      zhohe: true,
      lao:true,
      shao:true
    }, {
      title: " 《综合意外互助计划条款》  ",
      url: "https://www.dishuihuzhu.cn/Home/Plan/accidentRuleIp.html",
      youth: false,
      zhohe: true
    }, {
      title: " 《健康及职业要求》  ",
      url: "https://www.dishuihuzhu.cn/Home/Plan/accidentWorkAsk.html",
      youth: false,
      zhohe: true
    }, {
      title: " 《人身医疗伤残评定标准》 ",
      url: "https://www.dishuihuzhu.cn/Home/Plan/accidentNormal.html",
      youth: false,
      zhohe: true
    }, {
      title: " 《中青年抗癌计划条款》 ",
      url: "https://www.dishuihuzhu.cn/Home/Plan/ruleIp/flag/1",
      youth: true,
      zhohe: false
    },{
      title:" 《中老年抗癌计划条款》 ",
      url:"https://www.dishuihuzhu.cn/Home/Plan/ruleIp/flag/2",
      lao:true,
    },{
      title:" 《少儿健康互助计划条款》 ",
      url: "https://www.dishuihuzhu.cn/Home/Plan/ruleIp/flag/3",
      shao:true
    }
  ],

  /**
   * 互助服务
   */
  mutualServer_list:[
    {
      bg_img:"https://www.dishuihuzhu.cn/Public/weixin/images/ptkk.png",
      title:"平台可靠",
      text:"滴水资本战略投资",
    }, {
      bg_img: "https://www.dishuihuzhu.cn/Public/weixin/images/zjaq.png",
      title: "资金安全",
      text: "中国民生银行专户托管",
      style:"float:right;",
    },{
      bg_img: "https://www.dishuihuzhu.cn/Public/weixin/images/zapf.png",
      title: "事件真实",
      text: "公估机构专业核实",
    }, {
      bg_img: "https://www.dishuihuzhu.cn/Public/weixin/images/lptm.png",
      title: "真实透明",
      text: "公估机构核实，全程公示",
      style: "float:right;",
    }
  ],

  /**
   * 滴水互助图片url
   */
  mutuaAid_imgArr_list: [
    {
      imgUrl: "https://www.dishuihuzhu.cn/Public/weixin/images/yiwai.jpg",
      url: "/pages/dripLove/dripMutualAidDetails/dripMutualAidDetails",
    }, {
      imgUrl: "https://www.dishuihuzhu.cn/Public/weixin/images/zq.jpg",
      url: "/pages/dripLove/inYouthNnticancerPlan/inYouthNnticancerPlan",
    }, {
      imgUrl: "https://www.dishuihuzhu.cn/Public/weixin/images/ln.jpg",
      url: "/pages/dripLove/middleAndOldAgeAnticancerPlan/middleAndOldAgeAnticancerPlan",
    }, {
      imgUrl: "https://www.dishuihuzhu.cn/Public/weixin/images/se.jpg",
      url: "/pages/dripLove/dripMutualAidDetails/dripMutualAidDetails",
    }
  ],  

  /**
   * 首页轮播图
   */
  indexData:[{
      img:'http://pic.yupoo.com/lingfe/abf32a04/14181035.jpg',
      title:'意外受伤，病魔无情！请求好心人大家帮帮我年迈的父亲！',
      prices: 502115
    }, {
        img: 'http://pic.yupoo.com/lingfe/7c5347ec/a6cb160e.jpg',
        title: '百善孝为先！恳求好心人帮帮我急需做手术的父亲！',
        prices: 351202
    }, {
        img: 'http://pic.yupoo.com/lingfe/a1dca7db/6645467a.jpg',
        title: '百善孝为先，妈妈您要坚强，爸爸和我还有妹妹会一直陪着你！',
        prices: 305210
    }, {
        img: 'http://pic.yupoo.com/lingfe/23ad9e20/10fd84f2.jpg',
        title: '母亲 儿女再苦再难 也要治好你 报答母亲的养育之恩!',
        prices: 452153
    }, {
        img: 'http://pic.yupoo.com/lingfe/ca5c8178/701f4a72.jpg',
        title: '我在与这该死的癌症病魔做斗争，大家帮帮我吧！',
        prices: 206530
  }]

}