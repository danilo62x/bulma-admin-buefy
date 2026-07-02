<template>
  <div>
    <!-- Page header -->
    <div class="tx-gallery-head">
      <div>
        <h1 class="title is-5" style="margin-bottom: 0.15rem;">Galeria</h1>
        <p class="is-size-7 has-text-grey">Imagens e vídeos da sua biblioteca de mídia.</p>
      </div>
      <div class="buttons has-addons" style="margin-bottom: 0;">
        <b-button
          v-for="t in TABS"
          :key="t.id"
          size="is-small"
          :type="tab === t.id ? 'is-primary' : 'is-light'"
          @click="changeTab(t.id)"
        >
          {{ t.label }}
        </b-button>
      </div>
    </div>

    <!-- Media grid -->
    <div class="tx-gallery-grid">
      <button
        v-for="(m, idx) in filtered"
        :key="m.id"
        class="tx-media-card"
        :class="{ 'is-tall': m.span }"
        @click="lightboxIndex = idx"
      >
        <div
          class="tx-media-bg"
          :style="{
            backgroundImage: `url(${m.thumb})`,
            backgroundColor: '#1f2937',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }"
        />
        <span v-if="m.type === 'video'" class="tx-media-badge">
          <span class="mdi mdi-play" /> Vídeo
        </span>
        <div class="tx-media-overlay">
          <p class="tx-media-title">{{ m.title }}</p>
          <p class="tx-media-meta">{{ m.meta }}</p>
        </div>
        <span class="tx-media-zoom">
          <span class="mdi mdi-magnify-plus-outline" />
        </span>
      </button>
    </div>

    <div v-if="filtered.length === 0" class="box has-text-centered" style="padding: 3rem;">
      <span class="has-text-grey is-size-7">Nenhuma mídia nesta categoria.</span>
    </div>

    <!-- Lightbox -->
    <b-modal v-model="lightboxOpen" :width="820" @close="close">
      <div v-if="active" class="tx-lightbox">
        <div class="tx-lightbox-stage" style="background: #0c111d;">
          <video
            v-if="active.type === 'video'"
            :key="active.id"
            class="tx-lightbox-media"
            :src="active.video"
            :poster="active.thumb"
            controls
            autoplay
            playsinline
          />
          <img v-else class="tx-lightbox-media" :src="active.thumb" :alt="active.title" />
        </div>
        <div class="tx-lightbox-bar">
          <div>
            <p class="tx-lightbox-title">{{ active.title }}</p>
            <p class="tx-lightbox-meta">
              {{ active.type === 'video' ? 'Vídeo' : 'Imagem' }} · {{ active.meta }}
            </p>
          </div>
          <span class="tx-lightbox-count">{{ (lightboxIndex ?? 0) + 1 }} / {{ filtered.length }}</span>
        </div>

        <button class="tx-lightbox-nav is-prev" aria-label="Anterior" @click.stop="prev">
          <span class="mdi mdi-chevron-left" />
        </button>
        <button class="tx-lightbox-nav is-next" aria-label="Próximo" @click.stop="next">
          <span class="mdi mdi-chevron-right" />
        </button>
        <button class="tx-lightbox-close" aria-label="Fechar" @click.stop="close">
          <span class="mdi mdi-close" />
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUiStore } from '@/stores/ui'

type MediaType = 'image' | 'video'
type Tab = 'all' | 'image' | 'video'

interface Media {
  id: string
  title: string
  type: MediaType
  meta: string
  /** Imagem (ou poster do vídeo) — Lorem Picsum, livre de direitos autorais */
  thumb: string
  /** URL do vídeo (Blender open movies / amostras públicas — Creative Commons) */
  video?: string
  gradient: string
  span: boolean
}

const ui = useUiStore()
onMounted(() => ui.setPageTitle('Galeria'))

// Mídia 100% livre de direitos autorais:
//  • Imagens: Lorem Picsum (picsum.photos) — domínio público, sem atribuição.
//  • Vídeos: open movies da Blender Foundation (CC-BY) / MDN (CC0) via hospedagem pública.
const pic = (seed: string, w = 800, h = 600) => `https://picsum.photos/seed/${seed}/${w}/${h}`
// Vídeos CC/CC0 com hospedagem pública estável (Big Buck Bunny = Blender CC-BY; flower = MDN CC0)
const VID_BBB720 = 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4'
const VID_BBB360 = 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4'
const VID_FLOWER = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
const VID_BBB_W3 = 'https://www.w3schools.com/html/mov_bbb.mp4'

