"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Lecture {
  id: string;
  title: string;
  position: number;
  youtube_video_id: string | null;
  cloudflare_video_id: string | null;
  is_published: boolean;
  description: string | null;
}

interface Section {
  id: string;
  title: string;
  position: number;
  lectures: Lecture[];
}

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  course_sections: Section[];
}

export default function CoursePlayerPage() {
  const { slug } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [activeLecture, setActiveLecture] = useState<Lecture | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/login"; return; }
      const res = await fetch(`/api/courses/${slug}`);
      const data = await res.json();
      if (data.course) {
        setCourse(data.course);
        const firstLecture = data.course.course_sections
          .flatMap((s: Section) => s.lectures)
          .find((l: Lecture) => l.is_published);
        if (firstLecture) setActiveLecture(firstLecture);
      }
      setLoading(false);
    }
    init();
  }, [slug]);

  if (loading) return (
    <main className="min-h-screen bg-[#f8f5ef] flex items-center justify-center">
      <div className="text-[#f05a28] font-semibold">Loading course...</div>
    </main>
  );

  if (!course) return (
    <main className="min-h-screen bg-[#f8f5ef] flex items-center justify-center">
      <div className="text-slate-600">Course not found.</div>
    </main>
  );

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#111827]">
      <header className="border-b border-[#eadfd5] bg-white/90 backdrop-blur sticky top-0 z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <a href="/learning" className="text-sm text-slate-500 hover:text-[#f05a28]">← Back to Learning</a>
            <span className="text-slate-300">|</span>
            <p className="text-sm font-semibold text-[#15172f] line-clamp-1">{course.title}</p>
          </div>
          <button
            onClick={async () => { await supabase.auth.signOut(); window.location.href = "/login"; }}
            className="rounded-xl bg-[#f05a28] px-4 py-2 text-sm font-semibold text-white hover:bg-[#d94e20]"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {activeLecture ? (
            <div className="space-y-4">
              {activeLecture.youtube_video_id ? (
                <div className="relative w-full rounded-3xl overflow-hidden bg-black" style={{ paddingTop: "56.25%" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${activeLecture.youtube_video_id}?rel=0&modestbranding=1`}
                    title={activeLecture.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : activeLecture.cloudflare_video_id ? (
                <div className="relative w-full rounded-3xl overflow-hidden bg-black" style={{ paddingTop: "56.25%" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://customer-9by1l4bszd0jv43g.cloudflarestream.com/${activeLecture.cloudflare_video_id}/iframe`}
                    title={activeLecture.title}
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center rounded-3xl bg-[#fff7f0] border border-[#eadfd5]">
                  <p className="text-slate-500">Video coming soon</p>
                </div>
              )}

              <div className="rounded-3xl border border-[#eadfd5] bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f05a28] mb-2">Now Playing</p>
                <h2 className="text-2xl font-bold text-[#15172f] mb-3">{activeLecture.title}</h2>
                {activeLecture.description && (
                  <p className="text-base leading-8 text-slate-600">{activeLecture.description}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center rounded-3xl bg-[#fff7f0] border border-[#eadfd5]">
              <p className="text-slate-500">Select a lecture to begin</p>
            </div>
          )}
        </div>

        <div className="space-y-4 md:col-span-1 max-h-[80vh] overflow-y-auto pr-1">
          <div className="rounded-3xl border border-[#eadfd5] bg-white p-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f05a28] mb-4">Course Content</p>
            {course.course_sections.map((section) => (
              <div key={section.id} className="mb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 px-2">{section.title}</p>
                <div className="space-y-1">
                  {section.lectures.map((lecture) => (
                    <button
                      key={lecture.id}
                      onClick={() => lecture.is_published && setActiveLecture(lecture)}
                      className={`w-full text-left rounded-2xl px-4 py-3 text-sm transition-colors ${
                        activeLecture?.id === lecture.id
                          ? "bg-[#f05a28] text-white font-semibold"
                          : lecture.is_published
                          ? "text-slate-700 hover:bg-[#fff7f0] hover:text-[#f05a28]"
                          : "text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lecture.is_published ? "▶" : "🔒"}</span>
                        <span className="line-clamp-2">{lecture.title}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
