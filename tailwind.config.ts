import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        title: ['"Noto Serif TC"'], // Googleフォントの名前をここに追加
      },
      colors: {
        // Light colors
        'primary-light': '#F7F8FC',
        'secondary-light': '#FFFFFF',
        'ternary-light': '#f6f7f8',

        // Dark colors
        'primary-dark': '#0D2438',
        'secondary-dark': '#102D44',
        'ternary-dark': '#1E3851',
      },
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
      boxShadow: {
        'custom-light':
          '0 10px 15px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -4px rgba(255, 255, 255, 0.1)',
        'custom-dark':
          '0 10px 15px -3px rgba(243,244,246, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
      },
      padding: {
        'custom-pb': 'calc((284 / 600) * 100%)', // ここでカスタムクラスを定義
      },
    },
  },
  plugins: [],
} satisfies Config;
export default config;
