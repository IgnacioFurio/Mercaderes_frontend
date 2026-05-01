import { useState, useEffect } from 'react'
import { generateMerchantPreview } from '../services/merchantService'
import type { InventoryItem, MerchantPreview } from '../types/merchant.types'

function HomePage() {
    const [merchant, setMerchant] = useState<MerchantPreview | null>(null)
    const [inventory, setInventory] = useState<InventoryItem[]>([])
    const [inventorySize, setInventorySize] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    useEffect(() => {
            if (!merchant) return
            console.log('Merchant completo:', merchant)
            console.log('Calidad merchantQuality:', merchant.merchantQuality)
            console.log('Calidad quality:', (merchant as any).quality.name)   
            console.log('merchantQualityId:', merchant.merchantQualityId)
            }, [merchant])

    async function handleGenerateMerchant() {
        try {
        setIsLoading(true)
        setErrorMessage(null)

        const response = await generateMerchantPreview()


        setMerchant(response.data.merchant)
        setInventory(response.data.inventory)
        setInventorySize(response.data.inventorySize)
        } catch (error) {
        setErrorMessage(
            'No se pudo generar el mercader. Revisa que el backend esté encendido.',
        )
        } finally {
        setIsLoading(false)
        }
    }

    return (
        <main className="min-vh-100 bg-dark text-light">
        <div className="container-fluid py-4">
            <div className="row g-4">
            <aside className="col-12 col-lg-3 col-xl-2">
                <section className="merchant-sidebar rounded-4 p-4 h-100">
                <h1 className="h2 fw-light mb-4">Mercaderes</h1>

                <p className="text-light-emphasis mb-4">
                    Generador de tiendas para partidas de rol.
                </p>

                <div className="d-grid gap-3">
                    <button
                    type="button"
                    className="btn btn-warning btn-lg fw-semibold"
                    onClick={handleGenerateMerchant}
                    disabled={isLoading}
                    >
                    {isLoading ? 'Generando...' : 'Generar mercader'}
                    </button>

                    <button
                    type="button"
                    className="btn btn-outline-light"
                    disabled={!merchant}
                    >
                    Guardar mercader
                    </button>

                    <button type="button" className="btn btn-outline-light">
                    Ver guardados
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
            </aside>

            <section className="col-12 col-lg-9 col-xl-10">
                {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
                )}

                <div className="row g-4">
                <div className="col-12 col-xl-6">
                    <article className="generator-card">
                    <header className="generator-card-header">
                        Descripción
                    </header>

                    <div className="generator-card-body">
                        {merchant ? (
                        <>
                            <h2 className="h3 fw-bold mb-3">{merchant.name}</h2>

                            <p>
                            {merchant.name} es un mercader {' '}
                            <strong>{merchant.species}</strong>, procedente de{' '}
                            <strong>{merchant.region}</strong>.
                            </p>

                            <p>
                            Su actitud inicial es{' '}
                            <strong>{merchant.attitude}</strong>.
                            </p>

                            <dl className="row mb-0">
                            <dt className="col-sm-5">Tipo de tienda</dt>
                            <dd className="col-sm-7">
                                {merchant.shopType?.name ?? merchant.shopTypeId}
                            </dd>

                            <dt className="col-sm-5">Calidad</dt>
                            <dd className="col-sm-7">
                                {(merchant as any).quality.name ??
                                merchant.merchantQualityId}
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
                    <div className="generator-card-body">
                        {merchant ? (
                        <dl className="mb-0">
                            <dt>Rasgo de personalidad</dt>
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
                </div>

                <div className="col-12">
                    <article className="generator-card">
                    <header className="generator-card-header">
                        Inventario generado
                    </header>

                    <div className="generator-card-body">
                        {merchant && (
                        <p className="text-secondary mb-4">
                            {inventorySize} espacios posibles · {inventory.length}{' '}
                            objetos compatibles generados.
                        </p>
                        )}

                        {!merchant && (
                        <p className="text-secondary mb-0">
                            El inventario aparecerá después de generar un mercader.
                        </p>
                        )}

                        {merchant && inventory.length === 0 && (
                        <div className="alert alert-warning mb-0" role="alert">
                            <strong>Mercader generado correctamente.</strong>
                            <br />
                            Este tipo de tienda todavía no tiene objetos compatibles
                            en la base de datos para esta combinación.
                        </div>
                        )}

                        {inventory.length > 0 && (
                        <>
                            <div className="d-none d-md-block">
                            <div className="table-responsive">
                                <table className="table table-striped table-hover align-middle mb-0">
                                <thead>
                                    <tr>
                                    <th scope="col">Objeto</th>
                                    <th scope="col">Cantidad</th>
                                    <th scope="col">Precio/u</th>
                                    <th scope="col">Recurso</th>
                                    <th scope="col">Notas</th>
                                    <th scope="col" className="text-end">
                                        Acción
                                    </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {inventory.map((inventoryItem) => (
                                    <tr key={inventoryItem.itemId}>
                                        <td className="fw-semibold">
                                        {inventoryItem.item.name}
                                        </td>
                                        <td>{inventoryItem.quantity}</td>
                                        <td>{inventoryItem.finalPrice}</td>
                                        <td>{inventoryItem.item.source || '—'}</td>
                                        <td>
                                        {inventoryItem.notes ||
                                            inventoryItem.item.notes ||
                                            '—'}
                                        </td>
                                        <td className="text-end">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-primary"
                                        >
                                            Vender
                                        </button>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                                </table>
                            </div>
                            </div>

                            <div className="d-md-none">
                            <div className="d-flex flex-column gap-3">
                                {inventory.map((inventoryItem) => (
                                <article
                                    key={inventoryItem.itemId}
                                    className="order rounded-3 p-3 bg-white text-dark shadow-sm"
                                >
                                    <h3 className="h5 fw-bold mb-3">
                                    {inventoryItem.item.name}
                                    </h3>

                                    <dl className="mb-3 inventory-mobile-details">
                                    <dt>Cantidad</dt>
                                    <dd>{inventoryItem.quantity}</dd>

                                    <dt>Precio por unidad</dt>
                                    <dd>{inventoryItem.finalPrice}</dd>

                                    <dt>Recurso</dt>
                                    <dd>{inventoryItem.item.source || '—'}</dd>

                                    <dt>Notas</dt>
                                    <dd>
                                        {inventoryItem.notes ||
                                        inventoryItem.item.notes ||
                                        '—'}
                                    </dd>
                                    </dl>

                                    <button
                                    type="button"
                                    className="btn btn-outline-primary w-100"
                                    >
                                    Vender
                                    </button>
                                </article>
                                ))}
                            </div>
                            </div>
                        </>
                        )}
                    </div>
                    </article>
                </div>
                </div>
            </section>
            </div>
        </div>
        </main>
    )
}

export default HomePage