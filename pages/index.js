hereimport { useState } from 'react';
import { supabase } from './_app';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setLoading(true);
    try {
      if (isLogin) {
        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;

        if (!data.user?.email_confirmed_at) {
          toast.info('Please verify your email before logging in.');
        } else {
          toast.success('Login successful!');
          router.push('/home');
        }
      } else {
        // Signup
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + '/verify' }
        });
        if (error) throw error;
        toast.success('Signup successful! Please check your email to verify.');
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          InnovaSci AI Labs Academy
        </h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          onClick={handleAuth}
          disabled={loading}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-bold py-2 rounded"
        >
          {isLogin ? 'Login' : 'Signup'}
        </button>
        <p className="mt-4 text-center">
          {isLogin ? 'New user?' : 'Already have an account?'}{' '}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 cursor-pointer font-semibold"
          >
            {isLogin ? 'Signup' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
      }
