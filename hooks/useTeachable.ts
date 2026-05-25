'use client'

import { useState, useEffect, useCallback } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TeachableCourse {
  id: number
  name: string
  heading: string
  description: string
  image_url: string
  slug: string
  is_free: boolean
  price: number
  currency: string
  url: string
}

export interface TeachableLecture {
  id: number
  name: string
  position: number
  is_published: boolean
  lecture_section_id: number
}

export interface TeachableEnrollment {
  course_id: number
  enrolled_at: string
  percent_complete: number
  completed_at: string | null
}

// ─── Hook: all courses ────────────────────────────────────────────────────────

export function useCourses() {
  const [courses, setCourses] = useState<TeachableCourse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/teachable/courses')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error)
        setCourses(data.courses)
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const freeCourses = courses.filter((c) => c.is_free)
  const paidCourses = courses.filter((c) => !c.is_free)

  return { courses, freeCourses, paidCourses, loading, error }
}

// ─── Hook: single course ──────────────────────────────────────────────────────

export function useCourse(id: number | string) {
  const [course, setCourse] = useState<TeachableCourse | null>(null)
  const [lectures, setLectures] = useState<TeachableLecture[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    fetch(`/api/teachable/courses/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error)
        setCourse(data.course)
        setLectures(data.lectures)
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

  return { course, lectures, loading, error }
}

// ─── Hook: enrollments (authed users only) ────────────────────────────────────

export function useEnrollments() {
  const [enrollments, setEnrollments] = useState<TeachableEnrollment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(() => {
    setLoading(true)
    fetch('/api/teachable/enrollments')
      .then((r) => r.json())
      .then((data) => {
        if (data.error && data.error !== 'Unauthorized') throw new Error(data.error)
        setEnrollments(data.enrollments ?? [])
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { refetch() }, [refetch])

  const isEnrolled = (courseId: number) =>
    enrollments.some((e) => e.course_id === courseId)

  const progressFor = (courseId: number) =>
    enrollments.find((e) => e.course_id === courseId)?.percent_complete ?? 0

  return { enrollments, loading, error, isEnrolled, progressFor, refetch }
}
