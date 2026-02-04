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

type Tab =
  | 'Dashboard'
  | 'Devis'
  | 'Factures'
  | 'Avoirs'
  | 'Clients'
  | 'Données'
  | 'TVA'
  | 'Analyse'

const tabs: Tab[] = [
  'Dashboard',
  'Devis',
  'Factures',
  'Avoirs',
  'Clients',
  'Données',
  'TVA',
  'Analyse',
]

const v1Highlights = [
  {
    title: 'Conformité & Factur-X ready',
    description: 'Documents immuables, numérotation séquentielle et structure Factur-X.',
  },
  {
    title: 'Devis optionnels',
    description: 'Création rapide, statuts complets et conversion devis → facture.',
  },
  {
    title: 'RGPD & portabilité',
    description: 'Exports complets (ZIP, CSV, JSON) et gestion des données.',
  },
  {
    title: 'Suivi commercial',
    description: 'Tableaux de bord, alertes d’impayés et vision claire du CA.',
  },
]

const v2Roadmap = [
  {
    title: 'Gestion TVA multi-régimes',
    description: 'Calcul dynamique en fonction de l’historique fiscal.',
  },
  {
    title: 'Livre des recettes fiscal',
    description: 'Génération automatique du document officiel.',
  },
  {
    title: 'Prédictions de seuils',
    description: 'Projection du CA et alertes de dépassement réglementaire.',
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

const initialCredits = [
  {
    id: 'AVO-2025-004',
    invoice: 'FAC-2025-0029',
    date: '10/03/2025',
    amount: '120 €',
    reason: 'Correction de ligne',
  },
  {
    id: 'AVO-2025-003',
    invoice: 'FAC-2025-0026',
    date: '24/02/2025',
    amount: '75 €',
    reason: 'Geste commercial',
  },
]

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('Dashboard')
  const [invoices, setInvoices] = useState(initialInvoices)
  const [quotes, setQuotes] = useState(initialQuotes)
  const [clients] = useState(initialClients)
  const [credits] = useState(initialCredits)
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
    setNotifications((current) => ['Connexion réussie.', ...current])
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
    setQuotes((current) =>
      current.map((item) => (item.id === quoteId ? { ...item, status: 'Accepté' } : item)),
    )
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
            <span>Front-only — version produit</span>
          </div>
        </div>
        <nav className="top-links">
          <a href="#features">Fonctionnalités</a>
          <a href="#workspace">Workspace</a>
          <a href="#roadmap">V2</a>
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
            <p className="pill">Version front-only · V1 complète</p>
            <h1>La facturation conforme pour micro-entreprises, prête à évoluer.</h1>
            <p className="hero-subtitle">
              InvoiceForge regroupe devis, factures, avoirs, conformité RGPD et tableaux
              de bord. Les modules V2 sont visibles mais indiqués comme à venir.
            </p>
            <div className="hero-actions">
              <button className="primary" onClick={handleLogin}>
                Accéder au workspace
              </button>
              <button className="secondary">Voir la documentation</button>
            </div>
            <div className="hero-metrics">
              <div>
                <strong>Factur-X</strong>
                <span>Prêt technique</span>
              </div>
              <div>
                <strong>RGPD</strong>
                <span>Exports complets</span>
              </div>
              <div>
                <strong>TVA</strong>
                <span>Activation V2</span>
              </div>
            </div>
          </div>
          <div className="hero-card">
            <h3>Accès immédiat</h3>
            <p>
              Naviguez dans toutes les pages comme si le produit était en production,
              sans backend requis.
            </p>
            <div className="hero-card-actions">
              <button className="primary" onClick={handleLogin}>
                Ouvrir le workspace
              </button>
              <button className="ghost">Configurer l’entreprise</button>
            </div>
            <div className="hero-card-note">Aucune donnée réelle stockée.</div>
          </div>
        </section>

        <section className="section" id="features">
          <div className="section-header">
            <h2>V1 : fonctionnalités livrées</h2>
            <p>
              Le socle V1 couvre l’ensemble des flux commerciaux et légaux pour une
              micro-entreprise.
            </p>
          </div>
          <div className="grid">
            {v1Highlights.map((feature) => (
              <article key={feature.title} className="card">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <span className="tag">Disponible</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section muted" id="workspace">
          <div className="section-header">
            <h2>Workspace InvoiceForge</h2>
            <p>
              Connectez-vous pour afficher les tableaux, les listes et les actions
              courantes. Tout est simulé côté front.
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
                <p>Support & conformité</p>
                <button className="secondary">Consulter les mentions</button>
              </div>
            </aside>

            <div className="panel">
              {!isAuthenticated && (
                <div className="panel-lock">
                  <h3>Connectez-vous pour accéder aux modules</h3>
                  <p>
                    Mode front-only : la connexion est instantanée et ne dépend d’aucun
                    backend.
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
                      <p>Interface complète, flux simulés.</p>
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
                            <button className="ghost">Ajouter un client</button>
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

                  {activeTab === 'Avoirs' && (
                    <div className="table-wrapper">
                      <table>
                        <thead>
                          <tr>
                            <th>Avoir</th>
                            <th>Facture liée</th>
                            <th>Date</th>
                            <th>Montant</th>
                            <th>Motif</th>
                          </tr>
                        </thead>
                        <tbody>
                          {credits.map((credit) => (
                            <tr key={credit.id}>
                              <td>{credit.id}</td>
                              <td>{credit.invoice}</td>
                              <td>{credit.date}</td>
                              <td>{credit.amount}</td>
                              <td>{credit.reason}</td>
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

                  {activeTab === 'Analyse' && (
                    <div className="card upcoming-block">
                      <h4>Analyse financière (V2)</h4>
                      <p>
                        Les analyses avancées et prédictions seront activées lors de
                        la prochaine version.
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
            <h2>V2 : fonctionnalités annoncées</h2>
            <p>
              Ces modules sont visibles dans l’interface, mais seront déployés dans une
              version ultérieure.
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
          <p>Version front-only — interface complète sans backend.</p>
        </div>
        <div className="footer-links">
          <a href="#features">Fonctionnalités</a>
          <a href="#workspace">Workspace</a>
          <a href="#roadmap">V2</a>
        </div>
      </footer>
    </div>
  )
}

export default App
