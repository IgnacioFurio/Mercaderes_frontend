import { apiRequest } from './apiClient'
import type { InventoryItem, Merchant, MerchantPreview } from '../types/merchant.types'

interface GenerateMerchantPreviewResponse {
    merchant: MerchantPreview
    inventory: InventoryItem[]
}

interface SaveMerchantBody extends MerchantPreview {
    inventory: InventoryItem[]
}

export async function generateMerchantPreview(): Promise<GenerateMerchantPreviewResponse> {
    return apiRequest<GenerateMerchantPreviewResponse>('/merchants/preview')
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