"use client";

import { useEffect, useState, useCallback } from "react";
import { useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

// Define a type for your profile for better DX
interface UserProfile {
  full_name: string;
  avatar_url?: string;
  // add other fields...
}

export default function DashboardPage() {
  const supabase = useSupabaseClient();
  const { session, isLoading: sessionLoading } = useSessionContext();
  const router = useRouter();
  
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = useCallback(async () => {
    if (!session?.user?.id) return;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) throw error;
      setUserData(data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  }, [session, supabase]);

  useEffect(() => {
    // Wait for the session context to finish its initial check
    if (sessionLoading) return;

    if (!session) {
      router.push("/auth/login");
    } else {
      fetchUserData();
    }
  }, [session, sessionLoading, router, fetchUserData]);

  // Combined loading state for session check and data fetch
  if (sessionLoading || (loading && session)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500">Loading your dashboard...</div>
      </div>
    );
  }

  // Prevent flash of content if redirected
  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome, {userData?.full_name || session.user.email}!
        </h1>
        <p className="text-gray-500">Track your progress and manage your learning journey.</p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <DashboardCard 
          title="My Courses"
          description="View and manage your enrolled courses."
          buttonText="Go to Academy"
          buttonColor="bg-blue-600 hover:bg-blue-700"
          onClick={() => router.push("/academy")}
        />

        <DashboardCard 
          title="Certificates"
          description="Download your course completion certificates."
          buttonText="View Certificates"
          buttonColor="bg-green-600 hover:bg-green-700"
          onClick={() => router.push("/dashboard/certificates")}
        />

        <DashboardCard 
          title="Account Settings"
          description="Update your profile and preferences."
          buttonText="Manage Account"
          buttonColor="bg-gray-800 hover:bg-gray-900"
          onClick={() => router.push("/dashboard/settings")}
        />
      </main>
    </div>
  );
}

// Small sub-component for UI consistency
function DashboardCard({ title, description, buttonText, buttonColor, onClick }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-hover hover:shadow-md">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 text-sm mb-6">{description}</p>
      <button
        onClick={onClick}
        className={`w-full ${buttonColor} text-white px-4 py-2.5 rounded-lg font-medium transition-colors`}
      >
        {buttonText}
      </button>
    </div>
  );
}
