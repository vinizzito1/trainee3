import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { simularEntregadorId, simularCoordenada, simularVelocidade } from '../utils/simulador.js';

export const gps$ = interval(1000).pipe(
  map(() => ({
    entregadorId: simularEntregadorId(),
    lat: simularCoordenada(),
    lng: simularCoordenada(),
    velocidade: simularVelocidade(),
    timestamp: new Date()
  }))
);