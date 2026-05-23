import type { MerchantPreview } from '../types/merchant.types'

interface GeneratorSidebarProps {
    merchant: MerchantPreview | null
    isLoading: boolean
    onGenerateMerchant: () => void
}

export const GeneratorSidebar = ({
    merchant,
    isLoading,
    onGenerateMerchant,
}: GeneratorSidebarProps) => {
    return (
        <section className="merchant-sidebar rounded-4 p-4 h-100">
            <div className="d-grid gap-3">
                <button
                type="button"
                className="btn btn-warning btn-lg fw-semibold"
                onClick={onGenerateMerchant}
                disabled={isLoading}
                >
                {isLoading ? 'Generando...' : 'Generar mercader'}
                </button>

                <button
                type="button"
                className="btn btn-outline-light"
                disabled={!merchant}
                >
                Copiar mercader
                </button>

                <button
                type="button"
                className="btn btn-outline-light"
                disabled={!merchant}
                >
                Guardar en local
                </button>
            </div>

            {merchant && (
                <div className="mt-4 pt-4 border-top border-light border-opacity-25">
                <p className="small text-uppercase text-light-emphasis mb-2">
                    Última preview
                </p>

                <p className="mb-1 fw-semibold">{merchant.name}</p>
                <p className="mb-0 small text-light-emphasis">
                    {merchant.species} · {merchant.region}
                </p>
                </div>
            )}
        </section>
    )
}