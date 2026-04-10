"use client";

import { useEffect, useState } from "react";
import { useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const supabase = useSupabaseClient();
  const { session } = useSessionContext();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      router.push("/auth/login");
    } else {
      fetchUserData();
    }
  }, [session]);

  const fetchUserData = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session?.user.id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setUserData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, {userData?.full_name || session?.user.email}!</h1>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">My Courses</h2>
          <p className="text-gray-600">View and manage your enrolled courses.</p>
          <button
            onClick={() => router.push("/academy")}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Go to Academy
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Certificates</h2>
          <p className="text-gray-600">Download your course completion certificates.</p>
          <button
            onClick={() => router.push("/dashboard/certificates")}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            View Certificates
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Account Settings</h2>
          <p className="text-gray-600">Update your profile and preferences.</p>
          <button
            onClick={() => router.push("/dashboard/settings")}
            className="mt-4 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md"
          >
            Manage Account
          </button>
        </div>
      </section>
    </div>
  );
  }
