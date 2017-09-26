module.exports = {
  plugins: {
    'autoprefixer': process.env.NODE_ENV == 'production' ? options.autoprefixer : false
    //'autoprefixer': {},
  }
}