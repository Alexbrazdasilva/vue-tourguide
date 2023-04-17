/**
 * Log messages for bread tour guide
 * @param {'warn' | 'error' | 'success'} type
 */
export function logger(type, message) {
  const buildFrendlyMessage = (message) => `[🍞] - ${message}`

  switch (type) {
    case 'success':
      return console.log(buildFrendlyMessage(message))

    case 'error':
      return console.error(buildFrendlyMessage(message))

    case 'warn':
      return console.warn(buildFrendlyMessage(message))
  }
}
