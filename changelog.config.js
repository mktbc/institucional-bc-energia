module.exports = {
  disableEmoji: false,
  questions: ['type', 'subject'],
  list: ['chore', 'feat', 'fix', 'test', 'refactor', 'docs', 'merge'],
  maxMessageLength: 50,
  minMessageLength: 3,
  types: {
    chore: {
      description: 'Build process or auxiliary tool changes',
      emoji: '📦',
      value: 'chore'
    },
    feat: {
      description: 'A new feature',
      emoji: '✨',
      value: 'feat'
    },
    fix: {
      description: 'A bug fix',
      emoji: '🐛',
      value: 'fix'
    },
    test: {
      description: 'Adding missing tests',
      emoji: '🧪',
      value: 'test'
    },
    refactor: {
      description: 'A code change that neither fixes a bug or adds a feature',
      emoji: '💡',
      value: 'refactor'
    },
    docs: {
      description: 'Documentation only changes',
      emoji: '📚',
      value: 'docs'
    },
    merge: {
      description: 'Merge branchs',
      emoji: '🧬',
      value: 'merge'
    }
  }
}
