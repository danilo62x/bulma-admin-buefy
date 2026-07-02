<template>
  <div class="columns">
    <!-- Main content -->
    <div class="column is-8">
      <CardComponent title="Formulários Buefy" icon="mdi-form-select" :no-padding="false">
        <b-tabs v-model="activeTab" type="is-boxed" size="is-small">

          <!-- ── Tab 1: Cadastro ──────────────────────────────── -->
          <b-tab-item label="Cadastro" icon="account-plus">
            <form @submit.prevent="handleSubmit">

              <p class="tx-section-divider">Informações Pessoais</p>
              <div class="columns is-multiline">
                <div class="column is-6">
                  <b-field
                    label="Nome completo *"
                    :type="errors.name ? 'is-danger' : ''"
                    :message="errors.name || ''"
                  >
                    <b-input v-model="form.name" placeholder="Digite o nome" icon="account" expanded />
                  </b-field>
                </div>
                <div class="column is-6">
                  <b-field
                    label="E-mail *"
                    :type="errors.email ? 'is-danger' : ''"
                    :message="errors.email || ''"
                  >
                    <b-input v-model="form.email" type="email" placeholder="email@exemplo.com" icon="email" expanded />
                  </b-field>
                </div>
                <div class="column is-4">
                  <b-field label="Telefone">
                    <b-input v-model="form.phone" placeholder="(11) 99999-9999" icon="phone" expanded />
                  </b-field>
                </div>
                <div class="column is-4">
                  <b-field label="Data de nascimento">
                    <b-datepicker
                      v-model="form.birthdate"
                      placeholder="Selecione..."
                      icon="calendar"
                      locale="pt-BR"
                      :max-date="new Date()"
                      trap-focus
                      expanded
                    />
                  </b-field>
                </div>
                <div class="column is-4">
                  <b-field label="Cidade">
                    <b-autocomplete
                      v-model="citySearch"
                      :data="filteredCities"
                      placeholder="Digite uma cidade..."
                      icon="map-marker"
                      clearable
                      open-on-focus
                      expanded
                      @select="(opt: string) => (form.city = opt)"
                    />
                  </b-field>
                </div>
                <div class="column is-12">
                  <b-field label="Biografia">
                    <b-input
                      v-model="form.bio"
                      type="textarea"
                      placeholder="Fale um pouco sobre você..."
                      :rows="3"
                      maxlength="300"
                      has-counter
                    />
                  </b-field>
                </div>
              </div>

              <p class="tx-section-divider">Conta & Acesso</p>
              <div class="columns is-multiline">
                <div class="column is-6">
                  <b-field
                    label="Senha *"
                    :type="errors.password ? 'is-danger' : ''"
                    :message="errors.password || ''"
                  >
                    <b-input
                      v-model="form.password"
                      type="password"
                      placeholder="Mínimo 8 caracteres"
                      icon="lock"
                      password-reveal
                      expanded
                    />
                  </b-field>
                </div>
                <div class="column is-6">
                  <b-field
                    label="Perfil *"
                    :type="errors.profile ? 'is-danger' : ''"
                    :message="errors.profile || ''"
                  >
                    <b-select v-model="form.profile" placeholder="Selecione um perfil" expanded icon="account-cog">
                      <option value="">-- Selecione --</option>
                      <option value="admin">Administrador</option>
                      <option value="manager">Gerente</option>
                      <option value="operator">Operador</option>
                      <option value="viewer">Visualizador</option>
                    </b-select>
                  </b-field>
                </div>
                <div class="column is-6">
                  <b-field label="Horário de trabalho">
                    <b-timepicker
                      v-model="form.workTime"
                      placeholder="Selecione o horário"
                      icon="clock"
                      hour-format="24"
                      expanded
                    />
                  </b-field>
                </div>
                <div class="column is-6">
                  <b-field label="Tags de interesse">
                    <b-taginput
                      v-model="form.tags"
                      :data="filteredTagSuggestions"
                      autocomplete
                      allow-new
                      open-on-focus
                      icon="label"
                      placeholder="Adicione tags..."
                      type="is-primary"
                      @typing="filterTags"
                    />
                  </b-field>
                </div>
              </div>

              <p class="tx-section-divider">Preferências</p>
              <div class="columns is-multiline">
                <div class="column is-4">
                  <b-field label="Status da conta">
                    <b-switch v-model="form.active" type="is-success">
                      {{ form.active ? 'Ativo' : 'Inativo' }}
                    </b-switch>
                  </b-field>
                </div>
                <div class="column is-4">
                  <b-field label="Notificações por e-mail">
                    <b-switch v-model="form.notifications" type="is-info">
                      {{ form.notifications ? 'Habilitado' : 'Desabilitado' }}
                    </b-switch>
                  </b-field>
                </div>
                <div class="column is-4">
                  <b-field label="Avaliação de satisfação">
                    <b-rate v-model="form.rating" :max="5" size="is-medium" />
                  </b-field>
                </div>
                <div class="column is-6">
                  <b-field label="Gênero">
                    <div class="tx-radio-group">
                      <b-radio v-model="form.gender" native-value="M">Masculino</b-radio>
                      <b-radio v-model="form.gender" native-value="F">Feminino</b-radio>
                      <b-radio v-model="form.gender" native-value="O">Outro</b-radio>
                    </div>
                  </b-field>
                </div>
                <div class="column is-6">
                  <b-field label="Permissões">
                    <div class="tx-check-group">
                      <b-checkbox v-model="form.permissions" native-value="read">Leitura</b-checkbox>
                      <b-checkbox v-model="form.permissions" native-value="write">Escrita</b-checkbox>
                      <b-checkbox v-model="form.permissions" native-value="delete">Exclusão</b-checkbox>
                      <b-checkbox v-model="form.permissions" native-value="admin">Admin</b-checkbox>
                    </div>
                  </b-field>
                </div>
                <div class="column is-12">
                  <b-field label="Foto de perfil">
                    <b-upload v-model="form.file" accept="image/*" drag-drop expanded>
                      <section class="tx-upload-zone">
                        <p><b-icon icon="upload" size="is-large" /></p>
                        <p class="tx-upload-hint">
                          {{ form.file ? form.file.name : 'Arraste uma imagem ou clique para selecionar' }}
                        </p>
                      </section>
                    </b-upload>
                  </b-field>
                </div>
              </div>

              <div class="tx-form-actions">
                <b-button native-type="submit" type="is-primary" icon-left="content-save" :loading="saving">
                  Salvar cadastro
                </b-button>
                <b-button type="is-light" icon-left="refresh" @click="handleReset">
                  Limpar
                </b-button>
              </div>
            </form>
          </b-tab-item>

          <!-- ── Tab 2: Vitrine de Campos ────────────────────── -->
          <b-tab-item label="Componentes" icon="puzzle">

            <p class="tx-section-divider">b-input — Variantes e Estados</p>
            <div class="tx-showcase-grid">
              <div class="tx-showcase-item">
                <p class="tx-component-label">Padrão com ícone</p>
                <b-field>
                  <b-input v-model="demo.text" placeholder="Digite aqui..." icon="pencil" expanded />
                </b-field>
              </div>
              <div class="tx-showcase-item">
                <p class="tx-component-label">Sucesso</p>
                <b-field type="is-success" message="Campo validado!">
                  <b-input value="valor válido" icon="check" type="is-success" expanded />
                </b-field>
              </div>
              <div class="tx-showcase-item">
                <p class="tx-component-label">Erro</p>
                <b-field type="is-danger" message="Campo obrigatório">
                  <b-input value="" icon="alert-circle" type="is-danger" placeholder="Obrigatório" expanded />
                </b-field>
              </div>
              <div class="tx-showcase-item">
                <p class="tx-component-label">Aviso</p>
                <b-field type="is-warning" message="Verifique o valor">
                  <b-input value="valor?" icon="alert" type="is-warning" expanded />
                </b-field>
              </div>
              <div class="tx-showcase-item">
                <p class="tx-component-label">Carregando</p>
                <b-field>
                  <b-input value="buscando..." :loading="true" expanded />
                </b-field>
              </div>
              <div class="tx-showcase-item">
                <p class="tx-component-label">Desabilitado</p>
                <b-field>
                  <b-input value="não editável" disabled expanded />
                </b-field>
              </div>
              <div class="tx-showcase-item">
                <p class="tx-component-label">Somente leitura</p>
                <b-field>
                  <b-input value="somente leitura" readonly expanded />
                </b-field>
              </div>
              <div class="tx-showcase-item">
                <p class="tx-component-label">Senha com revelação</p>
                <b-field>
                  <b-input v-model="demo.password" type="password" placeholder="Senha..." password-reveal expanded />
                </b-field>
              </div>
            </div>

            <p class="tx-section-divider">b-select — Select Nativo</p>
            <div class="tx-showcase-grid">
              <div class="tx-showcase-item">
                <p class="tx-component-label">Padrão</p>
                <b-field>
                  <b-select v-model="demo.select" placeholder="Selecione..." expanded>
                    <option value="a">Opção A</option>
                    <option value="b">Opção B</option>
                    <option value="c">Opção C</option>
                  </b-select>
                </b-field>
              </div>
              <div class="tx-showcase-item">
                <p class="tx-component-label">Com ícone</p>
                <b-field>
                  <b-select v-model="demo.select2" placeholder="Selecione um perfil" icon="account-cog" expanded>
                    <option value="admin">Administrador</option>
                    <option value="user">Usuário</option>
                  </b-select>
                </b-field>
              </div>
              <div class="tx-showcase-item">
                <p class="tx-component-label">Múltiplo</p>
                <b-field>
                  <b-select v-model="demo.multiSelect" multiple :size="3" expanded>
                    <option value="vue">Vue.js</option>
                    <option value="react">React</option>
                    <option value="angular">Angular</option>
                    <option value="svelte">Svelte</option>
                  </b-select>
                </b-field>
              </div>
              <div class="tx-showcase-item">
                <p class="tx-component-label">Erro</p>
                <b-field type="is-danger" message="Selecione uma opção">
                  <b-select placeholder="Obrigatório" type="is-danger" expanded>
                    <option>Opção 1</option>
                  </b-select>
                </b-field>
              </div>
            </div>

            <p class="tx-section-divider">b-checkbox & b-radio</p>
            <div class="columns">
              <div class="column is-6">
                <p class="tx-component-label">Checkboxes</p>
                <div class="tx-check-group">
                  <b-checkbox v-model="demo.check1">Padrão marcado</b-checkbox>
                  <b-checkbox :model-value="false">Desmarcado</b-checkbox>
                  <b-checkbox :indeterminate="true">Indeterminado</b-checkbox>
                  <b-checkbox disabled>Desabilitado</b-checkbox>
                  <b-checkbox v-model="demo.check2" type="is-success">Sucesso</b-checkbox>
                  <b-checkbox v-model="demo.check3" type="is-danger">Danger</b-checkbox>
                </div>
              </div>
              <div class="column is-6">
                <p class="tx-component-label">Radios</p>
                <div class="tx-radio-group">
                  <b-radio v-model="demo.radio" native-value="a">Opção A</b-radio>
                  <b-radio v-model="demo.radio" native-value="b">Opção B</b-radio>
                  <b-radio v-model="demo.radio" native-value="c" disabled>Desabilitado</b-radio>
                </div>
                <p class="tx-component-label" style="margin-top: 1rem;">Radios com tipo</p>
                <div class="tx-radio-group">
                  <b-radio v-model="demo.radio2" native-value="s" type="is-success">Sucesso</b-radio>
                  <b-radio v-model="demo.radio2" native-value="w" type="is-warning">Aviso</b-radio>
                  <b-radio v-model="demo.radio2" native-value="d" type="is-danger">Perigo</b-radio>
                </div>
              </div>
            </div>

            <p class="tx-section-divider">b-switch</p>
            <div class="tx-check-group">
              <b-switch v-model="demo.switch1">Padrão</b-switch>
              <b-switch v-model="demo.switch2" type="is-success">Sucesso</b-switch>
              <b-switch v-model="demo.switch3" type="is-info">Info</b-switch>
              <b-switch v-model="demo.switch4" type="is-warning">Aviso</b-switch>
              <b-switch v-model="demo.switch5" type="is-danger">Perigo</b-switch>
              <b-switch disabled>Desabilitado</b-switch>
              <b-switch v-model="demo.switch6" size="is-small">Pequeno</b-switch>
              <b-switch v-model="demo.switch7" size="is-large">Grande</b-switch>
            </div>

            <p class="tx-section-divider">b-numberinput — Campo Numérico</p>
            <div class="tx-showcase-grid">
              <div class="tx-showcase-item">
                <p class="tx-component-label">Padrão</p>
                <b-field>
                  <b-numberinput v-model="demo.number1" :min="0" :max="100" expanded />
                </b-field>
              </div>
              <div class="tx-showcase-item">
                <p class="tx-component-label">Compacto</p>
                <b-field>
                  <b-numberinput v-model="demo.number2" :min="1" :max="99" controls-position="compact" expanded />
                </b-field>
              </div>
              <div class="tx-showcase-item">
                <p class="tx-component-label">Com passo de 5</p>
                <b-field>
                  <b-numberinput v-model="demo.number3" :min="0" :max="100" :step="5" type="is-info" expanded />
                </b-field>
              </div>
              <div class="tx-showcase-item">
                <p class="tx-component-label">Sem controles</p>
                <b-field>
                  <b-numberinput v-model="demo.number4" :controls="false" placeholder="0" expanded />
                </b-field>
              </div>
            </div>

            <p class="tx-section-divider">b-slider — Controle Deslizante</p>
            <div class="columns">
              <div class="column is-6">
                <p class="tx-component-label">Volume (0–100)</p>
                <b-slider v-model="demo.slider1" :min="0" :max="100" type="is-primary" :ticks="true" />
                <p class="tx-component-label" style="margin-top:0.5rem;">Valor: {{ demo.slider1 }}</p>
              </div>
              <div class="column is-6">
                <p class="tx-component-label">Orçamento (formater)</p>
                <b-slider
                  v-model="demo.slider2"
                  :min="0"
                  :max="10000"
                  :step="500"
                  type="is-success"
                  :custom-formatter="(v: number) => `R$ ${v.toLocaleString('pt-BR')}`"
                />
                <p class="tx-component-label" style="margin-top:0.5rem;">
                  R$ {{ demo.slider2.toLocaleString('pt-BR') }}
                </p>
              </div>
            </div>

            <p class="tx-section-divider">b-rate — Avaliação por Estrelas</p>
            <div class="tx-showcase-grid">
              <div class="tx-showcase-item">
                <p class="tx-component-label">Padrão (5 estrelas)</p>
                <b-rate v-model="demo.rate1" :max="5" />
              </div>
              <div class="tx-showcase-item">
                <p class="tx-component-label">Médio</p>
                <b-rate v-model="demo.rate2" :max="5" size="is-medium" />
              </div>
              <div class="tx-showcase-item">
                <p class="tx-component-label">10 estrelas</p>
                <b-rate v-model="demo.rate3" :max="10" size="is-small" />
              </div>
              <div class="tx-showcase-item">
                <p class="tx-component-label">Somente leitura</p>
                <b-rate :model-value="4" :max="5" disabled />
              </div>
            </div>

            <p class="tx-section-divider">b-datepicker & b-timepicker</p>
            <div class="columns">
              <div class="column is-4">
                <b-field label="Data">
                  <b-datepicker
                    v-model="demo.date"
                    placeholder="Selecione..."
                    icon="calendar"
                    locale="pt-BR"
                    trap-focus
                    expanded
                  />
                </b-field>
              </div>
              <div class="column is-4">
                <b-field label="Hora">
                  <b-timepicker
                    v-model="demo.time"
                    placeholder="Selecione..."
                    icon="clock"
                    hour-format="24"
                    expanded
                  />
                </b-field>
              </div>
              <div class="column is-4">
                <b-field label="Data e Hora">
                  <b-datetimepicker
                    v-model="demo.datetime"
                    placeholder="Selecione..."
                    icon="calendar-clock"
                    locale="pt-BR"
                    trap-focus
                    expanded
                  />
                </b-field>
              </div>
            </div>

            <p class="tx-section-divider">b-autocomplete & b-taginput</p>
            <div class="columns">
              <div class="column is-6">
                <b-field label="Autocomplete — Cidade">
                  <b-autocomplete
                    v-model="demo.autoText"
                    :data="filteredDemoCities"
                    placeholder="Digite uma cidade..."
                    icon="map-marker"
                    clearable
                    open-on-focus
                    expanded
                    @typing="filterDemoCities"
                  />
                </b-field>
              </div>
              <div class="column is-6">
                <b-field label="Taginput — Tecnologias">
                  <b-taginput
                    v-model="demo.tags"
                    :data="filteredTagSuggestions"
                    autocomplete
                    allow-new
                    open-on-focus
                    icon="tag"
                    placeholder="Adicione..."
                    type="is-primary"
                    @typing="filterTags"
                  />
                </b-field>
              </div>
            </div>

          </b-tab-item>

          <!-- ── Tab 3: Layouts ──────────────────────────────── -->
          <b-tab-item label="Layouts" icon="view-dashboard">

            <p class="tx-section-divider">Formulário Horizontal (b-field horizontal)</p>
            <div class="tx-layout-demo">
              <p class="tx-layout-label">Ideal para formulários de configuração e edição compactos</p>
              <b-field horizontal label="Nome">
                <b-input v-model="layout.name" placeholder="Nome completo" expanded />
              </b-field>
              <b-field horizontal label="E-mail">
                <b-input v-model="layout.email" type="email" placeholder="email@exemplo.com" expanded />
              </b-field>
              <b-field horizontal label="Perfil">
                <b-select v-model="layout.role" expanded>
                  <option value="admin">Administrador</option>
                  <option value="user">Usuário</option>
                </b-select>
              </b-field>
              <b-field horizontal label="Ativo">
                <b-switch v-model="layout.active" type="is-success" />
              </b-field>
              <b-field horizontal>
                <div class="tx-form-actions" style="border:none; margin:0; padding:0;">
                  <b-button type="is-primary" icon-left="content-save">Salvar</b-button>
                  <b-button type="is-light">Cancelar</b-button>
                </div>
              </b-field>
            </div>

            <p class="tx-section-divider">Campos Agrupados (b-field grouped)</p>
            <div class="tx-layout-demo">
              <p class="tx-layout-label">Campos lado a lado com tamanhos proporcionais</p>
              <b-field grouped>
                <b-field label="Nome" expanded>
                  <b-input v-model="layout.firstName" placeholder="Nome" expanded />
                </b-field>
                <b-field label="Sobrenome" expanded>
                  <b-input v-model="layout.lastName" placeholder="Sobrenome" expanded />
                </b-field>
              </b-field>
              <b-field grouped>
                <b-field label="CEP" style="min-width: 160px;">
                  <b-input v-model="layout.cep" placeholder="00000-000" />
                </b-field>
                <b-field label="Cidade" expanded>
                  <b-input v-model="layout.city" placeholder="Cidade" expanded />
                </b-field>
                <b-field label="UF" style="max-width: 80px;">
                  <b-input v-model="layout.state" placeholder="SP" maxlength="2" />
                </b-field>
              </b-field>
            </div>

            <p class="tx-section-divider">Input com Botão Integrado (addons)</p>
            <div class="tx-layout-demo">
              <p class="tx-layout-label">Combina input e botão no mesmo campo</p>
              <b-field label="Buscar CEP" grouped>
                <b-field expanded>
                  <b-input v-model="layout.cepSearch" placeholder="00000-000" icon="map-search" expanded />
                </b-field>
                <div class="control">
                  <b-button type="is-info" icon-left="magnify" @click="ui.notify('Buscando CEP...', 'is-info')">
                    Buscar
                  </b-button>
                </div>
              </b-field>
              <b-field label="Cupom de desconto" grouped>
                <b-field expanded>
                  <b-input v-model="layout.coupon" placeholder="PROMO2026" icon="ticket-percent" expanded />
                </b-field>
                <div class="control">
                  <b-button type="is-success" icon-left="check">Aplicar</b-button>
                </div>
              </b-field>
            </div>

            <p class="tx-section-divider">Formulário por Etapas (b-steps)</p>
            <div class="tx-layout-demo">
              <b-steps v-model="activeStep" size="is-small" type="is-primary" :has-navigation="false">
                <b-step-item :step="1" label="Dados Pessoais">
                  <div class="tx-steps-content">
                    <div class="columns">
                      <div class="column is-6">
                        <b-field label="Nome">
                          <b-input v-model="wizard.name" placeholder="Nome completo" expanded />
                        </b-field>
                      </div>
                      <div class="column is-6">
                        <b-field label="E-mail">
                          <b-input v-model="wizard.email" type="email" placeholder="email@exemplo.com" expanded />
                        </b-field>
                      </div>
                    </div>
                  </div>
                </b-step-item>

                <b-step-item :step="2" label="Endereço" :clickable="activeStep >= 2">
                  <div class="tx-steps-content">
                    <div class="columns">
                      <div class="column is-8">
                        <b-field label="Endereço">
                          <b-input v-model="wizard.address" placeholder="Rua, número" expanded />
                        </b-field>
                      </div>
                      <div class="column is-4">
                        <b-field label="Cidade">
                          <b-input v-model="wizard.city" placeholder="Cidade" expanded />
                        </b-field>
                      </div>
                    </div>
                  </div>
                </b-step-item>

                <b-step-item :step="3" label="Confirmar" :clickable="activeStep >= 3">
                  <div class="tx-steps-content">
                    <div class="columns">
                      <div class="column">
                        <p style="font-size: 0.875rem; color: var(--tx-text-muted);">Confirme os dados antes de finalizar:</p>
                        <ul style="margin-top: 0.75rem; font-size: 0.875rem; line-height: 2;">
                          <li><strong>Nome:</strong> {{ wizard.name || '—' }}</li>
                          <li><strong>E-mail:</strong> {{ wizard.email || '—' }}</li>
                          <li><strong>Endereço:</strong> {{ wizard.address || '—' }}</li>
                          <li><strong>Cidade:</strong> {{ wizard.city || '—' }}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </b-step-item>
              </b-steps>

              <div class="tx-steps-nav">
                <b-button v-if="activeStep > 1" type="is-light" icon-left="arrow-left" @click="activeStep--">
                  Anterior
                </b-button>
                <b-button
                  v-if="activeStep < 3"
                  type="is-primary"
                  icon-right="arrow-right"
                  @click="activeStep++"
                >
                  Próximo
                </b-button>
                <b-button
                  v-else
                  type="is-success"
                  icon-left="check"
                  @click="ui.notifySuccess('Cadastro finalizado!')"
                >
                  Finalizar
                </b-button>
              </div>
            </div>

          </b-tab-item>
        </b-tabs>
      </CardComponent>
    </div>

    <!-- Sidebar -->
    <div class="column is-4">
      <CardComponent title="Dados do Formulário" icon="mdi-code-json">
        <pre class="tx-json-preview">{{ formPreview }}</pre>
      </CardComponent>

      <CardComponent title="Componentes Utilizados" icon="mdi-puzzle" style="margin-top: 1rem;">
        <div style="font-size: 0.82rem; color: var(--tx-text); line-height: 2;">
          <ul style="list-style: none; padding: 0;">
            <li v-for="comp in buefyComponents" :key="comp">
              <span class="mdi mdi-check-circle" style="color: var(--tx-success); margin-right: 0.4rem;" />
              {{ comp }}
            </li>
          </ul>
        </div>
      </CardComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue'
