import {
  LuArrowDown,
  LuArrowRight,
  LuArrowUp,
  LuCircle,
  LuCircleCheck,
  LuCircleAlert,
  LuTimer,
  LuCircleHelp,
  LuCircleOff,
} from 'react-icons/lu'

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
]

export const statuses = [
  {
    label: 'Backlog',
    value: 'backlog' as const,
    icon: LuCircleHelp,
  },
  {
    label: 'Todo',
    value: 'todo' as const,
    icon: LuCircle,
  },
  {
    label: 'In Progress',
    value: 'in progress' as const,
    icon: LuTimer,
  },
  {
    label: 'Done',
    value: 'done' as const,
    icon: LuCircleCheck,
  },
  {
    label: 'Canceled',
    value: 'canceled' as const,
    icon: LuCircleOff,
  },
]

export const priorities = [
  {
    label: 'Low',
    value: 'low' as const,
    icon: LuArrowDown,
  },
  {
    label: 'Medium',
    value: 'medium' as const,
    icon: LuArrowRight,
  },
  {
    label: 'High',
    value: 'high' as const,
    icon: LuArrowUp,
  },
  {
    label: 'Critical',
    value: 'critical' as const,
    icon: LuCircleAlert,
  },
]
