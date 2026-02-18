# DogfyDiet - Pet Nutrition Questionnaire

A comprehensive questionnaire application for personalized pet nutrition recommendations built with Nuxt.js.
This is development demo, not a production application.

## Features

- **Multi-pet Support**: Configure nutrition plans for 1-2 pets
- **A/B Testing**: Dynamic questionnaire flow based on test groups
- **Smart Data Persistence**: Robust localStorage with data recovery
- **Step Validation**: Prevents skipping required questions
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Type Safety**: Full TypeScript implementation

## Setup

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dogfyDiet
```

2. Install dependencies:
```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development

### Starting Development Server

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

The application will be available at `http://localhost:3000`

### Development Tools

- **Nuxt DevTools**: Press `Shift + Alt + D` in the browser
- **Vue DevTools**: Install browser extension for Vue debugging
- **Storybook**: Run `npm run storybook` for component development

## A/B Testing

### Overview

The application includes A/B testing to optimize user experience:

- **Control Group**: Full questionnaire with activity level step (9 steps total)
- **Test Group**: Reduced questionnaire without activity level step (8 steps total)

### Triggering A/B Tests

A/B tests are automatically triggered on first visit:

1. **Random Assignment**: Users are randomly assigned to Control (50%) or Test (50%)
2. **Persistent Assignment**: Group assignment is saved in localStorage
3. **Consistent Experience**: Same user always gets same group

### Verifying A/B Functionality

#### Method 1: Browser Console
Open browser console and look for:
```javascript
🧪 A/B Test Group: CONTROL (9 steps)
// or
🧪 A/B Test Group: TEST (8 steps)
```

#### Method 2: URL Parameters
Check the URL for group parameter:
```
http://localhost:3000/step/1?group=control  // 9 steps
http://localhost:3000/step/1?group=test     // 8 steps
```

#### Method 3: localStorage Inspection
```javascript
// In browser console
localStorage.getItem('ab_testing_assignments')
// Expected: {"activity_level_removal":{"group":"control"|"test","assignedAt":1234567890}}
```

#### Method 4: Visual Verification
- **Control Group**: Activity Level step appears after Body Shape
- **Test Group**: Activity Level step is skipped, goes directly to Pathologyscenarios

## Production

### Building for Production

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

### GitHub Pages Deployment

#### Option 1: Automatic Deployment (Recommended)

1. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` and `/ (root)`
   - Save

2. **Push to main branch** - Automatic deployment will trigger

#### Option 2: Manual Deployment

```bash
# Install gh-pages (first time only)
npm install --save-dev gh-pages

# Deploy to GitHub Pages
npm run deploy:gh-pages
```

#### Option 3: Local Build and Manual Upload

```bash
# Generate static site
npm run generate

# Upload .output/public folder to GitHub Pages
```

### Preview Production Build

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```
## Project Structure

```
├── components/          # Vue components
│   ├── steps/          # Questionnaire step components
│   └── ui/             # Reusable UI components
├── composables/         # Vue composables
├── config/             # Configuration files
├── middleware/          # Nuxt middleware
├── pages/              # Nuxt pages
├── stores/             # Pinia stores
├── types/              # TypeScript type definitions
└── tests/              # Test files
```

## Key Technologies

- **Nuxt 3**: Vue.js meta-framework
- **Vue 3**: Progressive JavaScript framework
- **TypeScript**: Type-safe JavaScript
- **Pinia**: State management
- **Playwright**: End-to-end testing
- **Storybook**: Component development
- **Tailwind CSS**: Utility-first CSS framework

## Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Submit pull requests

### Getting Help

- Check browser console for errors
- Review network requests in DevTools
- Verify localStorage contents
