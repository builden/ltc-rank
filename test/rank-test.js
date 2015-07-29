var expect = require('chai').expect;
var rank = require('../lib/rank.js');

var initRankInfos = [];
describe('ltc-rank', function() {
  before(function() {
    initRankInfos.push({ id: 'user1', score: 100 });
    initRankInfos.push({ id: 'user2', score: 300 });
    initRankInfos.push({ id: 'user3', score: 120 });
    initRankInfos.push({ id: 'user4', score: 101 });
    initRankInfos.push({ id: 'user5', score: 121 });
    initRankInfos.push({ id: 'user6', score: 101 });
    initRankInfos.push({ id: 'user7', score: 102 });

    rank.create('default', initRankInfos, 4, 'id', function(a, b) {
      return a.score < b.score;
    });
  });

  it('init rank', function() {
    var testRank = rank.create('test', initRankInfos, 5, 'id', function(a, b) {
      return a.score < b.score;
    });
    var rankList = testRank.getRankList();
    console.log(rankList);
    expect(rankList.length).to.equal(5);
    expect(rankList[0].score).to.equal(300);

    testRank.insert({ id: 'user3',  score: 301 });
    rankList = testRank.getRankList();
    console.log(rankList);
    expect(rankList[0].score).to.equal(301);

    testRank.insert({ id: 'user1', score: 130 });
    rankList = testRank.getRankList();
    console.log(rankList);
    expect(rankList[2].score).to.equal(130);
  });

  it('get exit rank', function() {
    var defRank = rank.get('default');
    var rankList = defRank.getRankList();
    expect(rankList.length).to.equal(4);

    defRank.clear();
    rankList = defRank.getRankList();
    expect(rankList.length).to.equal(0);
  });
});