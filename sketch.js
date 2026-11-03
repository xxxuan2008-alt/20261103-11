// ==========================================
// 專案名稱：情緒小達人 (修正解析顯示版本)
// ==========================================

let gameState = "START";  // 狀態："START", "QUIZ", "RESULT"
let currentIdx = 0;       // 目前第幾題
let score = 0;            // 得分
let selectedOption = null;// 使用者選的選項
let hasAnswered = false;  // 是否已作答

// 10 題 SEL 題庫
let questions = [
  {
    q: "小明在下課時發現同學都沒有找他玩，他心裡覺得有點孤單和失落。請問下列哪一個做法是「辨識與接納自己情緒」的好方法？",
    options: [
      "覺得大家都討厭我，然後生悶氣",
      "告訴自己「感到孤單是很正常的，我可以試著深呼吸並找人聊聊」",
      "馬上去找同學理論，指責他們不對",
      "假裝不在乎，把情緒全部憋在心裡"
    ],
    answer: 1,
    explanation: "接納情緒並溫和地自我對話，能幫助我們平穩情緒。"
  },
  {
    q: "班上分組時，好朋友沒有選你同組，你覺得心裡很不舒服。這時你可以怎麼做來表達感受？",
    options: [
      "大聲對好朋友生氣，以後再也不理他",
      "跟其他人說他的壞話，報復他",
      "平靜地告訴他：「沒跟你同組我有點失落，下次我們還有機會一起嗎？」",
      "默默哭泣，什麼都不說"
    ],
    answer: 2,
    explanation: "使用「我訊息」（I-message）表達感受，能促進有效溝通。"
  },
  {
    q: "兩位好朋友為了爭奪當班際球賽隊長而吵架甚至冷戰。身為旁觀的朋友，你可以怎麼協助？",
    options: [
      "選邊站，一起討厭其中一個人",
      "叫他們不要為這種小事吵架，很無聊",
      "鼓勵他們冷靜下來，聽聽看彼此的想法，找出雙贏的辦法",
      "裝作沒看到，反正不管我的事"
    ],
    answer: 2,
    explanation: "同理雙方並鼓勵理性傾聽，是解決人際衝突的關鍵。"
  },
  {
    q: "老師點名回答問題，小華不小心答錯了被全班笑，覺得好糗。下列哪一個想法最能展現「成長心態」？",
    options: [
      "我太笨了，以後再也不要在課堂發言了",
      "大家都在笑我，我覺得很丟臉，想生氣",
      "答錯是學習的一部分，大家也會有答錯的時候，下次再加油就好",
      "都是老師不好，幹嘛點我回答"
    ],
    answer: 2,
    explanation: "將錯誤視為學習的契機，能提升面對壓力的韌性。"
  },
  {
    q: "當你在玩線上遊戲時隊友一直失誤導致輸掉，你覺得快要抓狂了。這時候最好的「情緒調節」方式是？",
    options: [
      "立刻用麥克風大罵隊友",
      "把電腦或手機大力摔在地上",
      "暫時離開螢幕，做幾次深呼吸讓自己冷靜下來",
      "繼續忍耐，但心裡充滿怨恨"
    ],
    answer: 2,
    explanation: "短暫暫停與深呼吸是生理調節情緒、避免失控的有效策略。"
  },
  {
    q: "小美聽到有人傳她沒做過的謠言，她覺得很委屈。關於   「同一個情境不同感受」，下列理解何者正確？",
    options: [
      "傳謠言的人一定是因為討厭小美，沒什麼好討論的",
      "每個人解讀角度不同，傳謠言者可能沒意識到會傷害別人，但小美有權利表達感受",
      "大家都應該跟小美有一樣的憤怒反應",
      "生氣是沒有用的，小美一定有做錯什麼事"
    ],
    answer: 1,
    explanation: "理解不同人對同一件事有不同感受，能幫我們客觀看待衝突。"
  },
  {
    q: "明天就要進行重要的全校演講了，小安覺得肚子緊緊的、心跳很快。這是身體在經歷什麼反應？",
    options: [
      "生病了，必須馬上去看醫生",
      "身體面對挑戰時的自然壓力反應（戰鬥或逃跑反應），代表這件事對我很重要",
      "代表我一定會搞砸，我根本不適合上台",
      "完全正常的狀態，不需要理會"
    ],
    answer: 1,
    explanation: "將緊張解讀為「身體正準備迎接挑戰」，有助於降低焦慮。"
  },
  {
    q: "小志看到新轉來的同學一個人坐在角落吃午餐，看起來有點孤單。如果小志想展現「同理心」，他可以怎麼做？",
    options: [
      "覺得他個性很孤僻，不要理他比較安全",
      "跟其他同學一起嘲笑他很孤單",
      "主動走過去打招呼，問他要不要一起吃午餐或介紹環境",
      "在背後偷偷觀察他"
    ],
    answer: 2,
    explanation: "展現同理心與主動關懷，能幫助新成員融入群體。"
  },
  {
    q: "當你在團體報告中負責大部分工作，組員卻沒有盡力卻拿了高分，你覺得很不平衡。適合的溝通方式是？",
    options: [
      "在通訊軟體群組公開大罵大家都在混",
      "默默悶在心裡，下次再也不跟他們同組",
      "私下找組員溫和溝通：「這次我負責較多部分覺得有點累，希望下次分工更平均」",
      "去找老師告狀，要求把他們的成績改低"
    ],
    answer: 2,
    explanation: "建設性的溝通能解決不公平感，並維護人際關係。"
  },
  {
    q: "面對升學或課業壓力，爸媽希望你補習更多科目，但你覺得喘不過氣了。下列哪一個是處理壓力的好對策？",
    options: [
      "完全不寫作業、離家出走來抗議",
      "跟爸媽冷戰，把房門反鎖",
      "整理自己的心情與時間，坐下來跟爸媽理性溝通你的壓力與需求",
      "假裝生病請假躲避壓力"
    ],
    answer: 2,
    explanation: "尋求支持並進行建設性的跨世代溝通，是應對壓力的成熟作法。"
  }
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(255, 209, 102); // 溫暖黃背景 #ffd166

  if (gameState === "START") {
    drawStartScreen();
  } else if (gameState === "QUIZ") {
    drawQuizScreen();
  } else if (gameState === "RESULT") {
    drawResultScreen();
  }
}

