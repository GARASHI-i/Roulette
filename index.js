
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

  const playerScoreElement = document.querySelector('.player-score');
  const dealerScoreElement = document.querySelector('.dealer-score');

  playerScoreElement.textContent = playerScore;
  dealerScoreElement.textContent = dealerScore;

  determineWinner(playerScore, dealerScore);
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
function determineWinner(playerScore, dealerScore) {
  // 勝敗を表示する処理を記述
  const result = document.createElement('h2');
  const gameContainer = document.querySelector('.game');
  if (playerScore > 21) {
    result.textContent = 'プレイヤーがバーストしました。ディーラーの勝利です。';
  } else if (dealerScore > 21) {
    result.textContent = 'ディーラーがバーストしました。プレイヤーの勝利です。';
  } else if (playerScore === dealerScore) {
    result.textContent = '引き分けです。';
  } else if (playerScore > dealerScore) {
    result.textContent = 'プレイヤーの勝利です。';
  } else {
    result.textContent = 'ディーラーの勝利です。';
  }
  gameContainer.appendChild(result);
}

// プレイヤーがスタンドする
function stand() {
  dealerTurn();
}

// Dealボタンのクリック処理
document.getElementById('deal-button').addEventListener('click', startGame);

// Hitボタンのクリック処理
document.getElementById('hit-button').addEventListener('click', hit);

// Standボタンのクリック処理
document.getElementById('stand-button').addEventListener('click', stand);

// ゲームを開始するための初期化
startGame();
