import { apiRequest } from './apiClient'
import type {
    CalculateSaleBody,
    CalculateSaleResponse,
    GetPriceModifierOptionsResponse,
    InventoryItem,
    Merchant,
    MerchantOptionsResponse,
    MerchantPreview,
    RecalculateInventoryPricesBody,
    RecalculateInventoryPricesResponse,
} from '../types/merchant.types'

interface GenerateMerchantPreviewBody {
    name: string | null
    species: string | null
    region: string | null
    attitude: string | null
    priceModifierPercent: number | null
    shopTypeId: number | null
    merchantQualityId: number | null
    personalityTrait: string | null
    ideal: string | null
    bond: string | null
    flaw: string | null
    gimmick: string | null
    notes: string
}

interface GenerateMerchantPreviewResponse {
    message: string
    data: {
        merchant: MerchantPreview
        inventory: InventoryItem[]
        inventoryCount: number
        inventorySize: number
    }
}

interface SaveMerchantBody extends MerchantPreview {
    inventory: InventoryItem[]
}

export async function generateMerchantPreview(
    body: GenerateMerchantPreviewBody,
): Promise<GenerateMerchantPreviewResponse> {
    return apiRequest<GenerateMerchantPreviewResponse>('/merchants/generate', {
        method: 'POST',
        body: JSON.stringify(body),
    })
}

export async function saveMerchant(body: SaveMerchantBody): Promise<Merchant> {
    return apiRequest<Merchant>('/merchants', {
        method: 'POST',
        body: JSON.stringify(body),
    })
}

export async function getMerchants(): Promise<Merchant[]> {
    return apiRequest<Merchant[]>('/merchants')
}

export async function getMerchantById(id: number): Promise<Merchant> {
    return apiRequest<Merchant>(`/merchants/${id}`)
}

export async function getPriceModifierOptions(): Promise<GetPriceModifierOptionsResponse> {
    return apiRequest<GetPriceModifierOptionsResponse>(
        '/merchants/price-modifier-options',
    )
}

export async function calculateSale(
    body: CalculateSaleBody,
): Promise<CalculateSaleResponse> {
    return apiRequest<CalculateSaleResponse>('/merchants/calculate-sale', {
        method: 'POST',
        body: JSON.stringify(body),
    })
}

export async function getMerchantOptions(): Promise<MerchantOptionsResponse> {
    return apiRequest<MerchantOptionsResponse>('/merchant-options')
}

export async function recalculateInventoryPrices(
    body: RecalculateInventoryPricesBody,
): Promise<RecalculateInventoryPricesResponse> {
    return apiRequest<RecalculateInventoryPricesResponse>(
        '/merchants/recalculate-inventory-prices',
        {
            method: 'POST',
            body: JSON.stringify(body),
        },
    )
}