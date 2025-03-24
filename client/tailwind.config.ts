import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        custom: '10px 10px 0 0 #6741D9',
        custom2: '10px 10px 0 0 black',
      },
      keyframes: {
        fadein: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '0.7',
          },
        },
        slidein: {
          '0%': {
            transform: 'translateX(0%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        slideout: {
          '0%': {
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(0%)',
          },
        },
      },
      animation: {
        slidein: 'slidein 500ms ease-in forwards',
        slideout: 'slideout 500ms ease-in forwards',
        fadein: 'fadein 500ms ease-in forwards',
      },
    },
  },
  plugins: [],
};
export default config;
