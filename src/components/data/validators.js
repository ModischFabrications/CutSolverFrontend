import {Result} from "@/components/data/Result";

export default {
    methods: {
        validQuantity: function (quantity) {
            return (Number.isInteger(quantity) && quantity > 0);
        },
        validLength: function (length, max_length) {
            return (Number.isInteger(length) && length > 0 && length <= max_length);
        },
        validResult(obj) {
            // can't reference classes in template
            return (obj instanceof Result && obj.valid());
        }
    }
}
