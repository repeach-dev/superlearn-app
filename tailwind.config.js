/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Pretendard-Regular'],
                thin: ['Pretendard-Thin'],
                extralight: ['Pretendard-ExtraLight'],
                light: ['Pretendard-Light'],
                medium: ['Pretendard-Medium'],
                semibold: ['Pretendard-SemiBold'],
                bold: ['Pretendard-Bold'],
                extrabold: ['Pretendard-ExtraBold'],
                black: ['Pretendard-Black'],
            },
            colors: {
                icon: {
                    DEFAULT: '#64748b',
                },
                nav: {
                    active: '#fef2f2',
                    'active-text': '#ef4444',
                    'inactive-text': '#64748b',
                },
            },
            fontSize: {
                'nav-web': ['15px', { lineHeight: '1.4' }],
                'nav-electron': ['12px', { lineHeight: '1.4' }],
            },
        },
    },
    plugins: [],
}
