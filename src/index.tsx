"use client"

import React from "react"
import { useEffect, useState } from "react"

interface VisitorCounterResponse {
    dashboardUrl: string
    totalCount: number
    todayCount: number
}

interface FreeVisitorCounterProps {
    // Text to display before and after counts
    totalCountPrefix?: string
    totalCountSuffix?: string
    todayCountPrefix?: string
    todayCountSuffix?: string

    // Separator between counts
    separator?: string

    // Order of display
    showTotalFirst?: boolean

    // Custom styling
    style?: React.CSSProperties
    className?: string

    // Callback when data is loaded
    onLoad?: (data: VisitorCounterResponse) => void
}

export const FreeVisitorCounter: React.FC<FreeVisitorCounterProps> = ({
                                                                          totalCountPrefix = "Total: ",
                                                                          totalCountSuffix = "",
                                                                          todayCountPrefix = "Today: ",
                                                                          todayCountSuffix = "",
                                                                          separator = " | ",
                                                                          showTotalFirst = true,
                                                                          style = {},
                                                                          className = "",
                                                                          onLoad,
                                                                      }) => {
    const [counterData, setCounterData] = useState<VisitorCounterResponse | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchVisitorCount = async () => {
            try {
                // Get current page information
                const domain = window.location.hostname
                const page_path = window.location.pathname
                const page_title = document.title
                const referrer = document.referrer

                // Get timezone
                const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

                // Extract search query if coming from a search engine
                const searchQuery = extractSearchQuery(document.referrer)

                // Prepare request data
                const requestData = {
                    domain,
                    timezone,
                    page_path,
                    page_title,
                    referrer,
                    search_query: searchQuery,
                }

                // For localhost or 127.0.0.1, return sample data
                if (domain === "localhost" || domain === "127.0.0.1") {
                    const sampleData = {
                        dashboardUrl: "https://visitor.6developer.com/dashboard?domain=sample.com",
                        totalCount: 999999,
                        todayCount: 999,
                    }
                    setCounterData(sampleData)
                    if (onLoad) onLoad(sampleData)
                    setIsLoading(false)
                    return
                }

                // Make API request
                const response = await fetch("http://visitor.6developer.com/visitor", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestData),
                })

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }

                const data = await response.json()
                setCounterData(data)
                if (onLoad) onLoad(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error")
                console.error("Error fetching visitor count:", err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchVisitorCount()
    }, [onLoad])

    // Function to extract search query from referrer URL
    const extractSearchQuery = (referrerUrl: string): string => {
        if (!referrerUrl) return ""

        try {
            const url = new URL(referrerUrl)
            const hostname = url.hostname.toLowerCase()

            // Check for common search engines and extract their query parameters
            if (hostname.includes("google.com") || hostname.includes("google.co.kr") || hostname.includes("google.co.jp")) {
                return url.searchParams.get("q") || ""
            } else if (hostname.includes("naver.com")) {
                return url.searchParams.get("query") || ""
            } else if (hostname.includes("daum.net")) {
                return url.searchParams.get("q") || ""
            } else if (hostname.includes("yahoo.com") || hostname.includes("yahoo.co.jp")) {
                return url.searchParams.get("p") || ""
            } else if (hostname.includes("bing.com")) {
                return url.searchParams.get("q") || ""
            } else if (hostname.includes("baidu.com")) {
                return url.searchParams.get("wd") || ""
            } else if (hostname.includes("yandex.ru")) {
                return url.searchParams.get("text") || ""
            }
        } catch (e) {
            console.error("Error parsing referrer URL:", e)
        }

        return ""
    }

    if (isLoading) {
        return (
            <span className={className} style={style}>
        Loading...
      </span>
        )
    }

    if (error || !counterData) {
        return (
            <span className={className} style={style}>
        Error loading visitor count
      </span>
        )
    }

    // Format the counter display
    const totalCountDisplay = `${totalCountPrefix}${counterData.totalCount}${totalCountSuffix}`
    const todayCountDisplay = `${todayCountPrefix}${counterData.todayCount}${todayCountSuffix}`

    // Determine display order
    const firstDisplay = showTotalFirst ? totalCountDisplay : todayCountDisplay
    const secondDisplay = showTotalFirst ? todayCountDisplay : totalCountDisplay

    // Handle newline in separator
    const formattedSeparator = separator.replace(/\\n/g, "\n")

    return (
        <a href={counterData.dashboardUrl} className={className} style={style} target="_blank" rel="noopener noreferrer">
            {firstDisplay}
            {formattedSeparator.includes("\n") ? (
                <>
                    <br />
                    {secondDisplay}
                </>
            ) : (
                <>
                    {formattedSeparator}
                    {secondDisplay}
                </>
            )}
        </a>
    )
}

// For compatibility with different import styles
export default FreeVisitorCounter