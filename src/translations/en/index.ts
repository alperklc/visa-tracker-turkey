
import { general } from './general';
import { hero } from './hero';
import { dashboard } from './dashboard';
import { table } from './table';
import { review } from './review';
import { form } from './form';
import { pagination } from './pagination';
import { purposes } from './purposes';
import { countries } from './countries';
import { footer } from './footer';
import { language } from './language';
import { cookies } from './cookies';
import { actions } from './actions';
import { discussion } from './discussion';
import { facts } from './facts';

// Combine all modules into a single object
export const en = {
  ...general,
  hero: hero,
  dashboard: dashboard,
  table: table,
  review: review,
  form: form,
  pagination: pagination,
  purposes: purposes,
  countries: countries,
  footer: footer,
  language: language,
  cookies: cookies,
  actions: actions,
  discussion: discussion,
  facts: facts
};
