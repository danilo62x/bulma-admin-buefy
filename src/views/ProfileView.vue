<template>
  <div>
    <!-- Hero -->
    <div class="tx-profile-hero">
      <div class="tx-profile-cover" />
      <div class="tx-profile-identity">
        <div class="tx-avatar-lg">
          <span>{{ auth.user?.name?.[0] ?? 'A' }}</span>
          <button class="tx-avatar-edit" @click="ui.notify('Upload de foto', 'is-info')">
            <span class="mdi mdi-camera" />
          </button>
        </div>
        <div class="tx-profile-meta">
          <h2 class="tx-profile-name">{{ auth.user?.name ?? 'Administrador' }}</h2>
          <p class="tx-profile-role">
            <span class="tag is-primary is-light">Administrador</span>
          </p>
          <p class="tx-profile-since">Membro desde Janeiro de 2024</p>
        </div>
        <div class="tx-profile-actions">
          <b-button type="is-primary" icon-left="pencil" @click="editing = !editing">
            {{ editing ? 'Cancelar' : 'Editar Perfil' }}
          </b-button>
          <b-button type="is-light" icon-left="share-variant" @click="ui.notifySuccess('Link copiado!')">
            Compartilhar
          </b-button>
        </div>
      </div>
    </div>

    <!-- Stats row -->
    <div class="columns is-multiline tx-profile-stats">
      <div v-for="s in profileStats" :key="s.label" class="column is-3-desktop is-6-tablet">
        <div class="tx-pstat">
          <div class="tx-pstat-val">{{ s.value }}</div>
          <div class="tx-pstat-label">{{ s.label }}</div>
          <div class="tx-pstat-trend" :class="s.up ? 'has-text-success' : 'has-text-warning'">
            <span class="mdi" :class="s.up ? 'mdi-arrow-up-thin' : 'mdi-arrow-down-thin'" />{{ s.trend }}
          </div>
        </div>
      </div>
    </div>

    <div class="columns">
      <!-- Left column -->
      <div class="column is-4">

        <!-- About -->
        <CardComponent title="Sobre" icon="mdi-account-circle">
          <template v-if="!editing">
            <p style="font-size:0.875rem;color:var(--tx-text-muted);line-height:1.65;">
              Administrador sênior com foco em operações, relatórios e gestão de equipes. Mais de 8 anos de experiência em sistemas de gestão empresarial.
            </p>
            <div class="tx-info-list">
              <div v-for="info in contactInfo" :key="info.label" class="tx-info-row">
                <span class="mdi tx-info-icon" :class="info.icon" />
                <span>{{ info.value }}</span>
              </div>
            </div>
          </template>
          <template v-else>
            <b-field label="Nome completo">
              <b-input v-model="editForm.name" icon="account" expanded />
            </b-field>
            <b-field label="E-mail">
              <b-input v-model="editForm.email" type="email" icon="email" expanded />
            </b-field>
            <b-field label="Telefone">
              <b-input v-model="editForm.phone" icon="phone" expanded />
            </b-field>
            <b-field label="Departamento">
              <b-select v-model="editForm.dept" expanded>
                <option>Tecnologia</option>
                <option>Comercial</option>
                <option>Operações</option>
                <option>Financeiro</option>
              </b-select>
            </b-field>
            <b-field label="Bio">
              <b-input v-model="editForm.bio" type="textarea" :rows="3" maxlength="240" has-counter />
            </b-field>
            <div class="tx-form-actions">
              <b-button type="is-primary" icon-left="content-save" @click="saveProfile">Salvar</b-button>
              <b-button type="is-light" @click="editing = false">Cancelar</b-button>
            </div>
          </template>
        </CardComponent>

        <!-- Skills -->
        <CardComponent title="Habilidades" icon="mdi-star-outline" style="margin-top:1rem;">
          <div class="tx-skills">
            <div v-for="skill in skills" :key="skill.name" class="tx-skill-row">
              <div class="tx-skill-header">
                <span class="tx-skill-name">{{ skill.name }}</span>
                <span class="tx-skill-pct">{{ skill.pct }}%</span>
              </div>
              <b-progress :value="skill.pct" :type="skill.type" size="is-small" />
            </div>
          </div>
        </CardComponent>

        <!-- Tags de interesse -->
        <CardComponent title="Interesses" icon="mdi-tag-multiple" style="margin-top:1rem;">
          <div class="tx-tags-showcase">
            <span v-for="tag in interests" :key="tag" class="tag is-primary is-light">{{ tag }}</span>
          </div>
        </CardComponent>
      </div>

      <!-- Right column -->
      <div class="column is-8">

        <!-- Timeline de atividade -->
        <CardComponent title="Atividade Recente" icon="mdi-history">
          <template #toolbar>
            <b-button size="is-small" type="is-ghost" icon-left="refresh" @click="ui.notify('Atualizado!', 'is-info')">
              Atualizar
            </b-button>
          </template>
          <div class="tx-timeline">
            <div v-for="(evt, i) in timeline" :key="i" class="tx-tl-item">
              <div class="tx-tl-line" />
              <div class="tx-tl-dot" :style="{ background: evt.color }">
                <span class="mdi" :class="evt.icon" />
              </div>
              <div class="tx-tl-content">
                <div class="tx-tl-title">{{ evt.title }}</div>
                <div class="tx-tl-desc" v-if="evt.desc">{{ evt.desc }}</div>
                <div class="tx-tl-time">{{ evt.time }}</div>
              </div>
            </div>
          </div>
        </CardComponent>

        <!-- Projetos recentes -->
        <CardComponent title="Projetos Recentes" icon="mdi-folder-multiple" style="margin-top:1rem;">
          <div class="columns is-multiline">
            <div v-for="proj in projects" :key="proj.name" class="column is-6">
              <div class="tx-project-card">
                <div class="tx-project-header">
                  <div class="tx-project-icon" :style="{ background: `color-mix(in srgb, ${proj.color} 15%, transparent)`, color: proj.color }">
                    <span class="mdi" :class="proj.icon" />
                  </div>
                  <span class="tag is-small" :class="proj.statusClass">{{ proj.status }}</span>
                </div>
                <div class="tx-project-name">{{ proj.name }}</div>
                <div class="tx-project-desc">{{ proj.desc }}</div>
                <div class="tx-project-footer">
                  <div class="tx-project-progress">
                    <b-progress :value="proj.pct" :type="proj.color === '#48c774' ? 'is-success' : 'is-primary'" size="is-small" />
                    <span class="tx-project-pct">{{ proj.pct }}%</span>
                  </div>
                  <div class="tx-project-team">
                    <div v-for="(member, mi) in proj.team" :key="mi"
                      class="tx-team-avatar"
                      :style="{ background: member.color, marginLeft: mi > 0 ? '-6px' : '0', zIndex: proj.team.length - mi }">
                      {{ member.initials }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardComponent>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useUiStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'
import CardComponent from '@/components/ui/CardComponent.vue'

const ui = useUiStore()
const auth = useAuthStore()
onMounted(() => ui.setPageTitle('Meu Perfil'))

const editing = ref(false)

const editForm = reactive({
  name: auth.user?.name ?? 'Administrador',
  email: auth.user?.email ?? 'admin@empresa.com',
  phone: '(11) 99999-9999',
  dept: 'Tecnologia',
  bio: 'Administrador sênior focado em operações e gestão.',
})

function saveProfile() {
  editing.value = false
  ui.notifySuccess('Perfil atualizado com sucesso!')
}

const profileStats = [
  { label: 'Tarefas concluídas', value: '248', trend: '+12 este mês', up: true },
  { label: 'Relatórios emitidos', value: '64', trend: '+5 este mês', up: true },
  { label: 'Projetos ativos', value: '7', trend: '+2 novos', up: true },
  { label: 'Avaliação da equipe', value: '4.8★', trend: '+0.2 no trimestre', up: true },
]

const contactInfo = [
  { label: 'E-mail', value: 'admin@empresa.com', icon: 'mdi-email-outline' },
  { label: 'Telefone', value: '(11) 99999-9999', icon: 'mdi-phone-outline' },
  { label: 'Localização', value: 'São Paulo, SP', icon: 'mdi-map-marker-outline' },
  { label: 'Departamento', value: 'Tecnologia', icon: 'mdi-domain' },
  { label: 'Cargo', value: 'Administrador Sênior', icon: 'mdi-badge-account' },
]

const skills = [
  { name: 'Gestão de Projetos', pct: 92, type: 'is-primary' },
  { name: 'Análise de Dados', pct: 85, type: 'is-info' },
  { name: 'Liderança de Equipe', pct: 88, type: 'is-success' },
  { name: 'Desenvolvimento Vue.js', pct: 78, type: 'is-warning' },
  { name: 'Comunicação', pct: 95, type: 'is-primary' },
]

const interests = ['Vue.js', 'TypeScript', 'Bulma', 'UX Design', 'Analytics', 'Agile', 'Node.js', 'Docker']

const timeline = [
  { title: 'Relatório mensal publicado', desc: 'Análise de KPIs de Abril 2025 disponível no painel.', time: 'Há 2 horas', icon: 'mdi-file-chart', color: '#485fc7' },
  { title: 'Novo membro adicionado à equipe', desc: 'Fernanda Ramos entrou no projeto Alpha.', time: 'Há 5 horas', icon: 'mdi-account-plus', color: '#48c774' },
  { title: 'Meta de vendas atingida', desc: 'Superamos a meta de R$ 50k em Abril.', time: 'Ontem', icon: 'mdi-trophy', color: '#f59e0b' },
  { title: 'Atualização de sistema aplicada', desc: 'Versão 2.4.1 implantada em produção.', time: '2 dias atrás', icon: 'mdi-update', color: '#3273dc' },
  { title: 'Reunião com stakeholders', desc: 'Apresentação do roadmap Q2 aprovada.', time: '3 dias atrás', icon: 'mdi-presentation', color: '#9b59b6' },
  { title: 'Backup automático concluído', desc: 'Snapshot de banco de dados salvo com sucesso.', time: '1 semana atrás', icon: 'mdi-database-check', color: '#1abc9c' },
]

const projects = [
  {
    name: 'Dashboard Analytics', desc: 'Painel de BI com métricas em tempo real.',
    pct: 78, status: 'Ativo', statusClass: 'is-primary is-light',
    icon: 'mdi-chart-line', color: '#485fc7',
    team: [{ initials: 'J', color: '#485fc7' }, { initials: 'M', color: '#48c774' }, { initials: 'C', color: '#f59e0b' }],
  },
  {
    name: 'App Mobile', desc: 'Aplicativo React Native para gestão em campo.',
    pct: 42, status: 'Em andamento', statusClass: 'is-warning is-light',
    icon: 'mdi-cellphone', color: '#f59e0b',
    team: [{ initials: 'A', color: '#3273dc' }, { initials: 'R', color: '#9b59b6' }],
  },
  {
    name: 'Portal do Cliente', desc: 'Self-service para clientes visualizarem pedidos.',
    pct: 95, status: 'Revisão', statusClass: 'is-info is-light',
    icon: 'mdi-web', color: '#3273dc',
    team: [{ initials: 'F', color: '#1abc9c' }, { initials: 'T', color: '#e67e22' }, { initials: 'B', color: '#485fc7' }],
  },
  {
    name: 'Migração de Dados', desc: 'Migração do legado para novo banco PostgreSQL.',
    pct: 60, status: 'Ativo', statusClass: 'is-success is-light',
    icon: 'mdi-database-arrow-right', color: '#48c774',
    team: [{ initials: 'D', color: '#f14668' }, { initials: 'L', color: '#485fc7' }],
  },
]
</script>

<style scoped>
.tx-profile-hero {
  background: var(--tx-card-bg);
  border: 1px solid var(--tx-border);
  border-radius: var(--tx-radius);
  margin-bottom: 1rem;
  overflow: hidden;
}
.tx-profile-cover {
  height: 120px;
  background: linear-gradient(135deg, #485fc7 0%, #3273dc 40%, #48c774 100%);
}
.tx-profile-identity {
  display: flex;
  align-items: flex-end;
  gap: 1.25rem;
  padding: 0 1.5rem 1.25rem;
  flex-wrap: wrap;
}
.tx-avatar-lg {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: var(--tx-primary);
  border: 4px solid var(--tx-card-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 800;
  color: white;
  flex-shrink: 0;
  margin-top: -44px;
  position: relative;
}
.tx-avatar-edit {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--tx-primary);
  border: 2px solid var(--tx-card-bg);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  cursor: pointer;
}
.tx-profile-meta { flex: 1; }
.tx-profile-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--tx-text-heading);
  margin-bottom: 0.25rem;
}
.tx-profile-role { margin-bottom: 0.2rem; }
.tx-profile-since { font-size: 0.78rem; color: var(--tx-text-muted); }
.tx-profile-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
}
.tx-profile-stats { margin-bottom: 0 !important; }
.tx-pstat {
  background: var(--tx-card-bg);
  border: 1px solid var(--tx-border);
  border-radius: var(--tx-radius);
  padding: 1rem 1.25rem;
  margin-bottom: 1rem;
}
.tx-pstat-val { font-size: 1.5rem; font-weight: 700; color: var(--tx-text-heading); }
.tx-pstat-label { font-size: 0.8rem; color: var(--tx-text-muted); margin-top: 0.2rem; }
.tx-pstat-trend { font-size: 0.75rem; margin-top: 0.25rem; display: flex; align-items: center; gap: 0.2rem; }
.tx-info-list { display: flex; flex-direction: column; gap: 0.6rem; margin-top: 1rem; }
.tx-info-row { display: flex; align-items: center; gap: 0.6rem; font-size: 0.85rem; color: var(--tx-text); }
.tx-info-icon { font-size: 1rem; color: var(--tx-primary); width: 20px; }
.tx-skills { display: flex; flex-direction: column; gap: 0.75rem; }
.tx-skill-row {}
.tx-skill-header { display: flex; justify-content: space-between; margin-bottom: 0.3rem; }
.tx-skill-name { font-size: 0.83rem; color: var(--tx-text); }
.tx-skill-pct { font-size: 0.8rem; font-weight: 600; color: var(--tx-text-muted); }
/* Timeline */
.tx-timeline { display: flex; flex-direction: column; gap: 0; }
.tx-tl-item {
  display: flex;
  gap: 0.85rem;
  padding-bottom: 1.2rem;
  position: relative;
  &:last-child { padding-bottom: 0; }
  &:last-child .tx-tl-line { display: none; }
}
.tx-tl-line {
  position: absolute;
  left: 15px;
  top: 28px;
  bottom: 0;
  width: 2px;
  background: var(--tx-border);
}
.tx-tl-dot {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.9rem;
  flex-shrink: 0;
  z-index: 1;
}
.tx-tl-content { flex: 1; }
.tx-tl-title { font-size: 0.875rem; font-weight: 500; color: var(--tx-text); }
.tx-tl-desc { font-size: 0.8rem; color: var(--tx-text-muted); margin-top: 0.2rem; }
.tx-tl-time { font-size: 0.75rem; color: var(--tx-text-muted); margin-top: 0.3rem; }
/* Projects */
.tx-project-card {
  background: var(--tx-body-bg);
  border: 1px solid var(--tx-border);
  border-radius: var(--tx-radius);
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.tx-project-header { display: flex; justify-content: space-between; align-items: center; }
.tx-project-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}
.tx-project-name { font-size: 0.875rem; font-weight: 600; color: var(--tx-text-heading); }
.tx-project-desc { font-size: 0.8rem; color: var(--tx-text-muted); flex: 1; }
.tx-project-footer { display: flex; justify-content: space-between; align-items: center; gap: 0.75rem; }
.tx-project-progress { flex: 1; display: flex; align-items: center; gap: 0.4rem; }
.tx-project-pct { font-size: 0.72rem; color: var(--tx-text-muted); white-space: nowrap; }
.tx-project-team { display: flex; }
.tx-team-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 700;
  color: white;
  border: 2px solid var(--tx-card-bg);
  position: relative;
}
</style>
