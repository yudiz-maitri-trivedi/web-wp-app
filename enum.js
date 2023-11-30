const enums = {
    eGender: {
      values: ['f', 'm', 'o'],
      description: { f: 'Female', m: 'Male', o: 'Other' },
      map: { female: 'f', male: 'm' }
    },
    eUserStatus: {
      values: ['a', 'b', 'd'],
      default: 'a',
      description: { a: 'Active', b: 'Blocked', d: 'Deactivated' }
    },
    eStatus: {
      values: ['a', 'd'],
      default: 'a',
      description: { a: 'Active', d: 'Deactivated' }
    },
    supportedLanguages: {
      values: ['en', 'hi', 'de'],
      default: 'en',
      description: { en: 'English', hi: 'Hindi', de: 'German' }
    }
  }
  
  module.exports = enums
  