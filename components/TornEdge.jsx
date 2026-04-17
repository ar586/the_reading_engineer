export default function TornEdge({ fill, className = "" }) {
    return (
        <svg
            className={className}
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{ display: 'block', width: '100%', height: '40px', position: 'relative', zIndex: 10, marginTop: '-1px' }}
        >
            <path
                d="M0,0 
           L0,60 
           L40,70 L80,50 L120,80 L160,40 L200,90 L240,60 L280,100 
           L320,50 L360,90 L400,60 L440,110 L480,50 L520,80 L560,40 
           L600,100 L640,60 L680,90 L720,40 L760,80 L800,50 L840,100 
           L880,70 L920,110 L960,60 L1000,90 L1040,40 L1080,80 L1120,50 
           L1160,90 L1200,60
           L1200,0 Z"
                fill={fill}
            />
        </svg>
    );
}
