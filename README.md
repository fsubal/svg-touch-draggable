# svg-touch-draggable

**Currently WIP, NOT READY FOR PRODUCTION**

Make your svg draggable in touch devices.

## Why `svg-touch-draggable` ?

Since you cannot make SVG Element draggable with [HTML5 Drag & Drop API](https://www.w3.org/TR/2010/WD-html5-20101019/dnd.html),
you always need to write `onmousemove` or `ontouchstart` and whatever else.

As for mouse devices (I mean desktop PCs), [Snap.svg](http://snapsvg.io/docs/#Element.drag) already gives you neat `.drag()` method
to accomplish it. For touch devices, however, Snap.svg does not support them.

`svg-touch-draggable` gives simple solution for drag in touch devices.

## Usage

Just `new()` it. You can use `onDrag`, `onDragStart`, `onDragEnd`

```ts
import TouchDraggable from 'svg-touch-draggable'

const draggable = new TouchDraggable(element)
draggable.onDrag((dx, dy) => console.log(dx, dy))
draggable.onDragStart(...)
draggable.onDragEnd(...)
```

You can call `.dispose()` to unbind all handlers.

```ts
draggable.dispose()
```

## Examples

### With React.js

```ts
componentDidMount() {
  this.draggable = new TouchDraggable(this.ref.current!)
  this.draggable.onDrag(this.handleDrag.bind(this))
}

componentWillUnmount() {
  this.draggable.dispose()
}
```

## Roadmaps

- release 1.0
- support also mouse event
  - to be alternative for `Snap.svg#drag`
  - then rename to more general names
- make monorepo, with subpackage like `svg-draggable-react`
  - export something like `useDraggable` hooks.
