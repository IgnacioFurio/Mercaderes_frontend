import { apiRequest } from './apiClient'
import type { InventoryItem, Item } from '../types/merchant.types'

interface GetCompatibleItemsParams {
    shopTypeId?: number
    merchantQualityId?: number
}

interface CreateInventoryItemsBody {
    itemIds: number[]
}

interface GenerateRandomItemsBody {
    shopTypeId: number
    merchantQualityId: number
    amount?: number
    excludedItemIds?: number[]
}

export async function getCompatibleItems(
    params: GetCompatibleItemsParams = {},
    ): Promise<Item[]> {
    const searchParams = new URLSearchParams()

    if (params.shopTypeId) {
        searchParams.append('shopTypeId', params.shopTypeId.toString())
    }

    if (params.merchantQualityId) {
        searchParams.append('merchantQualityId', params.merchantQualityId.toString())
    }

    const queryString = searchParams.toString()
    const endpoint = queryString
        ? `/items/compatible?${queryString}`
        : '/items/compatible'

    return apiRequest<Item[]>(endpoint)
}

export async function createInventoryItems(
    body: CreateInventoryItemsBody,
    ): Promise<InventoryItem[]> {
    return apiRequest<InventoryItem[]>('/items/inventory-items', {
        method: 'POST',
        body: JSON.stringify(body),
    })
}

export async function generateRandomInventoryItems(
    body: GenerateRandomItemsBody,
    ): Promise<InventoryItem[]> {
    return apiRequest<InventoryItem[]>('/items/generate-random', {
        method: 'POST',
        body: JSON.stringify(body),
    })
}