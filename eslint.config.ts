import antfu from '@antfu/eslint-config'
import prettier from 'eslint-config-prettier'

export default antfu({
  vue: true,

  stylistic: false,
  formatters: false,

  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    '@typescript-eslint/no-explicit-any': 0,
  },
})
  .append(prettier)
  .append({
    ignores: ['README.md', '.cursor/**'],
  })
