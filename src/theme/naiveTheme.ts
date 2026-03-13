import type { GlobalThemeOverrides } from 'naive-ui'

/**
 * Naive UI 主题配置，与 tailwind.css 中的 @theme 配色保持一致
 */
export const naiveThemeOverrides: GlobalThemeOverrides = {
  common: {
    fontFamily: "'Inter', 'Noto Sans SC', system-ui, sans-serif",
    fontSize: '16px',
    fontWeight: '400',

    /* 主色 - 对应 --color-primary */
    primaryColor: '#09a4ff',
    primaryColorHover: '#008fe5',
    primaryColorPressed: '#008fe5',
    primaryColorSuppl: '#09a4ff',

    /* 成功色 - 对应 --color-success */
    successColor: '#4cd97b',
    successColorHover: '#3bc76a',
    successColorPressed: '#3bc76a',
    successColorSuppl: '#4cd97b',

    /* 警告色 - 对应 --color-warning */
    warningColor: '#ffd14c',
    warningColorHover: '#fcc138',
    warningColorPressed: '#fcc138',
    warningColorSuppl: '#ffd14c',

    /* 错误色 - 对应 --color-error */
    errorColor: '#ff3b08',
    errorColorHover: '#e03a3a',
    errorColorPressed: '#e03a3a',
    errorColorSuppl: '#ff3b08',

    /* 信息色 - 与主色一致 */
    infoColor: '#09a4ff',
    infoColorHover: '#008fe5',
    infoColorPressed: '#008fe5',
    infoColorSuppl: '#09a4ff',

    /* 文本色 - 对应 --text-color-* */
    textColor1: '#1d1d1d',
    textColor2: '#77859a',
    textColor3: '#a1acb5',
  },
}
