const PLACEHOLDER_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='900' height='600'><rect fill='%23f3f4f6' width='100%' height='100%'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='24'>Imagem indisponível</text></svg>`;

export const PLACEHOLDER_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(PLACEHOLDER_SVG)}`;

export default PLACEHOLDER_DATA_URI;