import { useUiStore } from '@/stores/ui'
import CardComponent from '@/components/ui/CardComponent.vue'

const ui = useUiStore()
onMounted(() => ui.setPageTitle('Formulários'))

const activeTab = ref(0)
const activeStep = ref(1)
const saving = ref(false)
const citySearch = ref('')

// ── Cadastro form ──────────────────────────────────────────────
const form = reactive({
  name: '',
  email: '',
  phone: '',
  birthdate: null as Date | null,
  city: '',
  bio: '',
  password: '',
  profile: '',
  workTime: null as Date | null,
  tags: [] as string[],
  active: true,
  notifications: true,
  rating: 4,
  gender: 'M',
  permissions: ['read'] as string[],
  file: null as File | null,
})

const errors = reactive({ name: '', email: '', password: '', profile: '' })

const cities = ['São Paulo', 'Rio de Janeiro', 'Curitiba', 'Belo Horizonte', 'Porto Alegre', 'Salvador', 'Fortaleza', 'Manaus', 'Recife', 'Brasília']
const tagSuggestions = ['Vue.js', 'TypeScript', 'Bulma', 'Buefy', 'Pinia', 'Vite', 'Node.js', 'Python', 'Docker', 'React', 'Angular']

const filteredCities = computed(() =>
  citySearch.value
    ? cities.filter((c) => c.toLowerCase().includes(citySearch.value.toLowerCase()))
    : cities
)

