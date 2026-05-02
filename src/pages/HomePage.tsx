import { useState, useEffect } from 'react'
import { generateMerchantPreview } from '../services/merchantService'
import type { InventoryItem, MerchantPreview } from '../types/merchant.types'

import { InventoryCard } from '../components/InventoryCard'
import { MerchantCard } from '../components/MerchantCard'

function HomePage() {
    const [merchant, setMerchant] = useState<MerchantPreview | null>(null)
    const [inventory, setInventory] = useState<InventoryItem[]>([])
    const [inventorySize, setInventorySize] = useState(0)
    const [sellAmounts, setSellAmounts] = useState<Record<number, number>>({})
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const generateMerchantData = () => {
        setIsLoading(true)
        setErrorMessage(null)

        generateMerchantPreview()
            .then((result) => {
            setMerchant(result.data.merchant)
            setInventory(result.data.inventory)
            setInventorySize(result.data.inventorySize)
            })
            .catch((error) => {
            console.log(error)
            setErrorMessage(
                'No se pudo generar el mercader. Revisa que el backend esté encendido.',
            )
            })
            .finally(() => {
            setIsLoading(false)
            })
        }

    const handleSellAmountChange = (itemId: number, amount: number) => {
        const inventoryItem = inventory.find((item) => item.itemId === itemId)

        if (!inventoryItem) {
            return
        }

        const maxAvailableQuantity = inventoryItem.quantity

        if (maxAvailableQuantity <= 0) {
            setSellAmounts((currentSellAmounts) => ({
            ...currentSellAmounts,
            [itemId]: 0,
            }))

            return
        }

        const safeAmount = Math.min(
            Math.max(Number.isNaN(amount) ? 1 : amount, 1),
            maxAvailableQuantity,
        )

        setSellAmounts((currentSellAmounts) => ({
            ...currentSellAmounts,
            [itemId]: safeAmount,
        }))
        }

    const handleSellItem = (itemId: number) => {
        const amountToSell = sellAmounts[itemId] ?? 1

        setInventory((currentInventory) =>
            currentInventory.map((inventoryItem) => {
            if (inventoryItem.itemId !== itemId) {
                return inventoryItem
            }

            const validAmountToSell = Math.min(amountToSell, inventoryItem.quantity)
            const nextQuantity = Math.max(inventoryItem.quantity - validAmountToSell, 0)

            return {
                ...inventoryItem,
                quantity: nextQuantity,
                status: nextQuantity <= 0 ? 'Agotado' : inventoryItem.status,
            }
            }),
        )

        setSellAmounts((currentSellAmounts) => ({
            ...currentSellAmounts,
            [itemId]: 1,
        }))
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
                            onClick={generateMerchantData}
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
                        <div className="col-12">
                        <MerchantCard merchant={merchant} />
                        </div>

                        <div className="col-12">
                        <InventoryCard
                            merchant={merchant}
                            inventory={inventory}
                            inventorySize={inventorySize}
                            sellAmounts={sellAmounts}
                            onSellAmountChange={handleSellAmountChange}
                            onSellItem={handleSellItem}
                        />
                        </div>
                    </div>
                    </section>
                </div>
            </div>
        </main>
    )
}

export default HomePage