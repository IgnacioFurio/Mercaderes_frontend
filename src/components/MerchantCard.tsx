import type { MerchantPreview } from '../types/merchant.types'

interface MerchantCardProps {
    merchant: MerchantPreview | null
}

export const MerchantCard = ({ merchant }: MerchantCardProps) => {
    return (
        <div className="row g-4">
        <div className="col-12 col-xl-6">
            <article className="generator-card">
            <header className="generator-card-header">Descripción</header>

            <div className="generator-card-body">
                {merchant ? (
                <>
                    <h2 className="h3 fw-bold mb-3">{merchant.name}</h2>

                    <p>
                        {merchant.name} es un mercader de especie{' '}
                        <strong>{merchant.species}</strong>, procedente de{' '}
                        <strong>{merchant.region}</strong>.
                    </p>

                    <p>
                        Su actitud inicial es <strong>{merchant.attitude}</strong>.
                    </p>

                    <dl className="row mb-0">
                        <dt className="col-sm-5">Tipo de tienda</dt>
                        <dd className="col-sm-7">
                            {merchant.shopType?.name ?? merchant.shopTypeId}
                        </dd>

                        <dt className="col-sm-5">Calidad</dt>
                        <dd className="col-sm-7">
                            {merchant.quality?.name}
                        </dd>
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