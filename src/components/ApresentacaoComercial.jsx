const PDF_URL = '/apresentacao-comercial/apresentacao-comercial.pdf';

export default function ApresentacaoComercial() {
  return (
    <iframe
      title="Apresentação Comercial BWN Mídia"
      src={PDF_URL}
      className="w-full h-[100dvh] border-0 bg-zinc-900"
    />
  );
}
