<template>
    <layout1 title="保山隆基拉晶产线驾驶舱" :interval="10000">
        <template #headRight>
            <el-button icon="el-icon-s-operation" type="primary" round
                       style="background-color: #040f3c;margin-right: 20px;" size="small">腾冲
            </el-button>
        </template>
        <layout1-column width="28">
            <layout1-container title="B面寿命>150占比（%）" height="35">
                <lifetimeGt150 :factory="factory"/>
            </layout1-container>
            <layout1-container title="断线率（%）" height="35">
                                <break-line :factory="factory"/>
            </layout1-container>
            <layout1-container title="能管单耗" height="30">
                <!--                <unit-consumption/>-->
            </layout1-container>
        </layout1-column>
        <layout1-column width="44">
            <layout1-container height="25">
                <!--                <feeding-and-finish :factory="factory"/>-->
            </layout1-container>
            <layout1-container title="方棒单产（kg/h）" height="40">
                <!--                <square-single-yield :factory="factory"/>-->
            </layout1-container>
            <layout1-container height="35" split>
                <layout1-container-li title="单晶产能（t）">
                    <!--                    <single-yield :factory="factory"/>-->
                </layout1-container-li>
                <layout1-container-li title="机加产能（t）">
                    <!--                    <machine-yield :factory="factory"/>-->
                </layout1-container-li>
            </layout1-container>
        </layout1-column>
        <layout1-column width="28">
            <layout1-container title="机加物料在线周转天数" height="35">
                <!--                <turnover-days :factory="factory"/>-->
            </layout1-container>
            <layout1-container title="机加48小时在线（t）" height="35">
                <!--                <machine-online48 :factory="factory"/>-->
            </layout1-container>
            <layout1-container title="单晶超8小时在线（t）" height="30">
                <!--                <single-online8 :factory="factory"/>-->
            </layout1-container>
        </layout1-column>
    </layout1>
</template>

<script setup>
import Layout1 from '@/components/layout/layout1/layout1'
import Layout1Column from '@/components/layout/layout1/layout1-column'
import Layout1Container from '@/components/layout/layout1/layout1-container'
import Layout1ContainerLi from '@/components/layout/layout1/layout1-container-li'

import LifetimeGt150 from '@/components/cockpit/crystal/lifetime-gt150'
import BreakLine from '@/components/cockpit/crystal/break-line'
// import unitConsumption from '@/components/cockpit/unit-consumption'
// import feedingAndFinish from '@/components/cockpit/feeding-and-finish'
// import squareSingleYield from '@/components/cockpit/square-single-yield'
// import singleYield from '@/components/cockpit/single-yield'
// import machineYield from '@/components/cockpit/machine-yield'
//
// import turnoverDays from '@/components/cockpit/turnover-days'
// import machineOnline48 from '@/components/cockpit/machine-online48'
// import singleOnline8 from '@/components/cockpit/single-online8'

const factory = 'BS'
</script>