// 1. 開始畫面
function drawStartScreen() {
  fill(119, 47, 25);
  textSize(min(36, width * 0.06));
  textStyle(BOLD);
  text("🌟 情緒小達人 🌟", width / 2, height / 2 - 100);

  textSize(18);
  textStyle(NORMAL);
  text("探索同儕關係、衝突排解與心情管理的秘密。\n【請點擊畫面任意處開始測驗】", width / 2, height / 2 - 30);
}

// 2. 測驗畫面 (優化排版，確保解析完整顯示)
function drawQuizScreen() {
  let qData = questions[currentIdx];
  let marginX = max(30, width * 0.1);
  let boxWidth = width - (marginX * 2);

  // 進度文字
  textSize(16);
  fill(119, 47, 25);
  textAlign(LEFT, TOP);
  text(`第 ${currentIdx + 1} 題 / 共 10 題`, marginX, 20);
  textAlign(CENTER, CENTER);

  // 題目方框 (稍微縮減高度，留給下方解析空間)
  fill(255, 250, 235);
  stroke(242, 166, 90);
  strokeWeight(2);
  rect(marginX, 45, boxWidth, 85, 10);

  noStroke();
  fill(50, 40, 30);
  textSize(min(16, width * 0.025));
  textStyle(BOLD);
  textWrap(WORD);
  text(qData.q, marginX + 15, 52, boxWidth - 30, 75);

  // 4個選項按鈕
  let optStartY = 140;
  let optH = 45;
  let optGap = 8;

  for (let i = 0; i < 4; i++) {
    let thisOptY = optStartY + i * (optH + optGap);
    let btnColor = color(242, 166, 90); // 選項顏色 #f2a65a

    if (hasAnswered) {
      if (i === qData.answer) {
        btnColor = color(46, 139, 87); // 正確答案顯示綠色
      } else if (i === selectedOption && selectedOption !== qData.answer) {
        btnColor = color(119, 47, 25); // 答錯時，使用者選錯的變成深紅棕 #772f1af
      }
    }

    fill(btnColor);
    noStroke();
    rect(marginX, thisOptY, boxWidth, optH, 8);

    fill(255);
    textSize(min(15, width * 0.024));
    textStyle(NORMAL);
    textAlign(LEFT, CENTER);
    let prefix = ["A. ", "B. ", "C. ", "D. "][i];
    text(prefix + qData.options[i], marginX + 15, thisOptY + optH / 2);
    textAlign(CENTER, CENTER);
  }

  // 作答後顯示完整解析區塊
  if (hasAnswered) {
    let explanationY = optStartY + 4 * (optH + optGap) + 5;
    
    // 解析背景框
    fill(255, 245, 220);
    stroke(119, 47, 25);
    strokeWeight(1.5);
    rect(marginX, explanationY, boxWidth, 75, 8);

    noStroke();
    fill(119, 47, 25);
    textSize(min(14, width * 0.022));
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    // 使用 textWrap 確保解析長文字能自動換行並完整顯示
    text("💡 解析：" + qData.explanation, marginX + 12, explanationY + 8, boxWidth - 24, 60);
    textAlign(CENTER, CENTER);

    // 繼續下一題提示
    textSize(14);
    textStyle(BOLD);
    fill(50, 40, 30);
    text("【請點擊畫面任意處繼續下一題】", width / 2, height - 20);
  }
}

