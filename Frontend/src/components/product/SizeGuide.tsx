import { Modal } from '../common/Modal';

const rows = [
  ['XS', '32', '26', '36', '52'],
  ['S', '34', '28', '38', '53'],
  ['M', '36', '30', '40', '54'],
  ['L', '38', '32', '42', '55'],
  ['XL', '40', '34', '44', '56'],
  ['XXL', '42', '36', '46', '57'],
];

export function SizeGuide({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title="Size Guide">
      <p className="mb-6 text-sm leading-7 text-muted">
        Measurements are body measurements in inches. Final garment ease varies by silhouette.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <thead>
            <tr className="bg-sand text-left">
              {['Size', 'Bust', 'Waist', 'Hip', 'Length'].map((heading) => (
                <th key={heading} className="border border-line p-3 font-semibold">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell) => (
                  <td key={cell} className="border border-line p-3">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
}
