// setup/windicss.ts

import { defineWindiSetup } from '@slidev/types'

// 对内部 windicss 配置进行扩展
export default defineWindiSetup(() => ({
  shortcuts: {
    // 自定义默认背景
    'bg-main': 'bg-white text-[#181818] dark:bg-[#121212] dark:text-[#ddd]',
  },
  theme: {
    extend: {
      // 字体可以被替换，请记得更新 `index.html` 中的字体链接
      fontFamily: {
        sans: 'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
        mono: '"Fira Code", monospace',
      },
    },
  },
}))