// 3. 結算畫面
function drawResultScreen() {
  fill(255, 248, 235);
  stroke(242, 166, 90);
  strokeWeight(3);
  rectMode(CENTER);
  rect(width / 2, height / 2, min(600, width * 0.85), 350, 15);
  rectMode(CORNER);

  noStroke();
  fill(119, 47, 25);
  textSize(28);
  textStyle(BOLD);
  text("🏆 測驗結果結算 🏆", width / 2, height / 2 - 120);

  textSize(20);
  text(`你的總得分： ${score * 10} 分 (答對 ${score} 題)`, width / 2, height / 2 - 60);

  textSize(16);
  textStyle(NORMAL);
  let msg = score >= 8 ? "太強了！你就是情緒小達人！" : "很棒喔！多練習同理心會更厲害！";
  text(msg, width / 2, height / 2 - 10);

  textSize(15);
  fill(80, 50, 30);
  text("【請點擊畫面任意處重新挑戰】", width / 2, height / 2 + 80);
}

// 滑鼠點擊事件
function mousePressed() {
  if (gameState === "START") {
    gameState = "QUIZ";
    currentIdx = 0;
    score = 0;
    hasAnswered = false;
  } else if (gameState === "QUIZ") {
    if (hasAnswered) {
      // 點擊後進入下一題
      currentIdx++;
      hasAnswered = false;
      selectedOption = null;
      if (currentIdx >= questions.length) {
        gameState = "RESULT";
      }
      return;
    }

    // 檢查點擊了哪一個選項
    let marginX = max(30, width * 0.1);
    let boxWidth = width - (marginX * 2);
    let optStartY = 140;
    let optH = 45;
    let optGap = 8;

    for (let i = 0; i < 4; i++) {
      let thisOptY = optStartY + i * (optH + optGap);
      if (mouseX > marginX && mouseX < marginX + boxWidth && mouseY > thisOptY && mouseY < thisOptY + optH) {
        selectedOption = i;
        hasAnswered = true;
        let qData = questions[currentIdx];
        if (selectedOption === qData.answer) {
          score++;
        }
      }
    }
  } else if (gameState === "RESULT") {
    // 重新開始
    gameState = "START";
    currentIdx = 0;
    score = 0;
    hasAnswered = false;
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function touchStarted() {
  return false;
}