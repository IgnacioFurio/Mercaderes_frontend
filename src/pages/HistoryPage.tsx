import { Link } from 'react-router-dom'

import { getSavedMerchants } from '../services/localStorageService'

import { SavedMerchantPreviewCard } from '../components/SavedMerchantPreviewCard'

export const HistoryPage = () => {
    const savedMerchants = getSavedMerchants()

    return (
        <div className="container py-4">
            <header className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                <div>
                    <h1 className="display-6 fw-bold mb-2">Mercaderes guardados</h1>

                    <p className="text-light-emphasis mb-0">
                    Consulta los últimos mercaderes generados y guardados en este
                    navegador.
                    </p>
                </div>

                <Link to="/" className="btn btn-outline-light sidebar-action-button">
                    Volver al generador
                </Link>
            </header>

            {savedMerchants.length === 0 ? (
            <section className="generator-card">
                <div className="generator-card-body">
                <p className="mb-0 text-secondary">
                    Todavía no hay mercaderes guardados en localStorage.
                </p>
                </div>
            </section>
            ) : (
            <section className="row g-4">
                {savedMerchants.map((savedMerchant) => (
                    <div key={savedMerchant.id} className="col-12 col-md-6 col-lg-4">
                        <SavedMerchantPreviewCard savedMerchant={savedMerchant} />
                    </div>
                ))}
            </section>
            )}
        </div>
    )
}