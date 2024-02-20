<template>
    <div class="container py-5">
        <h2>Simulação de empréstimo</h2>
        <form method="post" class="pb-3">
            <div class="form-row pb-2">
                <div class="col form-group">
                    <label for="dinheiroForm" class="form-label">Valor do empréstimo:</label>
                    <currency-input input-class="form-control" input-id="dinheiroForm"
                        v-on:currencyValue="currencyValue = $event" v-on:isValid="isFormValid = $event"></currency-input>
                </div>
                <div class="col form-group">
                    <label for="instituicaoForm" class="form-label">Banco:</label>
                    <select class="form-select form-control" id="instituicaoForm" v-model="dummySelectedInstitution"
                        @change="selectInstitution">
                        <option value="" disabled selected>Escolha uma instituição</option>
                        <option v-for="institution in institutionList" :value="institution.chave" :key="institution.chave">
                            {{ institution.valor }}
                        </option>
                    </select>
                    <small v-if="selectedInstitutions.length > 0">
                        {{ selectedInstitutions.reduce((acc, inst) => `${acc}, ${inst}`) }}
                    </small>
                </div>
            </div>
            <div class="form-row pb-2">
                <div class="col form-group">
                    <label for="convenioForm" class="form-label">Convênio:</label>
                    <select class="form-select form-control" id="convenioForm" v-model="dummySelectedInsurance"
                        @change="selectInsurances">
                        <option value="" disabled selected>Escolha um convênio</option>
                        <option v-for="insurance in insuranceList" :value="insurance.chave" :key="insurance.chave">{{
                            insurance.valor }}
                        </option>
                    </select>
                    <small v-if="selectedInsurances.length > 0">
                        {{ selectedInsurances.reduce((acc, insu) => `${acc}, ${insu}`) }}
                    </small>
                </div>
                <div class="col form-group">
                    <label for="parcelasForm" class="form-label">Parcelas:</label>
                    <select class="form-select form-control" id="parcelasForm" v-model="installmentsSelected">
                        <option value="" disabled selected>Escolha a quantidade de parcelas</option>
                        <option v-for="installments in installmentsList" :value="installments" :key="installments">{{
                            installments }}
                        </option>
                    </select>
                </div>
            </div>
            <button type="button" class="btn btn-primary" v-on:click="getSimulationInfo">Enviar</button>
        </form>

        <div 
            class="institution-info" 
            v-for="simulation in loanSimulationInfo.loanInfoPerInstitution"
        >
            <h4>{{ Object.keys(simulation)[0] }}</h4>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Valor solicitado</th>
                        <th scope="col">Parcelas</th>
                        <th scope="col">Valor por parcela</th>
                        <th scope="col">Total (valor x parcela)</th>
                        <th scope="col">Taxa de juros ao mês</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="loanPlan in Object.values(simulation)[0]">
                        <td>R$ {{ loanSimulationInfo.loanMoney }}</td>
                        <td><b>{{ loanPlan["parcelas"] }}</b></td>
                        <td><b>R$ {{ loanPlan["valor_parcela"].toFixed(2) }}</b></td>
                        <td><b>R$ {{ (loanPlan["valor_parcela"] * loanPlan["parcelas"]).toFixed(2) }}</b></td>
                        <td>{{ loanPlan["taxa"] }}%</td>
                    </tr>
                </tbody>
            </table>
        </div>
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
            institutionList: [],
            insuranceList: [],
            installmentsList: [36, 48, 60, 72, 84],
            dummySelectedInstitution: '',
            dummySelectedInsurance: '',
            // valores forms:
            currencyValue: 0.0,
            selectedInstitutions: [],
            selectedInsurances: [],
            installmentsSelected: null,
            // Resultado Simulacao
            loanSimulationInfo: {}
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
                    if (res.data.error) {
                        this.errorMsg = res.data.message;
                    }
                    else {
                        this.institutionList = res.data;
                    }
                })
        },
        getInsuranceList() {
            axios.get('http://localhost:8000/api/convenio')
                .then((res) => {
                    if (res.data.error) {
                        this.errorMsg = res.data.message
                    }
                    else {
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
        },
        getSimulationInfo() {
            let loanedMoney = parseFloat(this.currencyValue.replace('.', '').replace(',', '.'))
            let simulateReqBody = {
                "valor_emprestimo": loanedMoney,
                "instituicoes": this.selectedInstitutions,
                "convenios": this.selectedInsurances,
                "parcela": this.installmentsSelected
            }

            axios.post("http://localhost:8000/api/simular", simulateReqBody)
                .then((res) => {
                    if (res.data.error) {
                        this.errorMsg = res.data.message
                    }
                    else {
                        let institutionKeys = Object.keys(res.data)
                        this.loanSimulationInfo = {
                            loanMoney: loanedMoney,
                            loanInfoPerInstitution: [
                                ...institutionKeys.map(ik => 
                                    ({ [ik]: res.data[ik] })
                                )
                            ]
                    }
                    }
                })
        }
    }
}
</script>
