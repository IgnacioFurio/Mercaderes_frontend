import { Link } from 'react-router-dom'

import type { SavedMerchant } from '../types/merchant.types'

interface SavedMerchantPreviewCardProps {
    savedMerchant: SavedMerchant
}

export const SavedMerchantPreviewCard = ({
    savedMerchant,
}: SavedMerchantPreviewCardProps) => {
    const savedDate = new Date(savedMerchant.savedAt).toLocaleDateString()

    return (
        <Link
        to={`/?savedMerchantId=${savedMerchant.id}`}
        className="text-decoration-none text-light"
        >
        <article className="generator-card saved-merchant-card h-100">
            <div className="generator-card-body saved-merchant-card-body">
            <p className="text-uppercase text-secondary fw-semibold small mb-1">
                {savedMerchant.merchant.shopType?.name ?? 'Tipo desconocido'} ·{' '}
                {savedMerchant.merchant.quality?.name ?? 'Calidad desconocida'}
            </p>

            <h2 className="h5 fw-bold mb-1">{savedMerchant.merchant.name}</h2>

            <p className="text-light-emphasis small mb-3">
                {savedMerchant.merchant.species} de {savedMerchant.merchant.region}
            </p>

            <div className="d-flex flex-column gap-1 small">
                <div className="d-flex justify-content-between gap-3">
                <span className="text-secondary">Inventario</span>
                <span>{savedMerchant.inventory.length} objetos</span>
                </div>

                <div className="d-flex justify-content-between gap-3">
                <span className="text-secondary">Actitud</span>
                <span>{savedMerchant.merchant.attitude}</span>
                </div>

                <div className="d-flex justify-content-between gap-3">
                <span className="text-secondary">Caja</span>
                <span>{savedMerchant.merchant.cashAmount}</span>
                </div>

                <div className="d-flex justify-content-between gap-3">
                <span className="text-secondary">Guardado</span>
                <span>{savedDate}</span>
                </div>
            </div>
            </div>
        </article>
        </Link>
    )
}