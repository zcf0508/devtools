<script setup>
const { mapContentNavigation } = useElementsHelpers()

useServerSeoMeta({
  ogSiteName: 'Nuxt DevTools',
  twitterCard: 'summary_large_image',
})
useHead({
  htmlAttrs: {
    lang: 'en',
  }
})
const links = [{
  label: 'Documentation',
  to: '/guide/getting-started',
}, {
  label: 'Playground',
  to: '/playground',
}, {
  label: 'Releases',
  to: 'https://github.com/nuxt/devtools/releases',
  target: '_blank',
}]
const { data: files } = useLazyFetch('/api/search.json', {
  default: () => [],
  server: false,
})
const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())

// Provide
provide('navigation', navigation)
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      <Logo />
    </template>

    <template #right>
      <UColorModeButton v-if="!$colorMode.forced" />
      <USocialButton aria-label="Nuxt Website" icon="i-simple-icons-nuxtdotjs" to="https://nuxt.com" />
      <USocialButton aria-label="Nuxt on X" icon="i-simple-icons-x" to="https://x.com/nuxt_js" />
      <USocialButton aria-label="Nuxt DevTools on GitHub" icon="i-simple-icons-github"
        to="https://github.com/nuxt/devtools" />
    </template>
    <!-- Mobile panel -->
    <template v-if="$route.path !== '/'" #panel>
      <LazyUDocsSearchButton size="md" class="mb-4 w-full" />
      <LazyUNavigationTree :links="mapContentNavigation(navigation)" default-open :multiple="false" />
    </template>
  </UHeader>

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <UFooter :links="links">
    <template #left>
      <span class="text-sm">
        Published under <NuxtLink to="https://github.com/nuxt/devtools" target="_blank" class="underline">MIT License</NuxtLink>
      </span>
    </template>
    <template #right>
      <UColorModeButton v-if="!$colorMode.forced" />
      <USocialButton aria-label="Nuxt Website" icon="i-simple-icons-nuxtdotjs" to="https://nuxt.com" />
      <USocialButton aria-label="Nuxt on X" icon="i-simple-icons-x" to="https://x.com/nuxt_js" />
      <USocialButton aria-label="Nuxt Devtools on GitHub" icon="i-simple-icons-github"
        to="https://github.com/nuxt/devtools" />
    </template>
  </UFooter>
  <ClientOnly>
    <LazyUDocsSearch :files="files" :navigation="navigation" :links="links" />
  </ClientOnly>
</template>
