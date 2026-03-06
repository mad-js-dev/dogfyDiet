import type { StorybookConfig } from '@storybook/vue3-vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

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
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '~': resolve(__dirname, '..'),
        '@': resolve(__dirname, '..')
      }
    }
    config.plugins = [
      ...(config.plugins || []),
      vue()
    ]
    
    // Add CSS handling for SASS
    config.css = {
      postcss: {
        plugins: [
          require('postcss-import')({
            root: resolve(__dirname, '..'),
            path: 'node_modules/sass'
          })
        ]
      }
    }
    
    return config
  }
};
export default config