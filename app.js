// Inicializa o mapa
const map = L.map('map').setView([-14.235, -51.9253], 4); // Coordenadas aproximadas do Brasil

// Adiciona o mapa base (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
}).addTo(map);

// Variáveis para totalizar vendas
let totalSales = 0;
let maxSale = 0;
let minSale = Number.MAX_SAFE_INTEGER;
let stateSales = {}; // Objeto para contar vendas por estado

// Dados para simulação
const states = [
  { name: 'São Paulo', lat: -23.5505, lng: -46.6333 },
  { name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729 },
  { name: 'Bahia', lat: -12.9714, lng: -38.5014 },
  { name: 'Minas Gerais', lat: -19.8157, lng: -43.9542 },
  { name: 'Paraná', lat: -25.4284, lng: -49.2733 },
  { name: 'Pernambuco', lat: -8.0476, lng: -34.8770 },
  { name: 'Ceará', lat: -3.7172, lng: -38.5433 },
  { name: 'Amazonas', lat: -3.1190, lng: -60.0217 },
  { name: 'Rio Grande do Sul', lat: -30.0346, lng: -51.2177 },
  { name: 'Distrito Federal', lat: -15.7942, lng: -47.8822 },
];

// Função para adicionar uma venda no mapa
function addSale(state, lat, lng, amount) {
  // Atualiza o total de vendas
  totalSales += amount;

  // Atualiza venda máxima
  if (amount > maxSale) {
    maxSale = amount;
  }

  // Atualiza venda mínima
  if (amount < minSale) {
    minSale = amount;
  }

  // Atualiza os cards
  document.getElementById('max-sale').innerText = maxSale.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  document.getElementById('min-sale').innerText = minSale.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  // Atualiza vendas por estado
  stateSales[state] = (stateSales[state] || 0) + 1;
  const stateSalesText = Object.entries(stateSales)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ');
  document.getElementById('state-sales').innerText = stateSalesText;

  // Adiciona um marcador animado no mapa
  const marker = L.circleMarker([lat, lng], {
    color: 'red',
    radius: 10,
    fillColor: 'red',
    fillOpacity: 0.5,
  }).addTo(map);

  // Tooltip com detalhes da venda
  marker.bindTooltip(
    `<strong>Estado:</strong> ${state}<br>
     <strong>Valor:</strong> ${amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
    { permanent: false, direction: 'top' }
  );

  // Remove o marcador após 5 segundos
  setTimeout(() => map.removeLayer(marker), 5000);
}

// Função para gerar vendas aleatórias
function simulateSales() {
  const randomState = states[Math.floor(Math.random() * states.length)];
  const randomAmount = Math.floor(Math.random() * 5000000) + 10000; // Valor entre R$10.000 e R$5.000.000
  addSale(randomState.name, randomState.lat, randomState.lng, randomAmount);

  // Reexecuta a cada 2 segundos
  setTimeout(simulateSales, 2000);
}

// Inicia a simulação
simulateSales();
