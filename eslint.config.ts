import antfu from '@antfu/eslint-config'
import prettier from 'eslint-config-prettier'

export default antfu({
  vue: true,

  // 关键：关闭 ESLint 格式化
  stylistic: false,
  formatters: false,

  rules: {
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    '@typescript-eslint/no-explicit-any': 0,
  },
}).append(prettier)
