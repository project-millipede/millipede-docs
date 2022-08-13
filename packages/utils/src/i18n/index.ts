/**
 *
 * Why are those adjustments necessary?
 * Supporting page exit animations require that a component's resolved translations
 * of the previous page stay intact even when NextJs loads the next page.
 *
 * [Page A (namespaces loaded - rendered, everything is fine) -> got to page B
 * [Page A exit animation starts] ->
 * [Page B (namespaces of Page B loaded, namespaces of Page A get lost] -> translations of Page A get lost
 * [Page A exit animation finished]
 *
 * The requirement to put other files originating from next-translate here is because
 * of the necessity to access the refactored translation context.
 *
 * New files
 * - use-previous-namespace
 * The hook makes sure that the namespaces of the previous page survive the
 * loading of namespaces for the current page.
 *
 * Modified files
 * - I18nProvider -rewrite/simplification
 *
 * Unmodified files
 * - use-translation
 * - wrapTWithDefaultNs
 *
 * Note:
 * This approach does not affect the general loading of namespaces in getStaticProps.
 */

export { I18nProvider } from './I18nProvider';
export { useTranslation } from './use-translation';