const MEDIA: Media[] = [
  { id: '1', title: 'Pôr do sol na praia', type: 'image', meta: '1920 × 1080', thumb: pic('praia', 800, 1100), gradient: 'linear-gradient(135deg,#f97316,#ec4899)', span: true },
  { id: '2', title: 'Montanhas ao amanhecer', type: 'image', meta: '2400 × 1600', thumb: pic('montanha'), gradient: 'linear-gradient(135deg,#465fff,#0ba5ec)', span: false },
  { id: '3', title: 'Tour pelo escritório', type: 'video', meta: '00:10 · MP4', thumb: pic('escritorio'), video: VID_BBB720, gradient: 'linear-gradient(135deg,#12b76a,#0ba5ec)', span: false },
  { id: '4', title: 'Arquitetura moderna', type: 'image', meta: '1600 × 2000', thumb: pic('arquitetura', 800, 1100), gradient: 'linear-gradient(135deg,#6366f1,#a855f7)', span: true },
  { id: '5', title: 'Lançamento do produto', type: 'video', meta: '00:06 · MP4', thumb: pic('produto'), video: VID_FLOWER, gradient: 'linear-gradient(135deg,#f04438,#f79009)', span: false },
  { id: '6', title: 'Floresta tropical', type: 'image', meta: '2048 × 1365', thumb: pic('floresta'), gradient: 'linear-gradient(135deg,#059669,#65a30d)', span: false },
  { id: '7', title: 'Cidade à noite', type: 'image', meta: '1920 × 1280', thumb: pic('cidade'), gradient: 'linear-gradient(135deg,#1e293b,#465fff)', span: false },
  { id: '8', title: 'Depoimento de cliente', type: 'video', meta: '00:10 · MP4', thumb: pic('depoimento', 800, 1100), video: VID_BBB_W3, gradient: 'linear-gradient(135deg,#db2777,#7c3aed)', span: true },
  { id: '9', title: 'Detalhe de textura', type: 'image', meta: '1500 × 1500', thumb: pic('textura'), gradient: 'linear-gradient(135deg,#f59e0b,#ef4444)', span: false },
  { id: '10', title: 'Equipe em reunião', type: 'image', meta: '2200 × 1400', thumb: pic('equipe'), gradient: 'linear-gradient(135deg,#0ba5ec,#22d3ee)', span: false },
  { id: '11', title: 'Bastidores do evento', type: 'video', meta: '00:10 · MP4', thumb: pic('evento'), video: VID_BBB360, gradient: 'linear-gradient(135deg,#8b5cf6,#ec4899)', span: false },
  { id: '12', title: 'Paisagem minimalista', type: 'image', meta: '1920 × 1080', thumb: pic('paisagem', 800, 1100), gradient: 'linear-gradient(135deg,#10b981,#3b82f6)', span: true },
]

const TABS: { id: Tab; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'image', label: 'Imagens' },
  { id: 'video', label: 'Vídeos' },
]

const tab = ref<Tab>('all')
const lightboxIndex = ref<number | null>(null)

const filtered = computed(() => MEDIA.filter((m) => tab.value === 'all' || m.type === tab.value))

const active = computed(() =>
  lightboxIndex.value !== null ? filtered.value[lightboxIndex.value] : null
)

const lightboxOpen = computed({
  get: () => lightboxIndex.value !== null,
  set: (v: boolean) => {
    if (!v) lightboxIndex.value = null
  },
})

function changeTab(id: Tab) {
  tab.value = id
  lightboxIndex.value = null
}

function close() {
  lightboxIndex.value = null
}

function prev() {
  if (lightboxIndex.value === null) return
  lightboxIndex.value = (lightboxIndex.value - 1 + filtered.value.length) % filtered.value.length
}

function next() {
  if (lightboxIndex.value === null) return
  lightboxIndex.value = (lightboxIndex.value + 1) % filtered.value.length
}
</script>

<style scoped>
.tx-gallery-head {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}
@media (min-width: 769px) {
  .tx-gallery-head {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}

.tx-gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 180px;
  gap: 1rem;
}
@media (min-width: 769px) {
  .tx-gallery-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (min-width: 1024px) {
  .tx-gallery-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.tx-media-card {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--tx-border);
  border-radius: var(--tx-radius);
  padding: 0;
  cursor: pointer;
  text-align: left;
}
.tx-media-card.is-tall {
  grid-row: span 2;
}
.tx-media-bg {
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}
.tx-media-card:hover .tx-media-bg {
  transform: scale(1.05);
}
.tx-media-badge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.1rem 0.5rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 500;
  color: #fff;
  background: rgba(17, 24, 39, 0.6);
  backdrop-filter: blur(4px);
}
.tx-media-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
  background: linear-gradient(to top, rgba(17, 24, 39, 0.7), transparent 60%);
  opacity: 0;
  transition: opacity 0.2s ease;
}
.tx-media-card:hover .tx-media-overlay {
  opacity: 1;
}
.tx-media-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
}
.tx-media-meta {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
}
.tx-media-zoom {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: var(--tx-radius);
  background: rgba(255, 255, 255, 0.9);
  color: #374151;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.tx-media-card:hover .tx-media-zoom {
  opacity: 1;
}

.tx-lightbox {
  position: relative;
}
.tx-lightbox-stage {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: var(--tx-radius);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tx-lightbox-media {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.tx-lightbox-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
}
.tx-lightbox-title {
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
}
.tx-lightbox-meta {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}
.tx-lightbox-count {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}
.tx-lightbox-nav,
.tx-lightbox-close {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: none;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  cursor: pointer;
  transition: background var(--tx-transition);
}
.tx-lightbox-nav:hover,
.tx-lightbox-close:hover {
  background: rgba(255, 255, 255, 0.25);
}
.tx-lightbox-nav {
  top: calc(50% - 1.5rem);
  width: 2.75rem;
  height: 2.75rem;
  transform: translateY(-50%);
}
.tx-lightbox-nav .mdi {
  font-size: 1.6rem;
}
.tx-lightbox-nav.is-prev {
  left: -3.5rem;
}
.tx-lightbox-nav.is-next {
  right: -3.5rem;
}
.tx-lightbox-close {
  top: -3rem;
  right: 0;
  width: 2.5rem;
  height: 2.5rem;
}
.tx-lightbox-close .mdi {
  font-size: 1.4rem;
}
@media (max-width: 900px) {
  .tx-lightbox-nav.is-prev {
    left: 0.5rem;
  }
  .tx-lightbox-nav.is-next {
    right: 0.5rem;
  }
  .tx-lightbox-close {
    top: 0.5rem;
    right: 0.5rem;
  }
}
</style>
