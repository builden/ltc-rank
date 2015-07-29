# ltc-rank
ltc-rank for record rank info

## How to use
```js
var rank = require('ltc-rank');
var worldRanksInfos = [
  { id: 'user1', score: 1000 },
  { id: 'user2', score: 1001 },
  { id: 'user3', score: 999  }
];
var maxRankNum = 10;   // 排名最多记录的个数
var worldRank = rank.create('worldRank', worldRankInfos, maxRankNum, function(a, b) {
  return a.score > b.score;
});

// 获取当前的排名信息
var currRank = worldRank.getRankList();

// 更新用户信息
worldRank.insert({ id: 'user3', score: 1002 });

// 清空排名信息
worldRank.clear();

// 在新的JS模块中获取排名对象，如果还没创建则返回null
var world = rank.get('worldRank');
```

## Installation
```sh
npm install --save ltc-rank
```

## Tests
```sh
npm install
npm test
```