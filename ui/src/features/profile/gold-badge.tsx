/** The official OrganizeOn mark follows the viewer's theme; gold identifies the award. */
export function GoldBadge() {
  return <span role="img" aria-label="Emblema dourado OrganizeOn" title="Emblema dourado OrganizeOn" className="inline-flex size-9 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10">
    <img src="https://organizeon.com.br/d3/assets/organizeon_icon_black_128.png" alt="" className="size-5 dark:hidden" />
    <img src="https://organizeon.com.br/d3/assets/organizeon-icon.png" alt="" className="hidden size-5 dark:block" />
  </span>;
}
