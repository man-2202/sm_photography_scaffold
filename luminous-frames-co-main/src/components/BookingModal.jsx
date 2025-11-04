import React, { useState } from 'react';

// Booking modal with basic validation and Razorpay client-side checkout integration
export default function BookingModal({ open, onClose, selectedPackage }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', eventDate: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (!open) return null;

  const validate = () => {
    if (!form.name || !form.email) return 'Name and email are required.';
    return null;
  };

  const loadRazorpayScript = (src) => new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve(true);
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error('Razorpay SDK failed to load'));
    document.body.appendChild(script);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) return setError(v);
    setSubmitting(true);
    try {
      // Create booking on the server which may also create a Razorpay order
      const payload = { 
        clientName: form.name, email: form.email, phone: form.phone, 
        selectedPackage: selectedPackage?.name || 'Package', eventDate: form.eventDate, notes: form.notes, price: selectedPackage?.price || 50000
      };
      const res = await fetch('/api/book-package', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(payload) });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || 'Booking failed');

      // If server returned a razorpayOrder, open checkout
      if (json.razorpayOrder) {
        await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
        const key = import.meta.env.VITE_RAZORPAY_KEY_ID || json.razorpayOrder.key_id || '';
        const options = {
          key: key,
          amount: json.razorpayOrder.amount || (payload.price || 50000),
          currency: json.razorpayOrder.currency || 'INR',
          name: 'SM Photography',
          description: selectedPackage?.name || 'Booking Payment',
          order_id: json.razorpayOrder.id,
          handler: function (paymentResult) {
            // You can call backend to verify payment here
            alert('Payment successful. Thank you!');
            onClose();
          },
          prefill: { name: form.name, email: form.email, contact: form.phone }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // No payment required, just close
        alert('Booking request submitted. We will contact you shortly.');
        onClose();
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <h3 className="font-serif text-2xl mb-4">Book: {selectedPackage?.name}</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input className="w-full border rounded-md p-2" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input type="email" className="w-full border rounded-md p-2" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm mb-1">Phone</label>
              <input className="w-full border rounded-md p-2" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
            </div>
            <div>
              <label className="block text-sm mb-1">Event Date</label>
              <input type="date" className="w-full border rounded-md p-2" value={form.eventDate} onChange={e=>setForm({...form, eventDate:e.target.value})} />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Notes</label>
            <textarea className="w-full border rounded-md p-2" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} />
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border">Cancel</button>
            <button type="submit" disabled={submitting} className="px-4 py-2 rounded-md bg-[#ffdede] border border-[#f7c6c6]">
              {submitting ? 'Processing...' : 'Confirm & Pay'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
