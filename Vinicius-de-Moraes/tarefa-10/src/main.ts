import { Subject, merge } from 'rxjs';
import { filter, scan, map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { gps$ } from './streams/gps.stream.js';
import { pedidos$ } from './streams/pedidos.stream.js';
import { alertas$ } from './streams/alertas.stream.js';
import { logComTimestamp } from './operadores/custom.operadores.js';

const destroy$ = new Subject<void>();
setTimeout(() => {
  console.log('--- Encerrando simulação (30s) ---');
  destroy$.next();
  destroy$.complete();
}, 30000);

// tarefa 2

const velocidadeSuspeita$ = gps$.pipe(
  filter(dados => dados.velocidade > 60)
);

const statusCount$ = pedidos$.pipe(
  filter(p => p.status !== 'erro'),
  scan((acumulador: any, pedido: any) => {
    acumulador[pedido.status] = (acumulador[pedido.status] || 0) + 1;
    return acumulador;
  }, {})
);

const alertasCriticos$ = alertas$.pipe(
  filter(alerta => alerta.severidade === 'alta' || alerta.severidade === 'media')
);

const gpsEnriquecido$ = gps$.pipe(
  map(dados => ({
    ...dados,
    regiao: dados.lat > 0 ? 'Norte' : 'Sul'
  }))
);

// tarefa 3

const painelEntregador$ = merge(gps$, pedidos$).pipe(
  scan((estadoGlobal: any, evento: any) => {
    const id = evento.entregadorId;
    if (!estadoGlobal[id]) estadoGlobal[id] = { entregadorId: id };

    if (evento.lat) {
      estadoGlobal[id].ultimaLocalizacao = { lat: evento.lat, lng: evento.lng, velocidade: evento.velocidade };
    } else if (evento.status) {
      estadoGlobal[id].ultimoStatus = evento.status;
    }
    estadoGlobal[id].ultimaAtualizacao = new Date();
    return estadoGlobal;
  }, {})
);

const emergencia$ = alertasCriticos$.pipe(
  filter(alerta => alerta.severidade === 'alta'),
  withLatestFrom(painelEntregador$),
  filter(([alerta, painel]) => {
    const infoEntregador = painel[alerta.entregadorId];
    return infoEntregador?.ultimaLocalizacao?.velocidade > 60; 
  }),
  map(([alerta]) => `EMERGÊNCIA! Entregador ${alerta.entregadorId} em alta velocidade com alerta crítico!`)
);

velocidadeSuspeita$.pipe(takeUntil(destroy$), logComTimestamp('Velocidade Suspeita')).subscribe();
statusCount$.pipe(takeUntil(destroy$), logComTimestamp('Contagem Status')).subscribe();
emergencia$.pipe(takeUntil(destroy$), logComTimestamp('ALERTA DE EMERGÊNCIA')).subscribe();