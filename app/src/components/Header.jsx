import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import * as Dialog from '@radix-ui/react-dialog'
import * as Accordion from '@radix-ui/react-accordion'
import { nav } from '../data/nav'

function NavAnchor({ item, onClick, ariaCurrent }) {
  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {item.label}
      </a>
    )
  }
  return (
    <Link to={item.to} onClick={onClick} aria-current={ariaCurrent}>
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

  return (
    <header>
      <div className="top-bar">
        <Link to="/" className="logo-wrap">
          <img src="https://igm.gub.uy/wp-content/uploads/2017/05/logo.png" alt="Logo IGM" />
          <span className="logo-text">
            INSTITUTO GEOGRÁFICO
            <br />
            MILITAR DEL URUGUAY
          </span>
        </Link>

        <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
          <Dialog.Trigger asChild>
            <button type="button" aria-label="Abrir menú" className={`igm-burger${mobileOpen ? ' igm-open' : ''}`}>
              <span />
              <span />
              <span />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="igm-overlay" />
            <Dialog.Content asChild aria-describedby={undefined}>
            <nav className="main-nav mobile-nav">
              <Dialog.Title asChild>
                <div className="igm-panel-header">
                  <span>MENÚ</span>
                  <Dialog.Close asChild>
                    <button type="button" aria-label="Cerrar menú" className="igm-close">
                      &times;
                    </button>
                  </Dialog.Close>
                </div>
              </Dialog.Title>
              <Accordion.Root type="single" collapsible asChild>
                <ul>
                  {nav.map((item) =>
                    item.children ? (
                      <Accordion.Item key={item.label} value={item.label} className={isActive(item) ? 'active' : ''} asChild>
                        <li>
                          <Accordion.Header>
                            <Accordion.Trigger>
                              {item.label}
                              <span className="igm-caret" />
                            </Accordion.Trigger>
                          </Accordion.Header>
                          <Accordion.Content asChild>
                            <div className="dropdown">
                              <ul>
                                {item.children.map((child) => (
                                  <li key={child.label}>
                                    <NavAnchor item={child} onClick={() => setMobileOpen(false)} />
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </Accordion.Content>
                        </li>
                      </Accordion.Item>
                    ) : (
                      <li key={item.label} className={isActive(item) ? 'active' : ''}>
                        <NavAnchor item={item} onClick={() => setMobileOpen(false)} ariaCurrent={isActive(item) ? 'page' : undefined} />
                      </li>
                    ),
                  )}
                </ul>
              </Accordion.Root>
            </nav>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      <NavigationMenu.Root className="main-nav desktop-nav" aria-label="Navegación principal">
        <NavigationMenu.List asChild>
          <ul>
            {nav.map((item) => (
              <NavigationMenu.Item key={item.label} className={isActive(item) ? 'active' : ''} asChild>
                <li>
                  {item.children ? (
                    <>
                      <NavigationMenu.Trigger>{item.label}</NavigationMenu.Trigger>
                      <NavigationMenu.Content className="dropdown">
                        <h5>{item.label}</h5>
                        <ul>
                          {item.children.map((child) => (
                            <li key={child.label}>
                              <NavigationMenu.Link asChild>
                                <NavAnchor item={child} />
                              </NavigationMenu.Link>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenu.Content>
                    </>
                  ) : (
                    <NavigationMenu.Link asChild active={isActive(item)}>
                      <NavAnchor item={item} ariaCurrent={isActive(item) ? 'page' : undefined} />
                    </NavigationMenu.Link>
                  )}
                </li>
              </NavigationMenu.Item>
            ))}
          </ul>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </header>
  )
}