let filteredTagSuggestions = ref([...tagSuggestions])
function filterTags(text: string) {
  filteredTagSuggestions.value = tagSuggestions.filter((t) =>
    t.toLowerCase().includes(text.toLowerCase())
  )
}

function validate() {
  errors.name = form.name ? '' : 'Nome é obrigatório'
  errors.email = form.email ? '' : 'E-mail é obrigatório'
  errors.password = form.password
    ? form.password.length < 8 ? 'Mínimo 8 caracteres' : ''
    : 'Senha é obrigatória'
  errors.profile = form.profile ? '' : 'Selecione um perfil'
  return !Object.values(errors).some(Boolean)
}

async function handleSubmit() {
  if (!validate()) return
  saving.value = true
  await new Promise((r) => setTimeout(r, 800))
  saving.value = false
  ui.notifySuccess('Cadastro salvo com sucesso!')
}

function handleReset() {
  Object.assign(form, {
    name: '', email: '', phone: '', birthdate: null, city: '', bio: '',
    password: '', profile: '', workTime: null, tags: [], active: true,
    notifications: true, rating: 4, gender: 'M', permissions: ['read'], file: null,
  })
  citySearch.value = ''
  Object.assign(errors, { name: '', email: '', password: '', profile: '' })
}

// ── Demo / showcase ────────────────────────────────────────────
const demo = reactive({
  text: '', password: '', select: '', select2: '', multiSelect: [] as string[],
  check1: true, check2: true, check3: false,
  radio: 'a', radio2: 's',
  switch1: true, switch2: true, switch3: false, switch4: false, switch5: false, switch6: true, switch7: true,
  number1: 42, number2: 10, number3: 50, number4: 0,
  slider1: 60, slider2: 2500,
  rate1: 3, rate2: 4, rate3: 7,
  date: null as Date | null, time: null as Date | null, datetime: null as Date | null,
  autoText: '',
  tags: ['Vue.js', 'TypeScript'] as string[],
})

