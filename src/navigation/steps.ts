import type {RootStackParamList} from './types';

export type StepRoute = Exclude<keyof RootStackParamList, 'Home'>;

export type Section = 'O Problema' | 'Soluções' | 'Na Prática';

export type Step = {
  route: StepRoute;
  shortTitle: string;
  fullTitle: string;
  section: Section;
  evidence: string;
};

export const STEPS: Step[] = [
  {
    route: 'BlockingJS',
    shortTitle: 'Bloquear JS Thread',
    fullTitle: 'Passo 1 — O problema: JS thread bloqueia tudo',
    section: 'O Problema',
    evidence:
      'Grave: spinner girando + tick crescendo. Aperte "Travar JS". Spinner e tick param por ~2s. Quando destrava, tick pula vários números (callbacks atrasados).',
  },
  {
    route: 'Chunked',
    shortTitle: 'Chunks com setTimeout',
    fullTitle: 'Passo 2 — Solução 1: Quebrar trabalho em chunks',
    section: 'Soluções',
    evidence:
      'Grave: aperte "Rodar em chunks". Progresso vai de 0% a 100%, spinner segue girando, tick continua. Sem freeze visível.',
  },
  {
    route: 'Interaction',
    shortTitle: 'InteractionManager',
    fullTitle: 'Passo 3 — Solução 2: InteractionManager',
    section: 'Soluções',
    evidence:
      'Grave dois cenários: (1) "Rodar pesado após interações" — status muda em fases, tick congela durante o loop (prova que ainda é JS thread). (2) "Navegar e logar" — push acontece suave, console loga após a transição.',
  },
  {
    route: 'Worklet',
    shortTitle: 'Worklet (Reanimated)',
    fullTitle: 'Passo 4 — Solução 3: Reanimated Worklets (UI thread)',
    section: 'Soluções',
    evidence:
      'Grave: inicie animação (quadrado vai e volta). Aperte "Travar JS por ~3s". Animação continua suave durante o freeze. Esta é a evidência principal do artigo.',
  },
  {
    route: 'Gesture',
    shortTitle: 'Gesture (DraggableBox)',
    fullTitle: 'Passo 5 — Na prática: Gestos complexos',
    section: 'Na Prática',
    evidence:
      'Grave: arraste o quadrado (volta com spring ao soltar). Aperte "Travar JS". Durante os 3s, arraste de novo — gesto continua fluido, tick congela.',
  },
  {
    route: 'Parallax',
    shortTitle: 'Parallax Scroll',
    fullTitle: 'Passo 6 — Na prática: Scroll com parallax',
    section: 'Na Prática',
    evidence:
      'Grave: role a lista (header faz parallax + fade + scale). Aperte "Travar JS". Continue rolando — parallax segue suave, tick congela.',
  },
];

export const SECTIONS: Section[] = ['O Problema', 'Soluções', 'Na Prática'];

export function getStepIndex(route: StepRoute): number {
  return STEPS.findIndex(s => s.route === route);
}

export function getStep(route: StepRoute): Step {
  const step = STEPS.find(s => s.route === route);
  if (!step) {
    throw new Error(`Step não encontrado: ${route}`);
  }
  return step;
}

export function getNextStep(route: StepRoute): Step | null {
  const idx = getStepIndex(route);
  return STEPS[idx + 1] ?? null;
}
