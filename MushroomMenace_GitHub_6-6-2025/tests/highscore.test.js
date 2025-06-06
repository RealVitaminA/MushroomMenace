describe('HighScoreManager', () => {
  let manager;
  let HighScoreManager;
  beforeEach(() => {
    jest.resetModules();
    global.localStorage = {
      store: {},
      getItem(key) { return this.store[key] || null; },
      setItem(key, value) { this.store[key] = value; },
      clear() { this.store = {}; }
    };
    global.screenManager = { showHighScoreScreen: jest.fn() };
    HighScoreManager = require('../js/highscore.js').HighScoreManager;
    manager = new HighScoreManager();
  });

  afterEach(() => {
    delete global.localStorage;
    delete global.screenManager;
  });

  test('adds scores and sorts descending', () => {
    manager.addScore('Alice', 50);
    manager.addScore('Bob', 100);
    manager.addScore('Carol', 75);
    expect(manager.scores.map(s => s.name)).toEqual(['BOB', 'CAROL', 'ALICE']);
    expect(manager.scores.map(s => s.score)).toEqual([100, 75, 50]);
  });

  test('rejects zero scores', () => {
    const result = manager.addScore('Zero', 0);
    expect(result).toBe(false);
    expect(manager.scores.length).toBe(0);
  });
});
