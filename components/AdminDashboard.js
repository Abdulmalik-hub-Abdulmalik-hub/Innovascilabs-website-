hereimport React, { useState } from 'react';
import { PlusCircle, Trash2, Save } from 'lucide-react';

export default function AdminDashboard() {
  // Tsarin adana abubuwa daban-daban (Portfolio, Courses, Blog)
  const [sections, setSections] = useState({
    portfolio: [{ id: 1, title: '', description: '', image: '' }],
    courses: [{ id: 1, name: '', price: '', duration: '' }],
    blog: [{ id: 1, title: '', content: '' }]
  });

  // Function na kara sabon fage (Add More)
  const addField = (section) => {
    const newField = { id: Date.now(), title: '', description: '', image: '' };
    setSections({ ...sections, [section]: [...sections[section], newField] });
  };

  // Function na goge fage
  const removeField = (section, id) => {
    setSections({
      ...sections,
      [section]: sections[section].filter(item => item.id !== id)
    });
  };

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-4xl font-bold gold-text mb-8">Admin Control Center</h1>
      
      {/* Portfolio Section */}
      <div className="glass-card p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-gold">Manage Portfolio & Projects</h2>
          <button onClick={() => addField('portfolio')} className="flex items-center gap-2 bg-gold text-black px-4 py-2 rounded-lg font-bold">
            <PlusCircle size={20} /> Add New Project
          </button>
        </div>
        
        {sections.portfolio.map((item) => (
          <div key={item.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 border border-gray-800 rounded">
            <input type="text" placeholder="Project Title" className="bg-transparent border-b border-gold p-2 outline-none" />
            <input type="text" placeholder="Description" className="bg-transparent border-b border-gold p-2 outline-none" />
            <button onClick={() => removeField('portfolio', item.id)} className="text-red-500 w-fit"><Trash2 /></button>
          </div>
        ))}
      </div>

      {/* Academy Section */}
      <div className="glass-card p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-gold">InnovaSci Academy (LMS)</h2>
          <button onClick={() => addField('courses')} className="flex items-center gap-2 bg-gold text-black px-4 py-2 rounded-lg font-bold">
            <PlusCircle size={20} /> Add New Course
          </button>
        </div>
        {/* Course input fields will go here similarly */}
      </div>

      <button className="w-full bg-green-600 hover:bg-green-700 p-4 rounded-xl font-bold flex justify-center items-center gap-2 transition">
        <Save /> Save All Changes to Live Website
      </button>
    </div>
  );
    }
