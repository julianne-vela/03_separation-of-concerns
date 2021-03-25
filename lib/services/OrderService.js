const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
	static async create({ quantity }) {
		await sendSms(
			process.env.ORDER_HANDLER_NUMBER,
			`New Order received for ${quantity}`
		);

		const order = await Order.insert({ quantity });

		return order;
	}

	static async getAll() {
		const orders = await Order.selectAll();
		return orders;
	}

	static async getById(id) {
		const order = await Order.selectById(id);
		return order;
	}

	static async updateOrder(id, { quantity }) {
		const order = await Order.updateOrder({ id, quantity });

		await sendSms(
			process.env.ORDER_HANDLER_NUMBER,
			`Customer Updated Order for ${quantity}`
		);

		return order;
	}

	static async deleteOrder(id, { quantity }) {
		const order = await Order.deleteOrder({ id });

		await sendSms(
			process.env.ORDER_HANDLER_NUMBER,
			`Customer Deleted Order for ${quantity}`
		);

		return order;
	}
};
