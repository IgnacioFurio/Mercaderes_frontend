import type { InventoryItem, MerchantPreview } from '../types/merchant.types'

interface InventoryCardProps {
    merchant: MerchantPreview | null
    inventory: InventoryItem[]
    inventorySize: number
    sellAmounts: Record<number, number>
    onSellAmountChange: (itemId: number, amount: number) => void
    onSellItem: (itemId: number) => void
}

export const InventoryCard = ({
    merchant,
    inventory,
    inventorySize,
    sellAmounts,
    onSellAmountChange,
    onSellItem,
    }: InventoryCardProps) => {
    return (
        <article className="generator-card">
        <header className="generator-card-header">Inventario generado</header>

        <div className="generator-card-body">
            {merchant && (
            <p className="text-secondary mb-4">
                {inventorySize} espacios posibles · {inventory.length} objetos
                compatibles generados.
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
                Este tipo de tienda todavía no tiene objetos compatibles en la base
                de datos para esta combinación.
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
                            <div className="d-flex justify-content-end gap-2">
                                <input
                                type="number"
                                className="form-control form-control-sm sale-amount-input"
                                min={1}
                                max={inventoryItem.quantity}
                                value={
                                    inventoryItem.quantity <= 0
                                    ? 0
                                    : sellAmounts[inventoryItem.itemId] ?? 1
                                }
                                onChange={(event) =>
                                    onSellAmountChange(
                                    inventoryItem.itemId,
                                    Number(event.target.value),
                                    )
                                }
                                disabled={inventoryItem.quantity <= 0}
                                />

                                <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => onSellItem(inventoryItem.itemId)}
                                disabled={inventoryItem.quantity <= 0}
                                >
                                {inventoryItem.quantity <= 0
                                    ? 'Agotado'
                                    : 'Vender'}
                                </button>
                            </div>
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
                        className="border rounded-3 p-3 bg-white text-dark shadow-sm"
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
                            {inventoryItem.notes || inventoryItem.item.notes || '—'}
                        </dd>
                        </dl>

                        <div className="d-flex gap-2">
                            <input
                                type="number"
                                className="form-control sale-amount-input"
                                min={1}
                                max={inventoryItem.quantity}
                                value={
                                inventoryItem.quantity <= 0
                                    ? 0
                                    : sellAmounts[inventoryItem.itemId] ?? 1
                                }
                                onChange={(event) =>
                                    onSellAmountChange(
                                        inventoryItem.itemId,
                                        Number(event.target.value),
                                    )
                                }
                                disabled={inventoryItem.quantity <= 0}
                            />

                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => onSellItem(inventoryItem.itemId)}
                            disabled={inventoryItem.quantity <= 0}
                        >
                            {inventoryItem.quantity <= 0 ? 'Agotado' : 'Vender'}
                        </button>
                        </div>
                    </article>
                    ))}
                </div>
                </div>
            </>
            )}
        </div>
        </article>
    )
}