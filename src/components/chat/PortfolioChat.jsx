import { useEffect, useRef, useState } from 'react';
import chatExamples from '../../mock/chatExamples';
import { sendMockChat } from '../../services/mockChat';
import './PortfolioChat.css';

function PortfolioChat({ context }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);
  useEffect(() => { if (open) bottomRef.current?.scrollIntoView({ block: 'end' }); }, [messages, loading, open]);
  useEffect(() => {
    const onKeyDown = (event) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const send = async (value = input) => {
    const message = value.trim();
    if (!message || loading) return;
    setInput('');
    setError('');
    setMessages((current) => [...current, { id: crypto.randomUUID(), role: 'user', text: message }]);
    setLoading(true);
    try {
      const result = await sendMockChat({ message, context });
      setMessages((current) => [...current, { id: crypto.randomUUID(), role: 'assistant', text: result.answer, scope: result.scope }]);
    } catch {
      setError('응답을 가져오지 못했습니다. 다시 시도해 주세요.');
      setInput(message);
    } finally {
      setLoading(false);
    }
  };

  return <div className="portfolio-chat">
    {open && <section className="portfolio-chat__panel" aria-label="포트폴리오 AI 채팅">
      <header className="portfolio-chat__header"><div><p>PORTFOLIO AI</p><h2>무엇이 궁금하신가요?</h2></div><button type="button" className="portfolio-chat__close" onClick={() => setOpen(false)} aria-label="채팅 닫기">×</button></header>
      <div className="portfolio-chat__messages" role="log" aria-live="polite" aria-relevant="additions text">
        {messages.length === 0 && <div className="portfolio-chat__welcome"><p>프로젝트, 기술, 경험에 대해 물어보세요. 현재 등록된 포트폴리오 정보로 답합니다.</p><div className="portfolio-chat__examples">{chatExamples.map((example) => <button type="button" key={example} onClick={() => send(example)} disabled={loading}>{example}</button>)}</div></div>}
        {messages.map((message) => <div className={`portfolio-chat__message portfolio-chat__message--${message.role}`} key={message.id}><span>{message.role === 'user' ? 'YOU' : 'AI'}</span><p>{message.text}</p></div>)}
        {loading && <p className="portfolio-chat__loading" role="status">답변을 준비하고 있습니다…</p>}
        <div ref={bottomRef} />
      </div>
      <form className="portfolio-chat__form" onSubmit={(event) => { event.preventDefault(); send(); }}><label className="portfolio-chat__input-label" htmlFor="portfolio-chat-input">질문 입력</label><div><input id="portfolio-chat-input" ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} placeholder="질문을 입력해 주세요" disabled={loading} /><button type="submit" disabled={!input.trim() || loading}>전송</button></div>{error && <p className="portfolio-chat__error" role="alert">{error}</p>}</form>
    </section>}
    <button type="button" className="portfolio-chat__toggle" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-label={open ? 'AI 채팅 닫기' : 'AI 채팅 열기'}>{open ? '채팅 닫기' : 'AI에게 질문하기'}</button>
  </div>;
}

export default PortfolioChat;
