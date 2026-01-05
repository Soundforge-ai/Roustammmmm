import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus, Search, ExternalLink, Download, RefreshCw } from 'lucide-react';

interface KeywordRanking {
  keyword: string;
  currentPosition: number | null;
  previousPosition: number | null;
  change: number;
  category: 'brand' | 'local' | 'product';
  url?: string;
  lastChecked?: string;
}

const DEFAULT_KEYWORDS: KeywordRanking[] = [
  // Brand keywords
  { keyword: 'Yannova Bouw', currentPosition: null, previousPosition: null, change: 0, category: 'brand' },
  { keyword: 'Yannova', currentPosition: null, previousPosition: null, change: 0, category: 'brand' },
  
  // Local keywords
  { keyword: 'ramen en deuren Keerbergen', currentPosition: null, previousPosition: null, change: 0, category: 'local' },
  { keyword: 'ramen en deuren Zoersel', currentPosition: null, previousPosition: null, change: 0, category: 'local' },
  { keyword: 'ramen en deuren Mechelen', currentPosition: null, previousPosition: null, change: 0, category: 'local' },
  { keyword: 'crepi Keerbergen', currentPosition: null, previousPosition: null, change: 0, category: 'local' },
  { keyword: 'gevelisolatie Zoersel', currentPosition: null, previousPosition: null, change: 0, category: 'local' },
  { keyword: 'bouwbedrijf Mechelen', currentPosition: null, previousPosition: null, change: 0, category: 'local' },
  { keyword: 'renovatie Keerbergen', currentPosition: null, previousPosition: null, change: 0, category: 'local' },
  
  // Product keywords
  { keyword: 'voordeuren 3D', currentPosition: null, previousPosition: null, change: 0, category: 'product' },
  { keyword: 'PVC ramen Keerbergen', currentPosition: null, previousPosition: null, change: 0, category: 'product' },
  { keyword: 'aluminium ramen Zoersel', currentPosition: null, previousPosition: null, change: 0, category: 'product' },
];

