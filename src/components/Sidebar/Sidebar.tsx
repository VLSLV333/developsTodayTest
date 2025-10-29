import { useEffect, useRef, useState } from 'react'

import styles from './Sidebar.module.css'

export type SidebarItem = {
    id: string
    label: string
    href?: string
    children?: SidebarItem[]
}

type SidebarProps = {
    isOpen: boolean
    title?: string
    onClose: () => void
    providedItems?: SidebarItem[]
}

let items: SidebarItem[] = [
    { id: 'home', label: 'Home', href: '#' },
    {
        id: 'products',
        label: 'Products',
        children: [
            { id: 'new', label: 'New Arrivals', href: '#' },
            {
                id: 'categories',
                label: 'Categories',
                children: [
                    { id: 'shirts', label: 'Shirts', href: '#' },
                    { id: 'pants', label: 'Pants', href: '#' },
                ],
            },
            { id: 'sale', label: 'On Sale', href: '#' },
        ],
    },
    {
        id: 'account',
        label: 'Account',
        children: [
            { id: 'profile', label: 'Profile', href: '#' },
            { id: 'orders', label: 'Orders', href: '#' },
        ],
    },
    { id: 'contact', label: 'Contact', href: '#' },
]

export default function Sidebar({ isOpen, title = 'Menu', onClose, providedItems }: SidebarProps) {
    const overlayRef = useRef<HTMLDivElement | null>(null)
    const panelRef = useRef<HTMLDivElement | null>(null)

    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) {
            document.addEventListener('keydown', handleKey)
        }
        return () => document.removeEventListener('keydown', handleKey)
    }, [isOpen, onClose])

    useEffect(() => {
        if (!isOpen) {
            setExpandedIds(new Set())
        }
    }, [isOpen])

    const toggleExpanded = (idPath: string) => {
        setExpandedIds(prev => {
            const next = new Set(prev)
            if (next.has(idPath)) {
                next.forEach((value) => {
                    if (value === idPath || value.startsWith(idPath + '/')) {
                        next.delete(value)
                    }
                })
            } else {
                next.add(idPath)
            }
            return next
        })
    }

    const rootId = 'root'

    if (providedItems) {
        items = providedItems
    }

    return (
        <>
            <div
                ref={overlayRef}
                className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
                onClick={onClose}
            />

            <div
                ref={panelRef}
                className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}
                role="dialog"
                aria-modal="true"
                aria-label={title}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.header}>
                    <h3 className={styles.title}>{title}</h3>
                    <button className={styles.closeBtn} aria-label="Close" onClick={onClose}>×</button>
                </div>

                <div className={styles.content}>
                    <ul className={styles.menu}>
                        {items.map((item) => (
                            <MenuItem
                                key={item.id}
                                parentId={rootId}
                                item={item}
                                expandedIds={expandedIds}
                                onToggle={toggleExpanded}
                                level={1}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

function MenuItem({
    parentId,
    item,
    expandedIds,
    onToggle,
    level,
}: {
    parentId: string
    item: SidebarItem
    expandedIds: Set<string>
    onToggle: (idPath: string) => void
    level: 1 | 2 | 3
}) {
    const idPath = `${parentId}/${item.id}`
    const hasChildren = Array.isArray(item.children) && item.children.length > 0
    const isExpanded = expandedIds.has(idPath)

    // max-height animation via CSS; no measurement required

    if (!hasChildren) {
        if (item.href) {
            return (
                <li className={styles.item}>
                    <a className={styles.leafLink} href={item.href}>
                        {item.label}
                    </a>
                </li>
            )
        }
        return (
            <li className={styles.item}>
                <button className={styles.itemBtn} type="button">
                    {item.label}
                </button>
            </li>
        )
    }

    return (
        <li className={styles.item}>
            <button
                className={styles.itemBtn}
                type="button"
                aria-expanded={isExpanded}
                onClick={() => onToggle(idPath)}
            >
                <span>{item.label}</span>
                <span className={`${styles.caret} ${isExpanded ? styles.caretOpen : ''}`}>▶</span>
            </button>
            <div className={`${styles.submenu} ${isExpanded ? styles.submenuOpen : ''}`}>
                <div className={`${styles.submenuInner} ${level >= 2 ? styles.level2Inner : ''}`}>
                    <ul className={styles.menu}>
                        {(item.children || []).map(child => {
                            const nextLevel = (level === 3 ? 3 : (level + 1)) as 1 | 2 | 3
                            return (
                                <MenuItem
                                    key={child.id}
                                    parentId={idPath}
                                    item={child}
                                    expandedIds={expandedIds}
                                    onToggle={onToggle}
                                    level={nextLevel}
                                />
                            )
                        })}
                    </ul>
                </div>
            </div>
        </li>
    )
}


