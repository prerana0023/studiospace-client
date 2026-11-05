module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      { studiolight: { primary: '#f59e0b', 'primary-content': '#1a1206', secondary: '#7c3aed', accent: '#06b6d4', neutral: '#1f2937', 'base-100': '#ffffff', 'base-200': '#f5f5f4', 'base-300': '#e7e5e4', 'base-content': '#1c1917' } },
      { studiodark: { primary: '#fbbf24', 'primary-content': '#1a1206', secondary: '#a78bfa', accent: '#22d3ee', neutral: '#0b0f19', 'base-100': '#12151f', 'base-200': '#0d1017', 'base-300': '#1e2331', 'base-content': '#e5e7eb' } },
    ],
  },
};
