'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { CONTACT_EMAIL, WEB3FORMS_KEY } from '@/lib/contactConfig';

export default function ContactModal({ product, onClose }) {
  const { lang, tx } = useLanguage();
  const t = tx.contactModal;
  const name = product ? product.name[lang] || product.name.en : null;

  const defaultMessage = product
    ? lang === 'el'
      ? `Γεια σας,\n\nΘα ήθελα να ρωτήσω για το προϊόν "${name}" (${product.weight}).`
      : `Hello,\n\nI'd like to ask about "${name}" (${product.weight}).`
    : lang === 'el'
      ? 'Γεια σας,\n\nΘα ήθελα να επικοινωνήσω μαζί σας.'
      : "Hello,\n\nI'd like to get in touch.";

  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [message, setMessage] = useState(defaultMessage);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: product
            ? lang === 'el'
              ? `Ενδιαφέρον για: ${name} (${product.weight})`
              : `Interest in: ${name} (${product.weight})`
            : lang === 'el'
              ? 'Επικοινωνία από την ιστοσελίδα'
              : 'Contact from website',
          from_name: 'Helios Figs — Contact',
          replyto: visitorEmail,
          name: visitorName,
          email: visitorEmail,
          ...(product ? { product: `${name} (${product.weight})` } : {}),
          message,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Submission failed');
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button
          type="button"
          onClick={onClose}
          aria-label={t.close}
          className="absolute top-3 right-3 text-ink-soft hover:text-ink text-2xl leading-none"
        >
          ×
        </button>

        <h2 className={`font-serif text-2xl text-ink pr-6 ${product ? 'mb-1' : 'mb-5'}`}>
          {product ? t.title : t.generalTitle}
        </h2>
        {product && (
          <p className="text-sm text-ink-soft mb-5">
            {name} ({product.weight})
          </p>
        )}

        {status === 'success' ? (
          <p className="text-olive font-medium py-4">{t.success}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="cm-name" className="block text-sm font-medium text-ink mb-1">
                {t.nameLabel}
              </label>
              <input
                id="cm-name"
                type="text"
                required
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                className="w-full px-3 py-2 border border-line rounded focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
            <div>
              <label htmlFor="cm-email" className="block text-sm font-medium text-ink mb-1">
                {t.emailLabel}
              </label>
              <input
                id="cm-email"
                type="email"
                required
                value={visitorEmail}
                onChange={(e) => setVisitorEmail(e.target.value)}
                className="w-full px-3 py-2 border border-line rounded focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
            <div>
              <label htmlFor="cm-message" className="block text-sm font-medium text-ink mb-1">
                {t.messageLabel}
              </label>
              <textarea
                id="cm-message"
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border border-line rounded focus:outline-none focus:ring-2 focus:ring-brand resize-none"
              />
            </div>

            {status === 'error' && (
              <p className="text-red-500 text-sm">
                {t.error}{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                  {CONTACT_EMAIL}
                </a>
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full px-6 py-3 rounded font-semibold text-white bg-brand hover:bg-brand-hover transition disabled:opacity-60"
            >
              {status === 'sending' ? t.sending : t.send}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
