import { useEffect, useState } from 'react';
import { supabase } from './_app';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        toast.info('Please login first.');
        router.push('/');
      } else {
        setUser(data.session.user);
      }
    });

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        router.push('/');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    toast.success('Logged out successfully');
  };

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-6">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Welcome, {user.email}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Feature Cards */}
        {[
          { title: 'Services', link: '/services' },
          { title: 'Blog', link: '/blog' },
          { title: 'Academy', link: '/academy' },
          { title: 'Client Dashboard', link: '/client' },
          { title: 'AI Assistant - Hakeem', link: '/ai-assistant' },
          { title: 'Certificate Generator', link: '/certificate' }
        ].map((feature, idx) => (
          <div
            key={idx}
            onClick={() => router.push(feature.link)}
            className="cursor-pointer bg-white p-6 rounded-lg shadow hover:shadow-lg transform hover:-translate-y-1 transition-all"
          >
            <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
            <p className="text-gray-500">Click to access {feature.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
      }
