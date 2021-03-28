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
          {{scope.row.req}}
        </el-table-column>
        <el-table-column align="center" label="res响应数据" v-slot="scope">
          {{scope.row.res}}
        </el-table-column>
        <el-table-column align="center" label="ext其他数据" v-slot="scope">
          {{scope.row.ext}}
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
  </div>
</template>
<script>
import ApiLog from '@/api/log'

export default {
  data () {
    return {
      // page 当前是第几页
      // limit 每页数据条数
      // count 数据总条数
      // pageCount 总共多少页
      search: {
        req: '',
        res: '',
        ext: '',
        page: 1,
        limit: 10,
        count: 300,
        pageCount: 30
      },
      tableData: []
    }
  },
  async created () {
    this.getList()
  },
  methods: {
    create () {
      ApiLog.postList({
        req: { value: Math.random() },
        res: { value: Math.random() },
        ext: { value: Math.random() }
      })
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
