<template>
    <input 
        type="text"
        :class="inputClass"
        :id="inputId"
        @keyup="updateValue"
        v-model="currencyText"
        required
    >
</template>
  
<script>
export default {
    data() {
        return {
            currencyText: ''
        }
    },
    props: {
        inputClass: {
            type: String,
            default: ''
        },
        inputId: {
            type: String,
            default: ''
        }
    },
    methods: {
        updateValue(event) {
            let value = event.target.value
                .replace('.', '')
                .replace(',', '')
                .replace(/\D/g, '')

            if (value == '') {
                value = '0'
            }

            const options = { minimumFractionDigits: 2 }
            let result = new Intl.NumberFormat('pt-BR', options).format(
                parseFloat(value) / 100
            )

            console.log(result)
            this.$emit('currencyValue', result)
            this.$emit('isValid', result > 0.0)

            this.currencyText = 'R$ ' + result
        }
    }
};
</script>
