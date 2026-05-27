import type { SavedMerchant } from '../types/merchant.types'

const SAVED_MERCHANTS_KEY = 'mercaderes_saved_merchants'
const MAX_SAVED_MERCHANTS = 20

export const getSavedMerchants = (): SavedMerchant[] => {
    const savedMerchants = localStorage.getItem(SAVED_MERCHANTS_KEY)

    if (!savedMerchants) {
        return []
    }

    try {
        return JSON.parse(savedMerchants) as SavedMerchant[]
    } catch (error) {
        console.log(error)
        return []
    }
}

export const saveMerchantToLocalStorage = (
    savedMerchant: SavedMerchant,
): SavedMerchant[] => {
    const currentSavedMerchants = getSavedMerchants()

    const updatedSavedMerchants = [
        savedMerchant,
        ...currentSavedMerchants,
    ].slice(0, MAX_SAVED_MERCHANTS)

    localStorage.setItem(
        SAVED_MERCHANTS_KEY,
        JSON.stringify(updatedSavedMerchants),
    )

    return updatedSavedMerchants
}