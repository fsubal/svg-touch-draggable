import { AxisX, Pixel, AxisY } from './types'
import { supportsPassive } from './browser'

export default class Draggable<E extends SVGElement> {
  private initialTouch:
    | {
        x: AxisX<Pixel>
        y: AxisY<Pixel>
      }
    | undefined

  private onDragHanlder: (dx: AxisX<Pixel>, dy: AxisY<Pixel>, _x: never, _y: never, e: Event) => void
  private onStartHanlder: () => void
  private onEndHanlder: (e: Event) => void

  get passiveOrUseCapture() {
    return supportsPassive() ? { passive: true } : false
  }

  constructor(private element: E) {
    this.element.addEventListener('touchstart', this._onTouchStart, this.passiveOrUseCapture)
    this.element.addEventListener('touchmove', this._onTouchMove, this.passiveOrUseCapture)
    this.element.addEventListener('touchend', this._onTouchEnd, this.passiveOrUseCapture)
  }

  onDrag = (handler: (dx: AxisX<Pixel>, dy: AxisY<Pixel>, _x: never, _y: never, e: Event) => void) =>
    (this.onDragHanlder = handler)

  onStart = (handler: () => void) => (this.onStartHanlder = handler)
  onEnd = (handler: (e: Event) => void) => (this.onEndHanlder = handler)

  dispose = () => {
    this.element.removeEventListener('touchstart', this._onTouchStart)
    this.element.removeEventListener('touchmove', this._onTouchMove)
    this.element.removeEventListener('touchend', this._onTouchEnd)
  }

  private readonly _onTouchStart = (e: TouchEvent) => {
    e.stopPropagation()

    if (!e.currentTarget || !e.target) {
      return
    }

    // ピンチズーム とかで誤動作させない
    if (e.changedTouches.length !== 1) {
      return
    }

    if (this.onStartHanlder) {
      this.onStartHanlder()
    }

    const touch = e.changedTouches[0]
    this.initialTouch = {
      x: touch.clientX as AxisX<Pixel>,
      y: touch.clientY as AxisY<Pixel>,
    }
  }

  private readonly _onTouchMove = (e: TouchEvent) => {
    e.stopPropagation()

    if (!e.currentTarget || !e.target) {
      return
    }

    // prevent false positive reaction to pinch zoom
    if (e.changedTouches.length !== 1) {
      return
    }

    if (this.initialTouch === undefined) {
      return
    }

    const { x, y } = this.initialTouch
    const { clientX, clientY } = e.changedTouches[0]

    const dx = (clientX - x) as AxisX<Pixel>
    const dy = (clientY - y) as AxisY<Pixel>

    if (this.onDragHanlder) {
      this.onDragHanlder(dx, dy, null as never, null as never, e) // 3番めと4番目は使わないでくれ
    }
  }

  private readonly _onTouchEnd = (e: TouchEvent) => {
    e.stopPropagation()

    if (this.onEndHanlder) {
      this.onEndHanlder(e)
    }
    this.initialTouch = undefined
  }
}
