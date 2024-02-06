import { APP_INITIALIZER } from '@angular/core';

import { TranslateLangService } from '../services/translate-lang.service';
export function TranslateLangServiceFactory(translateLangService: TranslateLangService) {
  return () => translateLangService.load();
}

export const InitializerProviders = [
  
];
