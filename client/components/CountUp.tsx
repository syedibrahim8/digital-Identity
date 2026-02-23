"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
    to: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
}

export default function CountUp({ to, suffix = "", prefix = "", duration = 1600, className = "" }: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        let start: number | null = null;
        const step = (ts: number) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            // easeOutExpo
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(eased * to));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [isInView, to, duration]);

    return (
        <span ref={ref} className={className}>
            {prefix}{count}{suffix}
        </span>
    );
}
