// frontend/src/styles/ColorPalette.jsx
export default function ColorPalette() {
  return (
    <div className="p-6 bg-background">
      <h1 className="text-2xl font-bold mb-6">Paleta de Colores - Circulapp</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-primary text-white p-4 rounded">Primary</div>
        <div className="bg-secondary text-white p-4 rounded">Secondary</div>
        <div className="bg-tertiary text-white p-4 rounded">Tertiary</div>
        <div className="bg-success text-white p-4 rounded">Success</div>
        <div className="bg-warning text-white p-4 rounded">Warning</div>
        <div className="bg-error text-white p-4 rounded">Error</div>
        <div className="bg-text-primary text-white p-4 rounded">Text Primary</div>
        <div className="bg-background-paper border p-4 rounded">Background Paper</div>
      </div>
    </div>
  );
}