import { apiRequest } from './apiClient'
import type { InventoryItem, Merchant, MerchantPreview } from '../types/merchant.types'

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

export async function generateMerchantPreview(): Promise<GenerateMerchantPreviewResponse> {
    return apiRequest<GenerateMerchantPreviewResponse>('/merchants/generate', {
    method: 'POST',
    body: JSON.stringify({
        name: null,
        species: null,
        region: null,
        shopTypeId: null,
        merchantQualityId: null,
        personalityTrait: null,
        ideal: null,
        bond: null,
        flaw: null,
        gimmick: null,
        attitude: null,
        notes: '',
        }),
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