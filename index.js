// ゲームに関する変数や関数を定義
// カードデッキの作成、カードの値の計算、ゲームの進行などを行う

// デッキの作成
const deck = [
  // カード情報を配列に格納（例： { suit: 'ハート', value: 'A' }）
  // 52枚のカードを作成（スートごとに13枚ずつ）
];

// ゲームの初期化（ディール、スコア計算など）

// Dealボタンのクリック処理
document.getElementById('deal-button').addEventListener('click', () => {
  // ゲームの開始処理
});

// Hitボタンのクリック処理
document.getElementById('hit-button').addEventListener('click', () => {
  // プレイヤーがカードを追加する処理
});

// Standボタンのクリック処理
document.getElementById('stand-button').addEventListener('click', () => {
  // ディーラーの手番（カードを引く処理）と勝敗判定
});
// グローバル変数
const suits = ['ハート', 'ダイヤ', 'スペード', 'クローバー'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

let deck = [];
let playerCards = [];
let dealerCards = [];

// ゲームの初期化
function startGame() {
  deck = createDeck();
  shuffleDeck(deck);
  playerCards = [];
  dealerCards = [];
  dealCards();
}

// デッキの作成
function createDeck() {
  const newDeck = [];
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    for (let valueIndex = 0; valueIndex < values.length; valueIndex++) {
      const card = {
        suit: suits[suitIndex],
        value: values[valueIndex]
      };
      newDeck.push(card);
    }
  }
  return newDeck;
}

// デッキをシャッフルする
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// カードを配る
function dealCards() {
  playerCards.push(deck.pop());
  dealerCards.push(deck.pop());
  playerCards.push(deck.pop());
  dealerCards.push(deck.pop());

  updateScores();
}

// スコアを更新する
function updateScores() {
  const playerScore = calculateScore(playerCards);
  const dealerScore = calculateScore(dealerCards);

  // スコアを表示する処理を記述

  // 勝敗を判定する処理を記述
}

// カードの値を計算する
function calculateScore(cards) {
  let score = 0;
  let hasAce = false;

  for (let i = 0; i < cards.length; i++) {
    const cardValue = cards[i].value;

    if (cardValue === 'A') {
      hasAce = true;
    }

    if (cardValue === 'J' || cardValue === 'Q' || cardValue === 'K') {
      score += 10;
    } else if (cardValue !== 'A') {
      score += parseInt(cardValue);
    }
  }

  if (hasAce && score + 11 <= 21) {
    score += 11;
  } else if (hasAce) {
    score += 1;
  }

  return score;
}

// プレイヤーがカードを引く
function hit() {
  playerCards.push(deck.pop());
  updateScores();
}

// ディーラーの手番（カードを引く）
function dealerTurn() {
  const dealerScore = calculateScore(dealerCards);
  const playerScore = calculateScore(playerCards);

  while (dealerScore < 17) {
    dealerCards.push(deck.pop());
    dealerScore = calculateScore(dealerCards);
  }

  updateScores();
}

// 勝敗を判定する
function determineWinner() {
  const playerScore = calculateScore(playerCards);
  const dealerScore = calculateScore(dealerCards);

  // 勝敗を表示する処理を記述
}

// プレイヤーがスタンドする
function stand() {
  dealerTurn();
  determineWinner();
}

// ゲームを開始するための初期化
startGame();
