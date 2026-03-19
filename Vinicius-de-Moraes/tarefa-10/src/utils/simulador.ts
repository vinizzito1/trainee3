export function simularEntregadorId(): string {
  const id = Math.floor(Math.random() * 3) + 1;
  return `ENT-00${id}`;
}

export function simularCoordenada(): number {
  return (Math.random() * 20) - 10;
}

export function simularVelocidade(): number {
  return Math.floor(Math.random() * 81);
}

export function simularStatusPedido(): 'coletado' | 'em_rota' | 'entregue' | 'falhou' {
  const statusPossiveis = ['coletado', 'em_rota', 'entregue', 'falhou'] as const;
  const index = Math.floor(Math.random() * statusPossiveis.length);
  return statusPossiveis[index]!;
}

export function simularTipoAlerta(): 'atraso' | 'veiculo_parado' | 'rota_desviada' {
  const tipos = ['atraso', 'veiculo_parado', 'rota_desviada'] as const;
  const index = Math.floor(Math.random() * tipos.length);
  return tipos[index]!;
}

export function simularSeveridade(): 'baixa' | 'media' | 'alta' {
  const severidades = ['baixa', 'media', 'alta'] as const;
  const index = Math.floor(Math.random() * severidades.length);
  return severidades[index]!;
}