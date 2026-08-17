import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import * as Dialog from '@radix-ui/react-dialog'
import * as Accordion from '@radix-ui/react-accordion'
import { nav } from '../data/nav'

function NavAnchor({ item, className, onClick, ariaCurrent }) {
  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
        {item.label}
      </a>
    )
  }
  return (
    <Link to={item.to} className={className} onClick={onClick} aria-current={ariaCurrent}>
      {item.label}
    </Link>
  )
}

export default function Header() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (item) => {
    if (item.to && item.to !== '/' && location.pathname.startsWith(item.to)) return true
    return item.children?.some((c) => c.to && location.pathname.startsWith(c.to))
  }

  const topLevelClass = (item) =>
    `block px-[18px] py-3.5 text-white text-[0.9rem] uppercase tracking-wide font-semibold transition-colors hover:bg-dorado hover:text-[#1c1c1c] focus-visible:bg-dorado focus-visible:text-[#1c1c1c] data-[state=open]:bg-dorado data-[state=open]:text-[#1c1c1c] ${
      isActive(item) ? 'bg-dorado text-[#1c1c1c]' : ''
    }`

  return (
    <header className="sticky top-0 z-50 bg-white border-b-[3px] border-dorado">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-5 py-2.5 relative">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src="https://igm.gub.uy/wp-content/uploads/2017/05/logo.png"
            alt="Logo IGM"
            className="h-[60px]"
          />
          <span className="font-heading font-bold text-verde-igm text-[1.1rem] leading-tight">
            INSTITUTO GEOGRÁFICO
            <br />
            MILITAR DEL URUGUAY
          </span>
        </Link>

        {/* Mobile menu (Radix Dialog: focus trap + Escape-to-close built in) */}
        <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
          <Dialog.Trigger asChild>
            <button
              type="button"
              aria-label="Abrir menú"
              className="lg:hidden flex flex-col items-center justify-center gap-1.5 w-[42px] h-[42px]"
            >
              <span className="block w-[26px] h-[3px] rounded bg-verde-igm-osc" />
              <span className="block w-[26px] h-[3px] rounded bg-verde-igm-osc" />
              <span className="block w-[26px] h-[3px] rounded bg-verde-igm-osc" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="lg:hidden fixed inset-0 z-[9000] bg-black/50" />
            <Dialog.Content
              className="lg:hidden fixed top-0 right-0 h-full w-[84%] max-w-[340px] bg-white shadow-[-6px_0_24px_rgba(0,0,0,0.18)] z-[9500] overflow-y-auto"
              aria-describedby={undefined}
            >
              <Dialog.Title className="sr-only">Menú de navegación</Dialog.Title>
              <div className="sticky top-0 flex items-center justify-between px-[18px] py-4 bg-verde-igm-osc border-b-[3px] border-dorado">
                <span className="text-dorado font-bold tracking-wide text-sm">MENÚ</span>
                <Dialog.Close asChild>
                  <button type="button" aria-label="Cerrar menú" className="text-white text-2xl leading-none px-1.5 py-1">
                    &times;
                  </button>
                </Dialog.Close>
              </div>
              <Accordion.Root type="single" collapsible>
                {nav.map((item) =>
                  item.children ? (
                    <Accordion.Item key={item.label} value={item.label} className="border-b border-[#ececec]">
                      <Accordion.Header>
                        <Accordion.Trigger className="w-full flex items-center justify-between px-[18px] py-3.5 text-[#1c1c1c] font-semibold text-[15px] group">
                          {item.label}
                          <span className="w-[9px] h-[9px] border-r-2 border-b-2 border-[#8a8a8a] rotate-45 transition-transform group-data-[state=open]:-rotate-[135deg]" />
                        </Accordion.Trigger>
                      </Accordion.Header>
                      <Accordion.Content className="bg-[#f7f8f6] overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                        <ul>
                          {item.children.map((child) => (
                            <li key={child.label}>
                              <NavAnchor
                                item={child}
                                className="block px-[34px] py-2.5 text-[13.5px] text-[#444]"
                                onClick={() => setMobileOpen(false)}
                              />
                            </li>
                          ))}
                        </ul>
                      </Accordion.Content>
                    </Accordion.Item>
                  ) : (
                    <div key={item.label} className="border-b border-[#ececec]">
                      <NavAnchor
                        item={item}
                        className="block px-[18px] py-3.5 text-[#1c1c1c] font-semibold text-[15px]"
                        onClick={() => setMobileOpen(false)}
                      />
                    </div>
                  ),
                )}
              </Accordion.Root>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      {/* Desktop nav (Radix NavigationMenu: hover + keyboard/arrow-key accessible dropdowns) */}
      <NavigationMenu.Root className="hidden lg:block bg-verde-igm" aria-label="Navegación principal">
        <NavigationMenu.List className="max-w-[1200px] mx-auto flex flex-wrap">
          {nav.map((item) => (
            <NavigationMenu.Item key={item.label} className="relative">
              {item.children ? (
                <>
                  <NavigationMenu.Trigger className={topLevelClass(item)}>{item.label}</NavigationMenu.Trigger>
                  <NavigationMenu.Content className="absolute left-0 top-full bg-white min-w-[270px] shadow-[0_8px_20px_rgba(0,0,0,0.15)] py-2.5 z-[60]">
                    <h5 className="mx-[18px] my-1.5 text-dorado uppercase text-xs tracking-wider">{item.label}</h5>
                    <ul>
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <NavigationMenu.Link asChild>
                            <NavAnchor
                              item={child}
                              className="block px-5 py-1.5 text-verde-igm-osc text-[0.88rem] hover:bg-gris-claro hover:text-dorado"
                            />
                          </NavigationMenu.Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenu.Content>
                </>
              ) : (
                <NavigationMenu.Link asChild active={isActive(item)}>
                  <NavAnchor item={item} className={topLevelClass(item)} ariaCurrent={isActive(item) ? 'page' : undefined} />
                </NavigationMenu.Link>
              )}
            </NavigationMenu.Item>
          ))}
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </header>
  )
}
