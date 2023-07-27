/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      backgroundImage:{
        "banner":"url(http://image.tmdb.org/t/p/original//dlrWhn0G3AtxYUx2D9P2bmzcsvF.jpg)"
      }
    },
  },
  plugins: [],
}

