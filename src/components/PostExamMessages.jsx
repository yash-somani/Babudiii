import { useMemo } from 'react';
import { getCompletedExams } from '../data';

export default function PostExamMessages() {
  const completedExams = useMemo(() => getCompletedExams(), []);

  // Only show if there are completed exams
  if (completedExams.length === 0) return null;

  // Show the most recent completed exam's message
  const latest = completedExams[completedExams.length - 1];

  return (
    <section className="section" id="post-exam">
      <div className="post-exam-card">
        <span className="post-exam-icon" aria-hidden="true">🌸</span>
        <p>{latest.postMessage}</p>
      </div>
    </section>
  );
}
