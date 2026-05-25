import { NextResponse } from 'next/server'

const TEACHABLE_API_BASE = 'https://developers.teachable.com/v1'
const TEACHABLE_API_KEY = process.env.TEACHABLE_API_KEY!

export async function GET() {
  try {
    const res = await fetch(`${TEACHABLE_API_BASE}/courses`, {
      headers: {
        'apiKey': TEACHABLE_API_KEY,
        'Accept': 'application/json',
      },
      next: { revalidate: 300 },
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch courses from Teachable' },
        { status: res.status }
      )
    }

    const data = await res.json()

    const courses = (data.courses ?? []).map((course: any) => ({
      id: course.id,
      name: course.name,
      heading: course.heading,
      description: course.description,
      image_url: course.image_url,
      slug: course.slug,
      is_free: course.price === 0 || course.is_free === true,
      price: course.price,
      currency: course.currency ?? 'GBP',
      url: `https://mauni.teachable.com/p/${course.slug}`,
    }))

    return NextResponse.json({ courses })
  } catch (err) {
    console.error('[Teachable] courses error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
