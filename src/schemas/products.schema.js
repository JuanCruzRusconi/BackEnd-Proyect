import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsSchema = new mongoose.Schema({

	title: {
		type: String,
		require: true
	},
	description: {
		type: String,
		require: true
	},
	price: {
		type: Number,
		require: true
	},
	thumbnail: {
		type: String,
		require: true
	},
	code: {
		type: String,
		require: true
	},
	stock: {
		type: Number,
		require: true
	},
	status: {
		type: Boolean,
		require: true
	},
	category: {
		type: String,
		require: true
	}
});

productsSchema.plugin(mongoosePaginate);

const productsModel = mongoose.model("products", productsSchema);

export default productsModel;