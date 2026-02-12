import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const config = {
  stories: [
    "../components/**/*.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx|mdx)"
  ],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  framework: "@storybook/vue3-vite",
  docs: {
    autodocs: "tag"
  },
  viteFinal: async (config) => {
    config.plugins = [
      ...(config.plugins || []),
      vue()
    ]
    return config
  }
};
export default config