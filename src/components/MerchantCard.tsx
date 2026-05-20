import type { MerchantPreview } from '../types/merchant.types'

interface MerchantCardProps {
    merchant: MerchantPreview | null
}

export const MerchantCard = ({ merchant }: MerchantCardProps) => {
    if (!merchant) {
        return (
        <article className="generator-card">
            <header className="generator-card-header">Mercader</header>

            <div className="generator-card-body">
            <p className="text-secondary mb-0">
                Genera un mercader para ver aquí su información.
            </p>
            </div>
        </article>
        )
    }

    return (
        <article className="generator-card">
            <div className="generator-card-body">
                <div className="row mb-2">
                    <div className='col-md-4 col-12'>
                        <h2 className="h3 fw-bold">{merchant.name}
                            <p className="mb-0 fs-6 text-secondary mb-2">
                            ({merchant.species} de {merchant.region})
                            </p>
                        </h2>

                        <p className="text-uppercase text-secondary fw-semibold mb-2">
                            {merchant.shopType?.name ?? 'Tipo de tienda desconocido'} ·{' '}
                            {merchant.quality?.name ?? 'Calidad desconocida'}
                        </p>
                    </div>

                    {/* Cuadros */}
                    <div className='row col-md-7 align-self-center justify-content-between'>
                        <div className="col-4 mb-2">
                            <div className="border rounded-3 p-3 h-100">
                                <p className="text-uppercase text-secondary small fw-semibold mb-1">
                                    Actitud
                                </p>
                                <p className="mb-0 fw-semibold">{merchant.attitude}</p>
                            </div>
                        </div>

                        <div className="col-4 mb-2">
                            <div className="border rounded-3 p-3 h-100">
                            <p className="text-uppercase text-secondary small fw-semibold mb-1">
                                Precio
                            </p>
                            <p className="mb-0 fw-semibold">
                                {merchant.priceModifierPercent > 0
                                ? `+${merchant.priceModifierPercent}%`
                                : `${merchant.priceModifierPercent}%`}
                            </p>
                            </div>
                        </div>

                        <div className="col-4 mb-2">
                            <div className="border rounded-3 p-3 h-100">
                            <p className="text-uppercase text-secondary small fw-semibold mb-1">
                                Caja
                            </p>
                            <p className="mb-0 fw-semibold">{merchant.cashAmount}</p>
                            </div>
                        </div>
                    
                    </div>
                </div>

                <div className='row'>                    
                    {/* Personalidad */}
                    <div className="col-md-8 col-sm-12">
                        <dl className="mb-0">
                        <dt>Detalles</dt>
                        <dd>{merchant.notes || 'Sin más detalles.'}</dd>
                        
                        <dt>Rasgo de Personalidad</dt>
                        <dd>{merchant.personalityTrait}</dd>

                        <dt>Ideal</dt>
                        <dd>{merchant.ideal}</dd>

                        <dt>Vínculo</dt>
                        <dd>{merchant.bond}</dd>

                        <dt>Defecto</dt>
                        <dd>{merchant.flaw}</dd>

                        <dt>Gimmick</dt>
                        <dd>{merchant.gimmick}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </article>
    )
}