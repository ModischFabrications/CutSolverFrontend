import {Result} from "@/components/data/Result";

export default {
    methods: {
        validQuantity: function (quantity) {
            return (Number.isInteger(quantity) && quantity > 0);
        },
        validLength: function (length) {
            return (Number.isInteger(length) && length > 0);
        },
        validResult(obj) {
            // can't reference classes in template
            return (obj instanceof Result && obj.valid());
        }
    }
}
