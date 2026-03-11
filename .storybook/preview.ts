import type { Preview } from '@storybook-vue/nuxt'

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    actions: { argTypesRegex: '^on[A-Z].*' },
    interactions: { disable: false },
    docs: {
      toc: true,
    },
  },
  initialActiveStory: 'design-system--overview',
};

export default preview;