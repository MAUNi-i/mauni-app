'use client'

import { useCourses, useEnrollments } from '@/hooks/useTeachable'

/**
 * CourseCatalogue
 * Drop this anywhere in KokoRoZaShi to render Teachable content.
 * - Free courses: visible + accessible to all
 * - Paid courses: visible to all, but locked behind auth/enrollment
 */
export default function CourseCatalogue() {
  const { freeCourses, paidCourses, loading: coursesLoading } = useCourses()
  const { isEnrolled, loading: enrollLoading } = useEnrollments()

  if (coursesLoading) return <p className="text-muted">Loading courses…</p>

  return (
    <div className="space-y-12">
      {/* ── Free ── */}
      {freeCourses.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Free Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                locked={false}
                enrolled={false}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── Paid ── */}
      {paidCourses.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Premium Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paidCourses.map((course) => {
              const enrolled = !enrollLoading && isEnrolled(course.id)
              return (
                <CourseCard
                  key={course.id}
                  course={course}
                  locked={!enrolled}
                  enrolled={enrolled}
                />
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}

// ─── Card ──────────────────────────────────────────────────────────────────────

interface CourseCardProps {
  course: {
    id: number
    name: string
    heading: string
    image_url: string
    is_free: boolean
    price: number
    currency: string
    url: string
  }
  locked: boolean
  enrolled: boolean
}

function CourseCard({ course, locked, enrolled }: CourseCardProps) {
  const handleClick = () => {
    if (locked) {
      // TODO: redirect to your payment/signup flow
      window.location.href = course.url
    } else {
      window.open(course.url, '_blank')
    }
  }

  return (
    <div className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
      {course.image_url && (
        <img
          src={course.image_url}
          alt={course.name}
          className="w-full h-40 object-cover"
        />
      )}

      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              course.is_free
                ? 'bg-green-100 text-green-700'
                : 'bg-amber-100 text-amber-700'
            }`}
          >
            {course.is_free ? 'Free' : `${course.currency} ${course.price}`}
          </span>
          {enrolled && (
            <span className="text-xs text-blue-600 font-medium">✓ Enrolled</span>
          )}
        </div>

        <h3 className="font-semibold text-base leading-tight">{course.name}</h3>
        {course.heading && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {course.heading}
          </p>
        )}

        <button
          onClick={handleClick}
          className={`w-full mt-2 py-2 rounded-lg text-sm font-medium transition-colors ${
            locked
              ? 'bg-muted text-muted-foreground hover:bg-muted/80'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          }`}
        >
          {locked ? '🔒 Unlock Course' : enrolled ? 'Continue' : 'Start Course'}
        </button>
      </div>
    </div>
  )
}
