export interface NewFlipQueryType {
  cardQuery: string
  itemQuery: string
}

export interface FlipQueryTypes extends NewFlipQueryType {
  uuid: string
}
