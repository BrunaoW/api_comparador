<template>
    <div class="container">
        <h2>Simulação de empréstimo</h2>
        <form method="post">
            <div class="form-row pb-2">
                <div class="col form-group">
                    <label for="dinheiroForm" class="form-label">Valor do empréstimo:</label>
                    <currency-input 
                        input-class="form-control" 
                        input-id="dinheiroForm"
                        :currencyValue="currencyValue"
                        :isValid="isFormValid"
                    ></currency-input>
                </div>
                <div class="col form-group">
                    <label for="instituicaoForm" class="form-label">Banco:</label>
                    <select 
                        class="form-select form-control" 
                        id="instituicaoForm"
                        v-model="dummySelectedInstitution"
                        @change="selectInstitution"
                        >
                        <option value="" disabled selected>Escolha uma instituição</option>
                        <option 
                            v-for="institution in institutionList" 
                            :value="institution.chave"
                            :key="institution.chave">{{ institution.valor }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="form-row pb-2">
                <div class="col form-group">
                    <label for="convenioForm" class="form-label">Convênio:</label>
                    <select 
                        class="form-select form-control" 
                        id="convenioForm"
                        v-model="dummySelectedInsurance"
                        @change="selectInsurances"
                        >
                        <option value="" disabled selected>Escolha um convênio</option>
                        <option 
                            v-for="insurance in insuranceList" 
                            :value="insurance.chave"
                            :key="insurance.chave">{{ insurance.valor }}
                        </option>
                    </select>
                </div>
                <div class="col form-group">
                    <label for="parcelasForm" class="form-label">Parcelas:</label>
                    <select 
                        class="form-select form-control" 
                        id="parcelasForm"
                        :value="installments"
                        >
                        <option value="" disabled selected>Escolha a quantidade de parcelas</option>
                        <option 
                            v-for="installments in installmentsList" 
                            :value="installments.chave"
                            :key="installments.chave">{{ installments }}
                        </option>
                    </select>
                </div>
            </div>
            <button 
                type="button" 
                class="btn btn-primary"
                v-on:click="getSimulationInfo"
                >Enviar</button>
        </form>
    </div>
</template>

<script>
import CurrencyInput from './CurrencyInput.vue'

export default {
    components: {
        CurrencyInput
    },
    data() {
        return {
            isFormValid: false,
            dinheiroEmprestimo: '',
            institutionList: [],
            insuranceList: [],
            installmentsList: [36, 48, 60, 72, 84],
            dummySelectedInstitution: '',
            dummySelectedInsurance: '',
            // valores forms:
            currencyValue: 0.0,
            selectedInstitutions: [],
            selectedInsurances: [],
            installments: null
        };
    },
    mounted() {
        this.getInstitutionList()
        this.getInsuranceList()
    },
    methods: {
        getInstitutionList() {
            axios.get('http://localhost:8000/api/instituicao')
                .then((res) => {
                    if(res.data.error){
                        this.errorMsg = res.data.message;
                    }
                    else{
                        console.log(res.data);
                        this.institutionList = res.data;
                    }
            })
        },
        getInsuranceList() {
            axios.get('http://localhost:8000/api/convenio')
                .then((res) => {
                    if(res.data.error){
                        this.errorMsg = res.data.message
                    }
                    else{
                        console.log(res.data)
                        this.insuranceList = res.data
                    }
            })
        },
        selectInstitution(event) {
            let institution = event.target.value
            let institutionIndex = this.selectedInstitutions.indexOf(institution)
            if (institutionIndex > -1) {
                this.selectedInstitutions.splice(institutionIndex, 1)
            } else {
                this.selectedInstitutions.push(institution)
            }
            this.dummySelectedInstitution = ''
            console.log(this.selectedInstitutions)
        },
        selectInsurances(event) {
            let insurance = event.target.value
            let insuranceIndex = this.selectedInsurances.indexOf(insurance)
            if (insuranceIndex > -1) {
                this.selectedInsurances.splice(insuranceIndex, 1)
            } else {
                this.selectedInsurances.push(insurance)
            }
            this.dummySelectedInsurance = ''
            console.log(this.selectedInsurances)
        },
        getSimulationInfo() {
            let simulateReqBody = {
                "valor_emprestimo": this.currencyValue,
                "instituicoes": this.selectedInstitutions,
                "convenios": this.selectedInsurances,
                "parcela": this.installments
            }

            console.log(simulateReqBody)

            axios.post("http://localhost:8000/api/simular", simulateReqBody)
                .then((res) => {
                    if(res.data.error){
                        this.errorMsg = res.data.message
                    }
                    else{
                        console.log(res.data)
                    }
            })
        }
    }
}
</script>
