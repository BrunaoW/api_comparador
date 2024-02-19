<template>
    <div class="container">
        <h2>Simulação de empréstimo</h2>
        <form>
            <div class="form-row pb-2">
                <div class="col form-group">
                    <label for="dinheiroForm" class="form-label">Valor do empréstimo:</label>
                    <input type="text" class="form-control" id="dinheiroForm" placeholder="R$ 0,00" data-type="currency">
                </div>
                <div class="col form-group">
                    <label for="instituicaoForm" class="form-label">Instituição:</label>
                    <select class="form-select form-control" id="instituicaoForm">
                        <!-- Opções preenchidas via API -->
                    </select>
                </div>
            </div>
            <div class="form-row pb-2">
                <div class="col form-group">
                    <label for="convenioForm" class="form-label">Convênio:</label>
                    <select class="form-select form-control" id="convenioForm">
                        <!-- Opções preenchidas via API -->
                    </select>
                </div>
                <div class="col form-group">
                    <label for="parcelasForm" class="form-label">Parcelas:</label>
                    <select class="form-select form-control" id="parcelasForm">
                        <!-- Opções preenchidas via API -->
                    </select>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Enviar</button>
        </form>
    </div>
</template>

<script>
export default {
    mounted() {
        console.log('Component mounted.')
    }
}
</script>
