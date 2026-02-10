import { type FormEvent, useMemo, useState } from 'react'
import './App.css'

type Client = {
  id: string
  name: string
  type: 'Particulier' | 'Pro'
  email: string
}

type Quote = {
  id: string
  client: string
  amount: number
  status: 'Brouillon' | 'Envoyé' | 'Accepté' | 'Refusé'
  validUntil: string
}

type Invoice = {
  id: string
  client: string
  amount: number
  status: 'Brouillon' | 'Émise' | 'Payée' | 'En retard'
  issuedAt: string
}

type CreditNote = {
  id: string
  invoiceId: string
  amount: number
  issuedAt: string
}

type ViewKey =
  | 'dashboard'
  | 'quotes'
  | 'invoices'
  | 'clients'
  | 'credits'
  | 'data'
  | 'settings'
  | 'analysis'
  | 'vat'

const initialClients: Client[] = [
  {
    id: 'CL-1024',
    name: 'Studio Omena',
    type: 'Pro',
    email: 'contact@omena.fr',
  },
  {
    id: 'CL-1025',
    name: 'Atelier Céline',
    type: 'Particulier',
    email: 'celine@email.fr',
  },
]

const initialQuotes: Quote[] = [
  {
    id: 'DV-2024-001',
    client: 'Studio Omena',
    amount: 1840,
    status: 'Accepté',
    validUntil: '2024-06-30',
  },
  {
    id: 'DV-2024-002',
    client: 'Atelier Céline',
    amount: 960,
    status: 'Envoyé',
    validUntil: '2024-07-12',
  },
]

const initialInvoices: Invoice[] = [
  {
    id: 'IF-2024-0021',
    client: 'Studio Omena',
    amount: 1240,
    status: 'Émise',
    issuedAt: '2024-06-02',
  },
  {
    id: 'IF-2024-0022',
    client: 'Atelier Céline',
    amount: 780,
    status: 'Payée',
    issuedAt: '2024-06-05',
  },
]

const initialCredits: CreditNote[] = [
  {
    id: 'AV-2024-0003',
    invoiceId: 'IF-2024-0018',
    amount: 320,
    issuedAt: '2024-05-21',
  },
]

