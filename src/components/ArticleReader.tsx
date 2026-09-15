import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, BookOpen, ArrowRight } from 'lucide-react';
import { perspectives } from '../data/perspectives';

export function ArticleReader({ index, onClose, onArticle }: { index: number; onClose: () => void; onArticle: (index: number) => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const [page, setPage] = useState(0);
  const [large, setLarge] = useState(false);
  const article = perspectives[index];
  const chapter = article.chapters[page];
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.showModal();
    return () => { document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  useEffect(() => { setPage(0); content.current?.scrollTo(0, 0); heading.current?.focus(); }, [index]);
  useEffect(() => { content.current?.scrollTo(0, 0); heading.current?.focus(); }, [page]);
  return createPortal(
    <dialog ref={dialog} aria-labelledby="reader-title" className="spc-reader" onCancel={e => { e.preventDefault(); onClose(); }} onClick={e => { if (e.target === dialog.current) onClose(); }} onKeyDown={e => {
      if ((e.target as HTMLElement).tagName === 'SELECT') return;
      if (e.key === 'ArrowRight') { e.preventDefault(); setPage(p => Math.min(p + 1, article.chapters.length - 1)); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); setPage(p => Math.max(p - 1, 0)); }
    }}>
      <div className="reader-shell">
        <header className="reader-toolbar">
          <span className="reader-brand"><BookOpen size={18} /> SPC Perspectives</span>
          <div className="flex items-center gap-2">
            <button className="reader-tool" aria-label="Use larger text" aria-pressed={large} onClick={() => setLarge(!large)}>A<span className="text-xl">a</span></button>
            <button className="reader-tool" aria-label="Close article" onClick={onClose}><X size={22} /></button>
          </div>
        </header>
        <div className="reader-layout">
          <aside className="reader-sidebar">
            <p className="reader-eyebrow">{article.category} / FIELD NOTES</p>
            <h2 id="reader-title">{article.title}</h2>
            <p className="reader-meta">4 min read · 4 chapters</p>
            <nav aria-label="Article chapters" className="reader-chapters">
              {article.chapters.map((c, i) => <button key={c.title} aria-current={page === i ? 'step' : undefined} onClick={() => setPage(i)}><span>0{i + 1}</span>{c.title}</button>)}
            </nav>
            <p className="reader-note">Research-informed editorial<br />14 September 2026<br /><br />Examples are illustrative. Sources appear beside the relevant discussion. Confirm applicable rules before acting.</p>
          </aside>
          <div className="reader-content" ref={content}>
            <div className="reader-mobile-title">{article.title}</div>
            <select aria-label="Choose chapter" className="reader-mobile-select" value={page} onChange={e => setPage(Number(e.target.value))}>{article.chapters.map((c,i) => <option key={c.title} value={i}>{i+1}. {c.title}</option>)}</select>
            <article className={`reader-page ${large ? 'reader-large' : ''}`}>
              <p className="reader-eyebrow">CHAPTER 0{page + 1}</p>
              <h3 ref={heading} tabIndex={-1}>{chapter.title}</h3>
              {chapter.paragraphs.map(p => <p key={p}>{p}</p>)}
              {chapter.steps && <figure className="reader-diagram"><figcaption>A practical workflow</figcaption><ol>{chapter.steps.map((step,i) => <li key={step}><span>0{i+1}</span><strong>{step}</strong>{i < chapter.steps!.length - 1 && <ArrowRight size={16} aria-hidden="true" />}</li>)}</ol></figure>}
              <aside className="reader-takeaway"><span>THE TAKEAWAY</span><p>{chapter.takeaway}</p></aside>
              {chapter.sources && <div className="reader-sources"><h4>Sources & further reading</h4>{chapter.sources.map(s => <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer">{s.label} ↗</a>)}</div>}
              {page === article.chapters.length - 1 && <div className="reader-next"><span>CONTINUE EXPLORING</span><button onClick={() => onArticle((index+1)%perspectives.length)}>{perspectives[(index+1)%perspectives.length].title}<ArrowRight size={20}/></button></div>}
            </article>
          </div>
        </div>
        <footer className="reader-footer">
          <button disabled={page === 0} onClick={() => setPage(page-1)} aria-label="Previous page"><ChevronLeft size={18}/><span>Previous</span></button>
          <div className="reader-progress"><span aria-live="polite">Page {page+1} of {article.chapters.length}</span><progress aria-label="Reading progress" value={page+1} max={article.chapters.length}/></div>
          {page < article.chapters.length-1 ? <button onClick={() => setPage(page+1)} aria-label="Next page"><span>Next page</span><ChevronRight size={18}/></button> : <button onClick={onClose}>Finish reading <X size={16}/></button>}
        </footer>
      </div>
    </dialog>, document.body);
}
