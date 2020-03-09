<template>
  <div class="data-statistic">
    <div class="cur-menu-name">
        <span>统计/用户类型统计</span>
    </div>
    <div class="table-search-wrapper">
      <div class="search-wrapper">
        <div class="search-input">
          <span>起始时间-结束时间:</span>
          <el-date-picker
            v-model="startEndTate"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="search-input search-btn" @click="search">搜索</div>
        <div class="search-input search-btn" @click="handleDownloadExcel">导出</div>
      </div>
      <div class="table-wrapper table-wrapper-border">
        <el-table :data="tableData" ref="table" border style="width: 100%" :height="curHeight">
          <el-table-column prop="date" label="日期">
            <template slot-scope="scope">
              <div v-if="scope.row.date">{{scope.row.date.substring(0,10)}}</div>
            </template>

          </el-table-column>
          <el-table-column label="我要用工">
            <el-table-column prop="name" label="民营企业">
              <el-table-column prop="newEntAMy" label="新增"></el-table-column>
              <el-table-column prop="totalEntAMy" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="工商联执常委">
              <el-table-column prop="newEntAGsl" label="新增"></el-table-column>
              <el-table-column prop="totalEntAGsl" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="央企/国企">
              <el-table-column prop="newEntAGq" label="新增"></el-table-column>
              <el-table-column prop="totalEntAGq" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="个体工商户">
              <el-table-column prop="newEntAGt" label="新增"></el-table-column>
              <el-table-column prop="totalEntAGt" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="政府或事业单位">
              <el-table-column prop="newEntAZf" label="新增"></el-table-column>
              <el-table-column prop="totalEntAZf" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="社会组织">
              <el-table-column prop="newEntASh" label="新增"></el-table-column>
              <el-table-column prop="totalEntASh" label="累计"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="我有工人">
            <el-table-column prop="name" label="地方政府">
              <el-table-column prop="newEntBDf" label="新增"></el-table-column>
              <el-table-column prop="totalEntBDf" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="工商联">
              <el-table-column prop="newEntBGsl" label="新增"></el-table-column>
              <el-table-column prop="totalEntBGsl" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="社会组织">
              <el-table-column prop="newEntBSh" label="新增"></el-table-column>
              <el-table-column prop="totalEntBSh" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="人才中介机构">
              <el-table-column prop="newEntBRc" label="新增"></el-table-column>
              <el-table-column prop="totalEntBRc" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="其他">
              <el-table-column prop="newEntBQt" label="新增"></el-table-column>
              <el-table-column prop="totalEntBQt" label="累计"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="我要出力">
            <el-table-column prop="name" label="企业">
              <el-table-column prop="newEntCQy" label="新增"></el-table-column>
              <el-table-column prop="totalEntCQy" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="个人">
              <el-table-column prop="newEntCQy" label="新增"></el-table-column>
              <el-table-column prop="totalEntCQy" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="志愿者团队">
              <el-table-column prop="newEntCZy" label="新增"></el-table-column>
              <el-table-column prop="totalEntCZy" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="工商联">
              <el-table-column prop="newEntCGs" label="新增"></el-table-column>
              <el-table-column prop="totalEntCGs" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="民间组织">
              <el-table-column prop="newEntCMj" label="新增"></el-table-column>
              <el-table-column prop="totalEntCMj" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="政府部门">
              <el-table-column prop="newEntCZf" label="新增"></el-table-column>
              <el-table-column prop="totalEntCZf" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="其他">
              <el-table-column prop="newEntCQt" label="新增"></el-table-column>
              <el-table-column prop="totalEntCQt" label="累计"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="备注说明" prop="remark"></el-table-column>
        </el-table>

      </div>

      <!-- <div id="main" style="width: 100%;height: 200px;"></div> -->
    </div>

  </div>
</template>

