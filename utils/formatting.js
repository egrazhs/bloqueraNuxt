export const dar_formato_a_fecha = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('es-MX', options);
};

export const formatCurrency = (amount) => {
  return amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
};
