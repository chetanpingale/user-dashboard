import React, { useEffect, useRef } from 'react';
import type { User } from '../types/User';

interface UserModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

export const UserModal: React.FC<UserModalProps> = ({ user, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on ESC key
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) onClose();
      // Trap focus in modal
      if (e.key === 'Tab' && isOpen && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Focus trap could be improved here or with a library.

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-white/70 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      tabIndex={-1}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-md w-full p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        tabIndex={0}
        aria-label={`User details for ${user.name}`}
      >
        <h2 id="modal-title" className="text-xl font-bold mb-4" tabIndex={0}>
          {user.name}
        </h2>
        <div id="modal-desc">
        <p>
          <strong>Email:</strong> <a href={`mailto:${user.email}`}>{user.email}</a>
        </p>
        <p>
          <strong>Phone:</strong> <a href={`tel:${user.phone}`}>{user.phone}</a>
        </p>
        <p>
          <strong>Address:</strong> {user.address.street}, {user.address.suite},{' '}
          {user.address.city}, {user.address.zipcode}
          {user.address.geo && user.address.geo.lat && user.address.geo.lng && (
            <>
              {' '}
              <a
                href={`https://www.google.com/maps?q=${user.address.geo.lat},${user.address.geo.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline ml-2"
                aria-label={`View ${user.name}'s address on Google Maps`}
              >
                View on Map
              </a>
            </>
          )}
        </p>
        <p>
          <strong>Company:</strong> {user.company.name}
        </p>
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          aria-label="Close user details dialog"
          autoFocus
        >
          Close
        </button>
      </div>
    </div>
  );
};
