<template>
  <div class="tx-lp-page">
    <LandingNav />
    <main>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <FaqSection />
      <ContactSection />
    </main>
    <LandingFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import LandingNav from '@/components/landing/LandingNav.vue'
import HeroSection from '@/components/landing/HeroSection.vue'
import FeaturesSection from '@/components/landing/FeaturesSection.vue'
import PricingSection from '@/components/landing/PricingSection.vue'
import FaqSection from '@/components/landing/FaqSection.vue'
import ContactSection from '@/components/landing/ContactSection.vue'
import LandingFooter from '@/components/landing/LandingFooter.vue'

onMounted(() => {
  document.title = 'Admin Template — O template admin que acelera seu produto'
})
</script>

<style scoped>
.tx-lp-page {
  min-height: 100vh;
  background: var(--tx-card-bg);
}
</style>
