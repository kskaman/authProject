/**
 * A full‑width horizontal divider using background color.
 * Uses CSS variable --divider for its color.
 */
const Divider = () => (
  <hr
    role="separator"
    className="
      w-full 
      h-[1px] 
      border-none 
      bg-(--divider)
    "
  />
);

export default Divider;
