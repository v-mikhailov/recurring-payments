export const logger = {
  error: (...params: (string | number | object)[]) => {
    console.error(...params)
  },

  info: (...params: (string | number | object)[]) => {
    console.log(...params)
  }
}

