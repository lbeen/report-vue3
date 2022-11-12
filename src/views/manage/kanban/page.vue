<template>
    <el-row style="padding: 10px">
        <el-row :gutter="20" style="width: 100%">
            <el-form label-width="80px" inline>
                <el-form-item label="工厂">
                    <el-select v-model="queryParam.factory" clearable placeholder="工厂" style="width: 100px">
                        <el-option v-for="(v, k) in factories" :key="k" :value="k" :label="v"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="页面名称">
                    <el-input v-model="queryParam.name" clearable placeholder="资源名称"
                              style="width: 150px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="query">查询</el-button>
                    <el-button type="primary" @click="openEdit('')">新增</el-button>
                    <el-button type="danger" @click="refreshAllVersion" title="所有现场看板重新加载">
                        全部刷新看板版本
                    </el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row style="width: 100%">
            <el-table :data="list" stripe :max-height="tableMaxHeight">
                <el-table-column label="序号" type="index" width="60px"></el-table-column>
                <el-table-column label="工厂" align="center" width="60px">
                    <template v-slot="scope">{{ factories[scope.row.factory] }}</template>
                </el-table-column>
                <el-table-column label="名称" align="center" width="200px">
                    <template v-slot="scope">
                        <el-link type="primary" :href="getPageLink(scope.row.id)" target="_blank">
                            {{ scope.row.name }}
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column label="资源" align="center" width="200px">
                    <template v-slot="scope">
                        <el-link v-for="item in scope.row.resources" type="primary" :href="getResourceLink2(item)"
                                 target="_blank" :key="item">
                            [{{ getResourceName(item) }}]
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column label="循环间隔" prop="interval" align="center" width="100px"></el-table-column>
                <el-table-column label="定时配置" align="center">
                    <template v-slot="scope">
                        <div v-for="(item, i) in scope.row.timing" :key="scope.row.id + 'timing' + i">
                            {{ item.startTime }}-{{ item.endTime }}:
                            <el-link v-for="(resource, j) in item.resources" type="primary"
                                     :key="scope.row.id + 'timing' + i + 'resource' + j"
                                     :href="getResourceLink2(resource)" target="_blank">
                                [{{ getResourceName(resource) }}]
                            </el-link>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="100px">
                    <template v-slot="scope">
                        <el-button type="primary" @click="openEdit(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </el-row>
    <el-dialog :title="editTitle" v-model="isShowEdit" :close-on-click-modal="false" width="800px">
        <el-form label-width="80px">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="工厂">
                        <el-select v-model="editData.factory" clearable placeholder="工厂"
                                   @change="editFactoryChange">
                            <el-option v-for="(v, k) in factories" :key="k" :value="k" :label="v"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="版本">
                        <el-input v-model="editData.version" placeholder="版本"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="页面名称">
                        <el-input v-model="editData.name" placeholder="页面名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="页面资源">
                        <el-select v-model="editData.resources" multiple filterable
                                   placeholder="页面资源">
                            <el-option v-for="item in filterResources" :key="item.id" :value="item.id"
                                       :label="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="循环间隔">
                        <el-input-number v-model="editData.interval" :min="0" :step="10"
                                         :step-strictly="true"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="6" style="padding-top: 5px">
                    <el-button type="primary" @click="addTiming">新增定时配置</el-button>
                </el-col>
            </el-row>
            <el-table :data="editData.timing" stripe>
                <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
                <el-table-column label="开始时间" align="center" width="140px">
                    <template v-slot="scope">
                        <el-time-select v-model="editData.timing[scope.$index].startTime"
                                        :picker-options="timeSelectOption" placeholder="开始时间"
                                        style="width: 120px">
                        </el-time-select>
                    </template>
                </el-table-column>
                <el-table-column label="结束时间" align="center" width="140px">
                    <template v-slot="scope">
                        <el-time-select v-model="editData.timing[scope.$index].endTime"
                                        :picker-options="timeSelectOption" placeholder="结束时间"
                                        style="width: 120px">
                        </el-time-select>
                    </template>
                </el-table-column>
                <el-table-column label="资源" align="center">
                    <template v-slot="scope">
                        <el-select v-model="editData.timing[scope.$index].resources" multiple
                                   placeholder="请选择资源" style="width: 300px">
                            <el-option v-for="item in resources" :key="item.id" :value="item.id"
                                       :label="item.name"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="50px">
                    <template v-slot="scope">
                        <i class="el-icon-delete" style="color: red;cursor: pointer"
                           @click="deleteTiming(scope.$index)"></i>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
        <template #footer>
            <el-button @click="isShowEdit = false">取 消</el-button>
            <el-button type="primary" @click="save">保 存</el-button>
        </template>
    </el-dialog>
