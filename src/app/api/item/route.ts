import { NextResponse } from 'next/server'

const BACKEND = process.env.BACKEND_REST_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8443/v1/api'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const qp = url.search ? `?${url.searchParams.toString()}` : ''
    const backendUrl = `${BACKEND.replace(/\/$/, '')}/menu-items/full${qp}`

    const res = await fetch(backendUrl, { method: 'GET' })
    // Try to parse JSON and forward it; fall back to text if parsing fails
    const contentType = res.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      const json = await res.json()
      return NextResponse.json(json, { status: res.status })
    }
    const text = await res.text()
    return new NextResponse(text, { status: res.status, headers: { 'content-type': contentType || 'text/plain' } })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
