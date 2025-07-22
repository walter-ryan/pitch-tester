"use client";
import React from "react";

export default function LogoSVG({
    className = "",
    style = {},
}: {
    className?: string;
    style?: React.CSSProperties;
}) {
    return (
        <svg
            width="256"
            height="256"
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={style}
        >
            <ellipse
                cx="128"
                cy="128"
                rx="128"
                ry="128"
                style={{ fill: "var(--accent-light)", fillOpacity: 1, strokeWidth: 3.77953 }}
            />
            <path
                d="m 126.52837,65.08474 c 50.10566,-0.717859 3.5035,141.74664 49.15492,142.91334 24.77037,0.63305 43.14708,-83.92745 51.88574,-111.053677"
                style={{
                    fill: "none",
                    stroke: "var(--accent-mid)",
                    strokeWidth: 20,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeMiterlimit: 4,
                    strokeDasharray: "none",
                    strokeDashoffset: 0,
                    strokeOpacity: 1,
                }}
            />
            <path
                d="m 50.065178,65.995016 c 50.105662,-0.717859 3.5035,141.746644 49.15492,142.913344 24.770372,0.63305 43.147082,-83.92745 51.885742,-111.053681"
                style={{
                    fill: "none",
                    stroke: "var(--accent-mid)",
                    strokeWidth: 20,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeMiterlimit: 4,
                    strokeDasharray: "none",
                    strokeDashoffset: 0,
                    strokeOpacity: 1,
                }}
            />
        </svg>
    );
}
