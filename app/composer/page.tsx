"use client";
import { useMemo, useState } from 'react';
import { generateCaption, generateHashtags } from '../../lib/generator';
import { platforms as platformList, Platform } from '../../lib/utils';
import { useStore } from '../../lib/store';

export default function ComposerPage() {
  const [category, setCategory] = useState('lifestyle');
  const [topic, setTopic] = useState('morning routine productivity');
  const [selected, setSelected] = useState<Platform[]>(['instagram','facebook']);
  const [when, setWhen] = useState<string>('');

  const caption = useMemo(() => generateCaption(category, topic), [category, topic]);
  const hashtags = useMemo(() => generateHashtags(category, topic, selected), [category, topic, selected]);

  const createPost = useStore(s => s.createPost);

  const onSchedule = () => {
    createPost({ caption, hashtags, platforms: selected, scheduledAt: when || new Date(Date.now()+60000).toISOString() });
    setWhen('');
  };
  const onDraft = () => {
    createPost({ caption, hashtags, platforms: selected });
  };

  const toggle = (p: Platform) => setSelected(prev => prev.includes(p) ? prev.filter(x => x!==p) : [...prev, p]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="card p-4 space-y-4">
        <h2 className="text-lg font-semibold">Composer</h2>
        <div className="grid grid-cols-1 gap-3">
          <label className="text-sm">
            <div className="text-gray-600 mb-1">Category</div>
            <input value={category} onChange={e=>setCategory(e.target.value)} className="w-full rounded-md border px-3 py-2" placeholder="e.g. lifestyle, travel, design"/>
          </label>
          <label className="text-sm">
            <div className="text-gray-600 mb-1">Topic</div>
            <input value={topic} onChange={e=>setTopic(e.target.value)} className="w-full rounded-md border px-3 py-2" placeholder="e.g. morning routine productivity"/>
          </label>
          <div className="text-sm">
            <div className="text-gray-600 mb-2">Platforms</div>
            <div className="flex flex-wrap gap-2">
              {platformList.map(p => (
                <button key={p} className={`btn ${selected.includes(p)?'btn-primary':'btn-secondary'}`} onClick={()=>toggle(p)}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <label className="text-sm">
            <div className="text-gray-600 mb-1">Schedule time (optional)</div>
            <input type="datetime-local" value={when} onChange={e=>setWhen(e.target.value? new Date(e.target.value).toISOString(): '')} className="w-full rounded-md border px-3 py-2"/>
          </label>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary" onClick={onSchedule}>Schedule</button>
          <button className="btn btn-secondary" onClick={onDraft}>Save Draft</button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="card p-4">
          <div className="text-sm text-gray-500">Generated Caption</div>
          <div className="mt-2 whitespace-pre-wrap">{caption}</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-500">Hashtags</div>
          <div className="mt-2 text-sm text-gray-700 break-words">{hashtags.join(' ')}</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-500 mb-2">Preview</div>
          <div className="aspect-square rounded-lg border bg-gray-50 grid place-items-center text-gray-400">Image placeholder</div>
        </div>
      </div>
    </div>
  );
}
