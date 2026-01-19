import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowRight, RotateCcw, ChevronDown, ChevronUp, Star, Award, AlertTriangle, Lightbulb, Globe, Map, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

// Real-world impact context for key decisions
const REAL_WORLD_IMPACT = {
    7: { // Long Island
        yes: "Protects East Coast from 1m sea level rise. Estimated cost: $60 billion over 50 years.",
        no: "Without coastal protection, 300,000 residents may need relocation by 2100."
    },
    2: { // Turf City
        yes: "First public housing in Bukit Timah in 40 years. Reduces social stratification.",
        no: "Opportunity cost: ~4,000 affordable housing units not built in prime location."
    },
    8: { // Identity Corridor
        yes: "Preserves cultural memory. Studies show heritage areas boost mental well-being by 15%.",
        no: "Development yields 3x more housing units but erases 150 years of history."
    },
    16: { // Ecological Corridors
        yes: "Enables wildlife movement. Dover Forest alone hosts 120 bird species.",
        no: "Fragmented reserves lose 30% biodiversity within 20 years."
    },
    28: { // Agri-Food
        yes: "Moves toward 30-by-30 goal. Reduces food import dependency from 90% to 70%.",
        no: "Remains vulnerable to global supply chain shocks like COVID-19."
    },
    30: { // ABC Waters (Solution)
        yes: "Bishan-Ang Mo Kio Park transformed a concrete canal into a 3km natural river. Template for resilience.",
        no: "Concrete drainage accelerates flooding downstream and destroys ecosystems."
    },
    31: { // Wind Corridors (Solution)
        yes: "Marina South wind corridors reduce ambient temperature by 2-4°C in peak summer.",
        no: "Urban heat island effect continues to intensify."
    }
};

// Analysis Logic config
const CARD_ANALYSIS = {
    // GOOD CARDS (Correct = 'yes')
    1: { correct: 'yes', reason: "Reduces traffic & activates precincts 24/7." }, // 10-Min Hood
    2: { correct: 'yes', reason: "Prevents 'rich ghettos' & reduces stratification." }, // Turf City
    4: { correct: 'yes', reason: "Decentralization is critical for transport viability." }, // JLD Gateway
    6: { correct: 'yes', reason: "Maximizes land yield without using new land." }, // Vertical Zoning
    7: { correct: 'yes', reason: "Existential necessity for climate survival." }, // Long Island
    8: { correct: 'yes', reason: "Preserves the city's soul & mental well-being." }, // Identity Corridor
    10: { correct: 'yes', reason: "Prevents costly planning errors & 'sick buildings'." }, // Digital Twin
    13: { correct: 'yes', reason: "Brings jobs closer to homes (Work-Live-Play)." }, // Vertical Industry
    15: { correct: 'yes', reason: "Economies of scale for cooling & energy." }, // District Cooling
    16: { correct: 'yes', reason: "Essential for genetic diversity & resilience." }, // Eco Corridors
    18: { correct: 'yes', reason: "Predictive maintenance saves millions." }, // Smart Sensors
    20: { correct: 'yes', reason: "Activates dead space for community use." }, // Recreation Master Plan
    21: { correct: 'yes', reason: "Unlocks massive height potential in the East." }, // PLAB Relocation
    22: { correct: 'yes', reason: "Restores natural ridges & connectivity." }, // Hill-to-Hill
    23: { correct: 'yes', reason: "Pedestrian priority creates safer neighbourhoods." }, // Bayshore
    24: { correct: 'yes', reason: "Cultural anchors boost district vibrancy." }, // Power Station
    25: { correct: 'yes', reason: "Heritage gives new towns instant character." }, // Chencharu
    26: { correct: 'yes', reason: "Flexibility builds economic resilience." }, // Business-White
    27: { correct: 'yes', reason: "Catalyzes cross-border economic synergy." }, // RTS Link
    28: { correct: 'yes', reason: "Critical for national food security." }, // Agri-Food
    29: { correct: 'yes', reason: "Passive design lowers the city's fever." }, // Heat Resilience

    // SOLUTION CARDS (Correct = 'yes' during crisis)
    30: { correct: 'yes', reason: "ABC Waters naturalizes drainage and adds recreation value." }, // ABC Waters
    31: { correct: 'yes', reason: "Wind corridors cool the city naturally without energy." }, // Wind Corridors
    32: { correct: 'yes', reason: "District cooling achieves economies of scale." }, // District Cooling Network
    33: { correct: 'yes', reason: "Vertical farms address the 30-by-30 food security goal." }, // Vertical Farms

    // DMP2025 Cards (v4.1)
    101: { correct: 'yes', reason: "Assisted living is critical for our aging population." }, // Community Care
    102: { correct: 'yes', reason: "Sacrificing land for wind corridors prevents heat build-up." }, // Wind Corridors (Heatwave)
    103: { correct: 'yes', reason: "Heritage defines our city's soul. Conservation > Efficiency." }, // Identity Corridor
    104: { correct: 'yes', reason: "Decentralizing to JLD reduces city-center congestion." }, // JLD Gateway

    // BAD CARDS (Correct = 'no')
    3: { correct: 'no', reason: "Destroys social cohesion & creates enclaves." }, // Gated Enclave
    9: { correct: 'no', reason: "Destroys biodiversity & increases flood risk." }, // Concrete Canal
    12: { correct: 'no', reason: "Creates 'tidal flow' traffic & sleeping towns." }, // Dormitory Town
    14: { correct: 'no', reason: "Causes car dependency & sterile streets." }, // Single-Use Zoning
    17: { correct: 'no', reason: "Creates 'placeless' towns & erases history." }, // Tabula Rasa
    19: { correct: 'no', reason: "Alienates the elderly & creates digital divide." }, // Techno-Centricity
};

