export interface NewFlipQueryType {
  cardQuery: string
  itemQuery: string
}

export interface FlipQueryType extends NewFlipQueryType {
  uuid: string
}