<script>
import {screenHeight,formatDate,curDataTime,getCurrentMonthFirst,getCurrentMonthLast} from "../../utils/util"
export default {
  name: 'dataStatistic',
  components: {
  },
  data () {
    return {
      curHeight:null,
      startEndTate:[getCurrentMonthFirst(),getCurrentMonthLast()],
      params:{},
      myChart: '',
      tableData: [],
      tableDataExecl:[]
    }
  },
  mounted () {
      
    // this.curHeight=screenHeight()
    this.curHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 30;
    let searchData = JSON.parse(sessionStorage.getItem("searchData"))
    if (searchData){
      this.params=searchData
      if (searchData.startDate&&searchData.endDate){

        this.startEndTate=[searchData.startDate,searchData.endDate]
      }
      this.getTableData(this.params)
    } else {
      this.params={
        startDate:getCurrentMonthFirst(),
        endDate:getCurrentMonthLast(),
      }
      this.getTableData(this.params)
    }

  },
  created () {
    // this.getTableData()
  },
  methods: {
    search(){
      this.tableData=[]
      if (this.startEndTate&&this.startEndTate.length>0){
        this.params.startDate=this.startEndTate[0]
        this.params.endDate=this.startEndTate[1]
      } else {
        this.params.startDate=getCurrentMonthFirst()
        this.params.endDate=getCurrentMonthLast()
      }
      
      this.getTableData(this.params)
      sessionStorage.setItem("searchData",JSON.stringify(this.params))
    },
    getTableData(params){
       this.$fetchGet("count/specificType",params).then(res => {
          this.tableData=res
          if (this.tableData&&this.tableData.length>0){
            this.tableData.forEach(item => {
              if (item.date){

                // item.date=formatDate(item.date)
                item.date=item.date.substring(5,10)
                item.date=item.date.split("-")
                var monthDete='',datyDete=''
                if (item.date[0]>=10){
                  monthDete=item.date[0]
                } else {
                  monthDete=item.date[0].substring(1,3)
                }
                if (item.date[1]>=10){
                  datyDete=item.date[1]
                } else {
                  datyDete=item.date[1].substring(1,3)
                }
                item.date=monthDete+'月'+datyDete+'日'
              }
            })
          }
      })
    },
    handleDownloadExcel() {
      // this.downloadLoading = true
      import("@/vendor/Export2Excel1").then(excel => {
        const multiHeader = [
          [
            '日期',
            '我要用工',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '我有工人',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '我要出力',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '备注说明'
          ]
        ];
        const multiHeader2 = [
          [
            '',
            '民营企业',
            '',
            '工商联执常委',
            '',
            '央企/国企',
            '',
            '个体工商户',
            '',
            '政府或事业单位',
            '',
            '社会组织',
            '',
            '地方政府',
            '',
            '工商联',
            '',
            '社会组织',
            '',
            '人才中介机构',
            '',
            '其他',
            '',
            '企业',
            '',
            '个人',
            '',
            '志愿者团队',
            '',
            '工商联',
            '',
            '民间组织',
            '',
            '政府部门',
            '',
            '其他',
            '',
            '',
          ]
        ];
        const tHeader = [
          "",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          ''
        ];
        const filterVal = [ 'date','newEntAMy','totalEntAMy','newEntAGsl','totalEntAGsl','newEntAGq','totalEntAGq','newEntAGt','totalEntAGt','newEntAZf','totalEntAZf','newEntASh','totalEntASh','newEntBDf','totalEntBDf','newEntBGsl','totalEntBGsl','newEntBSh','totalEntBSh','newEntBRc','totalEntBRc','newEntBQt','totalEntBQt',

        'newEntCQy','totalEntCQy','newEntCQy','totalEntCQy','newEntCZy','totalEntCZy','newEntCGs','totalEntCGs','newEntCMj','totalEntCMj','newEntCZf','totalEntCZf','newEntCQt','totalEntCQt','remark']
        // console.log(multiHeader[0].length,multiHeader2[0].length,tHeader.length,filterVal.length)
        const data = this.formatJson(filterVal, this.tableData);
       //进行所有表头的单元格合并，建议一行一行来，不然容易整乱
        const merges = [
          "A1:A3",
          'B1:M1',
          'N1:W1',
          'X1:AK1',
          'AL1:AL3',
          'B2:C2',
          'D2:E2',
          'F2:G2',
          'H2:I2',
          'J2:K2',
          'L2:M2',
          'N2:O2',
          'P2:Q2',
          'R2:S2',
          'T2:U2',
          'V2:W2',
          'X2:Y2',
          'Z2:AA2',
          'AB2:AC2',
          'AD2:AE2',
          'AF2:AG2',
          'AH2:AI2',
          'AJ2:AK2',
        ]
 
        excel.export_json_to_excel({
          multiHeader,//这里是第一行的表头
          multiHeader2,//这里是第二行的表头
          header: tHeader,//这里应该是算第三行的表头
          data,
          merges,
          filename: curDataTime()+"导出记录",
          autoWidth: true,
        });
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'date') {
            if (v[j]){
              v[j]=v[j].substring(0,10)
            }
            return v[j]
          }
          return v[j]
        })
      );
    },


  }
	
}
</script>

<style lang="scss">
.data-statistic{
  .cur-menu-name{
    height:56px;
    padding:0 17px;
    background:rgba(255,255,255,1);
    span{
      font-size:18px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(38,38,38,1);
      line-height:56px;
      padding-left:10px;
      border-left:3px solid #0177D5
    }
  }
  
}

</style>
