module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        "primary-bg": '#F1F1F2',
        blur: '#030303',
      },
      colors: {
        primary: '#FF4365',
        secondary: "#F0A202",
        highlight: "#00D9C0",
        white: "#FFFFFF",
        black: "#030301"
      },
      backgroundImage: {
        'blurred-img':
          "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsaaJ7s4lqcBF4IDROVPzrlL5fexcwRmDlnuEYQenWTt1DejFY5kmYDref2a0Hp2eE4aw&usqp=CAU')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
};