const SEORankingMonitor: React.FC = () => {
  const [keywords, setKeywords] = useState<KeywordRanking[]>(() => {
    const saved = localStorage.getItem('yannova-seo-rankings');
    return saved ? JSON.parse(saved) : DEFAULT_KEYWORDS;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'brand' | 'local' | 'product'>('all');

  // Save to localStorage whenever keywords change
  useEffect(() => {
    localStorage.setItem('yannova-seo-rankings', JSON.stringify(keywords));
  }, [keywords]);

  const handlePositionUpdate = (index: number, position: number | null) => {
    const updated = [...keywords];
    const previous = updated[index].currentPosition;
    updated[index] = {
      ...updated[index],
      previousPosition: previous,
      currentPosition: position,
      change: previous !== null && position !== null ? previous - position : 0,
      lastChecked: new Date().toISOString(),
    };
    setKeywords(updated);
  };

  const getPositionColor = (position: number | null) => {
    if (position === null) return 'text-gray-400';
    if (position <= 3) return 'text-green-600 font-bold';
    if (position <= 10) return 'text-blue-600 font-semibold';
    if (position <= 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPositionLabel = (position: number | null) => {
    if (position === null) return 'Niet gevonden';
    if (position === 1) return '🥇 #1';
    if (position === 2) return '🥈 #2';
    if (position === 3) return '🥉 #3';
    return `#${position}`;
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="text-green-600" size={16} />;
    if (change < 0) return <TrendingDown className="text-red-600" size={16} />;
    return <Minus className="text-gray-400" size={16} />;
  };

  const exportToCSV = () => {
    const headers = ['Keyword', 'Huidige Positie', 'Vorige Positie', 'Verandering', 'Categorie', 'Laatst Gecheckt'];
    const rows = keywords.map(k => [
      k.keyword,
      k.currentPosition ?? 'N/A',
      k.previousPosition ?? 'N/A',
      k.change > 0 ? `+${k.change}` : k.change.toString(),
      k.category,
      k.lastChecked ? new Date(k.lastChecked).toLocaleDateString('nl-BE') : 'N/A',
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `yannova-seo-rankings-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const filteredKeywords = selectedCategory === 'all' 
    ? keywords 
    : keywords.filter(k => k.category === selectedCategory);

  const stats = {
    total: keywords.length,
    top10: keywords.filter(k => k.currentPosition !== null && k.currentPosition <= 10).length,
    top3: keywords.filter(k => k.currentPosition !== null && k.currentPosition <= 3).length,
    improved: keywords.filter(k => k.change > 0).length,
    declined: keywords.filter(k => k.change < 0).length,
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">SEO Ranking Monitor</h1>
        <p className="text-gray-600">Monitor je Google rankings voor belangrijke keywords</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-gray-600">Totaal Keywords</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{stats.top3}</div>
          <div className="text-sm text-gray-600">Top 3</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{stats.top10}</div>
          <div className="text-sm text-gray-600">Top 10</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{stats.improved}</div>
          <div className="text-sm text-gray-600">Verbeterd</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-red-600">{stats.declined}</div>
          <div className="text-sm text-gray-600">Verslechterd</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-amber-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Alle
        </button>
        <button
          onClick={() => setSelectedCategory('brand')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedCategory === 'brand'
              ? 'bg-amber-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Brand
        </button>
        <button
          onClick={() => setSelectedCategory('local')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedCategory === 'local'
              ? 'bg-amber-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Lokaal
        </button>
        <button
          onClick={() => setSelectedCategory('product')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedCategory === 'product'
              ? 'bg-amber-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Product
        </button>
        <button
          onClick={exportToCSV}
          className="ml-auto px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {/* Keywords Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b-2 border-gray-200">
              <th className="text-left p-3 font-semibold text-gray-700">Keyword</th>
              <th className="text-left p-3 font-semibold text-gray-700">Huidige Positie</th>
              <th className="text-left p-3 font-semibold text-gray-700">Vorige Positie</th>
              <th className="text-left p-3 font-semibold text-gray-700">Verandering</th>
              <th className="text-left p-3 font-semibold text-gray-700">Acties</th>
            </tr>
          </thead>
          <tbody>
            {filteredKeywords.map((keyword, index) => {
              const actualIndex = keywords.findIndex(k => k.keyword === keyword.keyword);
              return (
                <tr key={keyword.keyword} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Search size={16} className="text-gray-400" />
                      <span className="font-medium">{keyword.keyword}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        keyword.category === 'brand' ? 'bg-purple-100 text-purple-700' :
                        keyword.category === 'local' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {keyword.category}
                      </span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={getPositionColor(keyword.currentPosition)}>
                      {getPositionLabel(keyword.currentPosition)}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600">
                    {keyword.previousPosition ? `#${keyword.previousPosition}` : '-'}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {getTrendIcon(keyword.change)}
                      <span className={keyword.change > 0 ? 'text-green-600' : keyword.change < 0 ? 'text-red-600' : 'text-gray-400'}>
                        {keyword.change > 0 ? `+${keyword.change}` : keyword.change !== 0 ? keyword.change : '-'}
                      </span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Positie"
                        min="1"
                        max="100"
                        value={keyword.currentPosition ?? ''}
                        onChange={(e) => {
                          const value = e.target.value === '' ? null : parseInt(e.target.value);
                          handlePositionUpdate(actualIndex, value);
                        }}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <a
                        href={`https://www.google.com/search?q=${encodeURIComponent(keyword.keyword)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-gray-600 hover:text-amber-500 transition-colors"
                        title="Zoek in Google"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">📋 Hoe gebruik je dit dashboard?</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
          <li>Open een <strong>incognito venster</strong> in je browser</li>
          <li>Zoek op elk keyword in Google</li>
          <li>Noteer de positie waar je site staat (of "Niet gevonden")</li>
          <li>Voer de positie in bij het keyword</li>
          <li>Herhaal dit wekelijks om trends te zien</li>
          <li>Exporteer naar CSV voor rapportage</li>
        </ol>
      </div>

      {/* Google Search Console Link */}
      <div className="mt-4 text-center">
        <a
          href="https://search.google.com/search-console"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition-colors"
        >
          <ExternalLink size={18} />
          Open Google Search Console
        </a>
      </div>
    </div>
  );
};

export default SEORankingMonitor;

