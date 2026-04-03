import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center bg-white">
      {/* Hero Section Placeholder */}
      <header className="max-w-4xl mx-auto space-y-6">
        <div className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-amber-100 text-amber-800 border border-amber-200">
          InnovaSci AI Labs
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
          Center for <span className="text-amber-600">Computational Science</span> & AI Research
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Empowering the next generation of researchers and engineers through advanced AI training, 
          computational research, and a cutting-edge digital marketplace.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <Link 
            href="/academy" 
            className="px-8 py-3 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-all shadow-sm"
          >
            Explore Academy
          </Link>
          <Link 
            href="/login" 
            className="px-8 py-3 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all"
          >
            Client Login
          </Link>
        </div>
      </header>

      {/* Quick Services Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-6xl mx-auto">
        {[
          { title: 'Research', desc: 'Advancing computational chemistry and physics.' },
          { title: 'Education', desc: 'Professional AI and programming certification.' },
          { title: 'Marketplace', desc: 'Premium digital tools and research assets.' }
        ].map((item, i) => (
          <div key={i} className="p-6 text-left border border-slate-100 rounded-2xl bg-slate-50/50">
            <h3 className="text-xl font-bold mb-2 text-slate-800">{item.title}</h3>
            <p className="text-slate-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
