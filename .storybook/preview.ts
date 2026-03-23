import type { Preview } from '@storybook-vue/nuxt'

// Import global styles including generated CSS variables
import '~/assets/styles/_css-variables-generated.css'

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    actions: { argTypesRegex: '^on[A-Z].*' },
    interactions: { disable: false },
    docs: {
      toc: true,
      autodocs: true,
    },
  },
  initialActiveStory: 'design-system--overview',
};

export default preview;