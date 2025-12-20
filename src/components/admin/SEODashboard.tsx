import React, { useState, useEffect } from 'react';
import {
  Search, Sparkles, AlertCircle, AlertTriangle, Info, CheckCircle,
  Copy, Check, Globe, FileText, Tag, Code, TrendingUp, Loader2,
  Download, Map, Bot, Database, RefreshCw,
} from 'lucide-react';
import { generateSEOWithAI, analyzeSEO, type SEOData, type SEOAnalysis } from '@/lib/api/seo-ai';
import { generateSitemapXML, downloadSitemap, DEFAULT_PAGES } from '@/lib/seo/sitemap';
import { generateRobotsTxt, downloadRobotsTxt } from '@/lib/seo/robots';

type TabType = 'generator' | 'sitemap' | 'robots' | 'bulk';

const PAGES = [
  { url: '/', name: 'Home', content: 'Yannova bouw renovatie België gevelwerken isolatie' },
  { url: '/diensten', name: 'Diensten', content: 'Diensten ramen deuren renovatie isolatie' },
  { url: '/gevel', name: 'Gevelwerken', content: 'Gevelwerken crepi isolatie steenstrips' },
  { url: '/over-ons', name: 'Over Ons', content: 'Over Yannova bouwbedrijf ervaring kwaliteit' },
  { url: '/contact', name: 'Contact', content: 'Contact gratis offerte aanvragen Yannova' },
];

