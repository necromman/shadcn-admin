import { useState } from 'react'
import { X, ChevronDown, ChevronUp } from 'lucide-react'
import { MenuItem } from '@/features/kanc/data/menu.mock'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  menuItems: MenuItem[]
}

export function MobileDrawer({ isOpen, onClose, menuItems }: MobileDrawerProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpand = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />

      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-50 lg:hidden overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold text-lg">메뉴</h2>
          <button onClick={onClose} className="p-2">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => item.children && toggleExpand(item.id)}
                  className="w-full flex justify-between items-center p-3 text-left hover:bg-gray-50 rounded"
                >
                  <span className="font-medium">{item.title}</span>
                  {item.children && (
                    expandedItems.includes(item.id) ?
                      <ChevronUp className="w-5 h-5" /> :
                      <ChevronDown className="w-5 h-5" />
                  )}
                </button>

                {item.children && expandedItems.includes(item.id) && (
                  <ul className="ml-4 mt-2 space-y-1">
                    {item.children.map((child) => (
                      <li key={child.id}>
                        <a
                          href={child.path}
                          className="block p-2 text-sm text-gray-600 hover:text-[#002D83] hover:bg-gray-50 rounded"
                          onClick={onClose}
                        >
                          {child.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}