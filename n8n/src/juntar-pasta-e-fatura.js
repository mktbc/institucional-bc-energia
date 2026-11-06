// ============================================================
// Juntar pasta e fatura — Code node (n8n), "Run Once for All Items"
// Substitui o "Merge1" do workflow da PageConv: recebe a pasta criada no
// Drive e devolve, num único item, o id da pasta e os dados da fatura que o
// nó "Base64 → Arquivo" (o mesmo da PageConv) converte em binário.
// ============================================================

const pasta = $input.first().json;
const body = $('Validar payload').first().json.body;

if (!pasta || !pasta.id) throw new Error('pasta_drive_sem_id');

return [{
  json: {
    pasta_id: pasta.id,
    fatura_base64: body.fatura_base64,
    fatura_nome: body.fatura_nome,
    fatura_tipo: body.fatura_tipo,
  },
}];
