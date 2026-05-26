import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  const { data, error } = await supabase
    .from('courses')
    .select(`
      id, title, slug, description, image_url, is_free, price, currency,
      course_sections (
        id, title, position,
        lectures (
          id, title, position, youtube_video_id, cloudflare_video_id, duration_seconds, is_published
        )
      )
    `)
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 404 })

  const course = {
    ...data,
    course_sections: data.course_sections
      .sort((a: any, b: any) => a.position - b.position)
      .map((section: any) => ({
        ...section,
        lectures: section.lectures.sort((a: any, b: any) => a.position - b.position)
      }))
  }

  return NextResponse.json({ course })
}