</template>

<script>
import {getPages, getResources, loadKanbanVersion, savePage} from '@/api/manage/kanban'
import {getResourceLink} from '@/assets/kanban/js/kanban'
import {ref} from 'vue'
import {alertError} from '@/assets/common/alert'

export default {
    setup() {
        const tableMaxHeight = ref(window.innerHeight - 100)
        const list = ref([])
        const queryParam = ref({
            factory: '',
            name: '',
            type: ''
        })
        const isShowEdit = ref(false)
        const editTitle = ref('')
        const editData = ref({
            id: '',
            factory: '',
            version: '1.0',
            name: '',
            resources: [],
            interval: 0,
            timing: []
        })
        const resources = ref([])
        const filterResources = ref([])
        const factories = ref({
            'BS': '保山',
            'TC': '腾冲'
        })
        const timeSelectOption = ref({
            start: '00:00',
            step: '00:01',
            end: '23:50'
        })

        const query = () => getPages(queryParam.value, data => {
            for (let i = 0; i < data.length; i++) {
                data[i].resources = JSON.parse(data[i].resources)
                data[i].timing = JSON.parse(data[i].timing)
            }
            list.value = data
        })
        const getPageLink = id => '/#/kanban?id=' + id
        const getResource = id => {
            for (let i = 0; i < resources.value.length; i++) {
                const resource = resources.value[i]
                if (resource.id === id) {
                    return resource
                }
            }
        }
        const getResourceLink2 = id => {
            const resource = getResource(id)
            if (!resource) {
                return ''
            }
            return getResourceLink(resource.type, resource.location, resource.count, resource.duration)
        }
        const getResourceName = id => {
            const resource = getResource(id)
            return resource ? resource.name : ''
        }
        const editFactoryChange = value => {
            filterResources.value = []
            if (!value) {
                return
            }
            for (let i = 0; i < resources.value.length; i++) {
                if (resources.value[i].factory === value) {
                    filterResources.value.push(resources.value[i])
                }
            }
        }
        const openEdit = item => {
            if (item) {
                editFactoryChange(item.factory)
                editTitle.value = '修改'
                editData.value = {
                    id: item.id,
                    factory: item.factory,
                    version: item.version,
                    name: item.name,
                    resources: item.resources,
                    interval: item.interval,
                    timing: item.timing
                }
            } else {
                editTitle.value = '新增'
                editData.value = {
                    id: '',
                    factory: '',
                    version: '1.0',
                    name: '',
                    resources: [],
                    interval: 0,
                    timing: []
                }
            }
            isShowEdit.value = true
        }
        const addTiming = () => editData.value.timing.push({})
        const deleteTiming = index => {
            const timing = []
            for (let i = 0; i < editData.value.timing.length; i++) {
                if (index === i) {
                    continue
                }
                timing.push(editData.value.timing[i])
            }
            editData.value.timing = timing
        }
        const save = () => {
            if (!editData.value.factory) {
                alertError('工厂不能为空')
                return
            }
            if (!editData.value.version) {
                alertError('版本不能为空')
                return
            }
            if (!editData.value.name) {
                alertError('页面名称不能为空')
                return
            }
            if (editData.value.resources.length === 0) {
                alertError('请选择资源')
                return
            }
            if (editData.value.resources.length > 1 && editData.value.interval === 0) {
                alertError('循环间隔为必填项')
                return
            }
            for (let i = 0; i < editData.value.timing.length; i++) {
                if (!editData.value.timing[i].startTime) {
                    alertError('开始时间不能为空')
                    return
                }
                if (!editData.value.timing[i].endTime) {
                    alertError('结束时间不能为空')
                    return
                }
                if (!editData.value.timing[i].resources) {
                    alertError('资源不能为空')
                    return
                }
            }
            const param = {
                id: editData.value.id,
                factory: editData.value.factory,
                version: editData.value.version,
                name: editData.value.name,
                resources: JSON.stringify(editData.value.resources),
                interval: editData.value.interval,
                timing: JSON.stringify(editData.value.timing)
            }
            savePage(param, () => {
                query()
                isShowEdit.value = false
            })
        }
        const refreshAllVersion = loadKanbanVersion

        getResources({}, data => resources.value = data)
        query()
        return {
            tableMaxHeight,
            list,
            queryParam,
            isShowEdit,
            editTitle,
            editData,
            resources,
            filterResources,
            factories,
            timeSelectOption,
            query,
            getPageLink,
            getResourceLink2,
            getResourceName,
            getResource,
            openEdit,
            editFactoryChange,
            addTiming,
            deleteTiming,
            save,
            refreshAllVersion
        }
    }
}
</script>