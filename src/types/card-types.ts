import { GridRowsProp } from '@mui/x-data-grid'

export interface CardTypes {
  cardInfo: {
    priceInChaosIfFullStackSize: number
    priceInDivineIfFullStackSize: number
    poeTradeLink: string
    chaosPrice: number
    divinePrice: number
    name: string
    stackSize: number
  }
  itemInfo: {
    priceInChaosIfFullStackSize: number
    priceInDivineIfFullStackSize: number
    poeTradeLink: string
    chaosPrice: number
    divinePrice: number
    name: string
    stackSize: number
  }
  profitInDivine: number
  profitInDivinePerCard: number
  profitInChaos: number
  profitInChaosPerCard: number
}

export interface ItemInfoType {
  priceInChaosIfFullStackSize: number
  priceInDivineIfFullStackSize: number
  poeTradeLink: string
  chaosPrice: number
  divinePrice: number
  name: string
  stackSize: number
}

export interface PoeFlipDataType {
  poeData: { cards: GridRowsProp<CardTypes>; gems: [] }
  lastUpdate: Date
  canUpdate: boolean
}
