<template>
    <div class="va-app-container">
        <fixed-thead /> 
        <unfixed-thead />
    </div>
</template>
<script>
import FixedThead from './components/FixedThead'
import UnfixedThead from './components/UnfixedThead'
export default {
    name: 'DynamicTable',
    components: {
        FixedThead,
        UnfixedThead,
    }
}
</script>