import './App.css'

function App() {
  return (
    <div className="app">
      <header className="topbar">
        <div className="logo-mark">
          <span className="logo-dot" />
          <span>InvoiceForge</span>
        </div>
        <nav className="nav-links">
          <a href="#product">Produit</a>
          <a href="#workflow">Flux</a>
          <a href="#modules">Modules</a>
          <a href="#analytics">Analyse</a>
          <a href="#compliance">Conformité</a>
        </nav>
        <div className="topbar-actions">
          <button className="ghost">Se connecter</button>
          <button className="primary">Demander une démo</button>
        </div>
      </header>

      <main>
        <section className="hero" id="product">
          <div className="hero-text">
            <span className="pill">Facturation & conformité by design</span>
            <h1>
              Le front-office complet pour facturer, suivre et anticiper la
              croissance des indépendants.
            </h1>
            <p>
              InvoiceForge centralise devis, factures, avoirs et conformité
              fiscale dans une expérience moderne, claire et prête pour la
              réforme 2026.
            </p>
            <div className="hero-actions">
              <button className="primary">Créer un compte</button>
              <button className="secondary">Voir la présentation</button>
            </div>
            <div className="hero-stats">
              <div>
                <strong>Factur-X Ready</strong>
                <span>PDF + XML préparé</span>
              </div>
              <div>
                <strong>RGPD</strong>
                <span>Export total en 1 clic</span>
              </div>
              <div>
                <strong>V1</strong>
                <span>Socle commercial & légal</span>
              </div>
            </div>
          </div>
          <div className="hero-preview">
            <div className="preview-header">
              <div>
                <h3>Tableau de bord</h3>
                <p>Résumé de votre activité en temps réel</p>
              </div>
              <button className="badge">Brouillon</button>
            </div>
            <div className="preview-grid">
              <div className="preview-card">
                <span>CA facturé</span>
                <strong>18 420 €</strong>
                <p>+12% ce mois-ci</p>
              </div>
              <div className="preview-card">
                <span>Encaissements</span>
                <strong>12 960 €</strong>
                <p>6 factures payées</p>
              </div>
              <div className="preview-card">
                <span>Devis en cours</span>
                <strong>7</strong>
                <p>2 en validation</p>
              </div>
              <div className="preview-card">
                <span>Impayés</span>
                <strong>1 240 €</strong>
                <p>Alerte douce activée</p>
              </div>
            </div>
            <div className="preview-footer">
              <div>
                <h4>Dernière facture émise</h4>
                <p>IF-2024-0021 · Client Studio Omena</p>
              </div>
              <button className="primary">Voir la facture</button>
            </div>
          </div>
        </section>

        <section className="section" id="workflow">
          <div className="section-heading">
            <h2>Un flux simple et non bloquant</h2>
            <p>
              Créez un devis optionnel, passez en facture ou démarrez directement
              une facturation. L’outil suit votre rythme.
            </p>
          </div>
          <div className="workflow">
            <div className="workflow-step">
              <span>01</span>
              <h3>Création rapide</h3>
              <p>Facture à la volée, même sans client pré-enregistré.</p>
            </div>
            <div className="workflow-step">
              <span>02</span>
              <h3>Validation & envoi</h3>
              <p>PDF Factur-X prêt, numérotation légale automatique.</p>
            </div>
            <div className="workflow-step">
              <span>03</span>
              <h3>Suivi & relances</h3>
              <p>Statuts clairs et alertes visuelles sur les impayés.</p>
            </div>
            <div className="workflow-step">
              <span>04</span>
              <h3>Export sécurisé</h3>
              <p>Exports CSV/JSON + archive PDF complète.</p>
            </div>
          </div>
        </section>

        <section className="section grid-section" id="modules">
          <div className="section-heading">
            <h2>Modules clés disponibles en V1</h2>
            <p>
              Tout le socle commercial et légal est disponible pour lancer votre
              activité en confiance.
            </p>
          </div>
          <div className="cards-grid">
            <article className="card">
              <h3>Compte & entreprise</h3>
              <p>
                Saisie SIRET, adresses, régimes fiscaux historisés, structure
                TVA-ready.
              </p>
              <span className="tag">Architecture prête V2</span>
            </article>
            <article className="card">
              <h3>Clients & RGPD</h3>
              <p>
                Fiches clients pros/particuliers, portabilité des données,
                export complet.
              </p>
              <span className="tag">Export JSON/CSV</span>
            </article>
            <article className="card">
              <h3>Devis</h3>
              <p>
                Statuts Brouillon → Envoyé → Accepté, conversion instantanée en
                facture.
              </p>
              <span className="tag">Validité paramétrable</span>
            </article>
            <article className="card">
              <h3>Facturation & Factur-X</h3>
              <p>
                Numérotation séquentielle, immutabilité stricte, PDF hybride.
              </p>
              <span className="tag">Conformité 2026</span>
            </article>
            <article className="card">
              <h3>Avoirs</h3>
              <p>
                Annulation et correction avec liaison traçable à la facture
                d’origine.
              </p>
              <span className="tag">Traçabilité complète</span>
            </article>
            <article className="card">
              <h3>Espace données</h3>
              <p>
                Archive ZIP de toutes les factures PDF et livre des recettes.
              </p>
              <span className="tag">RGPD</span>
            </article>
          </div>
        </section>

        <section className="section roadmap" id="analytics">
          <div className="section-heading">
            <h2>Tableaux de bord & analyses</h2>
            <p>
              Une lecture claire de votre trésorerie, avec une montée en
              puissance progressive.
            </p>
          </div>
          <div className="roadmap-grid">
            <div className="roadmap-card">
              <h3>Dashboard V1</h3>
              <ul>
                <li>CA facturé & encaissé</li>
                <li>Devis en cours et conversion</li>
                <li>Alerte sur impayés</li>
              </ul>
            </div>
            <div className="roadmap-card muted">
              <h3>Analyse financière (V2)</h3>
              <ul>
                <li>Prévision des seuils annuels</li>
                <li>Projection de trésorerie</li>
                <li>Comparatif mensuel avancé</li>
              </ul>
            </div>
            <div className="roadmap-card muted">
              <h3>TVA dynamique (V2)</h3>
              <ul>
                <li>Bascule automatique de régime</li>
                <li>Calculs de TVA selon la date</li>
                <li>Historisation des taux</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section compliance" id="compliance">
          <div className="section-heading">
            <h2>Conformité & sécurité intégrées</h2>
            <p>
              Chaque document reste immuable, traçable, et toujours exportable.
            </p>
          </div>
          <div className="compliance-content">
            <div className="compliance-list">
              <div>
                <h4>Immutabilité</h4>
                <p>
                  Une facture émise est figée et stockée en lecture seule pour
                  garantir l’intégrité fiscale.
                </p>
              </div>
              <div>
                <h4>Standard Factur-X</h4>
                <p>
                  PDF/A-3 hybride avec métadonnées XML prêtes pour injection.
                </p>
              </div>
              <div>
                <h4>RGPD & portabilité</h4>
                <p>
                  Exports complets et suppression de compte encadrée.
                </p>
              </div>
            </div>
            <div className="compliance-panel">
              <h3>Mon Espace Données</h3>
              <p>
                Téléchargez toutes vos factures, devis et journaux en un seul
                clic.
              </p>
              <button className="secondary">Exporter mes données</button>
              <div className="panel-stats">
                <div>
                  <strong>128</strong>
                  <span>PDF générés</span>
                </div>
                <div>
                  <strong>100%</strong>
                  <span>Traçabilité</span>
                </div>
                <div>
                  <strong>0</strong>
                  <span>perte de données</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section cta">
          <div>
            <h2>Prêt à piloter votre facturation ?</h2>
            <p>
              Une interface moderne, construite pour les indépendants exigeants.
            </p>
          </div>
          <div className="cta-actions">
            <button className="primary">Démarrer gratuitement</button>
            <button className="ghost">Voir les offres</button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>
          <h4>InvoiceForge</h4>
          <p>Le socle de facturation conforme pour les indépendants.</p>
        </div>
        <div className="footer-links">
          <a href="#modules">Modules</a>
          <a href="#analytics">Roadmap</a>
          <a href="#compliance">Sécurité</a>
          <a href="#product">Contact</a>
        </div>
        <div className="footer-meta">
          <span>© 2024 InvoiceForge</span>
          <span>Conforme RGPD</span>
        </div>
      </footer>
    </div>
  )
}

export default App
