import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export function logComTimestamp<T>(label: string = 'LOG') {
  return (source: Observable<T>) =>
    source.pipe(
      tap((valor) => {
        const hora = new Date().toISOString().split('T')[1]!.slice(0, -1);
        console.log(`[${label}] ${hora}`, valor);
      })
    );
}