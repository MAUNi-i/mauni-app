import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const TEACHABLE_API_BASE = 'https://developers.teachable.com/v1'
const TEACHABLE_API_KEY = process.env.TEACHABLE_API_KEY!

export async function GET(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    }
  )

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const userRes = await fetch(
      `${TEACHABLE_API_BASE}/users?email=${encodeURIComponent(user.email!)}`,
      { headers: { 'apiKey': TEACHABLE_API_KEY, 'Accept': 'application/json' } }
    )

    if (!userRes.ok) return NextResponse.json({ enrollments: [] })

    const userData = await userRes.json()
    const teachableUser = userData.users?.[0]

    if (!teachableUser) return NextResponse.json({ enrollments: [] })

    const enrollRes = await fetch(
      `${TEACHABLE_API_BASE}/users/${teachableUser.id}/enrollments`,
      { headers: { 'apiKey': TEACHABLE_API_KEY, 'Accept': 'application/json' } }
    )

    if (!enrollRes.ok) return NextResponse.json({ enrollments: [] })

    const enrollData = await enrollRes.json()

    return NextResponse.json({
      teachable_user_id: teachableUser.id,
      enrollments: (enrollData.enrollments ?? []).map((e: any) => ({
        course_id: e.course_id,
        enrolled_at: e.created_at,
        percent_complete: e.percent_complete,
        completed_at: e.completed_at,
      })),
    })
  } catch (err) {
    console.error('[Teachable] enrollments error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
