import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatRSD(amount: number): string {
  return new Intl.NumberFormat('sr-RS').format(Math.round(amount)) + ' RSD';
}

export function formatRange(min: number, max: number): string {
  return `${formatRSD(min)} – ${formatRSD(max)}`;
}
