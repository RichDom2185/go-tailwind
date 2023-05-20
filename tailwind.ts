import tailwindcss, { Config } from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import postcss from 'postcss'
import cssnano from 'cssnano'

export function process(config: Config): Promise<string> {
  let enablePreflight : boolean;
  if (Array.isArray(config.corePlugins)) {
    enablePreflight = config.corePlugins.includes('preflight')
  } else {
    enablePreflight = config.corePlugins?.preflight ?? false;
  }

  return postcss(
    tailwindcss(config),
    autoprefixer({
      overrideBrowserslist: ["defaults"]
    }),
    cssnano()
  ).process(`
    ${enablePreflight ? "@tailwind base;": ""}
    @tailwind components;
    @tailwind utilities;
  `, {
    from: undefined,
  }).then(result => {
    return result.css
  })
}
