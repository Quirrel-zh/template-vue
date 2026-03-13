function debounce<T extends (...args: any[]) => void>(fn: T, wait = 100) {
  let timer: number | undefined
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer)
    timer = window.setTimeout(fn, wait, ...args)
  }
}

export default debounce
