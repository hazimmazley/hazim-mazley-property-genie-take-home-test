# Property Genie - Property Listing Search

A responsive property listing search page built with Next.js, Material-UI, and Styled Components.

## Features

- **Property Listings**: Browse properties with detailed information (price, bedrooms, bathrooms, floor size, etc.)
- **Search**: Search properties by name or address
- **Filtering**:
  - Price range (min/max with slider)
  - Property type (multi-select)
  - Location (cascading state/city dropdowns)
- **Sorting**: Sort by price (low to high, high to low) or default (latest)
- **Pagination**: Navigate through property listings with page controls
- **Saved Searches**: Save and load filter combinations using localStorage
- **Responsive Design**: Mobile-first approach with collapsible filter drawer on mobile
- **URL State Management**: Shareable URLs with filter/sort parameters

## Tech Stack

- **Framework**: Next.js 14 (Page Router)
- **UI Library**: Material-UI (MUI) v5
- **Styling**: Styled Components + MUI sx prop
- **Data Fetching**: SWR for caching and revalidation
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd property-genie-take-home-test
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
property-genie-take-home-test/
├── components/
│   ├── Layout/
│   │   └── Header.js
│   ├── PropertyCard/
│   │   ├── PropertyCard.js
│   │   └── PropertyCardSkeleton.js
│   ├── Filters/
│   │   ├── FilterSidebar.js
│   │   ├── PriceFilter.js
│   │   ├── PropertyTypeFilter.js
│   │   ├── LocationFilter.js
│   │   └── SearchInput.js
│   ├── Sort/
│   │   └── SortSelect.js
│   ├── Pagination/
│   │   └── Pagination.js
│   └── SavedSearches/
│       └── SavedSearches.js
├── hooks/
│   ├── useProperties.js
│   └── useSavedSearches.js
├── services/
│   └── api.js
├── utils/
│   ├── formatters.js
│   ├── filters.js
│   └── createEmotionCache.js
├── theme/
│   └── theme.js
├── pages/
│   ├── _app.js
│   ├── _document.js
│   └── index.js
└── styles/
    └── globals.css
```

## API

The application fetches property data from:
- **Endpoint**: `POST https://agents.propertygenie.com.my/api/properties-mock`
- **Query Parameters**:
  - `page`: Page number (1-indexed)
  - `sort`: `price` (ascending), `-price` (descending), or empty for default

Since the API doesn't support server-side filtering, client-side filtering is implemented after fetching all data.

## Key Implementation Details

### Client-Side Filtering
All properties are fetched upfront and filtered client-side for:
- Price range
- Property types
- Location (state/city)
- Text search (name/address)

### URL State Management
Filter and sort parameters are stored in URL query params, enabling:
- Shareable search URLs
- Browser back/forward navigation
- Bookmarkable searches

### Responsive Design
- **Mobile**: Single column layout with filter drawer
- **Tablet**: 2-column property grid
- **Desktop**: Sidebar filters with 3-4 column grid

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
