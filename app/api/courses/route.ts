import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  const { data, error } = await supabase
    .from('courses')
    .select(`
      id, title, slug, description, image_url, is_free, price, currency, is_published,
      course_sections (
        id, title, position,
        lectures (
          id, title, position, youtube_video_id, cloudflare_video_id, duration_seconds, is_published
        )
      )
    `)
    .eq('is_published', true)
    .order('title')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Sort sections and lectures by position
  const courses = data.map((course: any) => ({
    ...course,
    course_sections: course.course_sections
      .sort((a: any, b: any) => a.position - b.position)
      .map((section: any) => ({
        ...section,
        lectures: section.lectures.sort((a: any, b: any) => a.position - b.position)
      }))
  }))

  return NextResponse.json({ courses })
}
