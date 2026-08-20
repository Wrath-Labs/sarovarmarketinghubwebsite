import { themeCssVariables } from '@/lib/content';

/** Turns /content/theme.json into CSS custom properties on :root.
    Server-rendered, so there is no flash of unstyled colour. */
export default function ThemeVars() {
  const vars = themeCssVariables();
  const css = `:root{${Object.entries(vars)
    .map(([k, v]) => `${k}:${v};`)
    .join('')}}`;

  return <style id="sarovar-theme" dangerouslySetInnerHTML={{ __html: css }} />;
}
