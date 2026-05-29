import { useState } from 'react'

import type {
    MerchantGenerationFilters,
    MerchantOptionsResponse,
    MerchantPreview,
    PriceModifierOption,
} from '../types/merchant.types'

interface GeneratorSidebarProps {
    merchant: MerchantPreview | null
    isLoading: boolean
    merchantOptions: MerchantOptionsResponse['data'] | null
    priceModifierOptions: PriceModifierOption[]
    generationFilters: MerchantGenerationFilters
    onGenerationFiltersChange: React.Dispatch<
        React.SetStateAction<MerchantGenerationFilters>
    >
    onGenerateMerchant: () => void
    onCopyMerchant: () => void
}

export const GeneratorSidebar = ({
    merchant,
    isLoading,
    merchantOptions,
    priceModifierOptions,
    generationFilters,
    onGenerationFiltersChange,
    onGenerateMerchant,
    onCopyMerchant,
    }: GeneratorSidebarProps) => {
    const [showMobileFilters, setShowMobileFilters] = useState(false)

    const shopTypes = merchantOptions?.shopTypes ?? []
    const merchantQualities = merchantOptions?.merchantQualities ?? []
    const speciesOptions = merchantOptions?.species ?? []
    const regionOptions = merchantOptions?.regions ?? []

    const updateGenerationFilter = (
        field: keyof MerchantGenerationFilters,
        value: string,
    ) => {
        onGenerationFiltersChange((currentFilters) => ({
        ...currentFilters,
        [field]: value === '' ? null : value,
        }))
    }

    const updateNumericGenerationFilter = (
        field: 'shopTypeId' | 'merchantQualityId',
        value: string,
    ) => {
        onGenerationFiltersChange((currentFilters) => ({
        ...currentFilters,
        [field]: value === '' ? null : Number(value),
        }))
    }

    return (
        <section className="merchant-sidebar rounded-4 p-4 h-100">
            {!showMobileFilters && (
                <div className="d-flex justify-content-center d-lg-none">
                    <button
                    type="button"
                    className="btn btn-outline-light btn-sm mb-3 mobile-sidebar-toggle"
                    onClick={() => setShowMobileFilters(true)}
                    >
                    Mostrar opciones ▼
                    </button>
                </div>
                )}

            <div
                className={`gap-3 mb-4 ${
                showMobileFilters ? 'd-grid' : 'd-none d-lg-grid'
                }`}
                >
                <div>
                    <label
                        htmlFor="shop-type-filter"
                        className="form-label small text-light-emphasis"
                    >
                        Tipo de tienda
                    </label>
                    <select
                        id="shop-type-filter"
                        className="form-select"
                        value={generationFilters.shopTypeId ?? ''}
                        onChange={(event) =>
                        updateNumericGenerationFilter('shopTypeId', event.target.value)
                        }
                    >
                        <option value="">Aleatorio</option>
                        {shopTypes.map((shopType) => (
                        <option key={shopType.id} value={shopType.id}>
                            {shopType.name}
                        </option>
                        ))}
                    </select>
                </div>

                <div>
                <label
                    htmlFor="quality-filter"
                    className="form-label small text-light-emphasis"
                >
                    Calidad
                </label>
                <select
                    id="quality-filter"
                    className="form-select"
                    value={generationFilters.merchantQualityId ?? ''}
                    onChange={(event) =>
                    updateNumericGenerationFilter(
                        'merchantQualityId',
                        event.target.value,
                    )
                    }
                >
                    <option value="">Aleatoria</option>
                    {merchantQualities.map((quality) => (
                    <option key={quality.id} value={quality.id}>
                        {quality.name}
                    </option>
                    ))}
                </select>
                </div>

                <div>
                <label
                    htmlFor="species-filter"
                    className="form-label small text-light-emphasis"
                >
                    Especie
                </label>
                <select
                    id="species-filter"
                    className="form-select"
                    value={generationFilters.species ?? ''}
                    onChange={(event) =>
                    updateGenerationFilter('species', event.target.value)
                    }
                >
                    <option value="">Aleatoria</option>
                    {speciesOptions.map((species) => (
                    <option key={species} value={species}>
                        {species}
                    </option>
                    ))}
                </select>
                </div>

                <div>
                <label
                    htmlFor="region-filter"
                    className="form-label small text-light-emphasis"
                >
                    Región
                </label>
                <select
                    id="region-filter"
                    className="form-select"
                    value={generationFilters.region ?? ''}
                    onChange={(event) =>
                    updateGenerationFilter('region', event.target.value)
                    }
                >
                    <option value="">Aleatoria</option>
                    {regionOptions.map((region) => (
                    <option key={region} value={region}>
                        {region}
                    </option>
                    ))}
                </select>
                </div>

                <div>
                <label
                    htmlFor="attitude-filter"
                    className="form-label small text-light-emphasis"
                >
                    Actitud
                </label>
                <select
                    id="attitude-filter"
                    className="form-select"
                    value={generationFilters.attitude ?? ''}
                    onChange={(event) => {
                    const selectedAttitude = event.target.value
                    const selectedOption = priceModifierOptions.find(
                        (option) => option.attitudeLabel === selectedAttitude,
                    )

                    onGenerationFiltersChange((currentFilters) => ({
                        ...currentFilters,
                        attitude: selectedAttitude === '' ? null : selectedAttitude,
                        priceModifierPercent:
                        selectedAttitude === '' ? null : selectedOption?.value ?? null,
                    }))
                    }}
                >
                    <option value="">Aleatoria</option>
                    {priceModifierOptions.map((option) => (
                    <option key={option.value} value={option.attitudeLabel}>
                        {option.attitudeLabel} ({option.priceLabel})
                    </option>
                    ))}
                </select>
                </div>
            </div>

            {showMobileFilters && (
                <div className="d-flex justify-content-center d-lg-none">
                    <button
                    type="button"
                    className="btn btn-outline-light btn-sm mb-4 mobile-sidebar-toggle"
                    onClick={() => setShowMobileFilters(false)}
                    >
                    Ocultar opciones ▲
                    </button>
                </div>
                )}

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
                onClick={onCopyMerchant}
                className="btn btn-outline-light"
                disabled={!merchant}
                >
                Copiar mercader
                </button>
            </div>
        </section>
    )
}