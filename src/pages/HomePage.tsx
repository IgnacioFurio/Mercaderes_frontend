import { useState, useEffect } from 'react'
import {
    calculateSale,
    generateMerchantPreview,
    getMerchantOptions,
    getPriceModifierOptions,
} from '../services/merchantService'

import type {
    InventoryItem,
    MerchantGenerationFilters,
    MerchantOptionsResponse,
    MerchantPreview,
    PriceModifierOption,
} from '../types/merchant.types'

import { GeneratorSidebar } from '../components/GeneratorSidebar'
import { MerchantCard } from '../components/MerchantCard'
import { InventoryCard } from '../components/InventoryCard'

function HomePage() {
    const [merchant, setMerchant] = useState<MerchantPreview | null>(null)
    const [inventory, setInventory] = useState<InventoryItem[]>([])
    const [inventorySize, setInventorySize] = useState(0)
    const [sellAmounts, setSellAmounts] = useState<Record<number, number>>({})
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [priceModifierOptions, setPriceModifierOptions] = useState<
        PriceModifierOption[]
        >([])
        const [merchantOptions, setMerchantOptions] = useState<
        MerchantOptionsResponse['data'] | null
        >(null)
    const [generationFilters, setGenerationFilters] =
        useState<MerchantGenerationFilters>({
            shopTypeId: null,
            merchantQualityId: null,
            species: null,
            region: null,
            attitude: null,
            priceModifierPercent: null,
        })

    const generateMerchantData = () => {
        setIsLoading(true)
        setErrorMessage(null)

        generateMerchantPreview({
            name: null,
            species: generationFilters.species,
            region: generationFilters.region,
            attitude: generationFilters.attitude,
            priceModifierPercent: generationFilters.priceModifierPercent,
            shopTypeId: generationFilters.shopTypeId,
            merchantQualityId: generationFilters.merchantQualityId,
            personalityTrait: null,
            ideal: null,
            bond: null,
            flaw: null,
            gimmick: null,
            notes: '',
            })
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

    //USESTATE
    useEffect(() => {
        getMerchantOptions()
            .then((result) => {
                setMerchantOptions(result.data)
            })
            .catch((error) => {
                console.log(error)
                setErrorMessage('No se pudieron cargar las opciones del formulario.')
            })

        getPriceModifierOptions()
            .then((result) => {
            setPriceModifierOptions(result.data)
            })
            .catch((error) => {
            console.log(error)
            setErrorMessage(
                'No se pudieron cargar las opciones de actitud del mercader.',
            )
            })

        generateMerchantData()
    }, [])

    //FUNCTIONS
    

    //HANDLERS
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
        const inventoryItemToSell = inventory.find(
            (inventoryItem) => inventoryItem.itemId === itemId,
        )

        if (!merchant || !inventoryItemToSell) {
            return
        }

        const saleQuantity = sellAmounts[itemId] ?? 1

        calculateSale({
            cashAmountCp: merchant.cashAmountCp,
            itemId: inventoryItemToSell.itemId,
            currentQuantity: inventoryItemToSell.quantity,
            finalPriceCp: inventoryItemToSell.finalPriceCp,
            saleQuantity,
        })
            .then((result) => {
            setMerchant({
                ...merchant,
                cashAmountCp: result.data.merchant.cashAmountCp,
                cashAmount: result.data.merchant.cashAmount,
            })

            setInventory((currentInventory) =>
                currentInventory.map((inventoryItem) => {
                if (inventoryItem.itemId !== result.data.inventoryItem.itemId) {
                    return inventoryItem
                }

                return {
                    ...inventoryItem,
                    quantity: result.data.inventoryItem.quantity,
                    status: result.data.inventoryItem.status,
                }
                }),
            )

            setSellAmounts((currentSellAmounts) => ({
                ...currentSellAmounts,
                [itemId]: result.data.inventoryItem.quantity <= 0 ? 0 : 1,
            }))
            })
            .catch((error) => {
            console.log(error)
            setErrorMessage('No se pudo calcular la venta del objeto.')
            })
        }

    return (
        <main className="min-vh-100 bg-dark text-light">
            <div className="container-fluid py-4">
                <div className="row g-4">
                    <aside className="col-12 col-lg-3 col-xl-2">
                        <GeneratorSidebar
                            merchant={merchant}
                            isLoading={isLoading}
                            merchantOptions={merchantOptions}
                            priceModifierOptions={priceModifierOptions}
                            generationFilters={generationFilters}
                            onGenerationFiltersChange={setGenerationFilters}
                            onGenerateMerchant={generateMerchantData}
                            />
                    </aside>

                <section className="col-12 col-lg-9 col-xl-10">
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                        {errorMessage}
                        </div>
                    )}

                    <div className="row g-4">
                        <div className="col-12">
                        <MerchantCard 
                        merchant={merchant} 
                        />
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