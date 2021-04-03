<template>
  <div>
    <el-card>
      <div slot="header" class="flex-space-between">
        <span>日志列表</span>
        <el-button type="primary" @click="create">写入日志</el-button>
      </div>
      <div class="ui-search-header-block dark">
        <el-form inline>
          <el-form-item label="req请求数据">
            <el-input v-model="search.req"></el-input>
          </el-form-item>
          <el-form-item label="res响应数据">
            <el-input v-model="search.res"></el-input>
          </el-form-item>
          <el-form-item label="ext其他数据">
            <el-input v-model="search.ext"></el-input>
          </el-form-item>
        </el-form>
        <el-button
          class="btn-search" type="primary" icon="el-icon-search"
          @click="handleCurrentChange(1)"
        >搜索
        </el-button>
      </div>
      <el-table :data="tableData">
        <el-table-column align="center" label="_id" prop="_id"></el-table-column>
        <el-table-column align="center" label="req请求数据" v-slot="scope">
          <div @click="showLook(scope.row.req)">
            <span>{{scope.row.req}}</span>
            <el-button type="text">查看</el-button>
          </div>
        </el-table-column>
        <el-table-column @click.native="showLook(scope.row.res)" align="center" label="res响应数据" v-slot="scope">
          <div @click="showLook(scope.row.res)">
            <span>{{scope.row.res}}</span>
            <el-button type="text">查看</el-button>
          </div>
        </el-table-column>
        <el-table-column @click.native="showLook(scope.row.ext)" align="center" label="ext其他数据" v-slot="scope">
          <div @click="showLook(scope.row.ext)">
            <span>{{scope.row.ext}}</span>
            <el-button type="text">查看</el-button>
          </div>
        </el-table-column>
        <el-table-column align="center" label="创建时间" v-slot="scope">
          {{new Date(scope.row.createdAt).toLocaleString()}}
        </el-table-column>
      </el-table>
      <div class="block" style="padding-top: 10px;text-align: right;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="search.page"
          :page-sizes="[10, 100, 200, 300, 400]"
          :page-size="search.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="search.count">
        </el-pagination>
      </div>
    </el-card>
    <el-dialog
      title="查看"
      :visible.sync="showLookDialog"
      width="50%">
      <tree-view :data="lookDialogData" :options="{maxDepth: 3}"></tree-view>
    </el-dialog>
  </div>
</template>
<script>
import ApiLog from '@/api/log'

export default {
  data () {
    return {
      showLookDialog: false,
      lookDialogData: {},
      search: {
        req: '',
        res: '',
        ext: '',
        page: 1, // 当前是第几页
        limit: 10, // 每页数据条数
        count: 300, // 数据总条数
        pageCount: 30 // 总共多少页
      },
      tableData: []
    }
  },
  async created () {
    this.getList()
  },
  methods: {
    showLook (lookDialogData) {
      this.showLookDialog = true
      this.lookDialogData = lookDialogData
    },
    create () {
      const data = {
        req: { value: Math.random() },
        res: { value: Math.random() },
        ext: { value: Math.random() }
      }
      Array.apply(null, Array(5)).forEach(() => {
        data.req[String(Math.random()).substring(2)] = Math.random()
        data.res[String(Math.random()).substring(2)] = Math.random()
        data.ext[String(Math.random()).substring(2)] = Math.random()
      })
      ApiLog.postList(data)
    },
    async getList () {
      const result = await ApiLog.getList({ ...this.search })
      this.tableData = result.list
      this.search.count = result.count
    },
    handleSizeChange (val) {
      this.search.limit = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.search.page = val
      this.getList()
    }
  }
}
</script>
