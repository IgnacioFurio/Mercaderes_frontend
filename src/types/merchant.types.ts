export interface ShopType {
  id: number
  name: string
  description?: string
}

export interface MerchantQuality {
  id: number
  name: string
  rank?: number
  description?: string
  cashFormula?: string
}

export interface Item {
  id: number
  name: string
  price: string
  basePriceCp: number
  quantityFormula: string
  source: string
  notes: string
  shopTypeId: number
  merchantQualityId: number
}

export interface InventoryItem {
  itemId: number
  quantity: number
  finalPrice: string
  finalPriceCp: number
  status: string
  notes: string
  item: Item
}

export interface MerchantPreview {
  name: string
  species: string
  region: string
  attitude: string
  personalityTrait: string
  priceModifierPercent: number
  cashAmount: string
  cashAmountCp: number
  ideal: string
  bond: string
  flaw: string
  gimmick: string
  notes: string
  shopTypeId: number
  merchantQualityId: number
  shopType?: ShopType
  quality?: MerchantQuality
}

export interface Merchant extends MerchantPreview {
  id: number
  inventory?: InventoryItem[]
}

export interface PriceModifierOption {
  attitudeLabel: string
  priceLabel: string
  value: number
  description: string
}

export interface GetPriceModifierOptionsResponse {
  message: string
  data: PriceModifierOption[]
}

export interface CalculateSaleBody {
  cashAmountCp: number
  itemId: number
  currentQuantity: number
  finalPriceCp: number
  saleQuantity: number
}

export interface CalculateSaleResponse {
  message: string
  data: {
    saleSummary: {
      itemId: number
      quantity: number
      unitPriceCp: number
      unitPrice: string
      totalPriceCp: number
      totalPrice: string
    }
    merchant: {
      cashAmountCp: number
      cashAmount: string
    }
    inventoryItem: {
      itemId: number
      quantity: number
      status: string
    }
  }
}