const demoCities = [...cities]
let filteredDemoCities = ref([...demoCities])
function filterDemoCities(text: string) {
  filteredDemoCities.value = demoCities.filter((c) =>
    c.toLowerCase().includes(text.toLowerCase())
  )
}

// ── Layouts ────────────────────────────────────────────────────
const layout = reactive({
  name: '', email: '', role: 'admin', active: true,
  firstName: '', lastName: '',
  cep: '', city: '', state: '',
  cepSearch: '', coupon: '',
})

const wizard = reactive({ name: '', email: '', address: '', city: '' })

// ── Sidebar ────────────────────────────────────────────────────
const formPreview = computed(() =>
  JSON.stringify({ ...form, file: form.file?.name ?? null }, null, 2)
)

const buefyComponents = [
  'b-input (text, email, password, number, textarea)',
  'b-select (simples e múltiplo)',
  'b-checkbox (com indeterminate)',
  'b-radio',
  'b-switch (todos os tipos)',
  'b-numberinput (compact, steps)',
  'b-slider (ticks, formatter)',
  'b-rate (estrelas)',
  'b-datepicker',
  'b-timepicker',
  'b-datetimepicker',
  'b-autocomplete',
  'b-taginput (allow-new)',
  'b-upload (drag & drop)',
  'b-tabs + b-tab-item',
  'b-steps + b-step-item',
  'b-field (horizontal, grouped)',
]
</script>
