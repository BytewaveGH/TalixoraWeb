import { BuildingOffice2Icon, FireIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import type { ModuleKey } from '@/content/site'

const icons: Record<ModuleKey, typeof FireIcon> = {
  'real-estate': BuildingOffice2Icon,
  eatery: FireIcon,
  pos: ShoppingCartIcon,
}

export function ModuleIcon({ module, className }: { module: ModuleKey; className?: string }) {
  const Icon = icons[module]
  return <Icon aria-hidden="true" className={className} />
}
