import { useMemo, useState } from 'react'
import './App.css'

type InvoiceStatus = 'Brouillon' | 'Émise' | 'Payée' | 'En retard'

type Invoice = {
  id: string
  client: string
  date: string
  amount: string
  status: InvoiceStatus
}

type QuoteStatus = 'Brouillon' | 'Envoyé' | 'Accepté' | 'Refusé'

type Quote = {
  id: string
  client: string
  date: string
  amount: string
  status: QuoteStatus
}

type Client = {
  name: string
  type: 'Particulier' | 'Professionnel'
  city: string
  lastInvoice: string
}

const v1Highlights = [
  {
    title: 'Devis et factures conformes',
    description: 'Numérotation légale, Factur-X ready, statuts et documents immuables.',
  },
  {
    title: 'Avoirs traçables',
    description: 'Corrections strictes via facture d’avoir liée à l’originale.',
  },
  {
    title: 'RGPD & exports',
    description: 'Exports CSV/JSON + ZIP des PDFs pour une portabilité complète.',
  },
  {
    title: 'Tableaux de bord',
    description: 'CA facturé/encaissé, devis en cours et alertes impayés.',
  },
]

const v2Roadmap = [
  {
    title: 'Gestion dynamique de la TVA',
    description: 'Calcul automatique selon le régime fiscal et la date de facture.',
  },
  {
    title: 'Livre des recettes fiscal',
    description: 'Génération automatique du document officiel.',
  },
  {
    title: 'Prédictions de seuils',
    description: 'Projection du chiffre d’affaires annuel et alertes de dépassement.',
  },
]

const initialInvoices: Invoice[] = [
  {
    id: 'FAC-2025-0031',
    client: 'Studio Rivoli',
    date: '15/03/2025',
    amount: '1 280 €',
    status: 'Émise',
  },
  {
    id: 'FAC-2025-0030',
    client: 'Luna Café',
    date: '08/03/2025',
    amount: '840 €',
    status: 'Payée',
  },
  {
    id: 'FAC-2025-0029',
    client: 'Atelier Pollen',
    date: '02/03/2025',
    amount: '620 €',
    status: 'En retard',
  },
]

const initialQuotes: Quote[] = [
  {
    id: 'DEV-2025-010',
    client: 'Café Olympe',
    date: '18/03/2025',
    amount: '1 200 €',
    status: 'Envoyé',
  },
  {
    id: 'DEV-2025-009',
    client: 'Maison Lila',
    date: '12/03/2025',
    amount: '3 400 €',
    status: 'Accepté',
  },
  {
    id: 'DEV-2025-008',
    client: 'Studio Rivoli',
    date: '05/03/2025',
    amount: '560 €',
    status: 'Brouillon',
  },
]

const initialClients: Client[] = [
  {
    name: 'Studio Rivoli',
    type: 'Professionnel',
    city: 'Paris',
    lastInvoice: 'FAC-2025-0031',
  },
  {
    name: 'Luna Café',
    type: 'Professionnel',
    city: 'Lyon',
    lastInvoice: 'FAC-2025-0030',
  },
  {
    name: 'Amélie Garnier',
    type: 'Particulier',
    city: 'Nantes',
    lastInvoice: 'FAC-2025-0027',
  },
]

const tabs = ['Dashboard', 'Devis', 'Factures', 'Clients', 'Données', 'TVA'] as const

