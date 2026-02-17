import type { StorybookConfig } from '@storybook/vue3-vite'
import vue from '@vitejs/plugin-vue'

const config: StorybookConfig = {
  stories: [
    "../components/**/*.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx|mdx)"
  ],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {
      builder: {
        viteConfigPath: undefined
      }
    }
  },
  docs: {
    autodocs: "tag"
  },
  viteFinal: async (config, { configType }) => {
    config.plugins = [
      ...(config.plugins || []),
      vue()
    ]
    return config
  }
};
export default config