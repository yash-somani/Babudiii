import { heroContent } from '../data';

export default function Hero() {
  const handleScrollDown = () => {
    const target = document.getElementById('proud-wall');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero section" id="hero">
      <h1>{heroContent.heading}</h1>
      <p className="hero-subheading">{heroContent.subheading}</p>
      <p className="hero-body">{heroContent.body}</p>

      <button
        className="hero-cta"
        onClick={handleScrollDown}
        aria-label="Scroll to next section"
      >
        <span className="hero-cta-text">See why I'm proud of you</span>
        <span className="hero-cta-arrow" aria-hidden="true">↓</span>
      </button>
    </section>
  );
}