type Tab = (typeof tabs)[number]

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('Dashboard')
  const [invoices, setInvoices] = useState(initialInvoices)
  const [quotes, setQuotes] = useState(initialQuotes)
  const [clients] = useState(initialClients)
  const [showExportBanner, setShowExportBanner] = useState(false)
  const [notifications, setNotifications] = useState([
    'Facture FAC-2025-0029 en retard depuis 5 jours.',
    'Devis DEV-2025-009 accepté — prêt à facturer.',
  ])

  const dashboardStats = useMemo(
    () => [
      { label: 'CA facturé', value: '12 480 €', trend: '+8%' },
      { label: 'CA encaissé', value: '9 920 €', trend: '+4%' },
      { label: 'Devis en cours', value: '5', trend: '—' },
      { label: 'Impayés', value: '2', trend: 'À surveiller' },
    ],
    [],
  )

  const handleLogin = () => {
    setIsAuthenticated(true)
    setNotifications((current) => ['Bienvenue dans la démo InvoiceForge !', ...current])
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setActiveTab('Dashboard')
  }

  const handleMarkPaid = (invoiceId: string) => {
    setInvoices((current) =>
      current.map((invoice) =>
        invoice.id === invoiceId ? { ...invoice, status: 'Payée' } : invoice,
      ),
    )
    setNotifications((current) => [`Facture ${invoiceId} marquée comme payée.`, ...current])
  }

  const handleConvertQuote = (quoteId: string) => {
    const quote = quotes.find((item) => item.id === quoteId)
    if (!quote) return
    const newInvoice: Invoice = {
      id: `FAC-2025-00${invoices.length + 32}`,
      client: quote.client,
      date: '20/03/2025',
      amount: quote.amount,
      status: 'Brouillon',
    }
    setInvoices((current) => [newInvoice, ...current])
    setNotifications((current) => [`Devis ${quoteId} converti en facture.`, ...current])
  }

  const handleExport = () => {
    setShowExportBanner(true)
    setNotifications((current) => ['Export RGPD prêt : ZIP + CSV/JSON.', ...current])
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-dot" />
          <div>
            <strong>InvoiceForge</strong>
            <span>Démo front-only</span>
          </div>
        </div>
        <nav className="top-links">
          <a href="#features">Fonctionnalités</a>
          <a href="#demo">Démo</a>
          <a href="#roadmap">Roadmap</a>
        </nav>
        <div className="top-actions">
          {isAuthenticated ? (
            <button className="ghost" onClick={handleLogout}>
              Se déconnecter
            </button>
          ) : (
            <button className="primary" onClick={handleLogin}>
              Se connecter
            </button>
          )}
        </div>
      </header>

      <main>
        <section className="hero">
          <div>
            <p className="pill">V1 complète · V2 annoncée</p>
            <h1>
              La vitrine de facturation conforme, prête pour la croissance des
              indépendants.
            </h1>
            <p className="hero-subtitle">
              Toutes les fonctionnalités V1 sont visibles et interactives en mode
              démo. Les modules V2 sont clairement indiqués comme “bientôt
              disponibles”.
            </p>
            <div className="hero-actions">
              <button className="primary" onClick={handleLogin}>
                Tester la démo instantanée
              </button>
              <button className="secondary">Télécharger la présentation</button>
            </div>
            <div className="hero-metrics">
              <div>
                <strong>Factur-X</strong>
                <span>Prêt côté V1</span>
              </div>
              <div>
                <strong>RGPD</strong>
                <span>Exports complets</span>
              </div>
              <div>
                <strong>TVA</strong>
                <span>V2 annoncée</span>
              </div>
            </div>
          </div>
          <div className="hero-card">
            <h3>Connexion instantanée</h3>
            <p>
              Cliquez sur “Se connecter” et accédez aux tableaux, sans backend,
              pour une démo fluide.
            </p>
            <div className="hero-card-actions">
              <button className="primary" onClick={handleLogin}>
                Connexion express
              </button>
              <button className="ghost">Voir les rôles</button>
            </div>
            <div className="hero-card-note">Aucun compte requis.</div>
          </div>
        </section>

        <section className="section" id="features">
          <div className="section-header">
            <h2>Fonctionnalités V1 incluses</h2>
            <p>
              Le socle V1 couvre le cycle complet devis → facture → avoir, la
              conformité légale et les exports RGPD.
            </p>
          </div>
          <div className="grid">
            {v1Highlights.map((feature) => (
              <article key={feature.title} className="card">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <span className="tag">Disponible maintenant</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section muted" id="demo">
          <div className="section-header">
            <h2>Démo interactive (front-only)</h2>
            <p>
              Connectez-vous instantanément pour explorer le tableau de bord, les
              devis, les factures, les clients et l’espace RGPD.
            </p>
          </div>

          <div className="demo">
            <aside className="sidebar">
              <div className="sidebar-user">
                <div className="avatar">IF</div>
                <div>
                  <strong>Studio Horizon</strong>
                  <span>Micro-entreprise</span>
                </div>
              </div>
              <div className="sidebar-links">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={activeTab === tab ? 'active' : ''}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="sidebar-cta">
                <p>Besoin d’aide ?</p>
                <button className="secondary">Contacter le support</button>
              </div>
            </aside>

            <div className="panel">
              {!isAuthenticated && (
                <div className="panel-lock">
                  <h3>Connectez-vous pour accéder aux modules</h3>
                  <p>
                    Cette démo est front-only : cliquez pour simuler une connexion
                    instantanée.
                  </p>
                  <button className="primary" onClick={handleLogin}>
                    Se connecter
                  </button>
                </div>
              )}

              {isAuthenticated && (
                <>
                  <div className="panel-header">
                    <div>
                      <h3>{activeTab}</h3>
                      <p>Navigation simulée, aucune donnée backend requise.</p>
                    </div>
                    <div className="panel-actions">
                      <button className="secondary">Créer</button>
                      <button className="ghost">Exporter</button>
                    </div>
                  </div>

                  {activeTab === 'Dashboard' && (
                    <div className="dashboard">
                      <div className="stats">
                        {dashboardStats.map((stat) => (
                          <div key={stat.label} className="stat-card">
                            <span>{stat.label}</span>
                            <strong>{stat.value}</strong>
                            <em>{stat.trend}</em>
                          </div>
                        ))}
                      </div>
                      <div className="dashboard-grid">
                        <div className="card">
                          <h4>Notifications</h4>
                          <ul>
                            {notifications.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="card">
                          <h4>Actions rapides</h4>
                          <div className="quick-actions">
                            <button className="primary">Nouvelle facture</button>
                            <button className="secondary">Nouveau devis</button>
                            <button className="ghost">Importer un client</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'Devis' && (
                    <div className="table-wrapper">
                      <table>
                        <thead>
                          <tr>
                            <th>Devis</th>
                            <th>Client</th>
                            <th>Date</th>
                            <th>Montant</th>
                            <th>Statut</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {quotes.map((quote) => (
                            <tr key={quote.id}>
                              <td>{quote.id}</td>
                              <td>{quote.client}</td>
                              <td>{quote.date}</td>
                              <td>{quote.amount}</td>
                              <td>
                                <span className={`badge status-${quote.status}`}>
                                  {quote.status}
                                </span>
                              </td>
                              <td>
                                <button
                                  className="ghost"
                                  onClick={() => handleConvertQuote(quote.id)}
                                >
                                  Convertir
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {activeTab === 'Factures' && (
                    <div className="table-wrapper">
                      <table>
                        <thead>
                          <tr>
                            <th>Facture</th>
                            <th>Client</th>
                            <th>Date</th>
                            <th>Montant</th>
                            <th>Statut</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoices.map((invoice) => (
                            <tr key={invoice.id}>
                              <td>{invoice.id}</td>
                              <td>{invoice.client}</td>
                              <td>{invoice.date}</td>
                              <td>{invoice.amount}</td>
                              <td>
                                <span className={`badge status-${invoice.status}`}>
                                  {invoice.status}
                                </span>
                              </td>
                              <td>
                                <button
                                  className="ghost"
                                  onClick={() => handleMarkPaid(invoice.id)}
                                >
                                  Marquer payée
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {activeTab === 'Clients' && (
                    <div className="table-wrapper">
                      <table>
                        <thead>
                          <tr>
                            <th>Client</th>
                            <th>Type</th>
                            <th>Ville</th>
                            <th>Dernière facture</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {clients.map((client) => (
                            <tr key={client.name}>
                              <td>{client.name}</td>
                              <td>{client.type}</td>
                              <td>{client.city}</td>
                              <td>{client.lastInvoice}</td>
                              <td>
                                <button className="ghost">Voir</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {activeTab === 'Données' && (
                    <div className="data-space">
                      <div className="card">
                        <h4>Export RGPD</h4>
                        <p>
                          Téléchargez une archive complète : PDFs, CSV/JSON et
                          historique des documents.
                        </p>
                        <button className="primary" onClick={handleExport}>
                          Générer l’export
                        </button>
                        {showExportBanner && (
                          <div className="banner">Export prêt (simulation).</div>
                        )}
                      </div>
                      <div className="card">
                        <h4>Suppression de compte</h4>
                        <p>
                          La suppression est possible avec un rappel des obligations
                          légales de conservation.
                        </p>
                        <button className="ghost">Simuler la suppression</button>
                      </div>
                    </div>
                  )}

                  {activeTab === 'TVA' && (
                    <div className="card upcoming-block">
                      <h4>Module TVA (V2)</h4>
                      <p>
                        Ce module sera activé plus tard. La structure est prête,
                        mais les calculs dynamiques ne sont pas encore disponibles.
                      </p>
                      <span className="tag">Bientôt disponible</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>

        <section className="section" id="roadmap">
          <div className="section-header">
            <h2>Roadmap V2 — annoncée pour plus tard</h2>
            <p>
              Les fonctionnalités suivantes sont prévues : elles sont indiquées
              comme “bientôt disponibles” dans la démo.
            </p>
          </div>
          <div className="grid">
            {v2Roadmap.map((item) => (
              <article key={item.title} className="card upcoming">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="tag">Bientôt disponible</span>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>
          <strong>InvoiceForge</strong>
          <p>Démo front-only — aucune donnée backend requise.</p>
        </div>
        <div className="footer-links">
          <a href="#features">Fonctionnalités</a>
          <a href="#demo">Démo</a>
          <a href="#roadmap">Roadmap</a>
        </div>
      </footer>
    </div>
  )
}

export default App
