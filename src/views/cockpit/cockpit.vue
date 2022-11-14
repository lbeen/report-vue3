<template>
    <layout1 title="保山隆基拉晶产线驾驶舱" :interval="10000">
        <template #headRight>
            <el-button icon="el-icon-s-operation" type="primary" round
                       style="background-color: #040f3c;margin-right: 20px;" size="small" @click="goto">腾冲
            </el-button>
        </template>
        <layout1-column width="28">
<!--            <layout1-container title="B面寿命>150占比（%）" height="35">-->
<!--                <lifetimeGt150 :factory="factory"/>-->
<!--            </layout1-container>-->
<!--            <layout1-container title="断线率（%）" height="35">-->
<!--                <break-line :factory="factory"/>-->
<!--            </layout1-container>-->
<!--            <layout1-container title="能管单耗" height="30">-->
<!--                <unit-consumption/>-->
<!--            </layout1-container>-->
        </layout1-column>
<!--        <layout1-column width="44">-->
<!--            <layout1-container height="25">-->
<!--                <feeding-and-finish :factory="factory"/>-->
<!--            </layout1-container>-->
<!--            <layout1-container title="方棒单产（kg/h）" height="40">-->
<!--                <square-single-yield :factory="factory"/>-->
<!--            </layout1-container>-->
<!--            <layout1-container height="35" split>-->
<!--                <layout1-container-li title="单晶产能（t）">-->
<!--                    <single-yield :factory="factory"/>-->
<!--                </layout1-container-li>-->
<!--                <layout1-container-li title="机加产能（t）">-->
<!--                    <machine-yield :factory="factory"/>-->
<!--                </layout1-container-li>-->
<!--            </layout1-container>-->
<!--        </layout1-column>-->
<!--        <layout1-column width="28">-->
<!--            <layout1-container title="机加物料在线周转天数" height="35">-->
<!--                <turnover-days :factory="factory"/>-->
<!--            </layout1-container>-->
<!--            <layout1-container title="机加48小时在线（t）" height="35">-->
<!--                <machine-online48 :factory="factory"/>-->
<!--            </layout1-container>-->
<!--            <layout1-container title="单晶超8小时在线（t）" height="30">-->
<!--                <single-online8 :factory="factory"/>-->
<!--            </layout1-container>-->
<!--        </layout1-column>-->
    </layout1>
</template>

<script >
import layout1 from '@/components/layout/layout1/layout1'
import layout1Column from '@/components/layout/layout1/layout1-column'
// import layout1ContainerLi from '@/compoponents/layout/layout1/layout1-column'
// import layout1Container from '@/compoponents/layout/layout1/layout1-container-li'

// import lifetimeGt150 from '@/components/cockpit/lifetime-gt150'
// import breakLine from '@/components/cockpit/break-line'
// import unitConsumption from '@/components/cockpit/unit-consumption'
// import feedingAndFinish from '@/components/cockpit/feeding-and-finish'
// import squareSingleYield from '@/components/cockpit/square-single-yield'
// import singleYield from '@/components/cockpit/single-yield'
// import machineYield from '@/components/cockpit/machine-yield'
//
// import turnoverDays from '@/components/cockpit/turnover-days'
// import machineOnline48 from '@/components/cockpit/machine-online48'
// import singleOnline8 from '@/components/cockpit/single-online8'

export default {
    components: {
        layout1,
        layout1Column,
        // layout1Container,
        // layout1ContainerLi,

        // lifetimeGt150,
        // breakLine,
        // unitConsumption,
        // feedingAndFinish,
        // squareSingleYield,
        // singleYield,
        // machineYield,
        // turnoverDays,
        // machineOnline48,
        // singleOnline8
    },
    data() {
        return {
            version: '',
            factory: 'BS'
        }
    },
    methods: {
        goto() {
            this.$router.replace('/cockpit-tc')
        }
    }
}
</script>
