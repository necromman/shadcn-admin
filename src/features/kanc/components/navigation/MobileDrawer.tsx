import { useState } from 'react'
import { X, ChevronDown, ChevronUp, ChevronRight } from 'lucide-react'
import { MenuItem } from '@/features/kanc/data/menu.mock'
import { cn } from '@/lib/utils'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  menuItems: MenuItem[]
}

export function MobileDrawer({ isOpen, onClose, menuItems }: MobileDrawerProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [showAllItems, setShowAllItems] = useState<Record<string, boolean>>({})

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

      <div className="fixed right-0 top-0 h-full w-80 bg-background shadow-xl z-50 lg:hidden overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b bg-card">
          <h2 className="font-semibold text-lg">메뉴</h2>
          <button onClick={onClose} className="p-2 hover:bg-accent rounded-md transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-3">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id} className="border-b border-border/50 last:border-b-0">
                <button
                  onClick={() => item.children && toggleExpand(item.id)}
                  className={cn(
                    "w-full flex justify-between items-center px-3 py-3 text-left rounded-md transition-all",
                    "hover:bg-accent",
                    expandedItems.includes(item.id) && "bg-accent/50"
                  )}
                >
                  <span className="font-medium text-sm">{item.title}</span>
                  {item.children && (
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      expandedItems.includes(item.id) && "rotate-180"
                    )} />
                  )}
                </button>

                {item.children && expandedItems.includes(item.id) && (
                  <div className="py-2">
                    <ul className="space-y-0.5">
                      {/* 처음 5개만 표시, 나머지는 "더보기" */}
                      {(showAllItems[item.id] ? item.children : item.children.slice(0, 5)).map((child) => (
                        <li key={child.id} className="ml-3">
                          {child.children ? (
                            <div>
                              <button
                                onClick={() => toggleExpand(child.id)}
                                className={cn(
                                  "w-full flex justify-between items-center px-3 py-2 text-left text-sm rounded-md transition-all",
                                  "hover:bg-accent text-muted-foreground hover:text-foreground",
                                  expandedItems.includes(child.id) && "bg-accent/50"
                                )}
                              >
                                <span>{child.title}</span>
                                <ChevronRight className={cn(
                                  "w-3 h-3 transition-transform duration-200",
                                  expandedItems.includes(child.id) && "rotate-90"
                                )} />
                              </button>

                              {expandedItems.includes(child.id) && (
                                <ul className="ml-3 mt-1 space-y-0.5">
                                  {/* 2depth도 처음 3개만 표시 */}
                                  {(showAllItems[child.id] ? child.children : child.children.slice(0, 3)).map((subChild) => (
                                    <li key={subChild.id}>
                                      {subChild.children ? (
                                        <div>
                                          <button
                                            onClick={() => toggleExpand(subChild.id)}
                                            className="w-full flex justify-between items-center px-3 py-1.5 text-left text-xs text-muted-foreground hover:text-primary hover:bg-accent/50 rounded"
                                          >
                                            <span>· {subChild.title}</span>
                                            <ChevronRight className={cn(
                                              "w-3 h-3 transition-transform duration-200",
                                              expandedItems.includes(subChild.id) && "rotate-90"
                                            )} />
                                          </button>
                                          {expandedItems.includes(subChild.id) && (
                                            <ul className="ml-4 mt-1 space-y-0.5">
                                              {subChild.children.slice(0, 3).map((subSubChild) => (
                                                <li key={subSubChild.id}>
                                                  <a
                                                    href={subSubChild.path}
                                                    className="block px-3 py-1 text-xs text-muted-foreground/70 hover:text-primary hover:bg-accent/30 rounded"
                                                    onClick={onClose}
                                                  >
                                                    - {subSubChild.title}
                                                  </a>
                                                </li>
                                              ))}
                                            </ul>
                                          )}
                                        </div>
                                      ) : (
                                        <a
                                          href={subChild.path}
                                          className="block px-3 py-1.5 text-xs text-muted-foreground hover:text-primary hover:bg-accent/50 rounded"
                                          onClick={onClose}
                                        >
                                          · {subChild.title}
                                        </a>
                                      )}
                                    </li>
                                  ))}

                                  {/* 2depth 더보기 버튼 */}
                                  {child.children.length > 3 && !showAllItems[child.id] && (
                                    <li>
                                      <button
                                        onClick={() => setShowAllItems(prev => ({ ...prev, [child.id]: true }))}
                                        className="px-3 py-1.5 text-xs text-primary hover:underline"
                                      >
                                        + {child.children.length - 3}개 더보기
                                      </button>
                                    </li>
                                  )}
                                </ul>
                              )}
                            </div>
                          ) : (
                            <a
                              href={child.path}
                              className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-accent rounded-md"
                              onClick={onClose}
                            >
                              {child.title}
                            </a>
                          )}
                        </li>
                      ))}

                      {/* 1depth 더보기 버튼 */}
                      {item.children.length > 5 && !showAllItems[item.id] && (
                        <li className="ml-3">
                          <button
                            onClick={() => setShowAllItems(prev => ({ ...prev, [item.id]: true }))}
                            className="px-3 py-2 text-sm text-primary hover:underline font-medium"
                          >
                            + {item.children.length - 5}개 메뉴 더보기
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}