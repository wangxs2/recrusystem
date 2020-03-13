<template>
  <div class="gong">
    <div class="cur-menu-name">
        <span>录入信息维护/我有工人</span>
    </div>
    <div class="table-search-wrapper">
      <div class="search-wrapper">
        <div class="search-input">
          <span>起始时间-结束时间:</span>
          <el-date-picker
            v-model="startEndTate"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="search-input">
          <span>内容:</span>
          <el-input v-model="content" placeholder="请输入地区、机构或岗位名称" clearable></el-input>
          <!-- <el-autocomplete v-model="goodsName" :fetch-suggestions="querySearchAsync" placeholder="请选择岗位名称" @select="handleSelect" clearable></el-autocomplete> -->
        </div>
        <!-- <div class="search-input">
          <span>接受捐赠/采购情况:</span>
          <el-select v-model="acceptInfo" placeholder="请选择" clearable>
            <el-option
              v-for="item in acceptInfoList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div> -->
        <div class="search-input search-btn" @click="search">搜索</div>
        <div class="search-input search-btn" @click="handlderive">导出</div>

      </div>
      <div class="table-wrapper">
        <el-table :data="tableData.slice((page-1)*pageSize,page*pageSize)" :height="curHeight" ref="table" style="width: 100%">
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="name" label="机构名称">
          </el-table-column>
          <el-table-column prop="materialType" label="类型">
            <template slot-scope="scope">
              <span v-if="scope.row.materialType==1">需求方</span>
              <span v-if="scope.row.materialType==2">提供方</span>
              <span v-if="scope.row.materialType==3">出力方</span>
            </template>
          </el-table-column>
          <el-table-column prop="province" label="省"></el-table-column>
          <el-table-column prop="city" label="市"></el-table-column>
          <el-table-column prop="address" label="详细地址"></el-table-column>

          <el-table-column prop="serviceRange" label="所属行业领域"></el-table-column>
          <el-table-column prop="type" label="机构类型"></el-table-column>
          <el-table-column prop="detail" label="供应工种" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="needsNum" label="总数"></el-table-column>
          <el-table-column prop="createTime" label="预计到岗时间">
            <!-- <template slot-scope="scope">
              <div v-if="scope.row.createTime">{{scope.row.createTime.substring(0,10)}}</div>
            </template> -->
          </el-table-column>
          <el-table-column prop="createT" label="提交时间">
            <!-- <template slot-scope="scope">
              <div v-if="scope.row.createTime">{{scope.row.createTime.substring(0,10)}}</div>
            </template> -->
          </el-table-column>
          <el-table-column prop="sourceLink" label="信息链接"></el-table-column>
          <el-table-column prop="descr" label="具体描述" :show-overflow-tooltip="true"></el-table-column>

          <el-table-column prop="linkPeople" label="联系人">
            <template slot-scope="scope">
              <div v-for="(item,i) in scope.row.linkPeopleList" :key="i" style="padding:5px;" class="font-left">{{item}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="attachment" label="图片链接" >
            <template slot-scope="scope">
              <!-- <div style="padding:5px;color:#4F84FD;cursor:pointer;" class="font-left"> -->
                <img v-for="(item,i) in scope.row.attachment" :key="i" :src="item" alt="" style="width:60px;height:60px;margin:2px;" @click="goUrl(item)">
              <!-- </div> -->
            </template>

          </el-table-column>
          <el-table-column prop="isValid" label="审核状态">
            <template slot-scope="scope">
              <div v-if="scope.row.isValid==0">未审核</div>
              <div v-else-if="scope.row.isValid==1">审核通过</div>
              <div v-else-if="scope.row.isValid==2">审核不通过</div>
              <div v-else-if="scope.row.isValid==3">后台录入</div>
            </template>
          </el-table-column>
          <el-table-column prop="checkDescr" label="审核意见" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop=" hasShow" label="发布状态">
            <template slot-scope="scope">
              <div v-if="scope.row.hasShow==0">未发布</div>
              <div v-else-if="scope.row.hasShow==1">已发布</div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="查看或操作" fixed="right" width="160">
            <template slot-scope="scope">
              <el-button @click="clickLookGoods(scope.row)" type="text" size="small">查看供应人数</el-button>
              <el-button @click="clickPublish(scope.row)" type="text" size="small" v-if="scope.row.isValid==0||scope.row.isValid==3">审核</el-button>
              <!-- <el-button @click="editRow(scope.row)" type="text" size="small">编辑</el-button> -->
              <el-button @click="deleteRow(scope.row)" type="text" size="small">删除</el-button>

            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
             v-if="pageshow"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            layout="sizes, prev, pager, next, total,jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 查看所需物资弹框 -->
    <el-dialog title="详情" :visible.sync="dialogTableVisible" :close-on-click-modal="false" width="480" center custom-class="look-goods">
      <el-table :data="gridData">
        <el-table-column property="needsName" label="主要工种"></el-table-column>
        <el-table-column property="needsNum" label="供应人数"></el-table-column>
        <!-- <el-table-column property="" label="物资表述">
            <template slot-scope="scope">
              <span style="color:#4F84FD;cursor:pointer;" @click="clickLookBiao(scope.row)">查看标准</span>
            </template>

        </el-table-column> -->
      </el-table>
    </el-dialog>
    <!-- 删除 -->
    <el-dialog title="提示" :visible.sync="dialogVisibleDeleteShow" width="25%" center>
      <div style="text-align:center;"><span>确定要删除吗？</span></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleDeleteShow = false">取 消</el-button>
        <el-button type="primary" @click="delectCom">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 审核弹框 -->
    <el-dialog title="审核" :visible.sync="dialogPublishShow" :close-on-click-modal="false" width="480" center custom-class="look-goods">
        <el-form label-position="right" :model="form">
          <el-form-item label="是否审核">
            <el-radio-group v-model="form.checkStatus">
              <el-radio v-for="item in statusList" :key="item.type" :label="item.type">{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="审核意见">
            <el-input v-model="form.checkDesc" type="textarea" :rows="5" placeholder="请输入描述内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">提交</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>

  </div>
</template>

<script>
import {screenHeight,formatDate,curDataTime} from "../../utils/util"
export default {
  name: 'worker',
  components: {
  },
  data () {
    return {
      curHeight:null,
      dialogTableVisible:false,
      page:1,
      pageSize:10,
      startEndTate:[],
      goodsName:'',
      content:'',
      acceptInfo:'',
      goodsNameList: [],
      acceptInfoList: [
        {
          value: 1,
          label: '接受个人捐赠'
        }, {
          value: 2,
          label: '接受企业捐赠'
        }, {
          value: 3,
          label: '接受采购'
        }, {
          value: 4,
          label: '捐赠'
        }, {
          value: 5,
          label: '采购'
        }
      ],
      tableData: [],
      tableDataExecl:[],
      tableExecl:0,
      total:0,
      gridData: [],
      params:{},
      pageshow:true,

      dialogPublishShow:false,
      curId:'',
      statusList:[
        {
          type:1,
          name:"审核通过"
        },
        {
          type:0,
          name:"审核不通过"
        }
      ],
      form:{
        checkStatus:1, // 是否置顶
        checkDesc:'', // 网页链接
      },
      rules: {
        checkDesc: [
          { required: false, message: '请输入描述内容', trigger: 'blur' },
        ],
        checkStatus: [
          { required: false, message: '请选择是否置顶', trigger: 'change' },
        ],
      },

      dialogVisibleDeleteShow:false,
    }
  },
  mounted () {
    // this.curHeight=screenHeight()
    this.curHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 80;
    let searchData = JSON.parse(sessionStorage.getItem("searchData"))

    if (searchData){
      this.params=searchData
      this.content=searchData.content
      if (searchData.startDate&&searchData.endDate){

        this.startEndTate=[searchData.startDate,searchData.endDate]
      }
      this.getTableData(this.params)
    } else {
      this.params={
        materialType:2,
        page:this.page,
        pageSize:this.pageSize
      }
      this.getTableData(this.params)
    }

  },
  created () {
    // this.params={
    //   materialType:2,
    //   page:this.page,
    //   pageSize:this.pageSize
    // }
    // this.getTableData(this.params)
    this.getNeedsNameList()

    // let x={
    //   materialType:2,
    // }
    // this.getTableDataExecal(x)
  },
  methods: {
    getTableDataExecal(params){
      this.$fetchGet("material/getMaterial",params).then(res => {
          // this.total=res.data.total
          this.tableDataExecl=res.data.list
          if (this.tableDataExecl&&this.tableDataExecl.length>0){
            this.tableDataExecl.forEach(item => {
              if (item.linkPeople){
                item.linkPeople=item.linkPeople.replace(/:/g, "-")
                item.linkPeopleList=item.linkPeople.split(',')
                item.linkPeopleList.forEach(items => {
                  // items=items.split(":").join("-")
                  // console.log(items)

                })
                item.linkPeopleList=item.linkPeopleList
              }
              if (item.createT){
                item.createT=formatDate(item.createT)
              }
              if (item.createTime){
                item.createTime=formatDate(item.createTime)
              }
              
            })
          }

          
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = [ '机构名称','类型', '省', '市', '详细地址', '所属行业领域', '机构类型', '供应工种','总数', '预计到岗时间', '提交时间','信息链接', '具体描述','联系人','图片链接','审核状态','审核意见','发布状态']
          const filterVal = ['name',"materialType", 'province', 'city', 'address', 'serviceRange', 'type', 'detail', 'needsNum', 'createTime','createT','sourceLink', 'descr','linkPeople','attachment','isValid','checkDescr','hasShow']
          const data = this.formatJson(filterVal, this.tableDataExecl)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: curDataTime()+"导出记录",
            autoWidth: true,
            // filename: this.filename
          })
        })
      })

    },
    handlderive() {
      this.tableExecl=1
      let searchData1 = JSON.parse(sessionStorage.getItem("searchData1"))
      if (searchData1){
        let x=searchData1
        this.content=searchData1.content
        if (searchData1.startDate&&searchData1.endDate){

          this.startEndTate=[searchData1.startDate,searchData1.endDate]
        }
        this.getTableDataExecal(x)
      } else {
        let x={
          materialType:2,
        }
        this.getTableDataExecal(x)
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'materialType') {
            if (v[j]==1){
              v[j]="需求方"
            } else if(v[j]==2){
              v[j]="提供方"
            } else if(v[j]==3){
              v[j]="出力方"
            }
            return v[j]
          }
          if (j === 'attachment'){
            if (v[j]&&v[j].length){
              v[j]=v[j].join(",")
            }
            return v[j]

          }
          if (j === 'isValid') {
            if (v[j]==0){
              v[j]="未审核"
            } else if(v[j]==1){
              v[j]="审核通过"
            } else if(v[j]==2){
              v[j]="审核不通过"
            } else if(v[j]==3){
              v[j]="后台录入"
            }
            return v[j]
          }
          if (j === 'hasShow') {
            if (v[j]==0){
              v[j]="未发布"
            } else if(v[j]==1){
              v[j]="已发布"
            }
            return v[j]
          }
          // if (j === 'createTime') {
          //   if (v[j]){
          //     v[j]=v[j].substring(0,10)
          //   }
          //   return v[j]
          // }
          return v[j]
            
        })
      )
    },
    clickPublish(row){
      this.dialogPublishShow=true
      this.curId=row.id

    },
    submitForm(){
      this.form.id=this.curId
      this.$fetchPost("material/publish",this.form).then(res => {
        this.$message({
          message: res.message,
          type: 'success'
        });
        if (res.result==1){
          this.dialogPublishShow=false
          this.regetList()
        }
      })
    },
    editRow(){},
    // 操作完成获取数据
    regetList(){
      this.pageshow = false
      this.page=1
      this.tableData=[]

      
      let searchData = JSON.parse(sessionStorage.getItem("searchData"))
      let searchData1 = JSON.parse(sessionStorage.getItem("searchData1"))

      if (searchData){
        this.params=searchData
        this.content=searchData.content
        if (searchData.startDate&&searchData.endDate){

          this.startEndTate=[searchData.startDate,searchData.endDate]
        }
        this.getTableData(this.params)
      } else {
        this.params={
          materialType:2,
          page:this.page,
          pageSize:this.pageSize
        }
        this.getTableData(this.params)
      }
      if (searchData1){
        let x=searchData1
        this.content=searchData1.content
        if (searchData1.startDate&&searchData1.endDate){

          this.startEndTate=[searchData1.startDate,searchData1.endDate]
        }
        this.getTableDataExecal(x)
      } else {
        let x={
          materialType:2,
        }
        this.getTableDataExecal(x)
      }



      // this.params={
      //   materialType:2,
      //   page:this.page,
      //   pageSize:this.pageSize
      // }
      // this.getTableData(this.params)



      this.$nextTick(() => {
          this.pageshow = true
      })
    },
    deleteRow(row){
      this.curId=row.id
      this.dialogVisibleDeleteShow=true
    },
    delectCom(){

      this.$fetchPost("material/shield",{id:this.curId}).then(res => {
        this.$message({
          message: res.message,
          type: 'success'
        });
        if (res.result==1){
          this.dialogVisibleDeleteShow=false
          this.regetList()
        }
      })

    },
    getNeedsNameList(){
      this.$fetchGet("material/getNeedsName",{
        materialType:2
      }).then(res => {
        if (res.data&&res.data.length>0){
          let obj={}
          res.data.forEach(item => {
            obj={
              value:item
            }
          this.goodsNameList.push(obj)
          })
        }
      })
    },
    querySearchAsync(queryString,cb) {
      var restaurants = this.goodsNameList;
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
      cb(results);

    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
    },
    search(){
      this.pageshow = false
      this.page=1
      this.tableData=[]
      this.params={
        materialType:2,
        content:this.content,
        // status:this.acceptInfo,
        page:this.page,
        pageSize:this.pageSize
      }
      if (this.startEndTate&&this.startEndTate.length>0){
        this.params.startDate=this.startEndTate[0]
        this.params.endDate=this.startEndTate[1]
      } else {
        this.params.startDate=''
        this.params.endDate=''

      }
      
      this.getTableData(this.params)
      this.$nextTick(() => {
          this.pageshow = true
      })
      if (this.tableExecl=1){
        let x={
          materialType:2,
          content:this.content,
          // status:this.acceptInfo,

        }
        if (this.startEndTate&&this.startEndTate.length>0){
          x.startDate=this.startEndTate[0]
          x.endDate=this.startEndTate[1]
        } else {
          x.startDate=''
          x.endDate=''
        }
        // this.getTableDataExecal(x)
        sessionStorage.setItem("searchData1",JSON.stringify(x))

      }
      sessionStorage.setItem("searchData",JSON.stringify(this.params))
    },
    getTableData(params){
      this.$fetchGet("material/getMaterial",params).then(res => {
          this.total=res.data.total
          this.tableData=res.data.list
          if (this.tableData&&this.tableData.length>0){
            this.tableData.forEach(item => {
              if (item.linkPeople){
                item.linkPeople=item.linkPeople.replace(/:/g, "-")
                item.linkPeopleList=item.linkPeople.split(',')
                item.linkPeopleList.forEach(items => {
                  // items=items.split(":").join("-")
                  // console.log(items)

                })
                item.linkPeopleList=item.linkPeopleList
              }
              if (item.createT){
                item.createT=formatDate(item.createT)
              }
              if (item.createTime){
                item.createTime=formatDate(item.createTime)
              }
              
            })
          }
      })
    },
    handleSizeChange(val) {
      this.params.pageSize=val
      this.getTableData(this.params)
    },
    handleCurrentChange(val) {
      this.params.page=val
      this.getTableData(this.params)
    },
    clickLookGoods(row){
      this.gridData=[]
      this.dialogTableVisible=true
      this.$fetchGet('material/getMaterialDetail',{materialId:row.id}).then(res => {
        this.gridData=res.data
      })
      // this.gridData=row.materialDetails
    },
    goUrl(item){
      window.open(item)
    },
    clickLookBiao(row){

    }

  }
	
}
</script>

<style lang="scss">
@import '../../assets/css/common.scss';
.gong{
  .search-input{
    .el-input{
      width:350px;
    }
  }
  
}

</style>
