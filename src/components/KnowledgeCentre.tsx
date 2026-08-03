import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalizedData } from '../data/useLocalizedData';
import { BookOpen, Search, Scale, FileText, Award, HelpCircle, CheckCircle2, XCircle, BookMarked } from 'lucide-react';

interface Handbook {
  title: string;
  desc: string;
  pages: string;
  tag: string;
}

export const KnowledgeCentre: React.FC = () => {
  const { t } = useTranslation('knowledgeCentre');
  const { CONSTITUTION_ARTICLES, LANDMARK_CASES, CONSTITUTIONAL_QUIZ } = useLocalizedData();
  const handbooks = t('handbooks', { returnObjects: true }) as Handbook[];
  const [activeTab, setActiveTab] = useState<'articles' | 'cases' | 'handbooks' | 'quiz'>('articles');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Quiz state
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const filteredArticles = CONSTITUTION_ARTICLES.filter(
    (a) =>
      a.articleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCases = LANDMARK_CASES.filter(
    (c) =>
      c.caseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.coreIssue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.rulingSummary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleQuizAnswer = (optionIdx: number) => {
    setSelectedAnswer(optionIdx);
    if (optionIdx === CONSTITUTIONAL_QUIZ[quizIndex].correctAnswer) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const nextQuizQuestion = () => {
    if (quizIndex + 1 < CONSTITUTIONAL_QUIZ.length) {
      setQuizIndex(quizIndex + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setQuizFinished(false);
  };

  return (
    <section id="knowledge-hub" className="py-20 bg-[#F8F6F0] text-[#0A1F44] border-b border-[#0A1F44]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#0A1F44]/20 text-[10px] font-sans-body font-semibold text-[#0A1F44] uppercase tracking-[0.25em]">
            <BookMarked className="w-3.5 h-3.5" />
            {t('badge')}
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-display font-light text-[#0A1F44] tracking-tight">
            {t('heading')}
          </h2>
          <p className="text-sm sm:text-base font-sans-body text-[#0A1F44]/80 leading-relaxed">
            {t('subheading')}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mt-10 flex flex-wrap justify-center gap-2 border-b border-[#0A1F44]/15 pb-4">
          {[
            { id: 'articles', label: t('tabs.articles'), icon: FileText },
            { id: 'cases', label: t('tabs.cases'), icon: Scale },
            { id: 'handbooks', label: t('tabs.handbooks'), icon: BookOpen },
            { id: 'quiz', label: t('tabs.quiz'), icon: HelpCircle },
          ].map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setSearchQuery('');
                }}
                className={`px-4 py-2.5 text-xs font-sans-body font-semibold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#0A1F44] text-[#F8F6F0]'
                    : 'bg-white text-[#0A1F44] border border-[#0A1F44]/15 hover:bg-[#EAE8E0]'
                }`}
              >
                <IconComp className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: ARTICLES EXPLORER */}
        {activeTab === 'articles' && (
          <div className="mt-8 space-y-6 animate-fadeIn">
            <div className="max-w-md mx-auto relative">
              <Search className="w-4 h-4 text-[#0A1F44]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t('articlesSearchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#0A1F44]/20 focus:border-[#0A1F44] text-xs text-[#0A1F44] pl-10 pr-4 py-2.5 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((art) => (
                <div
                  key={art.articleNumber}
                  className="bg-white p-6 border border-[#0A1F44]/15 hover:border-[#0A1F44] hover:shadow-lg transition-all space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 bg-[#0A1F44] text-[#F8F6F0] text-xs font-mono font-bold">
                        {art.articleNumber}
                      </span>
                      <span className="text-[10px] font-mono text-[#138808] font-bold">{art.part}</span>
                    </div>

                    <h3 className="text-lg font-serif-display font-bold text-[#0A1F44] mt-3">
                      {art.title}
                    </h3>

                    <p className="mt-2 text-xs font-sans-body text-[#0A1F44]/80 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#0A1F44]/10 p-2 bg-[#F8F6F0] text-[11px] font-sans-body text-[#0A1F44]">
                    <strong>{t('coreTakeaway')}</strong> {art.keyTakeaway}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: LANDMARK CASES */}
        {activeTab === 'cases' && (
          <div className="mt-8 space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCases.map((c) => (
                <div
                  key={c.caseName}
                  className="bg-white p-6 border border-[#0A1F44]/15 hover:border-[#0A1F44] shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-[#0A1F44]/10 pb-3">
                    <h3 className="text-lg font-serif-display font-bold text-[#0A1F44]">
                      {c.caseName}
                    </h3>
                    <span className="px-2.5 py-1 bg-[#F8F6F0] text-xs font-mono font-bold text-[#0A1F44] border border-[#0A1F44]/15">
                      {c.year}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-[#138808] font-bold">{t('bench')} {c.benchSize}</div>

                  <div className="space-y-2 text-xs font-sans-body text-[#0A1F44]/90">
                    <div>
                      <strong className="text-[#0A1F44]">{t('coreIssue')}</strong> {c.coreIssue}
                    </div>
                    <div className="p-3 bg-[#F8F6F0] border border-[#0A1F44]/10 leading-relaxed">
                      <strong className="text-[#0A1F44] block mb-1">{t('supremeCourtRuling')}</strong>
                      {c.rulingSummary}
                    </div>
                    <div>
                      <strong className="text-[#138808]">{t('impactOnDemocracy')}</strong> {c.constitutionalImpact}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CIVIC GUIDES & HANDBOOKS */}
        {activeTab === 'handbooks' && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {handbooks.map((hb) => (
              <div key={hb.title} className="bg-white p-6 border border-[#0A1F44]/15 hover:border-[#0A1F44] transition-all space-y-4 flex flex-col justify-between">
                <div>
                  <span className="px-2.5 py-1 bg-[#F8F6F0] text-[#0A1F44] border border-[#0A1F44]/15 text-[10px] font-mono font-bold">
                    {hb.tag}
                  </span>
                  <h3 className="text-lg font-serif-display font-bold text-[#0A1F44] mt-3">{hb.title}</h3>
                  <p className="mt-2 text-xs font-sans-body text-[#0A1F44]/80 leading-relaxed">{hb.desc}</p>
                </div>
                <div className="pt-3 border-t border-[#0A1F44]/10 flex items-center justify-between text-xs font-mono text-[#0A1F44]">
                  <span>{hb.pages}</span>
                  <button onClick={() => alert(t('downloading', { title: hb.title }))} className="underline font-bold cursor-pointer">{t('readDownload')}</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: CONSTITUTIONAL LITERACY QUIZ */}
        {activeTab === 'quiz' && (
          <div className="mt-8 max-w-2xl mx-auto bg-white p-6 sm:p-8 border border-[#0A1F44]/15 shadow-lg space-y-6 animate-fadeIn">
            
            {!quizFinished ? (
              <>
                <div className="flex items-center justify-between border-b border-[#0A1F44]/10 pb-3 text-xs font-mono font-bold">
                  <span className="text-[#0A1F44]">{t('quiz.questionOf', { current: quizIndex + 1, total: CONSTITUTIONAL_QUIZ.length })}</span>
                  <span className="text-[#138808]">{t('quiz.score', { score: quizScore })}</span>
                </div>

                <div className="space-y-4 font-sans-body">
                  <h3 className="text-xl font-serif-display font-bold text-[#0A1F44]">
                    {CONSTITUTIONAL_QUIZ[quizIndex].question}
                  </h3>

                  <div className="space-y-2">
                    {CONSTITUTIONAL_QUIZ[quizIndex].options.map((option, idx) => {
                      const isCorrect = idx === CONSTITUTIONAL_QUIZ[quizIndex].correctAnswer;
                      const isSelected = selectedAnswer === idx;

                      let btnStyle = 'bg-[#F8F6F0] border-[#0A1F44]/15 text-[#0A1F44] hover:border-[#0A1F44]';
                      if (selectedAnswer !== null) {
                        if (isCorrect) {
                          btnStyle = 'bg-[#138808]/15 border-[#138808] text-[#138808] font-bold';
                        } else if (isSelected) {
                          btnStyle = 'bg-red-50 border-red-500 text-red-700';
                        }
                      }

                      return (
                        <button
                          key={option}
                          disabled={selectedAnswer !== null}
                          onClick={() => handleQuizAnswer(idx)}
                          className={`w-full p-4 border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{option}</span>
                          {selectedAnswer !== null && isCorrect && <CheckCircle2 className="w-5 h-5 text-[#138808]" />}
                          {selectedAnswer !== null && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600" />}
                        </button>
                      );
                    })}
                  </div>

                  {selectedAnswer !== null && (
                    <div className="p-4 bg-[#F8F6F0] border border-[#0A1F44]/20 space-y-2 text-xs">
                      <div className="font-mono text-[#0A1F44] uppercase font-bold">{t('quiz.explanation')}</div>
                      <p className="text-[#0A1F44]/90 leading-relaxed">
                        {CONSTITUTIONAL_QUIZ[quizIndex].explanation}
                      </p>
                      <button
                        onClick={nextQuizQuestion}
                        className="mt-2 px-5 py-2 bg-[#0A1F44] text-[#F8F6F0] font-semibold text-xs tracking-wider uppercase hover:bg-[#000080] transition-colors cursor-pointer"
                      >
                        {quizIndex + 1 < CONSTITUTIONAL_QUIZ.length ? t('quiz.nextQuestion') : t('quiz.viewFinalScore')}
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center space-y-4 py-6">
                <Award className="w-16 h-16 text-[#0A1F44] mx-auto" />
                <h3 className="text-2xl font-serif-display font-bold text-[#0A1F44]">{t('quiz.complete')}</h3>
                <p className="text-base font-sans-body text-[#0A1F44]/90">
                  {t('quiz.youScoredPrefix')} <strong>{t('quiz.scoreOutOf', { score: quizScore, total: CONSTITUTIONAL_QUIZ.length })}</strong> {t('quiz.youScoredSuffix')}
                </p>
                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 bg-[#0A1F44] text-[#F8F6F0] font-semibold text-xs tracking-wider uppercase hover:bg-[#000080] transition-colors cursor-pointer"
                >
                  {t('quiz.retake')}
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};

