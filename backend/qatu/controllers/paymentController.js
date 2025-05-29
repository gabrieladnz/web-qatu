import Order from '../models/orderModel.js';

/**
 * Simula o pagamento de um pedido.
 * Recebe: { orderId, cardNumber, cvv, cpf, cep }
 * Retorna: sucesso após 2 segundos e atualiza status do pedido para "confirmed"
 */
export const pagamentoSimulado = async (req, res) => {
  const { orderId, cardNumber, cvv, cpf, cep } = req.body;

  if (!/^\d{16}$/.test(cardNumber)) {
    return res.status(400).json({ success: false, message: 'O cartão deve ter exatamente 16 dígitos numéricos.' });
  }
  if (!/^\d{3}$/.test(cvv)) {
    return res.status(400).json({ success: false, message: 'O CVV deve ter exatamente 3 dígitos numéricos.' });
  }
  if (!/^\d{11}$/.test(cpf)) {
    return res.status(400).json({ success: false, message: 'O CPF deve ter exatamente 11 dígitos numéricos.' });
  }
  if (!/^\d{8}$/.test(cep)) {
    return res.status(400).json({ success: false, message: 'O CEP deve ter exatamente 8 dígitos numéricos.' });
  }

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Pedido não encontrado.' });
    }
    if (order.status !== 'pending') {
      return res.status(400).json({ success: false, message: 'Pedido já pago ou processado.' });
    }

    setTimeout(async () => {
      order.status = 'confirmed';
      await order.save();
      res.status(200).json({ success: true, message: 'Pagamento aprovado (simulado).', order });
    }, 2000);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro ao processar pagamento.', error: err.message });
  }
};