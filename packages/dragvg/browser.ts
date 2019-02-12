let passiveEventsResult: boolean | undefined

/**
 * @see https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
 */
export function supportsPassive(): boolean {
  if (passiveEventsResult !== undefined) {
    return passiveEventsResult
  }

  passiveEventsResult = false
  try {
    const options = Object.defineProperty({}, 'passive', {
      get() {
        passiveEventsResult = true
      },
    })

    window.addEventListener('test', test, options)
    window.removeEventListener('test', test)
  } catch (e) {
    // test failed
  }

  return passiveEventsResult

  function test() {
    return
  }
}
