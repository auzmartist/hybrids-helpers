import {defineConfig} from 'vite'
import analyzer from 'rollup-plugin-analyzer'
import { dependencies } from './package.json'

export default defineConfig((env) => {
  const mode = env.mode

  return {
    build: {
      emptyOutDir: false,
      lib: {
        entry: 'src/index.ts',
        name: 'hybrids-helpers',
      },
      rollupOptions: {
        external: [
          ...Object.keys(dependencies || {}).map((pkg) => new RegExp(`^${pkg}(/.*)?`))
        ],
      }
    },
    plugins: [
      mode === 'analyze' && analyzer({limit: 100, hideDeps: true}),
    ]
  }
})