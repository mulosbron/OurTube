import Arweave from 'arweave';

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https'
});

// Yardımcı fonksiyon - dosyayı ArrayBuffer olarak okur
function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Dosya okunamadı'));
    reader.readAsArrayBuffer(file);
  });
}

export const uploadFile = async (file, tags, wallet, progressCallback) => {
  try {
    // Dosyayı ArrayBuffer olarak oku
    const buffer = await readFileAsArrayBuffer(file);
    
    // Transaction oluştur - wallet parametresi olmadan
    const transaction = await arweave.createTransaction({
      data: buffer
    });

    // Tag'leri ekle
    if (tags && typeof tags === 'object') {
      Object.entries(tags).forEach(([name, value]) => {
        if (name && value !== undefined) {
          transaction.addTag(name, value.toString());
        }
      });
    }

    // İmzalama - wallet'ı burada kullan
    await arweave.transactions.sign(transaction, wallet);
    
    // Yükleme ve ilerleme takibi
    const uploader = await arweave.transactions.getUploader(transaction);
    
    while (!uploader.isComplete) {
      await uploader.uploadChunk();
      if (typeof progressCallback === 'function') {
        progressCallback({
          loaded: uploader.pctComplete * 100,
          total: 100
        });
      }
    }

    return transaction.id;

  } catch (error) {
    console.error('Upload error:', error);
    throw new Error(`Yükleme başarısız: ${error.message}`);
  }
};