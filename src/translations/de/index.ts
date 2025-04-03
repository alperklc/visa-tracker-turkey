
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
export const de = {
  ...general,
  hero,
  dashboard,
  table,
  review,
  form,
  pagination,
  purposes,
  countries,
  footer,
  language,
  cookies,
  actions,
  discussion,
  facts
};