const SEODashboard: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState<TabType>('generator');
  const [selectedPage, setSelectedPage] = useState(PAGES[0]);
  const [seoData, setSeoData] = useState<SEOData | null>(null);
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [language, setLanguage] = useState<'nl' | 'fr'>('nl');
  const [customContent, setCustomContent] = useState('');
  const [sitemapContent, setSitemapContent] = useState('');
  const [robotsContent, setRobotsContent] = useState('');
  const [bulkResults, setBulkResults] = useState<Map<string, SEOData>>(new Map());
  const [isBulkGenerating, setIsBulkGenerating] = useState(false);

  useEffect(() => {
    setSitemapContent(generateSitemapXML());
    setRobotsContent(generateRobotsTxt());
  }, []);

  const handleGenerateSEO = async () => {
    setIsGenerating(true);
    try {
      const content = customContent || selectedPage.content;
      const result = await generateSEOWithAI(content, `https://yannova.be${selectedPage.url}`, language);
      setSeoData(result);
      setAnalysis(analyzeSEO(result, content));
    } catch (e) {
      console.error('SEO error:', e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBulkGenerate = async () => {
    setIsBulkGenerating(true);
    const results = new Map<string, SEOData>();
    for (const page of PAGES) {
      try {
        const result = await generateSEOWithAI(page.content, `https://yannova.be${page.url}`, language);
        results.set(page.url, result);
      } catch (e) { console.error(e); }
    }
    setBulkResults(results);
    setIsBulkGenerating(false);
  };

  const handleCopy = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const getScoreColor = (s: number) => s >= 80 ? 'text-green-600 bg-green-100' : s >= 60 ? 'text-yellow-600 bg-yellow-100' : 'text-red-600 bg-red-100';
  const getIcon = (t: string) => t === 'error' ? <AlertCircle className="text-red-500" size={16}/> : t === 'warning' ? <AlertTriangle className="text-yellow-500" size={16}/> : <Info className="text-blue-500" size={16}/>;

  const tabs = [
    { id: 'generator' as TabType, label: 'SEO Generator', icon: Sparkles },
    { id: 'sitemap' as TabType, label: 'Sitemap', icon: Map },
    { id: 'robots' as TabType, label: 'Robots.txt', icon: Bot },
    { id: 'bulk' as TabType, label: 'Bulk', icon: Database },
  ];

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${className}`}>
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
            <Search className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-brand-dark">SEO Dashboard</h2>
            <p className="text-sm text-gray-500">AI-powered SEO</p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${activeTab === t.id ? 'bg-brand-accent text-white' : 'bg-gray-100 text-gray-700'}`}>
              <t.icon size={16}/>{t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {activeTab === 'generator' && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {PAGES.map(p => (
                <button key={p.url} onClick={() => setSelectedPage(p)} className={`px-3 py-1.5 text-sm rounded-lg ${selectedPage.url === p.url ? 'bg-brand-accent text-white' : 'bg-gray-100'}`}>{p.name}</button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Taal</label>
                <div className="flex gap-2">
                  <button onClick={() => setLanguage('nl')} className={`flex-1 py-2 rounded-lg text-sm ${language === 'nl' ? 'bg-brand-accent text-white' : 'bg-gray-100'}`}>🇳🇱 NL</button>
                  <button onClick={() => setLanguage('fr')} className={`flex-1 py-2 rounded-lg text-sm ${language === 'fr' ? 'bg-brand-accent text-white' : 'bg-gray-100'}`}>🇫🇷 FR</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Extra</label>
                <input type="text" value={customContent} onChange={e => setCustomContent(e.target.value)} placeholder="Keywords..." className="w-full px-3 py-2 border rounded-lg text-sm"/>
              </div>
            </div>
            <button onClick={handleGenerateSEO} disabled={isGenerating} className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50">
              {isGenerating ? <Loader2 className="animate-spin" size={18}/> : <Sparkles size={18}/>}
              {isGenerating ? 'Genereren...' : 'Genereer SEO'}
            </button>
            {analysis && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between mb-3">
                  <span className="font-medium flex items-center gap-2"><TrendingUp size={18}/>Score</span>
                  <span className={`text-xl font-bold px-3 py-1 rounded ${getScoreColor(analysis.score)}`}>{analysis.score}/100</span>
                </div>
                {analysis.issues.map((i, idx) => <div key={idx} className="flex items-center gap-2 text-sm">{getIcon(i.type)}{i.message}</div>)}
              </div>
            )}
            {seoData && (
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between mb-1"><span className="text-sm font-medium flex items-center gap-1"><FileText size={14}/>Title ({seoData.title.length}/60)</span><button onClick={() => handleCopy(seoData.title, 'title')}>{copied === 'title' ? <Check size={14} className="text-green-500"/> : <Copy size={14} className="text-gray-400"/>}</button></div>
                  <p className="text-blue-600 font-medium">{seoData.title}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between mb-1"><span className="text-sm font-medium flex items-center gap-1"><Globe size={14}/>Description ({seoData.description.length}/160)</span><button onClick={() => handleCopy(seoData.description, 'desc')}>{copied === 'desc' ? <Check size={14} className="text-green-500"/> : <Copy size={14} className="text-gray-400"/>}</button></div>
                  <p className="text-gray-700 text-sm">{seoData.description}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <span className="text-sm font-medium flex items-center gap-1 mb-2"><Tag size={14}/>Keywords</span>
                  <div className="flex flex-wrap gap-2">{seoData.keywords.map((k, i) => <span key={i} className="px-2 py-1 bg-white border rounded text-sm">{k}</span>)}</div>
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === 'sitemap' && (
          <div className="space-y-4">
            <div className="flex justify-between">
              <h3 className="font-medium">Sitemap ({DEFAULT_PAGES.length} paginas)</h3>
              <div className="flex gap-2">
                <button onClick={() => handleCopy(sitemapContent, 'sitemap')} className="flex items-center gap-1 px-3 py-2 bg-gray-100 rounded-lg text-sm">{copied === 'sitemap' ? <Check size={14}/> : <Copy size={14}/>}Kopieer</button>
                <button onClick={() => downloadSitemap(sitemapContent)} className="flex items-center gap-1 px-3 py-2 bg-brand-accent text-white rounded-lg text-sm"><Download size={14}/>Download</button>
              </div>
            </div>
            <pre className="text-xs bg-gray-900 text-blue-400 p-4 rounded overflow-auto max-h-72">{sitemapContent}</pre>
          </div>
        )}
        {activeTab === 'robots' && (
          <div className="space-y-4">
            <div className="flex justify-between">
              <h3 className="font-medium">Robots.txt</h3>
              <div className="flex gap-2">
                <button onClick={() => handleCopy(robotsContent, 'robots')} className="flex items-center gap-1 px-3 py-2 bg-gray-100 rounded-lg text-sm">{copied === 'robots' ? <Check size={14}/> : <Copy size={14}/>}Kopieer</button>
                <button onClick={() => downloadRobotsTxt(robotsContent)} className="flex items-center gap-1 px-3 py-2 bg-brand-accent text-white rounded-lg text-sm"><Download size={14}/>Download</button>
              </div>
            </div>
            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded overflow-auto max-h-72">{robotsContent}</pre>
          </div>
        )}
        {activeTab === 'bulk' && (
          <div className="space-y-4">
            <div className="flex justify-between">
              <div><h3 className="font-medium">Bulk Generator</h3><p className="text-sm text-gray-500">Alle paginas</p></div>
              <button onClick={handleBulkGenerate} disabled={isBulkGenerating} className="flex items-center gap-2 px-4 py-2 bg-brand-accent text-white rounded-lg text-sm disabled:opacity-50">
                {isBulkGenerating ? <Loader2 className="animate-spin" size={16}/> : <RefreshCw size={16}/>}{isBulkGenerating ? 'Bezig...' : 'Genereer'}
              </button>
            </div>
            {bulkResults.size > 0 ? PAGES.map(p => {
              const d = bulkResults.get(p.url);
              return d ? (
                <div key={p.url} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between mb-1"><h4 className="font-medium">{p.name}</h4><button onClick={() => handleCopy(d.title, `b-${p.url}`)}>{copied === `b-${p.url}` ? <Check size={14} className="text-green-500"/> : <Copy size={14} className="text-gray-400"/>}</button></div>
                  <p className="text-sm text-blue-600">{d.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{d.description}</p>
                </div>
              ) : null;
            }) : <div className="text-center py-8 text-gray-400"><Database size={40} className="mx-auto mb-2"/><p>Klik Genereer om te starten</p></div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default SEODashboard;