export default function ImpactLedger({ data, onRestart, isReceipt = false, onViewCity, titleOverride }) {
    const { choices, stats } = data;
    const [showFullLog, setShowFullLog] = useState(isReceipt);

    // 1. Calculate Grade
    let correctCount = 0;
    let strategicChoices = 0;

    // Identify Missed Solutions
    const missedSolutions = [];

    const analyzedChoices = choices.map(choice => {
        // Fix: Ignore Bonus Feedback entries for analysis
        if (choice.type === 'bonus_feedback') return { ...choice, status: 'neutral' };

        const analysis = CARD_ANALYSIS[choice.cardId];
        if (!analysis) return { ...choice, status: 'neutral' }; // Press conferences etc.

        strategicChoices++;
        const isCorrect = choice.decision === analysis.correct;
        if (isCorrect) correctCount++;

        // Check if this was a missed solution card
        const isSolutionCard = [30, 31, 32, 33, 102].includes(choice.cardId);
        if (isSolutionCard && !isCorrect) {
            missedSolutions.push({
                title: choice.title,
                reason: analysis.reason
            });
        }

        return {
            ...choice,
            status: isCorrect ? 'correct' : 'mistake',
            reason: analysis.reason,
            correctAction: analysis.correct
        };
    });

    const scorePercent = strategicChoices > 0 ? (correctCount / strategicChoices) * 100 : 100;

    let grade = 'C';
    let title = 'Junior Planner';
    let color = '#94a3b8';

    if (scorePercent >= 90) { grade = 'S'; title = 'Visionary Minister'; color = '#eab308'; }
    else if (scorePercent >= 75) { grade = 'A'; title = 'Chief Planner'; color = '#22c55e'; }
    else if (scorePercent >= 50) { grade = 'B'; title = 'Town Planner'; color = '#3b82f6'; }
    else if (scorePercent >= 30) { grade = 'C'; title = 'Intern'; color = '#f59e0b'; }
    else { grade = 'F'; title = 'Fired'; color = '#ef4444'; }

    // 2. Select Highlights (Prioritize Mistakes first, then Great Moves)
    const mistakes = analyzedChoices.filter(c => c.status === 'mistake');
    const correctMoves = analyzedChoices.filter(c => c.status === 'correct');

    // Take up to 3 highlights: All mistakes if possible, fill rest with good moves
    const highlights = [...mistakes.slice(0, 3)];
    if (highlights.length < 3) {
        highlights.push(...correctMoves.slice(0, 3 - highlights.length));
    }

    // Hide Grade/Highlights if it's a Receipt view
    if (isReceipt) {
        return (
            <div className="screen" style={{ overflowY: 'auto', background: '#0f172a' }}>
                <div className="animate-fade-in flex-col" style={{ gap: '1.5rem', paddingBottom: '3rem', maxWidth: '600px', margin: '0 auto', width: '100%' }}>

                    {/* Nav Back Button */}
                    <button
                        onClick={onRestart}
                        style={{
                            position: 'sticky',
                            top: '1rem',
                            zIndex: 50,
                            alignSelf: 'flex-start',
                            color: 'white',
                            background: 'rgba(15, 23, 42, 0.8)',
                            backdropFilter: 'blur(4px)',
                            width: '40px', height: '40px',
                            borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            border: '1px solid #334155',
                            marginLeft: '1.5rem',
                            marginTop: '1rem'
                        }}
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'white', fontWeight: 700 }}>{titleOverride || 'Official Transcript'}</h2>
                        <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Receipt ID: #{data.receiptId || 'UNKNOWN'}</div>
                    </div>

                    <div className="flex-col" style={{ gap: '0.75rem', padding: '0 1.5rem' }}>
                        {choices.map((choice, i) => {
                            const isOpenEnded = choice.type === 'bonus_feedback' || (choice.type === 'press_conference' && choice.input);

                            if (isOpenEnded) {
                                return (
                                    <div key={i} style={{
                                        background: 'rgba(59, 130, 246, 0.1)',
                                        padding: '1rem', borderRadius: '12px',
                                        border: '1px solid rgba(59, 130, 246, 0.3)'
                                    }}>
                                        <div style={{ fontSize: '0.8rem', color: '#60a5fa', marginBottom: '4px', fontStyle: 'italic' }}>
                                            Response to: {choice.title}
                                        </div>
                                        <div style={{ fontSize: '1rem', color: 'white', fontWeight: 500 }}>
                                            "{choice.input || "No comment"}"
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <div key={i} style={{
                                    background: '#1e293b', padding: '0.75rem 1rem', borderRadius: '8px',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    opacity: 0.7
                                }}>
                                    <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{choice.title}</span>
                                    <span style={{
                                        fontSize: '0.75rem', fontWeight: 700,
                                        color: choice.decision === 'yes' ? '#22c55e' : '#ef4444',
                                        background: 'rgba(0,0,0,0.2)', padding: '2px 6px', borderRadius: '4px'
                                    }}>
                                        {choice.decision.toUpperCase()}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    <div style={{ padding: '0 1.5rem', marginTop: 'auto' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {/* View City Button */}
                            {onViewCity && (
                                <button
                                    onClick={onViewCity}
                                    style={{
                                        width: '100%', padding: '1rem', background: '#3b82f6', color: 'white',
                                        fontWeight: 700, borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
                                        border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.5)'
                                    }}
                                >
                                    <Map size={20} />
                                    View City
                                </button>
                            )}

                            <button
                                onClick={onRestart}
                                style={{
                                    width: '100%', padding: '1rem', background: '#334155', color: 'white',
                                    fontWeight: 700, borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
                                }}
                            >
                                <ArrowRight size={20} />
                                Back to Menu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="screen" style={{ overflowY: 'auto', background: '#0f172a' }}>
            <div className="animate-fade-in flex-col" style={{ gap: '1.5rem', paddingBottom: '3rem', maxWidth: '600px', margin: '0 auto', width: '100%' }}>

                {/* Nav Back Button */}
                <button
                    onClick={onRestart}
                    style={{
                        position: 'sticky',
                        top: '1rem',
                        zIndex: 50,
                        alignSelf: 'flex-start',
                        color: 'white',
                        background: 'rgba(15, 23, 42, 0.8)',
                        backdropFilter: 'blur(4px)',
                        width: '40px', height: '40px',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        border: '1px solid #334155',
                        marginLeft: '1.5rem',
                        marginTop: '1rem'
                    }}
                >
                    <ArrowLeft size={24} />
                </button>

                {/* Header: Grade & Score */}
                <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
                    <div style={{ fontSize: '0.9rem', color: '#94a3b8', letterSpacing: '2px', textTransform: 'uppercase' }}>Performance Review</div>
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', bounce: 0.5 }}
                        style={{ fontSize: '6rem', fontWeight: 900, color: color, lineHeight: 1, margin: '0.5rem 0' }}
                    >
                        {grade}
                    </motion.div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>{title}</div>
                    <div style={{ fontSize: '1rem', color: '#64748b', marginTop: '0.5rem' }}>
                        Logic Score: {Math.round(scorePercent)}% • Public Approval: {stats.happiness}%
                    </div>
                </div>

                {/* Missed Solutions Warning */}
                {missedSolutions.length > 0 && (
                    <div style={{ padding: '0 1.5rem' }}>
                        <div style={{
                            background: 'rgba(239, 68, 68, 0.15)',
                            border: '1px solid #ef4444',
                            borderRadius: '12px',
                            padding: '1rem'
                        }}>
                            <h3 style={{ fontSize: '1rem', color: '#fca5a5', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <AlertTriangle size={18} /> Missed Opportunities
                            </h3>
                            <div className="flex-col" style={{ gap: '0.5rem' }}>
                                {missedSolutions.map((item, i) => (
                                    <div key={i}>
                                        <div style={{ fontWeight: 700, color: '#ef4444', fontSize: '0.9rem' }}>
                                            {item.title}
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: '#fca5a5', fontStyle: 'italic' }}>
                                            {item.reason}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Key Highlights Section */}
                <div style={{ padding: '0 1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', color: '#e2e8f0', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Award size={20} color="#fbbf24" /> Key Decisions
                    </h3>
                    <div className="flex-col" style={{ gap: '1rem' }}>
                        {highlights.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                style={{
                                    background: '#1e293b',
                                    borderRadius: '16px',
                                    padding: '1.25rem',
                                    border: `1px solid ${item.status === 'mistake' ? '#ef4444' : '#22c55e'}`,
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <div style={{
                                    position: 'absolute', top: 0, left: 0, bottom: 0, width: '6px',
                                    background: item.status === 'mistake' ? '#ef4444' : '#22c55e'
                                }} />

                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span style={{
                                        fontSize: '0.75rem', fontWeight: 700,
                                        color: item.status === 'mistake' ? '#ef4444' : '#22c55e',
                                        textTransform: 'uppercase', letterSpacing: '1px'
                                    }}>
                                        {item.status === 'mistake' ? 'Critical Error' : 'Excellent Move'}
                                    </span>
                                    {item.status === 'mistake' ? <AlertTriangle size={16} color="#ef4444" /> : <Star size={16} color="#22c55e" fill="#22c55e" />}
                                </div>

                                <div style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                                    {item.title}
                                </div>
                                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
                                    You chose: <span style={{ color: 'white', fontWeight: 600 }}>{item.decision.toUpperCase()}</span>
                                </div>

                                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.9rem', color: '#cbd5e1', fontStyle: 'italic', borderLeft: '2px solid #475569' }}>
                                    "Analysis: {item.reason}"
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Real-World Impact Section */}
                {(() => {
                    // Find choices that have real-world impact context
                    const impactChoices = choices.filter(c => REAL_WORLD_IMPACT[c.cardId]);
                    if (impactChoices.length === 0) return null;

                    return (
                        <div style={{ padding: '0 1.5rem' }}>
                            <h3 style={{ fontSize: '1.1rem', color: '#e2e8f0', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Globe size={20} color="#60a5fa" /> In Real Life...
                            </h3>
                            <div className="flex-col" style={{ gap: '0.75rem' }}>
                                {impactChoices.slice(0, 3).map((choice, i) => {
                                    const impact = REAL_WORLD_IMPACT[choice.cardId];
                                    const impactText = impact[choice.decision] || impact.yes;

                                    return (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 + i * 0.1 }}
                                            style={{
                                                background: 'rgba(59, 130, 246, 0.1)',
                                                border: '1px solid rgba(59, 130, 246, 0.3)',
                                                borderRadius: '12px',
                                                padding: '1rem'
                                            }}
                                        >
                                            <div style={{
                                                fontSize: '0.75rem',
                                                color: '#60a5fa',
                                                fontWeight: 600,
                                                marginBottom: '0.25rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px'
                                            }}>
                                                {choice.title}
                                            </div>
                                            <div style={{
                                                fontSize: '0.9rem',
                                                color: '#e2e8f0',
                                                lineHeight: 1.5
                                            }}>
                                                💡 {impactText}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })()}

                {/* Collapsible Full Log */}
                <div style={{ padding: '0 1.5rem' }}>
                    <button
                        onClick={() => setShowFullLog(!showFullLog)}
                        style={{
                            width: '100%', padding: '1rem', background: '#334155', borderRadius: '12px',
                            color: 'white', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                        }}
                    >
                        {showFullLog ? 'Hide Full Log' : 'View All Decisions'}
                        {showFullLog ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>

                    <AnimatePresence>
                        {showFullLog && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                style={{ overflow: 'hidden' }}
                            >
                                <div className="flex-col" style={{ gap: '0.75rem', marginTop: '1rem' }}>
                                    {choices.map((choice, i) => {
                                        const isOpenEnded = choice.type === 'bonus_feedback' || (choice.type === 'press_conference' && choice.input);

                                        if (isOpenEnded) {
                                            return (
                                                <div key={i} style={{
                                                    background: 'rgba(59, 130, 246, 0.1)', // Blue tint for feedback
                                                    padding: '1rem',
                                                    borderRadius: '12px',
                                                    border: '1px solid rgba(59, 130, 246, 0.3)'
                                                }}>
                                                    <div style={{ fontSize: '0.8rem', color: '#60a5fa', marginBottom: '4px', fontStyle: 'italic' }}>
                                                        Question: {choice.title}
                                                    </div>
                                                    <div style={{ fontSize: '1rem', color: 'white', fontWeight: 500 }}>
                                                        "{choice.input || "No comment"}"
                                                    </div>
                                                </div>
                                            );
                                        }

                                        return (
                                            <div key={i} style={{
                                                background: '#1e293b', padding: '0.75rem 1rem', borderRadius: '8px',
                                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                                opacity: 0.7
                                            }}>
                                                <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{choice.title}</span>
                                                <span style={{
                                                    fontSize: '0.75rem', fontWeight: 700,
                                                    color: choice.decision === 'yes' ? '#22c55e' : '#ef4444',
                                                    background: 'rgba(0,0,0,0.2)', padding: '2px 6px', borderRadius: '4px'
                                                }}>
                                                    {choice.decision.toUpperCase()}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '0 1.5rem', marginTop: 'auto' }}>
                    {onViewCity && (
                        <button
                            onClick={onViewCity}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: '#3b82f6',
                                color: 'white',
                                fontWeight: 700,
                                borderRadius: '12px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '0.5rem',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            <Map size={20} />
                            View City
                        </button>
                    )}

                    <button
                        onClick={onRestart}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            background: 'var(--color-primary)',
                            color: 'white',
                            fontWeight: 700,
                            borderRadius: '12px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '0.5rem',
                            boxShadow: '0 4px 12px rgba(246, 181, 59, 0.4)'
                        }}
                    >
                        <RotateCcw size={20} />
                        Start New Term
                    </button>
                    <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: '#64748b' }}>
                        URA Draft Master Plan 2025 Edition
                    </div>
                </div>

            </div>
        </div>
    );
}
