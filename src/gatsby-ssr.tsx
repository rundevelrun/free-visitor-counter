import React from "react"
import { FreeVisitorCounter } from "./index"

// Export for Gatsby SSR usage
// @ts-ignore
export const wrapPageElement = ({ element, props }) => {
    return <>{element}</>
}

// Export the component for direct usage in Gatsby
export { FreeVisitorCounter }