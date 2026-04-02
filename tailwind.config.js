/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
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
                // 고정 색상 (모드 무관)
                accent: {
                    DEFAULT: '#ff5c5c',
                    dark: '#ff0a0a',
                },
                error: '#ff5b5c',
                brand: '#ff3d3d',
                // 기존 색상 유지
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
