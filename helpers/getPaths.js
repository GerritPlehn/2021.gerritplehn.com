export const getPaths = (story) => {
  let paths = []
  paths.push({ lang: 'default', path: story.default_full_slug })
  if (story.translated_slugs) {
    for (let altSlug of story.translated_slugs) {
      paths.push({
        lang: altSlug.lang,
        path: `${altSlug.lang}/${altSlug.path}`,
      })
    }
  }
  return paths
}
