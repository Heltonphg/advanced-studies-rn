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
      'Grave os dois spinners + tick. Aperte "Travar JS". O spinner JS-driven e o tick congelam por ~2s; o ActivityIndicator nativo continua girando (animado pela UI thread). Quando destrava, tick pula vários números (callbacks atrasados).',
  },
  {
    route: 'Chunked',
    shortTitle: 'Chunks com setTimeout',
    fullTitle: 'Passo 2 — Solução: Quebrar trabalho em chunks',
    section: 'Soluções',
    evidence:
      'Grave os dois spinners + tick + progresso. Aperte "Rodar em chunks". Progresso vai de 0% a 100%, ambos os spinners seguem girando, tick continua. Compare com o Passo 1: o JS-driven aqui NÃO trava, porque entre cada chunk a JS thread "respira".',
  },
  {
    route: 'Worklet',
    shortTitle: 'Worklet (Reanimated)',
    fullTitle: 'Passo 3 — Solução: Reanimated Worklets (UI thread)',
    section: 'Soluções',
    evidence:
      'Grave: inicie animação (quadrado vai e volta). Aperte "Travar JS por ~3s". Animação continua suave durante o freeze. Esta é a evidência principal do artigo.',
  },
  {
    route: 'Gesture',
    shortTitle: 'Gesture (DraggableBox)',
    fullTitle: 'Passo 4 — Na prática: Gestos complexos',
    section: 'Na Prática',
    evidence:
      'Grave os dois quadrados. Arraste o azul (worklet) e o vermelho (PanResponder). Aperte "Travar JS por ~3s". Durante o freeze: o azul continua respondendo ao toque; o vermelho congela e ignora o arrasto, junto com o tick. Quando destrava, o vermelho pula pra última posição do dedo.',
  },
  {
    route: 'Parallax',
    shortTitle: 'Parallax Scroll',
    fullTitle: 'Passo 5 — Na prática: Scroll com parallax',
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
