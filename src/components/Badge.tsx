import { theme, type CollectionStatus } from '@/tokens'

type Props = {
  status: CollectionStatus
  label?: string
  className?: string
}

const statusLabels: Record<CollectionStatus, string> = {
  current: 'Current',
  returning: 'Returning',
  'coming-soon': 'Coming Soon',
  archived: 'Archived',
}

export default function Badge({ status, label, className = '' }: Props) {
  const colors = theme.colors.badges[status]
  return (
    <span
      className={`inline-flex items-center text-xs tracking-widest uppercase px-3 py-1 rounded-full ${className}`}
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {label ?? statusLabels[status]}
    </span>
  )
}
