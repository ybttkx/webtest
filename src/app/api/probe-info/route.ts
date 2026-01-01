import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const response = await fetch('http://ip-api.com/json', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; WebSecurityInspector/1.0)'
      },
      next: { revalidate: 0 }
    })
    
    if (!response.ok) {
      throw new Error(`IP API responded with ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Failed to fetch probe info:', error)
    return NextResponse.json(
      { error: 'Failed to fetch probe info', details: error.message }, 
      { status: 500 }
    )
  }
}
