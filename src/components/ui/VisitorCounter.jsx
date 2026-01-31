import React, { useEffect, useState } from 'react';
import { ref, onValue, runTransaction } from 'firebase/database';
import { rtdb } from '../../services/firebase';
import './VisitorCounter.css';

const VisitorCounter = () => {
    const [count, setCount] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!rtdb) {
            console.warn("Realtime Database not initialized - Visitor Counter disabled");
            setLoading(false);
            return;
        }

        const counterRef = ref(rtdb, 'visitors/count');

        // Increment counter on mount (once per session ideally, but for now every load is fine for checking)
        // In production, you might want to check localStorage to avoid double counting
        const hasVisited = sessionStorage.getItem('hasVisited');

        if (!hasVisited) {
            runTransaction(counterRef, (currentValue) => {
                return (currentValue || 0) + 1;
            }).then(() => {
                sessionStorage.setItem('hasVisited', 'true');
            }).catch((err) => {
                console.error("Counter transaction failed: ", err);
            });
        }

        // Listen for updates
        const unsubscribe = onValue(counterRef, (snapshot) => {
            const data = snapshot.val();
            setCount(data || 0);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return null;

    // Pad with leading zeros
    const displayCount = count ? count.toString().padStart(6, '0') : '000000';

    return (
        <div className="visitor-counter glass-card">
            <span className="counter-label text-retro">VISITORS</span>
            <div className="counter-digits">
                {displayCount.split('').map((digit, index) => (
                    <span key={index} className="digit neon-pink">{digit}</span>
                ))}
            </div>
        </div>
    );
};

export default VisitorCounter;
