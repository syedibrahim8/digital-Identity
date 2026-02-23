"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 z-[9999] h-[2px] origin-left"
            style={{
                scaleX,
                background: "linear-gradient(90deg, #a855f7, #38bdf8, #f472b6)",
            }}
        />
    );
}
