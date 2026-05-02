export interface ShopType {
  id: number
  name: string
}

export interface MerchantQuality {
  id: number
  name: string
}

export interface Item {
  id: number
  name: string
  price: string
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