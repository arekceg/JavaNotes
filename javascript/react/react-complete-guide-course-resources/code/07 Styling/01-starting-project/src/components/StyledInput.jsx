export function StyledInput({ label, valid, ...props }) {
  const color = valid ? "text-green-900" : "text-red-900";
  const labelClass =
    "block mb-2 text-xs font-bold tracking-wide uppercase " + color;
  const inputClass = "w-full rounded border px-3 py-2 leading-tight shadow " + (valid ? "bg-stone-300" : "bg-red-100 border-red-500 text-red-900");
  return (
    <p>
      <label className={labelClass}>{label}</label>
      <input
        className={inputClass}
        {...props}
      />
    </p>
  );
}
