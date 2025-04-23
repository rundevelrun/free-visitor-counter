import React from "react";
interface VisitorCounterResponse {
    dashboardUrl: string;
    totalCount: number;
    todayCount: number;
}
interface FreeVisitorCounterProps {
    totalCountPrefix?: string;
    totalCountSuffix?: string;
    todayCountPrefix?: string;
    todayCountSuffix?: string;
    separator?: string;
    showTotalFirst?: boolean;
    style?: React.CSSProperties;
    className?: string;
    onLoad?: (data: VisitorCounterResponse) => void;
}
export declare const FreeVisitorCounter: React.FC<FreeVisitorCounterProps>;
export default FreeVisitorCounter;
