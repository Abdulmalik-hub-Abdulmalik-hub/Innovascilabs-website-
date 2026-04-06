"use client";

import { useEffect, useState } from "react";
import { useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter, useParams } from "next/navigation";

interface Lesson {
  id: string;
  title: string;
  description: string;
  video_url: string | null;
}

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  price: number;
  is_free: boolean;
  enable_certificate: boolean;
}

export default function CourseDetailPage() {
  const supabase = useSupabaseClient();
  const { session } = useSessionContext();
  const router = useRouter();
  const { courseId } = useParams();

  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    if (!courseId) return;
    fetchCourse();
    checkEnrollment();
  }, [courseId, session]);

  const fetchCourse = async () => {
    try {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("id", courseId)
        .single();

      if (error) {
        console.error(error);
      } else {
        setCourse(data as Course);

        // Fetch lessons
        const { data: lessonsData, error: lessonsError } = await supabase
          .from("lessons")
          .select("*")
          .eq("course_id", courseId)
          .order("created_at", { ascending: true });

        if (lessonsError) console.error(lessonsError);
        else setLessons(lessonsData as Lesson[]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollment = async () => {
    if (!session) return;
    try {
      const { data, error } = await supabase
        .from("payments")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("course_id", courseId)
        .single();

      if (error) {
        setEnrolled(false);
      } else {
        setEnrolled(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEnroll = async () => {
    if (!session) {
      router.push("/auth/login");
      return;
    }

    if (course?.is_free) {
      // Auto-enroll free course
      try {
        const { error } = await supabase.from("payments").insert({
          user_id: session.user.id,
          course_id: courseId,
          amount: 0,
          status: "completed",
        });

        if (error) console.error(error);
        else setEnrolled(true);
      } catch (err) {
        console.error(err);
      }
    } else {
      // Paid course: redirect to checkout (Paystack)
      router.push(`/checkout/course/${courseId}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading course details...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Course not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        {course.thumbnail_url && (
          <img
            src={course.thumbnail_url}
            alt={course.title}
            className="w-full h-60 object-cover rounded-md mb-6"
          />
        )}
        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
        <p className="text-gray-700 mb-4">{course.description}</p>
        <p className="text-gray-800 font-semibold mb-4">
          Price: {course.is_free ? "Free" : `₦${course.price}`}
        </p>
        <button
          onClick={handleEnroll}
          className={`mb-6 px-4 py-2 rounded-md text-white ${
            enrolled ? "bg-green-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={enrolled}
        >
          {enrolled ? "Enrolled" : course.is_free ? "Enroll Now" : "Purchase Course"}
        </button>

        {lessons.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Lessons</h2>
            <ul className="space-y-2">
              {lessons.map((lesson, index) => (
                <li
                  key={lesson.id}
                  className="p-3 bg-gray-100 rounded-md flex justify-between items-center"
                >
                  <span>
                    {index + 1}. {lesson.title}
                  </span>
                  {enrolled && lesson.video_url && (
                    <a
                      href={lesson.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Watch
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {course.enable_certificate && enrolled && (
          <div className="mt-6">
            <button
              onClick={() => router.push(`/dashboard/certificates`)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
              Download Certificate
            </button>
          </div>
        )}
      </div>
    </div>
  );
             }
