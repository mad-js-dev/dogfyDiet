import type { StorybookConfig } from '@storybook/vue3-vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const config: StorybookConfig = {
  stories: [
    "../.storybook/stories/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../components/**/*.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx|mdx)"
  ],
  addons: [
    // "@storybook/addon-a11y",
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
    autodocs: 'tag',
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
    
    // Override TypeScript configuration for Storybook
    config.esbuild = {
      ...config.esbuild,
      tsconfigRaw: {
        compilerOptions: {
          target: "ES2020",
          module: "ESNext",
          moduleResolution: "node",
          strict: false,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
          resolveJsonModule: true,
          isolatedModules: true,
          noEmit: true,
          jsx: "preserve",
          baseUrl: ".",
          paths: {
            "~/*": ["./*"],
            "@/*": ["./*"]
          }
        },
        include: [
          "**/*.ts",
          "**/*.tsx",
          "**/*.vue",
          "**/*.js"
        ],
        exclude: [
          "node_modules",
          ".nuxt",
          "dist"
        ]
      }
    }
    
    config.plugins = [
      ...(config.plugins || []),
      vue()
    ]
    
    return config
  }
};
export default config