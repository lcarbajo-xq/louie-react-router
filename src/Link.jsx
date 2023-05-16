import { EVENTS, MOUSE_BUTTONS } from './consts'

function navigate(href) {
  window.history.pushState({}, '', href)
  const navigationEvent = new Event(EVENTS.PUSHSTATE)
  window.dispatchEvent(navigationEvent)
}

export function Link({ target, to, ...props }) {
  const handleClick = (event) => {
    // Click con el botón princial del ratón
    const isMainEvent = event.button === MOUSE_BUTTONS.PRIMARY

    // Pulsación de teclas especiales para links
    const isModifiedEvent =
      event.metaKey || event.altKey || event.ctrlKey || event.shiftKey

    // El target por defecto es abrir en la misma pestaña
    const isManageableEvent = target === undefined || target === '_self'

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault()
      navigate(to)
    }
  }
  return <a href={to} onClick={handleClick} target={target} {...props} />
}
