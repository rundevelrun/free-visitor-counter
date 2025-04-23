# @rundevelrun/free-visitor-counter

A free visitor counter React component. This package utilizes [free-visit-counter-api-dashboard](https://github.com/rundevelrun/free-visit-counter-api-dashboard) to track and display visitor counts for your website.

## Installation

```bash
npm install @rundevelrun/free-visitor-counter
# or
yarn add @rundevelrun/free-visitor-counter
```

## Usage

### Basic Usage

```jsx
import { FreeVisitorCounter } from '@rundevelrun/free-visitor-counter';

function MyComponent() {
return (
<div>
<h1>My Website</h1>
<FreeVisitorCounter />
</div>
);
}
```

### With Custom Styling

```jsx
import { FreeVisitorCounter } from '@rundevelrun/free-visitor-counter';

function MyComponent() {
return (
<div>
<h1>My Website</h1>
<FreeVisitorCounter
totalCountPrefix="Total Visitors: "
todayCountPrefix="Today's Visitors: "
separator=" | "
style={{
color: 'blue',
fontWeight: 'bold'
}}
/>
</div>
);
}
```

### Using with Gatsby

```jsx
import { FreeVisitorCounter } from '@rundevelrun/free-visitor-counter';

export default function IndexPage() {
return (
<main>
<h1>Gatsby Site</h1>
<FreeVisitorCounter
totalCountPrefix="Total Visitors: "
todayCountPrefix="Today's Visitors: "
/>
</main>
);
}
```

### Handling Data Load Event

```jsx
import { FreeVisitorCounter } from '@rundevelrun/free-visitor-counter';

function MyComponent() {
const handleCounterLoad = (data) => {
console.log('Visitor data:', data);
// Implement additional logic
};

return (
<div>
<h1>My Website</h1>
<FreeVisitorCounter
onLoad={handleCounterLoad}
/>
</div>
);
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| totalCountPrefix | string | 'Total: ' | Text to display before the total visitor count |
| totalCountSuffix | string | '' | Text to display after the total visitor count |
| todayCountPrefix | string | 'Today: ' | Text to display before today's visitor count |
| todayCountSuffix | string | '' | Text to display after today's visitor count |
| separator | string | ' \| ' | Separator between total and today's visitor counts (use '\n' for line break) |
| showTotalFirst | boolean | true | If true, shows total count first; if false, shows today's count first |
| style | object | {} | Inline styles to apply to the component |
| className | string | '' | CSS class to apply to the component |
| onLoad | function | undefined | Callback function called when visitor data is loaded |

## How It Works

This component automatically sends a request to the visitor counter API when the page loads. The request includes the following information:

- Current domain
- User's timezone
- Current page path
- Current page title
- Referrer URL
- Search query (if coming from a search engine)

When testing on localhost or 127.0.0.1, the component returns sample data without making an API request.

## License

MIT
