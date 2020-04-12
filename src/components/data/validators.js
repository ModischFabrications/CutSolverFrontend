export default {
    methods: {
        validQuantity: function (quantity) {
            return (Number.isInteger(quantity) && quantity > 0);
        },
        validLength: function (length) {
            return (Number.isInteger(length) && length > 0);
        }
    }
}
