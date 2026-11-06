/**
 * Live Bidchale listings from the public API used by bidchale.com.
 * Fetched on the server and cached for REVALIDATE_SECONDS, so new or changed listings
 * appear on the Talixora site automatically — no redeploy needed.
 */

const API = 'https://www.bidchale.com/api/public/lots'
export const BIDCHALE_REVALIDATE_SECONDS = 300
export const BIDCHALE_LISTINGS_URL = 'https://www.bidchale.com/bidder/all-items'

/** Shape the website needs (a small, stable subset of the API response). */
export type BidchaleLot = {
  id: string
  title: string
  category: string
  image: string
  currentBid: number
  bidIncrement: number
  bidCount: number
  buyNowPrice: number | null
  startsAt: string | null
  endsAt: string | null
  pickup: boolean
  delivery: boolean
  url: string
  /** false for the bundled fallback samples */
  live: boolean
}

type ApiLot = {
  id: number | string
  title?: string
  status?: string
  reviewStatus?: string
  currentBid?: number
  startingBid?: number
  bidIncrement?: number
  bidCount?: number
  buyNowPrice?: number | null
  bidStartTime?: string | null
  bidEndTime?: string | null
  pickupAvailable?: boolean
  shippingAvailable?: boolean
  primaryImage?: string | null
  images?: { url: string; isPrimary?: boolean }[]
  category?: { name?: string } | null
}

type ApiResponse = { data?: { data?: ApiLot[] } | ApiLot[] }

function toLot(l: ApiLot): BidchaleLot | null {
  const image = l.primaryImage || l.images?.find((i) => i.isPrimary)?.url || l.images?.[0]?.url
  const title = l.title?.trim()
  if (!image || !title) return null
  if (l.status && l.status !== 'active') return null
  if (l.reviewStatus && l.reviewStatus !== 'approved') return null
  return {
    id: String(l.id),
    title,
    category: l.category?.name?.trim() || 'Bidchale',
    image,
    currentBid: Number(l.currentBid ?? l.startingBid ?? 0),
    bidIncrement: Number(l.bidIncrement ?? 1),
    bidCount: Number(l.bidCount ?? 0),
    buyNowPrice: l.buyNowPrice ? Number(l.buyNowPrice) : null,
    startsAt: l.bidStartTime ?? null,
    endsAt: l.bidEndTime ?? null,
    pickup: Boolean(l.pickupAvailable),
    delivery: Boolean(l.shippingAvailable),
    url: BIDCHALE_LISTINGS_URL,
    live: true,
  }
}

async function fetchLots(query: string): Promise<BidchaleLot[]> {
  try {
    const res = await fetch(`${API}${query}`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: BIDCHALE_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(6000),
    })
    if (!res.ok) return []
    const json = (await res.json()) as ApiResponse
    const list = Array.isArray(json.data) ? json.data : json.data?.data ?? []
    const now = Date.now()
    return list
      .map(toLot)
      .filter((l): l is BidchaleLot => !!l)
      // Drop auctions that have already ended.
      .filter((l) => !l.endsAt || new Date(l.endsAt).getTime() > now)
  } catch {
    return []
  }
}

/** Live auctions (ending soonest first), falling back to featured lots. Never throws. */
export async function getBidchaleLots(limit = 5): Promise<BidchaleLot[]> {
  const endingSoon = await fetchLots(`?limit=${limit}&orderBy=ending_soon`)
  if (endingSoon.length) return endingSoon.slice(0, limit)
  const featured = await fetchLots(`/featured?limit=${limit}`)
  return featured.slice(0, limit)
}
