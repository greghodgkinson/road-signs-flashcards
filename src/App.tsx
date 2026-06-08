import { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import LibraryScreen from './components/LibraryScreen';
import { getRandomSet, type RoadSign } from './data/roadsigns';

type View = 'home' | 'quiz' | 'results' | 'library';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [quizSigns, setQuizSigns] = useState<RoadSign[]>([]);
  const [lastScore, setLastScore] = useState({ score: 0, total: 20 });

  function startQuiz() {
    setQuizSigns(getRandomSet(20));
    setView('quiz');
  }

  function handleQuizComplete(score: number, total: number) {
    setLastScore({ score, total });
    setView('results');
  }

  return (
    <div className="app">
      {view === 'home' && (
        <HomeScreen onStart={startQuiz} onLibrary={() => setView('library')} />
      )}
      {view === 'quiz' && (
        <QuizScreen
          signs={quizSigns}
          onComplete={handleQuizComplete}
          onCancel={() => setView('home')}
        />
      )}
      {view === 'results' && (
        <ResultsScreen
          score={lastScore.score}
          total={lastScore.total}
          onPlayAgain={startQuiz}
          onHome={() => setView('home')}
        />
      )}
      {view === 'library' && (
        <LibraryScreen onBack={() => setView('home')} />
      )}
    </div>
  );
}
