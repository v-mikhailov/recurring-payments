export default {
  plugins: {
    'postcss-import': {},           // Импорты CSS файлов
    'postcss-mixins': {},           // Миксины как в SASS
    'postcss-functions': {},        // Пользовательские функции
    'postcss-nested': {},           // Нестинг (у вас есть)
    'postcss-custom-properties': {  // CSS переменные (у вас есть)
      preserve: false               // Убирает переменные после компиляции
    },
    'autoprefixer': {}              // Автопрефиксы (у вас есть)
  }
}