import { flip, offset, shift } from '@floating-ui/dom'

export const DEFAULT_OPTIONS = {
  placement: 'top',
  strategy: 'fixed',
  middleware: [shift(), flip(), offset(20)],
}

export const MOVETO_OPTIONS = {
  tolerance: 0,
  duration: 10,
  easing: 'easeOutQuart',
  container: window,
}

export const DEFAULT_STATUS = {
  NEXT: 'NEXT',
  PREV: 'PREV',
  FINISH: 'FINISH',
  RESTARTED: 'RESTARTED',
}