const views: { key: ViewKey; label: string; note?: string }[] = [
  { key: 'dashboard', label: 'Tableau de bord' },
  { key: 'quotes', label: 'Devis' },
  { key: 'invoices', label: 'Factures' },
  { key: 'credits', label: 'Avoirs' },
  { key: 'clients', label: 'Clients' },
  { key: 'analysis', label: 'Analyse', note: '(V2)' },
  { key: 'vat', label: 'TVA', note: '(V2)' },
  { key: 'data', label: 'Espace données' },
  { key: 'settings', label: 'Paramètres' },
]

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeView, setActiveView] = useState<ViewKey>('dashboard')
  const [clients, setClients] = useState<Client[]>(initialClients)
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes)
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices)
  const [creditNotes] = useState<CreditNote[]>(initialCredits)
  const [clientForm, setClientForm] = useState({
    name: '',
    type: 'Pro',
    email: '',
  })
  const [quoteForm, setQuoteForm] = useState({
    client: '',
    amount: '',
    validUntil: '',
  })
  const [invoiceForm, setInvoiceForm] = useState({
    client: '',
    amount: '',
    issuedAt: '',
  })

  const revenueStats = useMemo(() => {
    const totalInvoiced = invoices.reduce((sum, invoice) => sum + invoice.amount, 0)
    const totalPaid = invoices
      .filter((invoice) => invoice.status === 'Payée')
      .reduce((sum, invoice) => sum + invoice.amount, 0)
    const pendingQuotes = quotes.filter((quote) => quote.status !== 'Refusé').length
    return { totalInvoiced, totalPaid, pendingQuotes }
  }, [invoices, quotes])

  const handleLogin = () => {
    setIsLoggedIn(true)
    setActiveView('dashboard')
  }

  const handleAddClient = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!clientForm.name || !clientForm.email) return
    const nextClient: Client = {
      id: `CL-${1000 + clients.length + 1}`,
      name: clientForm.name,
      type: clientForm.type as Client['type'],
      email: clientForm.email,
    }
    setClients((prev) => [nextClient, ...prev])
    setClientForm({ name: '', type: 'Pro', email: '' })
  }

  const handleAddQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!quoteForm.client || !quoteForm.amount || !quoteForm.validUntil) return
    const nextQuote: Quote = {
      id: `DV-2024-${String(quotes.length + 3).padStart(3, '0')}`,
      client: quoteForm.client,
      amount: Number(quoteForm.amount),
      status: 'Brouillon',
      validUntil: quoteForm.validUntil,
    }
    setQuotes((prev) => [nextQuote, ...prev])
    setQuoteForm({ client: '', amount: '', validUntil: '' })
  }

  const handleAddInvoice = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!invoiceForm.client || !invoiceForm.amount || !invoiceForm.issuedAt) return
    const nextInvoice: Invoice = {
      id: `IF-2024-${String(invoices.length + 23).padStart(4, '0')}`,
      client: invoiceForm.client,
      amount: Number(invoiceForm.amount),
      status: 'Brouillon',
      issuedAt: invoiceForm.issuedAt,
    }
    setInvoices((prev) => [nextInvoice, ...prev])
    setInvoiceForm({ client: '', amount: '', issuedAt: '' })
  }

  if (!isLoggedIn) {
    return (
      <div className="auth-layout">
        <header className="marketing-topbar">
          <div className="logo-mark">
            <span className="logo-dot" />
            <span>InvoiceForge</span>
          </div>
          <button className="ghost">Créer un compte</button>
        </header>
        <main className="auth-card">
          <div className="auth-left">
            <span className="pill">Plateforme de facturation</span>
            <h1>Connexion à votre espace InvoiceForge</h1>
            <p>
              Accédez à tous les écrans fonctionnels en mode démonstration. Les
              données restent locales à votre navigateur.
            </p>
            <ul>
              <li>Devis, factures et avoirs prêts à utiliser.</li>
              <li>Exports et conformité RGPD simulés.</li>
              <li>Roadmap V2 visible (Analyse & TVA).</li>
            </ul>
          </div>
          <div className="auth-panel">
            <h2>Se connecter</h2>
            <label>
              Email
              <input type="email" placeholder="contact@invoiceforge.fr" />
            </label>
            <label>
              Mot de passe
              <input type="password" placeholder="••••••••" />
            </label>
            <button className="primary" onClick={handleLogin}>
              Accéder à mon espace
            </button>
            <div className="auth-note">
              Mode démo : aucune donnée envoyée, tout est simulé.
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="logo-mark">
          <span className="logo-dot" />
          <span>InvoiceForge</span>
        </div>
        <nav>
          {views.map((view) => (
            <button
              key={view.key}
              className={`sidebar-link ${
                activeView === view.key ? 'active' : ''
              }`}
              onClick={() => setActiveView(view.key)}
            >
              {view.label} {view.note && <span>{view.note}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div>
            <strong>Agence Nova</strong>
            <span>Franchise en base</span>
          </div>
          <button className="ghost" onClick={() => setIsLoggedIn(false)}>
            Se déconnecter
          </button>
        </div>
      </aside>

      <div className="content">
        <header className="content-header">
          <div>
            <h1>{views.find((view) => view.key === activeView)?.label}</h1>
            <p>Interface 100% démo, prête à être connectée au backend.</p>
          </div>
          <div className="header-actions">
            <button className="ghost">Exporter</button>
            <button className="primary">Nouvelle action</button>
          </div>
        </header>

        {activeView === 'dashboard' && (
          <section className="dashboard">
            <div className="stat-grid">
              <div className="stat-card">
                <span>CA facturé</span>
                <strong>{revenueStats.totalInvoiced} €</strong>
                <p>Factures émises ce mois-ci</p>
              </div>
              <div className="stat-card">
                <span>CA encaissé</span>
                <strong>{revenueStats.totalPaid} €</strong>
                <p>Encaissements confirmés</p>
              </div>
              <div className="stat-card">
                <span>Devis actifs</span>
                <strong>{revenueStats.pendingQuotes}</strong>
                <p>En attente de signature</p>
              </div>
            </div>
            <div className="split-grid">
              <div className="panel">
                <h3>Dernières factures</h3>
                <div className="list">
                  {invoices.slice(0, 4).map((invoice) => (
                    <div key={invoice.id} className="list-item">
                      <div>
                        <strong>{invoice.id}</strong>
                        <span>{invoice.client}</span>
                      </div>
                      <div>
                        <strong>{invoice.amount} €</strong>
                        <span>{invoice.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="panel">
                <h3>Suivi conformité</h3>
                <div className="compliance-grid">
                  <div>
                    <strong>Factur-X</strong>
                    <p>PDF + XML générés</p>
                  </div>
                  <div>
                    <strong>RGPD</strong>
                    <p>Exports prêts</p>
                  </div>
                  <div>
                    <strong>Traçabilité</strong>
                    <p>Snapshots clients</p>
                  </div>
                  <div>
                    <strong>Statuts</strong>
                    <p>Immutabilité après émission</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeView === 'clients' && (
          <section className="grid-layout">
            <div className="panel">
              <h3>Ajouter un client</h3>
              <form className="form" onSubmit={handleAddClient}>
                <label>
                  Nom
                  <input
                    value={clientForm.name}
                    onChange={(event) =>
                      setClientForm((prev) => ({
                        ...prev,
                        name: event.target.value,
                      }))
                    }
                    placeholder="Nom du client"
                  />
                </label>
                <label>
                  Type
                  <select
                    value={clientForm.type}
                    onChange={(event) =>
                      setClientForm((prev) => ({
                        ...prev,
                        type: event.target.value,
                      }))
                    }
                  >
                    <option value="Pro">Professionnel</option>
                    <option value="Particulier">Particulier</option>
                  </select>
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    value={clientForm.email}
                    onChange={(event) =>
                      setClientForm((prev) => ({
                        ...prev,
                        email: event.target.value,
                      }))
                    }
                    placeholder="email@client.fr"
                  />
                </label>
                <button className="primary" type="submit">
                  Enregistrer
                </button>
              </form>
            </div>
            <div className="panel">
              <h3>Liste des clients</h3>
              <div className="list">
                {clients.map((client) => (
                  <div key={client.id} className="list-item">
                    <div>
                      <strong>{client.name}</strong>
                      <span>{client.type}</span>
                    </div>
                    <div>
                      <strong>{client.id}</strong>
                      <span>{client.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeView === 'quotes' && (
          <section className="grid-layout">
            <div className="panel">
              <h3>Créer un devis</h3>
              <form className="form" onSubmit={handleAddQuote}>
                <label>
                  Client
                  <input
                    value={quoteForm.client}
                    onChange={(event) =>
                      setQuoteForm((prev) => ({
                        ...prev,
                        client: event.target.value,
                      }))
                    }
                    placeholder="Nom du client"
                  />
                </label>
                <label>
                  Montant (€)
                  <input
                    type="number"
                    value={quoteForm.amount}
                    onChange={(event) =>
                      setQuoteForm((prev) => ({
                        ...prev,
                        amount: event.target.value,
                      }))
                    }
                  />
                </label>
                <label>
                  Validité
                  <input
                    type="date"
                    value={quoteForm.validUntil}
                    onChange={(event) =>
                      setQuoteForm((prev) => ({
                        ...prev,
                        validUntil: event.target.value,
                      }))
                    }
                  />
                </label>
                <button className="primary" type="submit">
                  Enregistrer le devis
                </button>
              </form>
            </div>
            <div className="panel">
              <h3>Suivi des devis</h3>
              <div className="list">
                {quotes.map((quote) => (
                  <div key={quote.id} className="list-item">
                    <div>
                      <strong>{quote.id}</strong>
                      <span>{quote.client}</span>
                    </div>
                    <div>
                      <strong>{quote.amount} €</strong>
                      <span>{quote.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeView === 'invoices' && (
          <section className="grid-layout">
            <div className="panel">
              <h3>Créer une facture</h3>
              <form className="form" onSubmit={handleAddInvoice}>
                <label>
                  Client
                  <input
                    value={invoiceForm.client}
                    onChange={(event) =>
                      setInvoiceForm((prev) => ({
                        ...prev,
                        client: event.target.value,
                      }))
                    }
                    placeholder="Nom du client"
                  />
                </label>
                <label>
                  Montant (€)
                  <input
                    type="number"
                    value={invoiceForm.amount}
                    onChange={(event) =>
                      setInvoiceForm((prev) => ({
                        ...prev,
                        amount: event.target.value,
                      }))
                    }
                  />
                </label>
                <label>
                  Date d’émission
                  <input
                    type="date"
                    value={invoiceForm.issuedAt}
                    onChange={(event) =>
                      setInvoiceForm((prev) => ({
                        ...prev,
                        issuedAt: event.target.value,
                      }))
                    }
                  />
                </label>
                <button className="primary" type="submit">
                  Enregistrer la facture
                </button>
              </form>
            </div>
            <div className="panel">
              <h3>Factures récentes</h3>
              <div className="list">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="list-item">
                    <div>
                      <strong>{invoice.id}</strong>
                      <span>{invoice.client}</span>
                    </div>
                    <div>
                      <strong>{invoice.amount} €</strong>
                      <span>{invoice.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeView === 'credits' && (
          <section className="grid-layout">
            <div className="panel">
              <h3>Gestion des avoirs</h3>
              <p>
                Chaque avoir reste lié à la facture d’origine pour garantir la
                traçabilité.
              </p>
              <button className="secondary">Créer un avoir</button>
            </div>
            <div className="panel">
              <h3>Avoirs émis</h3>
              <div className="list">
                {creditNotes.map((credit) => (
                  <div key={credit.id} className="list-item">
                    <div>
                      <strong>{credit.id}</strong>
                      <span>Facture {credit.invoiceId}</span>
                    </div>
                    <div>
                      <strong>{credit.amount} €</strong>
                      <span>{credit.issuedAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeView === 'analysis' && (
          <section className="panel muted-panel">
            <h3>Analyse financière (V2)</h3>
            <p>
              Cette section affichera des projections de CA, des courbes de
              trésorerie et des analyses avancées dès l’activation de la V2.
            </p>
            <button className="ghost">Bientôt disponible</button>
          </section>
        )}

        {activeView === 'vat' && (
          <section className="panel muted-panel">
            <h3>Gestion dynamique de la TVA (V2)</h3>
            <p>
              Calculs de TVA automatisés, historisation des régimes et bascule
              automatique.
            </p>
            <button className="ghost">Bientôt disponible</button>
          </section>
        )}

        {activeView === 'data' && (
          <section className="grid-layout">
            <div className="panel">
              <h3>Export complet des données</h3>
              <p>
                Téléchargez l’ensemble des factures PDF et le livre des recettes
                au format CSV/JSON.
              </p>
              <div className="button-row">
                <button className="primary">Exporter les PDF</button>
                <button className="secondary">Exporter CSV</button>
              </div>
            </div>
            <div className="panel">
              <h3>Suppression du compte</h3>
              <p>
                L’anonymisation est disponible avec conservation des traces
                fiscales obligatoires.
              </p>
              <button className="ghost">Demander la suppression</button>
            </div>
          </section>
        )}

        {activeView === 'settings' && (
          <section className="grid-layout">
            <div className="panel">
              <h3>Informations légales</h3>
              <div className="form">
                <label>
                  Raison sociale
                  <input defaultValue="Agence Nova" />
                </label>
                <label>
                  SIRET
                  <input defaultValue="901 234 567 00016" />
                </label>
                <label>
                  Régime TVA
                  <input defaultValue="Franchise en base" />
                </label>
              </div>
            </div>
            <div className="panel">
              <h3>Préférences de facturation</h3>
              <div className="form">
                <label>
                  Numérotation
                  <input defaultValue="IF-2024-XXXX" />
                </label>
                <label>
                  Mentions légales
                  <textarea defaultValue="TVA non applicable, article 293 B du CGI." />
                </label>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default App
