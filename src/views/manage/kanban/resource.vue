<template>
    <el-row style="padding: 10px">
        <el-row :gutter="20" style="width: 100%">
            <el-form label-width="80px" inline>
                <el-form-item label="工厂">
                    <el-select v-model="queryParam.factory" clearable placeholder="工厂" style="width: 100px">
                        <el-option v-for="(v, k) in factories" :key="k" :value="k" :label="v"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="资源名称">
                    <el-input v-model="queryParam.name" clearable placeholder="资源名称"
                              style="width: 150px"></el-input>
                </el-form-item>
                <el-form-item label="资源类型">
                    <el-select v-model="queryParam.type" clearable placeholder="资源类型" style="width: 100px">
                        <el-option v-for="item in types" :key="item" :value="item" :label="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="query">查询</el-button>
                    <el-button type="primary" @click="openEdit('')">新增</el-button>
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
                        <el-link type="primary" target="_blank"
                                 :href="getResourceLink2(scope.row.type, scope.row.location, scope.row.count, scope.row.duration)">
                            {{ scope.row.name }}
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column label="类型" prop="type" align="center" width="100px"></el-table-column>
                <el-table-column label="位置" prop="location" align="center"></el-table-column>
                <el-table-column label="数量" prop="count" align="center" width="100px"></el-table-column>
                <el-table-column label="时长" prop="duration" align="center" width="100px"></el-table-column>
                <el-table-column label="操作" align="center" width="100px">
                    <template v-slot="scope">
                        <el-button type="primary" @click="openEdit(scope.row)">编 辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </el-row>
    <el-dialog :title="editTitle" v-model="isShowEdit" :close-on-click-modal="false" width="600px">
        <el-form label-width="80px">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="工厂">
                        <el-select v-model="editData.factory" clearable placeholder="工厂">
                            <el-option v-for="(v, k) in factories" :key="k" :value="k" :label="v"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="资源名称">
                        <el-input v-model="editData.name" placeholder="资源名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="资源类型">
                        <el-select v-model="editData.type" clearable placeholder="资源类型"
                                   @change="editTypeChange">
                            <el-option v-for="item in types" :key="item" :value="item" :label="item"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="editData.type === 'HTML'" :gutter="20">
                <el-col :span="24">
                    <el-form-item label="资源位置">
                        <el-input type="textarea" v-model="editData.location"
                                  placeholder="内部链接或是外部链接"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-else-if="editData.type === 'PPT' || editData.type === 'VIDEO'" :gutter="20">
                <el-col :span="12">
                    <el-form-item label="资源位置">
                        <el-select v-model="editData.location" placeholder="视频或PPT目录">
                            <el-option v-for="item in locations" :key="item" :value="item"
                                       :label="item"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="资源数量">
                        <el-input-number v-model="editData.count" :min="0" :step="1"
                                         :step-strictly="true"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="资源时长">
                        <el-input-number v-model="editData.duration" :min="0" :step="1"
                                         :step-strictly="true"></el-input-number>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <el-button @click="isShowEdit = false">取 消</el-button>
            <el-button type="primary" @click="save">保 存</el-button>
        </template>
    </el-dialog>
</template>

<script>
import {getLocations, getResources, saveResource} from '@/api/manage/kanban'
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
            type: '',
            name: '',
            location: '',
            count: '',
            duration: ''
        })
        const types = ref(['HTML', 'PPT', 'VIDEO'])
        const factories = ref({
            'BS': '保山',
            'TC': '腾冲'
        })
        const locations = ref([])

        const query = () => getResources(queryParam.value, data => list.value = data)
        const getResourceLink2 = (type, location, count, duration) => {
            return getResourceLink(type, location, count, duration)
        }
        const editTypeChange = value => {
            this.editData.location = ''
            if (value !== 'HTML') {
                getLocations({type: value}, data => this.locations = data)
            }
        }
        const openEdit = item => {
            if (item) {
                editTypeChange(item.type)
                editTitle.value = '修改'
                editData.value = {
                    id: item.id,
                    factory: item.factory,
                    type: item.type,
                    name: item.name,
                    location: item.location,
                    count: item.count,
                    duration: item.duration
                }
            } else {
                editTitle.value = '新增'
                editData.value = {
                    id: '',
                    factory: '',
                    type: '',
                    name: '',
                    location: '',
                    count: '',
                    duration: ''
                }
            }
            isShowEdit.value = true
        }
        const save = () => {
            if (!editData.value.factory) {
                alertError('工厂不能为空')
                return
            }
            if (!editData.value.type) {
                alertError('资源类型不能为空')
                return
            }
            if (!editData.value.name) {
                alertError('资源名称不能为空')
                return
            }
            if (editData.value.type === 'VIDEO') {
                if (!editData.value.location || editData.value.location.length < 0) {
                    alertError('资源位置为必填项')
                    return
                }
            } else if (!editData.value.location) {
                alertError('资源位置不能为空')
                return
            }
            if (!editData.value.count) {
                alertError('资源数量不能为空')
                return
            }
            if (editData.value.type !== 'HTML' && !editData.value.duration) {
                alertError('资源时长不能为空')
                return
            }
            const param = {
                id: editData.value.id,
                factory: editData.value.factory,
                type: editData.value.type,
                name: editData.value.name,
                location: editData.value.location,
                count: editData.value.count,
                duration: editData.value.duration,
            }
            saveResource(param, () => {
                query()
                isShowEdit.value = false
            })
        }

        query()
        return {
            tableMaxHeight,
            list,
            queryParam,
            isShowEdit,
            editTitle,
            editData,
            types,
            factories,
            locations,
            query,
            getResourceLink2,
            editTypeChange,
            openEdit,
            save
        }
    }
}
</script>