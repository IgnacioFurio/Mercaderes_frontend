import type {
    MerchantPreview,
    PriceModifierOption,
} from '../types/merchant.types'
interface MerchantCardProps {
    merchant: MerchantPreview | null
    priceModifierOptions: PriceModifierOption[]
    onMerchantFieldChange: (field: keyof MerchantPreview, value: string) => void
}

export const MerchantCard = ({ 
    merchant,
    priceModifierOptions,
    onMerchantFieldChange 

}: MerchantCardProps) => {
    return (
        <div className="row g-4">
            <div className="col-12 col-xl-6">
                <article className="generator-card">
                <header className="generator-card-header">Descripción</header>

                <div className="generator-card-body">
                    {merchant ? (
                    <>
                        <div className="mb-3">
                            <label htmlFor="merchant-name" className="form-label fw-semibold">
                                Nombre
                            </label>
                            <input
                                id="merchant-name"
                                type="text"
                                className="form-control"
                                value={merchant.name}
                                onChange={(event) =>
                                onMerchantFieldChange('name', event.target.value)
                                }
                            />
                            </div>

                            <div className="row g-3 mb-3">
                            <div className="col-12 col-md-6">
                                <label htmlFor="merchant-species" className="form-label fw-semibold">
                                Especie
                                </label>
                                <input
                                id="merchant-species"
                                type="text"
                                className="form-control"
                                value={merchant.species}
                                onChange={(event) =>
                                    onMerchantFieldChange('species', event.target.value)
                                }
                                />
                            </div>

                            <div className="col-12 col-md-6">
                                <label htmlFor="merchant-region" className="form-label fw-semibold">
                                Región
                                </label>
                                <input
                                id="merchant-region"
                                type="text"
                                className="form-control"
                                value={merchant.region}
                                onChange={(event) =>
                                    onMerchantFieldChange('region', event.target.value)
                                }
                                />
                            </div>
                            </div>

                            <div className="mb-3">
                            <label htmlFor="merchant-attitude" className="form-label fw-semibold">
                                Actitud
                            </label>
                            <select
                                id="merchant-attitude"
                                className="form-select"
                                value={merchant.attitude}
                                onChange={(event) =>
                                    onMerchantFieldChange('attitude', event.target.value)
                                }
                                >
                                {priceModifierOptions.map((option) => (
                                    <option key={option.value} value={option.attitudeLabel}>
                                        {option.attitudeLabel} ({option.priceLabel})
                                    </option>
                                ))}
                                </select>
                            </div>

                        <dl className="row mb-0">
                            <dt className="col-sm-5">Tipo de tienda</dt>
                            <dd className="col-sm-7">
                                {merchant.shopType?.name ?? merchant.shopTypeId}
                            </dd>

                            <dt className="col-sm-5">Calidad</dt>
                            <dd className="col-sm-7">
                                {merchant.quality?.name}
                            </dd>

                            <dt className="col-sm-5">Dinero disponible</dt>
                            <dd className="col-sm-7">{merchant.cashAmount}</dd>
                        </dl>
                    </>
                    ) : (
                    <p className="text-secondary mb-0">
                        Pulsa “Generar mercader” para crear una preview desde el
                        backend.
                    </p>
                    )}
                </div>
                </article>
            </div>

            <div className="col-12 col-xl-6">
                <article className="generator-card">
                <header className="generator-card-header">
                    Rasgos de personalidad
                </header>

                <div className="generator-card-body">
                    {merchant ? (
                    <dl className="mb-0">
                        <dt>Rasgo</dt>
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
                    ) : (
                    <p className="text-secondary mb-0">
                        Aquí aparecerán los rasgos narrativos del mercader.
                    </p>
                    )}
                </div>
                </article>
            </div>
        </div>
    )
}