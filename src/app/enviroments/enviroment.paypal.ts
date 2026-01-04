export const paypalConfig = {
  sandbox: {
    clientId: 'AeX_Gvjkz4trDea4LdjR4fu4YQtC1Wzu44Zxwp-VXotzykLhPBy79e-RmnqNIcp9F1ifwMLo-kkm3zf5', 
    currency: 'MXN',
    intent: 'capture'
  },
  production: {
    clientId: 'TU_CLIENT_ID_DE_PRODUCCION_AQUI',
    currency: 'MXN',
    intent: 'capture'
  }
};

export const currentPayPalConfig = paypalConfig.sandbox;